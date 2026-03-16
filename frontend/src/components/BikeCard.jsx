import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import TestRideModal from "./TestRideModal";

export default function BikeCard({ bike }) {
  const [expanded, setExpanded] = useState(false);
  const [showTestRide, setShowTestRide] = useState(false);

  return (
    <motion.div
      layout
      whileHover={!expanded ? { y: -10 } : {}}
      className="bg-hero-gray rounded-xl shadow-2xl overflow-hidden border border-white/5 relative group"
    >
      <div className="overflow-hidden relative bg-white">
        <img
          src={bike.image}
          className={`w-full object-contain p-4 transform transition-transform duration-700 ease-in-out ${
            expanded ? "h-72" : "h-64 group-hover:scale-110"
          }`}
          alt={bike.name}
        />
        <div className="absolute top-4 right-4 bg-hero-red text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
          {bike.category}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-hero-dark via-transparent to-transparent opacity-80" />
      </div>

      <div className="p-6 relative z-10 -mt-10">
        <h2 className="text-2xl font-display font-black uppercase text-white mb-2 tracking-tight group-hover:text-hero-red transition-colors">
          {bike.name}
        </h2>

        <div className="flex gap-4 mb-4">
          <div className="text-xs uppercase tracking-widest text-gray-400 font-bold border-l-2 border-hero-red pl-2">
            <span className="block text-[10px] text-gray-500 mb-1">Engine</span>
            {bike.engine}
          </div>
          <div className="text-xs uppercase tracking-widest text-gray-400 font-bold border-l-2 border-hero-red pl-2">
            <span className="block text-[10px] text-gray-500 mb-1">Power</span>
            {bike.topSpeed || "Awesome"}
          </div>
        </div>

        {/* Expandable Details Section */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {/* Description */}
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                {bike.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-white/5 rounded-lg p-3">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Mileage</span>
                  <span className="text-white font-bold text-sm">{bike.mileage}</span>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Top Speed</span>
                  <span className="text-white font-bold text-sm">{bike.topSpeed}</span>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Ex-Showroom</span>
                  <span className="text-hero-red font-bold text-sm">{bike.price.toLocaleString()}</span>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">On-Road</span>
                  <span className="text-green-400 font-bold text-sm">{bike.onRoad.toLocaleString()}</span>
                </div>
              </div>

              {/* Colors */}
              <div className="mb-5">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-2">Available Colors</span>
                <div className="flex flex-wrap gap-2">
                  {bike.color.map((c, i) => (
                    <span key={i} className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full">{c}</span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-5">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-2">Key Features</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {bike.features.map((f, i) => (
                    <span key={i} className="text-xs text-gray-400 flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-hero-red rounded-full flex-shrink-0" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Discount */}
              {bike.discount > 0 && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-5">
                  <span className="text-green-400 font-bold text-sm">Save {bike.discount.toLocaleString()} — {bike.offer_title || "Festival Offer"}</span>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex gap-3">
                <Link to={`/bike/${bike.id}`} className="flex-1">
                  <button className="w-full bg-hero-red text-white py-2.5 rounded text-sm font-bold uppercase tracking-wider hover:bg-red-700 transition-all">
                    Full Details
                  </button>
                </Link>
                <button onClick={() => setShowTestRide(true)} className="flex-1 border border-white/20 text-white py-2.5 rounded text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition-all">
                  Book Test Ride
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Price & Toggle Row */}
        <div className={`flex justify-between items-center border-t border-white/10 pt-4 ${expanded ? "mt-0" : "mt-2"}`}>
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Starting at</span>
            <p className="text-hero-red font-display font-bold text-xl">
              {bike.price.toLocaleString()}
            </p>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className={`px-5 py-2.5 rounded text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
              expanded
                ? "bg-white/20 text-white hover:bg-white/30"
                : "bg-white/10 text-white hover:bg-hero-red hover:text-white"
            }`}
          >
            {expanded ? "Close" : "Details"}
          </button>
        </div>
      </div>
      <TestRideModal isOpen={showTestRide} onClose={() => setShowTestRide(false)} preselectedBike={bike.name} />
    </motion.div>
  );
}