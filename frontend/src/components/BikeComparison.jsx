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
    <div className="bg-white rounded-xl shadow-lg p-8">

      <h2 className="text-3xl font-bold mb-6 text-gray-900">
        Compare Bikes
      </h2>

      {/* Selection Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {selectedBikes.map((bike, index) => (
          <div key={index}>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {index === 0 ? 'First Bike' : 'Second Bike'}
            </label>
            <select
              value={bike.id}
              onChange={(e) => handleBikeChange(index, e.target.value)}
              className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-red-500 font-semibold text-gray-900"
            >
              {bikesData.map(b => (
                <option key={b.id} value={b.id} className="text-gray-900">
                  {b.name} - {b.category}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-4 px-4 font-bold text-gray-900">Feature</th>
              {selectedBikes.map((bike) => (
                <th key={bike.id} className="py-4 px-4 font-bold text-center text-gray-900">
                  {bike.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: 'Price', key: 'price' },
              { label: 'Engine', key: 'engine' },
              { label: 'Mileage', key: 'mileage' },
              { label: 'Top Speed', key: 'topSpeed' },
              { label: 'Category', key: 'category' }
            ].map((spec) => (
              <tr key={spec.key} className="border-t hover:bg-gray-50">
                <td className="py-4 px-4 font-semibold text-gray-700">{spec.label}</td>
                {selectedBikes.map((bike) => (
                  <td key={bike.id} className="py-4 px-4 text-center text-gray-600">
                    {spec.key === 'price' ? `₹${bike.price.toLocaleString()}` : bike[spec.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feature List */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {selectedBikes.map((bike) => (
          <div key={bike.id} className="border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{bike.name}</h3>
            <h4 className="font-semibold text-gray-700 mb-3">Key Features</h4>
            <ul className="space-y-2">
              {bike.features.map((feature, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-center">
                  <span className="text-red-500 mr-2">✓</span> {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </div>
  );
}