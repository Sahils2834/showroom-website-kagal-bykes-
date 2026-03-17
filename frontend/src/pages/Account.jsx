import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { FaUserCircle, FaSignOutAlt, FaHistory, FaMapMarkerAlt, FaMotorcycle } from "react-icons/fa";

export default function Account() {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-hero-dark pt-32 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-hero-red border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400 font-display font-black uppercase tracking-widest text-xs">Authenticating...</p>
      </div>
    );
  }

  const sections = [
    { label: "My Bookings", icon: <FaHistory />, desc: "View your test ride and service history" },
    { label: "Saved Bikes", icon: <FaMotorcycle />, desc: "Check bikes you've shortlisted" },
    { label: "Our Dealers", icon: <FaMapMarkerAlt />, desc: "Find showrooms near you", link: "/" },
  ];

  return (
    <div className="min-h-screen bg-hero-dark pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-hero-gray rounded-[2rem] border border-white/5 p-8 md:p-12 mb-8 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-hero-red/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="w-24 h-24 rounded-full bg-hero-red/20 border-2 border-hero-red/30 flex items-center justify-center text-hero-red text-4xl shadow-lg shadow-hero-red/20">
              <FaUserCircle />
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl md:text-4xl font-display font-black text-white italic uppercase tracking-tighter mb-2">
                {user.user_metadata?.full_name || "Premium User"}
              </h1>
              <p className="text-gray-400 font-light mb-4">{user.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="bg-hero-red/10 border border-hero-red/20 text-hero-red text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Premium Member</span>
                {user.user_metadata?.phone && (
                   <span className="bg-white/5 border border-white/10 text-gray-400 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{user.user_metadata.phone}</span>
                )}
              </div>
            </div>
            <button 
              onClick={() => { signOut(); navigate("/"); }}
              className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/20 text-white hover:text-red-400 px-6 py-3 rounded-xl transition-all duration-300 font-bold uppercase tracking-widest text-xs"
            >
              <FaSignOutAlt /> Sign Out
            </button>
          </div>
        </motion.div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((section, i) => (
            <motion.div
              key={section.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => section.link && navigate(section.link)}
              className="bg-hero-gray/50 backdrop-blur-sm border border-white/5 p-8 rounded-3xl hover:border-hero-red/30 transition-all cursor-pointer group shadow-xl h-full flex flex-col"
            >
              <div className="text-hero-red text-3xl mb-6 group-hover:scale-110 transition-transform">
                {section.icon}
              </div>
              <h3 className="text-xl font-display font-black text-white italic uppercase mb-2">{section.label}</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed flex-1">{section.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Support Section */}
        <div className="mt-12 bg-gradient-to-br from-hero-red to-red-900 p-8 rounded-[2rem] text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-display font-black uppercase italic whitespace-nowrap">HERO</div>
          </div>
          <h2 className="text-2xl font-display font-black text-white italic uppercase mb-4 relative z-10">Need Assistance?</h2>
          <p className="text-white/70 font-light mb-6 max-w-lg mx-auto relative z-10 text-sm">Our dedicated premium support team is available 24/7 to help with your test rides, services, or any other inquiries.</p>
          <button 
            onClick={() => navigate("/services")}
            className="bg-white text-hero-red hover:bg-gray-100 px-8 py-3 rounded-xl font-display font-black uppercase tracking-widest text-xs transition-all relative z-10 active:scale-95"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
