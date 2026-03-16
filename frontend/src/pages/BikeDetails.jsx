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
    <div className="bg-gray-50 min-h-screen pt-24 pb-10">
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <a href="/bikes" className="text-red-500 hover:text-red-600">← Back to Bikes</a>
      </div>

      {/* Main Details Section */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* View Image / 3D Viewer */}
          <div>
            {bike.image ? (
              <div className="bg-white p-4 rounded-xl shadow border">
                <img src={bike.image} alt={bike.name} className="w-full object-contain h-[400px]" />
              </div>
             ) : (
              <Bike360Viewer />
             )}
            <div className="mt-6 text-center text-gray-600 text-sm">
              View from all angles
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="mb-6">
              <p className="text-red-500 font-bold text-lg mb-2">{bike.category}</p>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">{bike.name}</h1>
              <p className="text-gray-600 text-lg mb-6">{bike.description || "Powerful and stylish performance machine."}</p>
            </div>

            {/* Price Section */}
            <div className="bg-white p-8 rounded-xl shadow-lg mb-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Showroom Price</p>
                  <p className="text-3xl font-bold text-red-500">₹{(bike.price || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">On-Road Estim.</p>
                  <p className="text-3xl font-bold text-green-500">₹{((bike.price || 0) * 1.15).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-600 transition tracking-wider uppercase">
                  Book Test Ride
                </button>
                <button className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition tracking-wider uppercase">
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
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Available Colors</h3>
                <div className="flex flex-wrap gap-3">
                  {(bike.colors || bike.color).map((c, idx) => (
                    <button
                      key={idx}
                      className={`px-4 py-2 rounded-lg font-semibold transition border-2 ${
                        idx === 0
                          ? 'bg-red-500 text-white border-red-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-red-500'
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
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specs.map((spec, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition">
              <p className="text-gray-600 text-sm mb-1">{spec.label}</p>
              <p className="text-2xl font-bold text-gray-900">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Features */}
      {bike.features && bike.features.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bike.features.map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-lg flex items-start gap-4">
                <span className="text-2xl flex-shrink-0 text-red-500">✓</span>
                <div>
                  <p className="font-semibold text-gray-900">{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Bikes */}
      {relatedBikes.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Similar Bikes in {bike.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedBikes.map((relBike) => (
              <a key={relBike.id} href={`/bike/${relBike.id}`}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer">
                  <div className="bg-white h-40 flex items-center justify-center p-4">
                    <img src={relBike.image} alt={relBike.name} className="h-full object-contain" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{relBike.name}</h3>
                    <p className="text-red-500 text-sm mb-2">₹{(relBike.price || 0).toLocaleString()}</p>
                    <p className="text-gray-600 text-sm">{relBike.mileage} • {relBike.engine}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Appointment Section */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="bg-gradient-to-r from-gray-900 to-black text-white p-12 rounded-xl">
          <h2 className="text-4xl font-bold mb-4 text-center">Schedule Your Test Ride</h2>
          <p className="text-center text-gray-300 mb-8">Book a test ride for {bike.name} today!</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg -mt-6 relative z-10">
          <AppointmentForm />
        </div>
      </div>

    </div>
  );
}