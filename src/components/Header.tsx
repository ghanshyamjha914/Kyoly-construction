import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Mail,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Zap,
  Building,
  TowerControl,
  Compass,
  Lock,
} from 'lucide-react';
import { KyolyLogo } from './KyolyLogo';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';
import headerLogoImg from '../assets/images/kyoly-original-logo.png';

interface HeaderProps {
  onOpenQuote: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);

  const location = useLocation();
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const projectsDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and desktop dropdowns on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setProjectsDropdownOpen(false);
  }, [location.pathname]);

  // Click outside to close desktop dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target as Node)
      ) {
        setServicesDropdownOpen(false);
      }
      if (
        projectsDropdownRef.current &&
        !projectsDropdownRef.current.contains(event.target as Node)
      ) {
        setProjectsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // The 5 official main service categories
  const serviceDropdownItems = [
    { title: 'Building Design & Construction', path: '/services#building-design-construction', desc: 'Seismic architecture, high-rise framing & 3D BIM' },
    { title: 'Power & Electrical Infrastructure', path: '/services#power-electrical-infrastructure', desc: 'Up to 400kV transmission, 132kV substations & grids' },
    { title: 'Civil & Infrastructure Works', path: '/services#civil-infrastructure-works', desc: 'Heavy foundations, RCC bridges, slope stability & drainage' },
    { title: 'Electrical Installation & Services', path: '/services#electrical-installation-services', desc: 'HT/LT panels, commercial MEP, grounding & solar backup' },
    { title: 'Engineering Design & Consultancy', path: '/services#engineering-design-consultancy', desc: 'DPR feasibility, seismic modeling, BOQ & permits' },
  ];

  // The 2 official requested project categories
  const projectDropdownItems = [
    { title: 'Ongoing Projects', path: '/projects?category=Ongoing', desc: 'Active execution across Nepal power corridors' },
    { title: 'Completed Projects', path: '/projects?category=Completed', desc: 'Successfully commissioned infrastructure portfolio' },
  ];

  const waUrl = getWhatsAppUrl();

  return (
    <>
      {/* Top Corporate Utility Bar */}
      <div className="bg-[#0B0F19] text-white text-xs border-b border-neutral-800 py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${siteConfig.phoneDisplay}`}
              className="flex items-center gap-1.5 text-neutral-300 hover:text-[#FF6B00] transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>
                Call: <strong className="text-white">{siteConfig.phoneDisplay}</strong>
              </span>
            </a>
            <div className="hidden sm:flex items-center gap-1.5 text-neutral-300">
              <Mail className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>{siteConfig.email}</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Kathmandu Valley, Nepal</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-neutral-400 text-[11px]">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>WhatsApp: {siteConfig.whatsAppDisplay}</span>
            </a>
            <span className="hidden md:inline text-neutral-700">|</span>
            <span className="hidden md:flex text-slate-300 font-semibold items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B00]" />
              Govt. Licensed Contractor
            </span>
            <span className="text-neutral-700">|</span>
            <Link
              to="/internal/portal"
              className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-amber-300 hover:text-white border border-neutral-700 transition-colors font-medium text-[11px]"
              title="Authorized Personnel Only · Construction Documents Portal"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Staff Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 bg-white transition-all duration-300 ${
          scrolled
            ? 'shadow-md py-2 border-b border-neutral-200'
            : 'py-2.5 sm:py-3 border-b border-neutral-200/80 shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 lg:gap-8">
          {/* Left: Enhanced Company Logo & Branding */}
          <Link
            to="/"
            className="flex items-center gap-2 group focus:outline-none shrink-0"
            title="Kyoly Construction Pvt. Ltd. Home"
          >
            <KyolyLogo size="md" variant="light" customSrc={headerLogoImg} />
          </Link>

          {/* Right Navigation Menu with Dropdowns:
              HOME | ABOUT US | SERVICES | PROJECTS | GALLERY | CAREER | CONTACT US */}
          <nav className="hidden xl:flex items-center gap-1 lg:gap-2">
            {/* HOME */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3 py-2 text-[13.5px] font-bold tracking-wide transition-all rounded-md relative ${
                  isActive
                    ? 'text-[#FF6B00] font-extrabold after:content-[""] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2.5px] after:bg-[#FF6B00] after:rounded-full'
                    : 'text-[#0F172A] hover:text-[#FF6B00]'
                }`
              }
            >
              HOME
            </NavLink>

            {/* ABOUT US */}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-2 text-[13.5px] font-bold tracking-wide transition-all rounded-md relative ${
                  isActive
                    ? 'text-[#FF6B00] font-extrabold after:content-[""] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2.5px] after:bg-[#FF6B00] after:rounded-full'
                    : 'text-[#0F172A] hover:text-[#FF6B00]'
                }`
              }
            >
              ABOUT US
            </NavLink>

            {/* SERVICES WITH DROPDOWN */}
            <div
              ref={servicesDropdownRef}
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `px-3 py-2 text-[13.5px] font-bold tracking-wide transition-all rounded-md inline-flex items-center gap-1 ${
                    isActive
                      ? 'text-[#FF6B00] font-extrabold after:content-[""] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2.5px] after:bg-[#FF6B00] after:rounded-full'
                      : 'text-[#0F172A] hover:text-[#FF6B00]'
                  }`
                }
              >
                <span>SERVICES</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    servicesDropdownOpen ? 'rotate-180 text-[#FF6B00]' : ''
                  }`}
                />
              </NavLink>

              {/* Services Dropdown Menu */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-2xl border border-neutral-200 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-1.5 border-b border-neutral-100 text-[11px] font-mono text-[#FF6B00] font-bold uppercase tracking-wider">
                    Core Capabilities
                  </div>
                  <div className="divide-y divide-neutral-100">
                    {serviceDropdownItems.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.path}
                        onClick={() => setServicesDropdownOpen(false)}
                        className="block px-4 py-2.5 hover:bg-neutral-50 transition-colors group"
                      >
                        <div className="text-xs font-bold text-[#0F172A] group-hover:text-[#FF6B00]">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5 line-clamp-1">
                          {item.desc}
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="px-4 pt-2 border-t border-neutral-100">
                    <Link
                      to="/services"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="text-xs font-bold text-[#FF6B00] hover:text-[#E04800] flex items-center justify-between"
                    >
                      <span>Explore All Services</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* PROJECTS WITH DROPDOWN */}
            <div
              ref={projectsDropdownRef}
              className="relative"
              onMouseEnter={() => setProjectsDropdownOpen(true)}
              onMouseLeave={() => setProjectsDropdownOpen(false)}
            >
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  `px-3 py-2 text-[13.5px] font-bold tracking-wide transition-all rounded-md inline-flex items-center gap-1 ${
                    isActive
                      ? 'text-[#FF6B00] font-extrabold after:content-[""] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2.5px] after:bg-[#FF6B00] after:rounded-full'
                      : 'text-[#0F172A] hover:text-[#FF6B00]'
                  }`
                }
              >
                <span>PROJECTS</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    projectsDropdownOpen ? 'rotate-180 text-[#FF6B00]' : ''
                  }`}
                />
              </NavLink>

              {/* Projects Dropdown Menu */}
              {projectsDropdownOpen && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-2xl border border-neutral-200 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-1.5 border-b border-neutral-100 text-[11px] font-mono text-[#FF6B00] font-bold uppercase tracking-wider">
                    Project Categories
                  </div>
                  <div className="divide-y divide-neutral-100">
                    {projectDropdownItems.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.path}
                        onClick={() => setProjectsDropdownOpen(false)}
                        className="block px-4 py-2.5 hover:bg-neutral-50 transition-colors group"
                      >
                        <div className="text-xs font-bold text-[#0F172A] group-hover:text-[#FF6B00]">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5">
                          {item.desc}
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="px-4 pt-2 border-t border-neutral-100">
                    <Link
                      to="/projects"
                      onClick={() => setProjectsDropdownOpen(false)}
                      className="text-xs font-bold text-[#FF6B00] hover:text-[#E04800] flex items-center justify-between"
                    >
                      <span>View Full Portfolio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* GALLERY */}
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                `px-3 py-2 text-[13.5px] font-bold tracking-wide transition-all rounded-md relative ${
                  isActive
                    ? 'text-[#FF6B00] font-extrabold after:content-[""] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2.5px] after:bg-[#FF6B00] after:rounded-full'
                    : 'text-[#0F172A] hover:text-[#FF6B00]'
                }`
              }
            >
              GALLERY
            </NavLink>

            {/* CAREER */}
            <NavLink
              to="/career"
              className={({ isActive }) =>
                `px-3 py-2 text-[13.5px] font-bold tracking-wide transition-all rounded-md relative ${
                  isActive
                    ? 'text-[#FF6B00] font-extrabold after:content-[""] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2.5px] after:bg-[#FF6B00] after:rounded-full'
                    : 'text-[#0F172A] hover:text-[#FF6B00]'
                }`
              }
            >
              CAREER
            </NavLink>

            {/* CONTACT US */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-3 py-2 text-[13.5px] font-bold tracking-wide transition-all rounded-md relative ${
                  isActive
                    ? 'text-[#FF6B00] font-extrabold after:content-[""] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2.5px] after:bg-[#FF6B00] after:rounded-full'
                    : 'text-[#0F172A] hover:text-[#FF6B00]'
                }`
              }
            >
              CONTACT US
            </NavLink>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              to="/internal/portal"
              className="p-2.5 rounded-lg border border-neutral-200 text-neutral-500 hover:text-[#0F172A] hover:border-neutral-400 hover:bg-neutral-50 transition-all flex items-center justify-center"
              title="Staff Portal (Private Construction Documents)"
            >
              <Lock className="w-4 h-4 text-neutral-600" />
            </Link>

            <button
              onClick={onOpenQuote}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#FF6B00] hover:bg-[#E04800] text-white font-extrabold text-xs tracking-wider uppercase rounded-lg shadow-sm hover:shadow-orange-500/25 transition-all duration-200 cursor-pointer active:scale-95"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenQuote}
              className="sm:hidden px-3 py-1.5 bg-[#FF6B00] text-white font-bold text-xs rounded-md shadow-xs"
            >
              Quote
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#0F172A] hover:text-[#FF6B00] hover:bg-neutral-100 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-neutral-200 shadow-xl px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1 divide-y divide-neutral-100">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `py-2.5 px-3 text-sm font-bold tracking-wide rounded-md transition-colors flex items-center justify-between ${
                    isActive ? 'text-[#FF6B00] bg-orange-50/70 font-black' : 'text-[#0F172A] hover:text-[#FF6B00]'
                  }`
                }
              >
                <span>HOME</span>
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `py-2.5 px-3 text-sm font-bold tracking-wide rounded-md transition-colors flex items-center justify-between ${
                    isActive ? 'text-[#FF6B00] bg-orange-50/70 font-black' : 'text-[#0F172A] hover:text-[#FF6B00]'
                  }`
                }
              >
                <span>ABOUT US</span>
              </NavLink>

              {/* Mobile Services Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full py-2.5 px-3 text-sm font-bold tracking-wide rounded-md transition-colors flex items-center justify-between text-[#0F172A] hover:text-[#FF6B00]"
                >
                  <span>SERVICES</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180 text-[#FF6B00]' : ''}`} />
                </button>
                {mobileServicesOpen && (
                  <div className="pl-4 pr-2 py-1 space-y-1 bg-neutral-50 rounded-lg mb-2">
                    {serviceDropdownItems.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.path}
                        className="block py-2 px-2 text-xs font-semibold text-neutral-700 hover:text-[#FF6B00]"
                      >
                        · {item.title}
                      </Link>
                    ))}
                    <Link
                      to="/services"
                      className="block py-2 px-2 text-xs font-bold text-[#FF6B00]"
                    >
                      View All Services →
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Projects Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                  className="w-full py-2.5 px-3 text-sm font-bold tracking-wide rounded-md transition-colors flex items-center justify-between text-[#0F172A] hover:text-[#FF6B00]"
                >
                  <span>PROJECTS</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileProjectsOpen ? 'rotate-180 text-[#FF6B00]' : ''}`} />
                </button>
                {mobileProjectsOpen && (
                  <div className="pl-4 pr-2 py-1 space-y-1 bg-neutral-50 rounded-lg mb-2">
                    {projectDropdownItems.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.path}
                        className="block py-2 px-2 text-xs font-semibold text-neutral-700 hover:text-[#FF6B00]"
                      >
                        · {item.title}
                      </Link>
                    ))}
                    <Link
                      to="/projects"
                      className="block py-2 px-2 text-xs font-bold text-[#FF6B00]"
                    >
                      All Projects Portfolio →
                    </Link>
                  </div>
                )}
              </div>

              <NavLink
                to="/gallery"
                className={({ isActive }) =>
                  `py-2.5 px-3 text-sm font-bold tracking-wide rounded-md transition-colors flex items-center justify-between ${
                    isActive ? 'text-[#FF6B00] bg-orange-50/70 font-black' : 'text-[#0F172A] hover:text-[#FF6B00]'
                  }`
                }
              >
                <span>GALLERY</span>
              </NavLink>

              <NavLink
                to="/career"
                className={({ isActive }) =>
                  `py-2.5 px-3 text-sm font-bold tracking-wide rounded-md transition-colors flex items-center justify-between ${
                    isActive ? 'text-[#FF6B00] bg-orange-50/70 font-black' : 'text-[#0F172A] hover:text-[#FF6B00]'
                  }`
                }
              >
                <span>CAREER</span>
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `py-2.5 px-3 text-sm font-bold tracking-wide rounded-md transition-colors flex items-center justify-between ${
                    isActive ? 'text-[#FF6B00] bg-orange-50/70 font-black' : 'text-[#0F172A] hover:text-[#FF6B00]'
                  }`
                }
              >
                <span>CONTACT US</span>
              </NavLink>
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-200 flex flex-col gap-2.5">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] text-white font-bold text-sm rounded-lg"
              >
                <span>WhatsApp: {siteConfig.whatsAppDisplay}</span>
              </a>

              <a
                href={`tel:${siteConfig.phoneDisplay}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 border-2 border-[#0F172A] text-[#0F172A] font-bold text-sm rounded-lg"
              >
                <Phone className="w-4 h-4 text-[#F4511E]" />
                <span>Call Hotline: {siteConfig.phoneDisplay}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-3 bg-[#D6A548] text-[#0F172A] font-extrabold text-sm uppercase tracking-wider rounded-lg shadow"
              >
                Request Official Project Quote
              </button>

              <Link
                to="/internal/portal"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs text-neutral-600 hover:text-neutral-900 border border-neutral-200 bg-neutral-50 rounded-lg mt-1 font-semibold transition-colors"
              >
                <Lock className="w-3.5 h-3.5 text-amber-500" />
                <span>Staff & Owner Portal (Internal Access)</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
