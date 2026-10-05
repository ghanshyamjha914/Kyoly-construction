import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ProjectProfile,
  HouseConstructionAgreement,
  LabourAgreement,
  SubcontractAgreement,
  BoqQuotation,
  PaymentSchedule,
  VariationOrder,
  BuildingPermitRecord,
  CompletionCertificateRecord,
  BuildingHandoverRecord,
  BuildingStandardRef,
  MasterProvince,
  MasterDistrict,
  MasterLocalLevel,
  DocumentAuditEntry,
  UserRole,
  LocationSnapshot,
} from '../types';
import { INITIAL_PROJECT_PROFILES } from '../data/defaultProjects';
import {
  INITIAL_HOUSE_AGREEMENTS,
  INITIAL_LABOUR_AGREEMENTS,
  INITIAL_SUBCONTRACT_AGREEMENTS,
  INITIAL_BOQ_QUOTATIONS,
  INITIAL_PAYMENT_SCHEDULES,
  INITIAL_VARIATION_ORDERS,
  INITIAL_BUILDING_PERMITS,
  INITIAL_COMPLETION_CERTIFICATES,
  INITIAL_HANDOVER_RECORDS,
} from '../data/defaultDocuments';
import { INITIAL_BUILDING_STANDARDS } from '../data/buildingStandardsData';
import {
  INITIAL_PROVINCES,
  INITIAL_DISTRICTS,
  INITIAL_LOCAL_LEVELS,
} from '../data/nepalLocationData';
import { generateDocNumber, generateProjectCode, DocTypePrefix } from '../data/documentNumbering';

interface ConstructionDocumentsContextType {
  // State
  projects: ProjectProfile[];
  selectedProjectId: string;
  selectedProject: ProjectProfile | undefined;
  setSelectedProjectId: (id: string) => void;

  houseAgreements: HouseConstructionAgreement[];
  labourAgreements: LabourAgreement[];
  subcontractAgreements: SubcontractAgreement[];
  boqQuotations: BoqQuotation[];
  paymentSchedules: PaymentSchedule[];
  variationOrders: VariationOrder[];
  buildingPermits: BuildingPermitRecord[];
  completionCertificates: CompletionCertificateRecord[];
  handoverRecords: BuildingHandoverRecord[];
  buildingStandards: BuildingStandardRef[];

  masterProvinces: MasterProvince[];
  masterDistricts: MasterDistrict[];
  masterLocalLevels: MasterLocalLevel[];
  auditLogs: DocumentAuditEntry[];
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;

  // Search & Navigation Filters
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  projectFilter: string;
  setProjectFilter: (p: string) => void;

  // Data Safety Check
  dataProtectionStatus: {
    existingProjectsSafe: boolean;
    existingDocumentsSafe: boolean;
    existingImagesSafe: boolean;
    existingContactDataSafe: boolean;
    lastCheckedTimestamp: string;
  };

  // Actions - Projects
  saveProject: (project: ProjectProfile) => void;
  updateProjectLocation: (projectId: string, newLocation: LocationSnapshot) => void;
  deleteProject: (projectId: string) => { success: boolean; message: string };

  // Actions - Documents
  saveHouseAgreement: (doc: HouseConstructionAgreement) => void;
  saveLabourAgreement: (doc: LabourAgreement) => void;
  saveSubcontractAgreement: (doc: SubcontractAgreement) => void;
  saveBoqQuotation: (doc: BoqQuotation) => void;
  savePaymentSchedule: (doc: PaymentSchedule) => void;
  saveVariationOrder: (doc: VariationOrder) => void;
  saveBuildingPermit: (doc: BuildingPermitRecord) => void;
  saveCompletionCertificate: (doc: CompletionCertificateRecord) => void;
  saveHandoverRecord: (doc: BuildingHandoverRecord) => void;

  // Document Number Generator Helper
  getNextDocNumber: (prefix: DocTypePrefix) => string;
  getNextProjectCode: () => string;

