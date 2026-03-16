import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { bikesData as fallbackBikesData } from "../data/bikesData"; // Fallback if DB is empty

const BikesContext = createContext({});

export const useBikes = () => useContext(BikesContext);

export function BikesProvider({ children }) {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBikes() {
      try {
        const { data, error } = await supabase.from('bikes').select('*').order('created_at', { ascending: true });
        if (error) throw error;
        
        // Use fallback static data if DB is completely empty (to avoid blank site while setting up)
        if (!data || data.length === 0) {
          setBikes(fallbackBikesData);
        } else {
          setBikes(data);
        }
      } catch (error) {
        console.error("Error fetching bikes from Supabase:", error);
        setBikes(fallbackBikesData); // Fallback on error
      } finally {
        setLoading(false);
      }
    }

    fetchBikes();
  }, []);

  return (
    <BikesContext.Provider value={{ bikes, loading }}>
      {children}
    </BikesContext.Provider>
  );
}
