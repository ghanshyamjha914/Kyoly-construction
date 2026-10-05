/**
 * TypeScript Type Definitions for Kyoly Construction Documents Module
 * High-integrity, strictly typed construction, permit, agreement, and engineering records.
 */

export type DocumentStatus =
  | 'Draft'
  | 'Under Review'
  | 'Correction Required'
  | 'Final'
  | 'Approved'
  | 'Printed'
  | 'Archived';

export type UserRole = 'Super Admin' | 'Admin' | 'Editor' | 'Viewer';

export type LocalLevelType =
  | 'Metropolitan City'
  | 'Sub-Metropolitan City'
  | 'Municipality'
  | 'Rural Municipality';

export interface LocationSnapshot {
  provinceId: string;
  provinceName: string;
  provinceNameNepali?: string;
  districtId: string;
  districtName: string;
  districtNameNepali?: string;
  localLevelId: string;
  localLevelName: string;
  localLevelNameNepali?: string;
  localLevelType: LocalLevelType;
  wardNo: number;
  streetTole: string;
  houseBuildingNo?: string;
  landmark?: string;
  snapshotTimestamp: string;
  isCustomLocation?: boolean;
}

export interface ProjectProfile {
  id: string;
  projectCode: string;
  projectName: string;
  projectType:
    | 'Residential Building'
    | 'Commercial Complex'
    | 'Transmission Line & Grid'
    | 'Substation Project'
    | 'Civil & Infrastructure'
    | 'Industrial & Warehouse';
  clientOwner: string;
  clientCitizenshipNo?: string;
  clientContact: string;
  clientEmail: string;
  contractor: string;
  contractorRegNo: string;
  contractorPan: string;
  contractorRep: string;
  contractDate: string;
  startDate: string;
  expectedCompletionDate: string;
  actualCompletionDate?: string;
  projectStatus:
    | 'Planning & Design'
    | 'Permit Processing'
    | 'Under Construction'
    | 'Finishing Works'
    | 'Completed'
    | 'Handed Over';

  // Location Snapshot (Historical Protection)
  location: LocationSnapshot;

  // Land / Plot Information
  land: {
    kittaNo: string;
    sheetNo: string;
    plotArea: string; // e.g. 0-4-2-0 (143.12 sq.m)
    lalpurjaNo: string;
    roadWidth: string; // e.g. 6.0 m (20 ft)
    landUse: string; // Residential / Commercial / Mixed
    surveyNapiRef: string;
  };

  // Building Information
  building: {
    buildingType: string;
    proposedUse: string;
    numberOfFloors: string;
    basement: string;
    plinthArea: string; // sq. ft / sq. m
    totalBuiltUpArea: string; // sq. ft / sq. m
    buildingHeight: string; // m / ft
    groundCoverage: string; // %
    far: string; // Floor Area Ratio
    parkingSpaces: string;
  };

  createdAt: string;
  updatedAt: string;
}

// Master Location Hierarchy for Admin Database
export interface MasterProvince {
  id: string;
  code: string;
  name: string;
  nameNepali: string;
  status: 'Active' | 'Inactive' | 'Historical';
}

export interface MasterDistrict {
  id: string;
  provinceId: string;
  code: string;
  name: string;
  nameNepali: string;
  status: 'Active' | 'Inactive' | 'Historical';
}

export interface MasterLocalLevel {
  id: string;
  districtId: string;
  code: string;
  name: string;
  nameNepali: string;
  type: LocalLevelType;
  totalWards: number;
  status: 'Active' | 'Inactive' | 'Historical';
}

// House Construction Agreement
export interface HouseConstructionAgreement {
  id: string;
  docNumber: string;
  projectId: string;
  revision: string;
  date: string;
  status: DocumentStatus;

  ownerDetails: {
    fullName: string;
    address: string;
    citizenshipNo: string;
    contact: string;
    email: string;
  };

