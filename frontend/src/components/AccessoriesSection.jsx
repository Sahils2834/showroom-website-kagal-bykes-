import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const accessoryCategories = [
  {
    id: 1,
    name: "Helmets & Safety",
    icon: "",
    description: "ISI certified helmets and safety gear for every rider",
    items: ["Full Face Helmets", "Half Face Helmets", "Riding Gloves", "Knee Guards"],
    priceRange: "₹899 – ₹4,999",
    color: "from-red-600 to-red-900"
  },
  {
    id: 2,
    name: "Performance Parts",
    icon: "",
    description: "Genuine Hero performance upgrades for maximum power",
    items: ["Air Filters", "Exhaust Systems", "Brake Pads", "Spark Plugs"],
    priceRange: "₹299 – ₹8,999",
    color: "from-orange-600 to-red-800"
  },
  {
    id: 3,
    name: "Body & Style",
    icon: "",
    description: "Customize your ride with premium body kits and graphics",
    items: ["Tank Pads", "Crash Guards", "Graphics Kits", "Seat Covers"],
    priceRange: "₹499 – ₹6,999",
    color: "from-blue-600 to-blue-900"
  },
  {
    id: 4,
    name: "Riding Gear",
    icon: "",
    description: "Premium riding jackets, boots, and accessories",
    items: ["Riding Jackets", "Riding Boots", "Rain Gear", "Backpacks"],
    priceRange: "₹1,499 – ₹12,999",
    color: "from-gray-600 to-gray-900"
  },
  {
    id: 5,
    name: "Tech & Gadgets",
    icon: "",
    description: "Smart devices and tech accessories for modern riders",
    items: ["Mobile Holders", "Bluetooth Helmet Devices", "GPS Trackers", "USB Chargers"],
    priceRange: "₹399 – ₹5,999",
    color: "from-purple-600 to-purple-900"
  },
  {
    id: 6,
    name: "Security",
    icon: "",
    description: "Anti-theft systems and locks to keep your bike safe",
    items: ["Disc Locks", "Chain Locks", "GPS Anti-theft", "Bike Covers"],
    priceRange: "₹599 – ₹7,999",
    color: "from-green-600 to-green-900"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {accessoryCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -5, scale: 1.02 }}
              onHoverStart={() => setActiveCategory(i)}
              className={`relative overflow-hidden rounded-xl cursor-pointer group transition-all duration-500 ${
                activeCategory === i ? "ring-2 ring-hero-red shadow-lg shadow-hero-red/20" : ""
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-80`} />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500" />
              
              <div className="relative z-10 p-6">
                <span className="text-3xl mb-3 block">{cat.icon}</span>
                <h3 className="text-xl font-bold text-white mb-2">{cat.name}</h3>
                <p className="text-white/70 text-sm mb-4">{cat.description}</p>
                
                {/* Items List */}
                <div className="space-y-1.5 mb-4">
                  {cat.items.map((item, j) => (
                    <span key={j} className="text-white/60 text-xs flex items-center gap-2">
                      <span className="w-1 h-1 bg-white/40 rounded-full" />
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-xs">{cat.priceRange}</span>
                  <span className="text-white text-xs font-bold uppercase tracking-wider group-hover:text-hero-red transition-colors flex items-center gap-1">
                    Explore <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
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
