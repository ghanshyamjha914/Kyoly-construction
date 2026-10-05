import React, { useState } from 'react';
import { useConstructionDocuments } from '../context/ConstructionDocumentsContext';
import { X, BookOpen, ShieldCheck, Search, ExternalLink, Filter } from 'lucide-react';

interface BuildingStandardsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BuildingStandardsModal: React.FC<BuildingStandardsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { buildingStandards } = useConstructionDocuments();
  const [search, setSearch] = useState('');
  const [filterMandatory, setFilterMandatory] = useState<string>('all');

  if (!isOpen) return null;

  const filtered = buildingStandards.filter((std) => {
    const matchesSearch =
      std.codeOrStandard.toLowerCase().includes(search.toLowerCase()) ||
      std.reference.toLowerCase().includes(search.toLowerCase()) ||
      std.applicableTo.toLowerCase().includes(search.toLowerCase()) ||
      std.remarks.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filterMandatory === 'all'
        ? true
        : filterMandatory === 'mandatory'
        ? std.isMandatory
        : !std.isMandatory;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#0B0F19] text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center border border-[#FF6B00]/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">
                Nepal Building Codes & Municipal Standards Reference
              </h2>
              <p className="text-xs text-neutral-400">
                Official Department of Urban Development & Building Construction (DUDBC) & MoFAGA Bye-laws
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-neutral-200 bg-neutral-50 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search code (e.g., NBC 105, seismic, RCC, setback)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-white border border-neutral-300 rounded-xl text-xs focus:outline-hidden focus:border-[#FF6B00]"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-500 font-medium">Filter:</span>
            <select
              value={filterMandatory}
              onChange={(e) => setFilterMandatory(e.target.value)}
              className="px-3 py-1.5 bg-white border border-neutral-300 rounded-xl text-xs font-semibold"
            >
              <option value="all">All Standards ({buildingStandards.length})</option>
              <option value="mandatory">Mandatory Codes Only</option>
              <option value="guidelines">Guidelines / Voluntary</option>
            </select>
          </div>
        </div>

        {/* List of Standards */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 bg-neutral-50/50">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-neutral-500 text-xs">
              No matching standards found for &quot;{search}&quot;.
            </div>
          ) : (
            filtered.map((std) => (
              <div
                key={std.id}
                className="bg-white p-4 rounded-xl border border-neutral-200 hover:border-[#FF6B00] transition-colors shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[#0F172A]">{std.codeOrStandard}</span>
                    <span className="text-xs text-neutral-500 font-mono">({std.version})</span>
                    {std.isMandatory ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                        Mandatory
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-neutral-100 text-neutral-600">
                        Guideline
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-neutral-400 font-mono">Source: {std.source}</span>
                </div>

                <h4 className="text-xs font-bold text-neutral-900 mt-1">{std.reference}</h4>
                <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{std.remarks}</p>

                <div className="mt-2 pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
                  <span>Applicable to: <strong className="text-neutral-700">{std.applicableTo}</strong></span>
                  <span>Effective: {std.lastUpdated}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-white px-6 py-3 border-t border-neutral-200 flex justify-between items-center shrink-0 text-xs text-neutral-500">
          <span>Official standard reference for Kyoly Construction document generation.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
