import React, { useState, useEffect } from 'react';
import { LabourAgreement, ProjectProfile, DocumentStatus } from '../types';
import { useConstructionDocuments } from '../context/ConstructionDocumentsContext';
import { DocumentPrintHeaderFooter } from './DocumentPrintHeaderFooter';
import { DocumentStatusBadge } from './DocumentStatusBadge';
import { LegalDisclaimerBox } from './LegalDisclaimerBox';
import {
  X,
  Save,
  Printer,
  HardHat,
  User,
  ShieldAlert,
  Clock,
  CheckCircle2,
  DollarSign,
  AlertCircle,
  Eye,
  Edit3,
} from 'lucide-react';

interface LabourAgreementModalProps {
  isOpen: boolean;
  onClose: () => void;
  agreementToEdit?: LabourAgreement;
  project?: ProjectProfile;
}

export const LabourAgreementModal: React.FC<LabourAgreementModalProps> = ({
  isOpen,
  onClose,
  agreementToEdit,
  project,
}) => {
  const {
    saveLabourAgreement,
    getNextDocNumber,
    projects,
    selectedProjectId,
  } = useConstructionDocuments();

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const currentProject =
    project ||
    projects.find((p) => p.id === (agreementToEdit?.projectId || selectedProjectId)) ||
    projects[0];

  const buildInitialForm = (): LabourAgreement => {
    if (agreementToEdit) {
      return JSON.parse(JSON.stringify(agreementToEdit));
    }

    return {
      id: `la-${Date.now()}`,
      docNumber: getNextDocNumber('LA'),
      projectId: currentProject?.id || '',
      revision: 'Rev 0',
      date: new Date().toISOString().split('T')[0],
      status: 'Final',

      workerName: 'Shyam Kumar Yadav',
      citizenshipId: '14-02-74-09821 (Siraha)',
      permanentAddress: 'Lahan Municipality-04, Siraha, Madhesh Province, Nepal',
      temporaryAddress: 'Site Labour Camp, Kathmandu Valley Project Site',
      contactNumber: '+977-9800000000',
      emergencyContact: '+977-9811111111 (Brother - Ramesh Yadav)',

      tradeSkill: 'Mason / Mistri',
      workDescription:
        'Executing first-class brick masonry, formwork alignment, plastering, floor screeding, and overseeing helper placement as instructed by site engineer.',
      wageBasis: 'Daily',
      wageRate: 1400,
      workingHours: '8 hours daily (8:00 AM - 12:00 PM and 1:00 PM - 5:00 PM, 6 days a week)',
      overtimeTerms: '1.5 times regular hourly wage rate for hours worked beyond 8 hours daily upon supervisor approval.',
      paymentSchedule: 'Bi-weekly on the 1st and 16th of each English calendar month.',
      attendanceRules: 'Mandatory daily sign-in on biometric/muster roll register prior to starting shift.',
      leaveEntitlement: '1 paid weekly rest day; public emergency leave subject to prior supervisor intimation.',
      toolsProvidedBy: 'Contractor',
      safetyPpeRequirements:
        'Safety Helmet (Hardhat), Steel-Toe Boots, High-Visibility Vest, and Gloves mandatory at all times. Provided free of charge by Contractor.',
      accommodationProvided: true,
      foodProvided: false,
      accidentInsuranceTerms:
        'Covered under Kyoly Construction Group Site Accidental & Medical Insurance Policy as per Nepal Labour Act 2074.',
      terminationClauses:
        'Either party may terminate this agreement with 7 days written notice, or immediately in cases of severe safety violation, intoxication, or unauthorized absence exceeding 3 consecutive days.',
      disputeResolution:
        'Amicable settlement by Project Site In-Charge; if unresolved, referral to Department of Labour, Government of Nepal.',

      witness1Name: 'Er. Pradip Sharma (Site Engineer)',
      witness2Name: 'Ram Avatar Sah (Labour Foreman)',

      preparedBy: 'HR & Site Administration - Kyoly',
      approvedBy: 'Project Director',
      updatedAt: new Date().toISOString(),
    };
  };

  const [formData, setFormData] = useState<LabourAgreement>(buildInitialForm);

  useEffect(() => {
    if (isOpen) {
      setFormData(buildInitialForm());
    }
  }, [isOpen, agreementToEdit, project, selectedProjectId]);

  if (!isOpen) return null;

  const handleSave = () => {
    saveLabourAgreement(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="bg-[#0B0F19] text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center border border-[#FF6B00]/30">
              <HardHat className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  Labour Agreement (श्रमिक सम्झौता)
                </h2>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#FF6B00] text-white">
                  {formData.docNumber}
                </span>
                <span className="text-xs text-neutral-400 font-mono">({formData.revision})</span>
              </div>
              <p className="text-xs text-neutral-400">
                Bilateral employment contract conforming to Nepal Labour Act 2074 & OSH Regulations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-neutral-900 rounded-lg p-0.5 border border-neutral-800 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5 transition-colors ${
                  activeTab === 'edit' ? 'bg-[#FF6B00] text-white shadow-xs' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editor</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5 transition-colors ${
                  activeTab === 'preview' ? 'bg-[#FF6B00] text-white shadow-xs' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Contract View</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-neutral-50/50">
          {activeTab === 'edit' ? (
            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Metadata */}
              <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-600 uppercase mb-1">
                    Document Number
                  </label>
                  <input
                    type="text"
                    value={formData.docNumber}
                    onChange={(e) => setFormData({ ...formData, docNumber: e.target.value })}
                    className="w-full px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-600 uppercase mb-1">
                    Agreement Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-600 uppercase mb-1">
                    Revision
                  </label>
                  <input
                    type="text"
                    value={formData.revision}
                    onChange={(e) => setFormData({ ...formData, revision: e.target.value })}
                    className="w-full px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-600 uppercase mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as DocumentStatus })}
                    className="w-full px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-bold"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Final">Final</option>
                    <option value="Approved">Approved</option>
                  </select>
                </div>
              </div>

              {/* Worker Profile Card */}
              <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-100 text-[#0F172A] font-bold text-sm">
                  <User className="w-4 h-4 text-[#FF6B00]" />
                  <span>Worker / Labour Details (श्रमिकको व्यक्तिगत विवरण)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Full Worker Name *</label>
                    <input
                      type="text"
                      value={formData.workerName}
                      onChange={(e) => setFormData({ ...formData, workerName: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Citizenship / National ID No. *</label>
                    <input
                      type="text"
                      value={formData.citizenshipId}
                      onChange={(e) => setFormData({ ...formData, citizenshipId: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono text-[11px]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Permanent Address</label>
                    <input
                      type="text"
                      value={formData.permanentAddress}
                      onChange={(e) => setFormData({ ...formData, permanentAddress: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Temporary / Site Camp Address</label>
                    <input
                      type="text"
                      value={formData.temporaryAddress}
                      onChange={(e) => setFormData({ ...formData, temporaryAddress: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Primary Phone Number</label>
                    <input
                      type="text"
                      value={formData.contactNumber}
                      onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Emergency Contact (Relation & Phone)</label>
                    <input
                      type="text"
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Trade, Wage & Working Hours */}
              <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-100 text-[#0F172A] font-bold text-sm">
                  <DollarSign className="w-4 h-4 text-[#FF6B00]" />
                  <span>Trade, Wage Structure & Work Terms (काम र पारिश्रमिक)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Trade / Skill Category</label>
                    <select
                      value={formData.tradeSkill}
                      onChange={(e) => setFormData({ ...formData, tradeSkill: e.target.value as any })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-semibold text-[#0F172A]"
                    >
                      <option value="Mason / Mistri">Mason / Mistri (डकर्मी / मिस्त्री)</option>
                      <option value="Bar Bender (Steel)">Bar Bender (स्टील बाइन्डर)</option>
                      <option value="Carpenter / Shuttering">Carpenter / Shuttering (सिकर्मी / फर्मा)</option>
                      <option value="Plumber">Plumber (प्लम्बर)</option>
                      <option value="Electrician">Electrician (इलेक्ट्रीसियन)</option>
                      <option value="Painter">Painter (पेन्टर)</option>
                      <option value="Tower Rigger / Lineman">Tower Rigger / Lineman (लाइनम्यान)</option>
                      <option value="Excavator Operator">Excavator Operator (अपरेटर)</option>
                      <option value="Welder">Welder (वेल्डर)</option>
                      <option value="Helper / General Labour">Helper / General Labour (हेल्पर / श्रमिक)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Wage Basis</label>
                    <select
                      value={formData.wageBasis}
                      onChange={(e) => setFormData({ ...formData, wageBasis: e.target.value as any })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-semibold text-[#0F172A]"
                    >
                      <option value="Daily">Daily Basis (दैनिक दर)</option>
                      <option value="Monthly">Monthly Basis (मासिक दर)</option>
                      <option value="Piece-Rate">Piece-Rate / Quantity Basis (प्रति एकाइ दर)</option>
                      <option value="Lump Sum">Lump Sum Contract (एकमुष्ट)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">
                      Wage Rate (NPR) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 font-bold text-neutral-500">Rs.</span>
                      <input
                        type="number"
                        value={formData.wageRate}
                        onChange={(e) => setFormData({ ...formData, wageRate: parseFloat(e.target.value) || 0 })}
                        className="w-full pl-10 pr-3 py-2 border-2 border-[#FF6B00] rounded-lg font-bold text-sm text-[#0F172A]"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block font-bold text-neutral-700 mb-1">Detailed Work Description</label>
                    <textarea
                      rows={2}
                      value={formData.workDescription}
                      onChange={(e) => setFormData({ ...formData, workDescription: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Working Hours</label>
                    <input
                      type="text"
                      value={formData.workingHours}
                      onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Overtime Terms</label>
                    <input
                      type="text"
                      value={formData.overtimeTerms}
                      onChange={(e) => setFormData({ ...formData, overtimeTerms: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Payment Schedule</label>
                    <input
                      type="text"
                      value={formData.paymentSchedule}
                      onChange={(e) => setFormData({ ...formData, paymentSchedule: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Safety, PPE & Insurance */}
              <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-100 text-[#0F172A] font-bold text-sm">
                  <ShieldAlert className="w-4 h-4 text-[#FF6B00]" />
                  <span>Occupational Safety, Insurance & Welfare (सुरक्षा र बीमा)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Tools Provided By</label>
                    <select
                      value={formData.toolsProvidedBy}
                      onChange={(e) => setFormData({ ...formData, toolsProvidedBy: e.target.value as any })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-semibold"
                    >
                      <option value="Contractor">Contractor (कम्पनीले उपलब्ध गराउने)</option>
                      <option value="Worker">Worker (श्रमिक स्वयंले ल्याउने)</option>
                      <option value="Shared">Shared (साझा व्यवस्था)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-6 pt-5">
                    <label className="flex items-center gap-2 font-semibold text-neutral-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.accommodationProvided}
                        onChange={(e) => setFormData({ ...formData, accommodationProvided: e.target.checked })}
                        className="rounded text-[#FF6B00] focus:ring-[#FF6B00] w-4 h-4"
                      />
                      <span>Camp Accommodation Included</span>
                    </label>

                    <label className="flex items-center gap-2 font-semibold text-neutral-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.foodProvided}
                        onChange={(e) => setFormData({ ...formData, foodProvided: e.target.checked })}
                        className="rounded text-[#FF6B00] focus:ring-[#FF6B00] w-4 h-4"
                      />
                      <span>Mess / Food Included</span>
                    </label>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-neutral-700 mb-1">
                      Safety PPE & Protective Gear Requirements
                    </label>
                    <textarea
                      rows={2}
                      value={formData.safetyPpeRequirements}
                      onChange={(e) => setFormData({ ...formData, safetyPpeRequirements: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-neutral-700 mb-1">
                      Accident & Medical Insurance Terms (दुर्घटना बीमा)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.accidentInsuranceTerms}
                      onChange={(e) => setFormData({ ...formData, accidentInsuranceTerms: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Witnesses & Signatures */}
              <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Witness 1 (Company Side)</label>
                  <input
                    type="text"
                    value={formData.witness1Name}
                    onChange={(e) => setFormData({ ...formData, witness1Name: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Witness 2 (Labour Side)</label>
                  <input
                    type="text"
                    value={formData.witness2Name}
                    onChange={(e) => setFormData({ ...formData, witness2Name: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                  />
                </div>
              </div>

              <LegalDisclaimerBox documentType="Labour Agreement" />
            </div>
          ) : (
            /* PRINT PREVIEW */
            <div className="bg-white p-6 sm:p-10 rounded-xl shadow-lg border border-neutral-300 max-w-4xl mx-auto text-[#0F172A] leading-relaxed">
              <DocumentPrintHeaderFooter
                docNumber={formData.docNumber}
                revision={formData.revision}
                date={formData.date}
                docTitle="LABOUR EMPLOYMENT AGREEMENT (श्रमिक सेवा सम्झौता)"
                project={currentProject}
                status={formData.status}
              />

              <div className="my-6 text-sm text-justify space-y-4">
                <p>
                  This <strong>LABOUR AGREEMENT</strong> is entered into on <strong>{formData.date}</strong> by and between:
                </p>

                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 text-xs space-y-2">
                  <p>
                    <strong>FIRST PARTY (EMPLOYER / CONTRACTOR):</strong>{' '}
                    <span className="font-semibold">{currentProject?.contractor || 'Kyoly Construction Pvt. Ltd.'}</span>,
                    Kathmandu, Nepal (PAN: {currentProject?.contractorPan || '620155829'}).
                  </p>
                  <p>
                    <strong>SECOND PARTY (EMPLOYEE / WORKER):</strong>{' '}
                    <span className="font-semibold">{formData.workerName}</span>, Permanent Resident of{' '}
                    {formData.permanentAddress}, holding Nepali Citizenship No.{' '}
                    <span className="font-mono">{formData.citizenshipId}</span>, Contact: {formData.contactNumber}.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <h4 className="font-bold text-neutral-900 border-b pb-1">
                      1. DESIGNATION & WORK RESPONSIBILITY (पद तथा कार्यविवरण)
                    </h4>
                    <p className="mt-1">
                      The Worker is engaged in the capacity of <strong>{formData.tradeSkill}</strong>. {formData.workDescription}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-neutral-900 border-b pb-1">
                      2. WAGE & PAYMENT TERMS (पारिश्रमिक तथा भुक्तानी)
                    </h4>
                    <p className="mt-1">
                      Wage Rate is agreed at <strong>NPR {formData.wageRate.toLocaleString()}</strong> per{' '}
                      <strong>{formData.wageBasis}</strong> basis. Overtime work beyond standard hours shall be compensated at{' '}
                      {formData.overtimeTerms}. Payments shall be made {formData.paymentSchedule}.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-neutral-900 border-b pb-1">
                      3. WORKING HOURS & ATTENDANCE (कार्य समय तथा हाजिरी)
                    </h4>
                    <p className="mt-1">
                      Standard working duration shall be {formData.workingHours}. {formData.attendanceRules}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-neutral-900 border-b pb-1">
                      4. OCCUPATIONAL HEALTH & SAFETY (व्यावसायिक स्वास्थ्य तथा सुरक्षा)
                    </h4>
                    <p className="mt-1">
                      The Worker shall strictly adhere to site safety protocols. {formData.safetyPpeRequirements}{' '}
                      {formData.accidentInsuranceTerms}
                    </p>
                  </div>
                </div>

                {/* Signatures */}
                <div className="pt-8 mt-6 border-t-2 border-neutral-300 grid grid-cols-2 gap-8 text-xs">
                  <div className="space-y-4">
                    <p className="font-bold uppercase text-neutral-700">For the Employer (Kyoly Construction):</p>
                    <div className="h-14 border-b border-dashed border-neutral-400 flex items-end pb-1">
                      <span className="font-serif italic text-neutral-700">Er. Sujan Karki (Authorized Signatory)</span>
                    </div>
                    <p className="text-neutral-500">Seal & Signature</p>
                  </div>

                  <div className="space-y-4">
                    <p className="font-bold uppercase text-neutral-700">Second Party (Worker / श्रमिक):</p>
                    <div className="h-14 border-b border-dashed border-neutral-400 flex items-end pb-1">
                      <span className="font-serif italic text-neutral-700">{formData.workerName} (हस्ताक्षर / दायाँ-बायाँ बुढी औंला छाप)</span>
                    </div>
                    <p className="text-neutral-500">Citizenship No: {formData.citizenshipId}</p>
                  </div>

                  <div className="pt-4">
                    <p className="font-semibold text-neutral-600">Witness 1 (रोहबर):</p>
                    <p className="text-neutral-800">{formData.witness1Name}</p>
                  </div>

                  <div className="pt-4">
                    <p className="font-semibold text-neutral-600">Witness 2 (रोहबर):</p>
                    <p className="text-neutral-800">{formData.witness2Name}</p>
                  </div>
                </div>
              </div>

              <LegalDisclaimerBox documentType="Labour Agreement" />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white px-6 py-3.5 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <DocumentStatusBadge status={formData.status} />
            <span className="text-xs text-neutral-500">
              Worker: <strong className="text-neutral-800">{formData.workerName}</strong> ({formData.tradeSkill})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === 'preview' && (
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-4 h-4 text-neutral-600" />
                <span>Print Agreement</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-[#FF6B00] hover:bg-[#E04800] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#FF6B00]/20 transition-all hover:scale-[1.01]"
            >
              <Save className="w-4 h-4" />
              <span>Save Agreement</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
