import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const accessoryCategories = [
  {
    id: 1,
    name: "Helmets & Safety",
    icon: "🪖",
    description: "ISI certified helmets and safety gear for every rider",
    items: ["Full Face Helmets", "Half Face Helmets", "Riding Gloves", "Knee Guards"],
    priceRange: "₹899 – ₹4,999",
    color: "from-hero-red/20 to-hero-dark"
  },
  {
    id: 2,
    name: "Performance Parts",
    icon: "⚙️",
    description: "Genuine Hero performance upgrades for maximum power",
    items: ["Air Filters", "Exhaust Systems", "Brake Pads", "Spark Plugs"],
    priceRange: "₹299 – ₹8,999",
    color: "from-gray-800/20 to-hero-dark"
  },
  {
    id: 3,
    name: "Body & Style",
    icon: "✨",
    description: "Customize your ride with premium body kits and graphics",
    items: ["Tank Pads", "Crash Guards", "Graphics Kits", "Seat Covers"],
    priceRange: "₹499 – ₹6,999",
    color: "from-hero-red/10 to-hero-dark"
  },
  {
    id: 4,
    name: "Riding Gear",
    icon: "🧥",
    description: "Premium riding jackets, boots, and accessories",
    items: ["Riding Jackets", "Riding Boots", "Rain Gear", "Backpacks"],
    priceRange: "₹1,499 – ₹12,999",
    color: "from-gray-900/40 to-hero-dark"
  },
  {
    id: 5,
    name: "Tech & Gadgets",
    icon: "📱",
    description: "Smart devices and tech accessories for modern riders",
    items: ["Mobile Holders", "Bluetooth Devices", "GPS Trackers", "USB Chargers"],
    priceRange: "₹399 – ₹5,999",
    color: "from-hero-red/15 to-hero-dark"
  },
  {
    id: 6,
    name: "Security",
    icon: "🔒",
    description: "Anti-theft systems and locks to keep your bike safe",
    items: ["Disc Locks", "Chain Locks", "GPS Anti-theft", "Bike Covers"],
    priceRange: "₹599 – ₹7,999",
    color: "from-gray-800/30 to-hero-dark"
  }
];

const featuredProducts = [
  { name: "Hero H1 Bluetooth Helmet Device", price: "₹3,999", tag: "Bestseller" },
  { name: "Hero Premium Mobile Holder", price: "₹1,299", tag: "New" },
  { name: "Hero H30 Smart Intercom", price: "₹5,499", tag: "Premium" },
  { name: "Hero Genuine Tank Pad", price: "₹799", tag: "Popular" }
];

export default function AccessoriesSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const category = accessoryCategories[activeCategory];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-hero-dark via-[#0f0f0f] to-hero-dark" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h3 className="text-hero-red uppercase tracking-[0.3em] font-bold text-sm mb-3">
            Upgrade Your Style
          </h3>
          <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white mb-4">
            Hero Accessories
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Genuine Hero accessories designed to elevate your ride. From safety to style, find everything you need.
          </p>
        </div>

        {/* Featured Products Scroll */}
        <div className="flex gap-4 overflow-x-auto pb-6 mb-12 scrollbar-hide">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="flex-shrink-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 min-w-[250px] cursor-pointer group"
            >
              <span className="text-[10px] bg-hero-red/20 text-hero-red px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                {product.tag}
              </span>
              <h4 className="text-white font-bold text-sm mt-3 mb-2 group-hover:text-hero-red transition-colors">
                {product.name}
              </h4>
              <p className="text-hero-red font-bold">{product.price}</p>
            </motion.div>
          ))}
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {accessoryCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -8, scale: 1.01 }}
              onHoverStart={() => setActiveCategory(i)}
              className={`relative overflow-hidden rounded-[2rem] cursor-pointer group transition-all duration-500 border border-white/5 ${
                activeCategory === i ? "border-hero-red/30 shadow-2xl shadow-hero-red/10" : "hover:border-white/10"
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
              
              <div className="relative z-10 p-8 sm:p-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-4xl filter drop-shadow-lg">{cat.icon}</span>
                  <span className="text-white/20 text-4xl font-display font-black italic">0{cat.id}</span>
                </div>
                
                <h3 className="text-xl font-display font-black text-white mb-2 uppercase italic tracking-tight">{cat.name}</h3>
                <p className="text-gray-400 text-sm mb-6 font-light leading-relaxed">{cat.description}</p>
                
                {/* Items List */}
                <div className="space-y-2 mb-8 border-t border-white/5 pt-6">
                  {cat.items.map((item, j) => (
                    <span key={j} className="text-white/70 text-xs flex items-center gap-2 group-hover:text-white transition-colors">
                      <span className="w-1 h-1 bg-hero-red rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-hero-red font-display font-black italic text-sm">{cat.priceRange}</span>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-hero-red group-hover:border-hero-red transition-all duration-500">
                    <span className="text-white text-lg transition-transform group-hover:translate-x-0.5">→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/accessories">
            <button className="border border-hero-red text-hero-red hover:bg-hero-red hover:text-white px-8 py-3 rounded uppercase tracking-widest font-bold transition-all duration-300">
              Browse All Accessories
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
