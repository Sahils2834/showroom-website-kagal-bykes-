import { useState } from "react";
import { serviceCategories } from "../data/bikesData";
import AppointmentForm from "../components/AppointmentForm";
import { FaUserCheck, FaCogs, FaBolt, FaClipboardList } from "react-icons/fa";

export default function Services(){
  const [selectedService, setSelectedService] = useState(null);

  return(
    <div className="bg-gray-50 min-h-screen pt-24 pb-10">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Garage Services</h1>
        <p className="text-xl text-gray-600">Complete bike care and maintenance solutions</p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCategories.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
              className={`p-6 rounded-xl shadow-lg cursor-pointer transition transform hover:scale-105 ${
                selectedService === service.id
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-900 hover:shadow-xl"
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{service.name}</h3>
              <p className={`text-sm mb-4 ${selectedService === service.id ? "text-red-100" : "text-gray-600"}`}>
                {service.description}
              </p>
              <div className={`flex justify-between items-center pt-4 border-t ${selectedService === service.id ? "border-red-400" : "border-gray-200"}`}>
                <span className="font-bold">₹{service.price}</span>
                <span className="text-sm">{service.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Details */}
      {selectedService && (
        <div className="max-w-7xl mx-auto px-4 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {serviceCategories
              .filter((s) => s.id === selectedService)
              .map((service) => (
                <div key={service.id}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.name}</h2>
                  <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Service Price</p>
                      <p className="text-3xl font-bold text-red-500">₹{service.price}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="text-3xl font-bold text-blue-500">{service.time}</p>
                    </div>
                  </div>

                  <button className="bg-red-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-600 transition">
                    Book Service Now
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Why Choose Our Services */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Kagal Bykes Services?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:scale-105 transition">
            <div className="text-4xl mb-4 text-red-500"><FaUserCheck className="mx-auto" /></div>
            <h3 className="font-bold text-gray-900 mb-2">Certified Technicians</h3>
            <p className="text-gray-600 text-sm">Trained Hero service experts</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:scale-105 transition">
            <div className="text-4xl mb-4 text-red-500"><FaCogs className="mx-auto" /></div>
            <h3 className="font-bold text-gray-900 mb-2">Genuine Parts</h3>
            <p className="text-gray-600 text-sm">100% original spare parts</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:scale-105 transition">
            <div className="text-4xl mb-4 text-red-500"><FaBolt className="mx-auto" /></div>
            <h3 className="font-bold text-gray-900 mb-2">Quick Service</h3>
            <p className="text-gray-600 text-sm">Fast turnaround time</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:scale-105 transition">
            <div className="text-4xl mb-4 text-red-500"><FaClipboardList className="mx-auto" /></div>
            <h3 className="font-bold text-gray-900 mb-2">Service Records</h3>
            <p className="text-gray-600 text-sm">Digital service history</p>
          </div>
        </div>
      </div>

      {/* Service Process */}
      <div className="max-w-7xl mx-auto px-4 mb-16 bg-gradient-to-r from-gray-900 to-black text-white p-12 rounded-xl">
        <h2 className="text-4xl font-bold mb-12 text-center">Our Service Process</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <p className="text-2xl font-bold">1</p>
            </div>
            <h3 className="font-bold mb-2">Book Service</h3>
            <p className="text-gray-300 text-sm">Schedule your appointment online or call</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <p className="text-2xl font-bold">2</p>
            </div>
            <h3 className="font-bold mb-2">Drop Your Bike</h3>
            <p className="text-gray-300 text-sm">Bring your bike at the scheduled time</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <p className="text-2xl font-bold">3</p>
            </div>
            <h3 className="font-bold mb-2">Professional Service</h3>
            <p className="text-gray-300 text-sm">Expert technicians work on your bike</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <p className="text-2xl font-bold">4</p>
            </div>
            <h3 className="font-bold mb-2">Pick Your Bike</h3>
            <p className="text-gray-300 text-sm">Get your bike back in perfect condition</p>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Book Your Service</h2>
          <p className="text-lg text-gray-600">Schedule your service appointment today</p>
        </div>
        <AppointmentForm />
      </div>

      {/* FAQ */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">FAQs</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
            <h3 className="font-bold text-gray-900 mb-3">How often should I service my bike?</h3>
            <p className="text-gray-600">We recommend service every 3-4 months or as per manufacturer's schedule.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
            <h3 className="font-bold text-gray-900 mb-3">Do you use original parts?</h3>
            <p className="text-gray-600">Yes, 100% original Hero genuine parts are used in all services.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
            <h3 className="font-bold text-gray-900 mb-3">What's the warranty on services?</h3>
            <p className="text-gray-600">All services come with 1 month warranty on parts and workmanship.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
            <h3 className="font-bold text-gray-900 mb-3">Do you offer free pick & drop?</h3>
            <p className="text-gray-600">Free pick & drop available for purchases above ₹5000. Call us for details.</p>
          </div>
        </div>
      </div>
    </div>
  );
}