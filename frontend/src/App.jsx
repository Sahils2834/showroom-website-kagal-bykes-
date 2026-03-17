import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { BikesProvider } from "./context/BikesContext"

import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import BottomNav from "./components/BottomNav"

import Home from "./pages/Home"
import Bikes from "./pages/Bikes"
import BikeDetails from "./pages/BikeDetails"
import Services from "./pages/Services"
import Finance from "./pages/Finance"
import Deliveries from "./pages/Deliveries"
import Login from "./pages/Login"
import Account from "./pages/Account"
import AccessoriesPage from "./pages/AccessoriesPage"
import ExplorePage from "./pages/ExplorePage"
import ComparePage from "./pages/ComparePage"
import Admin from "./pages/Admin"
import PrivacyPolicy from "./pages/PrivacyPolicy"

import { useEffect } from "react";
import { supabase } from "./lib/supabase";

export default function App(){

  useEffect(() => {
    // Log visit once per session
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      supabase.from('user_activity').insert({
        activity_type: 'visit',
        details: 'Visitor opened the website'
      }).then(() => {
        sessionStorage.setItem('hasVisited', 'true');
      });
    }
  }, []);

return(

<AuthProvider>
<BikesProvider>
<div className="bg-hero-dark text-white min-h-screen font-sans selection:bg-hero-red selection:text-white">

<ScrollToTop />
<Navbar/>
<Sidebar/>
<BottomNav/>

<Routes>

<Route path="/" element={<Home/>}/>
<Route path="/bikes" element={<Bikes/>}/>
<Route path="/bike/:id" element={<BikeDetails/>}/>
<Route path="/accessories" element={<AccessoriesPage/>}/>
<Route path="/explore" element={<ExplorePage/>}/>
<Route path="/compare" element={<ComparePage/>}/>
<Route path="/services" element={<Services/>}/>
<Route path="/finance" element={<Finance/>}/>
<Route path="/deliveries" element={<Deliveries/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/account" element={<Account/>}/>
<Route path="/admin" element={<Admin/>}/>
<Route path="/privacy-policy" element={<PrivacyPolicy/>}/>

</Routes>

<Footer/>

</div>
</BikesProvider>
</AuthProvider>

)

}