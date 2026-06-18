import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Flame, Heart, Sparkles, Milestone } from 'lucide-react';

interface HeroProps {
  onScrollToMenu: () => void;
  onOpenBuilder: () => void;
}

export default function Hero({ onScrollToMenu, onOpenBuilder }: HeroProps) {
  // Simple increment counter animation
  const [flavorsCount, setFlavorsCount] = useState(0);
  const [locationsCount, setLocationsCount] = useState(0);
  const [indulgenceCount, setIndulgenceCount] = useState(0);

  useEffect(() => {
    const duration = 1500; // ms
    const flavorsTarget = 25;
    const locationsTarget = 85;
    const indulgenceTarget = 100;

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setFlavorsCount(Math.floor(progress * flavorsTarget));
      setLocationsCount(Math.floor(progress * locationsTarget));
      setIndulgenceCount(Math.floor(progress * indulgenceTarget));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-cocoa-950 via-cocoa-950 to-cocoa-900"
    >
      {/* Background radial glow */}
      <div id="hero-bg-glow-orange" className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div id="hero-bg-glow-chocolate" className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cocoa-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Decorative Floating Cookie / Nuts */}
      <div id="decorative-star-1" className="absolute top-24 left-[10%] opacity-20 animate-bounce pointer-events-none">
        <Sparkles className="h-6 w-6 text-luxury-gold" />
      </div>
      <div id="decorative-star-2" className="absolute bottom-32 left-[5%] opacity-25 animate-pulse text-cocoa-300 pointer-events-none">
        <span className="text-4xl">🌰</span>
      </div>
      <div id="decorative-star-3" className="absolute top-48 right-[8%] opacity-30 animate-spin text-cocoa-300 pointer-events-none" style={{ animationDuration: '10s' }}>
        <span className="text-4xl">🍫</span>
      </div>

      <div id="hero-grid-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div id="hero-grid-flex" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column: Copy & Taglines */}
          <div id="hero-left-column" className="lg:col-span-7 flex flex-col items-start text-left space-y-8">
            
            {/* Tagline Badge */}
            <motion.div
              id="hero-tagline-badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cocoa-900/80 border border-luxury-gold/20 text-xs font-semibold uppercase tracking-widest text-luxury-gold shadow-md"
            >
              <Flame className="h-3.5 w-3.5 animate-pulse text-amber-500" />
              <span>India’s Premium Dessert beverage brand</span>
            </motion.div>

            {/* Headline */}
            <div id="hero-headline-wrapper" className="space-y-4">
              <motion.h1
                id="hero-main-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4.5xl sm:text-6xl xl:text-7xl font-extrabold font-display leading-[1.08] tracking-tight text-white"
              >
                Think Thick Shakes.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold via-amber-400 to-luxury-gold-dark">
                  Think MA.
                </span>
              </motion.h1>

              <motion.p
                id="hero-tagline-sub"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="text-lg sm:text-xl font-serif italic text-cocoa-200"
              >
                “Thicker. Richer. Irresistible.”
              </motion.p>
            </div>

            {/* Brief Intro */}
            <motion.p
              id="hero-intro-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-base sm:text-lg text-cocoa-100 max-w-xl font-sans font-light leading-relaxed"
            >
              At MA, we don't just make shakes — we create indulgent experiences.
              Every shake is crafted with rich flavors, premium ingredients, and a
              thick creamy texture that makes every single sip unforgettable.
            </motion.p>

            {/* Highlighted Brand Points */}
            <motion.div
              id="hero-brand-points"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full border-y border-cocoa-800/40 py-6"
            >
              {[
                { title: 'Premium Ingredients', desc: 'Sourced globally', icon: '🌟' },
                { title: 'Thick & Creamy', desc: 'No added ice', icon: '🍧' },
                { title: 'Unique Flavors', desc: 'Bespoke fusions', icon: '🎨' },
                { title: 'Dessert Cup', desc: 'Spoonable treats', icon: '🍨' },
              ].map((pt, i) => (
                <div id={`brand-point-card-${i}`} key={pt.title} className="flex flex-col items-start">
                  <span className="text-xl mb-1.5">{pt.icon}</span>
                  <span className="text-sm font-semibold text-cream leading-tight">{pt.title}</span>
                  <span className="text-xs text-cocoa-300 font-light mt-0.5">{pt.desc}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              id="hero-ctas-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button
                id="btn-hero-explore"
                onClick={onScrollToMenu}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-luxury-gold to-luxury-gold-dark text-cocoa-950 font-bold tracking-wider text-sm uppercase shadow-lg shadow-luxury-gold/15 hover:shadow-luxury-gold/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                Explore Menu
                <ArrowRight id="hero-explore-arrow" className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                id="btn-hero-ordernow"
                onClick={onOpenBuilder}
                className="px-8 py-4 rounded-xl bg-cocoa-900/60 hover:bg-cocoa-900 border border-cocoa-800 hover:border-luxury-gold text-cream font-bold tracking-wider text-sm uppercase shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles id="hero-order-sparkle" className="h-4 w-4 text-luxury-gold" />
                Assemble DIY Shake
              </button>
            </motion.div>

          </div>

          {/* Right Hero Column: Premium Image with Glassmorphism Float Overlays */}
          <div id="hero-right-column" className="lg:col-span-5 relative flex justify-center">
            
            {/* Glow backing */}
            <div id="hero-img-backdrop-glow" className="absolute inset-4 rounded-3xl bg-gradient-to-br from-luxury-gold/10 to-cocoa-500/10 blur-[40px] pointer-events-none"></div>

            {/* Main Visual Frame */}
            <motion.div
              id="hero-image-frame"
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative rounded-3xl overflow-hidden border border-cocoa-800 shadow-2xl p-2 bg-cocoa-900/40 max-w-md w-full"
            >
              <img
                src="/src/assets/images/hero_thick_shakes_1781749220642.jpg"
                alt="Indulgent MA Thick Shakes Gourmet Collection"
                className="rounded-2xl object-cover aspect-[4/5] lg:aspect-[3/4]"
                referrerPolicy="no-referrer"
              />

              {/* Glass overlay badge 1 */}
              <motion.div
                id="hero-glass-overlay-1"
                initial={{ opacity: 0, x: -30, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute bottom-6 left-6 p-4 rounded-2xl glass-panel text-left flex items-center gap-3 backdrop-blur-md shadow-xl border border-white/5"
              >
                <div id="glass-badge-check-circle" className="bg-emerald-500/20 p-2 rounded-xl border border-emerald-500/30">
                  <Heart className="h-5 w-5 text-emerald-400 fill-emerald-400" />
                </div>
                <div>
                  <p id="glass-badge-label-1" className="text-white font-extrabold text-sm leading-tight">100% Real Gelato</p>
                  <p id="glass-badge-val-1" className="text-cocoa-100 text-xs font-light">Zero Ice, Absolute Density</p>
                </div>
              </motion.div>

              {/* Glass overlay badge 2 */}
              <motion.div
                id="hero-glass-overlay-2"
                initial={{ opacity: 0, x: 30, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="absolute -top-4 right-4 p-3.5 rounded-2xl glass-panel text-left flex items-center gap-3 shadow-xl border border-white/5"
              >
                <div id="glass-badge-flame" className="bg-luxury-gold/20 p-2.5 rounded-xl border border-luxury-gold/30">
                  <Sparkles className="h-5 w-5 text-luxury-gold" />
                </div>
                <div>
                  <p id="glass-badge-label-2" className="text-white font-extrabold text-xs uppercase tracking-widest">Spoonable</p>
                  <p id="glass-badge-val-2" className="text-luxury-gold font-serif text-sm italic font-medium leading-tight">No Straw Needed</p>
                </div>
              </motion.div>
            </motion.div>
            
          </div>
        </div>

        {/* Counters & Statistics */}
        <motion.div
          id="hero-counters-grid"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto bg-cocoa-900/50 backdrop-blur-xl rounded-2xl border border-cocoa-800/40 p-6 md:p-8 shadow-xl"
        >
          {/* Flavors counter */}
          <div id="counter-card-flavors" className="flex flex-col items-center text-center p-3 md:border-r border-cocoa-800/50">
            <span id="counter-val-flavors" className="text-4xl md:text-5xl font-black font-display text-luxury-gold flex items-center">
              {flavorsCount}+
            </span>
            <span id="counter-label-flavors" className="text-cream font-bold text-sm mt-2">Signature Flavors</span>
            <span id="counter-desc-flavors" className="text-cocoa-300 text-xs font-light mt-1">From Ferrero to Gulab Jamun</span>
          </div>

          {/* Locations counter */}
          <div id="counter-card-locations" className="flex flex-col items-center text-center p-3 md:border-r border-cocoa-800/50">
            <span id="counter-val-locations" className="text-4xl md:text-5xl font-black font-display text-white flex items-center">
              {locationsCount}+
            </span>
            <span id="counter-label-locations" className="text-cream font-bold text-sm mt-2">Outlets Across India</span>
            <span id="counter-desc-locations" className="text-cocoa-300 text-xs font-light mt-1">Spreading creamy indulgence</span>
          </div>

          {/* Indulgence counter */}
          <div id="counter-card-indulgence" className="flex flex-col items-center text-center p-3">
            <span id="counter-val-indulgence" className="text-4xl md:text-5xl font-black font-display text-amber-500 flex items-center">
              {indulgenceCount}%
            </span>
            <span id="counter-label-indulgence" className="text-cream font-bold text-sm mt-2">Pure Indulgence</span>
            <span id="counter-desc-indulgence" className="text-cocoa-300 text-xs font-light mt-1">Zero water, zero compromises</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
