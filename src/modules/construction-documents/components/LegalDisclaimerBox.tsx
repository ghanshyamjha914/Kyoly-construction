import React, { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp, ShieldAlert } from 'lucide-react';

interface LegalDisclaimerBoxProps {
  compact?: boolean;
  printable?: boolean;
  documentType?: string;
}

export const LegalDisclaimerBox: React.FC<LegalDisclaimerBoxProps> = ({
  compact = false,
  printable = false,
  documentType,
}) => {
  const [expanded, setExpanded] = useState(!compact);

  if (printable) {
    return (
      <div className="mt-8 pt-4 border-t-2 border-neutral-300 text-[10px] text-neutral-600 leading-relaxed font-sans">
        <div className="font-bold uppercase tracking-wider text-neutral-800 mb-1 flex items-center gap-1.5">
          <span>LEGAL DISCLAIMER & COMPLIANCE NOTICE</span>
          <span className="text-[9px] font-normal text-neutral-500">
            (Template only – Verify current applicable laws, standards, approved drawings and authority requirements before use.)
          </span>
        </div>
        <p>
          This Construction Documents system is provided for document preparation, organization and administrative assistance only.
          It is not an official government permitting system and does not guarantee approval, legal validity, enforceability or regulatory compliance.
          Building permit requirements, municipal procedures, Nepal National Building Codes, standards, laws, regulations, fees and authority requirements
          may change or vary by project and jurisdiction. Users must verify current requirements with the relevant municipality, ward office,
          government authority and qualified professionals before submission, construction or execution of any agreement. Contracts and technical
          documents should be reviewed by an appropriately qualified legal professional, architect, engineer or other competent professional where appropriate.
          The latest applicable law, regulation, authority requirement, approved drawing and official decision shall prevail over this template.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-amber-300 bg-amber-50/70 p-4 text-xs text-amber-950 transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold uppercase tracking-wider text-amber-900 flex items-center gap-2">
              <span>Statutory Legal Disclaimer</span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-200/80 rounded text-amber-800 font-semibold">
                MoFAGA / NBC / Municipal Advisory
              </span>
            </div>
            <p className="text-[11px] text-amber-800 mt-0.5 font-medium">
              Template only – Verify current applicable laws, standards, approved drawings and authority requirements before use.
            </p>
          </div>
        </div>

        {compact && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-amber-800 hover:text-amber-950 p-1 rounded hover:bg-amber-100 transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1 shrink-0"
          >
            <span>{expanded ? 'Hide Details' : 'Read Notice'}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-amber-200/80 space-y-2 text-[11px] text-amber-900/90 leading-relaxed">
          <p>
            <strong>DISCLAIMER:</strong> This Construction Documents system is provided for document preparation, organization and
            administrative assistance only. It is not an official government permitting system and does not guarantee approval,
            legal validity, enforceability or regulatory compliance.
          </p>
          <p>
            Building permit requirements, municipal procedures, Nepal National Building Codes (NBC 105:2020 / NBC 105:2025, NBC 206:2024),
            standards, laws, regulations, fees and authority requirements may change or vary by project and jurisdiction.
          </p>
          <p>
            Users must verify current requirements with the relevant municipality, ward office, government authority and qualified
            professionals before submission, construction or execution of any agreement. Contracts and technical documents should be
            reviewed by an appropriately qualified legal professional, architect, engineer or other competent professional where appropriate.
          </p>
          <p className="font-semibold text-amber-950">
            The latest applicable law, regulation, authority requirement, approved drawing and official decision shall prevail over this template.
          </p>
        </div>
      )}
    </div>
  );
};
