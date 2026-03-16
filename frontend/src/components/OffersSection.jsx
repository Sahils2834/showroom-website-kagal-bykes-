import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function OffersSection() {
  const [offer, setOffer] = useState({
    title: "Festival Offers",
    discount: 7000,
    subtitle: "Get up to ₹7,000 discount on selected Hero performance machines. Limited time only."
  });

  useEffect(() => {
    async function fetchOffer() {
      const { data } = await supabase.from('site_config').select('exclusive_deal').eq('id', 1).single();
      if (data?.exclusive_deal) {
        setOffer(data.exclusive_deal);
      }
    }
    fetchOffer();
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-hero-red to-hero-dark text-white rounded-2xl shadow-2xl border border-hero-red/30 group">
      <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10 mix-blend-overlay pointer-events-none transition-transform duration-1000 group-hover:scale-110"></div>
      
      <div className="relative z-10 py-16 px-8 flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto">
        <div className="text-center md:text-left mb-8 md:mb-0">
          <p className="uppercase tracking-[0.3em] font-bold text-xs text-white/70 mb-2">EXCLUSIVE DEAL</p>
          <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight mb-2">
            {offer.title}
          </h2>
          <p className="text-lg md:text-xl font-light text-white/90 max-w-md">
            {offer.subtitle.replace(`₹${offer.discount}`, `₹${offer.discount.toLocaleString()}`)}
          </p>
        </div>

        <div>
          <Link to="/bikes">
            <button className="bg-white text-hero-red px-8 py-4 rounded font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:-translate-y-1 transition-all duration-300">
              VIEW OFFERS
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}