  contractorDetails: {
    companyName: string;
    registrationNo: string;
    panVatNo: string;
    address: string;
    contact: string;
    authorizedRepresentative: string;
  };

  contractType: 'Labour Only' | 'Labour + Materials' | 'Selected Materials + Labour' | 'Turnkey';
  materialResponsibility: 'Owner' | 'Contractor' | 'Shared Responsibility';
  materialResponsibilityDetails: string;
  scopeOfWork: string[];

  contractValue: number;
  paymentTerms: {
    milestone: string;
    percentage: number;
    amount: number;
    notes?: string;
  }[];

  retentionPercentage: number;
  defectLiabilityPeriodMonths: number;
  disputeResolutionMethod: string;
  specialConditions: string;

  signatures: {
    ownerSigned: boolean;
    ownerSignedDate?: string;
    contractorSigned: boolean;
    contractorSignedDate?: string;
    witness1Name?: string;
    witness2Name?: string;
  };

  preparedBy: string;
  checkedBy: string;
  approvedBy: string;
  updatedAt: string;
}

// Labour Agreement
export interface LabourAgreement {
  id: string;
  docNumber: string;
  projectId: string;
  revision: string;
  date: string;
  status: DocumentStatus;

  workerName: string;
  citizenshipId: string;
  permanentAddress: string;
  temporaryAddress: string;
  contactNumber: string;
  emergencyContact: string;

  tradeSkill:
    | 'Mason / Mistri'
    | 'Bar Bender (Steel)'
    | 'Carpenter / Shuttering'
    | 'Plumber'
    | 'Electrician'
    | 'Painter'
    | 'Tower Rigger / Lineman'
    | 'Excavator Operator'
    | 'Welder'
    | 'Helper / General Labour';

  workDescription: string;
  wageBasis: 'Daily' | 'Monthly' | 'Piece-Rate' | 'Lump Sum';
  wageRate: number;
  workingHours: string;
  overtimeTerms: string;
  paymentSchedule: string;
  attendanceRules: string;
  leaveEntitlement: string;
  toolsProvidedBy: 'Contractor' | 'Worker' | 'Shared';
  safetyPpeRequirements: string;
  accommodationProvided: boolean;
  foodProvided: boolean;
  accidentInsuranceTerms: string;
  terminationClauses: string;
  disputeResolution: string;

  witness1Name: string;
  witness2Name: string;

  preparedBy: string;
  approvedBy: string;
  updatedAt: string;
}

// Subcontract Agreement
export interface SubcontractAgreement {
  id: string;
  docNumber: string;
  projectId: string;
  revision: string;
  date: string;
  status: DocumentStatus;

  mainContractor: string;
  subcontractorName: string;
  subcontractorRegNo: string;
  subcontractorPan: string;
  subcontractorContact: string;
  subcontractorAddress: string;

  scopeOfWork: string;
  workLocation: string;
  contractValue: number;
  boqReference: string;
  startDate: string;
  completionDate: string;

  materialResponsibility: 'Main Contractor' | 'Subcontractor' | 'Split by BOQ';
  labourResponsibility: string;
  qualityRequirements: string;
  safetyCompliance: string;
  paymentTerms: string;
  measurementFrequency: string;
  variationPolicy: string;
  delayLiquidatedDamages: string;
  defectLiabilityPeriod: string;
  terminationTerms: string;
  disputeResolution: string;

  preparedBy: string;
  approvedBy: string;
  updatedAt: string;
}

// BOQ & Quotation
export interface BoqItem {
  id: string;
  sn: number;
  description: string;
  unit: string; // e.g. cu.m, sq.m, kg, nos, rmt, lump sum
  quantity: number;
  rate: number;
  amount: number; // Qty * Rate
  category?: string;
  remarks?: string;
}

