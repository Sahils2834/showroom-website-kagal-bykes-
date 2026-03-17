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
    <form onSubmit={submit} className="bg-hero-gray/20 backdrop-blur-sm rounded-[2rem] border border-white/5 p-8 md:p-12 relative overflow-hidden group">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-hero-red/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-hero-red/10 transition-all duration-700"></div>

      <div className="relative z-10">
        <div className="mb-10 text-center md:text-left">
          <span className="text-hero-red font-bold uppercase tracking-[0.3em] text-xs mb-3 block">Reservation</span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-white uppercase italic tracking-tighter">
            Book Your <span className="text-hero-red">Experience</span>
          </h2>
          <p className="text-gray-400 mt-2 font-light">Schedule a test ride or service appointment with our experts.</p>
        </div>

        {submitted && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-400 font-bold flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-xl">✓</div>
            <div>
              <p>Appointment requested successfully!</p>
              <p className="text-sm font-light opacity-80 text-white mt-1">Our concierge team will contact you shortly.</p>
            </div>
          </motion.div>
        )}

        {error && (
          <div className="mb-8 p-6 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 font-bold">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black ml-1 block">Full Name</label>
            <input 
              type="text" 
              required 
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              placeholder="John Doe"
              className="w-full bg-hero-dark border border-white/10 p-4 rounded-xl focus:outline-none focus:border-hero-red text-white transition-all placeholder:text-gray-700" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black ml-1 block">Phone Number</label>
            <input 
              type="tel" 
              required 
              value={form.phone}
              onChange={(e) => setForm({...form, phone: e.target.value})}
              placeholder="+91 00000 00000"
              className="w-full bg-hero-dark border border-white/10 p-4 rounded-xl focus:outline-none focus:border-hero-red text-white transition-all placeholder:text-gray-700" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black ml-1 block">Email Address</label>
            <input 
              type="email" 
              required 
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              placeholder="john@example.com"
              className="w-full bg-hero-dark border border-white/10 p-4 rounded-xl focus:outline-none focus:border-hero-red text-white transition-all placeholder:text-gray-700" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black ml-1 block">Select Machine</label>
            <select 
              required 
              value={form.bike}
              onChange={(e) => setForm({...form, bike: e.target.value})}
              className="w-full bg-hero-dark border border-white/10 p-4 rounded-xl focus:outline-none focus:border-hero-red text-white transition-all appearance-none cursor-pointer"
            >
              <option value="" className="bg-hero-dark">Choose a model...</option>
              {(bikes || []).map(bike => (
                <option key={bike.id} value={bike.id} className="bg-hero-dark">{bike.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black ml-1 block">Preferred Date</label>
            <input 
              type="date" 
              required 
              min={minDate} 
              value={form.date}
              onChange={(e) => setForm({...form, date: e.target.value})}
              className="w-full bg-hero-dark border border-white/10 p-4 rounded-xl focus:outline-none focus:border-hero-red text-white transition-all color-white" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black ml-1 block">Time Slot</label>
            <select 
              value={form.time}
              onChange={(e) => setForm({...form, time: e.target.value})}
              className="w-full bg-hero-dark border border-white/10 p-4 rounded-xl focus:outline-none focus:border-hero-red text-white transition-all appearance-none cursor-pointer"
            >
              <option value="10:00" className="bg-hero-dark">10:00 AM</option>
              <option value="11:00" className="bg-hero-dark">11:00 AM</option>
              <option value="12:00" className="bg-hero-dark">12:00 PM</option>
              <option value="14:00" className="bg-hero-dark">2:00 PM</option>
              <option value="15:00" className="bg-hero-dark">3:00 PM</option>
              <option value="16:00" className="bg-hero-dark">4:00 PM</option>
              <option value="17:00" className="bg-hero-dark">5:00 PM</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black ml-1 mb-4 block">Appointment Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { value: 'test-ride', label: 'Test Ride' },
                { value: 'service', label: 'Service' },
                { value: 'finance', label: 'Finance' },
                { value: 'consultation', label: 'Consultation' }
              ].map(type => (
                <button 
                  key={type.value} 
                  type="button"
                  onClick={() => setForm({...form, appointmentType: type.value})}
                  className={`py-3 rounded-xl font-display font-black text-[10px] uppercase tracking-widest transition-all duration-300 border ${
                    form.appointmentType === type.value
                      ? 'bg-hero-red border-hero-red text-white shadow-[0_0_15px_rgba(231,25,34,0.4)]'
                      : 'bg-hero-dark border-white/10 text-gray-500 hover:border-hero-red/50 hover:text-white'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black ml-1 block">Additional Notes</label>
            <textarea 
              value={form.message}
              onChange={(e) => setForm({...form, message: e.target.value})}
              placeholder="Tell us about your requirements..."
              className="w-full bg-hero-dark border border-white/10 p-4 rounded-xl focus:outline-none focus:border-hero-red text-white resize-none h-32 transition-all placeholder:text-gray-700 mt-2"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-white text-black hover:bg-hero-red hover:text-white px-8 py-5 rounded-2xl font-display font-black uppercase tracking-widest text-lg transition-all duration-500 transform active:scale-95 disabled:opacity-50 shadow-2xl shadow-black/40"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </span>
          ) : "Confirm Appointment"}
        </button>

        <p className="text-[10px] text-gray-600 mt-6 text-center uppercase tracking-widest font-medium">
          * Premium concierge service. No hidden charges.
        </p>
      </div>
    </form>
  );
}