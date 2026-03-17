import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBikes } from "../context/BikesContext";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function FindYourRide() {
  const { bikes } = useBikes();
  const [type, setType] = useState("Motorcycles");
  const [engineMax, setEngineMax] = useState(445);
  const [priceMax, setPriceMax] = useState(300000);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const filteredBikes = useMemo(() => {
    if (!bikes) return [];
    return bikes.filter((bike) => {
      const isType =
        type === "Motorcycles"
          ? bike.category !== "Scooter"
          : bike.category === "Scooter";
      const cc = parseInt(bike.engine) || 0;
      const inEngine = cc >= 97 && cc <= engineMax;
      const inPrice = bike.price >= 50000 && bike.price <= priceMax;
      return isType && inEngine && inPrice;
    });
  }, [type, engineMax, priceMax, bikes]);

  // Reset activeIndex whenever filters change
  useEffect(() => {
    setActiveIndex(0);
    setDirection(1);
  }, [type, engineMax, priceMax]);

  const goNext = useCallback(() => {
    if (filteredBikes.length <= 1) return;
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % filteredBikes.length);
  }, [filteredBikes.length]);

  const goPrev = useCallback(() => {
    if (filteredBikes.length <= 1) return;
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + filteredBikes.length) % filteredBikes.length);
  }, [filteredBikes.length]);

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (filteredBikes.length <= 1) return;
    const interval = setInterval(goNext, 4000);
    return () => clearInterval(interval);
  }, [goNext, filteredBikes.length]);

  const activeBike = filteredBikes[activeIndex] || filteredBikes[0];

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 120 : -120, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -120 : 120, opacity: 0 }),
  };

  return (
    <section className="relative overflow-hidden">
      {/* Angled background */}
      <div className="absolute inset-0 bg-gradient-to-br from-hero-dark via-[#1a1a1a] to-black" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-hero-red via-hero-red/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <h3 className="text-hero-red uppercase tracking-[0.3em] font-bold text-sm mb-3">
            Discover
          </h3>
          <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white">
            Find Your Ride
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — Filters */}
          <div className="space-y-8">
            {/* Type Toggle */}
            <div className="flex gap-3">
              {["Motorcycles", "Scooters"].map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-6 py-2.5 rounded font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                    type === t
                      ? "bg-hero-red text-white shadow-lg shadow-hero-red/30"
                      : "bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Engine Slider */}
            <div>
              <label className="text-white font-bold text-lg mb-4 block">Engine</label>
              <div className="relative">
                <input
                  type="range"
                  min={97}
                  max={445}
                  value={engineMax}
                  onChange={(e) => setEngineMax(Number(e.target.value))}
                  className="w-full accent-hero-red h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
                />
              </div>
              <div className="flex justify-between mt-3">
                <div>
                  <span className="text-gray-500 text-xs block">Min</span>
                  <span className="text-white font-bold text-2xl">97</span>
                  <span className="text-gray-400 text-xs ml-1">cc</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 text-xs block">Max</span>
                  <span className="text-white font-bold text-2xl">{engineMax}</span>
                  <span className="text-gray-400 text-xs ml-1">cc</span>
                </div>
              </div>
            </div>

            {/* Price Slider */}
            <div>
              <label className="text-white font-bold text-lg mb-4 block">Price</label>
              <div className="relative">
                <input
                  type="range"
                  min={50000}
                  max={300000}
                  step={5000}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-hero-red h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
                />
              </div>
              <div className="flex justify-between mt-3">
                <div>
                  <span className="text-gray-500 text-xs block">Min</span>
                  <span className="text-white font-bold text-xl">₹50,000</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 text-xs block">Max</span>
                  <span className="text-white font-bold text-xl">₹{priceMax.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Results Count & CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <span className="text-gray-400 text-sm">
                {filteredBikes.length} {filteredBikes.length === 1 ? "bike" : "bikes"} found
              </span>
              <Link to="/bikes" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-hero-red text-white px-8 py-3 rounded font-bold text-sm uppercase tracking-wider hover:bg-red-700 transition-all">
                  View All Models
                </button>
              </Link>
            </div>
          </div>

          {/* Right — Bike Preview with Arrows */}
          <div className="relative min-h-[400px]">
            {/* Left Arrow */}
            {filteredBikes.length > 1 && (
              <button
                onClick={goPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-hero-red hover:border-hero-red transition-all duration-300 backdrop-blur-sm"
              >
                <FaChevronLeft className="text-sm" />
              </button>
            )}

            {/* Right Arrow */}
            {filteredBikes.length > 1 && (
              <button
                onClick={goNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-hero-red hover:border-hero-red transition-all duration-300 backdrop-blur-sm"
              >
                <FaChevronRight className="text-sm" />
              </button>
            )}

            <AnimatePresence mode="wait" custom={direction}>
              {activeBike ? (
                <motion.div
                  key={activeBike.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="text-center px-12"
                >
                  {/* Bike Name */}
                  <h3 className="text-3xl md:text-4xl font-display font-black uppercase text-white/10 tracking-tight mb-4 select-none">
                    {activeBike.name.replace("Hero ", "")}
                  </h3>

                  {/* Bike Image */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-hero-dark/80 rounded-2xl" />
                    <img
                      src={activeBike.image}
                      alt={activeBike.name}
                      className="w-full h-64 object-contain drop-shadow-2xl"
                    />
                  </div>

                  {/* Quick Specs */}
                  <div className="flex justify-center gap-8 mb-6">
                    <div className="text-center">
                      <span className="text-gray-500 text-xs uppercase tracking-wider block mb-1">Engine</span>
                      <span className="text-white font-bold">{parseInt(activeBike.engine)} <span className="text-xs text-gray-400">cc</span></span>
                    </div>
                    <div className="w-px bg-white/10" />
                    <div className="text-center">
                      <span className="text-gray-500 text-xs uppercase tracking-wider block mb-1">Mileage</span>
                      <span className="text-white font-bold">{activeBike.mileage}</span>
                    </div>
                    <div className="w-px bg-white/10" />
                    <div className="text-center">
                      <span className="text-gray-500 text-xs uppercase tracking-wider block mb-1">Price</span>
                      <span className="text-hero-red font-bold">₹{activeBike.price.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Navigation Dots */}
                  {filteredBikes.length > 1 && (
                    <div className="flex justify-center gap-2 mb-6">
                      {filteredBikes.slice(0, 10).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => { setDirection(i > activeIndex ? 1 : -1); setActiveIndex(i); }}
                          className={`h-2.5 rounded-full transition-all duration-300 ${
                            i === activeIndex ? "bg-hero-red w-8" : "bg-white/20 hover:bg-white/40 w-2.5"
                          }`}
                        />
                      ))}
                      {filteredBikes.length > 10 && (
                        <span className="text-gray-500 text-xs self-center ml-1">+{filteredBikes.length - 10}</span>
                      )}
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex justify-center gap-4">
                    <Link to={`/bike/${activeBike.id}`}>
                      <button className="border border-hero-red text-hero-red hover:bg-hero-red hover:text-white px-6 py-2.5 rounded font-bold text-sm uppercase tracking-wider transition-all">
                        Explore
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center h-full"
                >
                  <p className="text-gray-500 text-lg">No bikes match your criteria. Try adjusting the filters.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
