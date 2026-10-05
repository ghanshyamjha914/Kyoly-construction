import React, { useState } from 'react';
import {
  X,
  CheckCircle,
  Plus,
  Trash2,
  ToggleLeft,
  ToggleRight,
  RotateCcw,
  Save,
  Briefcase,
  FileText,
  AlertCircle,
  Layers,
  MapPin,
  Calendar,
  Mail,
  Phone,
  GraduationCap,
} from 'lucide-react';
import { VacancyRecord, defaultVacancy } from '../config/vacancyConfig';

interface VacancyEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentVacancy: VacancyRecord;
  onSave: (updated: VacancyRecord) => void;
  onReset: () => void;
}

export const VacancyEditModal: React.FC<VacancyEditModalProps> = ({
  isOpen,
  onClose,
  currentVacancy,
  onSave,
  onReset,
}) => {
  const [form, setForm] = useState<VacancyRecord>(currentVacancy);
  const [newResp, setNewResp] = useState('');

  // Keep form in sync when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setForm(currentVacancy);
    }
  }, [isOpen, currentVacancy]);

  if (!isOpen) return null;

  const handleToggleStatus = () => {
    setForm((prev) => ({
      ...prev,
      status: prev.status === 'ON' ? 'OFF' : 'ON',
    }));
  };

  const handleToggleCvOption = () => {
    setForm((prev) => ({
      ...prev,
      cvAttachmentOption: prev.cvAttachmentOption === 'ON' ? 'OFF' : 'ON',
    }));
  };

  const handleAddResponsibility = () => {
    if (!newResp.trim()) return;
    setForm((prev) => ({
      ...prev,
      responsibilities: [...prev.responsibilities, newResp.trim()],
    }));
    setNewResp('');
  };

  const handleRemoveResponsibility = (index: number) => {
    setForm((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index),
    }));
  };

  const handleRespChange = (index: number, val: string) => {
    setForm((prev) => {
      const updated = [...prev.responsibilities];
      updated[index] = val;
      return { ...prev, responsibilities: updated };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset all vacancy and CV settings to the original default configuration?')) {
      onReset();
      setForm(defaultVacancy);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-neutral-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0F172A] text-white p-5 sm:p-6 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center border border-[#FF6B00]/30">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF6B00]">
                Admin Career Controls
              </div>
              <h3 className="text-xl font-black font-['Outfit'] text-white">
                Modify Vacancy & CV Attachment Options
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Scrollable Area */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-8 space-y-8 flex-1">
          {/* SECTION 1: MASTER ON/OFF CONTROLS */}
          <div className="p-4 sm:p-5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-4">
            <div className="text-xs font-mono uppercase font-bold text-slate-500 tracking-wider">
              1. Master Visibility & CV Option Controls
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Vacancy Section ON / OFF */}
              <div className="p-4 rounded-xl bg-white border border-neutral-200 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-[#0F172A] uppercase flex items-center gap-2">
                    <span>Vacancy Section Status</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        form.status === 'ON'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-neutral-200 text-neutral-700'
                      }`}
                    >
                      {form.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {form.status === 'ON'
                      ? 'Visible to public on Career page.'
                      : 'Completely hidden from public view.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleToggleStatus}
                  className={`px-3 py-2 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                    form.status === 'ON'
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-neutral-700 text-white hover:bg-neutral-800'
                  }`}
                >
                  {form.status === 'ON' ? (
                    <>
                      <ToggleRight className="w-4 h-4" />
                      <span>Turn OFF</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="w-4 h-4" />
                      <span>Turn ON</span>
                    </>
                  )}
                </button>
              </div>

              {/* CV Attachment Option ON / OFF */}
              <div className="p-4 rounded-xl bg-white border border-neutral-200 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-[#0F172A] uppercase flex items-center gap-2">
                    <span>CV Attachment Option</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        form.cvAttachmentOption === 'ON'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-neutral-200 text-neutral-700'
                      }`}
                    >
                      {form.cvAttachmentOption}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {form.cvAttachmentOption === 'ON'
                      ? 'Upload zone active in application form.'
                      : 'CV upload disabled / hidden on form.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleToggleCvOption}
                  className={`px-3 py-2 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                    form.cvAttachmentOption === 'ON'
                      ? 'bg-[#1E3A8A] text-white hover:bg-[#152a65]'
                      : 'bg-neutral-700 text-white hover:bg-neutral-800'
                  }`}
                >
                  {form.cvAttachmentOption === 'ON' ? (
                    <>
                      <ToggleRight className="w-4 h-4" />
                      <span>Disable CV</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="w-4 h-4" />
                      <span>Enable CV</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Checkbox for Mandatory CV */}
            {form.cvAttachmentOption === 'ON' && (
              <div className="pt-2 border-t border-neutral-200 flex items-center gap-2.5">
                <input
                  type="checkbox"
                  id="cv-mandatory-toggle"
                  checked={form.isCvMandatory ?? true}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, isCvMandatory: e.target.checked }))
                  }
                  className="w-4 h-4 rounded text-[#FF6B00] focus:ring-[#FF6B00] border-neutral-300 cursor-pointer"
                />
                <label
                  htmlFor="cv-mandatory-toggle"
                  className="text-xs font-semibold text-slate-700 cursor-pointer select-none"
                >
                  Require CV / Resume upload as a mandatory field (applicants cannot submit without attaching a file)
                </label>
              </div>
            )}
          </div>

          {/* SECTION 2: BASIC POSITION & METADATA */}
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase font-bold text-slate-500 tracking-wider">
              2. Position & Metadata Details
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Position */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-[#0F172A] mb-1">
                  Job Position Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.position}
                  onChange={(e) => setForm({ ...form, position: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#0F172A] mb-1">
                  Department *
                </label>
                <input
                  type="text"
                  required
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>

              {/* Vacancies Count */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#0F172A] mb-1">
                  Number of Vacancies *
                </label>
                <input
                  type="number"
                  min={1}
                  max={99}
                  required
                  value={form.vacanciesCount}
                  onChange={(e) =>
                    setForm({ ...form, vacanciesCount: parseInt(e.target.value, 10) || 1 })
                  }
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>

              {/* Employment Type */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#0F172A] mb-1">
                  Employment Type *
                </label>
                <input
                  type="text"
                  required
                  value={form.employmentType}
                  onChange={(e) => setForm({ ...form, employmentType: e.target.value })}
                  placeholder="e.g. Full-Time (Permanent)"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#0F172A] mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>

              {/* Qualification */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#0F172A] mb-1">
                  Educational Qualification *
                </label>
                <input
                  type="text"
                  required
                  value={form.qualification}
                  onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#0F172A] mb-1">
                  Experience Required *
                </label>
                <input
                  type="text"
                  required
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#0F172A] mb-1">
                  Application Deadline *
                </label>
                <input
                  type="text"
                  required
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  placeholder="e.g. November 30, 2026"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>

              {/* HR Email */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#0F172A] mb-1">
                  HR Email *
                </label>
                <input
                  type="email"
                  required
                  value={form.applyEmail}
                  onChange={(e) => setForm({ ...form, applyEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>

              {/* HR Phone */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-[#0F172A] mb-1">
                  HR Inquiry Phone *
                </label>
                <input
                  type="text"
                  required
                  value={form.applyPhone}
                  onChange={(e) => setForm({ ...form, applyPhone: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>

              {/* Official Notice Document Metadata */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#0F172A] mb-1">
                  Notice Ref. Number
                </label>
                <input
                  type="text"
                  value={form.noticeRefNo || 'KCPL/HR/VAC-01/2026'}
                  onChange={(e) => setForm({ ...form, noticeRefNo: e.target.value })}
                  placeholder="e.g. KCPL/HR/VAC-01/2026"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#0F172A] mb-1">
                  Official Notice Attachment Filename
                </label>
                <input
                  type="text"
                  value={form.noticeAttachmentFileName || 'KYOLY-OFFICIAL-VACANCY-NOTICE-TOR-2026.pdf'}
                  onChange={(e) => setForm({ ...form, noticeAttachmentFileName: e.target.value })}
                  placeholder="e.g. KYOLY-OFFICIAL-VACANCY-NOTICE-TOR-2026.pdf"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: JOB DESCRIPTION */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase font-bold text-slate-500 tracking-wider">
              3. Comprehensive Job Description
            </div>
            <textarea
              rows={4}
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
            />
          </div>

          {/* SECTION 4: RESPONSIBILITIES */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono uppercase font-bold text-slate-500 tracking-wider">
                4. Key Responsibilities ({form.responsibilities.length})
              </div>
            </div>

            <div className="space-y-2">
              {form.responsibilities.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-6 text-center text-xs font-mono text-slate-400 font-bold shrink-0">
                    {idx + 1}.
                  </span>
                  <input
                    type="text"
                    required
                    value={item}
                    onChange={(e) => handleRespChange(idx, e.target.value)}
                    className="flex-1 px-3 py-2 text-xs sm:text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveResponsibility(idx)}
                    className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-neutral-100 transition-colors"
                    title="Remove this duty"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new responsibility */}
            <div className="pt-2 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type new responsibility and click Add..."
                value={newResp}
                onChange={(e) => setNewResp(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddResponsibility();
                  }
                }}
                className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
              />
              <button
                type="button"
                onClick={handleAddResponsibility}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Duty</span>
              </button>
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-red-600 rounded-lg border border-neutral-300 hover:border-red-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Default Config</span>
            </button>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-7 py-2.5 bg-[#FF6B00] hover:bg-[#E04800] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