export interface BoqQuotation {
  id: string;
  docNumber: string;
  projectId: string;
  revision: string;
  date: string;
  status: DocumentStatus;
  title: string;
  items: BoqItem[];
  subtotal: number;
  discountPercentage: number;
  discountAmount: number;
  taxableAmount: number;
  vatPercentage: number;
  vatAmount: number;
  otherCharges: number;
  grandTotal: number;
  currency: string;
  validityDays: number;
  paymentTermsSummary: string;
  preparedBy: string;
  checkedBy: string;
  approvedBy: string;
  updatedAt: string;
}

// Payment Schedule
export interface PaymentMilestone {
  id: string;
  milestone: string;
  description: string;
  percentage: number;
  amount: number;
  dueDate: string;
  paidAmount: number;
  balance: number;
  status: 'Pending' | 'Invoiced' | 'Partially Paid' | 'Paid in Full' | 'Overdue';
  paidDate?: string;
  paymentMethod?: string;
  receiptReference?: string;
}

export interface PaymentSchedule {
  id: string;
  docNumber: string;
  projectId: string;
  revision: string;
  date: string;
  status: DocumentStatus;
  totalContractValue: number;
  milestones: PaymentMilestone[];
  totalPaid: number;
  totalBalance: number;
  notes: string;
  preparedBy: string;
  checkedBy: string;
  approvedBy: string;
  updatedAt: string;
}

// Variation Order
export interface VariationOrder {
  id: string;
  docNumber: string;
  projectId: string;
  revision: string;
  date: string;
  status: DocumentStatus;
  variationOrderNo: string;
  originalScopeSummary: string;
  variationDescription: string;
  reasonForVariation: string;
  quantityDiff: number;
  unit: string;
  originalRate: number;
  newRate: number;
  additionalOrDeductedAmount: number; // positive = addition, negative = deduction
  timeImpactDays: number; // positive = extension, negative = reduction
  clientApprovalStatus: 'Pending' | 'Approved' | 'Rejected' | 'Under Review';
  clientApprovalDate?: string;
  clientApprovedBy?: string;
  contractorApprovalStatus: 'Proposed' | 'Accepted' | 'Negotiation';
  contractorApprovedBy?: string;
  remarks: string;
  preparedBy: string;
  updatedAt: string;
}

// Building Permit & Approval
export type PermitStageNumber =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14;

export interface PermitWorkflowStep {
  stage: PermitStageNumber;
  name: string;
  status:
    | 'Pending'
    | 'In Progress'
    | 'Submitted'
    | 'Under Review'
    | 'Correction Required'
    | 'Approved'
    | 'Completed';
  date?: string;
  responsiblePerson: string;
  remarks: string;
  attachmentsCount: number;
}

export interface AuthorityChecklistItem {
  id: string;
  documentName: string;
  requirementType: 'Mandatory' | 'Optional' | 'Conditional';
  status:
    | 'Required'
    | 'Optional'
    | 'Not Applicable'
    | 'Pending'
    | 'Prepared'
    | 'Uploaded'
    | 'Submitted'
    | 'Verified'
    | 'Correction Required'
    | 'Approved';
  remarks?: string;
  verifiedBy?: string;
}

export interface CorrectionObservationItem {
  id: string;
  sn: number;
  authorityObservation: string;
  relatedDrawingOrDoc: string;
  actionTaken: string;
  revisionReference: string;
  supportingDoc: string;
  contractorResponse: string;
  status: 'Open' | 'Resolved' | 'Resubmitted' | 'Approved by Authority';
}

export interface BuildingPermitRecord {
  id: string;
  docNumber: string;
  projectId: string;
  revision: string;
  date: string;
  status: DocumentStatus;

  permitInfo: {
    applicationNo: string;
    permitNumber: string;
    applicationDate: string;
    submissionDate: string;
    approvalDate?: string;
    permitIssueDate?: string;
    permitValidUntil?: string;
    approvedBuildingArea: string;
    approvedFloors: string;
    approvedHeight: string;
    approvedDrawingRef: string;
    approvalLetterRef: string;
    currentStageStatus:
      | 'Draft'
      | 'Preparing'
      | 'Submitted'
      | 'Under Review'
      | 'Correction Required'
      | 'Approved'
      | 'Permit Issued'
      | 'Construction Started'
      | 'Completion Applied'
      | 'Completed';
  };

