import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BASE_OPTIONS, FLAVOR_PROFILES, TOPPING_OPTIONS } from '../data';
import { CartItem } from '../types';
import { Sparkles, ShoppingCart, GlassWater, Trophy, ArrowRight, CheckCircle2 } from 'lucide-react';

interface InteractiveBuilderProps {
  onAddCustomShakeToCart: (customItem: CartItem) => void;
}

export default function InteractiveBuilder({ onAddCustomShakeToCart }: InteractiveBuilderProps) {
  const [selectedBase, setSelectedBase] = useState(BASE_OPTIONS[0]);
  const [selectedFlavor, setSelectedFlavor] = useState(FLAVOR_PROFILES[0]);
  const [activeToppings, setActiveToppings] = useState<string[]>([]);
  const [shakeSize, setShakeSize] = useState<'Regular' | 'Thick-Size' | 'King-Size'>('Regular');
  
  // Interactive glass state controls
  const [isPouring, setIsPouring] = useState(false);
  const [fillLevel, setFillLevel] = useState(0.85); // 0 to 1
  const [justAddedToCart, setJustAddedToCart] = useState(false);

  const toggleTopping = (name: string) => {
    if (activeToppings.includes(name)) {
      setActiveToppings(activeToppings.filter(t => t !== name));
    } else {
      setActiveToppings([...activeToppings, name]);
    }
  };

  const getToppingIcon = (name: string) => {
    const found = TOPPING_OPTIONS.find(t => t.name === name);
    return found ? found.icon : '✨';
  };

  const currentSizePrice = shakeSize === 'Regular' ? 0 : shakeSize === 'Thick-Size' ? 60 : 110;
  
  const calculatedPrice = () => {
    const basePrice = 240; // Flat price for custom base builder
    const sizePrice = currentSizePrice;
    const recipeBase = selectedBase.price;
    const toppingsPrice = activeToppings.reduce((acc, name) => {
      const top = TOPPING_OPTIONS.find(t => t.name === name);
      return acc + (top ? top.price : 0);
    }, 0);
    return basePrice + sizePrice + recipeBase + toppingsPrice;
  };

  const handlePourFlavor = (flavor: typeof FLAVOR_PROFILES[0]) => {
    setIsPouring(true);
    setSelectedFlavor(flavor);
    setTimeout(() => {
      setIsPouring(false);
    }, 1200);
  };

  const handleAddCustomToCart = () => {
    const uniqueId = `diy-shake-${Date.now()}`;
    const cartObj: CartItem = {
      cartId: uniqueId,
      shakeId: 'diy-custom-shake',
      name: `Bespoke ${selectedFlavor.text} Shake`,
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=600&h=600', // standard beautiful base chocolate
      price: calculatedPrice(),
      quantity: 1,
      customization: {
        size: shakeSize,
        sweetness: 'Normal',
        thickness: 'Ultra Thick',
        selectedToppings: activeToppings
      }
    };

    onAddCustomShakeToCart(cartObj);
    setJustAddedToCart(true);
    setTimeout(() => {
      setJustAddedToCart(false);
    }, 3000);
  };

  return (
    <section
      id="builder"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-cocoa-950 via-cocoa-950 to-cocoa-900"
    >
      <div id="builder-back-pattern" className="absolute inset-0 bg-[radial-gradient(#2f1e0b_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-20 pointer-events-none"></div>
      
      <div id="builder-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Heading */}
        <div id="builder-heading-block" className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 tracking-widest uppercase mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            VIRTUAL THICK SHAKE LAB
          </div>
          <h2 id="builder-main-title" className="text-3.5xl sm:text-5xl font-black font-display text-white tracking-tight">
            Assemble Your Shake Cup
          </h2>
          <p id="builder-sub-desc" className="text-cocoa-200 text-sm sm:text-base font-sans mt-3 font-light leading-relaxed">
            Unleash your inner flavor alchemist. Select a double-churned ice base, pour in luxury thick core flavors, cluster gourmet toppings, and watch your creation materialize inside our interactive digital glass!
          </p>
        </div>

        {/* Builder Studio layout */}
        <div id="builder-studio-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT 7 COLUMN: Selection Panel */}
          <div id="builder-selections-column" className="lg:col-span-7 bg-cocoa-900/40 border border-cocoa-800/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left space-y-8 shadow-xl">
            
            {/* Step 1: Base Liquid Formula */}
            <div id="builder-step-1" className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xs font-extrabold text-luxury-gold uppercase tracking-widest">STEP 01</span>
                <span className="text-xs text-cocoa-300 font-light">Choose Base Formula</span>
              </div>
              <h3 className="text-lg font-bold text-cream font-display">Pick Double-Malt Base</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {BASE_OPTIONS.map((base) => (
                  <button
                    id={`btn-base-diy-${base.name.toLowerCase().replace(/\s+/g, '-')}`}
                    key={base.name}
                    onClick={() => setSelectedBase(base)}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all group pointer-events-auto cursor-pointer ${
                      selectedBase.name === base.name
                        ? 'bg-luxury-gold/15 border-luxury-gold text-white font-semibold'
                        : 'bg-cocoa-950 border-cocoa-800 text-cocoa-300 hover:border-cocoa-600'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider">{base.name}</h4>
                      <p className="text-[10px] text-cocoa-300 font-sans mt-1 leading-tight font-light">{base.desc}</p>
                    </div>
                    <span className="text-xs font-bold text-luxury-gold mt-4 block">
                      {base.price === 0 ? 'FREE INCLUDED' : `+₹${base.price}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Thick Core Flavor liquid */}
            <div id="builder-step-2" className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xs font-extrabold text-luxury-gold uppercase tracking-widest">STEP 02</span>
                <span className="text-xs text-cocoa-300 font-light">Interactive Flavor Pour</span>
              </div>
              <h3 className="text-lg font-bold text-cream font-display">Select Cream-Core Flavor</h3>
              <div className="flex flex-wrap gap-2.5">
                {FLAVOR_PROFILES.map((flavor) => (
                  <button
                    id={`btn-flavor-diy-${flavor.name.toLowerCase().replace(/\s+/g, '-')}`}
                    key={flavor.name}
                    onClick={() => handlePourFlavor(flavor)}
                    className={`px-4 py-3 rounded-xl border flex items-center gap-3 transition-all relative overflow-hidden pointer-events-auto cursor-pointer ${
                      selectedFlavor.name === flavor.name
                        ? 'border-white text-white font-bold bg-cocoa-950'
                        : 'border-cocoa-800 text-cocoa-300 hover:border-cocoa-600 bg-cocoa-950/60'
                    }`}
                  >
                    {/* Circle Color Indicator */}
                    <span
                      className="h-4 w-4 rounded-full border border-white/20 shadow-inner flex-shrink-0"
                      style={{ backgroundColor: flavor.color }}
                    ></span>
                    <span className="text-xs tracking-wide">{flavor.name}</span>
                    
                    {/* Active Check Accent */}
                    {selectedFlavor.name === flavor.name && (
                      <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-luxury-gold"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Size multiplier */}
            <div id="builder-step-3" className="space-y-3">
              <h3 className="text-lg font-bold text-cream font-display">Choose Cup Capacity</h3>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { name: 'Regular', desc: '400 ml glass', label: 'INR 0' },
                  { name: 'Thick-Size', desc: '600 ml glass', label: '+INR 60' },
                  { name: 'King-Size', desc: '800 ml bucket', label: '+INR 110' },
                ].map((sz) => (
                  <button
                    id={`btn-sz-diy-${sz.name.toLowerCase()}`}
                    key={sz.name}
                    onClick={() => setShakeSize(sz.name as any)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      shakeSize === sz.name
                        ? 'bg-luxury-gold/15 border-luxury-gold text-white font-semibold'
                        : 'bg-cocoa-950/60 border-cocoa-800 text-cocoa-300 hover:border-cocoa-600'
                    }`}
                  >
                    <p className="text-xs font-bold">{sz.name}</p>
                    <p className="text-[10px] text-cocoa-300 font-light mt-0.5">{sz.desc}</p>
                    <p className="text-[10px] text-luxury-gold font-bold mt-1.5">{sz.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Toppings multi selectors */}
            <div id="builder-step-4" className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xs font-extrabold text-luxury-gold uppercase tracking-widest">STEP 03</span>
                <span className="text-xs text-cocoa-300 font-light">Garnish pileup</span>
              </div>
              <h3 className="text-lg font-bold text-cream font-display">Select Gourmet Toppings</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {TOPPING_OPTIONS.map((top) => {
                  const isChecked = activeToppings.includes(top.name);
                  return (
                    <button
                      id={`btn-topping-diy-${top.name.toLowerCase().replace(/\s+/g, '-')}`}
                      key={top.name}
                      onClick={() => toggleTopping(top.name)}
                      className={`p-3 rounded-xl border flex flex-col justify-between items-start transition-all relative ${
                        isChecked
                          ? 'bg-amber-500/10 border-amber-500 text-white font-semibold'
                          : 'bg-cocoa-950 border-cocoa-800 text-cocoa-300 hover:border-cocoa-600'
                      }`}
                    >
                      <span className="text-xl mb-1">{top.icon}</span>
                      <div className="text-left">
                        <p className="text-[10px] font-sans leading-tight line-clamp-1">{top.name}</p>
                        <p className="text-[9px] text-luxury-gold mt-1 font-bold">+₹{top.price}</p>
                      </div>
                      
                      {isChecked && (
                        <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT 5 COLUMN: Interactive Glass Visualizer */}
          <div id="builder-glass-visualizer" className="lg:col-span-5 bg-cocoa-900/60 border border-cocoa-800 rounded-3xl p-6 flex flex-col justify-between shadow-2xl items-stretch relative overflow-hidden">
            
            {/* Ambient visual backing */}
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa-950 via-transparent to-transparent pointer-events-none"></div>

            {/* Title review of builder */}
            <div className="relative z-10 text-center">
              <h4 className="text-xs font-black uppercase tracking-widest text-luxury-gold">Active Cup Composition</h4>
              <p className="text-xs text-cocoa-300 mt-0.5">Watch components fuse</p>
            </div>

            {/* The Visual Dynamic Glass Container */}
            <div id="the-glass-beaker-box" className="h-[280px] my-4 relative flex items-center justify-center z-10 w-full">
              
              {/* Fluid Flow animation when pouring */}
              <AnimatePresence>
                {isPouring && (
                  <motion.div
                    initial={{ height: 0, opacity: 0.8 }}
                    animate={{ height: '240px', opacity: [0.8, 1, 0.8] }}
                    exit={{ opacity: 0 }}
                    className="absolute top-0 w-2 h-[240px] pointer-events-none rounded-b-xl z-20"
                    style={{
                      backgroundColor: selectedFlavor.color,
                      boxShadow: `0 0 12px ${selectedFlavor.shadowColor}`
                    }}
                  />
                )}
              </AnimatePresence>

              {/* The Glass Outlining */}
              <div id="physical-glass-structure" className="w-[140px] h-[220px] rounded-b-4xl border-x-4 border-b-4 border-t border-white/20 bg-white/5 relative shadow-inner overflow-hidden flex flex-col justify-end">
                
                {/* The Shifting Liquid color fill */}
                <motion.div
                  id="fluid-level-fill-block"
                  animate={{
                    height: `${fillLevel * 100}%`,
                    backgroundColor: selectedFlavor.color,
                  }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="w-full relative shadow-inner flex flex-col justify-start"
                  style={{
                    boxShadow: `inset 0 12px 24px -12px rgba(255,255,255,0.4), 0 -8px 24px ${selectedFlavor.shadowColor}`
                  }}
                >
                  {/* Frothy top bubbles layer */}
                  <div className="absolute -top-[10px] left-0 right-0 h-4 bg-white/10 blur-[1px] animate-pulse rounded-t-full"></div>

                  {/* Little toppings emoji bubbles falling in glass */}
                  <div className="absolute inset-0 overflow-hidden">
                    <AnimatePresence>
                      {activeToppings.map((topName, index) => {
                        const icon = getToppingIcon(topName);
                        // Randomized initial states so bubble offsets look neat
                        const offsetLeft = (index * 25) % 80 + 10; 
                        const delayOffset = (index * 0.15) % 0.5;

                        return (
                          <motion.span
                            key={topName}
                            initial={{ y: -50, scale: 0, opacity: 0 }}
                            animate={{ y: 20 + (index * 12), scale: 1, opacity: 0.9, rotate: (index * 15) % 60 - 30 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: 'spring', delay: delayOffset, stiffness: 60 }}
                            className="absolute text-xl pointer-events-none"
                            style={{ left: `${offsetLeft}%` }}
                          >
                            {icon}
                          </motion.span>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Grid markings for professional measure look */}
                <div className="absolute inset-y-0 left-2.5 flex flex-col justify-between py-10 pointer-events-none opacity-25 text-white text-[8px] font-mono select-none">
                  <span>800ml -</span>
                  <span>600ml -</span>
                  <span>400ml -</span>
                  <span>200ml -</span>
                </div>
              </div>

              {/* Spoon Handle Protrusion */}
              <div className="absolute top-2 right-[30%] w-[8px] h-[190px] bg-gradient-to-b from-cocoa-200 to-cocoa-500 opacity-80 rounded-t-xl rotate-[-12deg] z-10 pointer-events-none flex flex-col items-center">
                <div className="h-5 w-5 rounded-full bg-luxury-gold absolute -top-4 shadow border border-white/5 flex items-center justify-center">
                  <span className="text-[8px] text-cocoa-950 font-bold leading-none">MA</span>
                </div>
              </div>
            </div>

            {/* Customizer Review Info Card */}
            <div id="diy-specification-summary" className="relative z-10 bg-cocoa-950/80 rounded-2xl border border-cocoa-800/60 p-4 space-y-3 text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="text-cocoa-300 font-light">Gelato Base:</span>
                <span className="text-cream font-bold">{selectedBase.name}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-cocoa-300 font-light">Flavor Blend:</span>
                <span className="text-luxury-gold font-bold">{selectedFlavor.name}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-cocoa-300 font-light">Cup Capacity:</span>
                <span className="text-cream font-bold">{shakeSize}</span>
              </div>
              <div className="border-t border-cocoa-800/40 pt-2 flex flex-col text-xs space-y-1">
                <span className="text-cocoa-300 font-light">Toppings Loaded:</span>
                <p className="text-[11px] font-sans tracking-wide text-amber-500 font-medium">
                  {activeToppings.length === 0 ? 'None selected yet — add crunch!' : activeToppings.join(', ')}
                </p>
              </div>
            </div>

            {/* Cart trigger block */}
            <div id="diy-action-footer" className="relative z-10 mt-6 space-y-3">
              <div className="flex items-center justify-between border-t border-cocoa-800/50 pt-4">
                <div>
                  <span className="text-3xs uppercase text-cocoa-300 tracking-widest font-sans">Custom Price</span>
                  <p id="diy-calculated-price-indicator" className="text-3xl font-black font-display text-white mt-0.5">₹{calculatedPrice()}</p>
                </div>
                
                <div className="text-right">
                  <span className="text-3xs uppercase text-cocoa-300 tracking-widest font-sans">Estimate Density</span>
                  <div className="flex gap-1 mt-1 text-xs">
                    <span className="text-white font-extrabold px-2.5 py-1 rounded bg-cocoa-950 border border-cocoa-800 font-mono leading-none">9.8 CP</span>
                  </div>
                </div>
              </div>

              {/* Add Custom to basket */}
              {!justAddedToCart ? (
                <button
                  id="btn-diy-shakelab-add"
                  onClick={handleAddCustomToCart}
                  className="w-full bg-gradient-to-r from-luxury-gold to-luxury-gold-dark hover:from-amber-400 hover:to-luxury-gold text-cocoa-950 font-black py-4 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg shadow-luxury-gold/15 cursor-pointer"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Pump Custom Cup to Cart
                </button>
              ) : (
                <button
                  id="btn-diy-shakelab-success"
                  disabled
                  className="w-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold py-4 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Bespoke Cup Dispensed!
                </button>
              )}
              
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
