import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  MAIN_SERVICE_CATEGORIES,
  MainServiceCategory,
  SubServiceItem,
} from '../data/servicesData';
import { EngineeringVisual } from '../components/EngineeringVisual';
import {
  Building,
  Zap,
  HardHat,
  Cpu,
  Compass,
  ChevronDown,
  ArrowRight,
  Search,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  Phone,
  MessageCircle,
  FolderOpen,
  Folder,
} from 'lucide-react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

interface ServicesPageProps {
  onOpenQuote: (serviceName?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenQuote }) => {
  // Track open accordion category IDs (default: first category open or open based on hash)
  const [openCategoryIds, setOpenCategoryIds] = useState<string[]>([
    'building-design-construction',
    'power-electrical-infrastructure',
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Handle URL hash navigation (e.g. /services#power-electrical-infrastructure or legacy /services#transmission-line)
  useEffect(() => {
    if (location.hash) {
      const hashId = location.hash.replace('#', '');

      // Check if hash matches a category slug
      const matchedCategory = MAIN_SERVICE_CATEGORIES.find(
        (c) => c.slug === hashId || c.id === hashId
      );

      if (matchedCategory) {
        setOpenCategoryIds((prev) =>
          prev.includes(matchedCategory.id) ? prev : [...prev, matchedCategory.id]
        );
        setTimeout(() => {
          const el = document.getElementById(matchedCategory.id);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
        return;
      }

      // Check if hash matches an individual sub-service slug
      for (const cat of MAIN_SERVICE_CATEGORIES) {
        const foundSub = cat.subServices.find(
          (s) => s.slug === hashId || s.id === hashId
        );
        if (foundSub) {
          // Open parent category and scroll to sub-service card
          setOpenCategoryIds((prev) =>
            prev.includes(cat.id) ? prev : [...prev, cat.id]
          );
          setTimeout(() => {
            const el = document.getElementById(foundSub.slug);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 150);
          break;
        }
      }
    }
  }, [location.hash]);

  // Toggle single category accordion
  const toggleCategory = (categoryId: string) => {
    setOpenCategoryIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Expand all categories
  const expandAll = () => {
    setOpenCategoryIds(MAIN_SERVICE_CATEGORIES.map((c) => c.id));
  };

  // Collapse all categories
  const collapseAll = () => {
    setOpenCategoryIds([]);
  };

  // Icon mapping helper for categories
  const renderCategoryIcon = (iconName: string, active: boolean) => {
    const iconClass = `w-6 h-6 transition-colors duration-300 ${
      active ? 'text-[#FF6B00]' : 'text-slate-500'
    }`;
    switch (iconName) {
      case 'Building':
        return <Building className={iconClass} />;
      case 'Zap':
        return <Zap className={iconClass} />;
      case 'HardHat':
        return <HardHat className={iconClass} />;
      case 'Cpu':
        return <Cpu className={iconClass} />;
      case 'Compass':
        return <Compass className={iconClass} />;
      default:
        return <Building className={iconClass} />;
    }
  };

  // Filter sub-services based on search query
  const queryLower = searchQuery.toLowerCase().trim();

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#0F172A] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b-4 border-[#FF6B00] relative overflow-hidden">
        <div className="absolute inset-0 engineering-grid-dark opacity-60" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6B00]/15 border border-[#FF6B00]/30 text-xs font-mono text-[#FF6B00] uppercase tracking-wider font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
              <span>TURNKEY ENGINEERING & INFRASTRUCTURE CAPABILITIES</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-['Outfit'] tracking-tight text-white leading-tight">
              Our Specialized Services
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              Explore our comprehensive portfolio across 5 core engineering divisions. Click any category below to expand related sub-services, view technical blueprints, and open in-depth detail pages.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Navigation Controls Bar: Search & Expand/Collapse All */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 sm:p-5 bg-neutral-50 rounded-2xl border border-neutral-200">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search sub-services (e.g. 132kV, ETABS, BOQ, Solar)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-neutral-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Right: Category Count & Toggle Controls */}
            <div className="flex items-center justify-between md:justify-end gap-3 text-xs">
              <span className="text-slate-500 font-medium hidden sm:inline">
                <strong>5</strong> Core Divisions · <strong>20</strong> Specialized Services
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={expandAll}
                  className="px-3.5 py-2 rounded-lg bg-white border border-neutral-200 hover:border-[#FF6B00] hover:text-[#FF6B00] text-slate-700 font-bold transition-all shadow-xs cursor-pointer"
                >
                  Expand All
                </button>
                <button
                  type="button"
                  onClick={collapseAll}
                  className="px-3.5 py-2 rounded-lg bg-white border border-neutral-200 hover:border-slate-400 text-slate-600 font-semibold transition-all shadow-xs cursor-pointer"
                >
                  Collapse All
                </button>
              </div>
            </div>
          </div>

          {/* Quick-Jump Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 pl-1">
              Jump to:
            </span>
            {MAIN_SERVICE_CATEGORIES.map((cat) => {
              const isOpen = openCategoryIds.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    if (!isOpen) {
                      setOpenCategoryIds((prev) => [...prev, cat.id]);
                    }
                    setTimeout(() => {
                      const el = document.getElementById(cat.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 50);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                    isOpen
                      ? 'bg-orange-50 border-orange-200 text-[#FF6B00]'
                      : 'bg-white border-neutral-200 text-slate-600 hover:border-orange-200 hover:text-slate-900'
                  }`}
                >
                  0{cat.number}. {cat.title}
                </button>
              );
            })}
          </div>

          {/* Nested Navigation Accordion System */}
          <div className="space-y-6">
            {MAIN_SERVICE_CATEGORIES.map((category) => {
              const isOpen = openCategoryIds.includes(category.id);

              // Filter sub-services if search query is active
              const displayedSubServices = category.subServices.filter((sub) => {
                if (!queryLower) return true;
                return (
                  sub.title.toLowerCase().includes(queryLower) ||
                  sub.shortDescription.toLowerCase().includes(queryLower) ||
                  sub.standards.toLowerCase().includes(queryLower) ||
                  sub.keyFeatures.some((f) => f.toLowerCase().includes(queryLower))
                );
              });

              // If searching and this category has no matching sub-services, hide it
              if (queryLower && displayedSubServices.length === 0) {
                return null;
              }

              return (
                <div
                  key={category.id}
                  id={category.id}
                  className={`rounded-2xl transition-all duration-300 border bg-white ${
                    isOpen
                      ? 'border-[#FF6B00]/40 shadow-lg ring-1 ring-[#FF6B00]/10'
                      : 'border-neutral-200 hover:border-neutral-300 shadow-xs'
                  }`}
                >
                  {/* Category Clickable Accordion Header */}
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className="w-full p-5 sm:p-7 flex items-center justify-between gap-4 text-left cursor-pointer group rounded-2xl transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start sm:items-center gap-4 sm:gap-5 min-w-0">
                      {/* Category Icon Badge */}
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen
                            ? 'bg-[#FF6B00]/10 border-2 border-[#FF6B00]'
                            : 'bg-slate-100 border border-neutral-200 group-hover:border-orange-200 group-hover:bg-orange-50/50'
                        }`}
                      >
                        {renderCategoryIcon(category.iconName, isOpen)}
                      </div>

                      {/* Category Titles & Meta */}
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            DIVISION 0{category.number}
                          </span>
                          <span className="text-xs font-semibold text-[#FF6B00]">
                            {category.subServices.length} Specialized Sub-Services
                          </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black font-['Outfit'] text-[#0F172A] tracking-tight group-hover:text-[#FF6B00] transition-colors truncate">
                          {category.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 font-light line-clamp-1 hidden sm:block">
                          {category.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Right Chevron & Status Indicator */}
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-bold text-slate-400 group-hover:text-[#FF6B00] hidden md:inline transition-colors">
                        {isOpen ? 'Collapse' : 'Explore Sub-Services'}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isOpen
                            ? 'bg-[#FF6B00] text-white rotate-180 shadow-md shadow-orange-500/20'
                            : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                        }`}
                      >
                        <ChevronDown className="w-5 h-5 transition-transform duration-300" />
                      </div>
                    </div>
                  </button>

                  {/* Expanded Nested Sub-Services Area */}
                  {isOpen && (
                    <div className="px-5 pb-7 sm:px-7 sm:pb-8 pt-0 border-t border-neutral-100 transition-all duration-300 animate-fadeIn">
                      {/* Category Description Banner */}
                      <div className="py-4 text-xs sm:text-sm text-slate-600 border-b border-neutral-100 mb-6">
                        {category.description}
                      </div>

                      {/* Sub-Services Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                        {displayedSubServices.map((subService) => (
                          <div
                            key={subService.id}
                            id={subService.slug}
                            className="bg-neutral-50/70 hover:bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200/90 hover:border-[#FF6B00]/50 transition-all duration-300 hover:shadow-md group flex flex-col justify-between"
                          >
                            <div className="space-y-3.5">
                              {/* Sub-Service Realistic Construction Photo */}
                              <div className="relative h-44 w-full rounded-xl overflow-hidden bg-slate-900 shadow-xs">
                                <img
                                  src={subService.imageUrl}
                                  alt={subService.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <span className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded bg-black/80 text-white font-mono text-[10px] border border-white/20">
                                  {subService.standards.split('/')[0]}
                                </span>
                                <span className="absolute bottom-2.5 right-3 text-[#FF6B00] font-bold text-xs bg-white/95 px-2.5 py-0.5 rounded shadow-xs">
                                  {subService.estimatedDuration || 'Turnkey EPC'}
                                </span>
                              </div>

                              {/* Title */}
                              <h3 className="text-lg sm:text-xl font-bold font-['Outfit'] text-[#0F172A] group-hover:text-[#FF6B00] transition-colors leading-snug">
                                <Link to={`/services/${subService.slug}`}>
                                  {subService.title}
                                </Link>
                              </h3>

                              {/* Short Description */}
                              <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed font-normal">
                                {subService.shortDescription}
                              </p>

                              {/* Key Features Bullet Snippet */}
                              <div className="space-y-1.5 pt-1">
                                {subService.keyFeatures.slice(0, 2).map((feat, fIdx) => (
                                  <div
                                    key={fIdx}
                                    className="flex items-start gap-2 text-xs text-slate-700"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B00] shrink-0 mt-0.5" />
                                    <span className="line-clamp-1">{feat}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Bottom Card Action Footer */}
                            <div className="pt-5 mt-4 border-t border-neutral-200/80 flex items-center justify-between gap-3">
                              {/* Clickable Sub-Service Detail Page Link */}
                              <Link
                                to={`/services/${subService.slug}`}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F172A] group-hover:text-[#FF6B00] transition-colors"
                              >
                                <span>View Technical Details & Specs</span>
                                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                              </Link>

                              {/* Quick Inquire Button */}
                              <button
                                type="button"
                                onClick={() => onOpenQuote(subService.title)}
                                className="px-3.5 py-1.5 rounded-lg bg-white border border-neutral-200 hover:border-[#FF6B00] hover:bg-[#FF6B00] hover:text-white text-slate-700 text-xs font-bold transition-all shadow-xs cursor-pointer"
                              >
                                Inquire
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Pre-Footer CTA */}
          <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white relative overflow-hidden border-2 border-[#FF6B00]/40 shadow-xl mt-12">
            <div className="absolute inset-0 engineering-grid-dark opacity-50" />
            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B00]/20 text-[#FF6B00] text-xs font-bold uppercase tracking-wider font-mono">
                <span>Turnkey Engineering & Construction</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-['Outfit'] text-white">
                Require a custom multi-disciplinary tender or engineering package?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                Kyoly Construction bids and executes integrated civil, high-voltage transmission, structural building, and electrical projects across Nepal. Speak with our senior engineering directors today.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onOpenQuote('Comprehensive Engineering Inquiry')}
                  className="px-6 py-3.5 rounded-xl bg-[#FF6B00] hover:bg-[#E04800] text-white text-sm font-bold transition-all shadow-lg hover:shadow-orange-500/25 flex items-center gap-2 cursor-pointer"
                >
                  <span>Submit Tender / Project Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={`tel:${siteConfig.phoneDisplay}`}
                  className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#FF6B00]" />
                  <span>{siteConfig.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
