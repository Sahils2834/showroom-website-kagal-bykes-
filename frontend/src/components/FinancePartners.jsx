export default function FinancePartners() {
  const partners = [
    { name: "Hero FinCorp", logo: "/images/hero fincorp.webp" },
    { name: "HDFC Bank", logo: "/images/HDFC-Bank.png" },
    { name: "Shriram Finance", logo: "/images/Shriram_Finance_Logo.jpg" },
    { name: "L&T Finance", logo: "/images/LT Finance Logo.webp" }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-display font-black text-center mb-16 uppercase tracking-tight text-gray-900">
          Our <span className="text-hero-red">Finance</span> Partners
        </h2>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {partners.map((p, i) => (
            <div 
              key={i} 
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center w-48 h-32 transform hover:-translate-y-2 transition-all duration-300 group"
            >
              <img
                src={p.logo}
                alt={p.name}
                className="max-h-full max-w-full object-contain filter group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}