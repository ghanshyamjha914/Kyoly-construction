import React from 'react';
import {
  X,
  Download,
  Printer,
  FileText,
  Building2,
  Calendar,
  MapPin,
  CheckCircle,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Mail,
  Phone,
} from 'lucide-react';
import { VacancyRecord } from '../config/vacancyConfig';
import { KyolyLogo } from './KyolyLogo';

interface OfficialNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  vacancy: VacancyRecord;
  onApplyClick: () => void;
}

export const OfficialNoticeModal: React.FC<OfficialNoticeModalProps> = ({
  isOpen,
  onClose,
  vacancy,
  onApplyClick,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadNotice = () => {
    // Generate an authentic downloadable text / printable notice file
    const noticeContent = `
================================================================================
                    KYOLY CONSTRUCTION PVT. LTD.
        Buddhanagar-10, New Baneshwor, Kathmandu, Nepal | Phone: ${vacancy.applyPhone}
              Company Reg. No: 343834/080/081 | Email: ${vacancy.applyEmail}
================================================================================
                      OFFICIAL VACANCY ANNOUNCEMENT
                          (Terms of Reference - TOR)
--------------------------------------------------------------------------------
Ref. No: ${vacancy.noticeRefNo || 'KCPL/HR/VAC-01/2026'}
Date of Publication: ${vacancy.publishedDate || 'October 05, 2026'}
Application Deadline: ${vacancy.deadline}

1. POSITION DETAILS:
   - Position Title:       ${vacancy.position}
   - Department:           ${vacancy.department}
   - Number of Vacancies:  ${vacancy.vacanciesCount}
   - Employment Type:      ${vacancy.employmentType}
   - Duty Station:         ${vacancy.location}

2. MINIMUM QUALIFICATIONS & EXPERIENCE:
   - Academic Qualification: ${vacancy.qualification}
   - Work Experience:        ${vacancy.experience}

3. JOB DESCRIPTION & SCOPE OF WORK:
   ${vacancy.description}

4. KEY RESPONSIBILITIES:
${vacancy.responsibilities.map((r, i) => `   ${i + 1}. ${r}`).join('\n')}

5. APPLICATION PROCEDURE:
   Interested and qualified candidates are requested to submit their updated
   Curriculum Vitae (CV / Resume) along with copy of Nepal Engineering Council (NEC)
   license and academic certificates via the Kyoly Online Careers Portal or by
   emailing directly to ${vacancy.applyEmail}.

   For inquiries, contact Kyoly HR Administration: ${vacancy.applyPhone}
================================================================================
Authorized Signatory:
Human Resources & Technical Recruitment Wing
Kyoly Construction Pvt. Ltd., Kathmandu, Nepal
================================================================================
`;
    const blob = new Blob([noticeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${vacancy.noticeAttachmentFileName || 'KYOLY-OFFICIAL-VACANCY-NOTICE-TOR-2026'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col border border-neutral-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Bar */}
        <div className="bg-neutral-900 text-white px-6 py-3.5 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 uppercase tracking-wider font-bold">
              Official Notice Attachment (TOR)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadNotice}
              className="px-3 py-1.5 bg-[#FF6B00] hover:bg-[#E04800] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Download notice document"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download TOR</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              title="Print document"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Document Paper Body */}
        <div className="overflow-y-auto p-6 sm:p-10 bg-[#FAFAFA] space-y-6">
          <div className="bg-white border-2 border-neutral-200 shadow-sm p-8 sm:p-10 rounded-xl relative">
            {/* Watermark Seal */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
              <span className="text-8xl font-black font-['Outfit'] rotate-[-30deg]">KYOLY</span>
            </div>

            {/* Document Header with Logo & Registration */}
            <div className="border-b-2 border-neutral-900 pb-5 mb-6 text-center space-y-1.5">
              <div className="flex justify-center mb-2">
                <KyolyLogo />
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-['Outfit'] tracking-tight text-[#0F172A] uppercase">
                Kyoly Construction Pvt. Ltd.
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                Buddhanagar-10, New Baneshwor, Kathmandu, Nepal · Reg. No: 343834/080/081
              </p>
              <p className="text-[11px] font-mono text-slate-500">
                Email: {vacancy.applyEmail} · Phone: {vacancy.applyPhone}
              </p>
            </div>

            {/* Document Meta Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono border-b border-neutral-200 pb-3 mb-6">
              <div>
                <span className="text-slate-500">Ref. No: </span>
                <strong className="text-[#0F172A]">{vacancy.noticeRefNo || 'KCPL/HR/VAC-01/2026'}</strong>
              </div>
              <div>
                <span className="text-slate-500">Published: </span>
                <strong className="text-[#0F172A]">{vacancy.publishedDate || 'October 05, 2026'}</strong>
              </div>
              <div>
                <span className="text-slate-500">Deadline: </span>
                <strong className="text-[#FF6B00]">{vacancy.deadline}</strong>
              </div>
            </div>

            {/* Title */}
            <div className="text-center my-6">
              <div className="inline-block px-4 py-1 rounded bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-xs font-mono font-bold text-[#FF6B00] uppercase tracking-wider mb-2">
                Vacancy Announcement · Terms of Reference (TOR)
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-['Outfit'] text-[#0F172A]">
                {vacancy.position}
              </h3>
              <p className="text-xs text-slate-600 font-semibold mt-1">
                {vacancy.department} · {vacancy.employmentType} ({vacancy.vacanciesCount} Opening)
              </p>
            </div>

            {/* Overview / Scope */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div>
                <h4 className="font-bold text-[#0F172A] uppercase tracking-wider text-xs font-mono mb-1">
                  1. Organization & Project Scope
                </h4>
                <p className="text-slate-600">{vacancy.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-[#0F172A] uppercase tracking-wider text-xs font-mono mb-1">
                  2. Duty Station & Work Location
                </h4>
                <p className="text-slate-600">{vacancy.location}</p>
              </div>

              <div>
                <h4 className="font-bold text-[#0F172A] uppercase tracking-wider text-xs font-mono mb-1">
                  3. Minimum Qualification & Competencies
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li><strong>Academic:</strong> {vacancy.qualification}</li>
                  <li><strong>Experience:</strong> {vacancy.experience}</li>
                  <li><strong>Statutory:</strong> Valid registration with Nepal Engineering Council (NEC).</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#0F172A] uppercase tracking-wider text-xs font-mono mb-1">
                  4. Key Responsibilities & Duties (TOR)
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  {vacancy.responsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#0F172A] uppercase tracking-wider text-xs font-mono mb-1">
                  5. Submission of Application with Attachments
                </h4>
                <p className="text-slate-600">
                  Interested candidates conforming to the above qualifications should submit an application
                  with their updated Curriculum Vitae (CV) and academic credentials via the online recruitment
                  portal below or by email to <strong className="text-[#0F172A]">{vacancy.applyEmail}</strong> on or before <strong className="text-[#FF6B00]">{vacancy.deadline}</strong>.
                </p>
              </div>
            </div>

            {/* Official Sign-off Stamp Box */}
            <div className="pt-8 mt-6 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="text-xs text-slate-500 space-y-1">
                <div className="font-bold text-slate-800">Kyoly Construction Pvt. Ltd.</div>
                <div>Human Resources & Technical Recruitment Wing</div>
                <div className="text-[11px] font-mono">Verified Digital Notice · Attachment Ref: {vacancy.noticeAttachmentFileName}</div>
              </div>

              {/* Stamp Graphic */}
              <div className="border-2 border-dashed border-[#FF6B00]/70 rounded-xl p-3 text-center w-48 text-[11px] text-[#FF6B00] font-mono uppercase bg-[#FF6B00]/5 shrink-0">
                <div className="font-black">OFFICIAL HR SEAL</div>
                <div className="text-[9px] text-slate-500">KYOLY CONSTRUCTION PVT. LTD.</div>
                <div className="text-[9px] text-emerald-600 font-bold">STATUS: VACANCY OPEN</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-white px-6 py-4 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Official verified vacancy announcement of Kyoly Construction Pvt. Ltd.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              Close Notice
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onApplyClick();
              }}
              className="px-6 py-2.5 bg-[#FF6B00] hover:bg-[#E04800] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Attach CV & Apply Now</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
