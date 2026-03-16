import { useState } from "react";
import { useBikes } from "../context/BikesContext";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export default function AppointmentForm() {
  const { user } = useAuth();
  const { bikes } = useBikes();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    bike: "",
    date: "",
    time: "10:00",
    appointmentType: "test-ride",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.bike || !form.date) {
      alert("Please fill all required fields!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const selectedBike = (bikes || []).find(b => b.id === Number(form.bike));
      const { error: dbError } = await supabase.from("appointments").insert([
        {
          user_id: user?.id || null,
          name: form.name,
          email: form.email,
          phone: form.phone,
          service_type: form.appointmentType,
          bike_model: selectedBike?.name || form.bike,
          preferred_date: form.date,
          message: `Time: ${form.time}. ${form.message}`
        }
      ]);

      if (dbError) throw dbError;
      
      // Log activity
      await supabase.from('user_activity').insert({
        activity_type: 'form_submission',
        user_email: form.email,
        details: `Submitted ${form.appointmentType} for ${selectedBike?.name || form.bike}`
      });

      setSubmitted(true);

      setTimeout(() => {
        setForm({
          name: "", phone: "", email: "", bike: "",
          date: "", time: "10:00", appointmentType: "test-ride", message: ""
        });
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <form onSubmit={submit} className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Book Your Appointment
      </h2>

      {submitted && (
        <div className="mb-6 p-4 rounded-lg bg-green-100 border-2 border-green-500 text-green-700 font-bold">
          ✓ Appointment booked successfully! Our team will contact you soon.
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-100 border-2 border-red-500 text-red-700 font-bold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
          <input type="text" required value={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})}
            placeholder="Enter your full name"
            className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-red-500" />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
          <input type="tel" required value={form.phone}
            onChange={(e) => setForm({...form, phone: e.target.value})}
            placeholder="9999999999"
            className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-red-500" />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
          <input type="email" required value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            placeholder="email@example.com"
            className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-red-500" />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Select Bike *</label>
          <select required value={form.bike}
            onChange={(e) => setForm({...form, bike: e.target.value})}
            className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-red-500 text-gray-900">
            <option value="" className="text-gray-900">Choose a bike...</option>
            {(bikes || []).map(bike => (
              <option key={bike.id} value={bike.id} className="text-gray-900">{bike.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Date *</label>
          <input type="date" required min={minDate} value={form.date}
            onChange={(e) => setForm({...form, date: e.target.value})}
            className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-red-500" />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Time</label>
          <select value={form.time}
            onChange={(e) => setForm({...form, time: e.target.value})}
            className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-red-500 text-gray-900">
            <option value="10:00" className="text-gray-900">10:00 AM</option>
            <option value="11:00" className="text-gray-900">11:00 AM</option>
            <option value="12:00" className="text-gray-900">12:00 PM</option>
            <option value="14:00" className="text-gray-900">2:00 PM</option>
            <option value="15:00" className="text-gray-900">3:00 PM</option>
            <option value="16:00" className="text-gray-900">4:00 PM</option>
            <option value="17:00" className="text-gray-900">5:00 PM</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-3">Appointment Type</label>
          <div className="flex gap-4 flex-wrap">
            {[
              { value: 'test-ride', label: 'Test Ride' },
              { value: 'service', label: 'Service' },
              { value: 'finance', label: 'Finance' },
              { value: 'consultation', label: 'Consultation' }
            ].map(type => (
              <button key={type.value} type="button"
                onClick={() => setForm({...form, appointmentType: type.value})}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  form.appointmentType === type.value
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-2">Additional Message</label>
          <textarea value={form.message}
            onChange={(e) => setForm({...form, message: e.target.value})}
            placeholder="Any special requests or questions..."
            className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-red-500 resize-none"
            rows="4" />
        </div>
      </div>

      <button type="submit" disabled={loading}
        className="w-full bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-red-600 transition transform hover:scale-105 shadow-lg disabled:opacity-50">
        {loading ? "Booking..." : "Book Appointment Now"}
      </button>

      <p className="text-xs text-gray-600 mt-4 text-center">
        * Required fields. We will confirm your appointment within 24 hours.
      </p>
    </form>
  );
}