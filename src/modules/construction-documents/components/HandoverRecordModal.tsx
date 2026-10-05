import React, { useState, useEffect } from 'react';
import { BuildingHandoverRecord, HandoverCategoryItem, PunchListItem, ProjectProfile, DocumentStatus } from '../types';
import { useConstructionDocuments } from '../context/ConstructionDocumentsContext';
import { DocumentPrintHeaderFooter } from './DocumentPrintHeaderFooter';
import { DocumentStatusBadge } from './DocumentStatusBadge';
import { LegalDisclaimerBox } from './LegalDisclaimerBox';
import {
  X,
  Save,
  Printer,
  Key,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  FileCheck,
  ShieldCheck,
  Eye,
  Edit3,
} from 'lucide-react';

interface HandoverRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  recordToEdit?: BuildingHandoverRecord;
  project?: ProjectProfile;
}

export const HandoverRecordModal: React.FC<HandoverRecordModalProps> = ({
  isOpen,
  onClose,
  recordToEdit,
  project,
}) => {
  const {
    saveHandoverRecord,
    getNextDocNumber,
    projects,
    selectedProjectId,
  } = useConstructionDocuments();

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const currentProject =
    project ||
    projects.find((p) => p.id === (recordToEdit?.projectId || selectedProjectId)) ||
    projects[0];

  const buildInitialForm = (): BuildingHandoverRecord => {
    if (recordToEdit) {
      return JSON.parse(JSON.stringify(recordToEdit));
    }

    const defaultCategories: HandoverCategoryItem[] = [
      { id: 'cat-1', category: 'Civil & RCC Structure', inspected: true, status: 'Satisfactory', remarks: 'Sound structure, no cracks or dampness observed' },
      { id: 'cat-2', category: 'Roof & Terrace Waterproofing', inspected: true, status: 'Satisfactory', remarks: 'Ponding test completed with 72-hour zero seepage' },
      { id: 'cat-3', category: 'Electrical Distribution & Earthing', inspected: true, status: 'Satisfactory', remarks: 'Megger insulation test & earthing < 2 ohms verified' },
      { id: 'cat-4', category: 'Sanitary Fixtures & Drainage', inspected: true, status: 'Satisfactory', remarks: 'Pressure testing of lines, leak-free traps & gully pits' },
      { id: 'cat-5', category: 'Joinery, Doors & Windows', inspected: true, status: 'Satisfactory', remarks: 'Smooth hardware operation, weather strips intact' },
      { id: 'cat-6', category: 'Interior & Exterior Painting', inspected: true, status: 'Satisfactory', remarks: 'Uniform finish, clean skirting and trim lines' },
    ];

    const defaultPunchList: PunchListItem[] = [
      {
        id: 'punch-1',
        sn: 1,
        item: 'Touch-up paint near stairwell handrail base',
        location: 'First floor staircase',
        defectOrOutstandingWork: 'Minor scratch during railing fixing',
        responsibleParty: 'Kyoly Finishing Team',
        targetDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'Rectified',
        remarks: 'Repainted and approved by owner on site',
      },
      {
        id: 'punch-2',
        sn: 2,
        item: 'Master bathroom shower mixer water pressure',
        location: 'Second floor master bedroom',
        defectOrOutstandingWork: 'Aerator filter cleaning required',
        responsibleParty: 'Kyoly Plumbing Team',
        targetDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'Verified & Closed',
        remarks: 'Aerator cleared, pressure verified',
      },
    ];

    return {
      id: `ho-${Date.now()}`,
      docNumber: getNextDocNumber('HANDOVER'),
      projectId: currentProject?.id || '',
      revision: 'Rev 0',
      date: new Date().toISOString().split('T')[0],
      status: 'Final',

      contractNo: 'KCPL-CONT-2026-08',
      completionDate: new Date().toISOString().split('T')[0],
      handoverDate: new Date().toISOString().split('T')[0],
      ownerRep: currentProject?.clientOwner || 'Ram Bahadur Shrestha',
      contractorRep: 'Er. Sujan Karki (Managing Director - Kyoly)',

      checklist: defaultCategories,
      punchList: defaultPunchList,

      keysHandedOverCount: 18,
      equipmentManualsHandedOver: true,
      warrantiesHandedOver: true,
      asBuiltDrawingsHandedOver: true,
      completionCertificateHandedOver: true,
      finalStatementNotes:
        'The First Party (Owner) acknowledges full physical possession and peaceful receipt of the residential premises together with all sets of architectural/structural as-built drawings, keys, and warranty certificates. Defect Liability Period of 12 months commences as of this date.',

      ownerSigned: true,
      contractorSigned: true,
      updatedAt: new Date().toISOString(),
    };
  };

  const [formData, setFormData] = useState<BuildingHandoverRecord>(buildInitialForm);

  useEffect(() => {
    if (isOpen) {
      setFormData(buildInitialForm());
    }
  }, [isOpen, recordToEdit, project, selectedProjectId]);

  if (!isOpen) return null;

  const handleAddPunchItem = () => {
    const newItem: PunchListItem = {
      id: `punch-${Date.now()}`,
      sn: formData.punchList.length + 1,
      item: 'New snag or touch-up item',
      location: 'Site location...',
      defectOrOutstandingWork: 'Description...',
      responsibleParty: 'Kyoly Site Team',
      targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Open',
    };
    setFormData({
      ...formData,
      punchList: [...formData.punchList, newItem],
    });
  };

  const handleSave = () => {
    saveHandoverRecord(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="bg-[#0B0F19] text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center border border-[#FF6B00]/30">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  Building Handover Record & Snag/Punch List
                </h2>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#FF6B00] text-white">
                  {formData.docNumber}
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Official key handover, as-built documentation delivery & punch list closure
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
                <span>Handover Deed</span>
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
              {/* Handover Details */}
              <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-100 text-[#0F172A] font-bold text-sm">
                  <Key className="w-4 h-4 text-[#FF6B00]" />
                  <span>Possession & Document Transfer Particulars</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Handover Date</label>
                    <input
                      type="date"
                      value={formData.handoverDate}
                      onChange={(e) => setFormData({ ...formData, handoverDate: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Contract Reference</label>
                    <input
                      type="text"
                      value={formData.contractNo}
                      onChange={(e) => setFormData({ ...formData, contractNo: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Number of Key Sets Transferred</label>
                    <input
                      type="number"
                      value={formData.keysHandedOverCount}
                      onChange={(e) =>
                        setFormData({ ...formData, keysHandedOverCount: parseInt(e.target.value) || 0 })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-bold font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Owner Representative</label>
                    <input
                      type="text"
                      value={formData.ownerRep}
                      onChange={(e) => setFormData({ ...formData, ownerRep: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-semibold"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-neutral-700 mb-1">Contractor Representative</label>
                    <input
                      type="text"
                      value={formData.contractorRep}
                      onChange={(e) => setFormData({ ...formData, contractorRep: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-semibold"
                    />
                  </div>
                </div>

                {/* Transfer Checkboxes */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-neutral-100 text-xs">
                  <label className="flex items-center gap-2 text-neutral-800 font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.asBuiltDrawingsHandedOver}
                      onChange={(e) => setFormData({ ...formData, asBuiltDrawingsHandedOver: e.target.checked })}
                      className="rounded text-[#FF6B00] focus:ring-[#FF6B00] w-4 h-4"
                    />
                    <span>As-Built Drawings Set</span>
                  </label>

                  <label className="flex items-center gap-2 text-neutral-800 font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.equipmentManualsHandedOver}
                      onChange={(e) => setFormData({ ...formData, equipmentManualsHandedOver: e.target.checked })}
                      className="rounded text-[#FF6B00] focus:ring-[#FF6B00] w-4 h-4"
                    />
                    <span>Equipment Manuals</span>
                  </label>

                  <label className="flex items-center gap-2 text-neutral-800 font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.warrantiesHandedOver}
                      onChange={(e) => setFormData({ ...formData, warrantiesHandedOver: e.target.checked })}
                      className="rounded text-[#FF6B00] focus:ring-[#FF6B00] w-4 h-4"
                    />
                    <span>Warranty Certificates</span>
                  </label>

                  <label className="flex items-center gap-2 text-neutral-800 font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.completionCertificateHandedOver}
                      onChange={(e) =>
                        setFormData({ ...formData, completionCertificateHandedOver: e.target.checked })
                      }
                      className="rounded text-[#FF6B00] focus:ring-[#FF6B00] w-4 h-4"
                    />
                    <span>Municipal Completion Cert</span>
                  </label>
                </div>
              </div>

              {/* Punch / Snag List */}
              <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-neutral-900 text-sm">Pre-Handover Snag & Punch List</h3>
                    <p className="text-xs text-neutral-500">
                      Track minor touches, rectifications and verification closures prior to full sign-off.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddPunchItem}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FF6B00] hover:bg-[#E04800] text-white rounded-lg text-xs font-bold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Snag Item</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#0B0F19] text-white uppercase text-[11px] font-bold">
                      <tr>
                        <th className="px-3 py-2.5 w-12 text-center">S.N.</th>
                        <th className="px-3 py-2.5">Item & Location</th>
                        <th className="px-3 py-2.5 w-32">Responsible</th>
                        <th className="px-3 py-2.5 w-32 text-center">Status</th>
                        <th className="px-2 py-2.5 w-12 text-center"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {formData.punchList.map((p, idx) => (
                        <tr key={p.id} className="hover:bg-neutral-50/80">
                          <td className="px-3 py-2 text-center font-mono font-bold text-neutral-500">{idx + 1}</td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={p.item}
                              onChange={(e) => {
                                const updated = [...formData.punchList];
                                updated[idx].item = e.target.value;
                                setFormData({ ...formData, punchList: updated });
                              }}
                              className="w-full px-2 py-1 border border-neutral-200 rounded font-semibold text-xs"
                            />
                            <div className="flex gap-2 mt-1">
                              <input
                                type="text"
                                value={p.location}
                                onChange={(e) => {
                                  const updated = [...formData.punchList];
                                  updated[idx].location = e.target.value;
                                  setFormData({ ...formData, punchList: updated });
                                }}
                                className="w-1/2 px-2 py-0.5 border border-neutral-200 rounded text-[11px] text-neutral-500"
                                placeholder="Location..."
                              />
                              <input
                                type="text"
                                value={p.remarks || ''}
                                onChange={(e) => {
                                  const updated = [...formData.punchList];
                                  updated[idx].remarks = e.target.value;
                                  setFormData({ ...formData, punchList: updated });
                                }}
                                className="w-1/2 px-2 py-0.5 border border-neutral-200 rounded text-[11px] text-neutral-500"
                                placeholder="Remarks..."
                              />
                            </div>
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={p.responsibleParty}
                              onChange={(e) => {
                                const updated = [...formData.punchList];
                                updated[idx].responsibleParty = e.target.value;
                                setFormData({ ...formData, punchList: updated });
                              }}
                              className="w-full px-2 py-1 border border-neutral-200 rounded text-xs"
                            />
                          </td>
                          <td className="px-3 py-2 text-center">
                            <select
                              value={p.status}
                              onChange={(e) => {
                                const updated = [...formData.punchList];
                                updated[idx].status = e.target.value as any;
                                setFormData({ ...formData, punchList: updated });
                              }}
                              className="px-2 py-1 rounded text-xs font-bold border border-neutral-300 bg-white"
                            >
                              <option value="Open">Open</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Rectified">Rectified</option>
                              <option value="Verified & Closed">Verified & Closed</option>
                            </select>
                          </td>
                          <td className="px-2 py-2 text-center">
                            <button
                              type="button"
                              onClick={() => {
                                const updated = formData.punchList.filter((_, i) => i !== idx);
                                setFormData({ ...formData, punchList: updated });
                              }}
                              className="text-neutral-400 hover:text-red-500 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <LegalDisclaimerBox documentType="Handover Record" />
            </div>
          ) : (
            /* PRINT PREVIEW */
            <div className="bg-white p-6 sm:p-10 rounded-xl shadow-lg border border-neutral-300 max-w-4xl mx-auto text-[#0F172A] leading-relaxed">
              <DocumentPrintHeaderFooter
                docNumber={formData.docNumber}
                revision={formData.revision}
                date={formData.date}
                docTitle="BUILDING POSSESSION & HANDOVER CERTIFICATE (हस्तान्तरण मुचुल्का)"
                project={currentProject}
                status={formData.status}
              />

              <div className="my-6 space-y-4 text-xs text-justify">
                <p>
                  This official <strong>HANDOVER & ACCEPTANCE DEED</strong> is executed on{' '}
                  <strong>{formData.handoverDate}</strong> between <strong>Kyoly Construction Pvt. Ltd.</strong> (Contractor)
                  and <strong>{formData.ownerRep}</strong> (Owner / Employer).
                </p>

                <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-xl space-y-2">
                  <p>
                    <strong>1. DELIVERABLES HANDED OVER:</strong> Total of <strong>{formData.keysHandedOverCount} Sets</strong> of
                    door/gate keys, full set of As-Built Architectural and Structural Drawings, Equipment Operational Manuals,
                    and Waterproofing Warranties.
                  </p>
                  <p>
                    <strong>2. DEFECT LIABILITY COMMENCEMENT:</strong> The 12-month Defect Liability Period begins effective
                    today.
                  </p>
                  <p>
                    <strong>3. FINAL ACCEPTANCE:</strong> {formData.finalStatementNotes}
                  </p>
                </div>

                {/* Signatures */}
                <div className="pt-8 mt-6 border-t-2 border-neutral-300 grid grid-cols-2 gap-8">
                  <div>
                    <p className="font-bold text-neutral-700 uppercase">Handed Over By (Contractor):</p>
                    <div className="h-14 border-b border-dashed border-neutral-400 flex items-end pb-1">
                      <span className="font-serif italic text-neutral-700">{formData.contractorRep}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-neutral-700 uppercase">Received & Accepted By (Owner):</p>
                    <div className="h-14 border-b border-dashed border-neutral-400 flex items-end pb-1">
                      <span className="font-serif italic text-emerald-700">{formData.ownerRep}</span>
                    </div>
                  </div>
                </div>
              </div>

              <LegalDisclaimerBox documentType="Handover Record" />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white px-6 py-3.5 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <DocumentStatusBadge status={formData.status} />
            <span className="text-xs text-neutral-500">
              Handover Date: <strong className="text-neutral-900">{formData.handoverDate}</strong>
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
                <span>Print Record</span>
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
              <span>Save Record</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
