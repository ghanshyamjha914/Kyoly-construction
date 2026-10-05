import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Zap,
  Building2,
  Users,
  CheckCircle,
  FileCheck,
  Target,
  Compass,
  ArrowRight,
  Phone,
  HardHat,
  Scale,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { KyolyLogo } from '../components/KyolyLogo';
import { EngineeringVisual } from '../components/EngineeringVisual';
import { siteConfig, getWhatsAppUrl } from '../config/siteConfig';
import aboutLogoImg from '../assets/images/kyoly-original-logo.png';

interface AboutPageProps {
  onOpenQuote: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuote }) => {
  // Core Values as requested in prompt
  const coreValues = [
    {
      title: 'Safety First (Zero Harm)',
      desc: 'Ensuring rigorous safety protocols, live-line electrical precautions, and full PPE compliance on every site.',
      icon: ShieldCheck,
      color: '#1E3A8A',
    },
    {
      title: 'Engineering Rigor',
      desc: 'Data-driven seismic calculations, geotechnical profiling, and strict adherence to NBC-105:2020 codes.',
      icon: Scale,
      color: '#D6A548',
    },
    {
      title: 'Integrity & Transparency',
      desc: 'Transparent estimation, precise itemized BOQ execution, and honest client communication without hidden costs.',
      icon: HeartHandshake,
      color: '#F4511E',
    },
    {
      title: 'National Infrastructure Impact',
      desc: 'Committed to powering Nepalese communities and building resilient civil lifelines that endure for generations.',
      icon: Award,
      color: '#1E3A8A',
    },
  ];

  // Optional Team Section with editable sample content & replaceable photos
  const teamMembers = [
    {
      name: 'Er. Ghanshyam Jha',
      role: 'Managing Director & Lead Engineering Executive',
      credentials: 'B.E. Civil / M.Sc. Structural Engineering · NEC Regd.',
      bio: '16+ years directing high-voltage transmission lines, substation switchyards, and commercial infrastructure contracts across Nepal.',
    },
    {
      name: 'Er. R. K. Shrestha',
      role: 'Chief Electrical Projects Engineer',
      credentials: 'B.E. Electrical & Electronics · Power Systems Specialist',
      bio: 'Former utility substation consultant specializing in 132kV/33kV outdoor switchyard testing and SCADA telemetry integration.',
    },
    {
      name: 'Er. Sunita Acharya',
      role: 'Head of Structural Design & Estimation',
      credentials: 'M.Sc. Earthquake Engineering · NBC-105 Code Auditor',
      bio: 'Leads structural ETABS seismic modeling, rate analysis, and Government of Nepal tender BOQ preparations.',
    },
    {
      name: 'Dipendra Chaudhary',
      role: 'General Manager of Field Operations & HSE',
      credentials: 'Certified High-Voltage Safety Officer · OSHA / Nepal Labor Act',
      bio: 'Supervises heavy plant mobilization, derrick crane erection teams, and Zero-Harm safety adherence on all live construction sites.',
    },
  ];

  const waUrl = getWhatsAppUrl('Hello Kyoly Construction, I visited your About Us page and would like to learn more about your company profile.');

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-[#0F172A] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b-4 border-[#D6A548] relative overflow-hidden">
        <div className="absolute inset-0 engineering-grid-dark opacity-60" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#D6A548]/15 border border-[#D6A548]/30 text-xs font-mono text-[#D6A548] uppercase tracking-wider">
              <span>COMPANY INTRODUCTION & PROFILE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-['Outfit'] tracking-tight text-white">
              About Kyoly Construction
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              Kyoly Construction Private Limited is dedicated to shaping Nepal’s modernization through resilient civil structures, reliable high-voltage electrical networks, and uncompromising technical craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* 1. Company Introduction & Profile */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Introduction Prose */}
            <div className="lg:col-span-7 space-y-6">
              <SectionHeading
                kicker="Who We Are"
                title="Company Introduction & Profile"
                subtitle="Bridging the gap between heavy civil infrastructure and specialized high-voltage electrical power grids."
              />

              <div className="prose text-sm text-slate-700 leading-relaxed space-y-4">
                <p>
                  <strong>KYOLY CONSTRUCTION PRIVATE LIMITED</strong> was established in Nepal to answer the growing national need for disciplined, multidisciplinary engineering contractors capable of executing complex civil and electrical infrastructure in challenging topographies.
                </p>
                <p>
                  Unlike fragmented contracting models where civil structural works and electrical systems are outsourced to disparate vendors, Kyoly Construction delivers single-point turnkey accountability. Our in-house engineers manage everything from geotechnical soil profiling, deep chimney foundations, and seismic concrete structures to high-voltage substation switchyards and transmission line stringing up to 400kV.
                </p>
                <p>
                  With corporate headquarters located in <strong>Buddhanagar-10, New Baneshwor, Kathmandu</strong>, our mobile technical crews are deployed across projects in the Terai plains, mid-hill corridors, and rugged river gorges throughout Nepal.
                </p>
              </div>

              {/* Profile Registration Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3">
                <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-neutral-200">
                  <div className="text-xs font-bold text-[#1E3A8A] uppercase font-mono">Government Regd.</div>
                  <div className="text-sm font-bold text-[#0F172A] mt-0.5">Govt. of Nepal</div>
                  <div className="text-[11px] text-slate-500">Regd. No. {siteConfig.registrationNumber}</div>
                </div>

                <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-neutral-200">
                  <div className="text-xs font-bold text-[#D6A548] uppercase font-mono">Seismic Code</div>
                  <div className="text-sm font-bold text-[#0F172A] mt-0.5">NBC-105:2020</div>
                  <div className="text-[11px] text-slate-500">National Building Code</div>
                </div>

                <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-neutral-200">
                  <div className="text-xs font-bold text-[#F4511E] uppercase font-mono">Licensed</div>
                  <div className="text-sm font-bold text-[#0F172A] mt-0.5">NEC Certified</div>
                  <div className="text-[11px] text-slate-500">Nepal Engineering Council</div>
                </div>
              </div>
            </div>

            {/* Right Column: Profile Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-neutral-200 bg-[#F8FAFC] p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-xs">
                <div className="absolute top-0 right-0 w-36 h-36 engineering-diagonal-pattern opacity-20" />
                <KyolyLogo size="lg" customSrc={aboutLogoImg} />

                <div className="space-y-3 pt-3 border-t border-neutral-200 text-xs text-slate-700">
                  <div><strong>Company Name:</strong> Kyoly Construction Pvt. Ltd.</div>
                  <div><strong>Corporate Office:</strong> {siteConfig.headOffice}</div>
                  {siteConfig.regionalOffice && (
                    <div><strong>Regional Office:</strong> {siteConfig.regionalOffice}</div>
                  )}
                  <div><strong>Hotline / WhatsApp:</strong> <a href={`tel:${siteConfig.phoneDisplay}`} className="text-[#1E3A8A] font-bold">{siteConfig.phoneDisplay}</a></div>
                  <div><strong>Official Email:</strong> {siteConfig.email}</div>
                  <div><strong>Specialization:</strong> Transmission Lines, Substations, Building Design & Civil Works</div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-neutral-200 flex items-center justify-between">
                  <div className="text-xs text-slate-500">Want to discuss a tender?</div>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#25D366] hover:underline"
                  >
                    Chat on WhatsApp →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 & 3. Vision & Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] border-y border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            kicker="Our Purpose"
            title="Vision & Mission"
            subtitle="The core principles driving our engineers across every site in Nepal."
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Vision Card */}
            <div className="p-8 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1E3A8A] text-white flex items-center justify-center">
                <Compass className="w-6 h-6 text-[#D6A548]" />
              </div>
              <h3 className="text-2xl font-bold font-['Outfit'] text-[#0F172A]">
                Our Vision
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To stand as Nepal’s most respected and technologically proficient turnkey engineering contractor for high-voltage power transmission, electrical substation automation, and high-performance civil structures.
              </p>
            </div>

            {/* Mission Card */}
            <div className="p-8 rounded-2xl bg-white border border-neutral-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#0F172A] text-white flex items-center justify-center">
                <Target className="w-6 h-6 text-[#F4511E]" />
              </div>
              <h3 className="text-2xl font-bold font-['Outfit'] text-[#0F172A]">
                Our Mission
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To engineer and construct durable civil infrastructure and reliable electrical power networks that uplift Nepalese communities, safeguard investments with earthquake-resilient standards, and accelerate national progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            kicker="Guiding Principles"
            title="Our Core Values"
            subtitle="The ethical and technical standards that guide every blueprint, weld, concrete pour, and grid synchronization."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-neutral-200 bg-white shadow-xs hover:border-[#D6A548] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white"
                      style={{ backgroundColor: val.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold font-['Outfit'] text-[#0F172A] mb-2">
                      {val.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] font-bold text-[#1E3A8A]">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Non-Negotiable</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Optional Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] border-t border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            kicker="Leadership & Governance"
            title="Our Engineering Team"
            subtitle="Led by certified Nepalese civil structural and electrical power engineers with decades of field leadership."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((person, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-neutral-200 p-6 flex flex-col justify-between shadow-xs hover:border-[#D6A548] transition-colors group"
              >
                <div>
                  <div className="w-14 h-14 rounded-full bg-[#0F172A] text-[#D6A548] flex items-center justify-center font-bold text-lg mb-4 group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors">
                    <HardHat className="w-7 h-7" />
                  </div>

                  <h3 className="text-base font-bold font-['Outfit'] text-[#0F172A] mb-1">
                    {person.name}
                  </h3>

                  <div className="text-xs font-semibold text-[#F4511E] mb-2">
                    {person.role}
                  </div>

                  <div className="text-[11px] font-mono text-slate-500 mb-3 bg-slate-100 px-2 py-1 rounded inline-block">
                    {person.credentials}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {person.bio}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>NEC Registered</span>
                  <span className="font-mono text-[10px]">Editable Sample</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <span className="text-xs text-slate-400 font-mono">
              Team section content and photographs can be customized or replaced with official portraits.
            </span>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#0F172A] py-16 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-black font-['Outfit']">
            Partner With Kyoly Construction On Your Next Project
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            From preliminary design and government tender estimations to full turnkey execution, our team is equipped to deliver.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenQuote}
              className="px-7 py-3 bg-[#D6A548] hover:bg-[#c99539] text-[#0F172A] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              Request Project Proposal
            </button>
            <Link
              to="/contact"
              className="px-7 py-3 bg-[#1E3A8A] hover:bg-[#152a65] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
            >
              Contact Our Offices
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