  architectural: {
    architectName: string;
    necLicenceNo: string;
    firmName: string;
    drawingDate: string;
    revision: string;
    approvedDrawingRef: string;
    drawingFiles: { name: string; type: string; date: string }[];
  };

  structural: {
    structuralEngineer: string;
    necLicenceNo: string;
    firmName: string;
    structuralDrawingRef: string;
    revision: string;
    structuralCalculationRef: string;
    soilInvestigationRef: string;
    seismicDesignRef: string; // e.g. NBC 105:2020 / NBC 105:2025
    drawingFiles: { name: string; type: string; date: string }[];
  };

  mep: {
    electricalDesigner: string;
    electricalLicenceNo: string;
    electricalDesignRef: string;
    sanitaryDesigner: string;
    sanitaryLicenceNo: string;
    sanitaryDesignRef: string;
  };

  workflowSteps: PermitWorkflowStep[];
  checklist: AuthorityChecklistItem[];
  corrections: CorrectionObservationItem[];

  preparedBy: string;
  reviewedBy: string;
  updatedAt: string;
}

// Completion Certificate
export interface CompletionCertificateRecord {
  id: string;
  docNumber: string;
  projectId: string;
  revision: string;
  date: string;
  status: DocumentStatus;

  permitNumber: string;
  approvedDrawingReference: string;
  owner: string;
  projectAddress: string;
  wardNo: number;
  kittaNo: string;

  approvedArea: number; // sq. ft / sq. m
  actualAsBuiltArea: number;
  approvedFloors: string;
  actualFloors: string;

  completionDate: string;
  applicationDate: string;
  certificateNumber: string;
  issueDate?: string;
  authorityRemarks: string;

  hasDiscrepancy: boolean;
  discrepancyNotes?: string;

  preparedBy: string;
  certifiedBy: string;
  approvedBy: string;
  updatedAt: string;
}

// Building Handover Record
export interface PunchListItem {
  id: string;
  sn: number;
  item: string;
  location: string;
  defectOrOutstandingWork: string;
  responsibleParty: string;
  targetDate: string;
  completedDate?: string;
  status: 'Open' | 'In Progress' | 'Rectified' | 'Verified & Closed';
  remarks?: string;
}

export interface HandoverCategoryItem {
  id: string;
  category: string;
  inspected: boolean;
  status: 'Satisfactory' | 'Needs Attention' | 'Not Applicable';
  remarks?: string;
}

export interface BuildingHandoverRecord {
  id: string;
  docNumber: string;
  projectId: string;
  revision: string;
  date: string;
  status: DocumentStatus;

  contractNo: string;
  completionDate: string;
  handoverDate: string;
  ownerRep: string;
  contractorRep: string;

  checklist: HandoverCategoryItem[];
  punchList: PunchListItem[];

  keysHandedOverCount: number;
  equipmentManualsHandedOver: boolean;
  warrantiesHandedOver: boolean;
  asBuiltDrawingsHandedOver: boolean;
  completionCertificateHandedOver: boolean;
  finalStatementNotes: string;

  ownerSigned: boolean;
  contractorSigned: boolean;
  updatedAt: string;
}

// Applicable Laws & Standards
export interface BuildingStandardRef {
  id: string;
  codeOrStandard: string;
  version: string;
  reference: string;
  applicableTo: string;
  lastUpdated: string;
  source: string;
  remarks: string;
  isMandatory: boolean;
}

// Audit Log Entry
export interface DocumentAuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: 'CREATE' | 'UPDATE' | 'STATUS_CHANGE' | 'REVISION' | 'LOCATION_UPDATE' | 'IMPORT' | 'ROLLBACK';
  entityType: 'Project' | 'Document' | 'Location' | 'Standard';
  entityId: string;
  entityName: string;
  description: string;
}
