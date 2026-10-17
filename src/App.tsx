/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MessageSquare, 
  Facebook, 
  Menu, 
  X, 
  ArrowUpRight, 
  Check, 
  Calendar,
  Send,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  Clock,
  Shield,
  User,
  MapPin
} from 'lucide-react';

type Page = 'home' | 'artist' | 'portfolio' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cookieConsent, setCookieConsent] = useState(() => {
    return typeof window !== 'undefined' && localStorage.getItem('york_cookie_consent') === 'true';
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as Page;
      if (['home', 'artist', 'portfolio', 'contact'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ensure video autoplays reliably across all devices
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.play().catch((err) => {
        console.warn("Video autoplay notice:", err);
        const playOnInteraction = () => {
          if (videoRef.current) {
            videoRef.current.play().catch(console.warn);
          }
        };
        window.addEventListener('touchstart', playOnInteraction, { once: true });
        window.addEventListener('click', playOnInteraction, { once: true });
      });
    }
  }, [currentPage]);

  // 7 Real Portfolio Photographs
  const portfolioItems = [
    { 
      id: 1, 
      src: '/assets/portfolio_1.jpg', 
      title: 'Neo-Traditional Dark Sleeve', 
      category: 'Neo-Traditional', 
      placement: 'Full Arm Sleeve',
      session: 'Multiple Sessions'
    },
    { 
      id: 2, 
      src: '/assets/portfolio_2.jpg', 
      title: 'Blackwork & Fine Line Silhouette', 
      category: 'Fine Line', 
      placement: 'Forearm / Bicep',
      session: '1-2 Sessions'
    },
    { 
      id: 3, 
      src: '/assets/portfolio_3.jpg', 
      title: 'Dark Surrealism Torso Composition', 
      category: 'Dark Surrealism', 
      placement: 'Chest & Ribs',
      session: 'Multi-Day Project'
    },
    { 
      id: 4, 
      src: '/assets/portfolio_4.jpg', 
      title: 'Ornamental Precision Geometry', 
      category: 'Blackwork', 
      placement: 'Shoulder & Upper Back',
      session: 'Full Day Session'
    },
    { 
      id: 5, 
      src: '/assets/portfolio_5.jpg', 
      title: 'Deep Shadow Contrast Sleeve', 
      category: 'Sleeves', 
      placement: 'Lower Arm & Wrist',
      session: 'Custom Session'
    },
    { 
      id: 6, 
      src: '/assets/portfolio_6.jpg', 
      title: 'Mythic Inked Large-Scale Canvas', 
      category: 'Blackwork', 
      placement: 'Full Back Piece',
      session: 'Comprehensive Project'
    },
    { 
      id: 7, 
      src: '/assets/portfolio_7.jpg', 
      title: 'Studio Signature Contrast Motif', 
      category: 'Neo-Traditional', 
      placement: 'Thigh / Leg Placement',
      session: 'Detailed Day Session'
    },
  ];

  // Simple Booking Form State
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingPlacement, setBookingPlacement] = useState('Forearm / Arm');
  const [bookingStyle, setBookingStyle] = useState('Blackwork & Fine Line');
  const [bookingSize, setBookingSize] = useState('Medium (4-8 inches)');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName.trim() || !bookingPhone.trim()) return;
    setBookingSubmitted(true);
  };

  const getWhatsAppBookingLink = () => {
    const text = encodeURIComponent(
      `Hello York's Tarts! I'd like to book a session.\n\n` +
      `• Name: ${bookingName || 'Guest'}\n` +
      `• Phone/Contact: ${bookingPhone || 'Direct via WhatsApp'}\n` +
      `• Placement: ${bookingPlacement}\n` +
      `• Style: ${bookingStyle}\n` +
      `• Estimated Size: ${bookingSize}\n` +
      `• Concept Details: ${bookingNotes.trim() || 'Custom piece consultation'}`
    );
    return `https://wa.me/12172935658?text=${text}`;
  };

  // Filter state for portfolio page
  const [portfolioFilter, setPortfolioFilter] = useState('All');
  const filteredPortfolio = portfolioFilter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === portfolioFilter);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] font-sans selection:bg-red-950 selection:text-white flex flex-col justify-between">
      
      {/* 1. TOP NAVBAR (Transparent over video, sticky across pages) */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || currentPage !== 'home'
            ? 'bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-800/80 py-4 shadow-2xl' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          
          {/* Brand Wordmark with upgraded Cinzel Display Font */}
          <button 
            onClick={() => navigateTo('home')}
            className="text-lg sm:text-xl md:text-2xl font-serif font-bold tracking-[0.15em] sm:tracking-[0.2em] text-white uppercase whitespace-nowrap shrink-0 hover:text-zinc-300 transition-colors cursor-pointer text-left drop-shadow-md"
          >
            York’s Tarts
          </button>

          {/* Desktop 4-Page Navigation */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-8 text-xs uppercase tracking-[0.2em] lg:tracking-[0.25em] font-medium text-zinc-300 whitespace-nowrap shrink-0">
            <button 
              onClick={() => navigateTo('home')} 
              className={`hover:text-white transition-colors cursor-pointer relative py-1 drop-shadow ${currentPage === 'home' ? 'text-white font-semibold' : 'text-zinc-400'}`}
            >
              Home
              {currentPage === 'home' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600" />}
            </button>
            <button 
              onClick={() => navigateTo('artist')} 
              className={`hover:text-white transition-colors cursor-pointer relative py-1 drop-shadow ${currentPage === 'artist' ? 'text-white font-semibold' : 'text-zinc-400'}`}
            >
              Artist
              {currentPage === 'artist' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600" />}
            </button>
            <button 
              onClick={() => navigateTo('portfolio')} 
              className={`hover:text-white transition-colors cursor-pointer relative py-1 drop-shadow ${currentPage === 'portfolio' ? 'text-white font-semibold' : 'text-zinc-400'}`}
            >
              Portfolio
              {currentPage === 'portfolio' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600" />}
            </button>
            <button 
              onClick={() => navigateTo('contact')} 
              className={`hover:text-white transition-colors cursor-pointer relative py-1 drop-shadow ${currentPage === 'contact' ? 'text-white font-semibold' : 'text-zinc-400'}`}
            >
              Contact
              {currentPage === 'contact' && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600" />}
            </button>
          </nav>

          {/* Direct Booking CTA */}
          <div className="hidden md:flex items-center gap-4 shrink-0 whitespace-nowrap">
            <button 
              onClick={() => navigateTo('contact')}
              className="px-4 lg:px-5 py-2.5 text-xs font-semibold tracking-[0.15em] lg:tracking-[0.2em] uppercase bg-zinc-100 hover:bg-white text-zinc-950 transition-all duration-300 shadow-xl flex items-center gap-1.5 cursor-pointer"
            >
              <span>Book A Session</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-zinc-100 p-2 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#09090b]/98 backdrop-blur-2xl flex flex-col justify-center items-center md:hidden px-8"
          >
            <div className="flex flex-col items-center gap-8 text-xl font-serif tracking-widest text-zinc-200 uppercase w-full max-w-xs text-center">
              <button 
                onClick={() => navigateTo('home')} 
                className={`py-2 w-full border-b border-zinc-800 ${currentPage === 'home' ? 'text-red-500 font-bold' : 'hover:text-white'}`}
              >
                Home
              </button>
              <button 
                onClick={() => navigateTo('artist')} 
                className={`py-2 w-full border-b border-zinc-800 ${currentPage === 'artist' ? 'text-red-500 font-bold' : 'hover:text-white'}`}
              >
                Artist
              </button>
              <button 
                onClick={() => navigateTo('portfolio')} 
                className={`py-2 w-full border-b border-zinc-800 ${currentPage === 'portfolio' ? 'text-red-500 font-bold' : 'hover:text-white'}`}
              >
                Portfolio
              </button>
              <button 
                onClick={() => navigateTo('contact')} 
                className={`py-2 w-full border-b border-zinc-800 ${currentPage === 'contact' ? 'text-red-500 font-bold' : 'hover:text-white'}`}
              >
                Contact
              </button>

              <div className="pt-4 flex flex-col gap-4 w-full">
                <button
                  onClick={() => navigateTo('contact')}
                  className="w-full py-3.5 bg-zinc-100 text-zinc-950 text-xs font-mono tracking-widest uppercase transition-colors text-center font-bold"
                >
                  Book A Session
                </button>
                <a 
                  href="https://wa.me/12172935658" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white text-xs font-mono tracking-widest uppercase transition-colors text-center"
                >
                  WhatsApp: +1 217-293-5658
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN BODY PAGES */}
      <main className="flex-grow">
        {/* Breadcrumbs Navigation */}
        {currentPage !== 'home' && (
          <div className="max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-4 text-xs font-mono tracking-widest text-zinc-400 flex items-center gap-2">
            <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors cursor-pointer">HOME</button>
            <span>/</span>
            <span className="text-white uppercase">{currentPage}</span>
          </div>
        )}
        
        {/* ========================================================
            PAGE 1: HOME
           ======================================================== */}
        {currentPage === 'home' && (
          <div>
            {/* 
              CINEMATIC VIDEO HERO 
              Using exact required structure:
              - Fixed-height parent container: height: 100vh; min-height: 680px; position: relative; overflow: hidden;
              - Video tag uses 'position: absolute; z-index: -1;'
              - Renders seamlessly behind navbar and hero text content across all devices
            */}
            <section 
              style={{
                position: 'relative',
                height: '100vh',
                minHeight: '680px',
                overflow: 'hidden',
                isolation: 'isolate',
                background: 'transparent'
              }}
              className="w-full flex items-center justify-center"
            >
              {/* Mandatory Pure Inking Video Tag with 'position: absolute; z-index: -1;' */}
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onLoadedData={() => {
                  if (videoRef.current) {
                    videoRef.current.play().catch(console.warn);
                  }
                }}
                style={{
                  position: 'absolute',
                  zIndex: -1,
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                className="filter brightness-90 contrast-115 pointer-events-none"
              >
                <source src="/assets/tattoo_hero.mp4" type="video/mp4" />
              </video>

              {/* Scrim Overlay behind content, in front of video */}
              <div 
                style={{
                  position: 'absolute',
                  zIndex: -1,
                  inset: 0,
                  pointerEvents: 'none',
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 45%, rgba(9,9,11,0.85) 100%)'
                }} 
              />

              {/* Hero Text Content (relative z-10) */}
              <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-bold tracking-tight text-white uppercase mb-6 leading-[1.05] drop-shadow-2xl">
                    York’s Tarts
                  </h1>
                  
                  {/* Clean Headline */}
                  <p className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-zinc-100 tracking-wide mb-8 drop-shadow-lg">
                    “INK THAT SPEAKS. ART THAT LASTS.”
                  </p>

                  <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-zinc-300 mb-10 drop-shadow">
                    Call / Text: <a href="tel:+19296183722" className="text-white hover:text-red-400 underline underline-offset-4 font-semibold">+1 929-618-3722</a>
                  </p>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
                    <button 
                      onClick={() => navigateTo('contact')}
                      className="w-full sm:w-auto px-8 py-4 bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-2xl flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>Book A Session</span>
                      <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                    
                    <button 
                      onClick={() => navigateTo('portfolio')}
                      className="w-full sm:w-auto px-8 py-4 bg-black/60 hover:bg-white/10 text-zinc-100 border border-zinc-600 hover:border-zinc-300 font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>View The Artwork</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Scroll prompt */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-zinc-400">
                <span className="text-[10px] tracking-[0.3em] uppercase">Scroll Down</span>
                <div className="w-[1px] h-8 bg-gradient-to-b from-zinc-300 to-transparent animate-pulse" />
              </div>
            </section>

            {/* Thin Horizontal Divider */}
            <div className="w-full border-t border-zinc-800" />

            {/* 2. THE ARTIST BEHIND THE NEEDLE (Immediately under hero header) */}
            <section className="py-24 md:py-32 bg-[#09090b]">
              <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div className="lg:col-span-5 aspect-[4/5] overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl relative group">
                  <img 
                    src="/assets/artist.jpg" 
                    alt="York’s Tarts Artist" 
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                    <span>Resident Tattoo Master</span>
                    <span className="text-red-500">Official Portrait</span>
                  </div>
                </div>
                
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <span className="text-xs font-mono tracking-[0.3em] uppercase text-red-500 mb-3 block font-semibold">
                    The Artist Behind The Needle
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-serif text-white uppercase tracking-tight mb-6 leading-tight">
                    “Every line has a purpose.<br />
                    <span className="text-zinc-400 italic">Every piece tells a story.</span>”
                  </h2>
                  <p className="text-zinc-300 font-light leading-relaxed mb-8 max-w-xl text-base md:text-lg">
                    Dedicated to fine contrast, anatomical flow, and uncompromising execution. Discover the vision, process, and creative discipline behind York’s Tarts.
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <button 
                      onClick={() => navigateTo('artist')}
                      className="px-8 py-4 bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-bold font-mono uppercase tracking-[0.2em] cursor-pointer transition-all shadow-xl flex items-center gap-2"
                    >
                      <span>Meet The Artist</span>
                      <ArrowUpRight size={14} />
                    </button>
                    <a 
                      href="https://www.facebook.com/profile.php?id=61595573542894" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-8 py-4 border border-zinc-700 hover:border-zinc-300 text-zinc-200 hover:text-white text-xs font-mono uppercase tracking-[0.2em] transition-all flex items-center gap-2"
                    >
                      <span>Official Facebook</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Thin Horizontal Divider */}
            <div className="w-full border-t border-zinc-800" />

            {/* 3. STUDIO PHILOSOPHY STRIP */}
            <section className="py-24 bg-[#0c0c0e]">
              <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                  <div className="border-l border-zinc-800 pl-6">
                    <h3 className="text-sm font-mono uppercase tracking-widest text-red-500 mb-2">01. Bespoke Conception</h3>
                    <p className="text-zinc-300 font-light text-sm leading-relaxed">
                      Every piece is drafted specifically to compliment your unique body geometry and anatomical movement. No generic flash templates.
                    </p>
                  </div>
                  <div className="border-l border-zinc-800 pl-6">
                    <h3 className="text-sm font-mono uppercase tracking-widest text-red-500 mb-2">02. Sterile Precision</h3>
                    <p className="text-zinc-300 font-light text-sm leading-relaxed">
                      Strict hospital-grade sterilization protocols, single-use needle cartridges, and premium medical barrier wraps throughout every session.
                    </p>
                  </div>
                  <div className="border-l border-zinc-800 pl-6">
                    <h3 className="text-sm font-mono uppercase tracking-widest text-red-500 mb-2">03. Enduring Pigment</h3>
                    <p className="text-zinc-300 font-light text-sm leading-relaxed">
                      Formulated with high-grade carbon and intense pigment blends engineered to heal deep, stay crisp, and resist blur over decades.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Thin Horizontal Divider */}
            <div className="w-full border-t border-zinc-800" />

            {/* 4. FEATURED WORK TEASER */}
            <section className="py-24 bg-[#09090b]">
              <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                  <div>
                    <span className="text-xs font-mono tracking-[0.3em] uppercase text-zinc-500 mb-2 block">
                      Curated Works
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-serif text-white uppercase tracking-tight">
                      Selected Inked Pieces
                    </h2>
                  </div>
                  <button 
                    onClick={() => navigateTo('portfolio')}
                    className="text-xs font-mono tracking-widest uppercase text-zinc-300 hover:text-white flex items-center gap-2 group cursor-pointer"
                  >
                    <span>Explore All 7 Pieces</span>
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {portfolioItems.slice(0, 3).map((item) => (
                    <div 
                      key={item.id} 
                      className="group relative overflow-hidden bg-zinc-900 border border-zinc-800 aspect-[4/5]"
                    >
                      <img 
                        src={item.src} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                      <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <span className="text-[11px] font-mono tracking-widest text-red-500 uppercase mb-1">
                          {item.category}
                        </span>
                        <h4 className="text-base font-serif text-white mb-2">{item.title}</h4>
                        <a 
                          href={`https://wa.me/12172935658?text=Hello%20York's%20Tarts,%20I'm%20inquiring%20about%20the%20${encodeURIComponent(item.title)}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-zinc-400 hover:text-white font-mono flex items-center gap-1.5"
                        >
                          <span>Inquire via WhatsApp</span>
                          <ArrowUpRight size={12} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Thin Horizontal Divider */}
            <div className="w-full border-t border-zinc-800" />

            {/* 5. FULL PROFESSIONAL BOOKING FORM (AT THE LAST OF THE HOME PAGE) */}
            <section className="py-24 bg-[#0c0c0e]">
              <div className="max-w-5xl mx-auto px-6 md:px-12">
                <div className="bg-[#121217] border border-zinc-800 p-8 md:p-14 shadow-2xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-zinc-800 gap-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-[0.25em] text-red-500 mb-1 block">
                        Official Studio Appointments
                      </span>
                      <h2 className="text-2xl sm:text-4xl font-serif text-white uppercase tracking-tight">
                        Reserve Your Inking Date
                      </h2>
                    </div>
                    <div className="text-xs font-mono text-zinc-400 flex flex-col md:items-end">
                      <span>Call / Text: <a href="tel:+19296183722" className="text-zinc-200 underline">+1 929-618-3722</a></span>
                    </div>
                  </div>

                  {bookingSubmitted ? (
                    <div className="p-8 bg-black/60 border border-green-800/60 text-center">
                      <div className="w-12 h-12 bg-green-950 border border-green-700 mx-auto flex items-center justify-center text-green-400 mb-4">
                        <Check size={24} />
                      </div>
                      <h3 className="text-xl font-serif text-white uppercase mb-2">Request Ready!</h3>
                      <p className="text-sm text-zinc-300 mb-6 max-w-md mx-auto">
                        Thank you, {bookingName}. Click below to transmit your project details directly to York’s Tarts WhatsApp to lock in your preferred session time.
                      </p>
                      <div className="flex flex-wrap justify-center gap-4">
                        <a 
                          href={getWhatsAppBookingLink()}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-mono text-xs uppercase tracking-widest transition-all"
                        >
                          Send to WhatsApp (+1 217-293-5658)
                        </a>
                        <button 
                          onClick={() => setBookingSubmitted(false)}
                          className="px-6 py-3.5 bg-zinc-800 text-zinc-300 text-xs font-mono uppercase tracking-widest cursor-pointer"
                        >
                          Edit Details
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                          Your Full Name *
                        </label>
                        <input 
                          type="text" 
                          required
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          placeholder="e.g. Alex Morgan"
                          className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                          Phone / WhatsApp Number *
                        </label>
                        <input 
                          type="tel" 
                          required
                          value={bookingPhone}
                          onChange={(e) => setBookingPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                          Placement Area
                        </label>
                        <select 
                          value={bookingPlacement}
                          onChange={(e) => setBookingPlacement(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-zinc-500"
                        >
                          <option value="Forearm / Arm">Forearm / Arm</option>
                          <option value="Full Sleeve">Full Arm Sleeve</option>
                          <option value="Chest / Ribs">Chest / Ribs</option>
                          <option value="Back Piece">Back Piece</option>
                          <option value="Leg / Calf / Thigh">Leg / Calf / Thigh</option>
                          <option value="Shoulder / Bicep">Shoulder / Bicep</option>
                          <option value="Other Area">Other Custom Area</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                          Preferred Tattoo Style
                        </label>
                        <select 
                          value={bookingStyle}
                          onChange={(e) => setBookingStyle(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-zinc-500"
                        >
                          <option value="Blackwork & Fine Line">Blackwork & Fine Line</option>
                          <option value="Dark Surrealism">Dark Surrealism</option>
                          <option value="Neo-Traditional">Neo-Traditional</option>
                          <option value="Ornamental Geometry">Ornamental Geometry</option>
                          <option value="Custom Project">Custom Project</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                          Tattoo Idea & Approximate Size
                        </label>
                        <textarea 
                          rows={3}
                          value={bookingNotes}
                          onChange={(e) => setBookingNotes(e.target.value)}
                          placeholder="Brief description of your design concept, estimated dimensions, symbolism..."
                          className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
                        />
                      </div>

                      <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                        <button 
                          type="submit"
                          className="w-full sm:w-auto px-10 py-4 bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2"
                        >
                          <Send size={16} />
                          <span>Confirm & Book Via WhatsApp</span>
                        </button>
                        <span className="text-xs font-mono text-zinc-500">
                          “DM TO BOOK YOUR SESSION!”
                        </span>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================
            PAGE 2: ARTIST
           ======================================================== */}
        {currentPage === 'artist' && (
          <div className="pt-28 pb-24 bg-[#09090b]">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              
              {/* Header */}
              <div className="mb-16 border-b border-zinc-800 pb-8">
                <span className="text-xs font-mono tracking-[0.3em] uppercase text-zinc-500 mb-2 block">
                  Studio Master & Resident Inker
                </span>
                <h1 className="text-4xl sm:text-6xl font-serif text-white uppercase tracking-tight">
                  The Artist
                </h1>
              </div>

              {/* Main Artist Showcase */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
                
                {/* Official Artist Photograph (Exact supplied image) */}
                <div className="lg:col-span-6 relative">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
                    <img 
                      src="/assets/artist.jpg" 
                      alt="York’s Tarts Artist" 
                      className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className="mt-4 p-4 bg-zinc-950 border border-zinc-900 text-xs font-mono text-zinc-400 flex items-center justify-between">
                    <span>York’s Tarts Resident Artist</span>
                    <span className="text-red-500">Official Portrait</span>
                  </div>
                </div>

                {/* Editorial Bio & Philosophy */}
                <div className="lg:col-span-6 flex flex-col justify-center">
                  <h2 className="text-2xl sm:text-4xl font-serif text-zinc-100 uppercase leading-snug mb-6">
                    “Every line has a purpose.<br />
                    <span className="text-zinc-400 italic">Every piece tells a story.</span>”
                  </h2>

                  <p className="text-zinc-300 font-light text-base leading-relaxed mb-6">
                    Tattooing at York’s Tarts is an intimate collision of anatomical balance and meticulous ink application. Founded on the principle of permanent artistic resonance, each session is approached as a lasting collaboration between client and craftsman.
                  </p>

                  <p className="text-zinc-400 font-light text-sm leading-relaxed mb-8">
                    Specializing in bold blackwork, delicate fine line nuances, and high-impact custom compositions, the work prioritizes clean skin healing, rich black saturations, and silhouettes that move harmoniously with the human body.
                  </p>

                  {/* Core Artistic Disciplines */}
                  <div className="space-y-4 mb-10">
                    <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">
                      Primary Disciplines
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 bg-zinc-900/60 border border-zinc-800">
                        <h4 className="text-sm font-serif text-zinc-200 mb-1">Dark Surrealism</h4>
                        <p className="text-xs text-zinc-400 font-light">Deep shadows, mythic elements, and intense black saturation.</p>
                      </div>
                      <div className="p-4 bg-zinc-900/60 border border-zinc-800">
                        <h4 className="text-sm font-serif text-zinc-200 mb-1">Precision Fine Line</h4>
                        <p className="text-xs text-zinc-400 font-light">Micro-needle detailing, crisp geometric lines, and subtle stippling.</p>
                      </div>
                      <div className="p-4 bg-zinc-900/60 border border-zinc-800">
                        <h4 className="text-sm font-serif text-zinc-200 mb-1">Heavy Blackwork</h4>
                        <p className="text-xs text-zinc-400 font-light">Solid black fills, bold negative space, and commanding flow.</p>
                      </div>
                      <div className="p-4 bg-zinc-900/60 border border-zinc-800">
                        <h4 className="text-sm font-serif text-zinc-200 mb-1">Full Sleeves & Torso</h4>
                        <p className="text-xs text-zinc-400 font-light">Expansive anatomical body suits, sleeves, and back murals.</p>
                      </div>
                    </div>
                  </div>

                  {/* Direct Consultation Link */}
                  <div className="p-6 bg-zinc-950 border border-zinc-800">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                      Ready to Discuss Your Project?
                    </h4>
                    <p className="text-xs text-zinc-400 mb-4">
                      Send your concept directly to the artist on WhatsApp for placement evaluation and time estimates.
                    </p>
                    <a 
                      href="https://wa.me/12172935658" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs tracking-widest uppercase transition-colors"
                    >
                      <span>Consult With The Artist</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>

                </div>

              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            PAGE 3: PORTFOLIO (NO POPUPS / NO LIGHTBOXES)
           ======================================================== */}
        {currentPage === 'portfolio' && (
          <div className="pt-28 pb-24 bg-[#09090b]">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-zinc-800 pb-8 gap-4">
                <div>
                  <span className="text-xs font-mono tracking-[0.3em] uppercase text-zinc-500 mb-2 block">
                    Permanent Gallery
                  </span>
                  <h1 className="text-4xl sm:text-6xl font-serif text-white uppercase tracking-tight">
                    Selected Work
                  </h1>
                </div>
                <p className="text-zinc-400 font-serif italic text-lg max-w-sm">
                  “Custom ink. Individual stories.”
                </p>
              </div>

              {/* Style Filter Bar */}
              <div className="flex flex-wrap items-center gap-2 mb-12">
                <span className="text-xs font-mono uppercase text-zinc-500 mr-2 flex items-center gap-1">
                  <SlidersHorizontal size={14} /> Style Filter:
                </span>
                {['All', 'Neo-Traditional', 'Fine Line', 'Blackwork', 'Dark Surrealism', 'Sleeves'].map((style) => (
                  <button
                    key={style}
                    onClick={() => setPortfolioFilter(style)}
                    className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      portfolioFilter === style 
                        ? 'bg-zinc-100 text-zinc-950 font-bold' 
                        : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>

              {/* Gallery Grid (NO LIGHTBOX, NO POPUP EVER - All details on page) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPortfolio.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-[#0f0f13] border border-zinc-800 overflow-hidden flex flex-col group"
                  >
                    <div className="aspect-[4/5] relative overflow-hidden bg-black">
                      <img 
                        src={item.src} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md text-[10px] font-mono tracking-widest text-red-400 uppercase border border-zinc-800">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-lg font-serif text-white mb-2">{item.title}</h3>
                        <div className="space-y-1 text-xs font-mono text-zinc-400 mb-6">
                          <p><span className="text-zinc-600">Placement:</span> {item.placement}</p>
                          <p><span className="text-zinc-600">Session Type:</span> {item.session}</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-zinc-500 uppercase">Piece #0{item.id}</span>
                        <a 
                          href={`https://wa.me/12172935658?text=Hello%20York's%20Tarts,%20I'm%20interested%20in%20a%20tattoo%20similar%20to%20Piece%20%230${item.id}%20(${encodeURIComponent(item.title)})`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs font-semibold uppercase tracking-wider text-zinc-200 hover:text-white flex items-center gap-1 group/btn"
                        >
                          <span>Inquire On WhatsApp</span>
                          <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform text-red-500" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* ========================================================
            PAGE 4: CONTACT & BOOKING
           ======================================================== */}
        {currentPage === 'contact' && (
          <div className="pt-28 pb-24 bg-[#09090b]">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
              
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs font-mono tracking-[0.3em] uppercase text-zinc-500 mb-3 block">
                  Booking & Consultations
                </span>
                <h1 className="text-4xl sm:text-6xl font-serif text-white uppercase tracking-tight mb-4">
                  Your Next Piece Starts Here.
                </h1>
                <p className="text-zinc-400 font-light text-base md:text-lg">
                  “Have an idea in mind? Get in touch to discuss your next tattoo.”
                </p>
              </div>

              {/* 3 Main Direct Contact Channels */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                
                {/* Call / Text */}
                <a 
                  href="tel:+19296183722" 
                  className="p-8 bg-zinc-900/60 border border-zinc-800 hover:border-zinc-500 transition-all flex flex-col items-center text-center group"
                >
                  <div className="w-14 h-14 bg-zinc-800 flex items-center justify-center text-zinc-200 mb-4 group-hover:bg-zinc-700 group-hover:text-white transition-colors">
                    <Phone size={24} />
                  </div>
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-2">
                    Call / Text
                  </h3>
                  <p className="text-zinc-100 font-mono text-base font-semibold tracking-wider mb-2">
                    +1 929-618-3722
                  </p>
                  <span className="text-xs text-red-500 font-mono">Direct Voice & SMS</span>
                </a>

                {/* WhatsApp */}
                <a 
                  href="https://wa.me/12172935658" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-8 bg-zinc-900/60 border border-zinc-800 hover:border-zinc-500 transition-all flex flex-col items-center text-center group"
                >
                  <div className="w-14 h-14 bg-zinc-800 flex items-center justify-center text-zinc-200 mb-4 group-hover:bg-zinc-700 group-hover:text-white transition-colors">
                    <MessageSquare size={24} />
                  </div>
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-2">
                    WhatsApp
                  </h3>
                  <p className="text-zinc-100 font-mono text-base font-semibold tracking-wider mb-2">
                    +1 217-293-5658
                  </p>
                  <span className="text-xs text-green-500 font-mono">Fastest DM Response</span>
                </a>

                {/* Facebook */}
                <a 
                  href="https://www.facebook.com/profile.php?id=61595573542894" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-8 bg-zinc-900/60 border border-zinc-800 hover:border-zinc-500 transition-all flex flex-col items-center text-center group"
                >
                  <div className="w-14 h-14 bg-zinc-800 flex items-center justify-center text-zinc-200 mb-4 group-hover:bg-zinc-700 group-hover:text-white transition-colors">
                    <Facebook size={24} />
                  </div>
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 mb-2">
                    Official Facebook
                  </h3>
                  <p className="text-zinc-100 font-mono text-base font-semibold tracking-wider mb-2">
                    York’s Tarts
                  </p>
                  <span className="text-xs text-blue-400 font-mono">View Updates & Message</span>
                </a>

              </div>

              {/* Primary Booking Message Banner */}
              <div className="p-8 bg-zinc-950 border border-zinc-800 text-center mb-16">
                <h3 className="text-2xl sm:text-3xl font-serif uppercase tracking-widest text-white mb-2">
                  “DM TO BOOK YOUR SESSION!”
                </h3>
                <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                  Walk-ins subject to availability · Custom works require advance consultation
                </p>
              </div>

              {/* SIMPLE EMBEDDED BOOKING FOAM (On-page, zero popups) */}
              <div className="bg-[#121217] border border-zinc-800 p-8 md:p-12 mb-16 shadow-2xl">
                <div className="max-w-2xl mx-auto">
                  <div className="text-center mb-8">
                    <span className="text-xs font-mono text-red-500 tracking-widest uppercase block mb-1">
                      Online Form
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif text-white uppercase">
                      Simple Booking Foam
                    </h2>
                    <p className="text-xs font-mono text-zinc-400 mt-2">
                      Fill out your project details below to reserve your slot or request a consultation quote.
                    </p>
                  </div>

                  {bookingSubmitted ? (
                    <div className="p-8 bg-black/60 border border-green-800/60 text-center">
                      <div className="w-12 h-12 bg-green-950 border border-green-700 mx-auto flex items-center justify-center text-green-400 mb-4">
                        <Check size={24} />
                      </div>
                      <h3 className="text-xl font-serif text-white uppercase mb-2">Request Ready!</h3>
                      <p className="text-sm text-zinc-300 mb-6">
                        Thank you, {bookingName}. Your booking details are ready. Click below to submit directly to WhatsApp for immediate consultation.
                      </p>
                      <div className="flex flex-wrap justify-center gap-4">
                        <a 
                          href={getWhatsAppBookingLink()}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-mono text-xs uppercase tracking-widest transition-all"
                        >
                          Send to WhatsApp (+1 217-293-5658)
                        </a>
                        <button 
                          onClick={() => setBookingSubmitted(false)}
                          className="px-6 py-3.5 bg-zinc-800 text-zinc-300 text-xs font-mono uppercase tracking-widest"
                        >
                          Edit Details
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleBookingSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                            Full Name *
                          </label>
                          <input 
                            type="text" 
                            required
                            value={bookingName}
                            onChange={(e) => setBookingName(e.target.value)}
                            placeholder="Your Name"
                            className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                            Phone / WhatsApp *
                          </label>
                          <input 
                            type="tel" 
                            required
                            value={bookingPhone}
                            onChange={(e) => setBookingPhone(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                            Placement Area
                          </label>
                          <select 
                            value={bookingPlacement}
                            onChange={(e) => setBookingPlacement(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-zinc-500"
                          >
                            <option value="Forearm / Arm">Forearm / Arm</option>
                            <option value="Full Sleeve">Full Sleeve</option>
                            <option value="Chest / Ribs">Chest / Ribs</option>
                            <option value="Back Piece">Back Piece</option>
                            <option value="Leg / Calf / Thigh">Leg / Calf / Thigh</option>
                            <option value="Shoulder / Bicep">Shoulder / Bicep</option>
                            <option value="Other Area">Other Area</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                            Style
                          </label>
                          <select 
                            value={bookingStyle}
                            onChange={(e) => setBookingStyle(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-zinc-500"
                          >
                            <option value="Blackwork & Fine Line">Blackwork & Fine Line</option>
                            <option value="Dark Surrealism">Dark Surrealism</option>
                            <option value="Neo-Traditional">Neo-Traditional</option>
                            <option value="Ornamental Geometry">Ornamental Geometry</option>
                            <option value="Custom Project">Custom Project</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                            Estimated Size
                          </label>
                          <select 
                            value={bookingSize}
                            onChange={(e) => setBookingSize(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-zinc-500"
                          >
                            <option value="Small (2-4 inches)">Small (2-4 inches)</option>
                            <option value="Medium (4-8 inches)">Medium (4-8 inches)</option>
                            <option value="Large (Half Day+)">Large (Half Day+)</option>
                            <option value="Full Day / Multi-Day">Full Day / Multi-Day</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                          Idea Description & Reference Details
                        </label>
                        <textarea 
                          rows={3}
                          value={bookingNotes}
                          onChange={(e) => setBookingNotes(e.target.value)}
                          placeholder="Describe your design concept, any specific imagery or symbolism you'd like included..."
                          className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
                        />
                      </div>

                      <div className="pt-2">
                        <button 
                          type="submit"
                          className="w-full py-4 bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-xs uppercase tracking-[0.25em] transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2"
                        >
                          <Send size={16} />
                          <span>Submit Booking Request</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="py-12 bg-black border-t border-zinc-900 text-zinc-500 text-xs tracking-widest uppercase">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <p>© {new Date().getFullYear()} York’s Tarts. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <button onClick={() => navigateTo('home')} className="hover:text-zinc-300 transition-colors cursor-pointer">Home</button>
            <button onClick={() => navigateTo('artist')} className="hover:text-zinc-300 transition-colors cursor-pointer">Artist</button>
            <button onClick={() => navigateTo('portfolio')} className="hover:text-zinc-300 transition-colors cursor-pointer">Portfolio</button>
            <button onClick={() => navigateTo('contact')} className="hover:text-zinc-300 transition-colors cursor-pointer">Contact</button>
            <a href="https://www.facebook.com/profile.php?id=61595573542894" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">Facebook</a>
            <a href="https://wa.me/12172935658" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">WhatsApp</a>
          </div>
        </div>
      </footer>

      {/* Cookie Consent Banner */}
      {!cookieConsent && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#121217] border-t border-zinc-800 p-4 md:p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-300 font-mono text-center md:text-left max-w-3xl">
            We use cookies and analytics to enhance your experience and secure our studio booking sessions. By continuing to browse, you agree to our privacy standards.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                localStorage.setItem('york_cookie_consent', 'true');
                setCookieConsent(true);
              }}
              className="px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-mono text-xs uppercase tracking-widest font-bold transition-all cursor-pointer"
            >
              Accept Cookies
            </button>
            <button
              onClick={() => {
                localStorage.setItem('york_cookie_consent', 'true');
                setCookieConsent(true);
              }}
              className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono text-xs uppercase tracking-widest transition-all cursor-pointer"
            >
              Decline
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
