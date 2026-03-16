import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const exploreItems = [
  {
    title: "Finance Your Dreams",
    description: "Easy financing with minimal documentation. Zero down-payment options available.",
    icon: "",
    link: "/finance",
    size: "large",
    gradient: "from-hero-red/20 to-hero-dark"
  },
  {
    title: "Book a Service",
    description: "Expert service at our authorized center. Quick turnaround guaranteed.",
    icon: "",
    link: "/services",
    size: "large",
    gradient: "from-blue-900/40 to-hero-dark"
  },
  {
    title: "Exchange Offer",
    description: "Trade in your old bike and save up to ₹7,500 on a new Hero.",
    icon: "",
    link: "/bikes",
    size: "small",
    gradient: "from-green-900/40 to-hero-dark"
  },
  {
    title: "Genuine Parts",
    description: "100% genuine Hero parts for safety and performance.",
    icon: "",
    link: "/services",
    size: "small",
    gradient: "from-orange-900/40 to-hero-dark"
  },
  {
    title: "Riding Safety Tips",
    description: "Expert tips for a safer two-wheeler journey. Gear up right.",
    icon: "",
    link: "#",
    size: "small",
    gradient: "from-purple-900/40 to-hero-dark"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function ExploreSection() {
  return (
    <section className="relative overflow-hidden bg-hero-dark">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <h3 className="text-hero-red uppercase tracking-[0.3em] font-bold text-sm mb-3">
            Explore Our Offerings
          </h3>
          <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white mb-4">
            Make The Most Of Hero
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-hero-red to-transparent" />
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {exploreItems.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`${item.size === "large" ? "lg:row-span-1" : ""}`}
            >
              <Link to={item.link}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`relative overflow-hidden rounded-xl border border-white/5 cursor-pointer group h-full bg-gradient-to-br ${item.gradient}`}
                >
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500" />
                  
                  <div className="relative z-10 p-8 flex flex-col h-full min-h-[180px]">
                    <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </span>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-hero-red transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed flex-1">
                      {item.description}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-hero-red text-sm font-bold uppercase tracking-wider">
                      Know More
                      <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
