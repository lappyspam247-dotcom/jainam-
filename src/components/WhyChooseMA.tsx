import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Flame, Users, Landmark, Utensils, Award } from 'lucide-react';

export default function WhyChooseMA() {
  const [customers, setCustomers] = useState(0);
  const [flavors, setFlavors] = useState(0);
  const [cities, setCities] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const customersTarget = 380; // 380K
    const flavorsTarget = 28;
    const citiesTarget = 18;

    let startTime: number | null = null;

    const run = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);

      setCustomers(Math.floor(progress * customersTarget));
      setFlavors(Math.floor(progress * flavorsTarget));
      setCities(Math.floor(progress * citiesTarget));

      if (progress < 1) {
        requestAnimationFrame(run);
      }
    };

    requestAnimationFrame(run);
  }, []);

  const trustPoints = [
    {
      title: 'India’s Premium Thick Shake Experience',
      desc: 'Formulated with ultra-rich dairy gelato and zero ice-watering ratios.',
      bg: 'from-amber-500/10 to-amber-600/5',
      icon: '🇮🇳'
    },
    {
      title: 'Wide Variety Of Flavors',
      desc: 'From rich hazelnut Italian chocolates to saffron-infused fusion jamuns.',
      bg: 'from-blue-500/10 to-indigo-600/5',
      icon: '🎨'
    },
    {
      title: 'Perfect Blend Of Taste & Texture',
      desc: 'Velvety, spoonable density layered top to bottom with artisanal accessories.',
      bg: 'from-red-500/10 to-pink-600/5',
      icon: '🍧'
    },
    {
      title: 'Affordable Luxury Dessert',
      desc: 'High-end fine chocolate restaurant grade quality accessible at regular shake budgets.',
      bg: 'from-emerald-500/10 to-teal-600/5',
      icon: '💎'
    },
    {
      title: 'Made For Every Celebration',
      desc: 'The ideal dessert centerpiece for dates, family gathers, or midnight snack sprints.',
      bg: 'from-purple-505/10 to-violet-600/5',
      icon: '🎉'
    }
  ];

  return (
    <section
      id="why-ma"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-cocoa-900 to-cocoa-950 text-left"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Banner Grid Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-center">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/25 text-xs font-semibold text-luxury-gold tracking-widest uppercase mb-4 animate-pulse">
              <Award className="h-4 w-4" />
              THE STANDARD OF ULTRA DENSITY
            </div>
            <h2 id="why-heading-title" className="text-3.5xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
              Why Everyone<br />
              Loves <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold to-amber-400 font-black">MA Shakes</span>
            </h2>
            <p className="text-cocoa-300 font-sans text-sm sm:text-base mt-4 leading-relaxed font-light">
              We did not copy standard milkshakes. We set out to disrupt the beverage industry by developing premium dairy recipes that behave as delicious fully loaded spoonable desserts.
            </p>
          </div>

          {/* Quick numbers container */}
          <div className="lg:col-span-6 grid grid-cols-3 gap-4">
            <div className="bg-cocoa-950/60 p-5 rounded-2xl border border-cocoa-800 text-center shadow-md">
              <p className="text-3xl sm:text-4xl font-extrabold font-display text-luxury-gold">{customers}K+</p>
              <p className="text-2xs uppercase tracking-wider text-cocoa-300 font-bold mt-2">Active Gourmands</p>
            </div>
            <div className="bg-cocoa-950/60 p-5 rounded-2xl border border-cocoa-800 text-center shadow-md">
              <p className="text-3xl sm:text-4xl font-extrabold font-display text-white">{flavors}+</p>
              <p className="text-2xs uppercase tracking-wider text-cocoa-300 font-bold mt-2">Bespoke Recipes</p>
            </div>
            <div className="bg-cocoa-950/60 p-5 rounded-2xl border border-cocoa-800 text-center shadow-md">
              <p className="text-3xl sm:text-4xl font-extrabold font-display text-amber-500">{cities}+</p>
              <p className="text-2xs uppercase tracking-wider text-cocoa-300 font-bold mt-2">Cities Served</p>
            </div>
          </div>
        </div>

        {/* Five Pillars trust points */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {trustPoints.map((pt, idx) => (
            <motion.div
              id={`trust-card-${idx}`}
              key={pt.title}
              whileHover={{ scale: 1.025, y: -4 }}
              className={`p-6 rounded-2xl bg-gradient-to-br ${pt.bg} border border-cocoa-800/80 flex flex-col justify-between`}
            >
              <span className="text-3xl mb-4 block" role="img" aria-label="emoji">
                {pt.icon}
              </span>
              <div>
                <h3 className="text-sm font-bold text-cream font-display leading-snug">
                  {pt.title}
                </h3>
                <p className="text-2xs text-cocoa-300 font-sans font-light leading-relaxed mt-2.5">
                  {pt.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
