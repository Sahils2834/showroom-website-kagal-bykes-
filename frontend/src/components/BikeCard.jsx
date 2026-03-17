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
      className="bg-hero-gray/40 backdrop-blur-md lg:bg-hero-gray rounded-3xl lg:rounded-xl shadow-2xl overflow-hidden border border-white/10 relative group h-full flex flex-col"
    >
      <div className="overflow-hidden relative bg-transparent aspect-video md:aspect-auto">
        <Link to={`/bike/${bike.id}`} className="block">
          <img
            src={bike.image}
            className={`w-full object-contain p-4 md:p-4 transform transition-transform duration-700 ease-in-out ${
              expanded ? "h-36 md:h-72" : "h-36 md:h-64 group-hover:scale-110"
            }`}
            alt={bike.name}
          />
        </Link>
        <div className="absolute top-6 left-6 bg-hero-red text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-hero-red/30">
          {bike.category}
        </div>
      </div>

      <div className="p-4 md:p-6 flex-1 flex flex-col">
        <Link to={`/bike/${bike.id}`}>
          <h2 className="text-lg md:text-2xl font-display font-black uppercase text-white mb-2 md:mb-2 tracking-tighter leading-none group-hover:text-hero-red transition-colors">
            {bike.name}
          </h2>
        </Link>

        {/* Specs List - Bullet Style for Mobile */}
        <div className="mb-4 md:mb-4 space-y-1.5">
          {bike.features.slice(0, 3).map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-gray-600 lg:text-gray-400">
              <span className="w-1 h-1 bg-hero-red rounded-full flex-shrink-0" />
              <span className="text-[9px] md:text-xs font-bold md:font-semibold uppercase tracking-wide md:tracking-widest">{feature}</span>
            </div>
          ))}
        </div>

        {/* Pricing Section - High Visibility for Mobile */}
        <div className="mt-auto flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-0 pt-8 md:pt-4 border-t border-gray-100 lg:border-white/10">
          <div>
            <span className="text-[8px] md:text-xs text-gray-500 uppercase tracking-[0.3em] font-black block mb-0.5">Starting Price</span>
            <div className="flex items-baseline gap-2">
               <p className="text-white font-display font-black text-2xl md:text-xl italic">
                ₹{bike.price.toLocaleString()}
              </p>
              {bike.discount > 0 && (
                <span className="text-hero-red text-[10px] font-black line-through opacity-50 italic">
                  ₹{(bike.price + bike.discount).toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-row md:flex-row gap-2 w-full md:w-auto mt-4 md:mt-0">
            <button
               onClick={() => setShowTestRide(true)}
               className="flex-1 md:flex-none bg-hero-red text-white px-3 md:px-8 py-2.5 md:py-2.5 rounded-lg md:rounded-lg text-[9px] md:text-sm font-black uppercase tracking-widest shadow-2xl shadow-hero-red/30 hover:bg-red-700 transition-all active:scale-[0.98]"
            >
              Test Ride
            </button>
            <Link to={`/bike/${bike.id}`} className="flex-1 md:block">
               <button className="w-full border border-white/10 lg:border-white/20 text-white px-3 py-2.5 md:px-5 md:py-2.5 rounded-lg text-[9px] md:text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                View
              </button>
            </Link>
          </div>
        </div>
      </div>
      <TestRideModal isOpen={showTestRide} onClose={() => setShowTestRide(false)} preselectedBike={bike.name} />
    </motion.div>
  );
}