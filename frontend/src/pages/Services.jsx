import { useState } from "react";
import { serviceCategories } from "../data/bikesData";
import AppointmentForm from "../components/AppointmentForm";
import { FaUserCheck, FaCogs, FaBolt, FaClipboardList } from "react-icons/fa";

export default function Services(){
  const [selectedService, setSelectedService] = useState(null);

  return(
    <div className="bg-hero-dark min-h-screen pt-32 pb-20 text-white">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-20 text-left">
        <h1 className="text-5xl md:text-7xl font-display font-black uppercase italic tracking-tighter mb-4 text-white">
          Expert <span className="text-hero-red">Garage</span>
        </h1>
        <p className="text-xl text-gray-400 font-light max-w-2xl">
          Precision maintenance and genuine care for your Hero machine. Keep the thrill alive with our expert services.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCategories.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
              className={`p-8 rounded-[2rem] border transition-all duration-500 cursor-pointer relative group overflow-hidden ${
                selectedService === service.id
                  ? "bg-hero-red border-hero-red shadow-2xl shadow-hero-red/30 scale-[1.02]"
                  : "bg-hero-gray/30 border-white/5 hover:border-hero-red/30 hover:bg-hero-gray/50"
              }`}
            >
              <div className="relative z-10">
                <h3 className="text-xl font-display font-black uppercase italic tracking-tight mb-3">
                  {service.name}
                </h3>
                <p className={`text-sm mb-8 font-light leading-relaxed ${selectedService === service.id ? "text-white/90" : "text-gray-400"}`}>
                  {service.description}
                </p>
                <div className={`flex justify-between items-center pt-6 border-t ${selectedService === service.id ? "border-white/20" : "border-white/5"}`}>
                  <span className="font-display font-black italic text-lg">₹{service.price}</span>
                  <span className="text-[10px] uppercase font-black tracking-widest">{service.time}</span>
                </div>
              </div>
              
              {/* Decorative Number on hover */}
              <div className="absolute -bottom-4 -right-4 text-7xl font-display font-black text-white/5 italic group-hover:text-white/10 transition-colors pointer-events-none">
                0{service.id}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Details & Booking */}
      {selectedService && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto px-6 mb-32"
        >
          <div className="bg-hero-gray/40 backdrop-blur-xl rounded-[3rem] border border-hero-red/30 p-12 md:p-16 relative overflow-hidden">
            {serviceCategories
              .filter((s) => s.id === selectedService)
              .map((service) => (
                <div key={service.id} className="relative z-10">
                  <span className="text-hero-red font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Selected Package</span>
                  <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6 uppercase italic tracking-tighter">{service.name}</h2>
                  <p className="text-xl text-gray-400 mb-10 font-light italic leading-relaxed">"{service.description}"</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                    <div className="bg-black/40 p-8 rounded-3xl border border-white/5">
                      <p className="text-[10px] uppercase font-black tracking-widest text-gray-500 mb-2">Service Fee</p>
                      <p className="text-4xl font-display font-black text-hero-red italic">₹{service.price}</p>
                    </div>
                    <div className="bg-black/40 p-8 rounded-3xl border border-white/5">
                      <p className="text-[10px] uppercase font-black tracking-widest text-gray-500 mb-2">Est. Turnaround</p>
                      <p className="text-4xl font-display font-black text-white italic">{service.time}</p>
                    </div>
                  </div>

                  <button className="w-full bg-hero-red text-white px-12 py-5 rounded-2xl font-display font-black uppercase tracking-widest hover:bg-hero-red-light transition-all shadow-xl shadow-hero-red/20 transform hover:-translate-y-1">
                    Initialize Booking
                  </button>
                </div>
              ))}
            <div className="absolute top-0 right-0 w-64 h-64 bg-hero-red/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
          </div>
        </motion.div>
      )}

      {/* Why Choose Our Services */}
      <div className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-20 leading-none">
          <span className="text-hero-red font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">The Excellence</span>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase italic tracking-tighter">Certified <span className="text-hero-red">Care</span></h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <FaUserCheck className="mx-auto" />, title: "Certified Techs", desc: "Trained Hero experts" },
            { icon: <FaCogs className="mx-auto" />, title: "Genuine Spares", desc: "100% original Hero parts" },
            { icon: <FaBolt className="mx-auto" />, title: "Rapid Turnaround", desc: "Express service options" },
            { icon: <FaClipboardList className="mx-auto" />, title: "Digital Logs", desc: "Modern maintenance history" }
          ].map((item, i) => (
            <div key={i} className="bg-hero-gray/20 p-10 rounded-3xl border border-white/5 text-center group hover:bg-hero-gray/40 transition-all duration-500">
              <div className="text-5xl mb-6 text-hero-red transform group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="font-display font-black text-white mb-2 uppercase italic tracking-tight">{item.title}</h3>
              <p className="text-gray-500 text-xs font-medium uppercase tracking-widest">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Form Section */}
      <div className="max-w-7xl mx-auto px-6 mb-32 relative">
         <div className="absolute inset-0 bg-hero-red/5 blur-[120px] rounded-full w-2/3 mx-auto pointer-events-none"></div>
         <div className="relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase italic tracking-tighter mb-4">Secure Your <span className="text-hero-red">Slot</span></h2>
              <p className="text-gray-400 font-light text-xl">Elite maintenance is just a few clicks away.</p>
            </div>
            <AppointmentForm />
         </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-black text-white uppercase italic tracking-tighter">Service <span className="text-hero-red">Intelligence</span></h2>
        </div>

        <div className="space-y-4">
          {[
            { q: "Service frequency?", a: "We recommend professional service every 3000-4000 km or 4 months." },
            { q: "Original parts?", a: "Exclusively. We only use certified Hero Genuine Parts for maximum performance." },
            { q: "Service warranty?", a: "All professional work carries a 30-day technical assurance period." },
            { q: "Pick & Drop?", a: "Priority logistics available for premium packages and loyalty members." }
          ].map((faq, i) => (
            <div key={i} className="bg-hero-gray/20 border border-white/5 p-8 rounded-2xl hover:border-hero-red/30 transition-all">
              <h3 className="font-display font-black text-white mb-3 uppercase italic tracking-tight flex items-center gap-4">
                <span className="text-hero-red">Q.</span> {faq.q}
              </h3>
              <p className="text-gray-400 font-light leading-relaxed pl-8 border-l border-hero-red/20">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}