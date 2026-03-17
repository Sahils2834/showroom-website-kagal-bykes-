import { useParams } from "react-router-dom";
import { useBikes } from "../context/BikesContext";
import Bike360Viewer from "../components/Bike360Viewer";
import AppointmentForm from "../components/AppointmentForm";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function BikeDetails(){
  const { id } = useParams();
  const { bikes, loading } = useBikes();
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    supabase.from('site_config').select('exclusive_deal').eq('id', 1).single().then(({ data }) => {
      if (data?.exclusive_deal) {
        setOffer(data.exclusive_deal);
      }
    });
  }, []);

  if (loading) return <div className="min-h-screen pt-32 pb-10 text-center text-white text-2xl">Loading...</div>;
  if (!bikes || bikes.length === 0) return <div className="min-h-screen pt-32 pb-10 text-center text-white text-2xl">Bike not found.</div>;

  const bike = bikes.find(b => b.id === Number(id)) || bikes[0];
  const relatedBikes = bikes.filter(b => b.category === bike.category && b.id !== bike.id).slice(0, 3);

  const specs = [
    { label: 'Engine', value: bike.engine, icon: '' },
    { label: 'Mileage', value: bike.mileage, icon: '' },
    { label: 'Top Speed', value: bike.topSpeed || "N/A", icon: '' },
    { label: 'Category', value: bike.category, icon: '' },
    { label: 'Colors Available', value: Array.isArray(bike.colors) ? bike.colors.join(', ') : (bike.color ? bike.color.join(', ') : "Standard"), icon: '' },
    { label: 'Price', value: `₹${(bike.price || 0).toLocaleString()}`, icon: '' }
  ];

  return(
    <div className="bg-hero-dark min-h-screen pt-24 pb-10 text-white">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <a href="/bikes" className="text-hero-red hover:text-red-400 font-bold transition-colors">← Back to Bikes</a>
      </div>

      {/* Main Details Section */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* View Image / 3D Viewer */}
          <div>
            {bike.image ? (
              <div className="bg-hero-gray/20 p-4 rounded-3xl shadow-2xl border border-white/5 backdrop-blur-sm">
                <img src={bike.image} alt={bike.name} className="w-full object-contain h-[300px] md:h-[400px]" />
              </div>
             ) : (
              <Bike360Viewer />
             )}
            <div className="mt-6 text-center text-gray-500 text-xs uppercase tracking-widest">
              View from all angles
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="mb-6">
              <p className="text-hero-red font-black text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-hero-red"></span>
                {bike.category}
              </p>
              <h1 className="text-5xl md:text-6xl font-display font-black text-white italic uppercase tracking-tighter mb-4">{bike.name}</h1>
              <p className="text-gray-400 text-lg font-light leading-relaxed mb-6">{bike.description || "Powerful and stylish performance machine."}</p>
            </div>

            {/* Price Section */}
            <div className="bg-hero-gray/30 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl mb-6">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">Showroom Price</p>
                  <p className="text-3xl font-display font-black text-hero-red italic">₹{(bike.price || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">On-Road Estim.</p>
                  <p className="text-3xl font-display font-black text-green-500 italic">₹{((bike.price || 0) * 1.15).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-hero-red text-white px-6 py-4 rounded-xl font-display font-black tracking-widest uppercase hover:bg-red-700 transition shadow-lg shadow-hero-red/20 active:scale-95">
                  Book Test Ride
                </button>
                <button className="flex-1 bg-white/5 border border-white/10 text-white px-6 py-4 rounded-xl font-display font-black tracking-widest uppercase hover:bg-white/10 transition active:scale-95">
                  Apply Finance
                </button>
              </div>
            </div>

            {/* Offer Section */}
            {(bike.discount > 0 || (offer && offer.discount > 0)) && (
              <div className="bg-gradient-to-r from-red-600 to-red-800 p-6 rounded-xl shadow-lg mb-6 text-white relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                <div className="flex items-center justify-between mb-2 relative z-10">
                  <h3 className="text-xl font-bold uppercase tracking-wider">
                    🌟 {bike.discount > 0 ? (bike.offer_title || "Special Offer") : offer.title}
                  </h3>
                  <span className="bg-white text-red-700 font-black px-3 py-1 rounded text-sm shadow">
                    Save ₹{(bike.discount > 0 ? bike.discount : offer.discount).toLocaleString()}
                  </span>
                </div>
                <p className="font-light text-sm opacity-90 relative z-10">
                  {bike.discount > 0 ? `Get this exclusive deal on the new ${bike.name}!` : offer.subtitle}
                </p>
              </div>
            )}

            {/* Color Selection */}
            {(bike.colors && bike.colors.length > 0) || (bike.color && bike.color.length > 0) ? (
              <div className="bg-hero-gray/20 backdrop-blur-sm p-6 rounded-3xl border border-white/5 shadow-xl">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Available Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {(bike.colors || bike.color).map((c, idx) => (
                    <button
                      key={idx}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition border ${
                        idx === 0
                          ? 'bg-hero-red text-white border-hero-red shadow-lg shadow-hero-red/20'
                          : 'bg-white/5 text-gray-400 border-white/5 hover:border-hero-red/50 hover:text-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="max-w-7xl mx-auto px-4 mb-20">
        <h2 className="text-4xl md:text-5xl font-display font-black text-white italic uppercase tracking-tighter mb-10">Specifications</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          {specs.map((spec, idx) => (
            <div key={idx} className="bg-hero-gray/20 backdrop-blur-sm p-6 rounded-3xl border border-white/5 shadow-xl hover:border-hero-red/30 transition-all group">
              <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-2 group-hover:text-hero-red transition-colors">{spec.label}</p>
              <p className="text-lg md:text-2xl font-display font-black text-white italic uppercase">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* The Machine Visual Section */}
      <div className="max-w-7xl mx-auto px-4 mb-20">
        <div className="bg-hero-gray/10 rounded-[3rem] border border-white/5 p-8 md:p-16 relative overflow-hidden">
           <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
              <div className="flex-1">
                <h3 className="text-hero-red font-black text-[10px] uppercase tracking-[0.4em] mb-4">Performance</h3>
                <h2 className="text-5xl md:text-7xl font-display font-black text-white italic uppercase tracking-tighter mb-8 leading-none">
                  The <span className="text-hero-red">Machine</span>
                </h2>
                <p className="text-gray-400 font-light text-lg mb-10 max-w-md">
                  Engineered with precision components and calibrated for peak power delivery across all terrains.
                </p>
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <p className="text-hero-red font-black text-2xl md:text-4xl italic mb-1">{bike.engine?.split(' ')[0] || "199"}</p>
                    <p className="text-[8px] uppercase font-bold text-gray-500 tracking-widest">Displacement (CC)</p>
                  </div>
                  <div>
                    <p className="text-white font-black text-2xl md:text-4xl italic mb-1">19.1</p>
                    <p className="text-[8px] uppercase font-bold text-gray-500 tracking-widest">Max Power (PS)</p>
                  </div>
                  <div>
                    <p className="text-white font-black text-2xl md:text-4xl italic mb-1">17.35</p>
                    <p className="text-[8px] uppercase font-bold text-gray-500 tracking-widest">Torque (NM)</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 relative">
                <img src={bike.image} alt="Machine" className="w-full object-contain rotate-[-5deg] scale-110 drop-shadow-[0_20px_50px_rgba(231,25,34,0.2)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-hero-dark via-transparent to-transparent"></div>
              </div>
           </div>
           {/* Background Text */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-display font-black text-white/[0.02] uppercase italic select-none pointer-events-none whitespace-nowrap">
             PRECISION
           </div>
        </div>
      </div>

      {/* Key Features */}
      {bike.features && bike.features.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-black text-white italic uppercase tracking-tighter mb-10">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bike.features.map((feature, idx) => (
              <div key={idx} className="bg-hero-gray/20 backdrop-blur-sm p-6 rounded-3xl border border-white/5 flex items-center gap-6 group hover:border-hero-red/30 transition-all">
                <span className="w-12 h-12 flex items-center justify-center bg-hero-red/10 rounded-2xl text-hero-red font-black text-xl group-hover:bg-hero-red group-hover:text-white transition-all">✓</span>
                <div>
                  <p className="font-display font-black text-white italic uppercase tracking-wider">{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Bikes */}
      {relatedBikes.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-black text-white italic uppercase tracking-tighter mb-10">Similar <span className="text-hero-red">Machines</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedBikes.map((relBike) => (
              <a key={relBike.id} href={`/bike/${relBike.id}`} className="group">
                <div className="bg-hero-gray/20 backdrop-blur-sm rounded-3xl border border-white/5 overflow-hidden hover:border-hero-red/30 transition-all shadow-xl h-full flex flex-col">
                  <div className="bg-white/5 h-48 flex items-center justify-center p-6 relative overflow-hidden">
                    <img src={relBike.image} alt={relBike.name} className="h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-display font-black text-white italic uppercase mb-2 group-hover:text-hero-red transition-colors">{relBike.name}</h3>
                      <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-4">{relBike.mileage} • {relBike.engine}</p>
                    </div>
                    <p className="text-2xl font-display font-black text-hero-red italic">₹{(relBike.price || 0).toLocaleString()}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Appointment Section */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="bg-gradient-to-br from-hero-red to-red-900 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <h2 className="text-4xl md:text-6xl font-display font-black mb-4 text-center italic uppercase tracking-tighter">Schedule Your <span className="text-white">Experience</span></h2>
          <p className="text-center text-white/70 font-light mb-8 max-w-xl mx-auto">Book a premium test ride session for the {bike.name} at your nearest dealership.</p>
        </div>
        <div className="bg-hero-dark border border-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-2xl -mt-6 relative z-10 max-w-4xl mx-auto">
          <AppointmentForm />
        </div>
      </div>

    </div>
  );
}