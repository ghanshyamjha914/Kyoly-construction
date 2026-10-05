import React from 'react';
import {
  X,
  GitBranch,
  CheckCircle2,
  Layers,
  Sparkles,
  ShieldCheck,
  FileText,
  Building2,
  Cpu,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { KyolyLogo } from './KyolyLogo';

interface VersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const versions = [
    {
      id: 'v1',
      tag: 'Version 01',
      title: 'Original Foundation',
      subtitle: 'Corporate Identity & Core Web Platform',
      status: 'Completed',
      date: 'Q1 2026',
      badgeColor: 'bg-neutral-800 text-neutral-200 border-neutral-700',
      icon: Building2,
      highlights: [
        'Corporate Identity: Kyoly Construction Pvt. Ltd. (Reg. No: 343834/080/081, PAN: 619934371)',
        'Engineering Accreditation: Nepal Engineering Council (NEC) and NBC 105:2020 seismic compliance framework',
        'Official Skyline Branding: Original high-resolution logo, color hierarchy (#FF6B00, #D6A548, #0B0F19)',
        'Public Structure: Home, About Us, Safety Policy, Careers, and Direct Contact Hub',
      ],
    },
    {
      id: 'v2',
      tag: 'Version 02',
      title: 'Services Updated',
      subtitle: 'Comprehensive Engineering & Infrastructure Divisions',
      status: 'Completed',
      date: 'Q1 2026',
      badgeColor: 'bg-blue-900/60 text-blue-200 border-blue-700',
      icon: Cpu,
      highlights: [
        'High-Voltage Transmission Lines (Up to 400kV, lattice towers, SAG tensioning)',
        'Power & Electrical Infrastructure (AIS/GIS substations, power transformers, SCADA)',
        'Building Design & Construction (Turnkey residential & commercial RCC structures)',
        'Civil & Infrastructure Works (Highways, retaining walls, slope stabilization)',
        'Engineering Design & Consultancy (NBC 205, NBC 105:2020 response spectrum)',
        'Dynamic sub-routing (/services/:serviceSlug) and interactive Quote & Tender Request Modal',
      ],
    },
    {
      id: 'v3',
      tag: 'Version 03',
      title: 'Projects Updated',
      subtitle: 'National Project Portfolio & Verification Registry',
      status: 'Completed',
      date: 'Q2 2026',
      badgeColor: 'bg-emerald-900/60 text-emerald-200 border-emerald-700',
      icon: Layers,
      highlights: [
        'Sanepa Heights Luxury Residence (Lalitpur - 12,500 sq.ft turnkey residence)',
        'Trishuli-Kathmandu 220kV Double Circuit Transmission Line (NEA contracted)',
        'Butwal Industrial Substation 132/33kV (Grid expansion & power automation)',
        'Biratnagar Commercial Hub (8-Story commercial earthquake-resistant complex)',
        'Pokhara Lakeside Eco-Resort & Convention Centre (Slope-engineered civil works)',
        'Categorized Project Gallery, high-resolution photography, and client completion records',
      ],
    },
    {
      id: 'v4',
      tag: 'Version 04',
      title: 'Construction Documents',
      subtitle: 'Confidential Enterprise Contract & Municipal Engineering Suite',
      status: 'Completed',
      date: 'Q2 2026',
      badgeColor: 'bg-amber-900/60 text-amber-200 border-amber-700',
      icon: FileText,
      highlights: [
        'Confidential Isolation: Completely removed from public menus; guarded by role-based auth gate',
        'Multi-Role Access (RBAC): Admin, Project Engineer, Quantity Surveyor, and Viewer',
        '11 Standard Document Engines: House Agreement, Labour Contract, Subcontract, BOQ & Quotation, Payment Schedule, Variation Order, Permit Tracking, Completion Certificate, Handover Record, and Expenses',
        'Nepal 7-Province / 77-District / 753-Local-Level Location DB with Historical Snapshot Protection',
        'Nepali Land Unit Calculator: Ropani-Aana-Paisa-Daam & Bigha-Kattha-Dhur',
        '13-Stage Municipal Building Permit Workflow: DUDBC/Municipality statutory checklist',
      ],
    },
    {
      id: 'v5',
      tag: 'Final Live Version',
      title: 'Final Live Version',
      subtitle: 'Unified Production Release & Enterprise Deployment',
      status: 'Live & Active',
      date: 'Current Release',
      badgeColor: 'bg-[#FF6B00] text-white border-orange-400 font-black',
      icon: Sparkles,
      highlights: [
        'Seamless Integration: Dual-mode architecture uniting public web presence and secure private portal',
        'High-Resolution Branding: Enlarged Kyoly logo scale across desktop, mobile, modals, and headers',
        'Triple Discreet Portal Access: Header utility bar, navigation lock icon, footer bar, and mobile drawer',
        'Production Verified: Zero TypeScript compile errors, responsive Tailwind layout, and fast dev server',
        'Client-Ready: Prepared for direct client quotes, municipal permit tracking, and contractor operations',
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#0F172A] text-white rounded-2xl shadow-2xl border border-neutral-700 overflow-hidden max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-[#0B0F19] px-6 py-4.5 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <KyolyLogo variant="dark" size="sm" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold font-['Outfit'] text-white">
                  Kyoly Construction Architecture & Version Evolution
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FF6B00] text-white uppercase tracking-wider">
                  Live Production
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Kyoly Construction Pvt. Ltd. · Technical Release History & System Structure
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* ASCII / Tree View Representation */}
          <div className="bg-[#050811] p-4.5 rounded-xl border border-neutral-800 font-mono text-xs">
            <div className="text-amber-400 font-bold mb-2 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-[#FF6B00]" />
              <span>SYSTEM RELEASE TREE</span>
            </div>
            <pre className="text-neutral-300 leading-relaxed overflow-x-auto text-[11px] sm:text-xs">
{`Kyoly Construction Website
│
├── Version 01 - Original                    [Company Profile, Accreditation, Core Pages]
├── Version 02 - Services Updated            [Transmission Lines, Substations, Buildings, Civil Works]
├── Version 03 - Projects Updated            [Portfolio Registry, Gallery, Landmark Projects]
├── Version 04 - Construction Documents      [Private Enterprise Portal, Contracts, BOQ, Permits]
└── Final Live Version                       [Current Production Build, High-Res Branding, Live System]`}
            </pre>
          </div>

          {/* Version Breakdown Cards */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Detailed Version Specifications</span>
            </h4>

            <div className="grid grid-cols-1 gap-3.5">
              {versions.map((ver, idx) => {
                const Icon = ver.icon;
                const isFinal = ver.id === 'v5';
                return (
                  <div
                    key={ver.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isFinal
                        ? 'bg-[#121B2E] border-[#FF6B00]/40 ring-1 ring-[#FF6B00]/20'
                        : 'bg-[#111827] border-neutral-800'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-neutral-800">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isFinal
                              ? 'bg-[#FF6B00] text-white shadow-md'
                              : 'bg-neutral-800 text-neutral-300'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{ver.title}</span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono border ${ver.badgeColor}`}
                            >
                              {ver.tag}
                            </span>
                          </div>
                          <span className="text-[11px] text-neutral-400">{ver.subtitle}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center">
                        <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-neutral-500" />
                          <span>{ver.date}</span>
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                            isFinal
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-neutral-800 text-neutral-300'
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>{ver.status}</span>
                        </span>
                      </div>
                    </div>

                    <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-neutral-300">
                      {ver.highlights.map((item, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] shrink-0 mt-1.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#0B0F19] px-6 py-3.5 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400 font-mono">
          <div>
            © 2026 Kyoly Construction Pvt. Ltd. · All Modules Operational
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-lg transition-colors cursor-pointer"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
