import React, { useState, useEffect } from 'react';
import {
  BuildingPermitRecord,
  PermitWorkflowStep,
  AuthorityChecklistItem,
  CorrectionObservationItem,
  ProjectProfile,
  DocumentStatus,
} from '../types';
import { useConstructionDocuments } from '../context/ConstructionDocumentsContext';
import { DocumentPrintHeaderFooter } from './DocumentPrintHeaderFooter';
import { DocumentStatusBadge } from './DocumentStatusBadge';
import { LegalDisclaimerBox } from './LegalDisclaimerBox';
import {
  X,
  Save,
  Printer,
  FileCheck2,
  Building,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Eye,
  Edit3,
  Layers,
  ChevronRight,
  Plus,
  Trash2,
} from 'lucide-react';

interface BuildingPermitModalProps {
  isOpen: boolean;
  onClose: () => void;
  permitToEdit?: BuildingPermitRecord;
  project?: ProjectProfile;
}

export const BuildingPermitModal: React.FC<BuildingPermitModalProps> = ({
  isOpen,
  onClose,
  permitToEdit,
  project,
}) => {
  const {
    saveBuildingPermit,
    getNextDocNumber,
    projects,
    selectedProjectId,
  } = useConstructionDocuments();

  const [activeTab, setActiveTab] = useState<'workflow' | 'permit-info' | 'checklist' | 'corrections' | 'preview'>('workflow');

  const currentProject =
    project ||
    projects.find((p) => p.id === (permitToEdit?.projectId || selectedProjectId)) ||
    projects[0];

  const buildInitialForm = (): BuildingPermitRecord => {
    if (permitToEdit) {
      return JSON.parse(JSON.stringify(permitToEdit));
    }

    const defaultWorkflow: PermitWorkflowStep[] = [
      { stage: 1, name: 'Project Information & Client Mandate', status: 'Completed', date: '2026-01-10', responsiblePerson: 'Client & Kyoly Team', remarks: 'Client profile, land ownership docs verified', attachmentsCount: 3 },
      { stage: 2, name: 'Land / Plot Verification & Boundary Trace', status: 'Completed', date: '2026-01-18', responsiblePerson: 'Surveyor / Napi Office', remarks: 'Cadastral trace map and setback verified on site', attachmentsCount: 2 },
      { stage: 3, name: 'Architectural Design & Drawings', status: 'Completed', date: '2026-02-05', responsiblePerson: 'Ar. Manish Shakya', remarks: 'Set of floor plans, elevations, sections & area statement', attachmentsCount: 8 },
      { stage: 4, name: 'Structural Design & Seismic Calculation', status: 'Completed', date: '2026-02-20', responsiblePerson: 'Er. Sujan Karki', remarks: 'NBC 105:2020 response spectrum seismic analysis approved', attachmentsCount: 6 },
      { stage: 5, name: 'Electrical Documents & Schematics', status: 'Completed', date: '2026-02-25', responsiblePerson: 'Er. Niraj Shrestha', remarks: 'SLD, conduit layout and earth pit details', attachmentsCount: 3 },
      { stage: 6, name: 'Sanitary & Plumbing Documents', status: 'Completed', date: '2026-02-28', responsiblePerson: 'Er. Sanjiv Maharjan', remarks: 'Water supply, drainage, septic tank design', attachmentsCount: 3 },
      { stage: 7, name: 'Municipal Authority Checklist Dossier', status: 'Completed', date: '2026-03-05', responsiblePerson: 'Kyoly Liaison Officer', remarks: 'All 12 mandatory documents assembled and cross-checked', attachmentsCount: 12 },
      { stage: 8, name: 'Application / Formal Submission to Ward/Palika', status: 'Completed', date: '2026-03-10', responsiblePerson: 'Ward Engineering Desk', remarks: 'Application registered; official Darta No. obtained', attachmentsCount: 1 },
      { stage: 9, name: 'Authority Technical & Bye-Law Review', status: 'Completed', date: '2026-03-22', responsiblePerson: 'Municipal Building Officer', remarks: 'Site inspection completed; road setback verified', attachmentsCount: 2 },
      { stage: 10, name: 'Correction & Revision Resubmission', status: 'Completed', date: '2026-04-02', responsiblePerson: 'Kyoly Engineering Team', remarks: 'Minor septic tank setback updated and accepted', attachmentsCount: 2 },
      { stage: 11, name: 'Official Permit / Approval (Ijaajatpatra)', status: 'Approved', date: '2026-04-15', responsiblePerson: 'Chief Administrative Officer', remarks: 'Plinth level construction permit issued', attachmentsCount: 1 },
      { stage: 12, name: 'Supervised Construction Execution', status: 'In Progress', date: '2026-05-01', responsiblePerson: 'Site In-Charge', remarks: 'Structural framing and column casting ongoing', attachmentsCount: 15 },
      { stage: 13, name: 'Completion Application (Nirmaan Sampanna Darkhwasta)', status: 'Pending', responsiblePerson: 'Consultant / Client', remarks: 'Will apply upon completion of finishes', attachmentsCount: 0 },
      { stage: 14, name: 'Completion Certificate (Nirmaan Sampanna Pramanpatra)', status: 'Pending', responsiblePerson: 'Municipality Planning Division', remarks: 'Final occupancy certificate issuance', attachmentsCount: 0 },
    ];

    const defaultChecklist: AuthorityChecklistItem[] = [
      { id: 'c-1', documentName: 'Lalpurja (Land Ownership Certificate) Copy', requirementType: 'Mandatory', status: 'Verified', verifiedBy: 'Ward Land Officer' },
      { id: 'c-2', documentName: 'Current Fiscal Year Land Revenue / Tax Receipt (Malpot Tiro)', requirementType: 'Mandatory', status: 'Verified', verifiedBy: 'Revenue Section' },
      { id: 'c-3', documentName: 'Official Cadastral Trace Map & Field Book (Napi)', requirementType: 'Mandatory', status: 'Verified', verifiedBy: 'Survey Division' },
      { id: 'c-4', documentName: 'Land Owner & Applicant Citizenship Certificate Copies', requirementType: 'Mandatory', status: 'Verified', verifiedBy: 'Administration' },
      { id: 'c-5', documentName: 'Architectural Drawing Set (Site plan, Floor plans, Elevations, Sections)', requirementType: 'Mandatory', status: 'Approved', verifiedBy: 'Municipal Architect' },
      { id: 'c-6', documentName: 'Structural Calculation Report & Soil Investigation Summary', requirementType: 'Mandatory', status: 'Approved', verifiedBy: 'Municipal Structural Engineer' },
      { id: 'c-7', documentName: 'Consultant / Engineer NEC License & Municipal Registration Certificate', requirementType: 'Mandatory', status: 'Verified', verifiedBy: 'Technical Desk' },
      { id: 'c-8', documentName: 'Four-Boundary Public Notice (Char Killa Suchana & Muchulka)', requirementType: 'Mandatory', status: 'Approved', verifiedBy: 'Ward Secretary' },
      { id: 'c-9', documentName: 'Electrical & Plumbing Layout Drawings', requirementType: 'Mandatory', status: 'Approved', verifiedBy: 'MEP Desk' },
      { id: 'c-10', documentName: 'Structural Designer NBC Compliance Undertaking Letter', requirementType: 'Mandatory', status: 'Verified', verifiedBy: 'Planning Officer' },
      { id: 'c-11', documentName: 'Environmental Checklist / Waste Disposal Plan', requirementType: 'Optional', status: 'Prepared', verifiedBy: 'Environment Desk' },
    ];

    const defaultCorrections: CorrectionObservationItem[] = [
      {
        id: 'corr-1',
        sn: 1,
        authorityObservation: 'Septic tank setback from adjoining western boundary wall was indicated at 1.2m; local bye-laws require a minimum 1.5m clearance.',
        relatedDrawingOrDoc: 'Sanitary Layout Drawing SAN-02, Rev 0',
        actionTaken: 'Shifted septic tank 300mm towards central driveway, achieving 1.55m clear setback from boundary.',
        revisionReference: 'SAN-02, Rev 1 (Dated 2026-03-28)',
        supportingDoc: 'Revised Sanitary Plan with dimension callouts',
        contractorResponse: 'Updated drawing submitted and verified by Ward Engineer on site.',
        status: 'Approved by Authority',
      },
    ];

    return {
      id: `bp-${Date.now()}`,
      docNumber: getNextDocNumber('PERMIT'),
      projectId: currentProject?.id || '',
      revision: 'Rev 1',
      date: new Date().toISOString().split('T')[0],
      status: 'Approved',

      permitInfo: {
        applicationNo: 'KMC-BLD-082/083-4921',
        permitNumber: 'NAKSHA-PAAS-2082-04-18',
        applicationDate: '2026-03-10',
        submissionDate: '2026-03-15',
        approvalDate: '2026-04-15',
        permitIssueDate: '2026-04-18',
        permitValidUntil: '2028-04-17 (2 Years Validity)',
        approvedBuildingArea: '2,680.00 sq.ft (249.00 sq.m)',
        approvedFloors: '2.5 Storey (Ground + 1st + Half 2nd)',
        approvedHeight: '9.85 Meters',
        approvedDrawingRef: 'DWG-KMC-ARCH-STR-82/91',
        approvalLetterRef: 'Patra Sankhya 082/083-Bhavan-1049',
        currentStageStatus: 'Permit Issued',
      },

      architectural: {
        architectName: 'Ar. Manish Shakya',
        necLicenceNo: '14210 "A" Architecture',
        firmName: 'Kyoly Architectural & Engineering Studio',
        drawingDate: '2026-02-05',
        revision: 'Rev 2',
        approvedDrawingRef: 'KYOLY-ARCH-2026-01 to 08',
        drawingFiles: [
          { name: 'Site_Plan_&_Location_Map.pdf', type: 'Site & Setbacks', date: '2026-02-05' },
          { name: 'Ground_&_Upper_Floor_Plans.pdf', type: 'Floor Plans', date: '2026-02-05' },
          { name: 'Elevations_&_Sections.pdf', type: 'Elevations', date: '2026-02-05' },
          { name: 'FAR_&_Ground_Coverage_Statement.pdf', type: 'Area Statement', date: '2026-02-05' },
        ],
      },

      structural: {
        structuralEngineer: 'Er. Sujan Karki',
        necLicenceNo: '8942 "A" Civil/Structural',
        firmName: 'Kyoly Structural Consultants',
        structuralDrawingRef: 'KYOLY-STR-2026-01 to 10',
        revision: 'Rev 1',
        structuralCalculationRef: 'STR-CALC-NBC105-2026-04',
        soilInvestigationRef: 'GEOTECH-REP-KT-2026-11 (Safe Bearing: 160 kN/m²)',
        seismicDesignRef: 'Nepal National Building Code NBC 105:2020 (Seismic Zone Factor Z = 0.35)',
        drawingFiles: [
          { name: 'Footing_&_Column_Layout.pdf', type: 'Foundations', date: '2026-02-20' },
          { name: 'Beam_&_Slab_Reinforcement_Schedules.pdf', type: 'Superstructure', date: '2026-02-20' },
          { name: 'NBC105_Seismic_Calculation_Dossier.pdf', type: 'Calculations', date: '2026-02-20' },
        ],
      },

      mep: {
        electricalDesigner: 'Er. Niraj Shrestha',
        electricalLicenceNo: '10984 "A" Electrical',
        electricalDesignRef: 'KYOLY-MEP-E-01',
        sanitaryDesigner: 'Er. Sanjiv Maharjan',
        sanitaryLicenceNo: '11422 "A" Sanitary',
        sanitaryDesignRef: 'KYOLY-MEP-S-01',
      },

      workflowSteps: defaultWorkflow,
      checklist: defaultChecklist,
      corrections: defaultCorrections,

      preparedBy: 'Er. Sujan Karki',
      reviewedBy: 'Municipal Liaison Officer',
      updatedAt: new Date().toISOString(),
    };
  };

  const [formData, setFormData] = useState<BuildingPermitRecord>(buildInitialForm);

  useEffect(() => {
    if (isOpen) {
      setFormData(buildInitialForm());
    }
  }, [isOpen, permitToEdit, project, selectedProjectId]);

  if (!isOpen) return null;

  const handleStepStatusChange = (index: number, status: any) => {
    const updated = [...formData.workflowSteps];
    updated[index].status = status;
    setFormData({ ...formData, workflowSteps: updated });
  };

  const handleChecklistStatusChange = (index: number, status: any) => {
    const updated = [...formData.checklist];
    updated[index].status = status;
    setFormData({ ...formData, checklist: updated });
  };

  const handleAddCorrection = () => {
    const newCorr: CorrectionObservationItem = {
      id: `corr-${Date.now()}`,
      sn: formData.corrections.length + 1,
      authorityObservation: 'Enter municipal engineer feedback or observation...',
      relatedDrawingOrDoc: 'Drawing reference...',
      actionTaken: 'Engineering correction implemented...',
      revisionReference: 'Revision details...',
      supportingDoc: 'Attachment file...',
      contractorResponse: 'Response summary...',
      status: 'Open',
    };
    setFormData({
      ...formData,
      corrections: [...formData.corrections, newCorr],
    });
  };

  const handleSave = () => {
    saveBuildingPermit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Header Bar */}
        <div className="bg-[#0B0F19] text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center border border-[#FF6B00]/30">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  Building Permit & Municipal Approval Tracker
                </h2>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#FF6B00] text-white">
                  {formData.permitInfo.permitNumber || formData.docNumber}
                </span>
                <span className="text-xs text-neutral-400 font-mono">({formData.revision})</span>
              </div>
              <p className="text-xs text-neutral-400">
                14-Stage Nepal municipal building permit approval workflow, NBC compliance & authority correction log
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Sub-Nav */}
        <div className="bg-neutral-100 px-6 py-2 border-b border-neutral-200 flex flex-wrap gap-2 text-xs shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('workflow')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'workflow' ? 'bg-[#FF6B00] text-white shadow-xs' : 'bg-white text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>14-Stage Workflow</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('permit-info')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'permit-info' ? 'bg-[#FF6B00] text-white shadow-xs' : 'bg-white text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Permit & Engineering Specs</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('checklist')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'checklist' ? 'bg-[#FF6B00] text-white shadow-xs' : 'bg-white text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Authority Checklist</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('corrections')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'corrections' ? 'bg-[#FF6B00] text-white shadow-xs' : 'bg-white text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Authority Corrections Log ({formData.corrections.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ml-auto ${
              activeTab === 'preview' ? 'bg-[#0B0F19] text-white shadow-xs' : 'bg-white text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Print Dossier</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-neutral-50/50">
          {/* TAB 1: 14-STAGE WORKFLOW */}
          {activeTab === 'workflow' && (
            <div className="space-y-4 max-w-5xl mx-auto">
              <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-neutral-900 text-sm">
                    Complete 14-Stage Municipal Building Permit Pipeline
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Track statutory milestones from initial project mandate up to Final Completion Certificate issuance.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-neutral-500 block uppercase">Overall Permit Status</span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {formData.permitInfo.currentStageStatus}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {formData.workflowSteps.map((step, idx) => (
                  <div
                    key={step.stage}
                    className={`bg-white p-4 rounded-xl border transition-all shadow-xs flex flex-wrap items-center justify-between gap-4 ${
                      step.status === 'Approved' || step.status === 'Completed'
                        ? 'border-emerald-200 bg-emerald-50/20'
                        : step.status === 'In Progress'
                        ? 'border-[#FF6B00] bg-orange-50/20'
                        : step.status === 'Correction Required'
                        ? 'border-amber-300 bg-amber-50/20'
                        : 'border-neutral-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full font-mono font-bold text-xs flex items-center justify-center shrink-0 ${
                          step.status === 'Approved' || step.status === 'Completed'
                            ? 'bg-emerald-600 text-white'
                            : step.status === 'In Progress'
                            ? 'bg-[#FF6B00] text-white animate-pulse'
                            : 'bg-neutral-200 text-neutral-700'
                        }`}
                      >
                        {step.stage}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-neutral-900">{step.name}</h4>
                        <div className="flex items-center gap-3 text-[11px] text-neutral-500 mt-0.5">
                          <span>Responsible: {step.responsiblePerson}</span>
                          {step.date && <span>• Date: {step.date}</span>}
                          {step.attachmentsCount > 0 && (
                            <span className="font-semibold text-neutral-700">
                              • {step.attachmentsCount} Attachment(s)
                            </span>
                          )}
                        </div>
                        {step.remarks && (
                          <p className="text-[11px] text-neutral-600 italic mt-0.5">&quot;{step.remarks}&quot;</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={step.status}
                        onChange={(e) => handleStepStatusChange(idx, e.target.value)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                          step.status === 'Completed' || step.status === 'Approved'
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                            : step.status === 'In Progress'
                            ? 'bg-orange-50 border-orange-300 text-orange-800'
                            : step.status === 'Correction Required'
                            ? 'bg-amber-50 border-amber-300 text-amber-800'
                            : 'bg-neutral-50 border-neutral-300 text-neutral-700'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Submitted">Submitted</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Correction Required">Correction Required</option>
                        <option value="Approved">Approved</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PERMIT & ENGINEERING SPECIFICATIONS */}
          {activeTab === 'permit-info' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              {/* Permit Information */}
              <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-100 text-[#0F172A] font-bold text-sm">
                  <FileCheck2 className="w-4 h-4 text-[#FF6B00]" />
                  <span>Statutory Permit Numbers & Validity</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Permit Application No. (दर्ता नं.)</label>
                    <input
                      type="text"
                      value={formData.permitInfo.applicationNo}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          permitInfo: { ...formData.permitInfo, applicationNo: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Official Permit Number (इजाजतपत्र नं.)</label>
                    <input
                      type="text"
                      value={formData.permitInfo.permitNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          permitInfo: { ...formData.permitInfo, permitNumber: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border-2 border-emerald-500 rounded-lg font-mono font-bold text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Permit Valid Until</label>
                    <input
                      type="text"
                      value={formData.permitInfo.permitValidUntil || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          permitInfo: { ...formData.permitInfo, permitValidUntil: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Approved Built-Up Area</label>
                    <input
                      type="text"
                      value={formData.permitInfo.approvedBuildingArea}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          permitInfo: { ...formData.permitInfo, approvedBuildingArea: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Approved Storeys / Floors</label>
                    <input
                      type="text"
                      value={formData.permitInfo.approvedFloors}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          permitInfo: { ...formData.permitInfo, approvedFloors: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Approved Maximum Height</label>
                    <input
                      type="text"
                      value={formData.permitInfo.approvedHeight}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          permitInfo: { ...formData.permitInfo, approvedHeight: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Architectural Documents */}
              <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-100 text-[#0F172A] font-bold text-sm">
                  <Building className="w-4 h-4 text-[#FF6B00]" />
                  <span>Architectural Design & Registered Architect</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Architect Name *</label>
                    <input
                      type="text"
                      value={formData.architectural.architectName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          architectural: { ...formData.architectural, architectName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">NEC Licence No. *</label>
                    <input
                      type="text"
                      value={formData.architectural.necLicenceNo}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          architectural: { ...formData.architectural, necLicenceNo: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Architectural Firm</label>
                    <input
                      type="text"
                      value={formData.architectural.firmName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          architectural: { ...formData.architectural, firmName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Structural Engineering & NBC Code */}
              <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-100 text-[#0F172A] font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
                  <span>Structural Design & Nepal Building Code (NBC) Compliance</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Structural Engineer Name *</label>
                    <input
                      type="text"
                      value={formData.structural.structuralEngineer}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          structural: { ...formData.structural, structuralEngineer: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">NEC Licence No. *</label>
                    <input
                      type="text"
                      value={formData.structural.necLicenceNo}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          structural: { ...formData.structural, necLicenceNo: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Seismic Design Code Reference *</label>
                    <input
                      type="text"
                      value={formData.structural.seismicDesignRef}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          structural: { ...formData.structural, seismicDesignRef: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-semibold text-[#0F172A]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-neutral-700 mb-1">Soil / Geotechnical Investigation Reference</label>
                    <input
                      type="text"
                      value={formData.structural.soilInvestigationRef}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          structural: { ...formData.structural, soilInvestigationRef: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Structural Calculation Reference</label>
                    <input
                      type="text"
                      value={formData.structural.structuralCalculationRef}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          structural: { ...formData.structural, structuralCalculationRef: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CHECKLIST */}
          {activeTab === 'checklist' && (
            <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden max-w-5xl mx-auto">
              <div className="p-4 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-neutral-900 text-sm">
                    Statutory Municipal Submission Checklist
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Mandatory ownership certificates, cadastral maps, boundary muchulka, and design sets required by Nepal Local Governments.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#0B0F19] text-white uppercase text-[11px] font-bold">
                    <tr>
                      <th className="px-3 py-3 w-12 text-center">S.N.</th>
                      <th className="px-3 py-3">Document / Clearance Name</th>
                      <th className="px-3 py-3 w-28 text-center">Type</th>
                      <th className="px-3 py-3 w-36 text-center">Verification Status</th>
                      <th className="px-3 py-3 w-40">Verified By</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {formData.checklist.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-neutral-50/80">
                        <td className="px-3 py-2.5 text-center font-mono font-bold text-neutral-500">
                          {idx + 1}
                        </td>
                        <td className="px-3 py-2.5 font-medium text-neutral-900">{item.documentName}</td>
                        <td className="px-3 py-2.5 text-center">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.requirementType === 'Mandatory'
                                ? 'bg-red-50 text-red-700 border border-red-200'
                                : 'bg-neutral-100 text-neutral-600'
                            }`}
                          >
                            {item.requirementType}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-center">
                          <select
                            value={item.status}
                            onChange={(e) => handleChecklistStatusChange(idx, e.target.value)}
                            className="px-2.5 py-1 rounded text-xs font-bold border border-neutral-300 bg-white"
                          >
                            <option value="Required">Required</option>
                            <option value="Prepared">Prepared</option>
                            <option value="Uploaded">Uploaded</option>
                            <option value="Submitted">Submitted</option>
                            <option value="Verified">Verified</option>
                            <option value="Approved">Approved</option>
                            <option value="Correction Required">Correction Required</option>
                          </select>
                        </td>
                        <td className="px-3 py-2.5 text-neutral-600 font-mono text-[11px]">
                          {item.verifiedBy || 'Pending verification'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: AUTHORITY CORRECTIONS */}
          {activeTab === 'corrections' && (
            <div className="space-y-4 max-w-5xl mx-auto">
              <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-neutral-900 text-sm">
                    Authority Observation, Correction & Revision Log
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Transparent log of municipality comments, technical revisions, and resubmissions.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddCorrection}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FF6B00] hover:bg-[#E04800] text-white rounded-lg text-xs font-bold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Log New Observation</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.corrections.map((corr, idx) => (
                  <div key={corr.id} className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs space-y-3 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-mono font-bold flex items-center justify-center text-xs">
                          {corr.sn}
                        </span>
                        <strong className="text-neutral-900">Observation Ref #{corr.sn}</strong>
                      </div>
                      <select
                        value={corr.status}
                        onChange={(e) => {
                          const updated = [...formData.corrections];
                          updated[idx].status = e.target.value as any;
                          setFormData({ ...formData, corrections: updated });
                        }}
                        className="px-2 py-1 rounded border border-neutral-300 text-xs font-bold bg-neutral-50"
                      >
                        <option value="Open">Open</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Resubmitted">Resubmitted</option>
                        <option value="Approved by Authority">Approved by Authority</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-amber-800 mb-0.5">Municipal Observation / Comment</label>
                        <textarea
                          rows={2}
                          value={corr.authorityObservation}
                          onChange={(e) => {
                            const updated = [...formData.corrections];
                            updated[idx].authorityObservation = e.target.value;
                            setFormData({ ...formData, corrections: updated });
                          }}
                          className="w-full px-3 py-1.5 border border-neutral-300 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-emerald-800 mb-0.5">Action Taken & Revision Ref</label>
                        <textarea
                          rows={2}
                          value={corr.actionTaken}
                          onChange={(e) => {
                            const updated = [...formData.corrections];
                            updated[idx].actionTaken = e.target.value;
                            setFormData({ ...formData, corrections: updated });
                          }}
                          className="w-full px-3 py-1.5 border border-neutral-300 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PRINT PREVIEW */}
          {activeTab === 'preview' && (
            <div className="bg-white p-6 sm:p-10 rounded-xl shadow-lg border border-neutral-300 max-w-4xl mx-auto text-[#0F172A] leading-relaxed">
              <DocumentPrintHeaderFooter
                docNumber={formData.docNumber}
                revision={formData.revision}
                date={formData.date}
                docTitle="BUILDING PERMIT & STATUTORY APPROVAL DOSSIER"
                project={currentProject}
                status={formData.status}
              />

              <div className="my-6 space-y-4 text-xs">
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-emerald-900 text-sm">
                      Official Building Permit No: {formData.permitInfo.permitNumber}
                    </h3>
                    <p className="text-emerald-700 text-xs">
                      Approved by Municipal Building Office | Valid Until: {formData.permitInfo.permitValidUntil}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-xs uppercase">
                    {formData.permitInfo.currentStageStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-neutral-200 p-3 rounded-lg bg-neutral-50">
                    <p className="font-bold text-neutral-800 border-b pb-1 mb-1">Architectural Particulars</p>
                    <p>Architect: <strong>{formData.architectural.architectName}</strong></p>
                    <p>NEC Licence: <strong>{formData.architectural.necLicenceNo}</strong></p>
                    <p>Drawing Ref: <strong>{formData.architectural.approvedDrawingRef}</strong></p>
                  </div>

                  <div className="border border-neutral-200 p-3 rounded-lg bg-neutral-50">
                    <p className="font-bold text-neutral-800 border-b pb-1 mb-1">Structural & Seismic Particulars</p>
                    <p>Engineer: <strong>{formData.structural.structuralEngineer}</strong></p>
                    <p>NEC Licence: <strong>{formData.structural.necLicenceNo}</strong></p>
                    <p>Seismic Standard: <strong>{formData.structural.seismicDesignRef}</strong></p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-neutral-900 border-b pb-1 mb-2">14-Stage Statutory Status Summary</h4>
                  <table className="w-full border border-neutral-200 text-[11px]">
                    <thead className="bg-neutral-100 font-bold">
                      <tr>
                        <th className="border p-1 text-center w-12">Stage</th>
                        <th className="border p-1 text-left">Workflow Step</th>
                        <th className="border p-1 text-center w-28">Status</th>
                        <th className="border p-1 text-left">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.workflowSteps.map((step) => (
                        <tr key={step.stage}>
                          <td className="border p-1 text-center font-mono font-bold">{step.stage}</td>
                          <td className="border p-1">{step.name}</td>
                          <td className="border p-1 text-center font-semibold">{step.status}</td>
                          <td className="border p-1 text-neutral-600">{step.remarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <LegalDisclaimerBox documentType="Building Permit Dossier" />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-white px-6 py-3.5 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <DocumentStatusBadge status={formData.status} />
            <span className="text-xs text-neutral-500">
              Permit Ref: <strong className="text-neutral-900">{formData.permitInfo.permitNumber}</strong>
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
                <span>Print Dossier</span>
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
              <span>Save Permit Dossier</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
