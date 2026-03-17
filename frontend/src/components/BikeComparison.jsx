import { useState } from "react";
import { bikesData } from "../data/bikesData";

export default function BikeComparison() {

  const [selectedBikes, setSelectedBikes] = useState([bikesData[0], bikesData[1]]);

  const handleBikeChange = (index, bikeId) => {
    const bike = bikesData.find(b => b.id === Number(bikeId));
    const newSelection = [...selectedBikes];
    newSelection[index] = bike;
    setSelectedBikes(newSelection);
  };

  return (
    <div className="bg-hero-gray/20 backdrop-blur-sm rounded-[2rem] border border-white/5 p-8 md:p-12 relative overflow-hidden group">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-hero-red/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-hero-red/10 transition-all duration-700"></div>

      <div className="relative z-10">
        <h2 className="text-3xl font-display font-black mb-10 text-white uppercase italic tracking-tighter">
          Machine <span className="text-hero-red">Comparison</span>
        </h2>

        {/* Selection Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {selectedBikes.map((bike, index) => (
            <div key={index} className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black ml-1 block">
                {index === 0 ? 'First Selection' : 'Second Selection'}
              </label>
              <div className="relative">
                <select
                  value={bike.id}
                  onChange={(e) => handleBikeChange(index, e.target.value)}
                  className="w-full bg-hero-dark border border-white/10 p-4 rounded-xl focus:outline-none focus:border-hero-red text-white transition-all appearance-none cursor-pointer font-bold"
                >
                  {bikesData.map(b => (
                    <option key={b.id} value={b.id} className="bg-hero-dark">
                      {b.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-hero-red">
                   ↓
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto -mx-8 md:mx-0">
          <table className="w-full text-sm min-w-[500px]">
            <thead className="bg-hero-dark/50">
              <tr>
                <th className="text-left py-6 px-6 font-display font-black uppercase tracking-widest text-gray-400 border-b border-white/5">Spec</th>
                {selectedBikes.map((bike) => (
                  <th key={bike.id} className="py-6 px-6 font-display font-black uppercase tracking-widest text-hero-red border-b border-white/5 text-center">
                    {bike.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { label: 'Ex-Showroom Price', key: 'price' },
                { label: 'Engine Capacity', key: 'engine' },
                { label: 'Claimed Mileage', key: 'mileage' },
                { label: 'Maximum Speed', key: 'topSpeed' },
                { label: 'Segment', key: 'category' }
              ].map((spec) => (
                <tr key={spec.key} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-5 px-6 font-bold text-gray-400 uppercase tracking-wider text-[11px]">{spec.label}</td>
                  {selectedBikes.map((bike) => (
                    <td key={bike.id} className="py-5 px-6 text-center font-display font-black text-white italic text-lg">
                      {spec.key === 'price' ? `₹${bike.price.toLocaleString()}` : bike[spec.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Feature List */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {selectedBikes.map((bike) => (
            <div key={bike.id} className="bg-hero-dark/30 rounded-2xl border border-white/5 p-8 hover:border-hero-red/30 transition-all duration-300">
              <h3 className="text-xl font-display font-black text-white mb-6 uppercase italic tracking-tight flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-hero-red"></span>
                {bike.name} Features
              </h3>
              <ul className="space-y-4">
                {bike.features.map((feature, idx) => (
                  <li key={idx} className="text-xs text-gray-400 flex items-center gap-3 font-medium uppercase tracking-widest">
                    <span className="text-hero-red text-sm">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}