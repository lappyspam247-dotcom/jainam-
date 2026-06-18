import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import InteractiveBuilder from './components/InteractiveBuilder';
import WhyChooseMA from './components/WhyChooseMA';
import Locations from './components/Locations';
import SignatureExperience from './components/SignatureExperience';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import ContactOrder from './components/ContactOrder';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import { CartItem, ShakeItem } from './types';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Initialize with a pre-loaded signature shake to present instant aesthetic cart visuals
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      cartId: 'preloaded-ferrero-shake',
      shakeId: 'ferrero-thick-shake',
      name: 'Ferrero Thick Shake',
      image: '/src/assets/images/ferrero_thick_shake_1781749291019.jpg',
      price: 320,
      quantity: 1,
      customization: {
        size: 'Regular',
        sweetness: 'Normal',
        thickness: 'Ultra Thick',
        selectedToppings: ['Ferrero Rocher Rochitas']
      }
    }
  ]);

  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBuilder = () => {
    handleScrollToSection('builder');
  };

  // Generic cart mutations
  const handleUpdateQty = (cartId: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item => (item.cartId === cartId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Add customized items from Menu Modal selection
  const handleAddToCart = (shake: ShakeItem, quantity: number, customOpts: any) => {
    // Generate price modifier details
    const sizePriceModifiers = {
      'Regular': 0,
      'Thick-Size': 60,
      'King-Size': 110
    };
    
    const sizePrice = sizePriceModifiers[customOpts.size as 'Regular' | 'Thick-Size' | 'King-Size'] || 0;
    const toppingsPrice = customOpts.selectedToppings.reduce((acc: number) => acc + 40, 0); // Flat ₹40 per topping modifier for generic catalog items
    const compositeUnitPrice = shake.price + sizePrice + toppingsPrice;

    // Check if duplicate item exists with IDENTICAL customizations
    const existingIndex = cartItems.findIndex(item => {
      if (item.shakeId !== shake.id) return false;
      if (!item.customization) return false;
      return (
        item.customization.size === customOpts.size &&
        item.customization.sweetness === customOpts.sweetness &&
        item.customization.thickness === customOpts.thickness &&
        JSON.stringify(item.customization.selectedToppings.sort()) === JSON.stringify(customOpts.selectedToppings.sort())
      );
    });

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      const uniqueId = `cart-row-${shake.id}-${Date.now()}`;
      const newCartItem: CartItem = {
        cartId: uniqueId,
        shakeId: shake.id,
        name: shake.name,
        image: shake.image,
        price: compositeUnitPrice,
        quantity: quantity,
        customization: customOpts
      };
      setCartItems(prev => [...prev, newCartItem]);
    }
  };

  // Add fully custom item from Interactive Builder lab workspace
  const handleAddCustomShakeToCart = (customItem: CartItem) => {
    setCartItems(prev => [...prev, customItem]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div id="ma-thickshakes-application" className="min-h-screen bg-cocoa-950 font-sans selection:bg-luxury-gold selection:text-cocoa-950 text-cocoa-50 overflow-x-hidden antialiased">
      {/* Decorative ambient top glow */}
      <div id="hdr-ambient-glow" className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-luxury-gold/10 to-transparent blur-[120px] pointer-events-none rounded-b-full"></div>

      {/* Main Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={handleOpenCart}
        onOpenBuilder={handleOpenBuilder}
      />

      {/* Hero Header Space */}
      <Hero
        onScrollToMenu={() => handleScrollToSection('menu')}
        onOpenBuilder={handleOpenBuilder}
      />

      {/* About storytelling Pillar */}
      <About />

      {/* Interactive Churn Menu */}
      <Menu onAddToCart={handleAddToCart} />

      {/* Interactive Alchemist Builder Workspace */}
      <InteractiveBuilder onAddCustomShakeToCart={handleAddCustomShakeToCart} />

      {/* Why Choose MA Trust segment */}
      <WhyChooseMA />

      {/* Outlets Locator Navigation */}
      <Locations />

      {/* Social Media Instagram Experience story block */}
      <SignatureExperience />

      {/* Masonry visual gallery collection */}
      <Gallery />

      {/* Critic Swiper Testimonial Slides */}
      <Reviews />

      {/* Conversion Banner & Custom Message dispatcher console */}
      <ContactOrder onScrollToMenu={() => handleScrollToSection('menu')} />

      {/* Footer */}
      <Footer />

      {/* Checkout cart sidebar overlays drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
