import React from 'react';
import { Flame, Sparkles, Heart, FileText, Compass, Send } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="brand-footer" className="bg-cocoa-950 border-t border-cocoa-800/40 text-left relative z-10">
      <div id="footer-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Split Grid */}
        <div id="footer-split-grid" className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-cocoa-800/20">
          
          {/* Logo brand pitch */}
          <div className="md:col-span-5 space-y-6">
            <a href="#home" className="flex items-center gap-2 group">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-luxury-gold to-cocoa-500 shadow transform group-hover:rotate-12 transition-transform duration-300">
                <Flame className="h-5 w-5 text-cocoa-950 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-black font-display tracking-wider text-cream flex items-center gap-1">
                MA <span className="text-luxury-gold text-xs font-semibold tracking-widest font-sans">SHAKES</span>
              </span>
            </a>
            <p className="text-xs text-cocoa-300 leading-relaxed font-sans max-w-sm font-light">
              We are a next-generation luxury dessert beverage brand devoted to delivering pure, double-churned, ultra-dense spoonable masterpieces. Elevating regular shaking conventions into memorable gourmet moments.
            </p>
          </div>

          {/* Useful categories list */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold uppercase text-luxury-gold tracking-widest flex items-center gap-2">
              <Compass className="h-3.5 w-3.5" />
              Navigation Linkage
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { label: 'Home Top', href: '#home' },
                { label: 'About MA', href: '#about' },
                { label: 'Shakes Menu', href: '#menu' },
                { label: 'Shake Builder', href: '#builder' },
                { label: 'Lounge Units', href: '#locations' },
                { label: 'Reviews', href: '#reviews' },
                { label: 'Instagram Gallery', href: '#gallery' },
                { label: 'Contact Help', href: '#contact' },
              ].map((lnk) => (
                <a
                  key={lnk.label}
                  href={lnk.href}
                  className="text-cocoa-200 hover:text-white transition-colors"
                >
                  {lnk.label}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter / Club segment */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-extrabold uppercase text-luxury-gold tracking-widest flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              The Churn Club Newsletter
            </h4>
            <p className="text-2xs text-cocoa-300 leading-relaxed font-light">
              Subscribe to unlock members-only priority alerts on limited-edition fusion flavours, festive coupon packs, and local outlet launches.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Welcome to the Churn Club! Look out for premium coordinates in your inbox.');
                const target = e.target as HTMLFormElement;
                target.reset();
              }}
              className="flex bg-cocoa-900 border border-cocoa-800 rounded-xl overflow-hidden mt-2"
            >
              <input
                type="email"
                required
                placeholder="Enter email coordinate..."
                className="flex-grow bg-transparent px-3 py-2.5 text-xs text-white focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-luxury-gold text-cocoa-950 font-bold hover:bg-amber-400 transition-colors flex items-center justify-center cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Lower credit bar */}
        <div id="footer-credit-bar" className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-2xs text-cocoa-300 font-sans font-light">
          <p>© {currentYear} MA Thick Shakes Inc. All coordinate lines are preserved with absolute density.</p>
          <div className="flex gap-4 items-center">
            <a href="#about" className="hover:text-white transition-colors">Privacy coordinates</a>
            <span>•</span>
            <a href="#about" className="hover:text-white transition-colors">Terms of Churn</a>
            <span>•</span>
            <span className="flex items-center gap-1">Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for Indian Gourmands</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
