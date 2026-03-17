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
    <section className="relative overflow-hidden bg-hero-dark text-white rounded-[2rem] shadow-2xl border border-white/5 group my-20">
      <div className="absolute inset-0 bg-gradient-to-r from-hero-red/10 via-transparent to-transparent opacity-50"></div>
      <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none transition-transform duration-1000 group-hover:scale-110"></div>
      
      <div className="relative z-10 py-12 px-6 md:py-16 md:px-12 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
        <div className="text-center md:text-left mb-10 md:mb-0">
          <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
            <span className="w-10 h-[1px] bg-hero-red"></span>
            <p className="uppercase tracking-[0.4em] font-black text-[10px] text-hero-red">Limited Offer</p>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter italic mb-4">
            {offer.title.split(' ')[0]} <span className="text-hero-red">{offer.title.split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-base md:text-lg font-light text-gray-400 max-w-lg leading-relaxed">
            {offer.subtitle.replace(`₹${offer.discount}`, `₹${offer.discount.toLocaleString()}`)}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <Link to="/bikes">
            <button className="bg-hero-red text-white px-10 py-4 rounded-xl font-display font-black uppercase tracking-widest shadow-2xl shadow-hero-red/20 hover:bg-hero-red-light transform hover:-translate-y-1 transition-all duration-300">
              Claim Offer
            </button>
          </Link>
          <p className="mt-4 text-[10px] text-gray-600 uppercase tracking-widest font-bold">*Terms and Conditions apply</p>
        </div>
      </div>
      
      {/* Red accent line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-hero-red to-transparent"></div>
    </section>
  );
}