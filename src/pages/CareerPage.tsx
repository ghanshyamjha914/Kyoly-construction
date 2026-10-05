import React, { useState, useRef, useEffect } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle,
  Send,
  Upload,
  FileText,
  AlertCircle,
  X,
  Award,
  Users,
  Shield,
  HeartHandshake,
  Calendar,
  Layers,
  GraduationCap,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Phone,
  Mail,
  CheckCircle2,
  Edit3,
  Sliders,
  Paperclip,
  Download,
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { defaultVacancy, VacancyRecord } from '../config/vacancyConfig';
import { VacancyEditModal } from '../components/VacancyEditModal';
import { OfficialNoticeModal } from '../components/OfficialNoticeModal';

const ENGINEERING_DISCIPLINES = [
  'Transmission Line Project Engineer (132kV - 400kV)',
  'Substation Testing & Commissioning Engineer',
  'Civil Structural Site Engineer',
  'Architectural & 3D Building Designer',
  'Electrical Power & SCADA Engineer',
  'Quantity Surveying & Cost Estimation',
  'Geotechnical & Foundation Engineer',
  'Quality Assurance & Safety (HSE) Officer',
  'Site Supervisor / Junior Civil Engineer',
  'General Engineering Candidate (Future Roster)',
];

export const CareerPage: React.FC = () => {
  // Application Mode: 'VACANCY' (applying for active post) or 'GENERAL' (submit CV without vacancy)
  const [applicationMode, setApplicationMode] = useState<'VACANCY' | 'GENERAL'>('VACANCY');
  const [preferredDiscipline, setPreferredDiscipline] = useState<string>(
    'Transmission Line Project Engineer (132kV - 400kV)'
  );
  // Load saved vacancy or fallback to default configuration
  const [vacancy, setVacancy] = useState<VacancyRecord>(() => {
    try {
      const saved = localStorage.getItem('kyoly_custom_vacancy');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.position) return parsed;
      }
    } catch {
      // ignore
    }
    return defaultVacancy;
  });

  // Centralized ON/OFF state with live toggle persistence
  const [vacancyStatus, setVacancyStatus] = useState<'ON' | 'OFF'>(() => {
    try {
      const saved = localStorage.getItem('kyoly_vacancy_status');
      if (saved === 'ON' || saved === 'OFF') return saved;
    } catch {
      // ignore
    }
    return vacancy.status || defaultVacancy.status;
  });

  // Modal open state for editing vacancy details & CV options
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fast toggle handler for Vacancy ON/OFF
  const toggleVacancyStatus = () => {
    const nextStatus = vacancyStatus === 'ON' ? 'OFF' : 'ON';
    setVacancyStatus(nextStatus);
    const updatedVacancy: VacancyRecord = { ...vacancy, status: nextStatus };
    setVacancy(updatedVacancy);
    try {
      localStorage.setItem('kyoly_vacancy_status', nextStatus);
      localStorage.setItem('kyoly_custom_vacancy', JSON.stringify(updatedVacancy));
    } catch {
      // ignore
    }
    showToast(`Vacancy section switched ${nextStatus}`);
  };

  // Fast toggle handler for CV Attachment Option ON/OFF
  const toggleCvOption = () => {
    const nextCv = vacancy.cvAttachmentOption === 'ON' ? 'OFF' : 'ON';
    const updatedVacancy: VacancyRecord = { ...vacancy, cvAttachmentOption: nextCv };
    setVacancy(updatedVacancy);
    try {
      localStorage.setItem('kyoly_custom_vacancy', JSON.stringify(updatedVacancy));
    } catch {
      // ignore
    }
    showToast(`CV attachment option switched ${nextCv}`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleSaveVacancy = (updated: VacancyRecord) => {
    setVacancy(updated);
    setVacancyStatus(updated.status);
    try {
      localStorage.setItem('kyoly_custom_vacancy', JSON.stringify(updated));
      localStorage.setItem('kyoly_vacancy_status', updated.status);
    } catch {
      // ignore
    }
    showToast('Vacancy and CV options updated successfully!');
  };

  const handleResetVacancy = () => {
    setVacancy(defaultVacancy);
    setVacancyStatus(defaultVacancy.status);
    try {
      localStorage.removeItem('kyoly_custom_vacancy');
      localStorage.removeItem('kyoly_vacancy_status');
    } catch {
      // ignore
    }
    showToast('Reset to default vacancy configuration.');
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    positionAppliedFor: vacancy.position,
    qualification: '',
    experience: '3-5 Years',
    message: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize form position if vacancy position updates and in vacancy mode
  useEffect(() => {
    if (applicationMode === 'VACANCY') {
      setFormData((prev) => ({
        ...prev,
        positionAppliedFor: vacancy.position,
      }));
    }
  }, [vacancy.position, applicationMode]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validExtensions = ['.pdf', '.doc', '.docx'];
      const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

      if (!validExtensions.includes(fileExt)) {
        setFileError('Invalid file type. Please upload a PDF, DOC, or DOCX document.');
        setSelectedFile(null);
        return;
      }

      // Max 5 MB = 5 * 1024 * 1024 bytes
      if (file.size > 5 * 1024 * 1024) {
        setFileError('File size exceeds the 5 MB limit. Please upload a smaller file.');
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate CV: for general submission without vacancy, CV is mandatory; for vacancy, depends on cvAttachmentOption
    const isCvRequired =
      applicationMode === 'GENERAL'
        ? true
        : vacancy.cvAttachmentOption === 'ON' && (vacancy.isCvMandatory ?? true);

    if (isCvRequired && !selectedFile) {
      setFileError('Please attach your CV / Resume document (PDF, DOC, or DOCX up to 5 MB).');
      return;
    }

    setIsSubmitting(true);
    // Simulate secure submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const scrollToApply = (targetMode: 'VACANCY' | 'GENERAL' = 'VACANCY') => {
    setApplicationMode(targetMode);
    if (targetMode === 'VACANCY') {
      setFormData((prev) => ({ ...prev, positionAppliedFor: vacancy.position }));
    } else {
      setFormData((prev) => ({ ...prev, positionAppliedFor: preferredDiscipline }));
    }
    const formEl = document.getElementById('application-form-section');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isVacancyOn = vacancyStatus === 'ON';
  const isCvAttachmentOn = vacancy.cvAttachmentOption === 'ON';

  return (
    <div className="bg-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3 rounded-xl border border-[#FF6B00] shadow-2xl flex items-center gap-3 animate-fade-in text-xs font-semibold">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <section className="bg-[#0F172A] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b-4 border-[#FF6B00] relative overflow-hidden">
        <div className="absolute inset-0 engineering-grid-dark opacity-60" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FF6B00]/15 border border-[#FF6B00]/30 text-xs font-mono text-[#FF6B00] uppercase tracking-wider font-bold">
                <span>Join Nepal's Leading Engineering Firm</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-['Outfit'] tracking-tight text-white">
                Build Your Career with Kyoly Construction
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                Advance your engineering career on high-impact national infrastructure projects—from high-voltage transmission lines and substations to modern commercial and residential developments across Nepal.
              </p>
            </div>

            {/* Quick Admin Control Panel: Vacancy ON/OFF + CV Attachment ON/OFF + Edit */}
            <div className="shrink-0 bg-neutral-900/95 border border-neutral-700/80 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-2xl flex flex-col gap-3 w-full lg:max-w-md">
              <div className="flex items-center justify-between gap-2 border-b border-neutral-800 pb-2.5">
                <span className="font-mono text-slate-400 uppercase tracking-wider text-[11px] font-bold flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>Career Admin Controls</span>
                </span>

                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FF6B00] hover:bg-[#E04800] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit Vacancy & CV</span>
                </button>
              </div>

              {/* Status Row: Vacancy ON/OFF */}
              <div className="flex items-center justify-between gap-3 p-2 rounded-lg bg-neutral-800/60 border border-neutral-700/60">
                <div className="space-y-0.5">
                  <div className="text-[11px] font-bold text-slate-200 uppercase flex items-center gap-1.5">
                    <span>Vacancy Post</span>
                    <span
                      className={`px-2 py-0.2 rounded text-[10px] font-mono font-bold ${
                        isVacancyOn
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-neutral-700 text-neutral-400'
                      }`}
                    >
                      {vacancyStatus}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {isVacancyOn ? 'Publicly visible' : 'Hidden from public'}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={toggleVacancyStatus}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isVacancyOn
                      ? 'bg-neutral-700 hover:bg-neutral-600 text-slate-200'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {isVacancyOn ? (
                    <>
                      <ToggleRight className="w-4 h-4 text-emerald-400" />
                      <span>Turn OFF</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="w-4 h-4 text-white" />
                      <span>Turn ON</span>
                    </>
                  )}
                </button>
              </div>

              {/* Status Row: CV Attachment ON/OFF */}
              <div className="flex items-center justify-between gap-3 p-2 rounded-lg bg-neutral-800/60 border border-neutral-700/60">
                <div className="space-y-0.5">
                  <div className="text-[11px] font-bold text-slate-200 uppercase flex items-center gap-1.5">
                    <span>CV Upload Option</span>
                    <span
                      className={`px-2 py-0.2 rounded text-[10px] font-mono font-bold ${
                        isCvAttachmentOn
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-neutral-700 text-neutral-400'
                      }`}
                    >
                      {vacancy.cvAttachmentOption}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {isCvAttachmentOn ? 'Attachment zone active' : 'Upload disabled/hidden'}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={toggleCvOption}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isCvAttachmentOn
                      ? 'bg-neutral-700 hover:bg-neutral-600 text-slate-200'
                      : 'bg-[#1E3A8A] hover:bg-[#152a65] text-white'
                  }`}
                >
                  {isCvAttachmentOn ? (
                    <>
                      <ToggleRight className="w-4 h-4 text-blue-400" />
                      <span>Disable CV</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="w-4 h-4 text-white" />
                      <span>Enable CV</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>Config: <code className="text-orange-400">vacancyConfig.ts</code></span>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(true)}
                  className="text-[#FF6B00] hover:underline font-bold"
                >
                  Edit all fields & duties →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Why Work With Us */}
          <div className="mb-16">
            <SectionHeading
              kicker="Why Kyoly"
              title="A Culture of Professional Excellence"
              subtitle="We offer high-value engineering exposure, certified safety protocols, and merit-based advancement."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 rounded-xl border border-neutral-200 bg-[#F8FAFC]">
                <div className="w-10 h-10 rounded-lg bg-[#FF6B00]/15 text-[#FF6B00] flex items-center justify-center mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold font-['Outfit'] text-[#0F172A] mb-1">
                  Competitive Compensation
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Attractive salary scale, site allowances, festival allowances, and performance project incentives.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-neutral-200 bg-[#F8FAFC]">
                <div className="w-10 h-10 rounded-lg bg-orange-500/15 text-orange-600 flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold font-['Outfit'] text-[#0F172A] mb-1">
                  Safety-First Governance
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Strict Zero-Harm enforcement, calibrated PPE gear, and comprehensive site health & accidental insurance.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-neutral-200 bg-[#F8FAFC]">
                <div className="w-10 h-10 rounded-lg bg-[#1E3A8A]/15 text-[#1E3A8A] flex items-center justify-center mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold font-['Outfit'] text-[#0F172A] mb-1">
                  Expert Technical Leadership
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Work directly under veteran civil structural and electrical power engineering executives.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-neutral-200 bg-[#F8FAFC]">
                <div className="w-10 h-10 rounded-lg bg-amber-500/15 text-amber-600 flex items-center justify-center mb-3">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold font-['Outfit'] text-[#0F172A] mb-1">
                  Nationwide Projects
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Diverse assignments spanning Kathmandu Valley, Terai industrial corridors, and Himalayan power routes.
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================
              VACANCY SECTION (DISPLAYED ONLY WHEN STATUS === 'ON')
              Displaying ONLY ONE official vacancy post with complete details.
              When OFF: completely hidden from public website.
          ======================================================== */}
          {isVacancyOn ? (
            <div className="mb-20 space-y-12">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#FF6B00]/15 text-[#FF6B00] text-xs font-mono font-bold uppercase tracking-wider mb-2">
                      <span>Official Vacancy</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black font-['Outfit'] tracking-tight text-[#0F172A]">
                      Current Job Vacancy
                    </h2>
                    <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                      Kyoly Construction is currently accepting applications for the open position below.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(true)}
                    className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-[#0F172A] text-xs font-bold rounded-lg transition-colors border border-neutral-300 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span>Edit Vacancy Details</span>
                  </button>
                </div>

                {/* SINGLE OFFICIAL VACANCY CARD */}
                <div className="bg-white rounded-2xl border-2 border-neutral-200 hover:border-[#FF6B00] transition-all shadow-md overflow-hidden">
                  {/* High-Visibility VACANCY OPEN Announcement Bar */}
                  <div className="bg-emerald-600 text-white px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono font-bold uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                      <span>VACANCY OPEN: NOW ACCEPTING APPLICATIONS</span>
                      <span className="text-white/60">|</span>
                      <span className="text-emerald-100 font-sans font-semibold">Ref: {vacancy.noticeRefNo || 'KCPL/HR/VAC-01/2026'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-sans">
                      <Paperclip className="w-3.5 h-3.5" />
                      <span>Attachment Option: {isCvAttachmentOn ? 'CV Upload Active' : 'Online Profile Only'}</span>
                    </div>
                  </div>

                  {/* Card Header Strip */}
                  <div className="bg-neutral-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded bg-[#FF6B00]/20 text-[#FF6B00] text-xs font-mono font-bold uppercase tracking-wider">
                          {vacancy.department}
                        </span>
                        <span className="px-2.5 py-0.5 rounded bg-white/10 text-white text-xs font-bold">
                          {vacancy.employmentType}
                        </span>
                        <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
                          {vacancy.vacanciesCount} Opening{vacancy.vacanciesCount > 1 ? 's' : ''}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded text-xs font-bold font-mono flex items-center gap-1 ${
                            isCvAttachmentOn
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-neutral-800 text-neutral-400'
                          }`}
                        >
                          <Paperclip className="w-3 h-3" />
                          <span>CV Upload: {vacancy.cvAttachmentOption}</span>
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-white">
                        {vacancy.position}
                      </h3>
                    </div>

                    <div className="shrink-0 flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2">
                      <button
                        type="button"
                        onClick={() => scrollToApply('VACANCY')}
                        className="px-7 py-3 bg-[#FF6B00] hover:bg-[#E04800] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all cursor-pointer"
                      >
                        Apply with CV Attachment
                      </button>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-[#FF6B00]" />
                        <span>Deadline: <strong className="text-white">{vacancy.deadline}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body & Technical Specifications */}
                  <div className="p-6 sm:p-8 space-y-6">
                    {/* Official Document Notice Attachment Box */}
                    <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-orange-50/70 via-amber-50/50 to-white border border-[#FF6B00]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/15 text-[#FF6B00] flex items-center justify-center shrink-0 border border-[#FF6B00]/25">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-[#FF6B00] uppercase tracking-wider">
                              Official Vacancy Notice Attachment
                            </span>
                            <span className="px-2 py-0.5 rounded bg-neutral-200 text-neutral-800 text-[10px] font-mono font-bold">
                              {vacancy.noticeAttachmentFileSize || '385 KB'} · PDF/TOR
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-[#0F172A]">
                            {vacancy.noticeAttachmentFileName || 'KYOLY-OFFICIAL-VACANCY-NOTICE-TOR-2026.pdf'}
                          </h4>
                          <p className="text-xs text-slate-500">
                            Official sealed Terms of Reference (TOR), position scope, eligibility criteria, and submission guidelines.
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 flex flex-wrap items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => setIsNoticeModalOpen(true)}
                          className="px-4 py-2 bg-white hover:bg-neutral-100 text-[#0F172A] font-bold text-xs uppercase tracking-wider rounded-lg border border-neutral-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#FF6B00]" />
                          <span>View Notice (TOR)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => scrollToApply('VACANCY')}
                          className="px-5 py-2 bg-[#FF6B00] hover:bg-[#E04800] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Paperclip className="w-3.5 h-3.5" />
                          <span>Attach CV & Apply</span>
                        </button>
                      </div>
                    </div>
                    {/* Quick Metadata Bar */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-neutral-50 rounded-xl border border-neutral-200/80 text-xs">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-slate-400 block text-[11px] uppercase font-bold">
                            Location
                          </span>
                          <span className="font-semibold text-slate-800">
                            {vacancy.location}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <Briefcase className="w-4 h-4 text-[#1E3A8A] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-slate-400 block text-[11px] uppercase font-bold">
                            Experience Required
                          </span>
                          <span className="font-semibold text-slate-800">
                            {vacancy.experience}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 sm:col-span-2 lg:col-span-1">
                        <GraduationCap className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-slate-400 block text-[11px] uppercase font-bold">
                            Minimum Qualification
                          </span>
                          <span className="font-semibold text-slate-800">
                            {vacancy.qualification}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Job Description */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-[#0F172A] font-['Outfit']">
                        Job Description
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        {vacancy.description}
                      </p>
                    </div>

                    {/* Core Responsibilities */}
                    <div className="space-y-3 pt-2">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-[#0F172A] font-['Outfit']">
                        Key Responsibilities & Duties
                      </h4>
                      <div className="grid grid-cols-1 gap-2.5">
                        {vacancy.responsibilities.map((resp, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 p-3 rounded-lg bg-white border border-neutral-200/80 text-xs sm:text-sm text-slate-700"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* General CV Submission Option Card */}
                    <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-blue-50/70 via-slate-50 to-white border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#1E3A8A]/15 text-[#1E3A8A] flex items-center justify-center shrink-0 border border-[#1E3A8A]/20">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1E3A8A]">
                              CV Submission Option (Without Vacancy)
                            </span>
                            <span className="px-2 py-0.2 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                              All Disciplines
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-[#0F172A] mt-0.5">
                            Seeking other roles? (Substation, Civil, Architect, SCADA, Survey)
                          </h4>
                          <p className="text-xs text-slate-500">
                            Submit your CV without waiting for a specific vacancy to be indexed in Kyoly Construction's active engineering roster.
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => scrollToApply('GENERAL')}
                        className="px-5 py-2.5 bg-[#1E3A8A] hover:bg-[#152a65] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shrink-0 shadow-xs flex items-center gap-1.5"
                      >
                        <Paperclip className="w-3.5 h-3.5" />
                        <span>Submit General CV ↓</span>
                      </button>
                    </div>

                    {/* Footer strip with direct email/phone */}
                    <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500">
                      <div className="flex flex-wrap items-center gap-4">
                        <span className="flex items-center gap-1.5 text-slate-700">
                          <Mail className="w-3.5 h-3.5 text-[#FF6B00]" />
                          <span>Direct inquiries: <a href={`mailto:${vacancy.applyEmail}`} className="font-bold hover:underline">{vacancy.applyEmail}</a></span>
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-700">
                          <Phone className="w-3.5 h-3.5 text-[#FF6B00]" />
                          <span>HR Cell: <a href={`tel:${vacancy.applyPhone}`} className="font-bold hover:underline">{vacancy.applyPhone}</a></span>
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setIsEditModalOpen(true)}
                          className="font-bold text-slate-600 hover:text-[#0F172A] hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3 text-[#FF6B00]" />
                          <span>Edit / Modify</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => scrollToApply('VACANCY')}
                          className="font-bold text-[#FF6B00] hover:text-[#E04800] hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <span>Proceed to Application Form ↓</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ========================================================
               VACANCY OFF STATE:
               Completely hide the vacancy card, job details, and deadline.
               No 'No Vacancy' text or empty card.
               Presents the Engineering Talent Network banner with option to submit CV.
            ======================================================== */
            <div className="mb-12">
              <div className="max-w-4xl mx-auto rounded-3xl bg-neutral-900 text-white p-8 sm:p-12 relative overflow-hidden border border-neutral-800 shadow-xl">
                <div className="absolute inset-0 engineering-grid-dark opacity-50" />
                <div className="relative z-10 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B00]/20 text-[#FF6B00] text-xs font-mono font-bold uppercase tracking-wider">
                      <span>Engineering Talent Network</span>
                    </div>

                    <button
                      type="button"
                      onClick={toggleVacancyStatus}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FF6B00] hover:bg-[#E04800] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                    >
                      <ToggleLeft className="w-3.5 h-3.5" />
                      <span>Turn Vacancy ON</span>
                    </button>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-white">
                    Submit Your CV for Upcoming Infrastructure Projects
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-light">
                    Kyoly Construction continually executes high-voltage transmission lines, 132kV/33kV substations, civil foundations, and commercial building developments across Nepal. Even without an active vacancy posting, qualified engineers and technical specialists are welcome to submit their CV to our talent database using the form below.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
                    <button
                      type="button"
                      onClick={() => scrollToApply('GENERAL')}
                      className="px-6 py-3 bg-[#FF6B00] hover:bg-[#E04800] text-white font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <Paperclip className="w-4 h-4" />
                      <span>Submit CV Online Below ↓</span>
                    </button>

                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-wider rounded-xl transition-all border border-white/20 flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email HR Division</span>
                    </a>

                    <a
                      href={`tel:${siteConfig.phoneRaw}`}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-wider rounded-xl transition-all border border-white/20 flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4 text-[#FF6B00]" />
                      <span>{siteConfig.phoneDisplay}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              ONLINE APPLICATION & CV SUBMISSION PORTAL
              Available both when Vacancy is ON (with mode switcher)
              and when Vacancy is OFF (for spontaneous/general talent roster CV submit)
          ======================================================== */}
          <div id="application-form-section" className="scroll-mt-24 mb-16">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-neutral-200 shadow-xl p-6 sm:p-10">
              {/* Mode Selector Tabs (Shown when Vacancy is ON) */}
              {isVacancyOn && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1.5 bg-neutral-100 rounded-xl mb-6">
                  <button
                    type="button"
                    onClick={() => {
                      setApplicationMode('VACANCY');
                      setFormData((prev) => ({ ...prev, positionAppliedFor: vacancy.position }));
                    }}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                      applicationMode === 'VACANCY'
                        ? 'bg-white text-[#0F172A] shadow-xs border border-neutral-200 font-extrabold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span>1. Apply for Open Vacancy</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setApplicationMode('GENERAL');
                      setFormData((prev) => ({ ...prev, positionAppliedFor: preferredDiscipline }));
                    }}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                      applicationMode === 'GENERAL'
                        ? 'bg-[#1E3A8A] text-white shadow-xs font-extrabold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Paperclip className="w-3.5 h-3.5 text-blue-300" />
                    <span>2. Submit CV Without Vacancy</span>
                  </button>
                </div>
              )}

              <div className="border-b border-neutral-200 pb-5 mb-6">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#FF6B00]/15 text-xs font-mono text-[#FF6B00] font-bold uppercase tracking-wider mb-2">
                  <span>
                    {isVacancyOn && applicationMode === 'VACANCY'
                      ? 'Official Vacancy Application'
                      : 'General CV Submission / Talent Roster'}
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-['Outfit'] text-[#0F172A]">
                  {isVacancyOn && applicationMode === 'VACANCY'
                    ? 'Submit Your Job Application'
                    : 'Submit Your CV / Resume to Kyoly Construction'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {isVacancyOn && applicationMode === 'VACANCY' ? (
                    <>
                      Applying for: <strong className="text-[#FF6B00]">{vacancy.position}</strong> ({vacancy.department})
                    </>
                  ) : (
                    <>
                      Submit your credentials to our engineering talent bank for upcoming transmission, substation, and civil projects.
                    </>
                  )}
                </p>
              </div>

                  {submitted ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-500 mx-auto flex items-center justify-center">
                        <CheckCircle className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-black font-['Outfit'] text-[#0F172A]">
                        Application Submitted Successfully!
                      </h3>
                      <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                        Thank you, <strong>{formData.fullName}</strong>. Your application for{' '}
                        <strong className="text-[#0F172A]">{formData.positionAppliedFor}</strong> has been logged with Ref ID{' '}
                        <strong className="font-mono text-[#FF6B00]">KYOLY-APP-{Math.floor(100000 + Math.random() * 900000)}</strong>.
                      </p>
                      <p className="text-xs text-slate-500 max-w-md mx-auto">
                        Our technical recruitment committee will review your credentials and contact you at{' '}
                        <strong>{formData.phone}</strong> or <strong>{formData.email}</strong>.
                      </p>
                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={() => {
                            setSubmitted(false);
                            setSelectedFile(null);
                            setFormData({
                              fullName: '',
                              email: '',
                              phone: '',
                              positionAppliedFor: vacancy.position,
                              qualification: '',
                              experience: '3-5 Years',
                              message: '',
                            });
                          }}
                          className="px-6 py-2.5 bg-[#FF6B00] hover:bg-[#E04800] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                        >
                          Submit Another Application
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Position / Discipline Selection */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-bold text-[#0F172A] uppercase">
                            {applicationMode === 'VACANCY'
                              ? 'Position Applied For'
                              : 'Engineering Discipline / Target Role *'}
                          </label>
                          <span className="text-[11px] font-mono font-bold text-[#FF6B00]">
                            {applicationMode === 'VACANCY' ? 'Open Vacancy Post' : 'General Roster Application'}
                          </span>
                        </div>

                        {applicationMode === 'VACANCY' ? (
                          <input
                            type="text"
                            readOnly
                            value={formData.positionAppliedFor}
                            className="w-full px-4 py-2.5 text-sm rounded-lg bg-neutral-100 border border-neutral-300 font-bold text-[#0F172A] cursor-not-allowed select-none"
                          />
                        ) : (
                          <select
                            value={formData.positionAppliedFor}
                            onChange={(e) => {
                              const val = e.target.value;
                              setPreferredDiscipline(val);
                              setFormData({ ...formData, positionAppliedFor: val });
                            }}
                            className="w-full px-4 py-2.5 text-sm rounded-lg bg-white border border-neutral-300 font-bold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] cursor-pointer"
                          >
                            {ENGINEERING_DISCIPLINES.map((disc, idx) => (
                              <option key={idx} value={disc}>
                                {disc}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>

                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] uppercase mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Er. Pradeep Shrestha"
                          className="w-full px-4 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                        />
                      </div>

                      {/* Email & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#0F172A] uppercase mb-1.5">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="name@example.com"
                            className="w-full px-4 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#0F172A] uppercase mb-1.5">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="e.g. +977-9705551631"
                            className="w-full px-4 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                          />
                        </div>
                      </div>

                      {/* Qualification & Experience */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#0F172A] uppercase mb-1.5">
                            Highest Qualification *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.qualification}
                            onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                            placeholder="e.g. B.E. Civil / B.E. Electrical"
                            className="w-full px-4 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#0F172A] uppercase mb-1.5">
                            Years of Experience
                          </label>
                          <select
                            value={formData.experience}
                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                            className="w-full px-4 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-[#FF6B00] bg-white cursor-pointer"
                          >
                            <option value="1-2 Years">1-2 Years</option>
                            <option value="3-5 Years">3-5 Years</option>
                            <option value="5-8 Years">5-8 Years</option>
                            <option value="8+ Years">8+ Years</option>
                          </select>
                        </div>
                      </div>

                      {/* Brief Statement / Message */}
                      <div>
                        <label className="block text-xs font-bold text-[#0F172A] uppercase mb-1.5">
                          Cover Note / Professional Summary (Optional)
                        </label>
                        <textarea
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Highlight your transmission line, substation, or relevant infrastructure project experience..."
                          className="w-full px-4 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-[#FF6B00]"
                        />
                      </div>

                      {/* CV / RESUME UPLOAD SECTION (CONDITIONAL ON cvAttachmentOption === 'ON' OR applicationMode === 'GENERAL') */}
                      {isCvAttachmentOn || applicationMode === 'GENERAL' ? (
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-bold text-[#0F172A] uppercase">
                              Attach CV / Resume{' '}
                              {applicationMode === 'GENERAL' || (vacancy.isCvMandatory ?? true) ? (
                                <span className="text-[#FF6B00]">*</span>
                              ) : (
                                <span className="text-slate-400 font-normal lowercase">(optional)</span>
                              )}
                            </label>
                            <span className="text-[11px] text-blue-600 font-mono font-semibold">
                              {applicationMode === 'GENERAL' ? 'CV Required for Roster' : 'CV Option: ON'}
                            </span>
                          </div>

                          <div
                            onClick={() => fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                              selectedFile
                                ? 'border-emerald-500 bg-emerald-50/40'
                                : fileError
                                ? 'border-red-400 bg-red-50/30'
                                : 'border-neutral-300 hover:border-[#FF6B00] bg-neutral-50/50'
                            }`}
                          >
                            {selectedFile ? (
                              <div className="flex items-center justify-between gap-4 p-2 bg-white rounded-lg border border-emerald-300">
                                <div className="flex items-center gap-3 overflow-hidden">
                                  <FileText className="w-8 h-8 text-emerald-600 shrink-0" />
                                  <div className="text-left truncate">
                                    <div className="text-xs font-bold text-slate-800 truncate">
                                      {selectedFile.name}
                                    </div>
                                    <div className="text-[11px] text-slate-500">
                                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                    </div>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveFile();
                                  }}
                                  className="p-1 text-slate-400 hover:text-red-500 rounded-md cursor-pointer"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <Upload className="w-8 h-8 text-[#FF6B00] mx-auto opacity-80" />
                                <div className="text-xs text-slate-600">
                                  <span className="font-bold text-[#FF6B00] hover:underline">
                                    Click to select CV document
                                  </span>{' '}
                                  or drag and drop your file
                                </div>
                                <p className="text-[11px] text-slate-400">
                                  Accepted formats: .pdf, .doc, .docx · Maximum file size: 5 MB
                                </p>
                                <input
                                  id="cv-upload-input"
                                  ref={fileInputRef}
                                  type="file"
                                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                  onChange={handleFileChange}
                                  className="hidden"
                                />
                              </div>
                            )}
                          </div>

                          {fileError && (
                            <div className="flex items-center gap-1.5 text-xs text-red-600 mt-1">
                              <AlertCircle className="w-4 h-4 shrink-0" />
                              <span>{fileError}</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        /* CV Option OFF Notice */
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs text-slate-600">
                          <div className="flex items-center gap-2">
                            <Paperclip className="w-4 h-4 text-slate-400" />
                            <span>
                              <strong>CV Upload: OFF</strong> · Direct file attachment is currently disabled. Submit your application directly using the fields above.
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={toggleCvOption}
                            className="text-[#FF6B00] hover:underline font-bold text-[11px] cursor-pointer"
                          >
                            Turn ON
                          </button>
                        </div>
                      )}

                      {/* Submit Button */}
                      <div className="pt-3 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <span className="text-[11px] text-slate-500">
                          Inquiries: Call HR at <strong className="text-[#0F172A]">{vacancy.applyPhone}</strong>
                        </span>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-8 py-3 bg-[#FF6B00] hover:bg-[#E04800] text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <span>Processing Application...</span>
                          ) : (
                            <>
                              <span>Submit Application</span>
                              <Send className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
        </div>
      </section>

      {/* VACANCY & CV ATTACHMENT EDIT MODAL */}
      <VacancyEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentVacancy={vacancy}
        onSave={handleSaveVacancy}
        onReset={handleResetVacancy}
      />

      {/* OFFICIAL NOTICE (TOR) DOCUMENT ATTACHMENT MODAL */}
      <OfficialNoticeModal
        isOpen={isNoticeModalOpen}
        onClose={() => setIsNoticeModalOpen(false)}
        vacancy={vacancy}
        onApplyClick={() => scrollToApply('VACANCY')}
      />
    </div>
  );
};
