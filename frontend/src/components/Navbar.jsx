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
  ];

  return (
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
            <FaMotorcycle className="text-hero-red text-3xl transform group-hover:-rotate-12 transition-transform duration-300" />
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="lg:hidden bg-hero-dark border-t border-white/10 absolute w-full"
        >
          <ul className="flex flex-col p-6 font-display font-bold uppercase tracking-wider text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-3 border-b border-white/5 ${
                  location.pathname === link.path ? "text-hero-red" : "text-white hover:text-hero-red"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <div className="pt-4 space-y-3">
                <div className="text-gray-400 text-xs pb-2 border-b border-white/5">
                  Signed in as <span className="text-hero-red">{user.user_metadata?.full_name || user.email}</span>
                </div>
                
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full bg-blue-600/20 border border-blue-500/30 text-blue-400 py-3 rounded uppercase tracking-wider text-sm hover:bg-blue-600/30 transition mt-2 mb-2 font-bold">
                      Admin Panel
                    </button>
                  </Link>
                )}

                <button onClick={() => { signOut(); setMobileMenuOpen(false); }}
                  className="w-full bg-white/10 text-white py-3 rounded uppercase tracking-wider text-sm hover:text-red-400 transition mt-4">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="mt-4 block">
                <button className="w-full bg-hero-red text-white py-3 rounded uppercase tracking-wider shadow-lg">
                  Login
                </button>
              </Link>
            )}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
}