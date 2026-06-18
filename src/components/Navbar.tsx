import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Flame, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenBuilder: () => void;
}

export default function Navbar({ cartCount, onOpenCart, onOpenBuilder }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About MA', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Shake Builder', href: '#builder', highlight: true },
    { name: 'Why MA', href: '#why-ma' },
    { name: 'Locations', href: '#locations' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-cocoa-950/85 backdrop-blur-xl border-b border-cocoa-800/40 py-3 shadow-xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div id="navbar-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div id="navbar-inner-flex" className="flex items-center justify-between">
            {/* Logo */}
            <a
              id="navbar-logo-link"
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo('#home');
              }}
              className="flex items-center gap-2 group"
            >
              <div id="logo-icon-container" className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-luxury-gold to-cocoa-500 shadow-md transform group-hover:rotate-12 transition-transform duration-300">
                <Flame id="logo-icon" className="h-5 w-5 text-cocoa-950 stroke-[2.5]" />
                <span id="logo-badge" className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span id="logo-badge-ping" className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span id="logo-badge-solid" className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
              </div>
              <div id="logo-text-container" className="flex flex-col">
                <span id="logo-title" className="text-2xl font-black font-display tracking-wider text-cream flex items-center gap-1">
                  MA <span id="logo-subtitle" className="text-luxury-gold text-xs font-semibold tracking-widest font-sans">SHAKES</span>
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav id="desktop-nav" className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => (
                <a
                  id={`nav-item-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.href === '#builder') {
                      onOpenBuilder();
                      handleScrollTo('#builder');
                    } else {
                      handleScrollTo(item.href);
                    }
                  }}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-350 relative group ${
                    item.highlight
                      ? 'text-luxury-gold bg-luxury-gold/10 hover:bg-luxury-gold/25 font-semibold flex items-center gap-1 border border-luxury-gold/20'
                      : 'text-cocoa-100 hover:text-white hover:bg-cocoa-900/40'
                  }`}
                >
                  {item.highlight && <Sparkles id={`sparkles-nav-${item.name}`} className="h-3.5 w-3.5 text-luxury-gold animate-pulse" />}
                  {item.name}
                  {/* Elegant underline hover */}
                  {!item.highlight && (
                    <span id={`nav-underline-${item.name}`} className="absolute bottom-1 left-3 right-3 h-0.5 bg-luxury-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                  )}
                </a>
              ))}
            </nav>

            {/* Actions (Cart & Order Status) */}
            <div id="navbar-actions-group" className="flex items-center gap-2">
              <button
                id="btn-navbar-builder-cta"
                onClick={() => {
                  onOpenBuilder();
                  handleScrollTo('#builder');
                }}
                className="hidden md:flex items-center gap-2 bg-gradient-to-r from-cocoa-800 to-cocoa-900 hover:from-luxury-gold hover:to-luxury-gold-dark text-cream hover:text-cocoa-950 border border-cocoa-500/20 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider shadow-lg transition-all duration-300"
              >
                Assemble Shake
              </button>

              <button
                id="btn-navbar-cart-toggle"
                onClick={onOpenCart}
                className="relative p-2.5 rounded-xl bg-cocoa-900/60 hover:bg-cocoa-800 border border-cocoa-800 text-cocoa-100 hover:text-white transition-all cursor-pointer group"
                aria-label="Toggle Cart"
              >
                <ShoppingBag id="navbar-cart-icon" className="h-5 w-5 transform group-hover:scale-110 transition-transform duration-300" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      id="navbar-cart-badge animate"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-red-500 to-amber-600 text-white font-bold text-[10px] h-5 w-5 flex items-center justify-center rounded-full border-2 border-cocoa-950 font-sans shadow-md"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile menu button */}
              <button
                id="btn-mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-cocoa-900/60 text-cocoa-100 hover:text-white border border-cocoa-800"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X id="icon-mobile-menu-close" className="h-5 w-5" /> : <Menu id="icon-mobile-menu-open" className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden bg-cocoa-950/95 backdrop-blur-2xl flex flex-col justify-center px-6"
          >
            <div id="mobile-menu-nav-links" className="flex flex-col gap-5 py-20 max-w-sm mx-auto w-full text-center">
              {menuItems.map((item, index) => (
                <motion.a
                  id={`mobile-nav-item-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  key={item.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.href === '#builder') {
                      onOpenBuilder();
                      handleScrollTo('#builder');
                    } else {
                      handleScrollTo(item.href);
                    }
                  }}
                  className={`text-2xl font-semibold tracking-wide ${
                    item.highlight
                      ? 'text-luxury-gold font-bold py-3 bg-luxury-gold/5 rounded-2xl border border-luxury-gold/25 py-2 inline-flex items-center justify-center gap-2 max-w-xs mx-auto w-full'
                      : 'text-cocoa-50 hover:text-luxury-gold'
                  }`}
                >
                  {item.highlight && <Sparkles id={`mobile-sparkles-${item.name}`} className="h-5 w-5 text-luxury-gold" />}
                  {item.name}
                </motion.a>
              ))}

              <motion.button
                id="btn-mobile-menu-builder-cta"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: menuItems.length * 0.05 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBuilder();
                  handleScrollTo('#builder');
                }}
                className="mt-6 bg-gradient-to-r from-luxury-gold to-luxury-gold-dark text-cocoa-950 font-bold py-4 rounded-xl text-sm uppercase tracking-widest shadow-xl"
              >
                Assemble Custom Shake
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
