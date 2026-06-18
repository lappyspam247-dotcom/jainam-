import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Youtube, Flame, CheckCircle, ArrowRight, Truck } from 'lucide-react';

interface ContactOrderProps {
  onScrollToMenu: () => void;
}

export default function ContactOrder({ onScrollToMenu }: ContactOrderProps) {
  // Simple form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill out all required fields.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-cocoa-950 to-cocoa-950 text-left"
    >
      <div id="contact-radial-glow" className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div id="contact-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Banner CTA block */}
        <div className="bg-gradient-to-r from-cocoa-900 to-cocoa-950 rounded-3xl border border-cocoa-800 p-8 sm:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-2xl text-left">
            <h2 className="text-3xl sm:text-4.5xl font-extrabold font-display leading-tight text-white">
              Bring Happiness, One Thick Shake At A Time.
            </h2>
            <p className="text-cocoa-200 text-sm sm:text-base font-sans font-light">
              Ready to experience the thickest, richest, most delicious shakes? Skip the queue, customize your cup online, and pick it up hot as a cool breeze!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto">
            <button
              id="btn-bottom-order-now"
              onClick={onScrollToMenu}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-luxury-gold to-luxury-gold-dark text-cocoa-950 font-black tracking-wider text-xs uppercase shadow-lg shadow-luxury-gold/15 hover:scale-[1.02] active:scale-95 transition-all text-center cursor-pointer flex items-center justify-center gap-2"
            >
              Order Online Now
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              id="btn-bottom-contact-us"
              href="#contact-form-anchor"
              className="px-8 py-4 rounded-xl bg-cocoa-950 border border-cocoa-800 hover:border-luxury-gold text-white text-center font-bold tracking-wider text-xs uppercase shadow-md hover:scale-[1.02] transition-all"
            >
              Contact HQ
            </a>
          </div>
        </div>

        {/* Info & Form Split grid */}
        <div id="contact-form-anchor" className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-cocoa-800/40">
          
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4 text-left">
              <span className="text-xs uppercase font-extrabold tracking-widest text-luxury-gold">MA HEATER QUARTERS</span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-cream leading-tight">Get In Touch</h3>
              <p className="text-xs text-cocoa-300 leading-relaxed font-sans font-light">
                Have questions about franchise placements, special birthday caterings, or feedback on your latest thick shake cup? Drop us a transmission and our dessert dispatch crew will answer within 24 standard hours.
              </p>
            </div>

            {/* Address points list */}
            <div className="space-y-5 text-left">
              <div className="flex gap-4 items-center">
                <div className="h-10 w-10 flex items-center justify-center bg-cocoa-900 border border-cocoa-800 text-luxury-gold rounded-xl">
                  <MapPin className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-[10px] text-cocoa-300 uppercase tracking-widest">HQ Outlet Lounge</p>
                  <p className="text-xs text-white">Juhu Tara Road, Opp Juhu Beach, Mumbai</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="h-10 w-10 flex items-center justify-center bg-cocoa-900 border border-cocoa-800 text-luxury-gold rounded-xl">
                  <Phone className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-[10px] text-cocoa-300 uppercase tracking-widest">Dispatch Hotline</p>
                  <a href="tel:+919876543210" className="text-xs text-white hover:text-luxury-gold">+91 98765 43210</a>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="h-10 w-10 flex items-center justify-center bg-cocoa-900 border border-cocoa-800 text-luxury-gold rounded-xl">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-[10px] text-cocoa-300 uppercase tracking-widest">Electronic Mail</p>
                  <a href="mailto:orders@mashakes.in" className="text-xs text-white hover:text-luxury-gold">orders@mashakes.in</a>
                </div>
              </div>
            </div>

            {/* Social connection handles */}
            <div className="space-y-3 pt-4 border-t border-cocoa-800/10 text-left">
              <p className="text-xs font-semibold text-cream">Vibe With The Community</p>
              <div className="flex gap-3">
                {[
                  { icon: <Instagram className="h-4.5 w-4.5" />, href: 'https://instagram.com/mashakes', label: 'Instagram' },
                  { icon: <Facebook className="h-4.5 w-4.5" />, href: 'https://facebook.com/mashakes', label: 'Facebook' },
                  { icon: <Youtube className="h-4.5 w-4.5" />, href: 'https://youtube.com/mashakes', label: 'YouTube' }
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-cocoa-900 border border-cocoa-800 text-cocoa-200 hover:text-luxury-gold hover:border-luxury-gold hover:scale-105 transition-all text-center flex items-center justify-center"
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Right form input column */}
          <div className="lg:col-span-7 bg-cocoa-900/40 border border-cocoa-800 rounded-3xl p-6 sm:p-8 relative">
            
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleFormSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Name input */}
                    <div className="space-y-2">
                      <label id="lbl-input-name" className="text-[11px] font-bold text-cocoa-300 uppercase tracking-wider">Your Full Name *</label>
                      <input
                        id="form-input-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. Vikram Aditya"
                        className="w-full bg-cocoa-950 border border-cocoa-800 text-white rounded-xl py-3.5 px-4 text-xs font-light tracking-wide focus:border-luxury-gold focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Email input */}
                    <div className="space-y-2">
                      <label id="lbl-input-email" className="text-[11px] font-bold text-cocoa-300 uppercase tracking-wider">Your Email Address *</label>
                      <input
                        id="form-input-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. vikram@gmail.com"
                        className="w-full bg-cocoa-950 border border-cocoa-800 text-white rounded-xl py-3.5 px-4 text-xs font-light tracking-wide focus:border-luxury-gold focus:outline-none transition-colors"
                      />
                    </div>

                  </div>

                  {/* Phone input */}
                  <div className="space-y-2">
                    <label id="lbl-input-phone" className="text-[11px] font-bold text-cocoa-300 uppercase tracking-wider">Phone contact Number *</label>
                    <input
                      id="form-input-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-cocoa-950 border border-cocoa-800 text-white rounded-xl py-3.5 px-4 text-xs font-light tracking-wide focus:border-luxury-gold focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Message box */}
                  <div className="space-y-2">
                    <label id="lbl-input-message" className="text-[11px] font-bold text-cocoa-300 uppercase tracking-wider">Describe Your Inquiry</label>
                    <textarea
                      id="form-input-message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Franchise query, birthday request, flavor advice..."
                      className="w-full bg-cocoa-950 border border-cocoa-800 text-white rounded-xl py-3.5 px-4 text-xs font-light tracking-wide focus:border-luxury-gold focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submission CTA */}
                  <button
                    id="btn-contact-form-submit"
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-luxury-gold to-luxury-gold-dark hover:from-amber-400 hover:to-luxury-gold text-cocoa-950 font-black py-4 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-luxury-gold/10 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Flame className="h-4 w-4 animate-spin text-cocoa-950" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5 fill-cocoa-950 stroke-none" />
                        Transmit Message To MA HQ
                      </>
                    )}
                  </button>

                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-16 text-center space-y-6 flex flex-col items-center justify-center"
                >
                  <div className="h-16 w-16 bg-emerald-500/20 border border-emerald-500/45 rounded-full flex items-center justify-center text-emerald-400">
                    <CheckCircle className="h-8 w-8 stroke-[2.2]" />
                  </div>
                  <div className="space-y-2 max-w-sm">
                    <h4 className="text-xl font-bold font-display text-white">Transmission Successful!</h4>
                    <p className="text-xs text-cocoa-200 font-sans font-light leading-relaxed">
                      We have received your dessert telemetry report. An MA communications coordinator will hook back shortly. Keep churning!
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