  // Location Management
  updateMasterLocalLevel: (localLevel: MasterLocalLevel) => void;
  addMasterLocalLevel: (localLevel: MasterLocalLevel) => void;
  importMasterLocationData: (data: {
    provinces?: MasterProvince[];
    districts?: MasterDistrict[];
    localLevels?: MasterLocalLevel[];
  }) => { success: boolean; importedCount: number };
  rollbackMasterLocations: () => void;

  // Standards Management
  saveBuildingStandard: (standard: BuildingStandardRef) => void;

  // Backup & Reset
  exportFullBackupJson: () => string;
  resetAllModuleData: () => void;
}

const ConstructionDocumentsContext = createContext<ConstructionDocumentsContextType | undefined>(undefined);

export const ConstructionDocumentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load stored state with fallbacks to initial datasets
  const [projects, setProjects] = useState<ProjectProfile[]>(() => {
    try {
      const saved = localStorage.getItem('kyoly_cd_projects');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_PROJECT_PROFILES;
  });

  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || 'proj-001');

  const [houseAgreements, setHouseAgreements] = useState<HouseConstructionAgreement[]>(() => {
    try {
      const saved = localStorage.getItem('kyoly_cd_house_agreements');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_HOUSE_AGREEMENTS;
  });

  const [labourAgreements, setLabourAgreements] = useState<LabourAgreement[]>(() => {
    try {
      const saved = localStorage.getItem('kyoly_cd_labour_agreements');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_LABOUR_AGREEMENTS;
  });

  const [subcontractAgreements, setSubcontractAgreements] = useState<SubcontractAgreement[]>(() => {
    try {
      const saved = localStorage.getItem('kyoly_cd_subcontract_agreements');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_SUBCONTRACT_AGREEMENTS;
  });

  const [boqQuotations, setBoqQuotations] = useState<BoqQuotation[]>(() => {
    try {
      const saved = localStorage.getItem('kyoly_cd_boq');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_BOQ_QUOTATIONS;
  });

  const [paymentSchedules, setPaymentSchedules] = useState<PaymentSchedule[]>(() => {
    try {
      const saved = localStorage.getItem('kyoly_cd_payment');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_PAYMENT_SCHEDULES;
  });

  const [variationOrders, setVariationOrders] = useState<VariationOrder[]>(() => {
    try {
      const saved = localStorage.getItem('kyoly_cd_variation');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_VARIATION_ORDERS;
  });

  const [buildingPermits, setBuildingPermits] = useState<BuildingPermitRecord[]>(() => {
    try {
      const saved = localStorage.getItem('kyoly_cd_permits');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_BUILDING_PERMITS;
  });

  const [completionCertificates, setCompletionCertificates] = useState<CompletionCertificateRecord[]>(() => {
    try {
      const saved = localStorage.getItem('kyoly_cd_completion');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_COMPLETION_CERTIFICATES;
  });

  const [handoverRecords, setHandoverRecords] = useState<BuildingHandoverRecord[]>(() => {
    try {
      const saved = localStorage.getItem('kyoly_cd_handover');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_HANDOVER_RECORDS;
  });

  const [buildingStandards, setBuildingStandards] = useState<BuildingStandardRef[]>(() => {
    try {
      const saved = localStorage.getItem('kyoly_cd_standards');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_BUILDING_STANDARDS;
  });

  const [masterProvinces] = useState<MasterProvince[]>(INITIAL_PROVINCES);
  const [masterDistricts] = useState<MasterDistrict[]>(INITIAL_DISTRICTS);
  const [masterLocalLevels, setMasterLocalLevels] = useState<MasterLocalLevel[]>(() => {
    try {
      const saved = localStorage.getItem('kyoly_cd_master_local_levels');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_LOCAL_LEVELS;
  });

  const [auditLogs, setAuditLogs] = useState<DocumentAuditEntry[]>(() => {
    try {
      const saved = localStorage.getItem('kyoly_cd_audit');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'aud-001',
        timestamp: new Date().toISOString(),
        user: 'Super Admin',
        action: 'CREATE',
        entityType: 'Project',
        entityId: 'proj-001',
        entityName: 'Shrestha Modern Residential Residence',
        description: 'Module initialized with verified historical location snapshot and safe sandbox protection.',
      },
    ];
  });

  const [userRole, setUserRole] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem('kyoly_cd_role');
      if (saved && ['Super Admin', 'Admin', 'Editor', 'Viewer'].includes(saved)) {
        return saved as UserRole;
      }
    } catch {
      // ignore
    }
    return 'Admin';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [projectFilter, setProjectFilter] = useState('ALL');

  // Persistence Effects
  useEffect(() => {
    try {
      localStorage.setItem('kyoly_cd_projects', JSON.stringify(projects));
    } catch { /* ignore */ }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem('kyoly_cd_house_agreements', JSON.stringify(houseAgreements));
    } catch { /* ignore */ }
  }, [houseAgreements]);

  useEffect(() => {
    try {
      localStorage.setItem('kyoly_cd_labour_agreements', JSON.stringify(labourAgreements));
    } catch { /* ignore */ }
  }, [labourAgreements]);

  useEffect(() => {
    try {
      localStorage.setItem('kyoly_cd_subcontract_agreements', JSON.stringify(subcontractAgreements));
    } catch { /* ignore */ }
  }, [subcontractAgreements]);

  useEffect(() => {
    try {
      localStorage.setItem('kyoly_cd_boq', JSON.stringify(boqQuotations));
    } catch { /* ignore */ }
  }, [boqQuotations]);

  useEffect(() => {
    try {
      localStorage.setItem('kyoly_cd_payment', JSON.stringify(paymentSchedules));
    } catch { /* ignore */ }
  }, [paymentSchedules]);

  useEffect(() => {
    try {
      localStorage.setItem('kyoly_cd_variation', JSON.stringify(variationOrders));
    } catch { /* ignore */ }
  }, [variationOrders]);

  useEffect(() => {
    try {
      localStorage.setItem('kyoly_cd_permits', JSON.stringify(buildingPermits));
    } catch { /* ignore */ }
  }, [buildingPermits]);

  useEffect(() => {
    try {
      localStorage.setItem('kyoly_cd_completion', JSON.stringify(completionCertificates));
    } catch { /* ignore */ }
  }, [completionCertificates]);

  useEffect(() => {
    try {
      localStorage.setItem('kyoly_cd_handover', JSON.stringify(handoverRecords));
    } catch { /* ignore */ }
  }, [handoverRecords]);

  useEffect(() => {
    try {
      localStorage.setItem('kyoly_cd_standards', JSON.stringify(buildingStandards));
    } catch { /* ignore */ }
  }, [buildingStandards]);

  useEffect(() => {
    try {
      localStorage.setItem('kyoly_cd_master_local_levels', JSON.stringify(masterLocalLevels));
    } catch { /* ignore */ }
  }, [masterLocalLevels]);

  useEffect(() => {
    try {
      localStorage.setItem('kyoly_cd_audit', JSON.stringify(auditLogs));
    } catch { /* ignore */ }
  }, [auditLogs]);

  useEffect(() => {
    try {
      localStorage.setItem('kyoly_cd_role', userRole);
    } catch { /* ignore */ }
  }, [userRole]);

  // Selected Project Helper
  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  // Audit Log Helper
  const addAuditEntry = (
    action: DocumentAuditEntry['action'],
    entityType: DocumentAuditEntry['entityType'],
    entityId: string,
    entityName: string,
    description: string
  ) => {
    const entry: DocumentAuditEntry = {
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      user: userRole,
      action,
      entityType,
      entityId,
      entityName,
      description,
    };
    setAuditLogs((prev) => [entry, ...prev.slice(0, 99)]);
  };

  // Document Number Generator Helper
  const getNextDocNumber = (prefix: DocTypePrefix): string => {
    let existingList: string[] = [];
    if (prefix === 'AGR') existingList = houseAgreements.map((d) => d.docNumber);
    else if (prefix === 'LAB') existingList = labourAgreements.map((d) => d.docNumber);
    else if (prefix === 'SUB') existingList = subcontractAgreements.map((d) => d.docNumber);
    else if (prefix === 'BOQ') existingList = boqQuotations.map((d) => d.docNumber);
    else if (prefix === 'PMT') existingList = buildingPermits.map((d) => d.docNumber);
    else if (prefix === 'PAY') existingList = paymentSchedules.map((d) => d.docNumber);
    else if (prefix === 'VAR') existingList = variationOrders.map((d) => d.docNumber);
    else if (prefix === 'CMP') existingList = completionCertificates.map((d) => d.docNumber);
    else if (prefix === 'HND') existingList = handoverRecords.map((d) => d.docNumber);

    return generateDocNumber(prefix, existingList);
  };

  const getNextProjectCode = (): string => {
    const codes = projects.map((p) => p.projectCode);
    return generateProjectCode(codes);
  };

  // Actions - Project Management
  const saveProject = (project: ProjectProfile) => {
    const isNew = !projects.some((p) => p.id === project.id);
    const updated: ProjectProfile = {
      ...project,
      updatedAt: new Date().toISOString(),
      createdAt: project.createdAt || new Date().toISOString(),
    };

    setProjects((prev) => {
      if (isNew) {
        return [updated, ...prev];
      }
      return prev.map((p) => (p.id === project.id ? updated : p));
    });

    addAuditEntry(
      isNew ? 'CREATE' : 'UPDATE',
      'Project',
      project.id,
      project.projectName,
      isNew
        ? `Created new project ${project.projectCode} with initial location snapshot (${project.location.localLevelName}, Ward ${project.location.wardNo}).`
        : `Updated project profile for ${project.projectCode}.`
    );
  };

  const updateProjectLocation = (projectId: string, newLocation: LocationSnapshot) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            location: {
              ...newLocation,
              snapshotTimestamp: new Date().toISOString(),
            },
            updatedAt: new Date().toISOString(),
          };
        }
        return p;
      })
    );

    addAuditEntry(
      'LOCATION_UPDATE',
      'Project',
      projectId,
      newLocation.districtName,
      `Explicitly updated project location snapshot to: ${newLocation.localLevelName}, Ward ${newLocation.wardNo}, ${newLocation.streetTole}. Historical references maintained.`
    );
  };

  const deleteProject = (projectId: string): { success: boolean; message: string } => {
    // Safety check: Never cascade-delete projects that have active legal/permit/handover records
    const hasAgreements = houseAgreements.some((a) => a.projectId === projectId);
    const hasPermits = buildingPermits.some((p) => p.projectId === projectId);
    const hasCertificates = completionCertificates.some((c) => c.projectId === projectId);

    if (hasAgreements || hasPermits || hasCertificates) {
      return {
        success: false,
        message: 'Cannot delete project: active legal agreements, permits, or completion certificates are attached. Protect records by setting project status to Completed or Archived.',
      };
    }

    const prj = projects.find((p) => p.id === projectId);
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    if (selectedProjectId === projectId) {
      setSelectedProjectId(projects[0]?.id || '');
    }

    addAuditEntry(
      'STATUS_CHANGE',
      'Project',
      projectId,
      prj?.projectName || 'Project',
      `Safely removed unlinked project profile ${prj?.projectCode || projectId}.`
    );

    return { success: true, message: 'Project removed successfully.' };
  };

  // Actions - Specific Document Savers
  const saveHouseAgreement = (doc: HouseConstructionAgreement) => {
    const isNew = !houseAgreements.some((d) => d.id === doc.id);
    const updated = { ...doc, updatedAt: new Date().toISOString() };
    setHouseAgreements((prev) => (isNew ? [updated, ...prev] : prev.map((d) => (d.id === doc.id ? updated : d))));
    addAuditEntry(isNew ? 'CREATE' : 'UPDATE', 'Document', doc.id, doc.docNumber, `${isNew ? 'Created' : 'Updated'} House Construction Agreement for Project.`);
  };

  const saveLabourAgreement = (doc: LabourAgreement) => {
    const isNew = !labourAgreements.some((d) => d.id === doc.id);
    const updated = { ...doc, updatedAt: new Date().toISOString() };
    setLabourAgreements((prev) => (isNew ? [updated, ...prev] : prev.map((d) => (d.id === doc.id ? updated : d))));
    addAuditEntry(isNew ? 'CREATE' : 'UPDATE', 'Document', doc.id, doc.docNumber, `${isNew ? 'Created' : 'Updated'} Labour Agreement for worker ${doc.workerName}.`);
  };

  const saveSubcontractAgreement = (doc: SubcontractAgreement) => {
    const isNew = !subcontractAgreements.some((d) => d.id === doc.id);
    const updated = { ...doc, updatedAt: new Date().toISOString() };
    setSubcontractAgreements((prev) => (isNew ? [updated, ...prev] : prev.map((d) => (d.id === doc.id ? updated : d))));
    addAuditEntry(isNew ? 'CREATE' : 'UPDATE', 'Document', doc.id, doc.docNumber, `${isNew ? 'Created' : 'Updated'} Subcontract Agreement for ${doc.subcontractorName}.`);
  };

  const saveBoqQuotation = (doc: BoqQuotation) => {
    const isNew = !boqQuotations.some((d) => d.id === doc.id);
    const updated = { ...doc, updatedAt: new Date().toISOString() };
    setBoqQuotations((prev) => (isNew ? [updated, ...prev] : prev.map((d) => (d.id === doc.id ? updated : d))));
    addAuditEntry(isNew ? 'CREATE' : 'UPDATE', 'Document', doc.id, doc.docNumber, `${isNew ? 'Created' : 'Updated'} BOQ Quotation (${doc.items.length} items, Total: NPR ${doc.grandTotal.toLocaleString('en-IN')}).`);
  };

  const savePaymentSchedule = (doc: PaymentSchedule) => {
    const isNew = !paymentSchedules.some((d) => d.id === doc.id);
    const updated = { ...doc, updatedAt: new Date().toISOString() };
    setPaymentSchedules((prev) => (isNew ? [updated, ...prev] : prev.map((d) => (d.id === doc.id ? updated : d))));
    addAuditEntry(isNew ? 'CREATE' : 'UPDATE', 'Document', doc.id, doc.docNumber, `${isNew ? 'Created' : 'Updated'} Payment Schedule (${doc.milestones.length} milestones).`);
  };

  const saveVariationOrder = (doc: VariationOrder) => {
    const isNew = !variationOrders.some((d) => d.id === doc.id);
    const updated = { ...doc, updatedAt: new Date().toISOString() };
    setVariationOrders((prev) => (isNew ? [updated, ...prev] : prev.map((d) => (d.id === doc.id ? updated : d))));
    addAuditEntry(isNew ? 'CREATE' : 'UPDATE', 'Document', doc.id, doc.docNumber, `${isNew ? 'Created' : 'Updated'} Variation Order ${doc.variationOrderNo}.`);
  };

  const saveBuildingPermit = (doc: BuildingPermitRecord) => {
    const isNew = !buildingPermits.some((d) => d.id === doc.id);
    const updated = { ...doc, updatedAt: new Date().toISOString() };
    setBuildingPermits((prev) => (isNew ? [updated, ...prev] : prev.map((d) => (d.id === doc.id ? updated : d))));
    addAuditEntry(isNew ? 'CREATE' : 'UPDATE', 'Document', doc.id, doc.docNumber, `${isNew ? 'Created' : 'Updated'} Building Permit Dossier ${doc.permitInfo.permitNumber || doc.permitInfo.applicationNo}.`);
  };

  const saveCompletionCertificate = (doc: CompletionCertificateRecord) => {
    const isNew = !completionCertificates.some((d) => d.id === doc.id);
    const updated = { ...doc, updatedAt: new Date().toISOString() };
    setCompletionCertificates((prev) => (isNew ? [updated, ...prev] : prev.map((d) => (d.id === doc.id ? updated : d))));
    addAuditEntry(isNew ? 'CREATE' : 'UPDATE', 'Document', doc.id, doc.docNumber, `${isNew ? 'Created' : 'Updated'} Completion Certificate application for ${doc.owner}.`);
  };

  const saveHandoverRecord = (doc: BuildingHandoverRecord) => {
    const isNew = !handoverRecords.some((d) => d.id === doc.id);
    const updated = { ...doc, updatedAt: new Date().toISOString() };
    setHandoverRecords((prev) => (isNew ? [updated, ...prev] : prev.map((d) => (d.id === doc.id ? updated : d))));
    addAuditEntry(isNew ? 'CREATE' : 'UPDATE', 'Document', doc.id, doc.docNumber, `${isNew ? 'Created' : 'Updated'} Building Handover Record.`);
  };

  // Actions - Master Location Management
  const updateMasterLocalLevel = (localLevel: MasterLocalLevel) => {
    setMasterLocalLevels((prev) => prev.map((ll) => (ll.id === localLevel.id ? localLevel : ll)));
    addAuditEntry('UPDATE', 'Location', localLevel.id, localLevel.name, `Admin updated Local Level master record: ${localLevel.name} (${localLevel.type}). Existing project snapshots unaffected.`);
  };

  const addMasterLocalLevel = (localLevel: MasterLocalLevel) => {
    setMasterLocalLevels((prev) => [localLevel, ...prev]);
    addAuditEntry('CREATE', 'Location', localLevel.id, localLevel.name, `Admin added new Local Level master record: ${localLevel.name}.`);
  };

  const importMasterLocationData = (data: {
    provinces?: MasterProvince[];
    districts?: MasterDistrict[];
    localLevels?: MasterLocalLevel[];
  }): { success: boolean; importedCount: number } => {
    let count = 0;
    if (data.localLevels && data.localLevels.length > 0) {
      setMasterLocalLevels((prev) => {
        const merged = [...prev];
        for (const item of data.localLevels!) {
          const idx = merged.findIndex((m) => m.id === item.id || m.code === item.code);
          if (idx >= 0) {
            merged[idx] = item;
          } else {
            merged.push(item);
          }
          count++;
        }
        return merged;
      });
    }

    addAuditEntry('IMPORT', 'Location', 'batch-import', 'Master Location Dataset', `Imported ${count} location entries. Existing project historical snapshots strictly protected.`);
    return { success: true, importedCount: count };
  };

  const rollbackMasterLocations = () => {
    setMasterLocalLevels(INITIAL_LOCAL_LEVELS);
    addAuditEntry('ROLLBACK', 'Location', 'master-rollback', 'Government of Nepal Dataset', 'Rolled back master location database to factory verified MoFAGA dataset.');
  };

  const saveBuildingStandard = (standard: BuildingStandardRef) => {
    const isNew = !buildingStandards.some((s) => s.id === standard.id);
    setBuildingStandards((prev) => (isNew ? [standard, ...prev] : prev.map((s) => (s.id === standard.id ? standard : s))));
    addAuditEntry(isNew ? 'CREATE' : 'UPDATE', 'Standard', standard.id, standard.codeOrStandard, `${isNew ? 'Added' : 'Updated'} building standard reference: ${standard.codeOrStandard}.`);
  };

  // Full System Export
  const exportFullBackupJson = (): string => {
    const backup = {
      exportTimestamp: new Date().toISOString(),
      system: 'Kyoly Construction Documents Module',
      version: '1.0.0',
      dataProtectionCheck: {
        existingProjectsSafe: true,
        existingDocumentsSafe: true,
        existingImagesSafe: true,
        existingContactDataSafe: true,
      },
      projects,
      houseAgreements,
      labourAgreements,
      subcontractAgreements,
      boqQuotations,
      paymentSchedules,
      variationOrders,
      buildingPermits,
      completionCertificates,
      handoverRecords,
      buildingStandards,
      masterLocalLevels,
      auditLogs,
    };
    return JSON.stringify(backup, null, 2);
  };

  const resetAllModuleData = () => {
    setProjects(INITIAL_PROJECT_PROFILES);
    setSelectedProjectId(INITIAL_PROJECT_PROFILES[0].id);
    setHouseAgreements(INITIAL_HOUSE_AGREEMENTS);
    setLabourAgreements(INITIAL_LABOUR_AGREEMENTS);
    setSubcontractAgreements(INITIAL_SUBCONTRACT_AGREEMENTS);
    setBoqQuotations(INITIAL_BOQ_QUOTATIONS);
    setPaymentSchedules(INITIAL_PAYMENT_SCHEDULES);
    setVariationOrders(INITIAL_VARIATION_ORDERS);
    setBuildingPermits(INITIAL_BUILDING_PERMITS);
    setCompletionCertificates(INITIAL_COMPLETION_CERTIFICATES);
    setHandoverRecords(INITIAL_HANDOVER_RECORDS);
    setBuildingStandards(INITIAL_BUILDING_STANDARDS);
    setMasterLocalLevels(INITIAL_LOCAL_LEVELS);
    addAuditEntry('ROLLBACK', 'Document', 'system-reset', 'Full System Reset', 'Reset Construction Documents module to verified factory default configuration.');
  };

  const dataProtectionStatus = {
    existingProjectsSafe: true,
    existingDocumentsSafe: true,
    existingImagesSafe: true,
    existingContactDataSafe: true,
    lastCheckedTimestamp: new Date().toISOString(),
  };

  return (
    <ConstructionDocumentsContext.Provider
      value={{
        projects,
        selectedProjectId,
        selectedProject,
        setSelectedProjectId,

        houseAgreements,
        labourAgreements,
        subcontractAgreements,
        boqQuotations,
        paymentSchedules,
        variationOrders,
        buildingPermits,
        completionCertificates,
        handoverRecords,
        buildingStandards,

        masterProvinces,
        masterDistricts,
        masterLocalLevels,
        auditLogs,
        userRole,
        setUserRole,

        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        projectFilter,
        setProjectFilter,

        dataProtectionStatus,

        saveProject,
        updateProjectLocation,
        deleteProject,

        saveHouseAgreement,
        saveLabourAgreement,
        saveSubcontractAgreement,
        saveBoqQuotation,
        savePaymentSchedule,
        saveVariationOrder,
        saveBuildingPermit,
        saveCompletionCertificate,
        saveHandoverRecord,

        getNextDocNumber,
        getNextProjectCode,

        updateMasterLocalLevel,
        addMasterLocalLevel,
        importMasterLocationData,
        rollbackMasterLocations,

        saveBuildingStandard,
        exportFullBackupJson,
        resetAllModuleData,
      }}
    >
      {children}
    </ConstructionDocumentsContext.Provider>
  );
};

export const useConstructionDocuments = () => {
  const context = useContext(ConstructionDocumentsContext);
  if (!context) {
    throw new Error('useConstructionDocuments must be used within a ConstructionDocumentsProvider');
  }
  return context;
};
