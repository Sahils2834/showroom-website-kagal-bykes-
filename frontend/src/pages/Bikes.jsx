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
    <div className="bg-gray-50 min-h-screen pt-24 pb-10">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Explore Our Bikes</h1>
        <p className="text-xl text-gray-600">Find your perfect ride from our extensive collection</p>
      </div>

      {/* Filters & Bikes Container */}
      <div className="max-w-7xl mx-auto px-4 pb-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-20">
              
              {/* Category Filter */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-3 mb-8">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition font-semibold ${
                      selectedCategory === category
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Price Range Filter */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">Price Range</h3>
              <div className="mb-6">
                <input
                  type="range"
                  min="0"
                  max="500000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Up to: ₹{priceRange.toLocaleString()}
                </p>
              </div>

              {/* Comparison Button */}
              {selectedBikes.length > 0 && (
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-bold hover:bg-blue-600 transition">
                  Compare {selectedBikes.length} Bike{selectedBikes.length !== 1 ? 's' : ''}
                </button>
              )}
            </div>
          </div>

          {/* Bikes Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBikes.length > 0 ? (
                filteredBikes.map((bike) => (
                  <div key={bike.id} className="relative">
                    <BikeCard bike={bike} />
                    {/* Compare Checkbox */}
                    <button
                      onClick={() => toggleCompare(bike)}
                      className={`absolute top-4 right-4 w-6 h-6 rounded border-2 flex items-center justify-center transition ${
                        selectedBikes.find(b => b.id === bike.id)
                          ? "bg-blue-500 border-blue-500 text-white"
                          : "border-gray-300 hover:border-blue-500"
                      }`}
                    >
                      {selectedBikes.find(b => b.id === bike.id) && "✓"}
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-2xl text-gray-600">No bikes found in this category</p>
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="mt-8 text-center text-gray-600">
              <p>Showing {filteredBikes.length} of {bikes.length} bikes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}