import HeroSlider from "../components/HeroSlider";
import BikeCard from "../components/BikeCard";
import { useBikes } from "../context/BikesContext";
import QuoteCalculator from "../components/QuoteCalculator";
import AppointmentForm from "../components/AppointmentForm";
import OffersSection from "../components/OffersSection";
import FinancePartners from "../components/FinancePartners";
import ReviewSection from "../components/ReviewSection";
import AboutUs from "../components/AboutUs";
import FindYourRide from "../components/FindYourRide";
import { Link } from "react-router-dom";

export default function Home() {
  const { bikes } = useBikes();

  // Curated selection: premium & performance bikes first
  const featuredBikes = bikes ? [
    bikes.find(b => b.name.includes("Karizma")),
    bikes.find(b => b.name.includes("Xtreme 160R 4V")),
    bikes.find(b => b.name.includes("XPulse")),
    bikes.find(b => b.name.includes("Mavrick")),
    bikes.find(b => b.name.includes("Harley")),
    bikes.find(b => b.name.includes("Splendor+") && !b.name.includes("XTEC") && !b.name.includes("Super")),
  ].filter(Boolean) : [];

  return (
    <div className="bg-hero-dark min-h-screen">
      {/* HERO SLIDER */}
      <HeroSlider />

      {/* ABOUT US */}
      <AboutUs />

      {/* OFFERS */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <OffersSection />
      </div>

      {/* FIND YOUR RIDE */}
      <FindYourRide />

      {/* FEATURED BIKES */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-hero-gray/30 skew-y-2 transform origin-top-left -z-10"></div>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-12 sm:mb-16 text-center">
            <h3 className="text-hero-red uppercase tracking-[0.3em] font-black text-[10px] mb-3">Our Legacy</h3>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-black uppercase tracking-tighter italic text-white mb-6">
              Featured <span className="text-hero-red">Machines</span>
            </h2>
            <div className="w-24 h-[2px] bg-gradient-to-r from-hero-red to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredBikes.slice(0, 6).map((bike) => (
              <BikeCard bike={bike} key={bike.id} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/bikes">
              <button className="border border-hero-red text-hero-red hover:bg-hero-red hover:text-white px-8 py-3 rounded uppercase tracking-widest font-bold transition-all duration-300">
                View All Models
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FINANCE CALCULATOR */}
      <section className="py-24 px-6 bg-hero-gray relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-hero-red/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <QuoteCalculator />
        </div>
      </section>

      {/* APPOINTMENT / TEST RIDE BOOKING */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <AppointmentForm />
        </div>
      </section>

      {/* FINANCE PARTNERS */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <FinancePartners />
      </div>

      {/* REVIEWS */}
      <div className="bg-hero-gray py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ReviewSection />
        </div>
      </div>
    </div>
  );
}