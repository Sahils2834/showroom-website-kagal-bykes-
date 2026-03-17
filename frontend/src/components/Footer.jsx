import { Link } from "react-router-dom";
import { useState } from "react";
import { FaMotorcycle, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaTimes } from "react-icons/fa";

export default function Footer() {
  const [showMap, setShowMap] = useState(false);

  return (
    <>
      <footer className="bg-black text-white pt-20 pb-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand */}
            <div>
              <Link to="/" className="flex items-center gap-3 group mb-6">
                <img src="/images/Hero_MotoCorp.png" alt="Hero" className="h-8 w-auto transform group-hover:scale-110 transition-transform duration-300" />
                <h1 className="text-2xl font-display font-black tracking-widest text-white uppercase italic">
                  Kagal<span className="text-hero-red">Bykes</span>
                </h1>
              </Link>
              <p className="text-gray-400 font-light mb-8 max-w-sm">
                Your trusted authorized Hero MotoCorp showroom. We deliver passion and performance through premium mobility solutions.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-hero-gray flex items-center justify-center text-gray-400 hover:bg-hero-red hover:text-white transition-all duration-300">
                  <FaFacebook />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-hero-gray flex items-center justify-center text-gray-400 hover:bg-hero-red hover:text-white transition-all duration-300">
                  <FaTwitter />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-hero-gray flex items-center justify-center text-gray-400 hover:bg-hero-red hover:text-white transition-all duration-300">
                  <FaInstagram />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-hero-gray flex items-center justify-center text-gray-400 hover:bg-hero-red hover:text-white transition-all duration-300">
                  <FaYoutube />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-display font-bold uppercase tracking-widest mb-6">Quick Links</h3>
              <ul className="space-y-3 font-light">
                <li><Link to="/" className="text-gray-400 hover:text-hero-red transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-hero-red"></span>Home</Link></li>
                <li><Link to="/bikes" className="text-gray-400 hover:text-hero-red transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-hero-red"></span>Motorcycles</Link></li>
                <li><Link to="/services" className="text-gray-400 hover:text-hero-red transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-hero-red"></span>Service Center</Link></li>
                <li><Link to="/finance" className="text-gray-400 hover:text-hero-red transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-hero-red"></span>Finance Options</Link></li>
                <li><Link to="/deliveries" className="text-gray-400 hover:text-hero-red transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-hero-red"></span>Deliveries</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-display font-bold uppercase tracking-widest mb-6">Contact Us</h3>
              <div className="space-y-4 font-light text-gray-400 text-sm">
                <p className="flex items-start gap-3">
                  <span className="text-hero-red mt-1">&#8226;</span>
                  <span>Shivaji Chowk, Main Road,<br/>Kagal, Maharashtra 416216</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-hero-red">&#8226;</span>
                  <span><a href="tel:+919623449324" className="hover:text-white transition">9623449324</a> / <a href="tel:+919623449325" className="hover:text-white transition">9623449325</a></span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-hero-red">&#8226;</span>
                  <a href="mailto:svaitashte85@gmail.com" className="hover:text-white transition">svaitashte85@gmail.com</a>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-hero-red">&#8226;</span>
                  <span>9:00 AM - 6:30 PM (Everyday)</span>
                </p>

                {/* Location Button */}
                <button
                  onClick={() => setShowMap(true)}
                  className="mt-3 flex items-center gap-2 bg-hero-red/10 border border-hero-red/30 text-hero-red hover:bg-hero-red hover:text-white px-4 py-2.5 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300 group"
                >
                  <FaMapMarkerAlt className="text-base group-hover:animate-bounce" />
                  View on Map
                </button>
              </div>
            </div>

            {/* Stay Updated */}
            <div>
              <h3 className="text-lg font-display font-bold uppercase tracking-widest mb-6">Stay Updated</h3>
              <p className="text-gray-400 font-light text-sm mb-4">Subscribe to receive updates on new launches and exclusive offers.</p>
              <form className="flex">
                <input type="email" placeholder="Email Address" className="bg-hero-gray w-full px-4 py-3 rounded-l focus:outline-none focus:bg-white/10 text-white border border-white/5 border-r-0" />
                <button className="bg-hero-red text-white px-4 py-3 rounded-r font-bold hover:bg-hero-red-light transition-colors uppercase text-sm tracking-widest">
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs tracking-wider text-gray-500 uppercase">
            <p>&copy; {new Date().getFullYear()} Kagal Bykes. All Rights Reserved.</p>
            
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
              <a href="#" className="hover:text-white transition">Terms &amp; Conditions</a>
              <a href="#" className="hover:text-white transition">Disclaimer</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Map Modal */}
      {showMap && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowMap(false)}
          />

          {/* Modal */}
          <div className="relative bg-hero-dark border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-hero-red text-lg" />
                <div>
                  <h3 className="text-white font-bold text-lg">Kagal Bykes</h3>
                  <p className="text-gray-400 text-xs">Shivaji Chowk, Main Road, Kagal, Maharashtra 416216</p>
                </div>
              </div>
              <button
                onClick={() => setShowMap(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-hero-red hover:text-white transition-all"
              >
                <FaTimes />
              </button>
            </div>

            {/* Map Embed */}
            <div className="w-full h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.5!2d74.3183!3d16.6546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc10042a0c85f49%3A0xd0e0e9c0e8e4b8a0!2sKagal%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kagal Bykes Location"
              />
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
              <p className="text-gray-400 text-sm">9:00 AM - 6:30 PM (Everyday)</p>
              <a
                href="https://maps.app.goo.gl/jDGMw85D7vEeNqv66"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-hero-red text-white px-5 py-2 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-red-700 transition-all"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}