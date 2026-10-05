import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  getSubServiceBySlug,
  getRelatedSubServices,
  MAIN_SERVICE_CATEGORIES,
} from '../data/servicesData';
import { EngineeringVisual } from '../components/EngineeringVisual';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  ShieldCheck,
  Clock,
  Users,
  Award,
  Phone,
  MessageCircle,
  Building,
  Zap,
  HardHat,
  Cpu,
  Compass,
  FileText,
  ChevronRight,
} from 'lucide-react';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';

interface ServiceDetailPageProps {
  onOpenQuote: (serviceName?: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ onOpenQuote }) => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const [mediaView, setMediaView] = useState<'photo' | 'blueprint'>('photo');
  const navigate = useNavigate();

  const service = serviceSlug ? getSubServiceBySlug(serviceSlug) : undefined;

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceSlug]);

  if (!service) {
    return (
      <div className="min-h-[70vh] bg-white flex items-center justify-center px-4 py-20">
        <div className="max-w-md text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center text-[#FF6B00]">
            <FileText className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black font-['Outfit'] text-[#0F172A]">
            Service Not Found
          </h2>
          <p className="text-sm text-slate-600">
            The engineering service you are looking for may have moved or been updated.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0F172A] text-white text-sm font-bold hover:bg-[#FF6B00] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Services
          </Link>
        </div>
      </div>
    );
  }

  const category = MAIN_SERVICE_CATEGORIES.find((c) => c.slug === service.categorySlug);
  const relatedServices = getRelatedSubServices(service.categorySlug, service.slug);

  const waServiceUrl = getWhatsAppUrl(
    `Hello Kyoly Construction, I would like to inquire about your "${service.title}" engineering services. Please provide technical details and quotation process.`
  );

  // Category Icon helper
  const renderCategoryIcon = () => {
    switch (service.categorySlug) {
      case 'building-design-construction':
        return <Building className="w-4 h-4 text-[#FF6B00]" />;
      case 'power-electrical-infrastructure':
        return <Zap className="w-4 h-4 text-[#FF6B00]" />;
      case 'civil-infrastructure-works':
        return <HardHat className="w-4 h-4 text-[#FF6B00]" />;
      case 'electrical-installation-services':
        return <Cpu className="w-4 h-4 text-[#FF6B00]" />;
      case 'engineering-design-consultancy':
        return <Compass className="w-4 h-4 text-[#FF6B00]" />;
      default:
        return <Building className="w-4 h-4 text-[#FF6B00]" />;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Top Breadcrumb Navigation */}
      <nav className="bg-slate-50 border-b border-neutral-200 py-3.5 px-4 sm:px-6 lg:px-8" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-2 text-xs font-medium text-slate-500">
          <Link to="/" className="hover:text-[#FF6B00] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/services" className="hover:text-[#FF6B00] transition-colors">
            Services
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link
            to={`/services#${service.categorySlug}`}
            className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5"
          >
            {renderCategoryIcon()}
            <span>{service.category}</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#0F172A] font-bold truncate max-w-[260px] sm:max-w-none">
            {service.title}
          </span>
        </div>
      </nav>

      {/* Hero Header Section */}
      <section className="bg-[#0F172A] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b-4 border-[#FF6B00] relative overflow-hidden">
        <div className="absolute inset-0 engineering-grid-dark opacity-60" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-4">
            {/* Category Pill with Number */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-semibold text-white">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
              <span className="text-orange-300 font-mono">Category 0{service.categoryNumber}</span>
              <span className="text-slate-400">·</span>
              <span>{service.category}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-black font-['Outfit'] tracking-tight text-white leading-tight">
              {service.title}
            </h1>

            {/* Short Description */}
            <p className="text-base sm:text-xl text-slate-300 font-light leading-relaxed">
              {service.shortDescription}
            </p>

            {/* Top Quick Actions Bar */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenQuote(service.title)}
                className="px-6 py-3 rounded-lg bg-[#FF6B00] hover:bg-[#E04800] text-white text-sm font-bold transition-all shadow-lg hover:shadow-orange-500/25 flex items-center gap-2 cursor-pointer"
              >
                <span>Request Quotation / Tender</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={waServiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-bold transition-all flex items-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Inquiry</span>
              </a>

              <Link
                to="/services"
                className="px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>All Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Detail Content Area */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left 8 Columns: Comprehensive Technical Overview & Details */}
            <div className="lg:col-span-8 space-y-12">
              {/* High-Resolution Engineering Media Box (Realistic Photo + CAD Blueprint Toggle) */}
              <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-md bg-neutral-900 group">
                <div className="p-3 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                  {/* View Mode Toggle Buttons */}
                  <div className="flex items-center gap-1.5 p-0.5 bg-neutral-800 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setMediaView('photo')}
                      className={`px-3 py-1 rounded-md text-[11px] font-bold font-sans transition-all cursor-pointer ${
                        mediaView === 'photo'
                          ? 'bg-[#FF6B00] text-white shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Field Photography
                    </button>
                    <button
                      type="button"
                      onClick={() => setMediaView('blueprint')}
                      className={`px-3 py-1 rounded-md text-[11px] font-bold font-sans transition-all cursor-pointer ${
                        mediaView === 'blueprint'
                          ? 'bg-[#FF6B00] text-white shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      CAD Schematic
                    </button>
                  </div>
                  <span className="text-[#FF6B00] font-semibold text-[11px]">
                    CODE: {service.standards.split('/')[0]}
                  </span>
                </div>

                <div className="h-[280px] sm:h-[420px] w-full relative bg-[#0F172A] overflow-hidden">
                  {mediaView === 'photo' ? (
                    <>
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div className="space-y-1">
                          <span className="px-2.5 py-1 rounded bg-[#FF6B00] text-white text-[10px] font-bold uppercase tracking-wider">
                            {service.category}
                          </span>
                          <h3 className="text-white text-base sm:text-xl font-bold font-['Outfit'] drop-shadow-md">
                            {service.title}
                          </h3>
                        </div>
                        <span className="text-xs text-slate-300 font-mono hidden sm:inline bg-black/60 px-2.5 py-1 rounded border border-white/20">
                          {service.estimatedDuration || 'Turnkey EPC'}
                        </span>
                      </div>
                    </>
                  ) : (
                    <EngineeringVisual
                      type={service.visualType}
                      badge={service.category}
                      overlayText={service.title}
                      interactive
                    />
                  )}
                </div>

                <div className="p-3.5 bg-neutral-950 text-slate-400 text-xs flex items-center justify-between border-t border-neutral-800">
                  <span>Kyoly Construction Technical Field Standards</span>
                  <span className="text-white font-mono text-[11px]">Govt. Licensed & Approved</span>
                </div>
              </div>

              {/* Full Engineering Description */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF6B00] font-['Outfit']">
                  <span className="w-2 h-2 rounded-sm bg-[#FF6B00]" />
                  <span>Comprehensive Engineering Scope</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-[#0F172A]">
                  Overview & Execution Methodology
                </h2>
                <div className="text-base text-slate-700 leading-relaxed space-y-4 font-normal">
                  <p>{service.fullDescription}</p>
                  <p>
                    All engineering phases are supervised by experienced site supervisors, licensed civil & electrical engineers, and strict QA/QC documentation to ensure timely handover, seismic safety, and compliance with statutory guidelines.
                  </p>
                </div>
              </div>

              {/* Key Features & Scope of Work */}
              <div className="space-y-5 bg-neutral-50 p-6 sm:p-8 rounded-2xl border border-neutral-200">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0F172A] font-['Outfit']">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6B00]" />
                  <span>Key Engineering Features & Capabilities</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-['Outfit'] text-[#0F172A]">
                  What Kyoly Delivers
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {service.keyFeatures.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-neutral-200/80 shadow-xs"
                    >
                      <div className="w-6 h-6 rounded-full bg-orange-50 border border-orange-200 text-[#FF6B00] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        ✓
                      </div>
                      <span className="text-xs sm:text-sm text-slate-800 leading-snug font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Standards & Quality Deliverables */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Deliverables Card */}
                <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 text-[#1E3A8A] flex items-center justify-center shrink-0">
                      <FileCheck2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0F172A] font-['Outfit']">
                        Project Deliverables
                      </h4>
                      <p className="text-[11px] text-slate-500">Official Dossiers & Blueprints</p>
                    </div>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#FF6B00] font-bold text-sm leading-none">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Standards & Compliance Card */}
                <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-xs space-y-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 text-[#D6A548] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0F172A] font-['Outfit']">
                        Standards & Codes
                      </h4>
                      <p className="text-[11px] text-slate-500">National & Global Compliance</p>
                    </div>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 font-mono text-xs text-[#0F172A] font-bold">
                    {service.standards}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Complies with Nepal National Building Code, Nepal Electricity Authority norms, and international IEC/IS standards.
                  </p>
                </div>
              </div>

              {/* Technical Specifications Table */}
              {service.specs && service.specs.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-black font-['Outfit'] text-[#0F172A] flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#FF6B00]" />
                    <span>Technical Specifications & Standards</span>
                  </h3>
                  <div className="overflow-hidden rounded-xl border border-neutral-200">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 text-[#0F172A] font-bold uppercase tracking-wider text-[11px] border-b border-neutral-200">
                        <tr>
                          <th className="py-3 px-4">Parameter</th>
                          <th className="py-3 px-4">Engineering Specification / Standard</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200 bg-white">
                        {service.specs.map((spec, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-4 font-bold text-slate-700 w-1/3">
                              {spec.label}
                            </td>
                            <td className="py-3 px-4 text-slate-900 font-medium font-mono text-[11px]">
                              {spec.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Bottom Inquiry CTA Card */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0F172A] via-[#162238] to-[#0A101D] text-white border-2 border-[#FF6B00]/40 shadow-xl space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FF6B00]/20 text-[#FF6B00] text-xs font-bold uppercase tracking-wider">
                    <span>Direct Tender & Consultation</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-white">
                    Ready to initiate your {service.title}?
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-2xl font-light">
                    Contact Kyoly Construction's technical estimating cell. We evaluate your architectural drawings, tender specifications, or site conditions to provide itemized BOQ estimates.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenQuote(service.title)}
                    className="px-6 py-3.5 rounded-lg bg-[#FF6B00] hover:bg-[#E04800] text-white text-sm font-bold transition-all shadow-lg hover:shadow-orange-500/25 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Request Technical Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`tel:${siteConfig.phoneDisplay}`}
                    className="px-5 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-[#FF6B00]" />
                    <span>Call: {siteConfig.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right 4 Columns: Sticky Sidebar with Service Metrics & Related Sub-Services */}
            <div className="lg:col-span-4 space-y-8">
              {/* Quick Inquiry Sticky Box */}
              <div className="p-6 bg-slate-50 rounded-2xl border-2 border-[#FF6B00]/30 shadow-md space-y-6 sticky top-28">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF6B00]">
                    Direct Technical Inquiry
                  </span>
                  <h4 className="text-lg font-black font-['Outfit'] text-[#0F172A]">
                    Quick Project Action
                  </h4>
                  <p className="text-xs text-slate-600">
                    Get in touch directly with our engineering team for this service.
                  </p>
                </div>

                {/* Service Metadata Badges */}
                <div className="space-y-3 pt-2 text-xs border-y border-neutral-200 py-4">
                  {service.estimatedDuration && (
                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">
                          Estimated Timeline
                        </div>
                        <div className="font-semibold text-slate-800">
                          {service.estimatedDuration}
                        </div>
                      </div>
                    </div>
                  )}

                  {service.targetClients && (
                    <div className="flex items-start gap-2.5">
                      <Users className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400">
                          Target Clients
                        </div>
                        <div className="font-semibold text-slate-800">
                          {service.targetClients}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-2.5">
                    <Award className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">
                        License & Accreditation
                      </div>
                      <div className="font-semibold text-slate-800">
                        Licensed Engineering & Construction Contractor
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary Action Button */}
                <button
                  type="button"
                  onClick={() => onOpenQuote(service.title)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#FF6B00] hover:bg-[#E04800] text-white text-sm font-bold transition-all shadow-md hover:shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Inquire About This Service</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* WhatsApp Link */}
                <a
                  href={waServiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-white border border-neutral-200 hover:border-[#25D366] text-neutral-800 hover:text-[#25D366] text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Chat on WhatsApp</span>
                </a>

                {/* Related Sub-Services in This Category */}
                {relatedServices.length > 0 && (
                  <div className="pt-4 border-t border-neutral-200 space-y-3">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] font-['Outfit']">
                      More in {service.category}
                    </h5>
                    <div className="space-y-2">
                      {relatedServices.map((rel) => (
                        <Link
                          key={rel.id}
                          to={`/services/${rel.slug}`}
                          className="block p-3 rounded-xl bg-white hover:bg-orange-50/60 border border-neutral-200 hover:border-orange-200 transition-all group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-800 group-hover:text-[#FF6B00] transition-colors leading-tight line-clamp-1">
                              {rel.title}
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#FF6B00] group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" />
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-1 font-light">
                            {rel.shortDescription}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Back to All Services Link */}
                <div className="pt-2 text-center">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#FF6B00] transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>View All 5 Categories & Sub-Services</span>
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
