import { Link, useLocation } from "react-router-dom";
import { FaMotorcycle, FaMapMarkerAlt, FaHeadset, FaUser, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function BottomNav() {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { label: "Bikes", path: "/bikes", icon: <FaMotorcycle /> },
    { label: "Dealers", path: "/", hash: "location", icon: <FaMapMarkerAlt /> },
    { label: "Support", path: "/services", icon: <FaHeadset /> },
    { 
      label: user ? "Profile" : "Login", 
      path: user ? "/account" : "/login", 
      icon: user ? <FaUserCircle className="text-hero-red" /> : <FaUser /> 
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] bg-hero-dark/95 backdrop-blur-xl border-t border-white/5 px-4 pb-safe-offset-2 pt-2 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.label}
              to={item.hash ? `${item.path}#${item.hash}` : item.path}
              className={`flex flex-col items-center gap-1.5 px-3 py-1.5 transition-all duration-300 ${
                isActive ? "text-hero-red scale-110" : "text-white/40 hover:text-white"
              }`}
            >
              <span className={`text-xl ${isActive ? "drop-shadow-[0_0_8px_rgba(231,25,34,0.5)]" : ""}`}>
                {item.icon}
              </span>
              <span className="text-[10px] font-display font-black uppercase tracking-widest">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
