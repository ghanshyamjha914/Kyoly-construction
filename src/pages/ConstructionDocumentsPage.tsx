import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useConstructionDocuments } from '../modules/construction-documents/context/ConstructionDocumentsContext';
import {
  ProjectProfile,
  DocumentStatus,
  HouseConstructionAgreement,
  LabourAgreement,
  SubcontractAgreement,
  BoqQuotation,
  PaymentSchedule,
  VariationOrder,
  BuildingPermitRecord,
  CompletionCertificateRecord,
  BuildingHandoverRecord,
} from '../modules/construction-documents/types';
import { DocumentStatusBadge } from '../modules/construction-documents/components/DocumentStatusBadge';
import { ProjectProfileModal } from '../modules/construction-documents/components/ProjectProfileModal';
import { ProjectLocationUpdateModal } from '../modules/construction-documents/components/ProjectLocationUpdateModal';
import { LocationManagementModal } from '../modules/construction-documents/components/LocationManagementModal';
import { AreaCalculatorModal } from '../modules/construction-documents/components/AreaCalculatorModal';
import { HouseAgreementModal } from '../modules/construction-documents/components/HouseAgreementModal';
import { BoqQuotationModal } from '../modules/construction-documents/components/BoqQuotationModal';
import { LabourAgreementModal } from '../modules/construction-documents/components/LabourAgreementModal';
import { SubcontractAgreementModal } from '../modules/construction-documents/components/SubcontractAgreementModal';
import { BuildingPermitModal } from '../modules/construction-documents/components/BuildingPermitModal';
import { PaymentScheduleModal } from '../modules/construction-documents/components/PaymentScheduleModal';
import { VariationOrderModal } from '../modules/construction-documents/components/VariationOrderModal';
import { CompletionCertificateModal } from '../modules/construction-documents/components/CompletionCertificateModal';
import { HandoverRecordModal } from '../modules/construction-documents/components/HandoverRecordModal';
import { BuildingStandardsModal } from '../modules/construction-documents/components/BuildingStandardsModal';
import { AuditLogModal } from '../modules/construction-documents/components/AuditLogModal';
import { LegalDisclaimerBox } from '../modules/construction-documents/components/LegalDisclaimerBox';
import { ProjectsDirectoryView } from '../modules/construction-documents/components/ProjectsDirectoryView';
import { ExpensesReportView } from '../modules/construction-documents/components/ExpensesReportView';
import { SettingsAdminView } from '../modules/construction-documents/components/SettingsAdminView';
import { useAuth } from '../modules/construction-documents/context/AuthContext';
import { ConstructionDocumentsLoginScreen } from '../modules/construction-documents/components/ConstructionDocumentsLoginScreen';
import { KyolyLogo } from '../components/KyolyLogo';
import {
  FileText,
  Building,
  HardHat,
  Handshake,
  FileSpreadsheet,
  CreditCard,
  GitBranch,
  Award,
  Key,
  LayoutDashboard,
  Plus,
  Search,
  Filter,
  MapPin,
  ShieldCheck,
  Calculator,
  Database,
  History,
  BookOpen,
  Eye,
  Edit,
  Printer,
  ChevronRight,
  AlertCircle,
  ExternalLink,
  Layers,
  ArrowUpDown,
  RefreshCw,
  LogOut,
  FolderKanban,
  Receipt,
  Settings as SettingsIcon,
  FileCheck,
  ArrowLeft,
  Shield,
  User,
  Clock,
  Lock,
  CheckCircle2,
  DollarSign,
  Download,
} from 'lucide-react';

