import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-hero-dark via-[#0d0d0d] to-hero-dark" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h3 className="text-hero-red uppercase tracking-[0.3em] font-bold text-sm mb-3">
            Who We Are
          </h3>
          <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white mb-4">
            About Kagal Bykes
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-hero-red to-transparent mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-hero-red/10">
              {/* Replace src with your showroom photo */}
              <img
                src="/images/about-us.jpg"
                alt="Kagal Bykes Showroom"
                className="w-full h-[400px] object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                className="w-full h-[400px] bg-gradient-to-br from-hero-gray to-hero-dark items-center justify-center"
                style={{ display: "none" }}
              >
                <div className="text-center">
                  <p className="text-gray-500 text-lg font-display uppercase tracking-widest mb-2">
                    Showroom Photo
                  </p>
                  <p className="text-gray-600 text-sm">
                    Add your image at /images/about-us.jpg
                  </p>
                </div>
              </div>
            </div>

            {/* Accent element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-hero-red/30 rounded-2xl -z-10" />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-gray-300 text-lg leading-relaxed font-light">
              <span className="text-white font-bold">Kagal Bykes</span> is your trusted
              authorized Hero MotoCorp dealership, proudly serving riders in Kagal
              and surrounding regions. With years of dedication to excellence, we
              bring you the complete range of Hero motorcycles and scooters.
            </p>

            <p className="text-gray-400 leading-relaxed font-light">
              From India's most trusted commuter bikes to high-performance
              machines, our showroom offers expert guidance, transparent pricing,
              and seamless financing options. Our certified service center ensures
              your ride stays in peak condition with genuine Hero parts.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div>
                <p className="text-3xl font-display font-black text-hero-red">500+</p>
                <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">
                  Happy Customers
                </p>
              </div>
              <div>
                <p className="text-3xl font-display font-black text-hero-red">8+</p>
                <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">
                  Years of Service
                </p>
              </div>
              <div>
                <p className="text-3xl font-display font-black text-hero-red">100%</p>
                <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">
                  Genuine Parts
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                "Authorized Hero Dealer",
                "Expert Service Center",
                "Easy Finance Options",
                "Genuine Spare Parts",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-hero-red rounded-full flex-shrink-0" />
                  <span className="text-gray-300 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
