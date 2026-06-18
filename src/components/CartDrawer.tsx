import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { X, ShoppingBag, Trash2, ArrowRight, CheckCircle2, Ticket, Truck, Sparkles, Navigation } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  // Coupon state
  const [coupon, setCoupon] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // value or fraction

  // Checkout Wizard simulation states
  const [isCheckoutStage, setIsCheckoutStage] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    phone: '',
    city: 'Mumbai'
  });
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderDetails, setOrderDetails] = useState<{ id: string; status: string } | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST on F&B
  const packagingCharge = subtotal > 0 ? 30 : 0;
  const deliveryFee = subtotal > 400 || subtotal === 0 ? 0 : 50; 
  const grandTotal = subtotal > 0 ? (subtotal + tax + packagingCharge + deliveryFee - appliedDiscount) : 0;

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'THICK50') {
      setAppliedDiscount(50);
      alert('THICK50 code accepted! ₹50 deducted from dessert basket.');
    } else if (coupon.toUpperCase() === 'FIRSTMA') {
      const discounted = Math.round(subtotal * 0.15);
      setAppliedDiscount(discounted);
      alert(`WELCOME code accepted! 15% discount applied (₹${discounted} off).`);
    } else {
      alert('Invalid code. Try using "THICK50" or "FIRSTMA" for premium perks!');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingAddress.street || !shippingAddress.phone) {
      alert('Please fill out delivery coordinates.');
      return;
    }

    setIsPlacingOrder(true);
    setTimeout(() => {
      setIsPlacingOrder(false);
      setOrderDetails({
        id: `MA-${Math.floor(Math.random() * 900000) + 100000}`,
        status: 'Preparing your double-gelato mix...'
      });
      onClearCart();
    }, 2000);
  };

  const handleCloseSuccess = () => {
    setIsCheckoutStage(false);
    setOrderDetails(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark backdrop */}
          <motion.div
            id="cart-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Sided Drawer frame */}
          <motion.div
            id="cart-drawer-side-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-cocoa-950 border-l border-cocoa-800 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div id="cart-drawer-header" className="p-6 border-b border-cocoa-800/60 flex items-center justify-between text-left">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-5 w-5 text-luxury-gold stroke-[2]" />
                <h3 className="text-lg font-bold text-white font-display">Active Cup Basket</h3>
                <span className="text-xs bg-cocoa-900 border border-cocoa-800 px-2 py-0.5 rounded text-cocoa-300">
                  {cartItems.length}
                </span>
              </div>
              <button
                id="btn-cart-drawer-close"
                onClick={onClose}
                className="p-2 rounded-lg bg-cocoa-950 border border-cocoa-850 text-cocoa-300 hover:text-white transition-all cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Main scrollable block */}
            <div id="cart-drawer-main-content" className="flex-grow overflow-y-auto no-scrollbar p-6 space-y-6">
              
              <AnimatePresence mode="wait">
                {/* Stage 1: Active Order Status Tracker (Order successfully completed) */}
                {orderDetails ? (
                  <motion.div
                    key="stage-success-order"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 text-center py-8"
                  >
                    <div className="mx-auto h-16 w-16 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center animate-bounce">
                      <CheckCircle2 className="h-8 w-8 stroke-[2]" />
                    </div>

                    <div className="space-y-2 text-left">
                      <h4 className="text-xl font-bold font-display text-white text-center">In Transmission!</h4>
                      <p className="text-xs text-cocoa-250 text-center">
                        Order code: <span className="font-mono font-bold text-luxury-gold">{orderDetails.id}</span>
                      </p>
                      <p className="text-xs text-cocoa-300 text-center leading-relaxed">
                        Your custom thick shakes have been routed to the closest MA kitchen console in Ahmedabad/Mumbai. Get ready with your spoon!
                      </p>
                    </div>

                    {/* Live delivery locator visual gimmick */}
                    <div className="p-5 rounded-2xl bg-cocoa-900 border border-cocoa-800 text-left space-y-4">
                      <div className="flex items-center justify-between text-2xs">
                        <span className="text-cocoa-300 uppercase tracking-widest font-mono">DISPATCH STATUS</span>
                        <span className="text-emerald-400 uppercase tracking-widest font-mono animate-pulse">CHURN RADAR LIVE</span>
                      </div>
                      
                      <div className="flex gap-3.5 items-center">
                        <Truck className="h-5 w-5 text-luxury-gold animate-bounce" />
                        <div>
                          <p className="text-xs font-bold text-white">MA Courier active</p>
                          <p className="text-[10px] text-cocoa-300 mt-0.5 leading-none">Status: {orderDetails.status}</p>
                        </div>
                      </div>

                      {/* Moving progress slider */}
                      <div className="relative h-1.5 w-full bg-cocoa-950 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ width: ['0%', '30%', '65%', '90%'] }}
                          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-luxury-gold to-amber-500 rounded-full"
                        />
                      </div>
                    </div>

                    <button
                      id="btn-close-checkout-dashboard"
                      onClick={handleCloseSuccess}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-luxury-gold to-luxury-gold-dark hover:from-amber-400 hover:to-luxury-gold text-cocoa-950 font-black text-xs uppercase tracking-widest transition-all duration-300 shadow shadow-luxury-gold/10"
                    >
                      Understood, return to Café
                    </button>
                  </motion.div>
                ) : isCheckoutStage ? (
                  /* Stage 2: Checkout Wizard form */
                  <motion.form
                    key="stage-checkout-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleCheckoutSubmit}
                    className="space-y-5 text-left"
                  >
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-white font-display">Delivery Coordinates</h4>
                      <p className="text-2xs text-cocoa-300 font-sans">Provide dispatch destination inputs to route custom desserts</p>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4 pt-3 border-t border-cocoa-800/40">
                      
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-cocoa-300 uppercase tracking-wide">Target City Lounge</label>
                        <select
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                          className="w-full bg-cocoa-950 border border-cocoa-800 text-white rounded-xl py-3 px-4 text-xs font-light tracking-wide focus:border-luxury-gold focus:outline-none"
                        >
                          <option value="Mumbai">Mumbai Signature Lounge (Juhu)</option>
                          <option value="Ahmedabad">Ahmedabad Dessert Cafe (CG Road)</option>
                          <option value="Delhi NCR">Delhi NCR Luxury Hub (Connaught Place)</option>
                          <option value="Bangalore">Bangalore Premium Flagship (Indiranagar)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-cocoa-300 uppercase tracking-wide">Full shipping Address *</label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.street}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                          placeholder="e.g. Flat 302, Marina Apartments, Juhu"
                          className="w-full bg-cocoa-950 border border-cocoa-800 text-white rounded-xl py-3.5 px-4 text-xs font-light tracking-wide focus:border-luxury-gold focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-cocoa-300 uppercase tracking-wide">Contact dial number *</label>
                        <input
                          type="tel"
                          required
                          value={shippingAddress.phone}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                          placeholder="e.g. +91 91234 56789"
                          className="w-full bg-cocoa-950 border border-cocoa-800 text-white rounded-xl py-3.5 px-4 text-xs font-light tracking-wide focus:border-luxury-gold focus:outline-none"
                        />
                      </div>

                    </div>

                    {/* Summary list */}
                    <div className="p-4 rounded-xl bg-cocoa-900 border border-cocoa-850 space-y-2">
                      <p className="text-[10px] uppercase text-cocoa-300 tracking-wider">Checkout Total Summary</p>
                      <div className="flex justify-between text-xs text-white pt-2 border-t border-cocoa-800/40">
                        <span>Grand Cash Amount:</span>
                        <span className="font-bold text-luxury-gold">₹{grandTotal}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsCheckoutStage(false)}
                        className="flex-1 py-3 px-4 rounded-xl bg-cocoa-900 border border-cocoa-800 text-cocoa-200 text-xs font-bold uppercase hover:bg-cocoa-800"
                      >
                        Back
                      </button>

                      <button
                        type="submit"
                        disabled={isPlacingOrder}
                        className="flex-2 py-3 px-4 rounded-xl bg-gradient-to-r from-luxury-gold to-luxury-gold-dark text-cocoa-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 shadow"
                      >
                        {isPlacingOrder ? 'Routing...' : 'Confirm Cash On Delivery'}
                      </button>
                    </div>

                  </motion.form>
                ) : cartItems.length === 0 ? (
                  /* Stage 3: Empty basket state */
                  <motion.div
                    key="stage-empty-basket"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-20 text-center space-y-5"
                  >
                    <div className="h-16 w-16 rounded-full bg-cocoa-900/60 border border-cocoa-800 flex items-center justify-center text-cocoa-300">
                      <ShoppingBag className="h-7 w-7" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white font-display">Spoon Is Empty!</h4>
                      <p className="text-xs text-cocoa-300 max-w-xs mt-1 leading-relaxed">
                        There are no loaded thick shakes inside your active cup. Browse through our menu and load up with premium ingredients!
                      </p>
                    </div>
                    <button
                      id="btn-cart-empty-browse"
                      onClick={onClose}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-luxury-gold to-luxury-gold-dark hover:from-amber-400 hover:to-luxury-gold text-cocoa-950 font-black text-2xs uppercase tracking-widest transition-all cursor-pointer"
                    >
                      Explore Menu
                    </button>
                  </motion.div>
                ) : (
                  /* Stage 4: Default items list with coupons and details options */
                  <motion.div
                    key="stage-items-list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 text-left"
                  >
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div
                          id={`cart-item-row-${item.cartId}`}
                          key={item.cartId}
                          className="flex gap-3 p-3 bg-cocoa-900/40 rounded-2xl border border-cocoa-800/60 relative overflow-hidden group"
                        >
                          <div className="relative h-16 w-16 rounded-xl overflow-hidden border border-cocoa-800/80 flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="object-cover h-full w-full"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          {/* Info section */}
                          <div className="flex-grow flex flex-col justify-between text-left space-y-1">
                            <div>
                              <h4 className="text-xs font-bold text-cream font-display leading-tight">{item.name}</h4>
                              {item.customization && (
                                <p className="text-[9px] text-cocoa-300 leading-tight mt-0.5 max-w-[200px] truncate">
                                  {item.customization.size} • {item.customization.thickness} • {item.customization.selectedToppings.length} tops
                                </p>
                              )}
                            </div>

                            <p className="text-xs text-luxury-gold font-bold leading-none">
                              ₹{item.price} <span className="text-[10px] text-cocoa-300 font-light font-sans inline">x {item.quantity}</span>
                            </p>
                          </div>

                          {/* Quantities dial & delete button */}
                          <div className="flex flex-col items-end justify-between">
                            <button
                              id={`btn-cart-remove-${item.cartId}`}
                              onClick={() => onRemoveItem(item.cartId)}
                              className="text-cocoa-300 hover:text-red-400 p-1 rounded-lg hover:bg-cocoa-900 transition-all cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>

                            <div className="flex items-center bg-cocoa-950/70 border border-cocoa-850 rounded-lg overflow-hidden">
                              <button
                                id={`btn-cart-qty-sub-${item.cartId}`}
                                onClick={() => onUpdateQty(item.cartId, Math.max(1, item.quantity - 1))}
                                className="px-1.5 py-0.5 hover:bg-cocoa-900 text-cocoa-250 font-mono text-xs font-bold"
                              >
                                -
                              </button>
                              <span className="px-1.5 font-mono text-[10px] font-bold text-white leading-none">{item.quantity}</span>
                              <button
                                id={`btn-cart-qty-add-${item.cartId}`}
                                onClick={() => onUpdateQty(item.cartId, item.quantity + 1)}
                                className="px-1.5 py-0.5 hover:bg-cocoa-900 text-cocoa-250 font-mono text-xs font-bold"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Coupons segment */}
                    <div className="pt-4 border-t border-cocoa-800/40">
                      <p className="text-[10px] uppercase text-cocoa-300 font-bold tracking-wider mb-2">Discount Coupon Codes</p>
                      <div className="flex bg-cocoa-950 rounded-xl border border-cocoa-800 overflow-hidden">
                        <input
                          id="coupon-input"
                          type="text"
                          placeholder="e.g. FIRSTMA or THICK50"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                          className="flex-grow bg-transparent px-3 py-2 text-xs font-mono font-bold text-white tracking-widest focus:outline-none uppercase"
                        />
                        <button
                          id="btn-apply-coupon"
                          type="button"
                          onClick={handleApplyCoupon}
                          className="px-4 py-2 bg-cocoa-900 text-xs font-medium text-luxury-gold hover:bg-cocoa-800 border-l border-cocoa-800 transition-all cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Bottom aggregate calculations block */}
            {!orderDetails && (
              <div id="cart-drawer-aggregates-footer" className="p-6 border-t border-cocoa-800 bg-cocoa-950/90 relative z-10 text-left">
                <div className="space-y-2.5 mb-5">
                  <div className="flex justify-between text-xs text-cocoa-300">
                    <span>Recipe Subtotal:</span>
                    <span className="font-mono">₹{subtotal}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-xs text-emerald-400">
                      <span>Perks Promotion Discount:</span>
                      <span className="font-mono">-₹{appliedDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-cocoa-300">
                    <span>GST F&B taxes (5%):</span>
                    <span className="font-mono">₹{tax}</span>
                  </div>
                  <div className="flex justify-between text-xs text-cocoa-300">
                    <span>Clean Container fee:</span>
                    <span className="font-mono">₹{packagingCharge}</span>
                  </div>
                  <div className="flex justify-between text-xs text-cocoa-300">
                    <span>Aero-Delivery Dispatch fee:</span>
                    <span className="font-mono">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                  </div>
                  <div className="border-t border-cocoa-800/40 pt-2.5 flex justify-between text-sm text-cream">
                    <span className="font-bold">Ultimate aggregate Total:</span>
                    <span id="drawer-aggregate-total" className="font-black text-lg text-white font-display">₹{grandTotal}</span>
                  </div>
                </div>

                {cartItems.length > 0 && (
                  <>
                    {!isCheckoutStage ? (
                      <button
                        id="btn-cart-drawer-checkout"
                        onClick={() => setIsCheckoutStage(true)}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-luxury-gold to-luxury-gold-dark hover:from-amber-400 hover:to-luxury-gold text-cocoa-950 font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-luxury-gold/15 cursor-pointer"
                      >
                        Coordinate Dispatch Checkout
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : null}
                  </>
                )}
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
