import { useState, useEffect } from "react";
import { FaPhone, FaWhatsapp, FaCalculator } from "react-icons/fa";

export default function Sidebar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed right-4 top-1/3 flex flex-col gap-3 z-50 transition-all duration-500 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20 pointer-events-none"
      }`}
    >

      <a
        href="tel:+919623449324"
        className="group flex items-center gap-2 justify-end"
        title="Call Us"
      >
        <span className="bg-gray-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg">
          Call Us
        </span>
        <span className="bg-red-500 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all duration-300">
          <FaPhone className="text-lg" />
        </span>
      </a>

      <a
        href="https://wa.me/919623449324"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 justify-end"
        title="WhatsApp"
      >
        <span className="bg-gray-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg">
          WhatsApp
        </span>
        <span className="bg-green-500 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 hover:scale-110 transition-all duration-300">
          <FaWhatsapp className="text-xl" />
        </span>
      </a>

      <a
        href="#finance"
        className="group flex items-center gap-2 justify-end"
        title="EMI Calculator"
      >
        <span className="bg-gray-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg">
          EMI Calculator
        </span>
        <span className="bg-blue-500 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300">
          <FaCalculator className="text-lg" />
        </span>
      </a>

    </div>
  );
}