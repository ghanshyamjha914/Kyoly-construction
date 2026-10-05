import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Shield, CheckCircle, ArrowRight, Clock, ExternalLink, Lock, GitBranch } from 'lucide-react';
import { KyolyLogo } from './KyolyLogo';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';
import footerLogoImg from '../assets/images/kyoly-original-logo.png';
import { VersionHistoryModal } from './VersionHistoryModal';

export const Footer: React.FC = () => {
  const [versionModalOpen, setVersionModalOpen] = useState(false);
  const waUrl = getWhatsAppUrl();

  return (
    <footer className="bg-[#0F172A] text-white border-t-4 border-[#D6A548]">
      {/* Upper Pre-Footer Highlight Bar */}
      <div className="border-b border-[#1E293B] bg-[#0A101D] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#D6A548]/10 border border-[#D6A548]/40 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-[#D6A548]" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-['Outfit']">
                Licensed Construction & Engineering Contractor
              </h4>
              <p className="text-xs text-slate-400">
                Registered under the Government of Nepal · Department of Urban Development & Nepal Electricity Authority Partner
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {/* WhatsApp Quick Chat */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12.031 2C6.516 2 2.025 6.49 2.025 12c0 1.954.567 3.774 1.543 5.316L2 22l4.834-1.53c1.478.887 3.208 1.402 5.067 1.402h.005c5.514 0 10.005-4.49 10.005-10 0-5.511-4.49-10-9.88-10zm0 18.232h-.004c-1.637 0-3.167-.45-4.48-1.233l-.322-.191-3.327 1.053 1.077-3.238-.21-.334c-.878-1.396-1.341-3.024-1.341-4.707 0-4.664 3.795-8.459 8.608-8.459 4.811 0 8.604 3.795 8.604 8.459 0 4.665-3.792 8.65-8.605 8.65zm4.721-6.474c-.259-.13-1.531-.756-1.768-.842-.238-.087-.41-.13-.583.13-.173.259-.669.842-.821 1.015-.151.173-.303.195-.562.065-.259-.13-1.095-.404-2.086-1.288-.771-.688-1.292-1.538-1.443-1.797-.151-.26-.016-.4.113-.529.117-.117.26-.303.389-.455.13-.151.173-.259.259-.432.087-.173.043-.325-.022-.455-.065-.13-.583-1.406-.8-1.928-.211-.508-.426-.439-.583-.447l-.497-.009c-.173 0-.454.065-.691.325-.238.259-.908.887-.908 2.162s.93 2.508 1.06 2.681c.13.173 1.83 2.795 4.433 3.92.619.268 1.103.428 1.48.548.622.198 1.189.17 1.637.103.499-.075 1.531-.626 1.747-1.231.216-.605.216-1.124.151-1.231-.064-.108-.237-.173-.496-.303z" />
              </svg>
              <span>WhatsApp Us</span>
            </a>

            {/* Direct Phone */}
            <a
              href={`tel:${siteConfig.phoneDisplay}`}
              className="flex items-center gap-3 px-5 py-3 rounded-lg bg-[#1E293B] border border-slate-700 hover:border-[#D6A548] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#F4511E] flex items-center justify-center text-white shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wider text-slate-400">Direct Hotline</div>
                <div className="text-sm font-black text-white tracking-wide">{siteConfig.phoneDisplay}</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Main 4-Column Navy Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <KyolyLogo variant="dark" size="md" customSrc={footerLogoImg} />
            <p className="text-xs leading-relaxed text-slate-300 mt-3">
              Kyoly Construction Pvt. Ltd. is a premier Nepalese engineering firm specializing in high-voltage transmission lines, electrical substations, commercial & residential building design, and civil infrastructure across Nepal.
            </p>
            <div className="pt-2 text-[11px] text-slate-400 font-mono">
              Regd. No: {siteConfig.registrationNumber} · PAN: {siteConfig.panNumber}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-[#D6A548] uppercase mb-4 font-['Outfit'] flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-[#D6A548]" />
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link to="/" className="hover:text-[#D6A548] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#D6A548] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#D6A548] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[#D6A548] transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#D6A548] transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/career" className="hover:text-[#D6A548] transition-colors">
                  Career
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#D6A548] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-[#D6A548] uppercase mb-4 font-['Outfit'] flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-[#FF6B00]" />
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link to="/services#building-design-construction" className="hover:text-[#D6A548] transition-colors">
                  Building Design & Construction
                </Link>
              </li>
              <li>
                <Link to="/services#power-electrical-infrastructure" className="hover:text-[#D6A548] transition-colors">
                  Power & Electrical Infrastructure
                </Link>
              </li>
              <li>
                <Link to="/services#civil-infrastructure-works" className="hover:text-[#D6A548] transition-colors">
                  Civil & Infrastructure Works
                </Link>
              </li>
              <li>
                <Link to="/services#electrical-installation-services" className="hover:text-[#D6A548] transition-colors">
                  Electrical Installation & Services
                </Link>
              </li>
              <li>
                <Link to="/services#engineering-design-consultancy" className="hover:text-[#D6A548] transition-colors">
                  Engineering Design & Consultancy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold tracking-[0.2em] text-[#D6A548] uppercase mb-4 font-['Outfit'] flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-[#D6A548]" />
              Contact Information
            </h4>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F4511E] shrink-0 mt-0.5" />
                <span>
                  <strong>Head Office:</strong> {siteConfig.headOffice}
                </span>
              </div>

              {siteConfig.regionalOffice && (
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D6A548] shrink-0 mt-0.5" />
                  <span>
                    <strong>Regional Office:</strong> {siteConfig.regionalOffice}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D6A548] shrink-0" />
                <a href={`tel:${siteConfig.phoneDisplay}`} className="hover:text-[#D6A548] font-bold">
                  {siteConfig.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D6A548] shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-[#D6A548]">
                  {siteConfig.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 text-[#25D366] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12.031 2C6.516 2 2.025 6.49 2.025 12c0 1.954.567 3.774 1.543 5.316L2 22l4.834-1.53c1.478.887 3.208 1.402 5.067 1.402h.005c5.514 0 10.005-4.49 10.005-10 0-5.511-4.49-10-9.88-10zm0 18.232h-.004c-1.637 0-3.167-.45-4.48-1.233l-.322-.191-3.327 1.053 1.077-3.238-.21-.334c-.878-1.396-1.341-3.024-1.341-4.707 0-4.664 3.795-8.459 8.608-8.459 4.811 0 8.604 3.795 8.604 8.459 0 4.665-3.792 8.65-8.605 8.65zm4.721-6.474c-.259-.13-1.531-.756-1.768-.842-.238-.087-.41-.13-.583.13-.173.259-.669.842-.821 1.015-.151.173-.303.195-.562.065-.259-.13-1.095-.404-2.086-1.288-.771-.688-1.292-1.538-1.443-1.797-.151-.26-.016-.4.113-.529.117-.117.26-.303.389-.455.13-.151.173-.259.259-.432.087-.173.043-.325-.022-.455-.065-.13-.583-1.406-.8-1.928-.211-.508-.426-.439-.583-.447l-.497-.009c-.173 0-.454.065-.691.325-.238.259-.908.887-.908 2.162s.93 2.508 1.06 2.681c.13.173 1.83 2.795 4.433 3.92.619.268 1.103.428 1.48.548.622.198 1.189.17 1.637.103.499-.075 1.531-.626 1.747-1.231.216-.605.216-1.124.151-1.231-.064-.108-.237-.173-.496-.303z" />
                  </svg>
                </span>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] font-semibold">
                  WhatsApp: {siteConfig.whatsAppDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <ExternalLink className="w-4 h-4 text-[#1877F2] shrink-0" />
                <a href={siteConfig.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#1877F2]">
                  Facebook: Kyoly Construction
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar from prompt:
            © 2026 Kyoly Construction Pvt. Ltd. All Rights Reserved. */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 Kyoly Construction Pvt. Ltd. All Rights Reserved.
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px]">
            <span>Nepal Engineering Council Certified</span>
            <span>·</span>
            <span>NBC 105:2020 Compliant</span>
            <span>·</span>
            <Link to="/contact" className="hover:text-white">Emergency Support</Link>
            <span>·</span>
            <button
              type="button"
              onClick={() => setVersionModalOpen(true)}
              className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              title="View Kyoly Construction Version Evolution & Architecture"
            >
              <GitBranch className="w-3 h-3 text-[#FF6B00]" />
              <span>Version Architecture</span>
            </button>
            <span>·</span>
            <Link
              to="/internal/portal"
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white border border-slate-700 rounded-md flex items-center gap-1.5 transition-colors font-medium text-[11px]"
              title="Authorized Personnel · Internal Construction Documents Portal"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Staff / Owner Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Version Architecture & Release Evolution Modal */}
      <VersionHistoryModal
        isOpen={versionModalOpen}
        onClose={() => setVersionModalOpen(false)}
      />
    </footer>
  );
};
