import React from 'react';
import { KyolyLogo } from '../../../components/KyolyLogo';
import { LegalDisclaimerBox } from './LegalDisclaimerBox';

interface DocumentPrintHeaderProps {
  title: string;
  docNumber: string;
  projectName: string;
  projectCode?: string;
  date: string;
  revision: string;
  status: string;
}

export const DocumentPrintHeader: React.FC<DocumentPrintHeaderProps> = ({
  title,
  docNumber,
  projectName,
  projectCode,
  date,
  revision,
  status,
}) => {
  return (
    <div className="border-b-2 border-neutral-900 pb-5 mb-6">
      {/* Top Banner with Company Identity */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <KyolyLogo size="md" />
          <div>
            <h1 className="text-xl font-black font-['Outfit'] text-[#0F172A] tracking-tight uppercase">
              KYOLY CONSTRUCTION PVT. LTD.
            </h1>
            <p className="text-xs text-[#FF6B00] font-bold tracking-wider uppercase font-mono">
              Construction & Infrastructure Engineering Division
            </p>
            <p className="text-[10px] text-neutral-500 font-mono">
              Reg. No: 343834/080/081 · PAN: 620155829 · Buddhanagar-10, New Baneshwor, Kathmandu, Nepal
            </p>
          </div>
        </div>

        <div className="text-right sm:border-l sm:pl-4 border-neutral-200">
          <div className="text-[10px] font-mono text-neutral-500 uppercase">Document Ref No.</div>
          <div className="text-sm font-black font-mono text-[#0F172A]">{docNumber}</div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase mt-1 bg-neutral-100 text-neutral-800 border border-neutral-300">
            <span>Status:</span>
            <span className="text-[#FF6B00]">{status}</span>
            <span>·</span>
            <span>{revision}</span>
          </div>
        </div>
      </div>

      {/* Document Title & Associated Project Meta */}
      <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-black font-['Outfit'] text-[#0F172A]">
            {title}
          </h2>
          <div className="text-xs text-neutral-600 mt-0.5">
            <strong>Project:</strong> {projectName} {projectCode ? `(${projectCode})` : ''}
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-neutral-600 shrink-0">
          <div>
            <span className="text-neutral-400">Issue Date: </span>
            <strong>{date}</strong>
          </div>
          <div>
            <span className="text-neutral-400">Revision: </span>
            <strong>{revision}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface DocumentPrintHeaderFooterProps {
  docNumber: string;
  revision: string;
  date: string;
  docTitle: string;
  project?: { projectName: string; projectCode?: string };
  status: string;
}

export const DocumentPrintHeaderFooter: React.FC<DocumentPrintHeaderFooterProps> = ({
  docNumber,
  revision,
  date,
  docTitle,
  project,
  status,
}) => {
  return (
    <DocumentPrintHeader
      title={docTitle}
      docNumber={docNumber}
      projectName={project?.projectName || 'Kyoly Project'}
      projectCode={project?.projectCode}
      date={date}
      revision={revision}
      status={status}
    />
  );
};

interface DocumentPrintFooterProps {
  docNumber: string;
  revision: string;
  date: string;
  preparedBy?: string;
  approvedBy?: string;
}

export const DocumentPrintFooter: React.FC<DocumentPrintFooterProps> = ({
  docNumber,
  revision,
  date,
  preparedBy,
  approvedBy,
}) => {
  return (
    <div className="mt-8 pt-4 border-t-2 border-neutral-300 space-y-4">
      {/* Signature & Sign-off Table */}
      {(preparedBy || approvedBy) && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 border-b border-neutral-200 text-xs">
          <div>
            <div className="text-[10px] font-mono uppercase text-neutral-400">Prepared By</div>
            <div className="font-bold text-neutral-800 mt-1">{preparedBy || 'Site Engineer'}</div>
            <div className="mt-6 border-t border-neutral-400/60 pt-1 text-[10px] text-neutral-400">Signature & Date</div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-neutral-400">Checked / Verified By</div>
            <div className="font-bold text-neutral-800 mt-1">Project Technical Lead</div>
            <div className="mt-6 border-t border-neutral-400/60 pt-1 text-[10px] text-neutral-400">Signature & Date</div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-neutral-400">Reviewed By</div>
            <div className="font-bold text-neutral-800 mt-1">Consulting Architect / Eng.</div>
            <div className="mt-6 border-t border-neutral-400/60 pt-1 text-[10px] text-neutral-400">Signature & Date</div>
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-neutral-400">Approved By (Client / Owner)</div>
            <div className="font-bold text-neutral-800 mt-1">{approvedBy || 'Authorized Signatory'}</div>
            <div className="mt-6 border-t border-neutral-400/60 pt-1 text-[10px] text-neutral-400">Signature & Date</div>
          </div>
        </div>
      )}

      {/* Mandatory Statutory Legal Disclaimer */}
      <LegalDisclaimerBox printable />

      {/* Bottom Microstrip */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-neutral-400 pt-2 border-t border-neutral-200">
        <div>
          <span>KYOLY CONSTRUCTION PVT. LTD. · {docNumber} · {revision} · {date}</span>
        </div>
        <div>
          <span>Kyoly Engineering Document Management System · Page 1 of 1</span>
        </div>
      </div>
    </div>
  );
};
