export default function Deliveries(){
  return(
    <div className="bg-hero-dark min-h-screen pt-32 pb-20 text-white">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-20 text-left">
        <h1 className="text-5xl md:text-7xl font-display font-black uppercase italic tracking-tighter mb-4 text-white">
          Happy <span className="text-hero-red">Deliveries</span>
        </h1>
        <p className="text-xl text-gray-400 font-light max-w-2xl">
          Celebrating the moment of pure joy as our riders take home their new Hero machines.
        </p>
      </div>

      {/* Deliveries Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="group relative rounded-3xl overflow-hidden shadow-2xl h-[400px] border border-white/5">
              {/* Photo Placeholder with Pattern */}
              <div className="absolute inset-0 bg-hero-gray flex items-center justify-center text-8xl font-display font-black text-black/20 group-hover:scale-110 transition-transform duration-1000 uppercase italic">
                {i % 2 === 0 ? "Hero" : "Joy"}
              </div>

              {/* Glass Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-hero-dark via-transparent to-transparent opacity-90" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-hero-red font-black text-[10px] uppercase tracking-[0.3em] mb-2 block">New Member</span>
                <h3 className="text-2xl font-display font-black text-white uppercase italic leading-tight mb-2">
                  Delivery #{500 + i}
                </h3>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  Jaisingh Rao Park, Kagal
                </p>
              </div>
              
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-hero-red/10 rounded-bl-[4rem] transform translate-x-12 -translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700"></div>
            </div>
          ))}
        </div>

        {/* Success Stories */}
        <div className="mt-32">
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic tracking-tighter text-white">
              Success <span className="text-hero-red">Stories</span>
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-hero-red/50 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rajesh Kumar", bike: "Splendor+ XTEC", initial: "R", text: "Excellent service! The team at Kagal Bykes helped me choose the perfect bike within my budget. Very satisfied with the purchase and after-sales service." },
              { name: "Priya Sharma", bike: "Xoom 110", initial: "P", text: "Best showroom in Kagal! They provided perfect financing options and delivered my bike on time. The service center is amazing too!" },
              { name: "Vikram Singh", bike: "Karizma XMR", initial: "V", text: "Amazing experience! Took test ride of multiple bikes and the staff was very knowledgeable. Happy with my performance bike!" }
            ].map((story, i) => (
              <div key={i} className="bg-hero-gray/30 backdrop-blur-sm p-10 rounded-[2.5rem] border border-white/5 relative group hover:border-hero-red/30 transition-all duration-500">
                <div className="absolute -top-6 left-10 w-12 h-12 bg-hero-red rounded-2xl flex items-center justify-center text-white font-display font-black text-xl shadow-lg shadow-hero-red/30 group-hover:rotate-12 transition-transform">
                  {story.initial}
                </div>
                
                <div className="mt-4 mb-6">
                  <p className="font-display font-black text-white uppercase tracking-tight text-xl">{story.name}</p>
                  <p className="text-hero-red text-[10px] font-black uppercase tracking-widest mt-1">{story.bike} Owner</p>
                </div>

                <p className="text-gray-400 font-light leading-relaxed italic mb-8">
                  "{story.text}"
                </p>

                <div className="flex gap-1 text-hero-red text-xs">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-32 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-hero-red to-red-900 rounded-[3rem] blur opacity-10"></div>
          <div className="relative bg-[#080808] p-12 md:p-20 rounded-[3rem] border border-white/5 overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 relative z-10">
              <div className="text-center group/stat">
                <p className="text-5xl md:text-7xl font-display font-black text-white italic mb-2 group-hover/stat:text-hero-red transition-colors">500<span className="text-hero-red">+</span></p>
                <p className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500">Happy Customers</p>
              </div>

              <div className="text-center group/stat">
                <p className="text-5xl md:text-7xl font-display font-black text-white italic mb-2 group-hover/stat:text-hero-red transition-colors">8<span className="text-hero-red">+</span></p>
                <p className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500">Years of Service</p>
              </div>

              <div className="text-center group/stat">
                <p className="text-5xl md:text-7xl font-display font-black text-white italic mb-2 group-hover/stat:text-hero-red transition-colors">100<span className="text-hero-red">%</span></p>
                <p className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500">Genuine Spares</p>
              </div>

              <div className="text-center group/stat">
                <p className="text-5xl md:text-7xl font-display font-black text-white italic mb-2 group-hover/stat:text-hero-red transition-colors">24<span className="text-hero-red">/</span>7</p>
                <p className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500">Expert Support</p>
              </div>
            </div>
            
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-hero-red/5 rounded-full blur-[120px] pointer-events-none"></div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-32 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase italic tracking-tighter mb-8 max-w-4xl mx-auto">
            Ready to Join Our <span className="text-hero-red">Legacy?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-light">
            Start your journey with Kagal Bykes today. Premium service, easy finance, and pure performance await.
          </p>
          
          <div className="flex justify-center gap-6 flex-wrap">
            <button className="bg-hero-red text-white px-12 py-5 rounded-2xl font-display font-black uppercase tracking-widest hover:bg-hero-red-light transition-all duration-300 shadow-2xl shadow-hero-red/20 transform hover:-translate-y-1">
              Explore Bikes
            </button>
            <button className="bg-transparent border-2 border-white text-white px-12 py-5 rounded-2xl font-display font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1">
              Book Test Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}