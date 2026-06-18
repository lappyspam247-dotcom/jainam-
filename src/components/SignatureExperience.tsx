import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Heart, MessageCircle, Sparkles, Smile, Share2 } from 'lucide-react';

export default function SignatureExperience() {
  const experiences = [
    {
      img: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&q=80&w=600&h=600',
      tag: '#MACafeVibe',
      likes: '1.4K',
      comments: '124',
      user: '@esha_chatterjee',
      desc: 'Absolutely obsessed with the interior here. Feels so high-luxury!'
    },
    {
      img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600&h=600',
      tag: '#DoubleMaltMagic',
      likes: '2.1K',
      comments: '342',
      user: '@rohan_bakshi',
      desc: 'Spoonable goodness. Standard milkshakes have officially left the chat.'
    },
    {
      img: 'https://images.unsplash.com/photo-1511688878353-3a269170023d?auto=format&fit=crop&q=80&w=600&h=600',
      tag: '#FusionSensation',
      likes: '1.9K',
      comments: '198',
      user: '@the_mumbai_foodie',
      desc: 'Gulab Jamun combined with saffron gelato. Brilliant fusion!'
    }
  ];

  return (
    <section
      id="signature-experience"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-cocoa-900 to-cocoa-950 text-left"
    >
      <div id="sig-ambient-gold" className="absolute top-1/2 right-0 w-80 h-80 bg-luxury-gold/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div id="sig-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Editorial Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 text-xs font-semibold text-luxury-gold tracking-widest uppercase mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              SENSORY STORYTELLING
            </div>
            <h2 className="text-3.5xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
              More Than A Shake —<br />
              It’s An <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold via-amber-400 to-luxury-gold text-white font-black">Experience.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 flex items-center justify-start lg:justify-end">
            <p className="text-cocoa-300 font-sans text-sm sm:text-base max-w-md font-light leading-relaxed">
              “From first sip to last drop, MA creates moments worth sharing.” We curate dessert lounge spaces that blend culinary engineering with beautiful contemporary interiors.
            </p>
          </div>
        </div>

        {/* Custom Visual Tiles portraying Cafe lifestyle */}
        <div id="sig-cards-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp, idx) => (
            <motion.div
              id={`experience-post-${idx}`}
              key={exp.tag}
              whileHover={{ y: -8 }}
              className="bg-cocoa-950 rounded-3xl border border-cocoa-800/80 overflow-hidden shadow-xl"
            >
              <div className="p-4 border-b border-cocoa-800/50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-luxury-gold to-cocoa-500 flex items-center justify-center font-bold text-[10px] text-cocoa-950">
                    {exp.user[1].toUpperCase()}{exp.user[2].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-black text-white">{exp.user}</p>
                    <p className="text-[10px] text-cocoa-300 font-light font-sans">{exp.tag}</p>
                  </div>
                </div>
                <Instagram className="h-4 w-4 text-cocoa-300" />
              </div>

              {/* Photo Frame with subtle filter */}
              <div className="relative aspect-square overflow-hidden bg-cocoa-900">
                <img
                  src={exp.img}
                  alt={exp.tag}
                  className="object-cover w-full h-full filter brightness-95"
                  referrerPolicy="no-referrer"
                />
                
                {/* Hearts Overlay on Hover */}
                <div className="absolute inset-0 bg-cocoa-950/45 opacity-0 hover:opacity-100 flex items-center justify-center gap-4 transition-opacity duration-300 text-white font-bold text-sm">
                  <span className="flex items-center gap-1.5 grayscale-0">
                    <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                    {exp.likes}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="h-5 w-5 fill-white text-white" />
                    {exp.comments}
                  </span>
                </div>
              </div>

              {/* Caption info */}
              <div className="p-5 space-y-2 text-xs text-left">
                <p className="font-light text-cocoa-100 leading-relaxed font-sans">
                  {exp.desc}
                </p>
                <div className="flex items-center gap-3 text-[10px] text-cocoa-300 font-sans font-light pt-2 border-t border-cocoa-800/20">
                  <span className="flex items-center gap-1"><Heart className="h-3 w-3 text-red-400 stroke-[1.8]" /> Liked by 4,124 foodies</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cafe Atmosphere Grid Banners */}
        <div className="mt-16 bg-gradient-to-r from-cocoa-900 to-cocoa-950 rounded-3xl border border-cocoa-800/80 p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="flex gap-4 items-start max-w-lg">
            <div className="bg-luxury-gold/15 p-3 rounded-2xl border border-luxury-gold/25 text-luxury-gold flex-shrink-0 animate-bounce">
              <Smile className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-cream font-display">Instagammable Dessert Layouts</h3>
              <p className="text-xs text-cocoa-300 mt-1 leading-relaxed">
                Whether it is our signature heavy-weighted cocktail dessert glassware, neon amber lit lounge tables, or gold rimmed pourers, MA elements are visually designed to elevate your personal feed.
              </p>
            </div>
          </div>
          <button
            id="btn-atmosphere-insta"
            onClick={() => window.open('https://instagram.com')}
            className="px-6 py-4 rounded-xl bg-cocoa-950 border border-cocoa-800 hover:border-luxury-gold text-white hover:text-luxury-gold text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Share2 className="h-4 w-4" />
            Vibe With Us On Socials
          </button>
        </div>

      </div>
    </section>
  );
}
