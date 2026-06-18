import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS } from '../data';
import { ShakeItem } from '../types';
import { Flame, Star, ShoppingCart, Plus, Sparkles, X, Heart, Shield, Apple, Info } from 'lucide-react';

interface MenuProps {
  onAddToCart: (item: ShakeItem, quantity: number, customOpts: any) => void;
}

export default function Menu({ onAddToCart }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Chocolates' | 'Classic' | 'Fusions' | 'Fruity'>('All');
  const [selectedShake, setSelectedShake] = useState<ShakeItem | null>(null);
  const [hoveredShakeId, setHoveredShakeId] = useState<string | null>(null);

  // Customization selection state within the modal
  const [selectedSize, setSelectedSize] = useState<'Regular' | 'Thick-Size' | 'King-Size'>('Regular');
  const [selectedSweetness, setSelectedSweetness] = useState<'Less Sugar' | 'Normal' | 'Extra Sweet'>('Normal');
  const [selectedThickness, setSelectedThickness] = useState<'Thick' | 'Ultra Thick' | 'Spoonable'>('Ultra Thick');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [successBadgeItem, setSuccessBadgeItem] = useState<string | null>(null);

  // Add toppings list internally
  const toppingList = [
    { name: 'Ferrero Rocher Rochitas', price: 60 },
    { name: 'Lotus Biscoff Spread Drop', price: 50 },
    { name: 'Whipped Mousse Cream', price: 30 },
    { name: 'Warm Chocolate Caramel Ribbon', price: 40 },
    { name: 'Golden Hazelnut Crumbs', price: 40 }
  ];

  const sizePriceModifiers = {
    'Regular': 0,
    'Thick-Size': 60,
    'King-Size': 110
  };

  const calculateCustomPrice = () => {
    if (!selectedShake) return 0;
    const basePrice = selectedShake.price;
    const sizePrice = sizePriceModifiers[selectedSize];
    const toppingsPrice = selectedToppings.reduce((total, toppingName) => {
      const top = toppingList.find(t => t.name === toppingName);
      return total + (top ? top.price : 0);
    }, 0);
    return (basePrice + sizePrice + toppingsPrice) * quantity;
  };

  const filteredItems = MENU_ITEMS.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const handleOpenCustomizer = (shake: ShakeItem) => {
    setSelectedShake(shake);
    setSelectedSize('Regular');
    setSelectedSweetness('Normal');
    setSelectedThickness('Ultra Thick');
    setSelectedToppings([]);
    setQuantity(1);
  };

  const handleToggleTopping = (toppingName: string) => {
    if (selectedToppings.includes(toppingName)) {
      setSelectedToppings(selectedToppings.filter(t => t !== toppingName));
    } else {
      setSelectedToppings([...selectedToppings, toppingName]);
    }
  };

  const handleConfirmAdd = () => {
    if (!selectedShake) return;

    const customOpts = {
      size: selectedSize,
      sweetness: selectedSweetness,
      thickness: selectedThickness,
      selectedToppings: selectedToppings
    };

    onAddToCart(selectedShake, quantity, customOpts);

    // Show a small interactive success pop
    const targetName = selectedShake.name;
    setSelectedShake(null);
    setSuccessBadgeItem(targetName);
    setTimeout(() => {
      setSuccessBadgeItem(null);
    }, 3000);
  };

  return (
    <section
      id="menu"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-cocoa-950 via-cocoa-900 to-cocoa-950"
    >
      <div id="menu-ambient-glow" className="absolute top-10 right-10 w-[500px] h-[500px] bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div id="menu-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Title */}
        <div id="menu-heading-block" className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 text-xs font-semibold text-luxury-gold tracking-widest uppercase mb-4">
            <Flame className="h-3.5 w-3.5" />
            Liquid Indulgence Catalog
          </div>
          <h2 id="menu-main-title" className="text-3.5xl sm:text-5xl font-black font-display text-white tracking-tight">
            The Thick Shake Menu
          </h2>
          <p id="menu-sub-desc" className="text-cocoa-200 text-sm sm:text-base font-sans mt-3 font-light leading-relaxed">
            Churned with ultra-premium dairy gelato and zero external water. Double-layered with rich toppings to deliver massive flavor intensity. Select a shake to customize sweetness and texture!
          </p>
        </div>

        {/* Categories Tab Filters */}
        <div id="menu-filters-wrapper" className="flex justify-center mb-12">
          <div id="menu-category-tabs" className="inline-flex flex-wrap md:flex-nowrap gap-2 bg-cocoa-900/60 p-1.5 rounded-2xl border border-cocoa-800/60 max-w-xl shadow-md">
            {(['All', 'Chocolates', 'Classic', 'Fusions', 'Fruity'] as const).map((cat) => (
              <button
                id={`btn-menu-tab-${cat.toLowerCase()}`}
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 pointer-events-auto cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-luxury-gold to-luxury-gold-dark text-cocoa-950 shadow-lg font-bold'
                    : 'text-cocoa-200 hover:text-white hover:bg-cocoa-800/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Success Alert Toast Pop */}
        <AnimatePresence>
          {successBadgeItem && (
            <motion.div
              id="menu-success-alert"
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-4 max-w-md mx-auto rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-3 text-emerald-400 font-sans shadow-lg"
            >
              <div className="bg-emerald-500/20 p-2 rounded-lg">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-extrabold text-sm leading-none text-white">Item Added to Shake Glass!</p>
                <p className="text-xs text-cocoa-200 mt-1">{successBadgeItem} successfully queued into your active cup.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shake Cards Grid */}
        <div id="menu-items-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((shake, index) => {
              const isPopular = shake.isPopular;
              return (
                <motion.div
                  id={`shake-menu-card-${shake.id}`}
                  key={shake.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45 }}
                  onMouseEnter={() => setHoveredShakeId(shake.id)}
                  onMouseLeave={() => setHoveredShakeId(null)}
                  className="bg-cocoa-900/40 rounded-3xl border border-cocoa-800/60 overflow-hidden shadow-xl transform transition-all duration-300 hover:border-luxury-gold/30 hover:shadow-2xl flex flex-col h-full group"
                >
                  {/* Card Visual Wrapper */}
                  <div id={`shake-img-box-${shake.id}`} className="relative overflow-hidden aspect-square flex-shrink-0">
                    <img
                      src={shake.image}
                      alt={shake.name}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Overlay for card title */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cocoa-950 via-transparent to-transparent opacity-85"></div>

                    {/* Category Label */}
                    <span id={`badge-cat-${shake.id}`} className="absolute top-4 left-4 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md bg-cocoa-950/80 border border-cocoa-800 text-cocoa-200 shadow">
                      {shake.category}
                    </span>

                    {/* Popular Star Badge */}
                    {isPopular && (
                      <span id={`badge-signature-${shake.id}`} className="absolute top-4 right-4 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md bg-gradient-to-r from-luxury-gold to-amber-500 text-cocoa-950 flex items-center gap-1 shadow-md">
                        <Sparkles className="h-3 w-3 fill-cocoa-950" />
                        Signature
                      </span>
                    )}

                    {/* Price Tag Overlay */}
                    <div id={`price-pill-${shake.id}`} className="absolute bottom-4 right-4 bg-cocoa-950/90 border border-luxury-gold/30 rounded-xl px-3 py-1.5 shadow-lg">
                      <span className="text-xs text-luxury-gold font-bold">INR</span>{' '}
                      <span className="text-lg font-black text-white">{shake.price}</span>
                    </div>
                  </div>

                  {/* Card Main Info */}
                  <div id={`shake-info-box-${shake.id}`} className="p-6 flex flex-col justify-between flex-grow text-left">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 id={`title-shake-${shake.id}`} className="text-xl font-bold text-cream font-display leading-tight group-hover:text-luxury-gold transition-colors duration-300">
                          {shake.name}
                        </h3>
                        <div className="flex items-center gap-1 bg-cocoa-950/60 px-2 py-1 rounded-md border border-cocoa-800">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-bold text-white leading-none">{shake.rating.toFixed(1)}</span>
                        </div>
                      </div>

                      <p id={`desc-shake-${shake.id}`} className="text-xs text-cocoa-300 leading-relaxed font-sans font-light min-h-[48px]">
                        {shake.description}
                      </p>

                      {/* Display key ingredients as pills */}
                      <div id={`ingred-box-${shake.id}`} className="flex flex-wrap gap-1.5 pt-1.5">
                        {shake.ingredients.slice(0, 3).map((ing, i) => (
                          <span id={`ingred-pill-${shake.id}-${i}`} key={ing} className="text-[10px] text-cocoa-100 font-sans tracking-wide bg-cocoa-900 border border-cocoa-800 px-2.5 py-1 rounded-md font-light">
                            {ing}
                          </span>
                        ))}
                        {shake.ingredients.length > 3 && (
                          <span className="text-[9px] text-luxury-gold/80 px-1 py-0.5 self-center font-bold">
                            +{shake.ingredients.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Buttons CTA block */}
                    <div id={`shake-btn-group-${shake.id}`} className="flex gap-2.5 mt-6 pt-5 border-t border-cocoa-800/40">
                      <button
                        id={`btn-shake-add-direct-${shake.id}`}
                        onClick={() => {
                          onAddToCart(shake, 1, {
                            size: 'Regular',
                            sweetness: 'Normal',
                            thickness: 'Ultra Thick',
                            selectedToppings: []
                          });
                          setSuccessBadgeItem(shake.name);
                          setTimeout(() => {
                            setSuccessBadgeItem(null);
                          }, 3000);
                        }}
                        className="flex-1 bg-gradient-to-r from-cocoa-800 to-cocoa-900 border border-cocoa-500/20 hover:border-cocoa-500 hover:bg-cocoa-800 text-cream font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        Quick Add
                      </button>

                      <button
                        id={`btn-shake-custom-${shake.id}`}
                        onClick={() => handleOpenCustomizer(shake)}
                        className="bg-gradient-to-r from-luxury-gold to-luxury-gold-dark hover:from-amber-400 hover:to-luxury-gold text-cocoa-950 font-extrabold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md shadow-luxury-gold/5 hover:shadow-luxury-gold/15 cursor-pointer"
                      >
                        <Plus className="h-4 w-4 stroke-[2.5]" />
                        Customize
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Modal: Interactive Customizer Overlay */}
        <AnimatePresence>
          {selectedShake && (
            <div id="modal-backdrop-customizer" className="fixed inset-0 z-50 bg-cocoa-950/80 backdrop-blur-md flex items-center justify-center p-4">
              <motion.div
                id="modal-card-customizer"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.3 }}
                className="bg-cocoa-950 border border-cocoa-850 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl relative"
              >
                {/* Close Button */}
                <button
                  id="btn-close-customizer-modal"
                  onClick={() => setSelectedShake(null)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-cocoa-900 border border-cocoa-800 hover:border-luxury-gold text-cocoa-200 hover:text-white transition-all z-10 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Main Content Grid inside modal */}
                <div id="modal-container-grid" className="grid grid-cols-1 md:grid-cols-12">
                  
                  {/* Left Column: Product Photo & Nutrition tags */}
                  <div id="modal-left-visuals" className="md:col-span-5 relative bg-cocoa-900 border-r border-cocoa-800/40 p-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-square border border-cocoa-800/80">
                        <img
                          src={selectedShake.image}
                          alt={selectedShake.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-cocoa-950 via-transparent to-transparent opacity-60"></div>
                      </div>

                      <div className="text-left">
                        <h3 className="text-2xl font-bold text-white font-display mb-1">{selectedShake.name}</h3>
                        <p className="text-xs text-luxury-gold font-semibold uppercase tracking-wider">{selectedShake.category} Division</p>
                      </div>

                      <p className="text-xs text-cocoa-300 leading-relaxed font-sans text-left font-light border-t border-cocoa-800/60 pt-3">
                        {selectedShake.description}
                      </p>
                    </div>

                    {/* Health Indicators */}
                    <div className="mt-8 border-t border-cocoa-800/60 pt-4 space-y-2.5 text-left">
                      <div className="flex items-center gap-2.5 text-xs text-cocoa-100 font-sans font-light">
                        <Shield className="h-4 w-4 text-emerald-400 stroke-[1.8]" />
                        <span>100% Halal & Vegetarian Certified</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-cocoa-100 font-sans font-light">
                        <Apple className="h-4 w-4 text-orange-400 stroke-[1.8]" />
                        <span>Indulgence Energy: <b>{selectedShake.calories} kcal</b></span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-cocoa-100 font-sans font-light">
                        <Info className="h-4 w-4 text-luxury-gold stroke-[1.8]" />
                        <span>Allergy Advice: Contains dairy & hazelnuts</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Customisations Selectors */}
                  <div id="modal-right-selections" className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between text-left">
                    <div className="space-y-6">
                      
                      {/* Configuration: Sizes */}
                      <div className="space-y-2.5">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-luxury-gold flex items-center gap-1.5">
                          <span>1. Size Selection</span>
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { name: 'Regular', label: 'Regular', modifier: '+0' },
                            { name: 'Thick-Size', label: 'Thick Size', modifier: '+₹60' },
                            { name: 'King-Size', label: 'King Size', modifier: '+₹110' },
                          ].map((sz) => (
                            <button
                              id={`btn-sz-opt-${sz.name}`}
                              key={sz.name}
                              onClick={() => setSelectedSize(sz.name as any)}
                              className={`p-3 rounded-xl border text-center transition-all ${
                                selectedSize === sz.name
                                  ? 'bg-luxury-gold/15 border-luxury-gold text-white font-bold'
                                  : 'bg-cocoa-900 border-cocoa-800 text-cocoa-300 hover:border-cocoa-600'
                              }`}
                            >
                              <p className="text-xs">{sz.label}</p>
                              <p className="text-[10px] text-luxury-gold font-semibold mt-0.5">{sz.modifier}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Configuration: Sweetness */}
                      <div className="space-y-2.5">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-luxury-gold">2. Sweetness Sweetener</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {['Less Sugar', 'Normal', 'Extra Sweet'].map((sw) => (
                            <button
                              id={`btn-sw-opt-${sw.toLowerCase().replace(/\s+/g, '-')}`}
                              key={sw}
                              onClick={() => setSelectedSweetness(sw as any)}
                              className={`p-2.5 rounded-xl border text-xs text-center transition-all ${
                                selectedSweetness === sw
                                  ? 'bg-luxury-gold/15 border-luxury-gold text-white font-bold'
                                  : 'bg-cocoa-900 border-cocoa-800 text-cocoa-300 hover:border-cocoa-600'
                              }`}
                            >
                              {sw}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Configuration: Thickness density */}
                      <div className="space-y-2.5">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-luxury-gold">3. Texture & Thickness</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {['Thick', 'Ultra Thick', 'Spoonable'].map((tk) => (
                            <button
                              id={`btn-tk-opt-${tk.toLowerCase().replace(/\s+/g, '-')}`}
                              key={tk}
                              onClick={() => setSelectedThickness(tk as any)}
                              className={`p-2.5 rounded-xl border text-xs text-center transition-all ${
                                selectedThickness === tk
                                  ? 'bg-luxury-gold/15 border-luxury-gold text-white font-bold'
                                  : 'bg-cocoa-900 border-cocoa-800 text-cocoa-300 hover:border-cocoa-600'
                              }`}
                            >
                              {tk}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Configuration: Toppings multi-select */}
                      <div className="space-y-2.5">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-luxury-gold">4. Gourmet Accessories & Toppings</h4>
                        <div className="grid grid-cols-2 gap-2 max-h-[140px] overflow-y-auto pr-1 no-scrollbar">
                          {toppingList.map((top) => {
                            const isAdded = selectedToppings.includes(top.name);
                            return (
                              <button
                                id={`btn-top-mul-${top.name.toLowerCase().replace(/\s+/g, '-')}`}
                                key={top.name}
                                onClick={() => handleToggleTopping(top.name)}
                                className={`p-2 rounded-xl border text-left flex items-center justify-between transition-all ${
                                  isAdded
                                    ? 'bg-amber-500/10 border-amber-500/50 text-white'
                                    : 'bg-cocoa-900 border-cocoa-800/80 text-cocoa-300 hover:border-cocoa-700'
                                }`}
                              >
                                <span className="text-[11px] font-sans truncate leading-none">{top.name}</span>
                                <span className="text-[10px] text-luxury-gold font-semibold ml-2 flex-shrink-0">+₹{top.price}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                    </div>

                    {/* Action Block - Quantity & confirmation price */}
                    <div id="modal-checkout-footer" className="mt-8 pt-6 border-t border-cocoa-800/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                      {/* Quantity dial */}
                      <div className="flex items-center justify-start gap-3">
                        <span className="text-xs font-bold text-cocoa-300 uppercase tracking-wider">Qty</span>
                        <div className="flex items-center bg-cocoa-900 rounded-xl border border-cocoa-800 overflow-hidden">
                          <button
                            id="btn-qty-minus"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="px-3.5 py-2 hover:bg-cocoa-800/80 text-white font-mono font-bold leading-none"
                          >
                            -
                          </button>
                          <span className="px-4 font-mono font-bold text-white text-sm">{quantity}</span>
                          <button
                            id="btn-qty-plus"
                            onClick={() => setQuantity(quantity + 1)}
                            className="px-3.5 py-2 hover:bg-cocoa-800/80 text-white font-mono font-bold leading-none"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Total and confirm button */}
                      <div className="flex items-center gap-4 flex-grow sm:justify-end">
                        <div id="pricing-review" className="text-right">
                          <p className="text-[10px] text-cocoa-300 font-sans tracking-wide uppercase">Grand Total</p>
                          <p id="customized-grand-total" className="text-2xl font-black text-white font-display">₹{calculateCustomPrice()}</p>
                        </div>

                        <button
                          id="btn-confirm-customization-add"
                          onClick={handleConfirmAdd}
                          className="flex-grow sm:flex-none px-6 py-3.5 rounded-xl bg-gradient-to-r from-luxury-gold to-luxury-gold-dark hover:from-amber-400 hover:to-luxury-gold font-bold text-xs uppercase tracking-widest text-cocoa-950 flex items-center justify-center gap-2 shadow-lg shadow-luxury-gold/20 cursor-pointer"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Load Glass
                        </button>
                      </div>

                    </div>

                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
