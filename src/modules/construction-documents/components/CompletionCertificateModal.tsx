import React, { useState, useEffect } from 'react';
import { CompletionCertificateRecord, ProjectProfile, DocumentStatus } from '../types';
import { useConstructionDocuments } from '../context/ConstructionDocumentsContext';
import { DocumentPrintHeaderFooter } from './DocumentPrintHeaderFooter';
import { DocumentStatusBadge } from './DocumentStatusBadge';
import { LegalDisclaimerBox } from './LegalDisclaimerBox';
import {
  X,
  Save,
  Printer,
  Award,
  Building,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Eye,
  Edit3,
} from 'lucide-react';

interface CompletionCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificateToEdit?: CompletionCertificateRecord;
  project?: ProjectProfile;
}

export const CompletionCertificateModal: React.FC<CompletionCertificateModalProps> = ({
  isOpen,
  onClose,
  certificateToEdit,
  project,
}) => {
  const {
    saveCompletionCertificate,
    getNextDocNumber,
    projects,
    selectedProjectId,
  } = useConstructionDocuments();

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const currentProject =
    project ||
    projects.find((p) => p.id === (certificateToEdit?.projectId || selectedProjectId)) ||
    projects[0];

  const buildInitialForm = (): CompletionCertificateRecord => {
    if (certificateToEdit) {
      return JSON.parse(JSON.stringify(certificateToEdit));
    }

    return {
      id: `cc-${Date.now()}`,
      docNumber: getNextDocNumber('COMP'),
      projectId: currentProject?.id || '',
      revision: 'Rev 0',
      date: new Date().toISOString().split('T')[0],
      status: 'Approved',

      permitNumber: 'NAKSHA-PAAS-2082-04-18',
      approvedDrawingReference: 'DWG-KMC-ARCH-STR-82/91',
      owner: currentProject?.clientOwner || 'Ram Bahadur Shrestha',
      projectAddress: currentProject
        ? `${currentProject.location.localLevelName}-${currentProject.location.wardNo}, ${currentProject.location.streetTole}`
        : 'Budhanilkantha-03, Deuba Chowk',
      wardNo: currentProject?.location.wardNo || 3,
      kittaNo: currentProject?.land.kittaNo || '412',

      approvedArea: 2680,
      actualAsBuiltArea: 2680,
      approvedFloors: '2.5 Storey',
      actualFloors: '2.5 Storey',

      completionDate: new Date().toISOString().split('T')[0],
      applicationDate: '2026-09-15',
      certificateNumber: 'NMP-SAM-2083-01-09',
      issueDate: new Date().toISOString().split('T')[0],
      authorityRemarks:
        'Final site inspection carried out jointly with Municipal Assistant Engineer. Building dimensions, setbacks, plinth level, and roof height conform fully to approved permit drawings and Nepal National Building Code.',

      hasDiscrepancy: false,
      discrepancyNotes: 'Zero unauthorized deviations. FAR and ground coverage are within statutory limits.',

      preparedBy: 'Er. Sujan Karki (Supervising Engineer)',
      certifiedBy: 'Ar. Manish Shakya (Registered Architect)',
      approvedBy: 'Chief Administrative Officer (Municipality)',
      updatedAt: new Date().toISOString(),
    };
  };

  const [formData, setFormData] = useState<CompletionCertificateRecord>(buildInitialForm);

  useEffect(() => {
    if (isOpen) {
      setFormData(buildInitialForm());
    }
  }, [isOpen, certificateToEdit, project, selectedProjectId]);

  if (!isOpen) return null;

  const handleSave = () => {
    saveCompletionCertificate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="bg-[#0B0F19] text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center border border-[#FF6B00]/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  Building Completion Certificate (निर्माण सम्पन्न प्रमाण-पत्र)
                </h2>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#FF6B00] text-white">
                  {formData.certificateNumber || formData.docNumber}
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Official statutory as-built completion and occupancy certification record
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
                <span>Certificate</span>
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
                    Certificate Number
                  </label>
                  <input
                    type="text"
                    value={formData.certificateNumber}
                    onChange={(e) => setFormData({ ...formData, certificateNumber: e.target.value })}
                    className="w-full px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-600 uppercase mb-1">
                    Permit Reference No.
                  </label>
                  <input
                    type="text"
                    value={formData.permitNumber}
                    onChange={(e) => setFormData({ ...formData, permitNumber: e.target.value })}
                    className="w-full px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-600 uppercase mb-1">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    value={formData.issueDate || formData.date}
                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                    className="w-full px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-600 uppercase mb-1">
                    Document Status
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

              {/* As-Built Comparison Card */}
              <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-100 text-[#0F172A] font-bold text-sm">
                  <Building className="w-4 h-4 text-[#FF6B00]" />
                  <span>Approved Permit vs As-Built Dimensional Verification</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 space-y-2">
                    <span className="font-bold text-neutral-700 block uppercase">Approved Permit Parameters</span>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] text-neutral-500">Approved Area (sq.ft)</label>
                        <input
                          type="number"
                          value={formData.approvedArea}
                          onChange={(e) => setFormData({ ...formData, approvedArea: parseFloat(e.target.value) || 0 })}
                          className="w-full px-2 py-1 border border-neutral-300 rounded font-bold font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-neutral-500">Approved Floors</label>
                        <input
                          type="text"
                          value={formData.approvedFloors}
                          onChange={(e) => setFormData({ ...formData, approvedFloors: e.target.value })}
                          className="w-full px-2 py-1 border border-neutral-300 rounded font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 space-y-2">
                    <span className="font-bold text-neutral-700 block uppercase">Actual As-Built Parameters</span>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] text-neutral-500">Actual As-Built Area (sq.ft)</label>
                        <input
                          type="number"
                          value={formData.actualAsBuiltArea}
                          onChange={(e) => setFormData({ ...formData, actualAsBuiltArea: parseFloat(e.target.value) || 0 })}
                          className="w-full px-2 py-1 border border-neutral-300 rounded font-bold font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-neutral-500">Actual As-Built Floors</label>
                        <input
                          type="text"
                          value={formData.actualFloors}
                          onChange={(e) => setFormData({ ...formData, actualFloors: e.target.value })}
                          className="w-full px-2 py-1 border border-neutral-300 rounded font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="flex items-center gap-2 font-bold text-neutral-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hasDiscrepancy}
                        onChange={(e) => setFormData({ ...formData, hasDiscrepancy: e.target.checked })}
                        className="rounded text-[#FF6B00] focus:ring-[#FF6B00] w-4 h-4"
                      />
                      <span>Flag Dimensional Discrepancy / Variation from Original Permit</span>
                    </label>
                    {formData.hasDiscrepancy && (
                      <textarea
                        rows={2}
                        value={formData.discrepancyNotes || ''}
                        onChange={(e) => setFormData({ ...formData, discrepancyNotes: e.target.value })}
                        className="w-full px-3 py-1.5 mt-2 border border-amber-300 bg-amber-50 rounded-lg text-xs text-amber-900"
                        placeholder="Detail specific deviations and whether compounding fees / revisions were approved..."
                      />
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-neutral-700 mb-1">
                      Authority Inspection Observations & Remarks
                    </label>
                    <textarea
                      rows={3}
                      value={formData.authorityRemarks}
                      onChange={(e) => setFormData({ ...formData, authorityRemarks: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              <LegalDisclaimerBox documentType="Completion Certificate" />
            </div>
          ) : (
            /* PRINT PREVIEW */
            <div className="bg-white p-6 sm:p-10 rounded-xl shadow-lg border border-neutral-300 max-w-4xl mx-auto text-[#0F172A] leading-relaxed">
              <DocumentPrintHeaderFooter
                docNumber={formData.docNumber}
                revision={formData.revision}
                date={formData.date}
                docTitle="BUILDING COMPLETION CERTIFICATE (निर्माण सम्पन्न प्रमाण-पत्र)"
                project={currentProject}
                status={formData.status}
              />

              <div className="my-6 space-y-4 text-xs text-justify">
                <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl text-center">
                  <span className="text-emerald-700 font-bold uppercase text-xs tracking-wider block">
                    Certificate of Building Occupancy & Technical Compliance
                  </span>
                  <strong className="text-base text-emerald-950 font-mono block mt-1">
                    CERTIFICATE NO: {formData.certificateNumber}
                  </strong>
                </div>

                <p>
                  This is to officially certify that the building constructed by <strong>{formData.owner}</strong> located at{' '}
                  <strong>
                    {formData.projectAddress}, Ward No. {formData.wardNo}
                  </strong>{' '}
                  bearing Kitta No. <strong>{formData.kittaNo}</strong>, under approved Building Permit No.{' '}
                  <span className="font-mono font-bold">{formData.permitNumber}</span>, has been completed and thoroughly
                  inspected as built.
                </p>

                <div className="border border-neutral-300 p-3 rounded-lg bg-neutral-50 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-neutral-500 block">Approved Floor Area:</span>
                    <strong>{formData.approvedArea} sq.ft ({formData.approvedFloors})</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Actual As-Built Floor Area:</span>
                    <strong>{formData.actualAsBuiltArea} sq.ft ({formData.actualFloors})</strong>
                  </div>
                </div>

                <p>
                  <strong>ENGINEERING FINDINGS:</strong> {formData.authorityRemarks}
                </p>

                {/* Signatures */}
                <div className="pt-8 mt-6 border-t-2 border-neutral-300 grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="h-14 border-b border-dashed border-neutral-400 flex items-end justify-center pb-1">
                      <span className="font-serif italic text-neutral-700">{formData.preparedBy}</span>
                    </div>
                    <p className="font-bold text-neutral-800 mt-2">Supervising Engineer</p>
                  </div>
                  <div>
                    <div className="h-14 border-b border-dashed border-neutral-400 flex items-end justify-center pb-1">
                      <span className="font-serif italic text-neutral-700">{formData.certifiedBy}</span>
                    </div>
                    <p className="font-bold text-neutral-800 mt-2">Consultant Architect</p>
                  </div>
                  <div>
                    <div className="h-14 border-b border-dashed border-neutral-400 flex items-end justify-center pb-1">
                      <span className="font-serif italic text-neutral-700">{formData.approvedBy}</span>
                    </div>
                    <p className="font-bold text-neutral-800 mt-2">Municipal Authority</p>
                  </div>
                </div>
              </div>

              <LegalDisclaimerBox documentType="Completion Certificate" />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white px-6 py-3.5 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <DocumentStatusBadge status={formData.status} />
            <span className="text-xs text-neutral-500">
              Cert: <strong className="text-neutral-900 font-mono">{formData.certificateNumber}</strong>
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
                <span>Print Certificate</span>
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
              <span>Save Certificate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
