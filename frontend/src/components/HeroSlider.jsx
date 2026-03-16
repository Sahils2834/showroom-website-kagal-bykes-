import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TestRideModal from "./TestRideModal";
import { supabase } from "../lib/supabase";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HeroSlider() {
  const [showTestRide, setShowTestRide] = useState(false);

  const [slides, setSlides] = useState([
    {
      title: "KARIZMA XMR",
      desc: "FEEL THE POWER OF PERFORMANCE",
      image: "/images/karizma.jpg",
      align: "left"
    },
    {
      title: "XTREME 160R 4V",
      desc: "PERFORMANCE MEETS STYLE",
      image: "/images/Hero-xtreme-160r.jpg",
      align: "center"
    },
    {
      title: "SPLENDOR PLUS",
      desc: "INDIA'S MOST TRUSTED",
      image: "/images/hero-splendorplus.jpg",
      align: "right"
    }
  ]);

  useEffect(() => {
    const fetchSlides = async () => {
      const { data, error } = await supabase.from('site_config').select('hero_slides').eq('id', 1).single();
      if (!error && data?.hero_slides && data.hero_slides.length > 0) {
        setSlides(data.hero_slides);
      }
    };
    fetchSlides();
  }, []);

  return (
    <section className="h-screen w-full relative bg-hero-dark">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        className="w-full h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <div
                className="w-full h-full bg-hero-dark bg-cover bg-center bg-no-repeat relative"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Premium Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-hero-dark/90 via-hero-dark/50 to-transparent" />
                <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10 mix-blend-overlay pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-hero-dark via-transparent to-transparent" />

                <div className="absolute inset-0 flex items-center max-w-7xl mx-auto px-6">
                  <div className={`w-full max-w-2xl text-white ${
                    slide.align === 'center' ? 'mx-auto text-center' : 
                    slide.align === 'right' ? 'ml-auto text-right' : 'text-left'
                  }`}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <h2 className="text-sm md:text-lg font-bold tracking-[0.3em] text-hero-red mb-4 uppercase">
                        Introducing
                      </h2>
                      <h1 className="text-5xl md:text-7xl font-display font-black leading-tight mb-6 uppercase tracking-tight">
                        {slide.title}
                      </h1>
                      <p className="text-lg md:text-2xl font-light text-gray-300 mb-10 tracking-wide uppercase">
                        {slide.desc}
                      </p>
                      
                      <div className={`flex gap-4 ${
                        slide.align === 'center' ? 'justify-center' : 
                        slide.align === 'right' ? 'justify-end' : 'justify-start'
                      }`}>
                        <Link to="/bikes">
                          <button className="bg-hero-red hover:bg-hero-red-light text-white px-8 py-4 rounded font-bold tracking-wider uppercase transition-all duration-300 shadow-lg shadow-hero-red/30 hover:-translate-y-1">
                            EXPLORE BIKE
                          </button>
                        </Link>
                        <button
                          onClick={() => setShowTestRide(true)}
                          className="border border-white/30 hover:border-white hover:bg-white/10 text-white px-8 py-4 rounded font-bold tracking-wider uppercase transition-all duration-300"
                        >
                          BOOK TEST RIDE
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-bounce opacity-70">
        <span className="text-[10px] uppercase tracking-widest text-white mb-2">SCROLL</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>

      {/* Test Ride Modal */}
      <TestRideModal isOpen={showTestRide} onClose={() => setShowTestRide(false)} preselectedBike="" />
    </section>
  );
}