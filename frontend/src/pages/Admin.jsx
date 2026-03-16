import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bikes");
  
  // Data States
  const [bikes, setBikes] = useState([]);
  const [config, setConfig] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form States
  const [editingBike, setEditingBike] = useState(null);
  const [bikeForm, setBikeForm] = useState({ 
    name: "", category: "Motorcycle", price: "", engine: "", mileage: "", 
    discount: 0, offer_title: "" 
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  // Offer & Hero States
  const [offerForm, setOfferForm] = useState({ title: "", discount: "", subtitle: "" });
  const [heroSlides, setHeroSlides] = useState([
    { title: "KARIZMA XMR", desc: "FEEL THE POWER OF PERFORMANCE", image: "/images/karizma.jpg", align: "left" }
  ]);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }
    fetchData();
  }, [isAdmin, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Bikes
      const { data: bikesData, error: bikesError } = await supabase.from('bikes').select('*').order('created_at', { ascending: false });
      if (bikesError) throw bikesError;
      setBikes(bikesData || []);

      // Fetch Config
      const { data: configData, error: configError } = await supabase.from('site_config').select('*').eq('id', 1).single();
      if (configError && configError.code !== 'PGRST116') throw configError;
      
      // Fetch Appointments
      const { data: appData, error: appError } = await supabase.from('appointments').select('*').order('created_at', { ascending: false });
      if (appError) throw appError;
      setAppointments(appData || []);

      // Fetch Activities
      const { data: actData, error: actError } = await supabase.from('user_activity').select('*').order('created_at', { ascending: false }).limit(50);
      if (actError) throw actError;
      setActivities(actData || []);

      setConfig(configData);
      if (configData?.exclusive_deal) {
        setOfferForm(configData.exclusive_deal);
      }
      if (configData?.hero_slides) {
        setHeroSlides(configData.hero_slides);
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- Bikes Management ---
  const handleImageUpload = async (e) => {
    try {
      setUploadingImage(true);
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath);
      setBikeForm({ ...bikeForm, image: publicUrl });
    } catch (error) {
      alert('Error uploading image!');
      console.error(error);
    } finally {
      setUploadingImage(false);
    }
  };

  const saveBike = async (e) => {
    e.preventDefault();
    try {
      if (!bikeForm.image) {
        alert("Please upload an image first.");
        return;
      }

      if (editingBike) {
        const { error } = await supabase.from('bikes').update(bikeForm).eq('id', editingBike.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('bikes').insert([bikeForm]);
        if (error) throw error;
      }
      
      setEditingBike(null);
      setBikeForm({ 
        name: "", category: "Motorcycle", price: "", engine: "", mileage: "", 
        discount: 0, offer_title: "", image: "" 
      });
      fetchData();
    } catch (error) {
      alert("Error saving bike: " + error.message);
    }
  };

  const deleteBike = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const { error } = await supabase.from('bikes').delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (error) {
      alert("Error deleting bike: " + error.message);
    }
  };

  const handleBulkPriceUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target.result;
        let updates = [];
        if (file.name.endsWith('.json')) {
           updates = JSON.parse(text);
        } else if (file.name.endsWith('.csv')) {
           const lines = text.split('\n');
           const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
           const nameIdx = headers.indexOf('name');
           const priceIdx = headers.indexOf('price');
           if (nameIdx === -1 || priceIdx === -1) throw new Error("CSV must have 'name' and 'price' columns");
           updates = lines.slice(1).map(line => {
             const cols = line.split(',');
             return { name: cols[nameIdx]?.trim(), price: Number(cols[priceIdx]?.trim()) };
           }).filter(u => u.name && !isNaN(u.price));
        } else {
           throw new Error("Only .csv or .json files are supported for bulk update.");
        }
        
        let updatedCount = 0;
        for (const update of updates) {
           const bike = bikes.find(b => b.name.toLowerCase() === update.name.toLowerCase());
           if (bike) {
             await supabase.from('bikes').update({ price: update.price }).eq('id', bike.id);
             updatedCount++;
           }
        }
        alert(`Successfully updated prices for ${updatedCount} bikes!`);
        fetchData();
      } catch (err) {
        alert("Error parsing file: " + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = null; // reset input
  };


  // --- Offers Management ---
  const saveOffer = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('site_config').upsert({
        id: 1,
        exclusive_deal: {
          title: offerForm.title,
          discount: Number(offerForm.discount),
          subtitle: offerForm.subtitle
        },
        hero_slides: heroSlides
      });
      if (error) throw error;
      alert("Offer updated successfully!");
    } catch (error) {
      alert("Error updating offer: " + error.message);
    }
  };

  const saveHeroSlides = async () => {
    try {
      const { error } = await supabase.from('site_config').upsert({
        id: 1,
        exclusive_deal: offerForm, 
        hero_slides: heroSlides 
      });
      if (error) throw error;
      alert("Hero Slides updated successfully!");
    } catch (error) {
      alert("Error updating slides: " + error.message);
    }
  };

  const updateSlide = (index, field, value) => {
    const newSlides = [...heroSlides];
    newSlides[index][field] = value;
    setHeroSlides(newSlides);
  };

  if (!isAdmin) return null;

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-10">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Logged in as {user?.email}</p>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-2 flex flex-wrap gap-2">
          {['bikes', 'offers', 'analytics'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-bold transition capitalize ${
                activeTab === tab ? "bg-red-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Bikes Tab */}
      {activeTab === 'bikes' && (
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Bike Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg h-fit text-gray-900">
            <h2 className="text-xl font-bold mb-4">{editingBike ? "Edit Bike" : "Add New Bike"}</h2>
            <form onSubmit={saveBike} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Name</label>
                <input required type="text" value={bikeForm.name} onChange={e => setBikeForm({...bikeForm, name: e.target.value})} className="w-full border p-2 rounded" placeholder="Splendor Plus" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Category</label>
                <select value={bikeForm.category} onChange={e => setBikeForm({...bikeForm, category: e.target.value})} className="w-full border p-2 rounded">
                  <option value="Motorcycle">Motorcycle</option>
                  <option value="Scooter">Scooter</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Price (₹)</label>
                <input required type="number" value={bikeForm.price} onChange={e => setBikeForm({...bikeForm, price: e.target.value})} className="w-full border p-2 rounded" placeholder="75000" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Engine</label>
                  <input type="text" value={bikeForm.engine} onChange={e => setBikeForm({...bikeForm, engine: e.target.value})} className="w-full border p-2 rounded" placeholder="100 cc" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Mileage</label>
                  <input type="text" value={bikeForm.mileage} onChange={e => setBikeForm({...bikeForm, mileage: e.target.value})} className="w-full border p-2 rounded" placeholder="70 km/l" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Discount (₹)</label>
                  <input type="number" value={bikeForm.discount} onChange={e => setBikeForm({...bikeForm, discount: Number(e.target.value)})} className="w-full border p-2 rounded" placeholder="0" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Offer Title</label>
                  <input type="text" value={bikeForm.offer_title} onChange={e => setBikeForm({...bikeForm, offer_title: e.target.value})} className="w-full border p-2 rounded" placeholder="Festival Offer" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Image Upload</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border p-2 rounded text-sm" />
                {uploadingImage && <p className="text-xs text-blue-500 mt-1">Uploading...</p>}
                {bikeForm.image && <img src={bikeForm.image} alt="Preview" className="mt-2 h-20 object-contain bg-gray-100 rounded" />}
              </div>
              
              <div className="pt-2 flex gap-2">
                <button type="submit" disabled={uploadingImage} className="flex-1 bg-red-500 text-white py-2 rounded font-bold hover:bg-red-600">
                  {editingBike ? "Update" : "Add"} Bike
                </button>
                {editingBike && (
                  <button type="button" onClick={() => {
                    setEditingBike(null); 
                    setBikeForm({ 
                      name: "", category: "Motorcycle", price: "", engine: "", mileage: "", 
                      discount: 0, offer_title: "", image: "" 
                    });
                  }} className="px-4 bg-gray-200 text-gray-700 rounded font-bold hover:bg-gray-300">
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="mt-8 border-t pt-6">
               <h3 className="text-sm font-bold text-gray-700 uppercase mb-3">Bulk Price Update (CSV/JSON)</h3>
               <p className="text-xs text-gray-500 mb-3">Upload a CSV or JSON file containing `name` and `price` columns to mass update bike prices.</p>
               <input type="file" accept=".csv,.json" onChange={handleBulkPriceUpload} className="w-full border p-2 rounded text-sm bg-gray-50" />
            </div>
          </div>

          {/* Bike List */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden text-gray-900">
             {loading ? <p className="p-6 text-gray-500">Loading bikes...</p> : (
               <table className="w-full">
                 <thead>
                   <tr className="bg-gray-100 border-b">
                     <th className="px-6 py-4 text-left font-bold text-gray-500 uppercase text-xs tracking-wider">Image</th>
                     <th className="px-6 py-4 text-left font-bold text-gray-500 uppercase text-xs tracking-wider">Details</th>
                     <th className="px-6 py-4 text-left font-bold text-gray-500 uppercase text-xs tracking-wider">Actions</th>
                   </tr>
                 </thead>
                 <tbody>
                   {bikes.map(bike => (
                     <tr key={bike.id} className="border-b hover:bg-gray-50">
                       <td className="px-6 py-4">
                         <img src={bike.image} alt={bike.name} className="h-12 w-16 object-contain" />
                       </td>
                       <td className="px-6 py-4">
                         <p className="font-bold">{bike.name}</p>
                         <p className="text-sm text-gray-500">{bike.category} • ₹{bike.price.toLocaleString()} • {bike.engine}</p>
                       </td>
                       <td className="px-6 py-4 space-x-2">
                         <button onClick={() => { setEditingBike(bike); setBikeForm(bike); }} className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-bold hover:bg-blue-200">Edit</button>
                         <button onClick={() => deleteBike(bike.id)} className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm font-bold hover:bg-red-200">Delete</button>
                       </td>
                     </tr>
                   ))}
                   {bikes.length === 0 && (
                     <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-500">No bikes found. Add one above!</td></tr>
                   )}
                 </tbody>
               </table>
             )}
          </div>
        </div>
      )}

      {/* Offers Tab */}
      {activeTab === 'offers' && (
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 text-gray-900">
            <h2 className="text-2xl font-bold mb-6">Edit Home Page "Exclusive Deal"</h2>
            <form onSubmit={saveOffer} className="space-y-6">
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Deal Title</label>
                  <input required type="text" value={offerForm.title} onChange={e => setOfferForm({...offerForm, title: e.target.value})} className="w-full border-2 border-gray-200 p-3 rounded-lg" placeholder="Festival Offers" />
               </div>
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Discount Amount (₹)</label>
                  <input required type="number" value={offerForm.discount} onChange={e => setOfferForm({...offerForm, discount: e.target.value})} className="w-full border-2 border-gray-200 p-3 rounded-lg" placeholder="7000" />
               </div>
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Subtitle / Description</label>
                  <textarea required value={offerForm.subtitle} onChange={e => setOfferForm({...offerForm, subtitle: e.target.value})} className="w-full border-2 border-gray-200 p-3 rounded-lg h-24" placeholder="Get up to ₹7,000 discount..." />
               </div>
                <button type="submit" className="bg-red-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-600 transition tracking-wider uppercase shadow-lg">
                 Save Offer Details
               </button>
            </form>
            
            <h2 className="text-2xl font-bold mb-6 mt-12 border-t pt-8">Manage Hero Slides</h2>
            <div className="space-y-6">
              {heroSlides.map((slide, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4 bg-gray-50 relative">
                  <button onClick={() => setHeroSlides(heroSlides.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 text-red-500 text-xs font-bold hover:underline">Remove</button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title</label>
                      <input type="text" value={slide.title} onChange={e => updateSlide(i, 'title', e.target.value)} className="w-full border p-2 rounded text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Alignment</label>
                      <select value={slide.align} onChange={e => updateSlide(i, 'align', e.target.value)} className="w-full border p-2 rounded text-sm">
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                       <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                       <input type="text" value={slide.desc} onChange={e => updateSlide(i, 'desc', e.target.value)} className="w-full border p-2 rounded text-sm" />
                    </div>
                    <div className="md:col-span-2">
                       <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Image URL or Absolute Path</label>
                       <input type="text" value={slide.image} onChange={e => updateSlide(i, 'image', e.target.value)} className="w-full border p-2 rounded text-sm" placeholder="/images/karizma.jpg" />
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex gap-4">
                <button type="button" onClick={() => setHeroSlides([...heroSlides, { title: "NEW BIKE", desc: "NEW DESC", image: "", align: "left" }])} className="bg-gray-200 text-gray-700 px-4 py-2 rounded font-bold hover:bg-gray-300 transition text-sm">
                  + Add Slide
                </button>
                <button type="button" onClick={saveHeroSlides} className="bg-red-500 text-white px-6 py-2 rounded font-bold hover:bg-red-600 transition shadow text-sm">
                  Save All Slides
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          
          {/* Activity Blog */}
          <div className="bg-white p-8 rounded-xl shadow-lg text-gray-900 border-l-4 border-blue-500">
             <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <span className="text-xl">📊</span>
                </div>
                <h2 className="text-2xl font-bold">Live Activity Blog</h2>
             </div>
             
             {loading ? <p className="text-gray-500">Loading activities...</p> : (
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="bg-gray-100 border-b">
                       <th className="px-6 py-4 font-bold text-gray-500 uppercase text-xs tracking-wider">Time</th>
                       <th className="px-6 py-4 font-bold text-gray-500 uppercase text-xs tracking-wider">Type</th>
                       <th className="px-6 py-4 font-bold text-gray-500 uppercase text-xs tracking-wider">User / Visitor</th>
                       <th className="px-6 py-4 font-bold text-gray-500 uppercase text-xs tracking-wider">Activity Details</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                     {activities.map(act => (
                       <tr key={act.id} className="hover:bg-gray-50 transition">
                         <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                           {new Date(act.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                           <br/>
                           <span className="text-xs">{new Date(act.created_at).toLocaleDateString()}</span>
                         </td>
                         <td className="px-6 py-4">
                           <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                             act.activity_type === 'login' ? 'bg-purple-100 text-purple-700' :
                             act.activity_type === 'visit' ? 'bg-orange-100 text-orange-700' :
                             'bg-green-100 text-green-700'
                           }`}>
                             {act.activity_type}
                           </span>
                         </td>
                         <td className="px-6 py-4">
                           <p className="font-bold text-sm text-gray-900">{act.user_email || "Anonymous Visitor"}</p>
                         </td>
                         <td className="px-6 py-4 text-sm text-gray-700">
                           {act.details}
                         </td>
                       </tr>
                     ))}
                     {activities.length === 0 && (
                       <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-500 italic">No activity logs recorded yet.</td></tr>
                     )}
                   </tbody>
                 </table>
               </div>
             )}
          </div>

          {/* Leads Table */}
          <div className="bg-white p-8 rounded-xl shadow-lg text-gray-900 border-l-4 border-red-500">
             <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-100 p-2 rounded-lg text-red-600">
                  <span className="text-xl">📋</span>
                </div>
                <h2 className="text-2xl font-bold">Appointments & Leads</h2>
             </div>
             
             {loading ? <p className="text-gray-500">Loading appointments...</p> : (
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="bg-gray-100 border-b">
                       <th className="px-6 py-4 font-bold text-gray-500 uppercase text-xs tracking-wider">Date</th>
                       <th className="px-6 py-4 font-bold text-gray-500 uppercase text-xs tracking-wider">Contact Info</th>
                       <th className="px-6 py-4 font-bold text-gray-500 uppercase text-xs tracking-wider">Type / Bike</th>
                       <th className="px-6 py-4 font-bold text-gray-500 uppercase text-xs tracking-wider">Message</th>
                     </tr>
                   </thead>
                   <tbody>
                     {appointments.map(app => (
                       <tr key={app.id} className="border-b hover:bg-gray-50">
                         <td className="px-6 py-4 text-sm whitespace-nowrap">
                           {new Date(app.created_at).toLocaleDateString()}<br/>
                           <span className="text-gray-500 italic">Pref: {app.preferred_date}</span>
                         </td>
                         <td className="px-6 py-4">
                           <p className="font-bold text-sm">{app.name}</p>
                           <p className="text-sm text-gray-600">{app.email}</p>
                           <p className="text-sm text-gray-600">{app.phone}</p>
                         </td>
                         <td className="px-6 py-4">
                           <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                             app.service_type === 'test-ride' ? 'bg-blue-100 text-blue-700' :
                             app.service_type === 'finance' ? 'bg-green-100 text-green-700' :
                             'bg-gray-100 text-gray-700'
                           }`}>
                             {app.service_type}
                           </span>
                           <p className="text-sm font-semibold mt-1">{app.bike_model}</p>
                         </td>
                         <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate" title={app.message}>
                           {app.message || "-"}
                         </td>
                       </tr>
                     ))}
                     {appointments.length === 0 && (
                       <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-500">No appointments received yet.</td></tr>
                     )}
                   </tbody>
                 </table>
               </div>
             )}
          </div>
        </div>
      )}

    </div>
  );
}