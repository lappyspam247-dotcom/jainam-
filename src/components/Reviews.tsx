import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { REVIEWS } from '../data';
import { Star, MessageSquareCode, Quote, User, Flame, ArrowLeft, ArrowRight } from 'lucide-react';

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevReview = () => {
    setActiveIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setActiveIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="reviews"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-cocoa-900 to-cocoa-950 text-left"
    >
      <div id="review-ambient-chocolate" className="absolute bottom-1/4 right-[10%] w-[350px] h-[350px] bg-cocoa-500/5 blur-[90px] rounded-full pointer-events-none"></div>

      <div id="reviews-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 text-xs font-semibold text-luxury-gold tracking-widest uppercase mb-4">
            <MessageSquareCode className="h-4 w-4" />
            CRITIQUE EXPERIENCE FEEDBACK
          </div>
          <h2 className="text-3.5xl sm:text-5xl font-black font-display text-white tracking-tight">
            Word On The Street
          </h2>
          <p className="text-cocoa-200 text-sm sm:text-base font-sans mt-3 font-light leading-relaxed">
            Do not just take our word for it. Explore review articles and real testimonials shared by food critics and thick shake gourmands across India!
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative">
          
          <div className="relative min-h-[300px] bg-cocoa-900/40 border border-cocoa-800 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col justify-between overflow-hidden">
            {/* Background absolute quotation mark */}
            <Quote className="h-40 w-40 text-cocoa-800/10 absolute -top-8 -left-8 stroke-[1.5] select-none pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-6 text-left relative z-10"
              >
                
                {/* Five Stars Rating with bounce delay */}
                <div className="flex items-center gap-1.5 text-amber-400">
                  {Array.from({ length: REVIEWS[activeIndex].rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-amber-400 text-amber-400 transform hover:scale-125 transition-transform cursor-default"
                    />
                  ))}
                </div>

                {/* Main Review text */}
                <p id={`review-text-${REVIEWS[activeIndex].id}`} className="text-lg sm:text-2xl font-serif text-cream italic leading-relaxed">
                  “{REVIEWS[activeIndex].text}”
                </p>

                {/* User author profile */}
                <div className="flex items-center gap-4 pt-6 border-t border-cocoa-800/30">
                  <div className="relative h-14 w-14 rounded-2xl overflow-hidden border border-luxury-gold/30">
                    <img
                      src={REVIEWS[activeIndex].avatar}
                      alt={REVIEWS[activeIndex].name}
                      className="object-cover h-full w-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 id={`review-author-name-${REVIEWS[activeIndex].id}`} className="text-base font-bold text-white font-display">
                      {REVIEWS[activeIndex].name}
                    </h4>
                    <p className="text-xs text-luxury-gold uppercase tracking-wider font-semibold font-sans mt-0.5">
                      {REVIEWS[activeIndex].role}
                    </p>
                    <p className="text-[10px] text-cocoa-300 font-sans mt-1">
                      Verified Critique • {REVIEWS[activeIndex].date}
                    </p>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Slider Switcher buttons */}
            <div className="flex items-center justify-end gap-3.5 mt-8 border-t border-cocoa-800/25 pt-6 relative z-10">
              <button
                id="btn-review-carousel-prev"
                onClick={prevReview}
                className="p-3 rounded-xl bg-cocoa-950 border border-cocoa-800 hover:border-luxury-gold text-cocoa-200 hover:text-white transition-all cursor-pointer"
                aria-label="Previous Review"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <span className="text-xs font-mono font-bold text-cocoa-300">
                0{activeIndex + 1} / 0{REVIEWS.length}
              </span>
              <button
                id="btn-review-carousel-next"
                onClick={nextReview}
                className="p-3 rounded-xl bg-cocoa-950 border border-cocoa-800 hover:border-luxury-gold text-cocoa-200 hover:text-white transition-all cursor-pointer"
                aria-label="Next Review"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
