import React, { useState, useEffect } from 'react';
import { HouseConstructionAgreement, ProjectProfile, DocumentStatus } from '../types';
import { useConstructionDocuments } from '../context/ConstructionDocumentsContext';
import { DocumentPrintHeaderFooter } from './DocumentPrintHeaderFooter';
import { DocumentStatusBadge } from './DocumentStatusBadge';
import { LegalDisclaimerBox } from './LegalDisclaimerBox';
import {
  X,
  Save,
  Printer,
  FileText,
  Building,
  User,
  DollarSign,
  Plus,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Eye,
  Edit3,
} from 'lucide-react';

interface HouseAgreementModalProps {
  isOpen: boolean;
  onClose: () => void;
  agreementToEdit?: HouseConstructionAgreement;
  project?: ProjectProfile;
}

export const HouseAgreementModal: React.FC<HouseAgreementModalProps> = ({
  isOpen,
  onClose,
  agreementToEdit,
  project,
}) => {
  const {
    saveHouseAgreement,
    getNextDocNumber,
    projects,
    selectedProjectId,
  } = useConstructionDocuments();

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  // Associated project
  const currentProject =
    project ||
    projects.find((p) => p.id === (agreementToEdit?.projectId || selectedProjectId)) ||
    projects[0];

  const buildInitialForm = (): HouseConstructionAgreement => {
    if (agreementToEdit) {
      return JSON.parse(JSON.stringify(agreementToEdit));
    }

    const defaultContractValue = 8500000;
    return {
      id: `hca-${Date.now()}`,
      docNumber: getNextDocNumber('HCA'),
      projectId: currentProject?.id || '',
      revision: 'Rev 0',
      date: new Date().toISOString().split('T')[0],
      status: 'Draft',

      ownerDetails: {
        fullName: currentProject?.clientOwner || 'Ram Bahadur Shrestha',
        address: currentProject
          ? `${currentProject.location.localLevelName}-${currentProject.location.wardNo}, ${currentProject.location.streetTole}`
          : 'Budhanilkantha-03, Deuba Chowk, Kathmandu',
        citizenshipNo: currentProject?.clientCitizenshipNo || '27-01-72-04512 (Kathmandu)',
        contact: currentProject?.clientContact || '+977-9851029384',
        email: currentProject?.clientEmail || 'ram.shrestha@example.com',
      },

      contractorDetails: {
        companyName: currentProject?.contractor || 'Kyoly Construction Pvt. Ltd.',
        registrationNo: currentProject?.contractorRegNo || '343834/080/081',
        panVatNo: currentProject?.contractorPan || '620155829',
        address: 'Kathmandu Corporate Office, Bagmati Province, Nepal',
        contact: '+977-9851000000 / 01-4455667',
        authorizedRepresentative: currentProject?.contractorRep || 'Er. Sujan Karki (Managing Director)',
      },

      contractType: 'Selected Materials + Labour',
      materialResponsibility: 'Shared Responsibility',
      materialResponsibilityDetails:
        'Contractor supplies structural materials (OPC 53 Cement, Fe500D TMT Rebar, Machine Crushed Aggregate, River Sand). Client selects and procures finishing tiles, sanitary ware, electrical designer fixtures, and interior paint.',

      scopeOfWork: [
        'Site preparation, earthwork excavation, PCC mud mat, and raft/isolated footings as per approved structural drawings.',
        'RCC frame structure including columns, plinth beams, tie beams, and slab casting up to 2.5 storeys.',
        'First-class brick masonry work in 1:4 and 1:6 cement-sand mortar with proper curing period.',
        'Interior and exterior 1:4 cement sand plastering with chicken mesh at RCC-masonry joints.',
        'Concealed conduit piping for electrical wiring and CPVC/PVC piping for sanitary and drainage system.',
      ],

      contractValue: defaultContractValue,
      paymentTerms: [
        { milestone: 'Mobilization & Advance', percentage: 10, amount: defaultContractValue * 0.1, notes: 'Upon signing agreement and site layout handover' },
        { milestone: 'Foundation & Footing Completion', percentage: 15, amount: defaultContractValue * 0.15, notes: 'After casting of footing and tie beams' },
        { milestone: 'Plinth Beam Level', percentage: 15, amount: defaultContractValue * 0.15, notes: 'After plinth backfilling, compaction, and soling' },
        { milestone: 'Ground Floor Slab Casting', percentage: 15, amount: defaultContractValue * 0.15, notes: 'After de-shuttering and cube test verification' },
        { milestone: 'First Floor Slab Casting', percentage: 15, amount: defaultContractValue * 0.15, notes: 'RCC structural frame completion' },
        { milestone: 'Brickwork & Internal Plaster', percentage: 15, amount: defaultContractValue * 0.15, notes: 'Upon completion of all internal masonry and plaster' },
        { milestone: 'Finishing & Services Handover', percentage: 10, amount: defaultContractValue * 0.1, notes: 'Flooring, painting, doors, windows & MEP test' },
        { milestone: 'Final Settlement / Retention', percentage: 5, amount: defaultContractValue * 0.05, notes: 'After Defect Liability Period of 12 months' },
      ],

      retentionPercentage: 5,
      defectLiabilityPeriodMonths: 12,
      disputeResolutionMethod:
        'Amicable negotiation within 30 days; failing which disputes shall be referred to arbitration in Kathmandu pursuant to the Nepal Arbitration Act 2055.',
      specialConditions:
        'All works shall strictly conform to Nepal National Building Code NBC 105:2020 for seismic design. Any alterations shall require an official Kyoly Variation Order prior to execution.',

      signatures: {
        ownerSigned: false,
        contractorSigned: true,
        contractorSignedDate: new Date().toISOString().split('T')[0],
        witness1Name: 'Er. Pradip Sharma (Site In-charge)',
        witness2Name: 'Advocate Hari Prasad Adhikari',
      },

      preparedBy: 'Contract Administration Dept - Kyoly',
      checkedBy: 'Legal & Engineering Review Team',
      approvedBy: 'Director of Operations',
      updatedAt: new Date().toISOString(),
    };
  };

  const [formData, setFormData] = useState<HouseConstructionAgreement>(buildInitialForm);

  useEffect(() => {
    if (isOpen) {
      setFormData(buildInitialForm());
    }
  }, [isOpen, agreementToEdit, project, selectedProjectId]);

  if (!isOpen) return null;

  // Handle milestone percentage change
  const handleMilestoneChange = (index: number, field: string, val: any) => {
    const updated = [...formData.paymentTerms];
    updated[index] = { ...updated[index], [field]: val };

    if (field === 'percentage') {
      const pct = parseFloat(val) || 0;
      updated[index].amount = Math.round((formData.contractValue * pct) / 100);
    } else if (field === 'amount') {
      const amt = parseFloat(val) || 0;
      updated[index].percentage =
        formData.contractValue > 0 ? parseFloat(((amt / formData.contractValue) * 100).toFixed(1)) : 0;
    }

    setFormData({ ...formData, paymentTerms: updated });
  };

  const handleContractValueChange = (newVal: number) => {
    const updatedTerms = formData.paymentTerms.map((m) => ({
      ...m,
      amount: Math.round((newVal * m.percentage) / 100),
    }));
    setFormData({ ...formData, contractValue: newVal, paymentTerms: updatedTerms });
  };

  const handleAddScopeItem = () => {
    setFormData({
      ...formData,
      scopeOfWork: [...formData.scopeOfWork, 'New construction scope specification...'],
    });
  };

  const handleRemoveScopeItem = (idx: number) => {
    setFormData({
      ...formData,
      scopeOfWork: formData.scopeOfWork.filter((_, i) => i !== idx),
    });
  };

  const handleScopeChange = (idx: number, text: string) => {
    const updated = [...formData.scopeOfWork];
    updated[idx] = text;
    setFormData({ ...formData, scopeOfWork: updated });
  };

  const totalPercentage = formData.paymentTerms.reduce((sum, item) => sum + (item.percentage || 0), 0);
  const totalAmount = formData.paymentTerms.reduce((sum, item) => sum + (item.amount || 0), 0);

  const handleSave = () => {
    saveHouseAgreement(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="bg-[#0B0F19] text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center border border-[#FF6B00]/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  House Construction Agreement
                </h2>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#FF6B00] text-white">
                  {formData.docNumber}
                </span>
                <span className="text-xs text-neutral-400 font-mono">({formData.revision})</span>
              </div>
              <p className="text-xs text-neutral-400">
                Private residential construction contract conforming to Nepal standard practice
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View / Edit Mode Switch */}
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
                <span>Print Preview</span>
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
              {/* Document Metadata Bar */}
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
                    Document Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as DocumentStatus })}
                    className="w-full px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-bold text-[#0F172A]"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Correction Required">Correction Required</option>
                    <option value="Final">Final</option>
                    <option value="Approved">Approved</option>
                    <option value="Printed">Printed</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* SECTION 1: OWNER & CONTRACTOR DETAILS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Owner Card */}
                <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs">
                  <div className="flex items-center gap-2 pb-3 mb-3 border-b border-neutral-100 text-[#0F172A] font-bold text-sm">
                    <User className="w-4 h-4 text-[#FF6B00]" />
                    <span>Owner / First Party (Employer)</span>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-medium text-neutral-600 mb-0.5">Full Name *</label>
                      <input
                        type="text"
                        value={formData.ownerDetails.fullName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            ownerDetails: { ...formData.ownerDetails, fullName: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 border border-neutral-300 rounded-lg font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-neutral-600 mb-0.5">Permanent / Contact Address</label>
                      <input
                        type="text"
                        value={formData.ownerDetails.address}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            ownerDetails: { ...formData.ownerDetails, address: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 border border-neutral-300 rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-medium text-neutral-600 mb-0.5">Citizenship / ID No.</label>
                        <input
                          type="text"
                          value={formData.ownerDetails.citizenshipNo}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              ownerDetails: { ...formData.ownerDetails, citizenshipNo: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 border border-neutral-300 rounded-lg font-mono text-[11px]"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-neutral-600 mb-0.5">Phone Contact</label>
                        <input
                          type="text"
                          value={formData.ownerDetails.contact}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              ownerDetails: { ...formData.ownerDetails, contact: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 border border-neutral-300 rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-medium text-neutral-600 mb-0.5">Email Address</label>
                      <input
                        type="email"
                        value={formData.ownerDetails.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            ownerDetails: { ...formData.ownerDetails, email: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 border border-neutral-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Contractor Card */}
                <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs">
                  <div className="flex items-center gap-2 pb-3 mb-3 border-b border-neutral-100 text-[#0F172A] font-bold text-sm">
                    <Building className="w-4 h-4 text-[#FF6B00]" />
                    <span>Contractor / Second Party</span>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block font-medium text-neutral-600 mb-0.5">Company Name</label>
                      <input
                        type="text"
                        value={formData.contractorDetails.companyName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contractorDetails: { ...formData.contractorDetails, companyName: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 border border-neutral-300 rounded-lg font-semibold bg-neutral-50"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-medium text-neutral-600 mb-0.5">Registration No.</label>
                        <input
                          type="text"
                          value={formData.contractorDetails.registrationNo}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              contractorDetails: { ...formData.contractorDetails, registrationNo: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 border border-neutral-300 rounded-lg font-mono text-[11px]"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-neutral-600 mb-0.5">PAN / VAT No.</label>
                        <input
                          type="text"
                          value={formData.contractorDetails.panVatNo}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              contractorDetails: { ...formData.contractorDetails, panVatNo: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 border border-neutral-300 rounded-lg font-mono text-[11px]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-medium text-neutral-600 mb-0.5">Authorized Representative</label>
                      <input
                        type="text"
                        value={formData.contractorDetails.authorizedRepresentative}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contractorDetails: { ...formData.contractorDetails, authorizedRepresentative: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 border border-neutral-300 rounded-lg font-medium"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-neutral-600 mb-0.5">Contractor Contact</label>
                      <input
                        type="text"
                        value={formData.contractorDetails.contact}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contractorDetails: { ...formData.contractorDetails, contact: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 border border-neutral-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: CONTRACT TYPE & MATERIAL RESPONSIBILITY */}
              <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-100 text-[#0F172A] font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
                  <span>Contract Model & Material Responsibility</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Contract Type</label>
                    <select
                      value={formData.contractType}
                      onChange={(e) => setFormData({ ...formData, contractType: e.target.value as any })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-semibold text-[#0F172A]"
                    >
                      <option value="Labour Only">Labour Only (Client Supplies All Materials)</option>
                      <option value="Labour + Materials">Labour + Materials (Full Turnkey / EPC)</option>
                      <option value="Selected Materials + Labour">
                        Selected Materials + Labour (Structure Contractor, Finishes Client)
                      </option>
                      <option value="Turnkey">Turnkey (Complete with Fixtures & Landscaping)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Material Responsibility</label>
                    <select
                      value={formData.materialResponsibility}
                      onChange={(e) => setFormData({ ...formData, materialResponsibility: e.target.value as any })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-semibold text-[#0F172A]"
                    >
                      <option value="Owner">Owner Responsible</option>
                      <option value="Contractor">Contractor Responsible</option>
                      <option value="Shared Responsibility">Shared Responsibility (Detailed Below)</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block font-bold text-neutral-700 mb-1">
                      Material Specification & Division of Responsibility
                    </label>
                    <textarea
                      rows={2}
                      value={formData.materialResponsibilityDetails}
                      onChange={(e) => setFormData({ ...formData, materialResponsibilityDetails: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg leading-relaxed text-xs"
                      placeholder="Specify exactly who provides cement, steel, bricks, sand, aggregate, plumbing fixtures, etc."
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: SCOPE OF WORK */}
              <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                  <div className="flex items-center gap-2 text-[#0F172A] font-bold text-sm">
                    <Building className="w-4 h-4 text-[#FF6B00]" />
                    <span>Scope of Work (Editable Clauses)</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddScopeItem}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-[#FF6B00]/10 text-[#FF6B00] rounded-lg hover:bg-[#FF6B00]/20 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Clause</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.scopeOfWork.map((clause, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-full bg-neutral-100 text-neutral-600 font-mono text-xs flex items-center justify-center shrink-0 mt-1 font-bold">
                        {idx + 1}
                      </span>
                      <textarea
                        rows={2}
                        value={clause}
                        onChange={(e) => handleScopeChange(idx, e.target.value)}
                        className="flex-1 px-3 py-1.5 border border-neutral-300 rounded-lg text-xs leading-relaxed focus:border-[#FF6B00]"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveScopeItem(idx)}
                        disabled={formData.scopeOfWork.length <= 1}
                        className="p-1.5 text-neutral-400 hover:text-red-500 rounded transition-colors disabled:opacity-30 mt-1"
                        title="Delete clause"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 4: CONTRACT VALUE & PAYMENT MILESTONES */}
              <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-neutral-100">
                  <div className="flex items-center gap-2 text-[#0F172A] font-bold text-sm">
                    <DollarSign className="w-4 h-4 text-[#FF6B00]" />
                    <span>Contract Value & Milestone Payment Schedule</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-600">Total Contract Value: NPR</span>
                    <input
                      type="number"
                      value={formData.contractValue}
                      onChange={(e) => handleContractValueChange(parseFloat(e.target.value) || 0)}
                      className="w-40 px-3 py-1.5 border-2 border-[#FF6B00] rounded-lg font-bold text-sm text-[#0F172A]"
                    />
                  </div>
                </div>

                {/* Milestones Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-neutral-100 text-neutral-700 uppercase font-bold text-[11px]">
                      <tr>
                        <th className="px-3 py-2 rounded-l-lg">S.N.</th>
                        <th className="px-3 py-2">Milestone / Stage Description</th>
                        <th className="px-3 py-2 w-20">%</th>
                        <th className="px-3 py-2 w-32">Amount (NPR)</th>
                        <th className="px-3 py-2">Verification / Notes</th>
                        <th className="px-2 py-2 rounded-r-lg w-10"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {formData.paymentTerms.map((m, idx) => (
                        <tr key={idx} className="hover:bg-neutral-50/50">
                          <td className="px-3 py-2 font-mono font-bold text-neutral-500">{idx + 1}</td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={m.milestone}
                              onChange={(e) => handleMilestoneChange(idx, 'milestone', e.target.value)}
                              className="w-full px-2 py-1 border border-neutral-200 rounded font-semibold text-xs"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              value={m.percentage}
                              onChange={(e) => handleMilestoneChange(idx, 'percentage', e.target.value)}
                              className="w-full px-2 py-1 border border-neutral-200 rounded text-center font-bold text-xs"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              value={m.amount}
                              onChange={(e) => handleMilestoneChange(idx, 'amount', e.target.value)}
                              className="w-full px-2 py-1 border border-neutral-200 rounded font-mono font-bold text-xs text-[#0F172A]"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={m.notes || ''}
                              onChange={(e) => handleMilestoneChange(idx, 'notes', e.target.value)}
                              className="w-full px-2 py-1 border border-neutral-200 rounded text-xs text-neutral-600"
                            />
                          </td>
                          <td className="px-2 py-2">
                            <button
                              type="button"
                              onClick={() => {
                                const updated = formData.paymentTerms.filter((_, i) => i !== idx);
                                setFormData({ ...formData, paymentTerms: updated });
                              }}
                              className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="border-t-2 border-neutral-200 font-bold bg-neutral-50">
                      <tr>
                        <td colSpan={2} className="px-3 py-2 text-right">
                          Total:
                        </td>
                        <td className={`px-3 py-2 text-center ${totalPercentage === 100 ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {totalPercentage}%
                        </td>
                        <td className="px-3 py-2 font-mono text-[#0F172A]">
                          Rs. {totalAmount.toLocaleString()}
                        </td>
                        <td colSpan={2} className="px-3 py-2 text-[11px] text-neutral-500">
                          {totalPercentage !== 100 && (
                            <span className="text-amber-600 font-semibold">
                              (Warning: Milestones sum to {totalPercentage}%, should be 100%)
                            </span>
                          )}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        paymentTerms: [
                          ...formData.paymentTerms,
                          { milestone: 'Additional Stage', percentage: 0, amount: 0, notes: '' },
                        ],
                      });
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors text-neutral-700"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Milestone Row</span>
                  </button>
                </div>
              </div>

              {/* SECTION 5: RETENTION, DEFECTS LIABILITY & DISPUTES */}
              <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    Retention Percentage (%)
                  </label>
                  <input
                    type="number"
                    value={formData.retentionPercentage}
                    onChange={(e) => setFormData({ ...formData, retentionPercentage: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-bold"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Held until expiry of Defect Liability Period (Typically 5%).
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    Defect Liability Period (Months)
                  </label>
                  <input
                    type="number"
                    value={formData.defectLiabilityPeriodMonths}
                    onChange={(e) =>
                      setFormData({ ...formData, defectLiabilityPeriodMonths: parseInt(e.target.value) || 12 })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-bold"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Free repairs for structural and execution defects (Typically 12 months).
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-neutral-700 mb-1">
                    Dispute Resolution Clause
                  </label>
                  <textarea
                    rows={2}
                    value={formData.disputeResolutionMethod}
                    onChange={(e) => setFormData({ ...formData, disputeResolutionMethod: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg leading-relaxed text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-neutral-700 mb-1">
                    Special Conditions / Seismic Compliance
                  </label>
                  <textarea
                    rows={2}
                    value={formData.specialConditions}
                    onChange={(e) => setFormData({ ...formData, specialConditions: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg leading-relaxed text-xs"
                  />
                </div>
              </div>

              {/* SECTION 6: SIGNATURES & WITNESSES */}
              <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-100 text-[#0F172A] font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6B00]" />
                  <span>Execution & Witness Signatures</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 space-y-2">
                    <label className="flex items-center gap-2 font-bold text-neutral-800">
                      <input
                        type="checkbox"
                        checked={formData.signatures.ownerSigned}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            signatures: { ...formData.signatures, ownerSigned: e.target.checked },
                          })
                        }
                        className="rounded text-[#FF6B00] focus:ring-[#FF6B00] w-4 h-4"
                      />
                      <span>Owner / First Party Signed</span>
                    </label>
                    <p className="text-[11px] text-neutral-500">
                      Signatory: {formData.ownerDetails.fullName || 'Property Owner'}
                    </p>
                  </div>

                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 space-y-2">
                    <label className="flex items-center gap-2 font-bold text-neutral-800">
                      <input
                        type="checkbox"
                        checked={formData.signatures.contractorSigned}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            signatures: { ...formData.signatures, contractorSigned: e.target.checked },
                          })
                        }
                        className="rounded text-[#FF6B00] focus:ring-[#FF6B00] w-4 h-4"
                      />
                      <span>Contractor / Kyoly Authorized Representative Signed</span>
                    </label>
                    <p className="text-[11px] text-neutral-500">
                      Signatory: {formData.contractorDetails.authorizedRepresentative}
                    </p>
                  </div>

                  <div>
                    <label className="block font-medium text-neutral-600 mb-0.5">Witness 1 (Owner Side)</label>
                    <input
                      type="text"
                      value={formData.signatures.witness1Name || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          signatures: { ...formData.signatures, witness1Name: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 border border-neutral-300 rounded-lg"
                      placeholder="Name, Address, Citizenship No."
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-neutral-600 mb-0.5">Witness 2 (Contractor Side)</label>
                    <input
                      type="text"
                      value={formData.signatures.witness2Name || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          signatures: { ...formData.signatures, witness2Name: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 border border-neutral-300 rounded-lg"
                      placeholder="Name, Address, Citizenship No."
                    />
                  </div>
                </div>
              </div>

              {/* Standard Legal Disclaimer */}
              <LegalDisclaimerBox documentType="House Construction Agreement" />
            </div>
          ) : (
            /* PRINT PREVIEW / FORMAL CONTRACT LAYOUT */
            <div className="bg-white p-6 sm:p-10 rounded-xl shadow-lg border border-neutral-300 max-w-4xl mx-auto text-[#0F172A] leading-relaxed">
              <DocumentPrintHeaderFooter
                docNumber={formData.docNumber}
                revision={formData.revision}
                date={formData.date}
                docTitle="HOUSE CONSTRUCTION AGREEMENT"
                project={currentProject}
                status={formData.status}
              />

              {/* Agreement Premise */}
              <div className="my-6 text-sm text-justify space-y-4">
                <p>
                  This <strong>HOUSE CONSTRUCTION AGREEMENT</strong> (the &quot;Agreement&quot;) is made and executed on{' '}
                  <strong>{formData.date}</strong> in Kathmandu, Nepal, by and between:
                </p>

                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 space-y-2 text-xs">
                  <p>
                    <strong>1. THE FIRST PARTY (EMPLOYER / OWNER):</strong>{' '}
                    <span className="font-semibold text-neutral-900">{formData.ownerDetails.fullName}</span>, residing at{' '}
                    {formData.ownerDetails.address}, holding Nepali Citizenship No.{' '}
                    <span className="font-mono">{formData.ownerDetails.citizenshipNo}</span>, Phone:{' '}
                    {formData.ownerDetails.contact}, Email: {formData.ownerDetails.email} (hereinafter called the &quot;First
                    Party&quot;).
                  </p>
                  <p>
                    <strong>2. THE SECOND PARTY (CONTRACTOR):</strong>{' '}
                    <span className="font-semibold text-neutral-900">{formData.contractorDetails.companyName}</span>, a
                    construction company incorporated under the laws of Nepal, Office of the Company Registrar Reg No.{' '}
                    <span className="font-mono">{formData.contractorDetails.registrationNo}</span>, PAN/VAT No.{' '}
                    <span className="font-mono">{formData.contractorDetails.panVatNo}</span>, having its office at{' '}
                    {formData.contractorDetails.address}, represented herein by its authorized representative{' '}
                    <span className="font-semibold">{formData.contractorDetails.authorizedRepresentative}</span> (hereinafter
                    called the &quot;Second Party&quot;).
                  </p>
                </div>

                <p>
                  WHEREAS the First Party is the absolute legal owner of the land plot located at{' '}
                  <strong>
                    {currentProject?.location.localLevelName}-{currentProject?.location.wardNo},{' '}
                    {currentProject?.location.districtName}
                  </strong>{' '}
                  bearing Kitta No. <strong>{currentProject?.land.kittaNo || 'N/A'}</strong> (Plot Area:{' '}
                  {currentProject?.land.plotArea || 'N/A'}), and desires to construct a{' '}
                  <strong>
                    {currentProject?.building.buildingType || 'Residential RCC Building'} (
                    {currentProject?.building.numberOfFloors || '2.5 Storey'})
                  </strong>{' '}
                  in strict conformity with approved municipal drawings and National Building Code NBC 105:2020;
                </p>

                <p>
                  AND WHEREAS the Second Party is a licensed construction contractor possessing the requisite technical
                  know-how, plant, machinery, licensed engineers, and skilled workforce to execute the works;
                </p>

                <p>
                  NOW, THEREFORE, the parties hereto mutually covenant and agree as follows:
                </p>

                {/* Clause 1: Contract Model */}
                <div>
                  <h4 className="font-bold text-neutral-900 border-b border-neutral-200 pb-1 mb-1">
                    1. CONTRACT TYPE & MATERIAL PROVISION
                  </h4>
                  <p className="text-xs">
                    This contract is executed on a <strong>{formData.contractType}</strong> basis. Material responsibility is{' '}
                    <strong>{formData.materialResponsibility}</strong>. {formData.materialResponsibilityDetails}
                  </p>
                </div>

                {/* Clause 2: Scope of Work */}
                <div>
                  <h4 className="font-bold text-neutral-900 border-b border-neutral-200 pb-1 mb-2">
                    2. DETAILED SCOPE OF WORK
                  </h4>
                  <ol className="list-decimal pl-5 space-y-1 text-xs">
                    {formData.scopeOfWork.map((scope, idx) => (
                      <li key={idx}>{scope}</li>
                    ))}
                  </ol>
                </div>

                {/* Clause 3: Contract Value & Payment Schedule */}
                <div>
                  <h4 className="font-bold text-neutral-900 border-b border-neutral-200 pb-1 mb-2">
                    3. CONTRACT SUM & PAYMENT TERMS
                  </h4>
                  <p className="text-xs mb-3">
                    The agreed total contract price is <strong>NPR {formData.contractValue.toLocaleString()}</strong> (Nepalese
                    Rupees). Payments shall be disbursed strictly upon physical completion and joint engineering verification of
                    the following milestones:
                  </p>

                  <table className="w-full text-xs border border-neutral-300">
                    <thead className="bg-neutral-100 text-neutral-700 font-bold">
                      <tr>
                        <th className="border border-neutral-300 p-1.5 text-center w-12">Stage</th>
                        <th className="border border-neutral-300 p-1.5 text-left">Milestone Description</th>
                        <th className="border border-neutral-300 p-1.5 text-center w-16">%</th>
                        <th className="border border-neutral-300 p-1.5 text-right w-32">Amount (NPR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.paymentTerms.map((m, idx) => (
                        <tr key={idx}>
                          <td className="border border-neutral-300 p-1.5 text-center font-mono">{idx + 1}</td>
                          <td className="border border-neutral-300 p-1.5">
                            <span className="font-semibold">{m.milestone}</span>
                            {m.notes && <span className="block text-[11px] text-neutral-500">{m.notes}</span>}
                          </td>
                          <td className="border border-neutral-300 p-1.5 text-center">{m.percentage}%</td>
                          <td className="border border-neutral-300 p-1.5 text-right font-mono">
                            Rs. {m.amount.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="font-bold bg-neutral-50">
                      <tr>
                        <td colSpan={2} className="border border-neutral-300 p-1.5 text-right">
                          Grand Total:
                        </td>
                        <td className="border border-neutral-300 p-1.5 text-center">{totalPercentage}%</td>
                        <td className="border border-neutral-300 p-1.5 text-right font-mono">
                          Rs. {totalAmount.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Clause 4: Retention & Defects */}
                <div>
                  <h4 className="font-bold text-neutral-900 border-b border-neutral-200 pb-1 mb-1">
                    4. RETENTION & DEFECTS LIABILITY PERIOD
                  </h4>
                  <p className="text-xs">
                    A retention sum of <strong>{formData.retentionPercentage}%</strong> shall be retained by the First Party
                    from the contract sum for a Defect Liability Period of{' '}
                    <strong>{formData.defectLiabilityPeriodMonths} Months</strong> following the issuance of the Completion
                    Certificate. During this period, the Second Party shall promptly rectify any workmanship or structural
                    defects at its sole expense.
                  </p>
                </div>

                {/* Clause 5: Dispute Resolution */}
                <div>
                  <h4 className="font-bold text-neutral-900 border-b border-neutral-200 pb-1 mb-1">
                    5. DISPUTE RESOLUTION & APPLICABLE LAW
                  </h4>
                  <p className="text-xs">{formData.disputeResolutionMethod}</p>
                </div>

                {/* Signatures Block */}
                <div className="pt-8 mt-6 border-t-2 border-neutral-300 grid grid-cols-2 gap-8 text-xs">
                  <div className="space-y-4">
                    <p className="font-bold uppercase text-neutral-700">For the First Party (Owner):</p>
                    <div className="h-16 border-b border-dashed border-neutral-400 flex items-end pb-1">
                      {formData.signatures.ownerSigned ? (
                        <span className="text-emerald-600 font-serif italic text-base">Ram B. Shrestha (Signed)</span>
                      ) : (
                        <span className="text-neutral-400 italic text-[11px]">Signature & Date</span>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-neutral-900">{formData.ownerDetails.fullName}</p>
                      <p className="text-neutral-500">Citizenship No: {formData.ownerDetails.citizenshipNo}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="font-bold uppercase text-neutral-700">For the Second Party (Contractor):</p>
                    <div className="h-16 border-b border-dashed border-neutral-400 flex items-end pb-1">
                      {formData.signatures.contractorSigned ? (
                        <span className="text-emerald-600 font-serif italic text-base">
                          Er. Sujan Karki (For Kyoly Construction)
                        </span>
                      ) : (
                        <span className="text-neutral-400 italic text-[11px]">Signature & Company Seal</span>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-neutral-900">{formData.contractorDetails.authorizedRepresentative}</p>
                      <p className="text-neutral-500">{formData.contractorDetails.companyName}</p>
                    </div>
                  </div>

                  <div className="pt-4 space-y-1">
                    <p className="font-semibold text-neutral-600">Witness 1:</p>
                    <p className="text-neutral-800">{formData.signatures.witness1Name || '_________________________'}</p>
                  </div>

                  <div className="pt-4 space-y-1">
                    <p className="font-semibold text-neutral-600">Witness 2:</p>
                    <p className="text-neutral-800">{formData.signatures.witness2Name || '_________________________'}</p>
                  </div>
                </div>
              </div>

              <LegalDisclaimerBox documentType="House Construction Agreement" />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-white px-6 py-3.5 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <DocumentStatusBadge status={formData.status} />
            <span className="text-xs text-neutral-500">
              Project: <strong className="text-neutral-800">{currentProject?.projectName}</strong>
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
                <span>Print Document</span>
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