export const ConstructionDocumentsPage: React.FC = () => {
  const { isAuthenticated, currentUser, logout, canEdit, canManageSettings, hasRole, authNotice } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'dashboard';

  const setTab = (tabName: string) => {
    setSearchParams({ tab: tabName });
  };

  const {
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
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    dataProtectionStatus,
  } = useConstructionDocuments();

  // Modals state
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<ProjectProfile | undefined>(undefined);

  const [locationUpdateModalOpen, setLocationUpdateModalOpen] = useState(false);
  const [locationManagementOpen, setLocationManagementOpen] = useState(false);
  const [areaCalcOpen, setAreaCalcOpen] = useState(false);
  const [standardsModalOpen, setStandardsModalOpen] = useState(false);
  const [auditLogModalOpen, setAuditLogModalOpen] = useState(false);

  // Document Editor modals
  const [houseAgreementModalOpen, setHouseAgreementModalOpen] = useState(false);
  const [selectedHouseAgreement, setSelectedHouseAgreement] = useState<HouseConstructionAgreement | undefined>(undefined);

  const [boqModalOpen, setBoqModalOpen] = useState(false);
  const [selectedBoq, setSelectedBoq] = useState<BoqQuotation | undefined>(undefined);

  const [labourModalOpen, setLabourModalOpen] = useState(false);
  const [selectedLabour, setSelectedLabour] = useState<LabourAgreement | undefined>(undefined);

  const [subcontractModalOpen, setSubcontractModalOpen] = useState(false);
  const [selectedSubcontract, setSelectedSubcontract] = useState<SubcontractAgreement | undefined>(undefined);

  const [permitModalOpen, setPermitModalOpen] = useState(false);
  const [selectedPermit, setSelectedPermit] = useState<BuildingPermitRecord | undefined>(undefined);

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentSchedule | undefined>(undefined);

  const [variationModalOpen, setVariationModalOpen] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<VariationOrder | undefined>(undefined);

  const [completionModalOpen, setCompletionModalOpen] = useState(false);
  const [selectedCompletion, setSelectedCompletion] = useState<CompletionCertificateRecord | undefined>(undefined);

  const [handoverModalOpen, setHandoverModalOpen] = useState(false);
  const [selectedHandover, setSelectedHandover] = useState<BuildingHandoverRecord | undefined>(undefined);

  // KPI Calculations
  const stats = useMemo(() => {
    const allDocs = [
      ...houseAgreements,
      ...labourAgreements,
      ...subcontractAgreements,
      ...boqQuotations,
      ...paymentSchedules,
      ...variationOrders,
      ...buildingPermits,
      ...completionCertificates,
      ...handoverRecords,
    ];

    return {
      totalProjects: projects.length,
      activeDocs: allDocs.length,
      draftDocs: allDocs.filter((d) => d.status === 'Draft').length,
      underReviewDocs: allDocs.filter((d) => d.status === 'Under Review').length,
      finalDocs: allDocs.filter((d) => d.status === 'Final' || d.status === 'Approved').length,
      pendingCorrections: buildingPermits.filter(
        (p) => p.permitInfo.currentStageStatus === 'Correction Required'
      ).length,
      permitApplications: buildingPermits.length,
      completionCerts: completionCertificates.length,
      handoverRecordsCount: handoverRecords.length,
    };
  }, [
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
  ]);

  // Unified Search Filter
  const matchesGlobalSearch = (textArray: (string | number | undefined)[]) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return textArray.some((item) => item !== undefined && String(item).toLowerCase().includes(q));
  };

  // Filtered documents by selected project & search
  const filteredHouseAgreements = houseAgreements.filter(
    (doc) =>
      (!selectedProjectId || doc.projectId === selectedProjectId) &&
      (statusFilter === 'ALL' || doc.status === statusFilter) &&
      matchesGlobalSearch([
        doc.docNumber,
        doc.ownerDetails.fullName,
        doc.ownerDetails.address,
        doc.contractType,
        selectedProject?.projectName,
        selectedProject?.location.districtName,
        selectedProject?.location.localLevelName,
      ])
  );

  const filteredLabourAgreements = labourAgreements.filter(
    (doc) =>
      (!selectedProjectId || doc.projectId === selectedProjectId) &&
      (statusFilter === 'ALL' || doc.status === statusFilter) &&
      matchesGlobalSearch([
        doc.docNumber,
        doc.workerName,
        doc.citizenshipId,
        doc.tradeSkill,
        selectedProject?.projectName,
      ])
  );

  const filteredSubcontracts = subcontractAgreements.filter(
    (doc) =>
      (!selectedProjectId || doc.projectId === selectedProjectId) &&
      (statusFilter === 'ALL' || doc.status === statusFilter) &&
      matchesGlobalSearch([
        doc.docNumber,
        doc.subcontractorName,
        doc.subcontractorPan,
        doc.boqReference,
        selectedProject?.projectName,
      ])
  );

  const filteredBoqs = boqQuotations.filter(
    (doc) =>
      (!selectedProjectId || doc.projectId === selectedProjectId) &&
      (statusFilter === 'ALL' || doc.status === statusFilter) &&
      matchesGlobalSearch([
        doc.docNumber,
        doc.title,
        doc.preparedBy,
        selectedProject?.projectName,
        selectedProject?.clientOwner,
      ])
  );

  const filteredPaymentSchedules = paymentSchedules.filter(
    (doc) =>
      (!selectedProjectId || doc.projectId === selectedProjectId) &&
      (statusFilter === 'ALL' || doc.status === statusFilter) &&
      matchesGlobalSearch([
        doc.docNumber,
        selectedProject?.projectName,
        selectedProject?.clientOwner,
      ])
  );

  const filteredVariationOrders = variationOrders.filter(
    (doc) =>
      (!selectedProjectId || doc.projectId === selectedProjectId) &&
      (statusFilter === 'ALL' || doc.status === statusFilter) &&
      matchesGlobalSearch([
        doc.docNumber,
        doc.variationOrderNo,
        doc.variationDescription,
        selectedProject?.projectName,
      ])
  );

  const filteredPermits = buildingPermits.filter(
    (doc) =>
      (!selectedProjectId || doc.projectId === selectedProjectId) &&
      (statusFilter === 'ALL' || doc.status === statusFilter) &&
      matchesGlobalSearch([
        doc.docNumber,
        doc.permitInfo.permitNumber,
        doc.permitInfo.applicationNo,
        doc.permitInfo.currentStageStatus,
        doc.architectural.architectName,
        doc.structural.structuralEngineer,
        selectedProject?.projectName,
        selectedProject?.location.localLevelName,
      ])
  );

  const filteredCompletionCerts = completionCertificates.filter(
    (doc) =>
      (!selectedProjectId || doc.projectId === selectedProjectId) &&
      (statusFilter === 'ALL' || doc.status === statusFilter) &&
      matchesGlobalSearch([
        doc.docNumber,
        doc.certificateNumber,
        doc.permitNumber,
        doc.owner,
        selectedProject?.projectName,
      ])
  );

  const filteredHandoverRecords = handoverRecords.filter(
    (doc) =>
      (!selectedProjectId || doc.projectId === selectedProjectId) &&
      (statusFilter === 'ALL' || doc.status === statusFilter) &&
      matchesGlobalSearch([
        doc.docNumber,
        doc.contractNo,
        doc.ownerRep,
        doc.contractorRep,
        selectedProject?.projectName,
      ])
  );

  // Map sub-tabs or legacy tabs to the 8 primary categories
  const currentMainTab = useMemo(() => {
    if (['dashboard', 'projects', 'documents', 'agreements', 'boq', 'payments', 'reports', 'settings'].includes(currentTab)) {
      return currentTab;
    }
    if (['house-agreement', 'labour-agreement', 'subcontract-agreement'].includes(currentTab)) {
      return 'agreements';
    }
    if (['building-permit', 'completion-certificate', 'handover-record'].includes(currentTab)) {
      return 'documents';
    }
    if (['boq-quotation', 'calculator'].includes(currentTab)) {
      return 'boq';
    }
    if (['payment-schedule'].includes(currentTab)) {
      return 'payments';
    }
    if (['variation-order', 'expenses', 'audit-trail'].includes(currentTab)) {
      return 'reports';
    }
    if (['location-db', 'roles', 'standards'].includes(currentTab)) {
      return 'settings';
    }
    return 'dashboard';
  }, [currentTab]);

  // Tab definitions matching the exact requested categories (Dashboard, Projects, Documents, Agreements, BOQ, Payments, Reports, Settings, Logout)
  const navTabs = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, count: stats.activeDocs },
    { id: 'projects', name: 'Projects', icon: FolderKanban, count: projects.length },
    { id: 'documents', name: 'Documents', icon: FileCheck, count: buildingPermits.length + completionCertificates.length + handoverRecords.length },
    { id: 'agreements', name: 'Agreements', icon: FileText, count: houseAgreements.length + labourAgreements.length + subcontractAgreements.length },
    { id: 'boq', name: 'BOQ', icon: FileSpreadsheet, count: boqQuotations.length },
    { id: 'payments', name: 'Payments', icon: CreditCard, count: paymentSchedules.length },
    { id: 'reports', name: 'Reports', icon: Receipt, count: variationOrders.length },
    { id: 'settings', name: 'Settings', icon: SettingsIcon, count: 3 },
    { id: 'logout', name: 'Logout', icon: LogOut, count: undefined },
  ];

  // If user is not authenticated, block all document views and show the secure login screen
  if (!isAuthenticated) {
    return <ConstructionDocumentsLoginScreen />;
  }

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      {/* Top Private Engineering Navigation Bar */}
      <header className="bg-[#0B0F19] text-white border-b border-neutral-800 py-3.5 px-4 sm:px-6 lg:px-8 sticky top-0 z-30 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/internal/portal" className="shrink-0 flex items-center gap-2">
              <KyolyLogo size="md" variant="dark" />
            </Link>
            <div className="h-6 w-px bg-neutral-800 hidden sm:block" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black font-['Outfit'] text-white tracking-wide uppercase">
                  CONSTRUCTION DOCUMENTS
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5 text-amber-400" />
                  <span>PRIVATE SYSTEM</span>
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-mono hidden md:block">
                Confidential Enterprise Contracts & Municipal Engineering Suite · Kyoly Construction Pvt. Ltd.
              </p>
            </div>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-3">
            {/* User Chip */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs">
              <div className="w-7 h-7 rounded-full bg-[#FF6B00] text-white font-bold flex items-center justify-center text-xs shadow-inner">
                {currentUser?.fullName ? currentUser.fullName.split(' ').map(n => n[0]).join('').slice(0, 2) : 'KC'}
              </div>
              <div className="text-left hidden sm:block">
                <div className="font-bold text-white leading-tight">{currentUser?.fullName}</div>
                <div className="text-[10px] text-neutral-400 font-mono leading-tight">{currentUser?.roleTitle}</div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                currentUser?.role === 'ADMIN'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : currentUser?.role === 'PROJECT_ENGINEER'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
              }`}>
                {currentUser?.role}
              </span>
            </div>

            {/* Public Website Button */}
            <Link
              to="/"
              className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-neutral-800 transition-colors"
              title="Return to Public Website Homepage"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-neutral-400" />
              <span className="hidden md:inline">Public Site</span>
            </Link>

            {/* Logout Button */}
            <button
              type="button"
              onClick={logout}
              className="px-3 py-2 bg-red-950/60 hover:bg-red-900 text-red-200 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 border border-red-800/60 transition-colors cursor-pointer"
              title="End Secure Session and Log Out"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Internal Quick Actions Bar */}
      <div className="bg-[#121826] text-white border-b border-neutral-800 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold">Encrypted Document Vault Active</span>
            <span className="text-neutral-500">|</span>
            <span className="text-neutral-400 font-mono text-[11px]">Strict Role-Based Authorization</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setProjectToEdit(undefined);
                setProjectModalOpen(true);
              }}
              className="px-3 py-1.5 bg-[#FF6B00] hover:bg-[#E04800] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Project</span>
            </button>

            <button
              type="button"
              onClick={() => setAreaCalcOpen(true)}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-neutral-700 transition-colors cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>Calculator</span>
            </button>

            <button
              type="button"
              onClick={() => setStandardsModalOpen(true)}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-neutral-700 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>NBC Codes</span>
            </button>

            <button
              type="button"
              onClick={() => setLocationManagementOpen(true)}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-neutral-700 transition-colors cursor-pointer"
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Location DB</span>
            </button>

            <button
              type="button"
              onClick={() => setAuditLogModalOpen(true)}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-neutral-700 transition-colors cursor-pointer"
            >
              <History className="w-3.5 h-3.5 text-purple-400" />
              <span>Audit Trail</span>
            </button>
          </div>
        </div>
      </div>

      {/* Central Project Selector Strip */}
      <div className="bg-white border-b border-neutral-200 shadow-xs sticky top-[69px] z-20 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Project Switcher */}
          <div className="flex items-center gap-3 flex-1 min-w-[300px]">
            <span className="text-xs font-bold text-neutral-500 uppercase shrink-0">Central Project:</span>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="px-3 py-1.5 bg-neutral-50 border-2 border-neutral-300 rounded-xl text-xs font-bold text-[#0F172A] focus:border-[#FF6B00] outline-hidden max-w-md w-full"
            >
              {projects.map((proj) => (
                <option key={proj.id} value={proj.id}>
                  {proj.projectCode} - {proj.projectName} ({proj.location.localLevelName})
                </option>
              ))}
            </select>

            {selectedProject && (
              <button
                type="button"
                onClick={() => {
                  setProjectToEdit(selectedProject);
                  setProjectModalOpen(true);
                }}
                className="p-1.5 hover:bg-neutral-100 text-neutral-600 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors shrink-0"
                title="Edit Central Project Profile"
              >
                <Edit className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span className="hidden md:inline">Edit Profile</span>
              </button>
            )}
          </div>

          {/* Project Location Snapshot Protected Badge */}
          {selectedProject && (
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-neutral-100 rounded-lg text-neutral-700 border border-neutral-200">
                <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span className="font-semibold">{selectedProject.location.localLevelName}-{selectedProject.location.wardNo}, {selectedProject.location.districtName}</span>
                <span className="text-[10px] text-neutral-400 font-mono">(Protected Snapshot)</span>
              </div>

              <button
                type="button"
                onClick={() => setLocationUpdateModalOpen(true)}
                className="px-2.5 py-1 text-[11px] font-bold text-[#FF6B00] hover:text-[#E04800] hover:bg-orange-50 rounded-lg transition-colors border border-orange-200"
                title="Explicitly Update Project Location Snapshot"
              >
                Update Location
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col">
        {/* Navigation Tabs Bar */}
        <div className="bg-white rounded-2xl p-1.5 border border-neutral-200 shadow-xs mb-6 overflow-x-auto scrollbar-thin">
          <nav className="flex space-x-1 min-w-max">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentMainTab === tab.id;
              const isLogout = tab.id === 'logout';
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (isLogout) {
                      logout();
                    } else if (tab.id === 'documents') setTab('building-permit');
                    else if (tab.id === 'agreements') setTab('house-agreement');
                    else if (tab.id === 'boq') setTab('boq-quotation');
                    else if (tab.id === 'payments') setTab('payment-schedule');
                    else if (tab.id === 'reports') setTab('variation-order');
                    else if (tab.id === 'settings') setTab('location-db');
                    else setTab(tab.id);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isLogout
                      ? 'text-red-600 hover:text-red-700 hover:bg-red-50 ml-auto'
                      : isActive
                      ? 'bg-[#0B0F19] text-white shadow-md'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isLogout ? 'text-red-500' : isActive ? 'text-[#FF6B00]' : 'text-neutral-400'}`} />
                  <span>{tab.name}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                        isActive ? 'bg-[#FF6B00] text-white' : 'bg-neutral-200 text-neutral-700'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Global Multi-Field Search & Filter Strip */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[280px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by Project Name, Owner, Client, District, Municipality, Ward, Doc No, Permit No..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:outline-hidden focus:border-[#FF6B00] font-medium"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-neutral-500 uppercase text-[11px]">Filter Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs font-semibold"
              >
                <option value="ALL">All Statuses</option>
                <option value="Draft">Draft</option>
                <option value="Under Review">Under Review</option>
                <option value="Correction Required">Correction Required</option>
                <option value="Final">Final</option>
                <option value="Approved">Approved</option>
              </select>
            </div>

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs font-semibold text-neutral-500 hover:text-neutral-800 underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: DASHBOARD VIEW */}
        {currentMainTab === 'dashboard' && (
          <div className="space-y-6">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
                <span className="text-[11px] font-bold text-neutral-500 uppercase block">Total Projects</span>
                <div className="text-2xl font-extrabold text-[#0F172A] mt-1 font-mono">
                  {stats.totalProjects}
                </div>
                <span className="text-[11px] text-neutral-400 mt-1 block">Active Profiles</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
                <span className="text-[11px] font-bold text-neutral-500 uppercase block">Active Documents</span>
                <div className="text-2xl font-extrabold text-[#FF6B00] mt-1 font-mono">
                  {stats.activeDocs}
                </div>
                <span className="text-[11px] text-neutral-400 mt-1 block">In System</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
                <span className="text-[11px] font-bold text-neutral-500 uppercase block">Permit Applications</span>
                <div className="text-2xl font-extrabold text-blue-600 mt-1 font-mono">
                  {stats.permitApplications}
                </div>
                <span className="text-[11px] text-neutral-400 mt-1 block">Municipal Desks</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
                <span className="text-[11px] font-bold text-neutral-500 uppercase block">Under Review</span>
                <div className="text-2xl font-extrabold text-amber-600 mt-1 font-mono">
                  {stats.underReviewDocs}
                </div>
                <span className="text-[11px] text-neutral-400 mt-1 block">Pending Review</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
                <span className="text-[11px] font-bold text-neutral-500 uppercase block">Corrections</span>
                <div className="text-2xl font-extrabold text-red-600 mt-1 font-mono">
                  {stats.pendingCorrections}
                </div>
                <span className="text-[11px] text-neutral-400 mt-1 block">Observation Flags</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
                <span className="text-[11px] font-bold text-neutral-500 uppercase block">Completed / Final</span>
                <div className="text-2xl font-extrabold text-emerald-600 mt-1 font-mono">
                  {stats.finalDocs}
                </div>
                <span className="text-[11px] text-neutral-400 mt-1 block">Statutory Approved</span>
              </div>
            </div>

            {/* Quick Create Buttons Bar */}
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-100">
                <h3 className="font-bold text-neutral-900 text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#FF6B00]" />
                  <span>Document Quick Launch</span>
                </h3>
                <span className="text-xs text-neutral-500">
                  Target Project: <strong className="text-neutral-900">{selectedProject?.projectName}</strong>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setProjectToEdit(undefined);
                    setProjectModalOpen(true);
                  }}
                  className="p-3 rounded-xl border border-neutral-200 hover:border-[#FF6B00] hover:bg-orange-50/30 text-center transition-all group"
                >
                  <Building className="w-5 h-5 mx-auto text-neutral-500 group-hover:text-[#FF6B00] transition-colors" />
                  <span className="text-[11px] font-bold text-neutral-800 mt-1 block">New Project</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedHouseAgreement(undefined);
                    setHouseAgreementModalOpen(true);
                  }}
                  className="p-3 rounded-xl border border-neutral-200 hover:border-[#FF6B00] hover:bg-orange-50/30 text-center transition-all group"
                >
                  <FileText className="w-5 h-5 mx-auto text-neutral-500 group-hover:text-[#FF6B00] transition-colors" />
                  <span className="text-[11px] font-bold text-neutral-800 mt-1 block">House Agreement</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedPermit(undefined);
                    setPermitModalOpen(true);
                  }}
                  className="p-3 rounded-xl border border-neutral-200 hover:border-[#FF6B00] hover:bg-orange-50/30 text-center transition-all group"
                >
                  <Building className="w-5 h-5 mx-auto text-neutral-500 group-hover:text-[#FF6B00] transition-colors" />
                  <span className="text-[11px] font-bold text-neutral-800 mt-1 block">Building Permit</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedBoq(undefined);
                    setBoqModalOpen(true);
                  }}
                  className="p-3 rounded-xl border border-neutral-200 hover:border-[#FF6B00] hover:bg-orange-50/30 text-center transition-all group"
                >
                  <FileSpreadsheet className="w-5 h-5 mx-auto text-neutral-500 group-hover:text-[#FF6B00] transition-colors" />
                  <span className="text-[11px] font-bold text-neutral-800 mt-1 block">New BOQ</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedPayment(undefined);
                    setPaymentModalOpen(true);
                  }}
                  className="p-3 rounded-xl border border-neutral-200 hover:border-[#FF6B00] hover:bg-orange-50/30 text-center transition-all group"
                >
                  <CreditCard className="w-5 h-5 mx-auto text-neutral-500 group-hover:text-[#FF6B00] transition-colors" />
                  <span className="text-[11px] font-bold text-neutral-800 mt-1 block">Payment Plan</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedVariation(undefined);
                    setVariationModalOpen(true);
                  }}
                  className="p-3 rounded-xl border border-neutral-200 hover:border-[#FF6B00] hover:bg-orange-50/30 text-center transition-all group"
                >
                  <GitBranch className="w-5 h-5 mx-auto text-neutral-500 group-hover:text-[#FF6B00] transition-colors" />
                  <span className="text-[11px] font-bold text-neutral-800 mt-1 block">Variation Order</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCompletion(undefined);
                    setCompletionModalOpen(true);
                  }}
                  className="p-3 rounded-xl border border-neutral-200 hover:border-[#FF6B00] hover:bg-orange-50/30 text-center transition-all group"
                >
                  <Award className="w-5 h-5 mx-auto text-neutral-500 group-hover:text-[#FF6B00] transition-colors" />
                  <span className="text-[11px] font-bold text-neutral-800 mt-1 block">Completion Cert</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedHandover(undefined);
                    setHandoverModalOpen(true);
                  }}
                  className="p-3 rounded-xl border border-neutral-200 hover:border-[#FF6B00] hover:bg-orange-50/30 text-center transition-all group"
                >
                  <Key className="w-5 h-5 mx-auto text-neutral-500 group-hover:text-[#FF6B00] transition-colors" />
                  <span className="text-[11px] font-bold text-neutral-800 mt-1 block">Handover Deed</span>
                </button>
              </div>
            </div>

            {/* Central Project Information Card */}
            {selectedProject && (
              <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-neutral-900">{selectedProject.projectName}</h3>
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-neutral-100 text-neutral-700">
                        {selectedProject.projectCode}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {selectedProject.projectStatus}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">
                      Client: <strong>{selectedProject.clientOwner}</strong> · Phone: {selectedProject.clientContact}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setProjectToEdit(selectedProject);
                        setProjectModalOpen(true);
                      }}
                      className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold transition-colors"
                    >
                      Full Project Profile
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                    <span className="text-neutral-500 block text-[11px] uppercase font-bold">Location</span>
                    <strong className="text-neutral-900 block mt-0.5">
                      {selectedProject.location.localLevelName}-{selectedProject.location.wardNo}, {selectedProject.location.districtName}
                    </strong>
                    <span className="text-[11px] text-neutral-500">{selectedProject.location.streetTole}</span>
                  </div>

                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                    <span className="text-neutral-500 block text-[11px] uppercase font-bold">Land / Plot</span>
                    <strong className="text-neutral-900 block mt-0.5">
                      Kitta: {selectedProject.land.kittaNo} ({selectedProject.land.plotArea})
                    </strong>
                    <span className="text-[11px] text-neutral-500">Lalpurja: {selectedProject.land.lalpurjaNo}</span>
                  </div>

                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                    <span className="text-neutral-500 block text-[11px] uppercase font-bold">Building Type</span>
                    <strong className="text-neutral-900 block mt-0.5">
                      {selectedProject.building.buildingType} ({selectedProject.building.numberOfFloors})
                    </strong>
                    <span className="text-[11px] text-neutral-500">Built-Up: {selectedProject.building.totalBuiltUpArea}</span>
                  </div>

                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                    <span className="text-neutral-500 block text-[11px] uppercase font-bold">Contractor</span>
                    <strong className="text-neutral-900 block mt-0.5">{selectedProject.contractor}</strong>
                    <span className="text-[11px] text-neutral-500">PAN: {selectedProject.contractorPan}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Documents Table */}
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
              <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
                <h3 className="font-bold text-neutral-900 text-sm">Active Project Documents</h3>
                <span className="text-xs text-neutral-500">Click any document to inspect or print</span>
              </div>

              <div className="divide-y divide-neutral-100 text-xs">
                {filteredHouseAgreements.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => {
                      setSelectedHouseAgreement(doc);
                      setHouseAgreementModalOpen(true);
                    }}
                    className="p-4 flex items-center justify-between hover:bg-neutral-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#FF6B00]" />
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-neutral-900 font-bold">House Construction Agreement</strong>
                          <span className="font-mono text-neutral-500">({doc.docNumber})</span>
                        </div>
                        <p className="text-[11px] text-neutral-500 mt-0.5">
                          Owner: {doc.ownerDetails.fullName} · Value: NPR {doc.contractValue.toLocaleString()} · Type: {doc.contractType}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DocumentStatusBadge status={doc.status} />
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </div>
                  </div>
                ))}

                {filteredPermits.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => {
                      setSelectedPermit(doc);
                      setPermitModalOpen(true);
                    }}
                    className="p-4 flex items-center justify-between hover:bg-neutral-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Building className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-neutral-900 font-bold">Building Permit Application</strong>
                          <span className="font-mono text-neutral-500">({doc.permitInfo.permitNumber})</span>
                        </div>
                        <p className="text-[11px] text-neutral-500 mt-0.5">
                          Stage: {doc.permitInfo.currentStageStatus} · Architect: {doc.architectural.architectName} · Structural: {doc.structural.structuralEngineer}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DocumentStatusBadge status={doc.status} />
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </div>
                  </div>
                ))}

                {filteredBoqs.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => {
                      setSelectedBoq(doc);
                      setBoqModalOpen(true);
                    }}
                    className="p-4 flex items-center justify-between hover:bg-neutral-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-neutral-900 font-bold">{doc.title}</strong>
                          <span className="font-mono text-neutral-500">({doc.docNumber})</span>
                        </div>
                        <p className="text-[11px] text-neutral-500 mt-0.5">
                          Total Estimate: NPR {doc.grandTotal.toLocaleString()} ({doc.items.length} Work Items)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DocumentStatusBadge status={doc.status} />
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </div>
                  </div>
                ))}

                {filteredPaymentSchedules.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => {
                      setSelectedPayment(doc);
                      setPaymentModalOpen(true);
                    }}
                    className="p-4 flex items-center justify-between hover:bg-neutral-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-neutral-900 font-bold">Milestone Payment Schedule</strong>
                          <span className="font-mono text-neutral-500">({doc.docNumber})</span>
                        </div>
                        <p className="text-[11px] text-neutral-500 mt-0.5">
                          Paid: NPR {doc.totalPaid.toLocaleString()} / Balance: NPR {doc.totalBalance.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DocumentStatusBadge status={doc.status} />
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CENTRAL PROJECTS DIRECTORY */}
        {currentMainTab === 'projects' && (
          <ProjectsDirectoryView
            projects={projects}
            selectedProjectId={selectedProjectId}
            onSelectProject={setSelectedProjectId}
            onEditProject={(proj) => {
              setProjectToEdit(proj);
              setProjectModalOpen(true);
            }}
            onNewProject={() => {
              setProjectToEdit(undefined);
              setProjectModalOpen(true);
            }}
            onUpdateLocation={() => {
              setLocationUpdateModalOpen(true);
            }}
          />
        )}

        {/* SUB-TABS: DOCUMENTS */}
        {currentMainTab === 'documents' && (
          <div className="flex items-center gap-2 mb-4 overflow-x-auto">
            <button
              onClick={() => setTab('building-permit')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentTab === 'building-permit' || currentTab === 'documents'
                  ? 'bg-[#FF6B00] text-white shadow-sm'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              Building Permit & Municipal Approvals ({buildingPermits.length})
            </button>
            <button
              onClick={() => setTab('completion-certificate')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentTab === 'completion-certificate'
                  ? 'bg-[#FF6B00] text-white shadow-sm'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              Completion Certificates ({completionCertificates.length})
            </button>
            <button
              onClick={() => setTab('handover-record')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentTab === 'handover-record'
                  ? 'bg-[#FF6B00] text-white shadow-sm'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              Handover Records & Snag Lists ({handoverRecords.length})
            </button>
          </div>
        )}

        {/* TAB 3: BUILDING PERMIT & APPROVAL */}
        {(currentTab === 'building-permit' || (currentMainTab === 'documents' && currentTab === 'documents')) && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-neutral-200">
              <div>
                <h3 className="font-bold text-neutral-900 text-sm">Building Permit & Municipal Approvals</h3>
                <p className="text-xs text-neutral-500">
                  Track 14-stage municipal approval progress, registered architect/structural details & authority correction observations.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedPermit(undefined);
                  setPermitModalOpen(true);
                }}
                className="px-3.5 py-2 bg-[#FF6B00] hover:bg-[#E04800] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New Permit Application</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#0B0F19] text-white uppercase text-[11px] font-bold">
                  <tr>
                    <th className="px-4 py-3">Permit No / Application</th>
                    <th className="px-4 py-3">Project & Location</th>
                    <th className="px-4 py-3">Architect & Structural Engineer</th>
                    <th className="px-4 py-3">Current Stage</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredPermits.map((p) => (
                    <tr key={p.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-3 font-mono">
                        <strong className="text-neutral-900 block">{p.permitInfo.permitNumber}</strong>
                        <span className="text-[11px] text-neutral-500">App: {p.permitInfo.applicationNo}</span>
                      </td>
                      <td className="px-4 py-3">
                        <strong className="text-neutral-900 block">{selectedProject?.projectName}</strong>
                        <span className="text-neutral-500">
                          {selectedProject?.location.localLevelName}-{selectedProject?.location.wardNo}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="block text-neutral-800">{p.architectural.architectName}</span>
                        <span className="block text-neutral-500">{p.structural.structuralEngineer}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                          {p.permitInfo.currentStageStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <DocumentStatusBadge status={p.status} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPermit(p);
                            setPermitModalOpen(true);
                          }}
                          className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-neutral-800 font-semibold"
                        >
                          Open Tracker
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SUB-TABS: AGREEMENTS */}
        {currentMainTab === 'agreements' && (
          <div className="flex items-center gap-2 mb-4 overflow-x-auto">
            <button
              onClick={() => setTab('house-agreement')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentTab === 'house-agreement' || currentTab === 'agreements'
                  ? 'bg-[#FF6B00] text-white shadow-sm'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              House Construction Agreement ({houseAgreements.length})
            </button>
            <button
              onClick={() => setTab('labour-agreement')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentTab === 'labour-agreement'
                  ? 'bg-[#FF6B00] text-white shadow-sm'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              Labour Agreement ({labourAgreements.length})
            </button>
            <button
              onClick={() => setTab('subcontract-agreement')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentTab === 'subcontract-agreement'
                  ? 'bg-[#FF6B00] text-white shadow-sm'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              Subcontract Agreement ({subcontractAgreements.length})
            </button>
          </div>
        )}

        {/* TAB 4: HOUSE CONSTRUCTION AGREEMENT */}
        {(currentTab === 'house-agreement' || (currentMainTab === 'agreements' && currentTab === 'agreements')) && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-neutral-200">
              <div>
                <h3 className="font-bold text-neutral-900 text-sm">House Construction Agreements</h3>
                <p className="text-xs text-neutral-500">
                  Residential construction contracts between Property Owner and Kyoly Construction Pvt. Ltd.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedHouseAgreement(undefined);
                  setHouseAgreementModalOpen(true);
                }}
                className="px-3.5 py-2 bg-[#FF6B00] hover:bg-[#E04800] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New House Agreement</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#0B0F19] text-white uppercase text-[11px] font-bold">
                  <tr>
                    <th className="px-4 py-3">Doc Ref</th>
                    <th className="px-4 py-3">Owner Details</th>
                    <th className="px-4 py-3">Contract Model</th>
                    <th className="px-4 py-3 text-right">Contract Value</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredHouseAgreements.map((hca) => (
                    <tr key={hca.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-3 font-mono font-bold text-neutral-900">
                        {hca.docNumber} ({hca.revision})
                      </td>
                      <td className="px-4 py-3">
                        <strong className="text-neutral-900 block">{hca.ownerDetails.fullName}</strong>
                        <span className="text-neutral-500">{hca.ownerDetails.address}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-semibold text-neutral-800 block">{hca.contractType}</span>
                        <span className="text-[11px] text-neutral-500">{hca.materialResponsibility}</span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-neutral-900">
                        NPR {hca.contractValue.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <DocumentStatusBadge status={hca.status} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedHouseAgreement(hca);
                            setHouseAgreementModalOpen(true);
                          }}
                          className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-neutral-800 font-semibold"
                        >
                          View / Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: LABOUR AGREEMENT */}
        {currentTab === 'labour-agreement' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-neutral-200">
              <div>
                <h3 className="font-bold text-neutral-900 text-sm">Labour Agreements (श्रमिक सम्झौता)</h3>
                <p className="text-xs text-neutral-500">
                  Bilateral employment contracts conforming to Nepal Labour Act 2074 & site safety regulations.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedLabour(undefined);
                  setLabourModalOpen(true);
                }}
                className="px-3.5 py-2 bg-[#FF6B00] hover:bg-[#E04800] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New Labour Agreement</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#0B0F19] text-white uppercase text-[11px] font-bold">
                  <tr>
                    <th className="px-4 py-3">Doc Ref</th>
                    <th className="px-4 py-3">Worker Name & Citizenship</th>
                    <th className="px-4 py-3">Trade / Skill</th>
                    <th className="px-4 py-3">Wage Rate</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredLabourAgreements.map((la) => (
                    <tr key={la.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-3 font-mono font-bold text-neutral-900">
                        {la.docNumber}
                      </td>
                      <td className="px-4 py-3">
                        <strong className="text-neutral-900 block">{la.workerName}</strong>
                        <span className="text-neutral-500 font-mono text-[11px]">{la.citizenshipId}</span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-neutral-800">{la.tradeSkill}</td>
                      <td className="px-4 py-3 font-mono font-bold text-neutral-900">
                        NPR {la.wageRate.toLocaleString()} / {la.wageBasis}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <DocumentStatusBadge status={la.status} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedLabour(la);
                            setLabourModalOpen(true);
                          }}
                          className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-neutral-800 font-semibold"
                        >
                          View / Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: SUBCONTRACT AGREEMENT */}
        {currentTab === 'subcontract-agreement' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-neutral-200">
              <div>
                <h3 className="font-bold text-neutral-900 text-sm">Subcontract Agreements (सहायक ठेक्का)</h3>
                <p className="text-xs text-neutral-500">
                  Formal contracts with specialized subcontractors for steel shuttering, rebar fabrication, MEP, and finishes.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedSubcontract(undefined);
                  setSubcontractModalOpen(true);
                }}
                className="px-3.5 py-2 bg-[#FF6B00] hover:bg-[#E04800] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New Subcontract</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#0B0F19] text-white uppercase text-[11px] font-bold">
                  <tr>
                    <th className="px-4 py-3">Doc Ref</th>
                    <th className="px-4 py-3">Subcontractor Firm</th>
                    <th className="px-4 py-3">Scope / BOQ Ref</th>
                    <th className="px-4 py-3 text-right">Subcontract Sum</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredSubcontracts.map((sca) => (
                    <tr key={sca.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-3 font-mono font-bold text-neutral-900">{sca.docNumber}</td>
                      <td className="px-4 py-3">
                        <strong className="text-neutral-900 block">{sca.subcontractorName}</strong>
                        <span className="text-neutral-500 font-mono text-[11px]">PAN: {sca.subcontractorPan}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-neutral-800 line-clamp-1">{sca.scopeOfWork}</span>
                        <span className="text-neutral-500 font-mono text-[11px]">{sca.boqReference}</span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-neutral-900">
                        NPR {sca.contractValue.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <DocumentStatusBadge status={sca.status} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSubcontract(sca);
                            setSubcontractModalOpen(true);
                          }}
                          className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-neutral-800 font-semibold"
                        >
                          View / Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: BOQ & QUOTATION */}
        {currentTab === 'boq-quotation' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-neutral-200">
              <div>
                <h3 className="font-bold text-neutral-900 text-sm">Bill of Quantities (BOQ) & Cost Estimates</h3>
                <p className="text-xs text-neutral-500">
                  Itemized construction estimates with integrated area calculator, statutory VAT breakdown & CSV export.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedBoq(undefined);
                  setBoqModalOpen(true);
                }}
                className="px-3.5 py-2 bg-[#FF6B00] hover:bg-[#E04800] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New BOQ & Estimate</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#0B0F19] text-white uppercase text-[11px] font-bold">
                  <tr>
                    <th className="px-4 py-3">Doc Ref</th>
                    <th className="px-4 py-3">Estimate Title</th>
                    <th className="px-4 py-3 text-center">Items Count</th>
                    <th className="px-4 py-3 text-right">Grand Total (Inc. VAT)</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredBoqs.map((boq) => (
                    <tr key={boq.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-3 font-mono font-bold text-neutral-900">{boq.docNumber}</td>
                      <td className="px-4 py-3 font-semibold text-neutral-900">{boq.title}</td>
                      <td className="px-4 py-3 text-center font-mono">{boq.items.length} items</td>
                      <td className="px-4 py-3 text-right font-mono font-extrabold text-[#FF6B00]">
                        NPR {boq.grandTotal.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <DocumentStatusBadge status={boq.status} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedBoq(boq);
                            setBoqModalOpen(true);
                          }}
                          className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-neutral-800 font-semibold"
                        >
                          Open Editor
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 7: PAYMENT SCHEDULE */}
        {currentTab === 'payment-schedule' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-neutral-200">
              <div>
                <h3 className="font-bold text-neutral-900 text-sm">Milestone Payment Schedules</h3>
                <p className="text-xs text-neutral-500">
                  Track stage progress billings, advances, retention money & reconciliation balances.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedPayment(undefined);
                  setPaymentModalOpen(true);
                }}
                className="px-3.5 py-2 bg-[#FF6B00] hover:bg-[#E04800] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New Payment Schedule</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#0B0F19] text-white uppercase text-[11px] font-bold">
                  <tr>
                    <th className="px-4 py-3">Doc Ref</th>
                    <th className="px-4 py-3 text-right">Contract Value</th>
                    <th className="px-4 py-3 text-right">Total Paid</th>
                    <th className="px-4 py-3 text-right">Balance Due</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredPaymentSchedules.map((ps) => (
                    <tr key={ps.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-3 font-mono font-bold text-neutral-900">{ps.docNumber}</td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-neutral-900">
                        NPR {ps.totalContractValue.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-emerald-700">
                        NPR {ps.totalPaid.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-amber-700">
                        NPR {ps.totalBalance.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <DocumentStatusBadge status={ps.status} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPayment(ps);
                            setPaymentModalOpen(true);
                          }}
                          className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-neutral-800 font-semibold"
                        >
                          View Schedule
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 8: VARIATION ORDER */}
        {currentTab === 'variation-order' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-neutral-200">
              <div>
                <h3 className="font-bold text-neutral-900 text-sm">Variation Orders (VO) & Scope Revisions</h3>
                <p className="text-xs text-neutral-500">
                  Record construction amendments, cost impact additions/deductions & schedule time extensions.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedVariation(undefined);
                  setVariationModalOpen(true);
                }}
                className="px-3.5 py-2 bg-[#FF6B00] hover:bg-[#E04800] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New Variation Order</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#0B0F19] text-white uppercase text-[11px] font-bold">
                  <tr>
                    <th className="px-4 py-3">VO Ref</th>
                    <th className="px-4 py-3">Description of Change</th>
                    <th className="px-4 py-3 text-right">Cost Variance</th>
                    <th className="px-4 py-3 text-center">Time Impact</th>
                    <th className="px-4 py-3 text-center">Client Approval</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredVariationOrders.map((vo) => (
                    <tr key={vo.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-3 font-mono font-bold text-neutral-900">
                        {vo.variationOrderNo} ({vo.docNumber})
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-neutral-800 line-clamp-1 font-semibold">{vo.variationDescription}</span>
                        <span className="text-neutral-500 text-[11px] line-clamp-1">{vo.reasonForVariation}</span>
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-[#FF6B00]">
                        NPR {vo.additionalOrDeductedAmount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-center font-mono">
                        +{vo.timeImpactDays} Days
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            vo.clientApprovalStatus === 'Approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {vo.clientApprovalStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedVariation(vo);
                            setVariationModalOpen(true);
                          }}
                          className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-neutral-800 font-semibold"
                        >
                          Review VO
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 9: COMPLETION CERTIFICATE */}
        {currentTab === 'completion-certificate' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-neutral-200">
              <div>
                <h3 className="font-bold text-neutral-900 text-sm">Building Completion Certificates (निर्माण सम्पन्न प्रमाण-पत्र)</h3>
                <p className="text-xs text-neutral-500">
                  Municipal building completion, occupancy certifications and dimensional as-built checks.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedCompletion(undefined);
                  setCompletionModalOpen(true);
                }}
                className="px-3.5 py-2 bg-[#FF6B00] hover:bg-[#E04800] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New Completion Certificate</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#0B0F19] text-white uppercase text-[11px] font-bold">
                  <tr>
                    <th className="px-4 py-3">Certificate No</th>
                    <th className="px-4 py-3">Permit Ref</th>
                    <th className="px-4 py-3">Owner & Site</th>
                    <th className="px-4 py-3 text-center">Discrepancy</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredCompletionCerts.map((cc) => (
                    <tr key={cc.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-3 font-mono font-bold text-neutral-900">{cc.certificateNumber}</td>
                      <td className="px-4 py-3 font-mono text-neutral-600">{cc.permitNumber}</td>
                      <td className="px-4 py-3">
                        <strong className="text-neutral-900 block">{cc.owner}</strong>
                        <span className="text-neutral-500">{cc.projectAddress}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {cc.hasDiscrepancy ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                            Flagged
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            100% Conforming
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <DocumentStatusBadge status={cc.status} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCompletion(cc);
                            setCompletionModalOpen(true);
                          }}
                          className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-neutral-800 font-semibold"
                        >
                          View Certificate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 10: HANDOVER RECORD */}
        {currentTab === 'handover-record' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-neutral-200">
              <div>
                <h3 className="font-bold text-neutral-900 text-sm">Building Handover Records & Snag Lists</h3>
                <p className="text-xs text-neutral-500">
                  Physical possession deeds, snag/punch list rectifications & warranty documentation handovers.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedHandover(undefined);
                  setHandoverModalOpen(true);
                }}
                className="px-3.5 py-2 bg-[#FF6B00] hover:bg-[#E04800] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New Handover Record</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#0B0F19] text-white uppercase text-[11px] font-bold">
                  <tr>
                    <th className="px-4 py-3">Doc Ref</th>
                    <th className="px-4 py-3">Handover Date</th>
                    <th className="px-4 py-3">Owner Representative</th>
                    <th className="px-4 py-3 text-center">Keys Transferred</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredHandoverRecords.map((ho) => (
                    <tr key={ho.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-3 font-mono font-bold text-neutral-900">{ho.docNumber}</td>
                      <td className="px-4 py-3 font-mono text-neutral-700">{ho.handoverDate}</td>
                      <td className="px-4 py-3 font-semibold text-neutral-900">{ho.ownerRep}</td>
                      <td className="px-4 py-3 text-center font-mono font-bold">{ho.keysHandedOverCount} Sets</td>
                      <td className="px-4 py-3 text-center">
                        <DocumentStatusBadge status={ho.status} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedHandover(ho);
                            setHandoverModalOpen(true);
                          }}
                          className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-neutral-800 font-semibold"
                        >
                          View Deed
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ALL MODAL DIALOGS */}
      {/* 1. Project Profile Modal */}
      <ProjectProfileModal
        isOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        projectToEdit={projectToEdit}
      />

      {/* 2. Project Location Update Snapshot Modal */}
      {selectedProject && (
        <ProjectLocationUpdateModal
          isOpen={locationUpdateModalOpen}
          onClose={() => setLocationUpdateModalOpen(false)}
          project={selectedProject}
        />
      )}

      {/* 3. Location Management Admin Modal */}
      <LocationManagementModal
        isOpen={locationManagementOpen}
        onClose={() => setLocationManagementOpen(false)}
      />

      {/* 4. Area Calculator Modal */}
      <AreaCalculatorModal
        isOpen={areaCalcOpen}
        onClose={() => setAreaCalcOpen(false)}
      />

      {/* 5. House Agreement Modal */}
      <HouseAgreementModal
        isOpen={houseAgreementModalOpen}
        onClose={() => setHouseAgreementModalOpen(false)}
        agreementToEdit={selectedHouseAgreement}
        project={selectedProject}
      />

      {/* 6. BOQ Quotation Modal */}
      <BoqQuotationModal
        isOpen={boqModalOpen}
        onClose={() => setBoqModalOpen(false)}
        quotationToEdit={selectedBoq}
        project={selectedProject}
      />

      {/* 7. Labour Agreement Modal */}
      <LabourAgreementModal
        isOpen={labourModalOpen}
        onClose={() => setLabourModalOpen(false)}
        agreementToEdit={selectedLabour}
        project={selectedProject}
      />

      {/* 8. Subcontract Agreement Modal */}
      <SubcontractAgreementModal
        isOpen={subcontractModalOpen}
        onClose={() => setSubcontractModalOpen(false)}
        agreementToEdit={selectedSubcontract}
        project={selectedProject}
      />

      {/* 9. Building Permit Modal */}
      <BuildingPermitModal
        isOpen={permitModalOpen}
        onClose={() => setPermitModalOpen(false)}
        permitToEdit={selectedPermit}
        project={selectedProject}
      />

      {/* 10. Payment Schedule Modal */}
      <PaymentScheduleModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        scheduleToEdit={selectedPayment}
        project={selectedProject}
      />

      {/* 11. Variation Order Modal */}
      <VariationOrderModal
        isOpen={variationModalOpen}
        onClose={() => setVariationModalOpen(false)}
        variationToEdit={selectedVariation}
        project={selectedProject}
      />

      {/* 12. Completion Certificate Modal */}
      <CompletionCertificateModal
        isOpen={completionModalOpen}
        onClose={() => setCompletionModalOpen(false)}
        certificateToEdit={selectedCompletion}
        project={selectedProject}
      />

      {/* 13. Handover Record Modal */}
      <HandoverRecordModal
        isOpen={handoverModalOpen}
        onClose={() => setHandoverModalOpen(false)}
        recordToEdit={selectedHandover}
        project={selectedProject}
      />

      {/* 14. Building Standards Modal */}
      <BuildingStandardsModal
        isOpen={standardsModalOpen}
        onClose={() => setStandardsModalOpen(false)}
      />

      {/* 15. Audit Log Modal */}
      <AuditLogModal
        isOpen={auditLogModalOpen}
        onClose={() => setAuditLogModalOpen(false)}
      />
    </div>
  );
};
