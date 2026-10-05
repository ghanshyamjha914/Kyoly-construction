import React, { useState, useEffect } from 'react';
import { SubcontractAgreement, ProjectProfile, DocumentStatus } from '../types';
import { useConstructionDocuments } from '../context/ConstructionDocumentsContext';
import { DocumentPrintHeaderFooter } from './DocumentPrintHeaderFooter';
import { DocumentStatusBadge } from './DocumentStatusBadge';
import { LegalDisclaimerBox } from './LegalDisclaimerBox';
import {
  X,
  Save,
  Printer,
  Handshake,
  Building2,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Eye,
  Edit3,
} from 'lucide-react';

interface SubcontractAgreementModalProps {
  isOpen: boolean;
  onClose: () => void;
  agreementToEdit?: SubcontractAgreement;
  project?: ProjectProfile;
}

export const SubcontractAgreementModal: React.FC<SubcontractAgreementModalProps> = ({
  isOpen,
  onClose,
  agreementToEdit,
  project,
}) => {
  const {
    saveSubcontractAgreement,
    getNextDocNumber,
    projects,
    selectedProjectId,
  } = useConstructionDocuments();

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const currentProject =
    project ||
    projects.find((p) => p.id === (agreementToEdit?.projectId || selectedProjectId)) ||
    projects[0];

  const buildInitialForm = (): SubcontractAgreement => {
    if (agreementToEdit) {
      return JSON.parse(JSON.stringify(agreementToEdit));
    }

    return {
      id: `sca-${Date.now()}`,
      docNumber: getNextDocNumber('SCA'),
      projectId: currentProject?.id || '',
      revision: 'Rev 0',
      date: new Date().toISOString().split('T')[0],
      status: 'Final',

      mainContractor: currentProject?.contractor || 'Kyoly Construction Pvt. Ltd.',
      subcontractorName: 'Himalayan Steel & Shuttering Engineering Services Pvt. Ltd.',
      subcontractorRegNo: '289104/078/079',
      subcontractorPan: '619842105',
      subcontractorContact: '+977-9841234567 / info@himalayansteel.com.np',
      subcontractorAddress: 'Koteshwor-32, Kathmandu, Nepal',

      scopeOfWork:
        'Complete supply of heavy steel shuttering (props, acrow spans, steel plates), fabrication, cutting, bending, and tying of TMT reinforcement steel bars (Fe500D) up to 3rd floor slab casting as per approved structural drawings.',
      workLocation: currentProject
        ? `${currentProject.location.localLevelName}-${currentProject.location.wardNo}, ${currentProject.location.districtName}`
        : 'Budhanilkantha Site, Kathmandu',
      contractValue: 1850000,
      boqReference: 'BOQ-2026-001 (Items 4 & 5)',
      startDate: new Date().toISOString().split('T')[0],
      completionDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],

      materialResponsibility: 'Split by BOQ',
      labourResponsibility:
        'Subcontractor shall supply 100% of required skilled bar benders, shuttering carpenters, and supervisors.',
      qualityRequirements:
        'Reinforcement lap lengths, cover blocks (minimum 25mm for slabs, 40mm for columns/beams), and shuttering plumb tolerances strictly per Nepal Standard NBC 205:2012.',
      safetyCompliance:
        'Zero-compromise safety. Subcontractor must ensure all workers wear mandatory PPE (helmets, harnesses at heights > 2m, boots).',
      paymentTerms:
        'Running bill payments based on joint site measurement every 15 days. 5% retention held until final slab inspection.',
      measurementFrequency: 'Bi-weekly joint measurement with Kyoly Quality Control Engineer.',
      variationPolicy:
        'No variation shall be entertained without prior written Variation Order approved by Kyoly Project Director.',
      delayLiquidatedDamages:
        '0.05% of subcontract value per calendar day of unexcused delay, up to a maximum limit of 10%.',
      defectLiabilityPeriod: '6 months after completion of subcontract scope.',
      terminationTerms:
        'Main contractor may terminate with 3 days notice in case of repeated defective workmanship, unauthorized abandonment, or gross safety violations.',
      disputeResolution:
        'Direct resolution by Kyoly Managing Director, followed by arbitration in Kathmandu.',

      preparedBy: 'Contracts & Procurement - Kyoly',
      approvedBy: 'Director of Operations',
      updatedAt: new Date().toISOString(),
    };
  };

  const [formData, setFormData] = useState<SubcontractAgreement>(buildInitialForm);

  useEffect(() => {
    if (isOpen) {
      setFormData(buildInitialForm());
    }
  }, [isOpen, agreementToEdit, project, selectedProjectId]);

  if (!isOpen) return null;

  const handleSave = () => {
    saveSubcontractAgreement(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="bg-[#0B0F19] text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center border border-[#FF6B00]/30">
              <Handshake className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  Subcontract Agreement (सहायक ठेक्का सम्झौता)
                </h2>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#FF6B00] text-white">
                  {formData.docNumber}
                </span>
                <span className="text-xs text-neutral-400 font-mono">({formData.revision})</span>
              </div>
              <p className="text-xs text-neutral-400">
                Specialized trade subcontracting contract between Main Contractor and Subcontractor
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

              {/* Subcontractor Details */}
              <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-100 text-[#0F172A] font-bold text-sm">
                  <Building2 className="w-4 h-4 text-[#FF6B00]" />
                  <span>Subcontractor Information (सहायक ठेकेदारको विवरण)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Subcontractor Firm / Company Name *</label>
                    <input
                      type="text"
                      value={formData.subcontractorName}
                      onChange={(e) => setFormData({ ...formData, subcontractorName: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Registration No. & PAN / VAT *</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={formData.subcontractorRegNo}
                        onChange={(e) => setFormData({ ...formData, subcontractorRegNo: e.target.value })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono text-[11px]"
                        placeholder="Reg No."
                      />
                      <input
                        type="text"
                        value={formData.subcontractorPan}
                        onChange={(e) => setFormData({ ...formData, subcontractorPan: e.target.value })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono text-[11px]"
                        placeholder="PAN/VAT"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Office Address</label>
                    <input
                      type="text"
                      value={formData.subcontractorAddress}
                      onChange={(e) => setFormData({ ...formData, subcontractorAddress: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Contact Phone & Email</label>
                    <input
                      type="text"
                      value={formData.subcontractorContact}
                      onChange={(e) => setFormData({ ...formData, subcontractorContact: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Scope & Contract Value */}
              <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-100 text-[#0F172A] font-bold text-sm">
                  <DollarSign className="w-4 h-4 text-[#FF6B00]" />
                  <span>Subcontract Scope & Value (कार्यक्षेत्र र सम्झौता रकम)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="sm:col-span-3">
                    <label className="block font-bold text-neutral-700 mb-1">Specific Subcontract Scope of Work *</label>
                    <textarea
                      rows={3}
                      value={formData.scopeOfWork}
                      onChange={(e) => setFormData({ ...formData, scopeOfWork: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Subcontract Value (NPR) *</label>
                    <input
                      type="number"
                      value={formData.contractValue}
                      onChange={(e) => setFormData({ ...formData, contractValue: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border-2 border-[#FF6B00] rounded-lg font-bold text-sm text-[#0F172A]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">BOQ Item Reference</label>
                    <input
                      type="text"
                      value={formData.boqReference}
                      onChange={(e) => setFormData({ ...formData, boqReference: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Material Responsibility</label>
                    <select
                      value={formData.materialResponsibility}
                      onChange={(e) => setFormData({ ...formData, materialResponsibility: e.target.value as any })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-semibold"
                    >
                      <option value="Main Contractor">Main Contractor Supplies Materials</option>
                      <option value="Subcontractor">Subcontractor Supplies Materials</option>
                      <option value="Split by BOQ">Split by BOQ Specification</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Target Start Date</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Target Completion Date</label>
                    <input
                      type="date"
                      value={formData.completionDate}
                      onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Measurement Frequency</label>
                    <input
                      type="text"
                      value={formData.measurementFrequency}
                      onChange={(e) => setFormData({ ...formData, measurementFrequency: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Quality, Liquidated Damages & Terms */}
              <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-100 text-[#0F172A] font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
                  <span>Quality Standards, Delay Damages & Legal Clauses</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Quality Requirements & Tolerances</label>
                    <textarea
                      rows={2}
                      value={formData.qualityRequirements}
                      onChange={(e) => setFormData({ ...formData, qualityRequirements: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Safety & PPE Compliance Terms</label>
                    <textarea
                      rows={2}
                      value={formData.safetyCompliance}
                      onChange={(e) => setFormData({ ...formData, safetyCompliance: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Liquidated Damages for Delay</label>
                    <input
                      type="text"
                      value={formData.delayLiquidatedDamages}
                      onChange={(e) => setFormData({ ...formData, delayLiquidatedDamages: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Defect Liability Period</label>
                    <input
                      type="text"
                      value={formData.defectLiabilityPeriod}
                      onChange={(e) => setFormData({ ...formData, defectLiabilityPeriod: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <LegalDisclaimerBox documentType="Subcontract Agreement" />
            </div>
          ) : (
            /* PRINT PREVIEW */
            <div className="bg-white p-6 sm:p-10 rounded-xl shadow-lg border border-neutral-300 max-w-4xl mx-auto text-[#0F172A] leading-relaxed">
              <DocumentPrintHeaderFooter
                docNumber={formData.docNumber}
                revision={formData.revision}
                date={formData.date}
                docTitle="SUBCONTRACT AGREEMENT (सहायक निर्माण ठेक्का सम्झौता)"
                project={currentProject}
                status={formData.status}
              />

              <div className="my-6 text-sm text-justify space-y-4">
                <p>
                  This <strong>SUBCONTRACT AGREEMENT</strong> is made and executed on <strong>{formData.date}</strong> by and
                  between:
                </p>

                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 text-xs space-y-2">
                  <p>
                    <strong>1. THE MAIN CONTRACTOR:</strong>{' '}
                    <span className="font-semibold">{formData.mainContractor}</span>, Reg No. 343834/080/081, PAN: 620155829.
                  </p>
                  <p>
                    <strong>2. THE SUBCONTRACTOR:</strong>{' '}
                    <span className="font-semibold">{formData.subcontractorName}</span>, Office Address:{' '}
                    {formData.subcontractorAddress}, Reg No: {formData.subcontractorRegNo}, PAN: {formData.subcontractorPan}.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <h4 className="font-bold text-neutral-900 border-b pb-1">1. SUBCONTRACT SCOPE & SITE</h4>
                    <p className="mt-1">
                      {formData.scopeOfWork} at project location <strong>{formData.workLocation}</strong> (Reference:{' '}
                      {formData.boqReference}).
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-neutral-900 border-b pb-1">2. CONTRACT VALUE & BILLING</h4>
                    <p className="mt-1">
                      Agreed Subcontract Sum: <strong>NPR {formData.contractValue.toLocaleString()}</strong>. Billing based on{' '}
                      {formData.measurementFrequency} joint measurement. {formData.paymentTerms}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-neutral-900 border-b pb-1">3. QUALITY, SAFETY & DAMAGES</h4>
                    <p className="mt-1">
                      {formData.qualityRequirements} {formData.safetyCompliance} Liquidated Damages:{' '}
                      {formData.delayLiquidatedDamages}. Defect Liability: {formData.defectLiabilityPeriod}.
                    </p>
                  </div>
                </div>

                {/* Signatures */}
                <div className="pt-8 mt-6 border-t-2 border-neutral-300 grid grid-cols-2 gap-8 text-xs">
                  <div className="space-y-4">
                    <p className="font-bold uppercase text-neutral-700">For Main Contractor (Kyoly):</p>
                    <div className="h-14 border-b border-dashed border-neutral-400 flex items-end pb-1">
                      <span className="font-serif italic text-neutral-700">Er. Sujan Karki</span>
                    </div>
                    <p className="text-neutral-500">Authorized Signature & Seal</p>
                  </div>

                  <div className="space-y-4">
                    <p className="font-bold uppercase text-neutral-700">For Subcontractor:</p>
                    <div className="h-14 border-b border-dashed border-neutral-400 flex items-end pb-1">
                      <span className="font-serif italic text-neutral-700">{formData.subcontractorName}</span>
                    </div>
                    <p className="text-neutral-500">Managing Representative & Seal</p>
                  </div>
                </div>
              </div>

              <LegalDisclaimerBox documentType="Subcontract Agreement" />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white px-6 py-3.5 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <DocumentStatusBadge status={formData.status} />
            <span className="text-xs text-neutral-500">
              Subcontractor: <strong className="text-neutral-800">{formData.subcontractorName}</strong>
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
              <span>Save Subcontract</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
