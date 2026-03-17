import { useState, useEffect } from "react";
import { FaPhone, FaWhatsapp, FaCalculator, FaTimes, FaHeadset } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sidebar after 400px scroll
      setVisible(window.scrollY > 400);
      // Close dropdown if scrolling back up significantly
      if (window.scrollY < 300) setIsOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const actions = [
    {
      id: "call",
      icon: <FaPhone />,
      label: "Call Us",
      href: "tel:+919623449324",
      color: "bg-red-500",
    },
    {
      id: "whatsapp",
      icon: <FaWhatsapp />,
      label: "WhatsApp",
      href: "https://wa.me/919623449324",
      color: "bg-green-500",
    },
    {
      id: "finance",
      icon: <FaCalculator />,
      label: "Finance",
      href: "#finance",
      color: "bg-blue-500",
    },
  ];

  return (
    <div
      className={`fixed right-4 md:right-8 bottom-24 md:bottom-12 z-40 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20 pointer-events-none"
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Actions List */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="flex flex-col gap-3 mb-4 items-center"
            >
              {actions.map((action, index) => (
                <motion.a
                  key={action.id}
                  href={action.href}
                  target={action.id === "whatsapp" ? "_blank" : undefined}
                  rel={action.id === "whatsapp" ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="absolute right-full mr-3 bg-hero-dark/95 border border-white/10 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl pointer-events-none">
                    {action.label}
                  </span>
                  <div className={`${action.color} text-white w-10 h-10 md:w-12 md:h-12 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform`}>
                    {action.icon}
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 ${
            isOpen ? "bg-white text-hero-dark rotate-90" : "bg-hero-red text-white hover:bg-red-600"
          }`}
        >
          {isOpen ? <FaTimes className="text-lg" /> : <FaHeadset className="text-xl animate-pulse" />}
        </button>
      </div>
    </div>
  );
}