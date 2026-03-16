export default function Deliveries(){
  return(
    <div className="bg-gray-50 min-h-screen pt-24 pb-10">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Customer Deliveries</h1>
        <p className="text-xl text-gray-600">Gallery of happy customers receiving their bikes</p>
      </div>

      {/* Deliveries Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg h-80">
              {/* Placeholder */}
              <div className="bg-gradient-to-br from-red-500 to-gray-900 h-full flex items-center justify-center text-6xl group-hover:scale-110 transition">
                Bike
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex flex-col justify-end p-6">
                <div className="text-white transform translate-y-8 group-hover:translate-y-0 transition">
                  <p className="font-bold text-lg">Customer Delivery #{i + 1}</p>
                  <p className="text-sm text-gray-200">Happy customer moment</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Stories */}
        <div className="mt-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">R</span>
                <div>
                  <p className="font-bold text-gray-900">Rajesh Kumar</p>
                  <p className="text-sm text-gray-600">Splendor+ Owner</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Excellent service! The team at Kagal Bykes helped me choose the perfect bike within my budget. Very satisfied with the purchase and after-sales service."
              </p>
              <div className="flex text-yellow-400">
                *****
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">P</span>
                <div>
                  <p className="font-bold text-gray-900">Priya Sharma</p>
                  <p className="text-sm text-gray-600">Xoom 110 Owner</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Best showroom in Kagal! They provided perfect financing options and delivered my bike on time. The service center is amazing too!"
              </p>
              <div className="flex text-yellow-400">
                *****
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">V</span>
                <div>
                  <p className="font-bold text-gray-900">Vikram Singh</p>
                  <p className="text-sm text-gray-600">Karizma XMR Owner</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Amazing experience! Took test ride of multiple bikes and the staff was very knowledgeable. Happy with my performance bike!"
              </p>
              <div className="flex text-yellow-400">
                *****
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-16 bg-gradient-to-r from-gray-900 to-black text-white p-12 rounded-xl">
          <h2 className="text-4xl font-bold mb-8 text-center">Kagal Bykes Achievements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-5xl font-bold text-red-500 mb-2">500+</p>
              <p className="text-lg">Happy Customers</p>
            </div>

            <div className="text-center">
              <p className="text-5xl font-bold text-red-500 mb-2">8+</p>
              <p className="text-lg">Years of Service</p>
            </div>

            <div className="text-center">
              <p className="text-5xl font-bold text-red-500 mb-2">100%</p>
              <p className="text-lg">Original Products</p>
            </div>

            <div className="text-center">
              <p className="text-5xl font-bold text-red-500 mb-2">24/7</p>
              <p className="text-lg">Customer Support</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Join Our Happy Customers?</h2>
          <p className="text-lg text-gray-600 mb-8">Pick your perfect bike today and become part of the Kagal Bykes family</p>
          
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="bg-red-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-600 transition transform hover:scale-105">
              Explore Bikes
            </button>
            <button className="bg-white text-black px-8 py-3 rounded-lg font-bold border-2 border-red-500 hover:bg-red-50 transition transform hover:scale-105">
              Book Test Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}