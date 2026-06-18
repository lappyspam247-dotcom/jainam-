import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Award, ShieldCheck, Heart, Coffee, Star } from 'lucide-react';

export default function About() {
  const features = [
    {
      title: 'Premium Ingredients',
      desc: 'Carefully selected ingredients for rich, complex taste. Formulated with authentic chocolates, real nut-butters, and high-quality milk proteins.',
      icon: <Award className="h-6 w-6 text-luxury-gold" />,
    },
    {
      title: 'Thick Shake Perfection',
      desc: 'Extra-creamy, super-dense dessert texture that stays spoonable and decadent down to the last drop. No diluted ice blends ever.',
      icon: <ShieldCheck className="h-6 w-6 text-amber-500" />,
    },
    {
      title: 'Fresh Flavors',
      desc: 'Familiar classic favorites combined with adventurous modern twists like our custom caramelized lotus biscoff and spiced Indian cardamoms.',
      icon: <Coffee className="h-6 w-6 text-amber-400" />,
    },
    {
      title: 'Made With Love',
      desc: 'Every single thick shake is individually assembled and hand-finished with artisan toppings and glossy sauces by our trained creators.',
      icon: <Heart className="h-6 w-6 text-red-400" />,
    },
  ];

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-cocoa-900 to-cocoa-950"
    >
      {/* Decorative Blur */}
      <div id="about-radial-ambient" className="absolute top-1/2 left-0 w-80 h-80 bg-luxury-gold/5 blur-[80px] rounded-full pointer-events-none"></div>

      <div id="about-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Story Section Grid */}
        <div id="about-story-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column: Graphics / Collage */}
          <div id="about-left-graphic" className="lg:col-span-6 relative">
            <div id="about-collage-container" className="relative grid grid-cols-2 gap-4">
              
              {/* Card 1 */}
              <motion.div
                id="about-collage-p-1"
                whileHover={{ scale: 1.03, rotate: -1 }}
                className="rounded-2xl overflow-hidden border border-cocoa-800 shadow-xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=400&h=500"
                  alt="Belgian Chocolate Shake Drips"
                  className="object-cover h-64 w-full"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Card 2 */}
              <motion.div
                id="about-collage-p-2"
                whileHover={{ scale: 1.03, rotate: 1 }}
                className="rounded-2xl overflow-hidden border border-cocoa-800 shadow-xl mt-8"
              >
                <img
                  src="https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=400&h=500"
                  alt="Alphonso Mango pulp swirl"
                  className="object-cover h-64 w-full"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              
              {/* Glass stat overlay cards */}
              <div id="about-experience-pawn" className="absolute -bottom-4 right-1/4 translate-x-12 p-5 rounded-2xl glass-panel text-center shadow-2xl border border-white/10 flex items-center gap-3">
                <span className="text-3xl">🥛</span>
                <div className="text-left">
                  <p id="about-milestone" className="text-white font-extrabold text-sm leading-tight">100% Pure Milk Gelato</p>
                  <p id="about-milestone-sub" className="text-luxury-gold text-xs">Pure high-density cocoa churns</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Copywriting & Values */}
          <div id="about-right-copy" className="lg:col-span-6 flex flex-col justify-center text-left">
            
            <div id="story-header" className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-luxury-gold animate-pulse" />
              <span id="story-header-text" className="text-xs uppercase tracking-widest text-luxury-gold font-semibold">OUR ESSENCE</span>
            </div>

            <h2 id="about-story-title" className="text-3.5xl sm:text-5xl font-extrabold font-display leading-tight text-white mb-6">
              Crafted With Passion,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold to-amber-400">
                Blended With Love.
              </span>
            </h2>

            <p id="about-story-body-1" className="text-cocoa-100 font-sans leading-relaxed text-base mb-6 font-light">
              MA was created with a clear vision: to transform standard, run-of-the-mill milkshakes into premium, highly indulgent dessert experiences. By combining globally-sourced rich ingredients, exciting flavor balances, and a deep, uncompromised passion for quality, MA delivers thick shakes that are crafted to be remembered.
            </p>

            {/* Custom Brand Pillars list */}
            <div id="brand-pillars" className="space-y-4 mb-8">
              {[
                { title: 'Brand Philosophy', desc: 'Creating unforgettable indulgent moments through every single glass served.' },
                { title: 'Product Focus', desc: 'Spoonably thick, velvety, and loaded with authentic, high-end toppings.' },
                { title: 'Customer Experience', desc: 'A fun, premium, fully customisable, and share-worthy dessert escape.' },
              ].map((pillar, idx) => (
                <div id={`pillar-${idx}`} key={pillar.title} className="flex gap-4">
                  <div className="h-6 w-6 mt-1 flex items-center justify-center rounded-full bg-luxury-gold/20 text-luxury-gold text-xs font-semibold">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 id={`pillar-title-${idx}`} className="text-cream font-bold text-sm leading-tight">{pillar.title}</h4>
                    <p id={`pillar-desc-${idx}`} className="text-cocoa-300 text-xs mt-0.5 font-light leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Brand Feature Cards Grid */}
        <div id="about-features-container" className="pt-8 border-t border-cocoa-800/40">
          <div id="features-intro" className="text-center max-w-2xl mx-auto mb-12">
            <h3 id="features-header-title" className="text-2xl font-bold font-display text-white">The Quality Coordinates</h3>
            <p id="features-header-desc" className="text-cocoa-300 text-sm mt-1.5 font-sans">Why our shakes stand in a league of their own</p>
          </div>

          <div id="features-cards-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, idx) => (
              <motion.div
                id={`feature-card-${idx}`}
                key={item.title}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="p-6 rounded-2xl glass-panel relative group overflow-hidden text-left border border-cocoa-800/60"
              >
                {/* Back light glow on card hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-luxury-gold/5 tab-hover:from-luxury-gold/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                <div id={`feature-icon-box-${idx}`} className="h-12 w-12 rounded-xl bg-cocoa-900 border border-cocoa-800 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-luxury-gold/30 transition-all duration-300">
                  {item.icon}
                </div>

                <h3 id={`feature-title-${idx}`} className="text-lg font-bold text-cream font-display mb-2 group-hover:text-luxury-gold transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p id={`feature-desc-${idx}`} className="text-xs text-cocoa-300 leading-relaxed font-sans font-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
