import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { bikesData } from "../data/bikesData";

export default function TestRideModal({ isOpen, onClose, preselectedBike }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.full_name || "",
    email: user?.email || "",
    phone: "",
    bike_model: preselectedBike || "",
    preferred_date: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: dbError } = await supabase.from("test_rides").insert([
        {
          user_id: user?.id || null,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          bike_model: formData.bike_model,
          preferred_date: formData.preferred_date,
          message: formData.message
        }
      ]);

      if (dbError) throw dbError;
      setSuccess(true);
      setTimeout(() => { onClose(); setSuccess(false); }, 2000);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-hero-gray rounded-2xl border border-white/10 p-8 w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            {/* Close */}
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition text-xl">✕</button>

            <h2 className="text-2xl font-bold text-white mb-1">Book a Test Ride</h2>
            <p className="text-gray-500 text-sm mb-6">Fill the form and we'll get back to you shortly</p>

            {success ? (
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-8">
                <span className="text-5xl block mb-4"></span>
                <h3 className="text-xl font-bold text-green-400 mb-2">Test Ride Booked!</h3>
                <p className="text-gray-400">We'll contact you soon to confirm.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <div className="floating-label-group">
                  <input name="name" value={formData.name} onChange={handleChange} required placeholder=" " />
                  <label>Full Name</label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="floating-label-group">
                    <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder=" " />
                    <label>Email</label>
                  </div>
                  <div className="floating-label-group">
                    <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder=" " />
                    <label>Phone Number</label>
                  </div>
                </div>

                <div className="floating-label-group">
                  <select name="bike_model" value={formData.bike_model} onChange={handleChange} required>
                    <option value="" className="bg-gray-900"></option>
                    {bikesData.map(bike => (
                      <option key={bike.id} value={bike.name} className="bg-gray-900">{bike.name}</option>
                    ))}
                  </select>
                  <label>Select Machine</label>
                </div>

                <div className="floating-label-group">
                  <input name="preferred_date" type="date" value={formData.preferred_date} onChange={handleChange} required placeholder=" " />
                  <label>Preferred Date</label>
                </div>

                <div className="floating-label-group">
                  <textarea name="message" value={formData.message} onChange={handleChange} rows={2} placeholder=" " />
                  <label>Any special requests?</label>
                </div>

                <button type="submit" disabled={loading}
                  className="w-full bg-hero-red text-white py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-red-700 transition-all disabled:opacity-50">
                  {loading ? "Booking..." : "Book Test Ride"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
