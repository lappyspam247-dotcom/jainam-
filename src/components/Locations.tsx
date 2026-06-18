import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LOCATIONS } from '../data';
import { MapPin, Phone, Clock, ArrowUpRight, Navigation, Sparkles } from 'lucide-react';

export default function Locations() {
  const [selectedCity, setSelectedCity] = useState<'Mumbai' | 'Ahmedabad' | 'Delhi NCR' | 'Bangalore'>('Mumbai');

  const citiesList = ['Mumbai', 'Ahmedabad', 'Delhi NCR', 'Bangalore'] as const;

  const currentOutlet = LOCATIONS.find((loc) => loc.city === selectedCity);

  // Simulated GPS Coordinates representing approximate points on a virtual visual map card
  const mapPoints: Record<string, { x: string; y: string }> = {
    'Mumbai': { x: '35%', y: '68%' },
    'Ahmedabad': { x: '25%', y: '50%' },
    'Delhi NCR': { x: '45%', y: '30%' },
    'Bangalore': { x: '48%', y: '82%' }
  };

  return (
    <section
      id="locations"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-cocoa-950 via-cocoa-900 to-cocoa-950"
    >
      <div id="loc-ambient-orange" className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-gold/5 blur-[90px] rounded-full pointer-events-none"></div>

      <div id="locations-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div id="locations-header-block" className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 text-xs font-semibold text-luxury-gold tracking-widest uppercase mb-4">
            <MapPin className="h-4 w-4 text-emerald-400" />
            OUTLET NAVIGATOR STATION
          </div>
          <h2 id="locations-main-title" className="text-3.5xl sm:text-5xl font-black font-display text-white tracking-tight">
            Find MA Near You
          </h2>
          <p id="locations-sub-desc" className="text-cocoa-200 text-sm sm:text-base font-sans mt-3 font-light leading-relaxed">
            Locate a signature MA Lounge or Premium Hub in your city to experience spoonable density straight from our churn machine. Take away or order dynamic delivery!
          </p>
        </div>

        {/* Tab switchers */}
        <div id="locations-tabs-wrapper" className="flex flex-wrap justify-center gap-2 mb-12">
          {citiesList.map((city) => (
            <button
              id={`btn-city-loc-${city.toLowerCase().replace(/\s+/g, '-')}`}
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 pointer-events-auto cursor-pointer ${
                selectedCity === city
                  ? 'bg-gradient-to-r from-luxury-gold to-luxury-gold-dark text-cocoa-950 font-bold shadow-xl'
                  : 'bg-cocoa-900/60 border border-cocoa-800 text-cocoa-250 hover:text-white hover:border-cocoa-600'
              }`}
            >
              <Navigation className="h-3.5 w-3.5" />
              {city}
            </button>
          ))}
        </div>

        {/* Map & Detail Cards Flex layout */}
        <div id="locations-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card left: Styled interactive visual GPS map illustration (SVG) */}
          <div id="locations-left-map" className="lg:col-span-7 bg-cocoa-900/40 border border-cocoa-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl min-h-[350px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cocoa-950 via-cocoa-900/40 to-cocoa-950 opacity-90"></div>

            {/* Title / Status */}
            <div className="relative z-10 flex justify-between items-center bg-cocoa-950/60 px-4 py-2 rounded-xl border border-cocoa-800 self-start">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 ml-2">GIS GPS ACTIVE</span>
            </div>

            {/* Stylized Indian Subcontinent Vector Line SVG Drawing */}
            <div id="stylized-subcontinent-svg-container" className="absolute inset-0 flex items-center justify-center opacity-15">
              <svg className="w-full h-full max-w-[420px] max-h-[340px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Simulated geographic map mesh outlines */}
                <path d="M40 10 Q45 25 35 40 T25 60 T42 85 T50 95 T55 80 T48 65 T60 40 T55 25 Z" stroke="rgba(207, 168, 83, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="35" cy="68" r="1.5" fill="rgba(255,255,255,0.6)" />
                <circle cx="25" cy="50" r="1.5" fill="rgba(255,255,255,0.6)" />
                <circle cx="45" cy="30" r="1.5" fill="rgba(255,255,255,0.6)" />
                <circle cx="48" cy="82" r="1.5" fill="rgba(255,255,255,0.6)" />
              </svg>
            </div>

            {/* Moving visual target tracking with coordinates */}
            <div id="vector-map-gimmick" className="absolute inset-0 pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCity}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute p-2 flex flex-col items-center gap-1"
                  style={{
                    left: mapPoints[selectedCity].x,
                    top: mapPoints[selectedCity].y,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <span className="flex h-6 w-6 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luxury-gold opacity-60"></span>
                    <span className="relative flex items-center justify-center rounded-full h-6 w-6 bg-luxury-gold-dark text-cocoa-950 font-bold text-[9px] shadow">
                      MA
                    </span>
                  </span>
                  <span className="px-1.5 py-0.5 bg-cocoa-950 border border-luxury-gold text-white font-mono text-[9px] rounded font-bold shadow-md uppercase">
                    {selectedCity}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom status block */}
            <div className="relative z-10 flex gap-4 mt-auto justify-between border-t border-cocoa-800/40 pt-4 text-left">
              <div>
                <p className="text-[10px] text-cocoa-300 font-mono">LAT LATITUDE COORDINATES</p>
                <p className="text-xs text-white font-mono font-bold">{currentOutlet?.lat}° N</p>
              </div>
              <div>
                <p className="text-[10px] text-cocoa-300 font-mono">LONG LONGITUDE COORDINATES</p>
                <p className="text-xs text-white font-mono font-bold">{currentOutlet?.lng}° E</p>
              </div>
              <div>
                <p className="text-[10px] text-cocoa-300 font-mono">TRANSMISSION</p>
                <p className="text-xs text-emerald-400 font-mono">CONNECTED</p>
              </div>
            </div>
          </div>

          {/* Card right: Detailed Outlet Profile */}
          <div id="locations-right-details" className="lg:col-span-5 bg-cocoa-900 border border-cocoa-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl text-left">
            <AnimatePresence mode="wait">
              {currentOutlet && (
                <motion.div
                  key={currentOutlet.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6 flex flex-col justify-between h-full"
                >
                  <div className="space-y-5">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-cocoa-950 text-xs font-bold text-luxury-gold border border-cocoa-800 tracking-wide">
                      <Sparkles className="h-3.5 w-3.5 text-luxury-gold animate-bounce" />
                      ACTIVE OUTLET
                    </div>

                    <h3 id={`outlet-title-${currentOutlet.id}`} className="text-2xl font-extrabold font-display text-white">
                      {currentOutlet.name}
                    </h3>

                    {/* Address block */}
                    <div className="flex gap-3 items-start">
                      <MapPin className="h-5 w-5 text-luxury-gold mt-1 flex-shrink-0 stroke-[1.8]" />
                      <div>
                        <p className="text-2xs uppercase tracking-wider text-cocoa-300 font-semibold font-sans">STORE LOCATION ADDRESS</p>
                        <p id={`outlet-address-${currentOutlet.id}`} className="text-xs text-cocoa-100 mt-1 font-light leading-relaxed">
                          {currentOutlet.address}
                        </p>
                      </div>
                    </div>

                    {/* Contact block */}
                    <div className="flex gap-3 items-start">
                      <Phone className="h-4 w-4 text-luxury-gold mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-2xs uppercase tracking-wider text-cocoa-300 font-semibold">RESERVATION HOTLINE PHONE</p>
                        <a href={`tel:${currentOutlet.phone}`} className="text-sm font-semibold text-white mt-1 hover:text-luxury-gold transition-colors block">
                          {currentOutlet.phone}
                        </a>
                      </div>
                    </div>

                    {/* Timing block */}
                    <div className="flex gap-3 items-start">
                      <Clock className="h-4 w-4 text-luxury-gold mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-2xs uppercase tracking-wider text-cocoa-300 font-semibold">OUTLET SERVICE HOURS</p>
                        <p className="text-sm font-light text-white mt-1">
                          {currentOutlet.timing}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions CTAs */}
                  <div className="pt-6 border-t border-cocoa-800/50 space-y-3">
                    <button
                      id="btn-location-outlet-maps"
                      onClick={() => alert(`Redirecting GPS route coordinates to: ${currentOutlet.name}...`)}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-cocoa-800 to-cocoa-950 border border-cocoa-700 text-cream font-bold text-xs uppercase tracking-widest hover:bg-cocoa-800 hover:border-luxury-gold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Navigation className="h-4 w-4 text-luxury-gold animate-pulse" />
                      Get Route Directions
                      <ArrowUpRight className="h-3.5 w-3.5 text-cocoa-300" />
                    </button>

                    <button
                      id="btn-location-outlet-cta"
                      onClick={() => {
                        const targetMenu = document.getElementById('menu');
                        if (targetMenu) targetMenu.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-luxury-gold to-luxury-gold-dark hover:from-amber-400 hover:to-luxury-gold text-cocoa-950 font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-luxury-gold/10 cursor-pointer"
                    >
                      Order Take away From This Location
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
