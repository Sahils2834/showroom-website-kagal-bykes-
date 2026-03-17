import { useState } from "react";
import BikeCard from "../components/BikeCard";
import { useBikes } from "../context/BikesContext";

export default function Bikes(){
  const { bikes, loading } = useBikes();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(500000);
  const [selectedBikes, setSelectedBikes] = useState([]);

  const categories = ["All", "Commuter", "Performance", "Adventure", "Premium", "Scooter"];

  const filteredBikes = bikes.filter(bike => {
    const categoryFilter = selectedCategory === "All" || bike.category === selectedCategory;
    const priceFilter = bike.price <= priceRange;
    return categoryFilter && priceFilter;
  });

  const toggleCompare = (bike) => {
    if (selectedBikes.find(b => b.id === bike.id)) {
      setSelectedBikes(selectedBikes.filter(b => b.id !== bike.id));
    } else if (selectedBikes.length < 3) {
      setSelectedBikes([...selectedBikes, bike]);
    }
  };

  if (loading) return <div className="min-h-screen pt-32 pb-10 text-center text-white text-2xl">Loading Bikes...</div>;

  return(
    <div className="bg-hero-dark min-h-screen pt-32 pb-20 text-white">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-left">
        <h1 className="text-5xl md:text-7xl font-display font-black uppercase italic tracking-tighter mb-4 text-white">
          Explore Our <span className="text-hero-red">Machines</span>
        </h1>
        <p className="text-xl text-gray-400 font-light max-w-2xl">
          Precision engineered for performance. Find your perfect ride from our extensive collection.
        </p>
      </div>

      {/* Filters & Bikes Container */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        
        {/* Mobile Horizontal Category Tabs */}
        <div className="lg:hidden mb-8 -mx-6 px-6 overflow-x-auto whitespace-nowrap scrollbar-hide flex gap-4 no-scrollbar">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full transition-all duration-300 font-display font-black text-xs uppercase tracking-widest border ${
                selectedCategory === category
                  ? "bg-hero-red border-hero-red text-white"
                  : "bg-hero-gray/20 border-white/5 text-gray-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Filters - Desktop Only */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-hero-gray/30 backdrop-blur-sm rounded-3xl border border-white/5 p-8 sticky top-32">
              
              {/* Category Filter */}
              <div className="mb-10">
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-hero-red mb-6 flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-hero-red"></span>
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-5 py-3 rounded-xl transition-all duration-300 font-display font-black text-sm uppercase tracking-widest border ${
                        selectedCategory === category
                          ? "bg-hero-red border-hero-red text-white shadow-[0_0_15px_rgba(231,25,34,0.3)]"
                          : "bg-hero-dark border-white/5 text-gray-400 hover:border-hero-red/50 hover:text-white"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-10">
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-hero-red mb-6 flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-hero-red"></span>
                  Price Range
                </h3>
                <div className="px-1">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-[10px] text-gray-500 uppercase font-black">Up to</span>
                    <span className="text-xl font-display font-black text-white italic">₹{priceRange.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500000"
                    step="5000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-hero-red h-1.5 bg-white/10 rounded-lg cursor-pointer appearance-none"
                  />
                </div>
              </div>

              {/* Comparison Button */}
              {selectedBikes.length > 0 && (
                <button className="w-full bg-white text-black py-4 rounded-xl font-display font-black uppercase tracking-widest text-sm hover:bg-hero-red hover:text-white transition-all duration-300 shadow-xl">
                  Compare {selectedBikes.length} Machines
                </button>
              )}
            </div>
          </div>

          {/* Bikes Section */}
          <div className="flex-1">
            {/* Horizontal Scroll for Mobile, Grid for Desktop */}
            <div className="flex lg:grid lg:grid-cols-2 gap-6 lg:gap-8 overflow-x-auto lg:overflow-visible scrollbar-hide snap-x -mx-6 px-6 lg:mx-0 lg:px-0 no-scrollbar">
              {filteredBikes.length > 0 ? (
                filteredBikes.map((bike) => (
                  <div key={bike.id} className="relative group/card flex-shrink-0 w-[78%] sm:w-[70%] lg:w-auto snap-center">
                    <BikeCard bike={bike} />
                    {/* Compare Checkbox */}
                    <button
                      onClick={() => toggleCompare(bike)}
                      className={`absolute top-6 right-6 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-20 backdrop-blur-md ${
                        selectedBikes.find(b => b.id === bike.id)
                          ? "bg-hero-red border-hero-red text-white"
                          : "bg-black/20 border-white/20 text-white/50 hover:border-hero-red hover:text-white"
                      }`}
                    >
                      {selectedBikes.find(b => b.id === bike.id) ? "✓" : "+"}
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-24 text-center bg-hero-gray/20 rounded-[3rem] border border-white/5 w-full">
                  <p className="text-3xl font-display font-black text-white uppercase italic tracking-tighter mb-4">No Machines Match</p>
                  <p className="text-gray-500 font-light">Try adjusting your filters or category choice.</p>
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="mt-16 flex items-center gap-6">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-gray-500">
                Showing <span className="text-white">{filteredBikes.length}</span> of <span className="text-white">{bikes.length}</span> Machines
              </p>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}