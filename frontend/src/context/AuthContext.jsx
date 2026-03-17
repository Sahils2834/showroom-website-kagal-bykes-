import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      // STRICT ADMIN CHECK - Only this email is an admin
      setIsAdmin(currentUser?.email === 'savitashete85@gmail.com');
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setIsAdmin(currentUser?.email === 'savitashete85@gmail.com');
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email, password, fullName, phone) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { 
        data: { 
          full_name: fullName,
          phone: phone 
        } 
      }
    });

    if (!error && data?.user) {
      await supabase.from('profiles').insert([
        {
          id: data.user.id,
          email: email,
          full_name: fullName,
          phone: phone
        }
      ]);

      await supabase.from('user_activity').insert({
        activity_type: 'signup',
        user_email: email,
        details: `New customer registered: ${fullName} (${phone})`
      });
    }
    return { data, error };
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error && data?.user) {
      await supabase.from('user_activity').insert({
        activity_type: 'login',
        user_email: email,
        details: 'User logged in successfully'
      });
    }
    return { data, error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = { user, isAdmin, loading, signIn, signUp, signOut };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
