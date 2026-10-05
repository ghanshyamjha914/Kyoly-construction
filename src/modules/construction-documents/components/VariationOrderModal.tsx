import React, { useState, useEffect } from 'react';
import { VariationOrder, ProjectProfile, DocumentStatus } from '../types';
import { useConstructionDocuments } from '../context/ConstructionDocumentsContext';
import { DocumentPrintHeaderFooter } from './DocumentPrintHeaderFooter';
import { DocumentStatusBadge } from './DocumentStatusBadge';
import { LegalDisclaimerBox } from './LegalDisclaimerBox';
import {
  X,
  Save,
  Printer,
  FileSpreadsheet,
  AlertCircle,
  Clock,
  DollarSign,
  CheckCircle2,
  GitBranch,
  Eye,
  Edit3,
} from 'lucide-react';

interface VariationOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  variationToEdit?: VariationOrder;
  project?: ProjectProfile;
}

export const VariationOrderModal: React.FC<VariationOrderModalProps> = ({
  isOpen,
  onClose,
  variationToEdit,
  project,
}) => {
  const {
    saveVariationOrder,
    getNextDocNumber,
    projects,
    selectedProjectId,
  } = useConstructionDocuments();

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const currentProject =
    project ||
    projects.find((p) => p.id === (variationToEdit?.projectId || selectedProjectId)) ||
    projects[0];

  const buildInitialForm = (): VariationOrder => {
    if (variationToEdit) {
      return JSON.parse(JSON.stringify(variationToEdit));
    }

    return {
      id: `vo-${Date.now()}`,
      docNumber: getNextDocNumber('VO'),
      projectId: currentProject?.id || '',
      revision: 'Rev 0',
      date: new Date().toISOString().split('T')[0],
      status: 'Under Review',
      variationOrderNo: 'VO-01',
      originalScopeSummary:
        'Standard RCC retaining boundary wall 1.8m height along northern property border as specified in BOQ Item 2.4.',
      variationDescription:
        'Increase retaining wall height from 1.8m to 2.8m and provide additional weep holes, geotextile filter fabric, and counterfort support due to newly graded adjacent road elevation.',
      reasonForVariation:
        'Site condition change and municipal master road widening requiring elevated soil stabilization to protect foundation safety.',
      quantityDiff: 32.5,
      unit: 'cu.m',
      originalRate: 16500,
      newRate: 16500,
      additionalOrDeductedAmount: 32.5 * 16500,
      timeImpactDays: 14,
      clientApprovalStatus: 'Approved',
      clientApprovalDate: new Date().toISOString().split('T')[0],
      clientApprovedBy: currentProject?.clientOwner || 'Ram B. Shrestha',
      contractorApprovalStatus: 'Accepted',
      contractorApprovedBy: 'Er. Sujan Karki',
      remarks:
        'Cost impact of NPR 536,250 incorporated into Milestone 4 billing. 14 calendar days time extension added to expected completion schedule.',
      preparedBy: 'Er. Sujan Karki (Project Manager)',
      updatedAt: new Date().toISOString(),
    };
  };

  const [formData, setFormData] = useState<VariationOrder>(buildInitialForm);

  useEffect(() => {
    if (isOpen) {
      setFormData(buildInitialForm());
    }
  }, [isOpen, variationToEdit, project, selectedProjectId]);

  if (!isOpen) return null;

  const handleQtyRateChange = (qty: number, rate: number) => {
    const amt = Math.round(qty * rate);
    setFormData({
      ...formData,
      quantityDiff: qty,
      newRate: rate,
      additionalOrDeductedAmount: amt,
    });
  };

  const handleSave = () => {
    saveVariationOrder(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="bg-[#0B0F19] text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center border border-[#FF6B00]/30">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  Variation Order (VO) & Scope Change Notice
                </h2>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#FF6B00] text-white">
                  {formData.variationOrderNo} ({formData.docNumber})
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Official engineering change management, cost variance analysis & time extension certification
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
                <span>VO Form</span>
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
                    Variation Order Ref No.
                  </label>
                  <input
                    type="text"
                    value={formData.variationOrderNo}
                    onChange={(e) => setFormData({ ...formData, variationOrderNo: e.target.value })}
                    className="w-full px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-600 uppercase mb-1">
                    Issue Date
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
                    Client Approval Status
                  </label>
                  <select
                    value={formData.clientApprovalStatus}
                    onChange={(e) => setFormData({ ...formData, clientApprovalStatus: e.target.value as any })}
                    className="w-full px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-bold text-[#0F172A]"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
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

              {/* Scope & Reason */}
              <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-100 text-[#0F172A] font-bold text-sm">
                  <GitBranch className="w-4 h-4 text-[#FF6B00]" />
                  <span>Scope Variation Description & Engineering Justification</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Original Contract Scope Summary</label>
                    <textarea
                      rows={2}
                      value={formData.originalScopeSummary}
                      onChange={(e) => setFormData({ ...formData, originalScopeSummary: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">
                      Proposed Variation / Modification Description *
                    </label>
                    <textarea
                      rows={3}
                      value={formData.variationDescription}
                      onChange={(e) => setFormData({ ...formData, variationDescription: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Technical Reason / Site Justification</label>
                    <textarea
                      rows={2}
                      value={formData.reasonForVariation}
                      onChange={(e) => setFormData({ ...formData, reasonForVariation: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Financial & Time Impact */}
              <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-100 text-[#0F172A] font-bold text-sm">
                  <DollarSign className="w-4 h-4 text-[#FF6B00]" />
                  <span>Cost Variance & Schedule Impact Analysis</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Quantity Variance (+/-)</label>
                    <input
                      type="number"
                      step="any"
                      value={formData.quantityDiff}
                      onChange={(e) =>
                        handleQtyRateChange(parseFloat(e.target.value) || 0, formData.newRate)
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-bold font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Unit of Measurement</label>
                    <input
                      type="text"
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono text-center"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Agreed Rate (NPR)</label>
                    <input
                      type="number"
                      step="any"
                      value={formData.newRate}
                      onChange={(e) =>
                        handleQtyRateChange(formData.quantityDiff, parseFloat(e.target.value) || 0)
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-bold font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Cost Impact (NPR)</label>
                    <input
                      type="number"
                      value={formData.additionalOrDeductedAmount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          additionalOrDeductedAmount: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full px-3 py-2 border-2 border-[#FF6B00] rounded-lg font-bold font-mono text-[#0F172A]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-neutral-700 mb-1">
                      Time Schedule Extension (Calendar Days)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={formData.timeImpactDays}
                        onChange={(e) => setFormData({ ...formData, timeImpactDays: parseInt(e.target.value) || 0 })}
                        className="w-32 px-3 py-2 border border-neutral-300 rounded-lg font-bold"
                      />
                      <span className="text-neutral-500 text-xs">
                        {formData.timeImpactDays > 0
                          ? `+${formData.timeImpactDays} Days extension of completion deadline`
                          : 'No change to schedule'}
                      </span>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-neutral-700 mb-1">Client Approved Signatory</label>
                    <input
                      type="text"
                      value={formData.clientApprovedBy || ''}
                      onChange={(e) => setFormData({ ...formData, clientApprovedBy: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-medium"
                    />
                  </div>
                </div>
              </div>

              <LegalDisclaimerBox documentType="Variation Order" />
            </div>
          ) : (
            /* PRINT PREVIEW */
            <div className="bg-white p-6 sm:p-10 rounded-xl shadow-lg border border-neutral-300 max-w-4xl mx-auto text-[#0F172A] leading-relaxed">
              <DocumentPrintHeaderFooter
                docNumber={formData.docNumber}
                revision={formData.revision}
                date={formData.date}
                docTitle="OFFICIAL VARIATION ORDER & IMPACT NOTICE"
                project={currentProject}
                status={formData.status}
              />

              <div className="my-6 space-y-4 text-xs">
                <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 grid grid-cols-3 gap-4">
                  <div>
                    <span className="text-neutral-500 block">Variation Order No:</span>
                    <strong className="text-sm font-mono text-neutral-900">{formData.variationOrderNo}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Net Financial Impact:</span>
                    <strong className="text-sm font-mono text-[#FF6B00]">
                      NPR {formData.additionalOrDeductedAmount.toLocaleString()}
                    </strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Time Schedule Extension:</span>
                    <strong className="text-sm font-mono text-neutral-900">+{formData.timeImpactDays} Calendar Days</strong>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-neutral-900 border-b pb-1">1. DESCRIPTION OF VARIATION</h4>
                    <p className="mt-1">{formData.variationDescription}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-neutral-900 border-b pb-1">2. TECHNICAL JUSTIFICATION</h4>
                    <p className="mt-1">{formData.reasonForVariation}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-neutral-900 border-b pb-1">3. RATE & MEASUREMENT BREAKDOWN</h4>
                    <p className="mt-1">
                      Quantity: <strong>{formData.quantityDiff} {formData.unit}</strong> @ Rate: <strong>NPR {formData.newRate}</strong> = Total Addition: <strong>NPR {formData.additionalOrDeductedAmount.toLocaleString()}</strong>.
                    </p>
                  </div>
                </div>

                {/* Signatures */}
                <div className="pt-8 mt-6 border-t-2 border-neutral-300 grid grid-cols-2 gap-8">
                  <div>
                    <p className="font-bold text-neutral-700 uppercase">Recommended By (Contractor):</p>
                    <div className="h-14 border-b border-dashed border-neutral-400 flex items-end pb-1">
                      <span className="font-serif italic text-neutral-700">Er. Sujan Karki (Project Engineer)</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-neutral-700 uppercase">Approved By (Client / Owner):</p>
                    <div className="h-14 border-b border-dashed border-neutral-400 flex items-end pb-1">
                      <span className="font-serif italic text-emerald-700">
                        {formData.clientApprovedBy || 'Client Signature'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <LegalDisclaimerBox documentType="Variation Order" />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white px-6 py-3.5 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <DocumentStatusBadge status={formData.status} />
            <span className="text-xs text-neutral-500">
              Impact: <strong className="text-neutral-900 font-mono">NPR {formData.additionalOrDeductedAmount.toLocaleString()}</strong>
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
                <span>Print VO</span>
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
              <span>Save Variation Order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
