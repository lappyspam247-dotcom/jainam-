import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Heart, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function Gallery() {
  const [activeImgIndex, setActiveImgIndex] = useState<number | null>(null);

  const galleryItems = [
    {
      url: '/src/assets/images/hero_thick_shakes_1781749220642.jpg',
      title: 'MA Signature Churn Family',
      size: 'md:col-span-2'
    },
    {
      url: '/src/assets/images/lotus_biscoff_shake_1781749235981.jpg',
      title: 'Lotus Golden speculoos Swirl',
      size: 'md:col-span-1'
    },
    {
      url: '/src/assets/images/gulab_jamun_shake_1781749251649.jpg',
      title: 'Avant-Garde Gulab Jamun Fusion',
      size: 'md:col-span-1'
    },
    {
      url: '/src/assets/images/ferrero_thick_shake_1781749291019.jpg',
      title: 'Double Hazelnut Rocher Velvet',
      size: 'md:col-span-1'
    },
    {
      url: '/src/assets/images/chocolate_lava_shake_1781749306632.jpg',
      title: 'Molten Fudge Fondant Injection',
      size: 'md:col-span-1'
    },
    {
      url: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&q=80&w=500&h=500',
      title: 'Aesthetic Churn Lounge interior',
      size: 'md:col-span-1'
    }
  ];

  return (
    <section
      id="gallery"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-cocoa-950 via-cocoa-900 to-cocoa-950 text-left"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 text-xs font-semibold text-luxury-gold tracking-widest uppercase mb-4">
            <ImageIcon className="h-4 w-4" />
            VISUAL PORTFOLIO EXHIBITION
          </div>
          <h2 className="text-3.5xl sm:text-5xl font-black font-display text-white tracking-tight">
            The Churn Canvas
          </h2>
          <p className="text-cocoa-200 text-sm sm:text-base font-sans mt-3 font-light leading-relaxed">
            Feast your eyes on the thickest, most indulgent dessert beverages churned in India. Click on any frame below to explore the high-definition detail!
          </p>
        </div>

        {/* Masonry-like Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryItems.map((item, idx) => (
            <motion.div
              id={`gallery-item-${idx}`}
              key={idx}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveImgIndex(idx)}
              className={`group overflow-hidden rounded-3xl relative border border-cocoa-800 bg-cocoa-900 cursor-zoom-in aspect-square h-full ${item.size}`}
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Hover glass overlay */}
              <div className="absolute inset-0 bg-cocoa-950/60 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-6 transition-all duration-300">
                <div className="flex justify-between items-center text-white">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-luxury-gold tracking-widest font-sans">MA CUSTOM SHOT</span>
                    <h4 className="text-sm font-bold mt-1 font-display">{item.title}</h4>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                    <Search className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Lightbox zoom view overlay */}
        <AnimatePresence>
          {activeImgIndex !== null && (
            <div
              id="gallery-lightbox-overlay"
              className="fixed inset-0 z-50 bg-cocoa-950/95 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setActiveImgIndex(null)}
            >
              <motion.div
                id="gallery-lightbox-content-box"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-3xl border border-cocoa-800"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  id="btn-lightbox-close"
                  onClick={() => setActiveImgIndex(null)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-cocoa-950 border border-cocoa-850 text-white hover:text-luxury-gold transition-all z-10 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                <img
                  src={galleryItems[activeImgIndex].url}
                  alt={galleryItems[activeImgIndex].title}
                  className="max-h-[75vh] w-auto mx-auto object-contain rounded-2xl"
                  referrerPolicy="no-referrer"
                />

                <div className="p-4 bg-cocoa-950 text-left flex items-center justify-between border-t border-cocoa-900 border-none">
                  <div>
                    <h4 className="text-base font-bold text-white font-display leading-none">{galleryItems[activeImgIndex].title}</h4>
                    <p className="text-xs text-cocoa-300 mt-2 font-sans font-light">MA Luxury Thick Shakes — Preserved in 16-bit Master Definition</p>
                  </div>
                  <span className="text-2xs text-luxury-gold font-bold uppercase tracking-widest flex items-center gap-1.5 bg-luxury-gold/10 px-3 py-1.5 rounded-full border border-luxury-gold/20">
                    <Sparkles className="h-3 w-3" /> Churn Authentica
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
