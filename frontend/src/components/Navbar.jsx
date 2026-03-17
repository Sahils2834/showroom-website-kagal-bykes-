import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMotorcycle, FaGlobe } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Bikes", path: "/bikes" },
    { label: "Accessories", path: "/accessories" },
    { label: "Compare", path: "/compare" },
    { label: "Explore", path: "/explore" },
    { label: "Services", path: "/services" },
    { label: "Finance", path: "/finance" },
    { label: "Privacy", path: "/privacy-policy" },
  ];

  return (
    <>
      <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-hero-dark/95 backdrop-blur-md shadow-2xl py-3 border-b border-white/5" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/images/Hero_MotoCorp.png" alt="Hero" className="h-8 w-auto transform group-hover:scale-110 transition-transform duration-300" />
            <h1 className="text-2xl font-display font-black tracking-widest text-white uppercase italic">
              Kagal<span className="text-hero-red">Bykes</span>
            </h1>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex gap-6 items-center font-display text-xs uppercase tracking-wider font-bold">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative group transition duration-300 ${
                  location.pathname === link.path 
                    ? "text-hero-red" 
                    : (scrolled ? "text-white" : "text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]") + " hover:text-hero-red"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-2 left-0 h-[2px] transition-all duration-300 bg-hero-red ${
                  location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </Link>
            ))}
          </ul>

          {/* Auth + CTA */}
          <div className="hidden lg:flex items-center gap-4 relative" ref={dropdownRef}>
            {user ? (
              <div>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 hover:bg-white/5 py-1.5 px-3 rounded-lg transition"
                >
                  <div className="w-8 h-8 rounded-full bg-hero-red/20 flex items-center justify-center text-hero-red font-bold text-xs ring-2 ring-transparent group-hover:ring-hero-red transition">
                    {(user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || "U").toUpperCase()}
                  </div>
                  <span className="text-white text-xs font-bold max-w-[100px] truncate">
                    {user.user_metadata?.full_name || user.email?.split("@")[0]}
                  </span>
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-hero-dark border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2"
                    >
                      {isAdmin && (
                        <Link to="/admin" onClick={() => setProfileDropdownOpen(false)} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/5 transition font-bold border-b border-white/5">
                          Admin Panel
                        </Link>
                      )}
                      
                      <button
                        onClick={() => { signOut(); setProfileDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 transition"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login">
                <button className="border border-white/20 text-white text-xs font-display font-bold uppercase tracking-wider px-4 py-2 rounded hover:border-hero-red hover:text-hero-red transition-all">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden text-2xl ${scrolled ? "text-white" : "text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"}`}
          >
            {mobileMenuOpen ? "X" : "="}
          </button>
        </div>
      </div>

    </motion.nav>

    {/* Mobile Menu - Moved outside nav to avoid transform constraints */}
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="lg:hidden fixed inset-0 z-[100] bg-[#050505] backdrop-blur-2xl flex flex-col"
        >
          {/* Mobile Header */}
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
              <img src="/images/Hero_MotoCorp.png" alt="Hero" className="h-6 w-auto" />
              <span className="text-xl font-display font-black tracking-widest text-white uppercase italic">
                Kagal<span className="text-hero-red">Bykes</span>
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-3xl"
            >
              &times;
            </button>
          </div>

          <ul className="flex-1 flex flex-col p-8 overflow-y-auto">
            {navLinks.map((link, i) => (
              <motion.li
                key={link.path}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-4 text-3xl font-display font-black uppercase tracking-tighter transition-colors ${
                    location.pathname === link.path ? "text-hero-red" : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>

          <div className="p-8 border-t border-white/10 bg-white/5 backdrop-blur-md">
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-hero-red/20 flex items-center justify-center text-hero-red font-bold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold truncate max-w-[200px]">{user.user_metadata?.full_name || user.email}</p>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest">Signed In</p>
                  </div>
                </div>
                
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full bg-blue-600/20 border border-blue-500/30 text-blue-400 py-3 rounded-xl uppercase tracking-wider text-xs font-black shadow-lg shadow-blue-500/10">
                      Admin Dashboard
                    </button>
                  </Link>
                )}

                <button 
                  onClick={() => { signOut(); setMobileMenuOpen(false); }}
                  className="w-full bg-white/5 border border-white/10 text-white/60 py-3 rounded-xl uppercase tracking-wider text-xs font-black hover:bg-white/10 hover:text-red-400 transition-all">
                  Sign Out
                </button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full bg-hero-red text-white py-4 rounded-xl uppercase tracking-widest font-black text-sm shadow-xl shadow-hero-red/30 active:scale-[0.98] transition-all">
                  Access Account
                </button>
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
);
}