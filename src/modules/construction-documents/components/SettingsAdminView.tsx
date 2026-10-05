import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Database,
  ShieldCheck,
  BookOpen,
  UserCheck,
  Lock,
  KeyRound,
  FileSpreadsheet,
  Upload,
  Download,
  AlertTriangle,
  History,
  CheckCircle2,
  GitBranch,
  Layers,
  Sparkles,
} from 'lucide-react';

interface SettingsAdminViewProps {
  onOpenLocationManagement: () => void;
  onOpenBuildingStandards: () => void;
  onOpenAuditLog: () => void;
}

export const SettingsAdminView: React.FC<SettingsAdminViewProps> = ({
  onOpenLocationManagement,
  onOpenBuildingStandards,
  onOpenAuditLog,
}) => {
  const { currentUser, authNotice } = useAuth();

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-neutral-900 text-base">Internal System & Access Control Settings</h3>
              <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#FF6B00]/10 text-[#FF6B00]">
                Admin Configuration
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-1 max-w-2xl">
              Manage master Nepal location hierarchies, inspect role-based access control (RBAC), and review statutory national building standards.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. Master Location Database Admin */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center border border-emerald-500/20">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-neutral-900">Nepal Location Database</h4>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                Authoritative MoFAGA administrative master hierarchy across all 7 Provinces, 77 Districts, and local levels.
              </p>
            </div>

            <div className="pt-2 space-y-1.5 text-xs text-neutral-600 font-mono">
              <div className="flex justify-between">
                <span>Coverage:</span>
                <strong className="text-neutral-900">All 7 Provinces & 77 Districts</strong>
              </div>
              <div className="flex justify-between">
                <span>Local Levels:</span>
                <strong className="text-neutral-900">753 Municipalities & RMs</strong>
              </div>
              <div className="flex justify-between">
                <span>Historical Snapshots:</span>
                <strong className="text-emerald-600">Protected (Never Cascaded)</strong>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="button"
              onClick={onOpenLocationManagement}
              className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Manage Location Master DB</span>
            </button>
          </div>
        </div>

        {/* 2. Role-Based Access Control (RBAC) */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center border border-blue-500/20">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-neutral-900">Role & User Permissions (RBAC)</h4>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                Multi-role access barrier. Enforces confidentiality separation between site engineers, cost estimators, and administrators.
              </p>
            </div>

            <div className="pt-2 space-y-1.5 text-xs text-neutral-600 font-mono">
              <div className="flex justify-between">
                <span>Current Active User:</span>
                <strong className="text-neutral-900">{currentUser?.fullName}</strong>
              </div>
              <div className="flex justify-between">
                <span>Assigned Role:</span>
                <strong className="text-[#FF6B00]">{currentUser?.role}</strong>
              </div>
              <div className="flex justify-between">
                <span>Session Storage:</span>
                <strong className="text-blue-600">Encrypted Token Isolated</strong>
              </div>
            </div>
          </div>

          <div className="pt-6 space-y-2">
            <button
              type="button"
              onClick={onOpenAuditLog}
              className="w-full py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <History className="w-4 h-4 text-purple-600" />
              <span>Inspect Security Audit Logs</span>
            </button>
          </div>
        </div>

        {/* 3. Statutory Building Standards (NBC) */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00] flex items-center justify-center border border-[#FF6B00]/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-neutral-900">Nepal Building Standards</h4>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                National Building Code NBC-105:2020 seismic provisions, setbacks, ground coverage limits, and FAR calculations.
              </p>
            </div>

            <div className="pt-2 space-y-1.5 text-xs text-neutral-600 font-mono">
              <div className="flex justify-between">
                <span>Seismic Code:</span>
                <strong className="text-neutral-900">NBC 105:2020 Mandatory</strong>
              </div>
              <div className="flex justify-between">
                <span>Municipal Bye-Laws:</span>
                <strong className="text-neutral-900">DUDBC / MoFAGA 2074</strong>
              </div>
              <div className="flex justify-between">
                <span>Compliance Checker:</span>
                <strong className="text-emerald-600">Integrated in Permits</strong>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="button"
              onClick={onOpenBuildingStandards}
              className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#FF6B00]" />
              <span>Open NBC Codes Reference</span>
            </button>
          </div>
        </div>
      </div>

      {/* Role Permission Matrix Card */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#FF6B00]" />
            <h4 className="font-bold text-neutral-900 text-sm">Role-Based Access Control (RBAC) Matrix</h4>
          </div>
          <span className="text-xs text-neutral-500 font-mono">Pluggable backend OAuth / JWT / Firebase Ready</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#0B0F19] text-white uppercase text-[11px] font-bold">
              <tr>
                <th className="px-4 py-3">Role Name</th>
                <th className="px-4 py-3">Authorized Scope</th>
                <th className="px-4 py-3">Agreements & Permits</th>
                <th className="px-4 py-3">BOQ & Rates</th>
                <th className="px-4 py-3">Location DB Admin</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              <tr className="hover:bg-neutral-50">
                <td className="px-4 py-3 font-bold text-amber-800 bg-amber-50/50">ADMIN</td>
                <td className="px-4 py-3 text-neutral-700">Managing Director & System Administrator</td>
                <td className="px-4 py-3 text-emerald-600 font-semibold">Full Create / Edit / Delete</td>
                <td className="px-4 py-3 text-emerald-600 font-semibold">Full Create / Edit / Delete</td>
                <td className="px-4 py-3 text-emerald-600 font-semibold">Master Admin Access</td>
                <td className="px-4 py-3 text-center">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                    Active
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-neutral-50">
                <td className="px-4 py-3 font-bold text-blue-800 bg-blue-50/50">PROJECT_ENGINEER</td>
                <td className="px-4 py-3 text-neutral-700">Lead Civil & Structural Site Engineers</td>
                <td className="px-4 py-3 text-emerald-600 font-semibold">Create / Edit Agreements & Permits</td>
                <td className="px-4 py-3 text-neutral-600">Read & Estimate Only</td>
                <td className="px-4 py-3 text-neutral-400">View Only</td>
                <td className="px-4 py-3 text-center">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-100 text-blue-800">
                    Active
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-neutral-50">
                <td className="px-4 py-3 font-bold text-purple-800 bg-purple-50/50">QUANTITY_SURVEYOR</td>
                <td className="px-4 py-3 text-neutral-700">Head of Estimation & Rate Analysis</td>
                <td className="px-4 py-3 text-neutral-600">Read Contracts Only</td>
                <td className="px-4 py-3 text-emerald-600 font-semibold">Full BOQ & Payment Schedules</td>
                <td className="px-4 py-3 text-neutral-400">View Only</td>
                <td className="px-4 py-3 text-center">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-100 text-purple-800">
                    Active
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-neutral-50">
                <td className="px-4 py-3 font-bold text-neutral-700 bg-neutral-50">VIEWER</td>
                <td className="px-4 py-3 text-neutral-700">Client / Internal Auditor (Confidential)</td>
                <td className="px-4 py-3 text-neutral-500">Read-Only</td>
                <td className="px-4 py-3 text-neutral-500">Read-Only</td>
                <td className="px-4 py-3 text-neutral-400">Restricted</td>
                <td className="px-4 py-3 text-center">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-neutral-100 text-neutral-700">
                    Ready
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Kyoly Construction Platform Architecture & Version Evolution */}
      <div className="bg-[#0B0F19] text-white rounded-2xl p-6 border border-neutral-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/30 flex items-center justify-center">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Kyoly Construction Platform Evolution</h4>
              <p className="text-xs text-neutral-400">
                Official release milestones and multi-version architectural roadmap
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Final Live Version Active</span>
            </span>
          </div>
        </div>

        {/* Visual Release Tree */}
        <div className="p-4 bg-[#050811] rounded-xl border border-neutral-800/80 font-mono text-xs">
          <div className="text-amber-400 font-bold mb-2">SYSTEM TREE:</div>
          <pre className="text-neutral-300 leading-relaxed overflow-x-auto text-[11px] sm:text-xs">
{`Kyoly Construction Website
│
├── Version 01 - Original
├── Version 02 - Services Updated
├── Version 03 - Projects Updated
├── Version 04 - Construction Documents
└── Final Live Version`}
          </pre>
        </div>

        {/* Milestone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono text-neutral-400 uppercase font-bold">Release 1.0</div>
              <div className="font-bold text-neutral-200 mt-1">Version 01 - Original</div>
              <div className="text-[11px] text-neutral-400 mt-1 leading-snug">
                Company profile, NEC accreditation, original skyline branding & core public pages.
              </div>
            </div>
            <div className="mt-3 text-[10px] font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Deployed</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono text-neutral-400 uppercase font-bold">Release 2.0</div>
              <div className="font-bold text-neutral-200 mt-1">Version 02 - Services Updated</div>
              <div className="text-[11px] text-neutral-400 mt-1 leading-snug">
                Transmission lines, substations, building construction, civil engineering & quote modal.
              </div>
            </div>
            <div className="mt-3 text-[10px] font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Deployed</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono text-neutral-400 uppercase font-bold">Release 3.0</div>
              <div className="font-bold text-neutral-200 mt-1">Version 03 - Projects Updated</div>
              <div className="text-[11px] text-neutral-400 mt-1 leading-snug">
                National infrastructure portfolio (Sanepa, Trishuli 220kV, Butwal, Biratnagar) & gallery.
              </div>
            </div>
            <div className="mt-3 text-[10px] font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Deployed</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono text-neutral-400 uppercase font-bold">Release 4.0</div>
              <div className="font-bold text-neutral-200 mt-1">Version 04 - Documents</div>
              <div className="text-[11px] text-neutral-400 mt-1 leading-snug">
                Private auth portal, 11 document engines (Agreements, BOQ, Permits, Payments) & 753 Local Level DB.
              </div>
            </div>
            <div className="mt-3 text-[10px] font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Deployed</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#121B2E] border border-[#FF6B00]/50 ring-1 ring-[#FF6B00]/30 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono text-[#FF6B00] uppercase font-bold">Production</div>
              <div className="font-bold text-white mt-1">Final Live Version</div>
              <div className="text-[11px] text-neutral-300 mt-1 leading-snug">
                Unified live deployment, enlarged skyline branding, responsive mobile UX & secure vault.
              </div>
            </div>
            <div className="mt-3 text-[10px] font-black text-amber-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#FF6B00]" />
              <span>Active in Production</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
