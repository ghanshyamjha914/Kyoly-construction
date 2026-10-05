import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Phone,
  ShieldCheck,
  Zap,
  Building,
  CheckCircle,
  HardHat,
  Award,
  Clock,
  Compass,
  FileText,
  MapPin,
  Sparkles,
  Users,
  Shield,
  Handshake,
  MessageCircle,
  Upload,
} from 'lucide-react';
import { HERO_SLIDES } from '../data/slidesData';
import { SERVICES_DATA } from '../data/servicesData';
import { PROJECTS_DATA } from '../data/projectsData';
import { SectionHeading } from '../components/SectionHeading';
import { EngineeringVisual } from '../components/EngineeringVisual';
import { KyolyLogo } from '../components/KyolyLogo';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';
import introLogoImg from '../assets/images/kyoly-original-logo.png';

interface HomePageProps {
  onOpenQuote: (service?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenQuote }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [customHeroVideo, setCustomHeroVideo] = useState<string | null>(() => {
    try {
      return localStorage.getItem('kyoly_custom_hero_video') || null;
    } catch {
      return null;
    }
  });

  // Auto-play hero slideshow (9s for video slide, 6s for image slides), pausing on hover
  useEffect(() => {
    if (isPaused) return;
    const slideDuration = HERO_SLIDES[currentSlide]?.isVideo ? 9000 : 6000;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, slideDuration);
    return () => clearInterval(timer);
  }, [currentSlide, isPaused]);

  // Video autoplay/pause synchronization when active slide changes
  useEffect(() => {
    if (videoRef.current) {
      if (HERO_SLIDES[currentSlide]?.isVideo) {
        videoRef.current.currentTime = 0;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Handled via muted autoplay
          });
        }
      } else {
        videoRef.current.pause();
      }
    }
  }, [currentSlide]);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setCustomHeroVideo(objectUrl);
    try {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result && typeof ev.target.result === 'string') {
          try {
            localStorage.setItem('kyoly_custom_hero_video', ev.target.result);
          } catch {
            // ignore quota limits
          }
        }
      };
      reader.readAsDataURL(file);
    } catch {
      // ignore
    }
  };

  const handleResetVideo = () => {
    setCustomHeroVideo(null);
    try {
      localStorage.removeItem('kyoly_custom_hero_video');
    } catch {
      // ignore
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const activeSlide = HERO_SLIDES[currentSlide];

  // Replaceable Clients & Partners placeholders
  const clientsAndPartners = [
    { name: 'Nepal Electricity Authority', role: 'Grid Development & Distribution', abbr: 'NEA' },
    { name: 'Dept. of Urban Development', role: 'Building Construction (DUDBC)', abbr: 'DUDBC' },
    { name: 'Department of Roads', role: 'Bridge & Infrastructure Wing', abbr: 'DoR' },
    { name: 'Independent Power Producers', role: 'Hydropower Evacuation Lines', abbr: 'IPPAN' },
    { name: 'Municipalities of Nepal', role: 'Kathmandu Valley & Janakpurdham', abbr: 'Municipal' },
    { name: 'Commercial Developers', role: 'Industrial & Retail Complexes', abbr: 'Corporate' },
  ];

  const waUrl = getWhatsAppUrl();

  return (
    <div className="bg-white">
      {/* ========================================================
          1. FULL-WIDTH PROFESSIONAL IMAGE SLIDER (CORPORATE PALETTE)
      ======================================================== */}
      <section
        className="relative bg-[#111827] text-white min-h-[660px] sm:min-h-[720px] lg:min-h-[760px] flex items-center overflow-hidden border-b border-neutral-200"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-label="Engineering Hero Slideshow"
      >
        {/* Full-Bleed Realistic Background Media with Smooth Cross-Fade */}
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
              }`}
            >
              {slide.isVideo ? (
                <video
                  ref={videoRef}
                  src={customHeroVideo || slide.videoUrl}
                  poster={slide.imageUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className={`w-full h-full object-cover transition-transform duration-10000 ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              )}
              {/* Light, Natural 20–30% Overlay - Shows Real Daylight, Vibrant Colors & Architectural Features */}
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>
          );
        })}

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
          <div className="max-w-3xl space-y-6">
            {/* Category / Division Tag with Kyoly Orange Accent */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono tracking-widest text-[#FF6B00] uppercase font-bold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
                <span>{activeSlide.tag}</span>
                <span className="text-white/40">|</span>
                <span className="text-white font-sans text-xs font-semibold">{activeSlide.badge}</span>
              </div>

              {activeSlide.isVideo && (
                <div className="flex items-center gap-1.5">
                  <label
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-black/60 hover:bg-[#FF6B00] text-white/90 hover:text-white rounded-md text-[11px] font-semibold cursor-pointer transition-colors border border-white/20 backdrop-blur-md shadow-xs select-none"
                    title="Upload or replace video file"
                  >
                    <Upload className="w-3 h-3 text-[#FF6B00]" />
                    <span>Upload / Replace Video</span>
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/ogg,video/quicktime"
                      className="hidden"
                      onChange={handleVideoUpload}
                    />
                  </label>
                  {customHeroVideo && (
                    <button
                      onClick={handleResetVideo}
                      className="px-2 py-1 bg-black/60 hover:bg-red-600 text-white/80 hover:text-white rounded-md text-[11px] font-semibold cursor-pointer transition-colors border border-white/20 backdrop-blur-md shadow-xs"
                      title="Reset to default video"
                    >
                      Reset
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Dynamic Slide Heading with Crisp Legibility */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-['Outfit'] tracking-tight leading-[1.08] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                {activeSlide.title}
              </h1>
              <p className="text-lg sm:text-2xl font-bold text-[#FF6B00] font-['Outfit'] tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
                {activeSlide.subtitle}
              </p>
            </div>

            {/* Slide Description & Key Engineering Specs */}
            <div className="space-y-4">
              <p className="text-sm sm:text-base text-white leading-relaxed max-w-2xl font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                {activeSlide.description}
              </p>

              {/* Technical Parameter Chips */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                {activeSlide.specs.map((spec, sIdx) => (
                  <div
                    key={sIdx}
                    className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-xs flex items-center gap-2 shadow-sm"
                  >
                    <span className="text-slate-300 font-mono text-[11px]">{spec.label}:</span>
                    <span className="text-white font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons: Primary (Kyoly Orange) + Secondary (Clean White) + WhatsApp */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                to={activeSlide.ctaLink}
                className="px-6 sm:px-7 py-3.5 bg-[#FF6B00] hover:bg-[#E04800] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-lg shadow-lg hover:shadow-orange-500/25 transition-all duration-200 flex items-center gap-2 group cursor-pointer"
              >
                <span>{activeSlide.ctaText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                type="button"
                onClick={() => onOpenQuote(activeSlide.title)}
                className="px-6 py-3.5 bg-white hover:bg-neutral-100 text-[#0F172A] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-lg shadow-md transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <span>{activeSlide.secondaryCtaText}</span>
              </button>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-[#25D366] hover:text-white border border-[#25D366]/40 hover:border-[#25D366] hover:bg-[#25D366] rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-2 bg-black/40 backdrop-blur-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Navigation Strip (Corporate Engineering Tabs & Controls) */}
        <div className="absolute bottom-6 left-4 sm:left-8 right-4 sm:right-8 z-20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Desktop/Tablet 5 Slide Selector Tabs */}
          <div className="hidden lg:flex items-center gap-2.5 flex-1 max-w-5xl">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = currentSlide === idx;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`flex-1 text-left p-3 rounded-xl transition-all duration-300 border cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#0F172A] border-[#FF6B00] shadow-xl'
                      : 'bg-black/50 hover:bg-black/75 text-slate-300 hover:text-white border-white/10 backdrop-blur-md'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className={isActive ? 'text-[#FF6B00] font-bold' : 'text-slate-400'}>
                      0{idx + 1}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-ping" />
                    )}
                  </div>
                  <div className="text-xs font-bold font-['Outfit'] truncate leading-tight">
                    {slide.title.split(' ')[0]} {slide.title.split(' ')[1] || ''}
                  </div>
                  <div className={`text-[10px] mt-0.5 truncate ${isActive ? 'text-slate-600' : 'text-slate-400'}`}>
                    {slide.category}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Controls: Prev/Next Arrows + Mobile Dots + Counter */}
          <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
            {/* Mobile/Tablet Pill Indicators */}
            <div className="flex md:hidden items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/15">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                    currentSlide === idx ? 'w-8 bg-[#FF6B00]' : 'w-2 bg-white/40 hover:bg-white'
                  }`}
                />
              ))}
            </div>

            {/* Navigation Buttons & Number Counter */}
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
              <button
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <span className="text-xs font-mono font-bold text-white px-2 border-x border-white/20">
                0{currentSlide + 1} <span className="text-white/40">/</span> 0{HERO_SLIDES.length}
              </span>

              <button
                onClick={nextSlide}
                aria-label="Next Slide"
                className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. WELCOME TO KYOLY CONSTRUCTION & SHORT COMPANY INTRO
      ======================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Brand Lockup & Credentials */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-2xl bg-[#F8FAFC] border border-neutral-200 relative overflow-hidden shadow-xs">
                <div className="absolute top-0 right-0 w-32 h-32 engineering-diagonal-pattern opacity-25" />
                <KyolyLogo size="lg" variant="light" className="mb-6" customSrc={introLogoImg} />

                <h3 className="text-xl font-bold font-['Outfit'] text-[#0F172A] mb-3">
                  Engineering Integrity for Nepal
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  Kyoly Construction Pvt. Ltd. unites seasoned civil structural engineers, power systems specialists, and heavy machinery fleets to deliver dependable national infrastructure.
                </p>

                <div className="space-y-3 pt-2 border-t border-neutral-200">
                  <div className="flex items-center gap-3 text-xs text-[#0F172A] font-semibold">
                    <CheckCircle className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                    <span>Head Office: Buddhanagar-10, New Baneshwor, Kathmandu</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#0F172A] font-semibold">
                    <CheckCircle className="w-4 h-4 text-[#D6A548] shrink-0" />
                    <span>Fully compliant with Nepal National Building Code (NBC)</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#0F172A] font-semibold">
                    <CheckCircle className="w-4 h-4 text-[#F4511E] shrink-0" />
                    <span>High-Voltage Substation & Transmission Grid Execution</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between">
                  <div className="text-xs text-slate-500">Managing Director Hotline:</div>
                  <a
                    href={`tel:${siteConfig.phoneDisplay}`}
                    className="text-xs font-black text-[#1E3A8A] hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{siteConfig.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Short Introduction with About Us Link */}
            <div className="lg:col-span-7 space-y-6">
              <SectionHeading
                kicker="Introduction"
                title="Welcome to Kyoly Construction"
                subtitle="Delivering integrated civil construction and electrical power engineering across Nepal."
              />

              <div className="prose text-sm text-slate-700 leading-relaxed space-y-4">
                <p>
                  <strong>KYOLY CONSTRUCTION PRIVATE LIMITED</strong> is an established Nepalese engineering and construction contractor. We specialize in high-voltage transmission lines, substation and switchyard installation, seismic-resilient commercial and residential building design, and civil infrastructure.
                </p>
                <p>
                  With our head office located at <strong>Buddhanagar-10, New Baneshwor, Kathmandu</strong> and operations across Nepal, our multidisciplinary teams bridge heavy foundation civil works with precision electrical power execution. We manage projects from preliminary geotechnical feasibility studies and ETABS structural analysis to full turnkey commissioning.
                </p>
              </div>

              {/* Direct About Us Link */}
              <div className="pt-2 flex items-center gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E3A8A] hover:bg-[#152a65] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-sm"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-4 h-4 text-[#D6A548]" />
                </Link>

                <button
                  onClick={() => onOpenQuote()}
                  className="px-6 py-3 border border-neutral-300 hover:border-[#D6A548] text-[#0F172A] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Request Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. OUR CORE SERVICES WITH FOUR IMAGE CARDS
      ======================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] border-y border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <SectionHeading
              kicker="Specialized Disciplines"
              title="Our Core Services"
              subtitle="End-to-end civil, structural, and electrical engineering capabilities."
              className="mb-0"
            />

            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-neutral-300 hover:border-[#FF6B00] text-[#0F172A] text-xs font-bold uppercase tracking-wider rounded-lg shadow-xs hover:shadow transition-all shrink-0 self-start md:self-auto"
            >
              <span>Explore All 5 Divisions</span>
              <ArrowRight className="w-4 h-4 text-[#FF6B00]" />
            </Link>
          </div>

          {/* Four Image Cards from Prompt */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES_DATA.slice(0, 4).map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                {/* Visual Image Card with Realistic Construction Photography */}
                <div className="h-48 w-full relative bg-[#0F172A] overflow-hidden">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-[#FF6B00] text-white rounded text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    {service.category}
                  </div>
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-black/80 backdrop-blur-xs rounded text-[10px] font-mono text-[#D6A548] border border-[#D6A548]/30">
                    {service.standards.split('/')[0]}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold font-['Outfit'] text-[#0F172A] group-hover:text-[#1E3A8A] transition-colors mb-2 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <Link
                      to={`/services/${service.slug}`}
                      className="text-xs font-bold text-[#1E3A8A] group-hover:text-[#FF6B00] transition-colors flex items-center gap-1.5"
                    >
                      <span>Explore Service Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#FF6B00] group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <button
                      onClick={() => onOpenQuote(service.title)}
                      className="text-[11px] font-bold text-[#D6A548] hover:text-[#b38228]"
                    >
                      Get Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. FEATURED PROJECTS WITH SAMPLE PROJECT IMAGES
      ======================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <SectionHeading
              kicker="Field Execution"
              title="Featured Projects"
              subtitle="A showcase of ongoing and completed engineering contracts across Nepal."
              className="mb-0"
            />

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition-all shrink-0 self-start md:self-auto"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4 text-[#D6A548]" />
            </Link>
          </div>

          {/* 3 Featured Sample Projects */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROJECTS_DATA.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                <div className="h-52 w-full relative bg-[#0F172A] overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-[#FF6B00] text-white rounded text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    {project.scopeCategory}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 bg-black/85 backdrop-blur-xs rounded text-[10px] font-mono text-emerald-400 border border-emerald-500/40">
                    {project.status}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
                      <span className="truncate">{project.location}</span>
                    </div>

                    <h3 className="text-base font-bold font-['Outfit'] text-[#0F172A] group-hover:text-[#FF6B00] transition-colors mb-2 leading-snug line-clamp-2" title={project.name}>
                      {project.name}
                    </h3>

                    {/* Major Work Completed Bullet Points */}
                    <div className="mb-3">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 font-mono">
                        Major Work Completed:
                      </div>
                      <ul className="space-y-1 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-neutral-100">
                        {project.majorWorks.slice(0, 2).map((work, wIdx) => (
                          <li key={wIdx} className="flex items-start gap-1.5 text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] shrink-0 mt-1" />
                            <span className="line-clamp-1">{work}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1 py-2 border-t border-neutral-100 text-[11px] text-slate-500">
                      <div className="line-clamp-1">Client: <strong className="text-slate-700">{project.client}</strong></div>
                      <div>Category: <strong className="text-[#FF6B00]">{project.category} Project</strong></div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <Link
                      to={`/projects?category=${project.category}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6B00] hover:text-[#E04800] transition-colors"
                    >
                      <span>Project Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-[10px] text-slate-400 font-mono">{project.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. OUR CLIENTS & PARTNERS (REPLACEABLE LOGO PLACEHOLDERS)
      ======================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] border-t border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF6B00]">
              Trust & Collaboration
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-['Outfit'] text-[#0F172A] mt-1.5">
              Our Clients & Partners
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-lg mx-auto">
              Partnering with government utilities, infrastructure boards, and private industry leaders throughout Nepal.
            </p>
          </div>

          {/* Replaceable Logo Placeholders Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {clientsAndPartners.map((partner, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-neutral-200 bg-[#F8FAFC] flex flex-col items-center justify-center text-center hover:border-[#1E3A8A] transition-colors group cursor-default"
                title={`${partner.name} - ${partner.role}`}
              >
                <div className="w-12 h-12 rounded-lg bg-white border border-neutral-200 flex items-center justify-center mb-2 shadow-xs group-hover:border-[#D6A548]">
                  <span className="text-xs font-black font-['Outfit'] text-[#0F172A] tracking-wider">
                    {partner.abbr}
                  </span>
                </div>
                <div className="text-xs font-bold text-[#0F172A] line-clamp-1">
                  {partner.name}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                  {partner.role}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <span className="text-[11px] text-slate-400 font-mono">
              Partner logos can be easily uploaded and replaced in site settings.
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. CONTACT US CALL-TO-ACTION SECTION
      ======================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0F172A] text-white relative overflow-hidden border-t-2 border-[#D6A548]">
        <div className="absolute inset-0 engineering-grid-dark opacity-50" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D6A548]/20 border border-[#D6A548]/40 text-xs font-bold text-[#D6A548] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#F4511E]" />
                Initiate Your Next Infrastructure Project
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit'] tracking-tight leading-tight text-white">
                Ready to Build Resilient Civil & Electrical Infrastructure?
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Contact our senior engineering estimators to discuss project schedules, feasibility studies, rate analysis, or comprehensive tender bidding across Nepal.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenQuote()}
                  className="px-8 py-3.5 bg-gradient-to-r from-[#D6A548] to-[#b88628] hover:from-[#e0b258] hover:to-[#c49232] text-[#0F172A] font-extrabold text-sm uppercase tracking-wider rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                  Request Official Quote
                </button>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm uppercase tracking-wider rounded-lg flex items-center gap-2.5 transition-colors shadow-md"
                >
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href={`tel:${siteConfig.phoneDisplay}`}
                  className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 hover:border-[#1E3A8A] rounded-lg font-bold text-sm flex items-center gap-2.5 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#F4511E]" />
                  <span>Call {siteConfig.phoneDisplay}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#1E293B] p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-2xl space-y-5">
                <div className="border-b border-slate-700 pb-4">
                  <h3 className="text-lg font-bold font-['Outfit'] text-white">
                    Contact Kyoly Construction
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Fast response for tenders, joint ventures, and municipal contracts.
                  </p>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#F4511E] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">Corporate Head Office:</strong>
                      <p className="text-slate-400">{siteConfig.headOffice}</p>
                    </div>
                  </div>

                  {siteConfig.regionalOffice && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#D6A548] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white">Regional Operational Branch:</strong>
                        <p className="text-slate-400">{siteConfig.regionalOffice}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#D6A548] shrink-0" />
                    <div>
                      <strong className="text-white">Direct Line: </strong>
                      <a href={`tel:${siteConfig.phoneDisplay}`} className="text-[#D6A548] hover:underline font-bold">
                        {siteConfig.phoneDisplay}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="w-full py-3 bg-[#1E3A8A] hover:bg-[#152a65] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Open Full Contact Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
