import React, { useState, useEffect } from 'react';
import { GALLERY_ITEMS, GalleryItem } from '../data/galleryData';
import { SectionHeading } from '../components/SectionHeading';
import { EngineeringVisual } from '../components/EngineeringVisual';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MapPin,
  Calendar,
  Layers,
  Shield,
  Info,
  Sparkles,
  Camera,
  Upload,
} from 'lucide-react';
import { getWhatsAppUrl } from '../config/siteConfig';

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [userGalleryItems, setUserGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('kyoly_user_gallery_photos');
      const list: GalleryItem[] = saved ? JSON.parse(saved) : [];
      const chapurSaved = localStorage.getItem('kyoly_chapur_photos');
      if (chapurSaved) {
        const chapurList: { title: string; caption?: string; url: string }[] = JSON.parse(chapurSaved);
        chapurList.forEach((cp, idx) => {
          if (!list.some((item) => item.imageUrl === cp.url)) {
            list.unshift({
              id: `chapur-sync-${idx}`,
              title: cp.title || 'Chapur Substation Site Photo',
              category: 'Substation & Switchyard',
              location: 'Chapur Substation, Rautahat, Nepal',
              year: '2024',
              description: cp.caption || 'Verified actual site photograph at Chapur Substation.',
              technicalSpecs: 'Substation & Switchyard · Turnkey Civil & Electrical Infrastructure',
              visualTheme: 'substation',
              imageUrl: cp.url,
            });
          }
        });
      }
      return list;
    } catch {
      return [];
    }
  });

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newItem: GalleryItem = {
            id: `user-gal-${Date.now()}-${Math.random()}`,
            title: file.name.replace(/\.[^/.]+$/, ''),
            category: (activeCategory !== 'All' ? activeCategory : 'Substation & Switchyard') as GalleryItem['category'],
            location: 'Chapur Substation / Site Location, Nepal',
            year: '2024',
            description: `Verified high-resolution photographic documentation uploaded for Kyoly Construction field portfolio.`,
            technicalSpecs: 'Site Photographic Record · Kyoly Engineering & Construction',
            visualTheme: 'substation',
            imageUrl: event.target.result as string,
          };
          setUserGalleryItems((prev) => {
            const updated = [newItem, ...prev];
            try {
              localStorage.setItem('kyoly_user_gallery_photos', JSON.stringify(updated));
            } catch {
              // ignore quota
            }
            return updated;
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // The 5 official requested categories
  const categories = [
    'All',
    'Transmission Line',
    'Substation & Switchyard',
    'Residential Buildings',
    'Commercial Buildings',
    'Civil Construction',
  ];

  const allGalleryItems = [...userGalleryItems, ...GALLERY_ITEMS];
  const filteredItems = allGalleryItems.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  // Handle keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null));
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const nextLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const prevLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-[#0F172A] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b-4 border-[#D6A548] relative overflow-hidden">
        <div className="absolute inset-0 engineering-grid-dark opacity-60" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D6A548]/15 border border-[#D6A548]/30 text-xs font-mono text-[#D6A548] uppercase tracking-wider">
              <span>PHOTO & ENGINEERING GALLERY · NEPAL</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-['Outfit'] tracking-tight text-white">
              Project & Construction Gallery
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              High-resolution visual documentation of high-voltage transmission lines, substation switchyards, commercial developments, and civil infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-neutral-200 pb-6">
            <div className="text-xs text-slate-500 font-medium">
              Showing <strong>{filteredItems.length}</strong> photographs in {activeCategory}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-neutral-200">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setLightboxIndex(null);
                  }}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-white text-[#0F172A] shadow-sm border border-neutral-200'
                      : 'text-slate-600 hover:text-[#0F172A]'
                  }`}
                >
                  {cat === 'All' ? 'All Categories' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Replacement & Upload Notice */}
          <div className="mb-8 p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D6A548] shrink-0" />
              <span>
                Click any photograph below to enlarge in high resolution. Verified Chapur Substation photos are available under Substation & Switchyard.
              </span>
            </div>
            <label className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#1E3A8A] hover:bg-[#152a65] text-white rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-xs shrink-0 self-start sm:self-auto">
              <Upload className="w-3.5 h-3.5 text-[#D6A548]" />
              <span>Upload Site Photo</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleGalleryUpload}
              />
            </label>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                className="group relative rounded-xl overflow-hidden bg-[#0F172A] border border-neutral-200 shadow-xs hover:shadow-xl cursor-pointer transition-all duration-300 flex flex-col"
              >
                {/* Visual Image Viewport with Realistic Construction Photography */}
                <div className="h-64 w-full relative overflow-hidden bg-[#0F172A]">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top-right enlargement hint */}
                  <div className="absolute top-3 right-3 p-1.5 bg-black/60 rounded-md text-white/80 group-hover:text-white group-hover:bg-[#FF6B00] transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#FF6B00] text-white rounded text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    {item.category}
                  </div>
                </div>

                {/* Bottom Card Information */}
                <div className="p-4 bg-white border-t border-neutral-100 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold font-['Outfit'] text-[#0F172A] group-hover:text-[#1E3A8A] transition-colors line-clamp-1 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#F4511E]" />
                      <span className="truncate max-w-[170px]">{item.location}</span>
                    </span>
                    <span className="font-mono">{item.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          IMAGE LIGHTBOX WITH ENLARGEMENT & EASY REPLACEMENT
      ======================================================== */}
      {currentLightboxItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 z-50 p-2 text-slate-300 hover:text-white bg-black/60 hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
            aria-label="Close image lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Lightbox Container */}
          <div className="relative w-full max-w-5xl bg-[#0F172A] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            {/* Main Visual with Prev/Next Controls */}
            <div className="relative flex-1 bg-black min-h-[340px] sm:min-h-[460px] flex items-center justify-center overflow-hidden">
              <img
                src={currentLightboxItem.imageUrl}
                alt={currentLightboxItem.title}
                className="w-full h-full object-cover max-h-[500px]"
              />

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevLightbox();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 text-white hover:bg-[#D6A548] hover:text-[#0F172A] transition-all cursor-pointer shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextLightbox();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 text-white hover:bg-[#D6A548] hover:text-[#0F172A] transition-all cursor-pointer shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Counter */}
              <div className="absolute bottom-3 left-4 px-3 py-1 bg-black/80 rounded-md text-xs font-mono text-[#D6A548] border border-slate-800">
                {lightboxIndex + 1} / {filteredItems.length}
              </div>
            </div>

            {/* Sidebar Details */}
            <div className="w-full lg:w-96 p-6 sm:p-8 bg-[#0B132B] text-white flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-[#1E3A8A] text-white text-[10px] font-bold uppercase tracking-wider">
                    {currentLightboxItem.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {currentLightboxItem.year}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-['Outfit'] text-white leading-snug">
                  {currentLightboxItem.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-[#F4511E] shrink-0" />
                  <span>{currentLightboxItem.location}</span>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-[#D6A548] uppercase tracking-wider mb-1">
                    Description & Context
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentLightboxItem.description}
                  </p>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                  <div className="text-[11px] font-bold text-[#D6A548] uppercase tracking-wider flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    <span>Technical Rigor</span>
                  </div>
                  <p className="text-xs font-mono text-slate-300">
                    {currentLightboxItem.technicalSpecs}
                  </p>
                </div>
              </div>

              {/* Actions & WhatsApp button */}
              <div className="pt-6 border-t border-slate-800 space-y-2.5">
                <a
                  href={getWhatsAppUrl(`Inquiry regarding gallery project: ${currentLightboxItem.title}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Inquire About This Work</span>
                </a>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Use ← → to browse</span>
                  <button
                    onClick={() => setLightboxIndex(null)}
                    className="text-[#D6A548] hover:underline"
                  >
                    Close Viewer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
