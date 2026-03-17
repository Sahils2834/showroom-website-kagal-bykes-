export default function FinancePartners() {
  const partners = [
    { name: "Hero FinCorp", logo: "/images/hero fincorp.webp" },
    { name: "HDFC Bank", logo: "/images/HDFC-Bank.png" },
    { name: "Shriram Finance", logo: "/images/Shriram_Finance_Logo.jpg" },
    { name: "L&T Finance", logo: "/images/LT Finance Logo.webp" }
  ];

  return (
    <section className="py-24 bg-hero-dark relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-hero-red/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-display font-black text-center mb-16 uppercase italic tracking-tighter text-white">
          Our <span className="text-hero-red">Finance</span> Partners
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {partners.map((p, i) => (
            <div 
              key={i} 
              className="group bg-[#0d0d0d] p-6 md:p-10 rounded-3xl border border-white/5 flex items-center justify-center aspect-[1.5/1] overflow-hidden hover:border-hero-red/30 transition-all duration-500 relative"
            >
              {/* Card Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <img
                src={p.logo}
                alt={p.name}
                className="max-h-full max-w-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-500 transform group-hover:scale-110"
              />
              
              {/* Subtle Bottom Border Accent */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-hero-red group-hover:w-1/2 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}