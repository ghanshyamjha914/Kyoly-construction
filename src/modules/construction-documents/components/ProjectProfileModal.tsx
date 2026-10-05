import React, { useState } from 'react';
import { ProjectProfile } from '../types';
import { useConstructionDocuments } from '../context/ConstructionDocumentsContext';
import { NepalLocationSelector } from './NepalLocationSelector';
import { X, Save, Building2, MapPin, Layers, FileText, CheckCircle2 } from 'lucide-react';

interface ProjectProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectToEdit?: ProjectProfile;
}

export const ProjectProfileModal: React.FC<ProjectProfileModalProps> = ({
  isOpen,
  onClose,
  projectToEdit,
}) => {
  const { saveProject, getNextProjectCode, masterProvinces, masterDistricts, masterLocalLevels } =
    useConstructionDocuments();

  // Initial state builder
  const buildInitialForm = (): ProjectProfile => {
    if (projectToEdit) return JSON.parse(JSON.stringify(projectToEdit));

    const defaultProv = masterProvinces[2] || masterProvinces[0]; // Bagmati default
    const defaultDist = masterDistricts.find((d) => d.name === 'Kathmandu') || masterDistricts[0];
    const defaultLocalLevel = masterLocalLevels.find((l) => l.name.includes('Kathmandu')) || masterLocalLevels[0];

    return {
      id: `proj-${Date.now()}`,
      projectCode: getNextProjectCode(),
      projectName: '',
      projectType: 'Residential Building',
      clientOwner: '',
      clientCitizenshipNo: '',
      clientContact: '',
      clientEmail: '',
      contractor: 'Kyoly Construction Pvt. Ltd.',
      contractorRegNo: '343834/080/081',
      contractorPan: '620155829',
      contractorRep: 'Er. Sujan Karki',
      contractDate: new Date().toISOString().split('T')[0],
      startDate: new Date().toISOString().split('T')[0],
      expectedCompletionDate: '',
      actualCompletionDate: '',
      projectStatus: 'Planning & Design',

      location: {
        provinceId: defaultProv.id,
        provinceName: defaultProv.name,
        provinceNameNepali: defaultProv.nameNepali,
        districtId: defaultDist.id,
        districtName: defaultDist.name,
        districtNameNepali: defaultDist.nameNepali,
        localLevelId: defaultLocalLevel.id,
        localLevelName: defaultLocalLevel.name,
        localLevelNameNepali: defaultLocalLevel.nameNepali,
        localLevelType: defaultLocalLevel.type,
        wardNo: 1,
        streetTole: '',
        houseBuildingNo: '',
        landmark: '',
        snapshotTimestamp: new Date().toISOString(),
      },

      land: {
        kittaNo: '',
        sheetNo: '',
        plotArea: '',
        lalpurjaNo: '',
        roadWidth: '',
        landUse: 'Residential Urban',
        surveyNapiRef: '',
      },

      building: {
        buildingType: 'RCC Moment Resisting Frame',
        proposedUse: 'Residential Dwelling',
        numberOfFloors: '3 Storeys',
        basement: 'None',
        plinthArea: '',
        totalBuiltUpArea: '',
        buildingHeight: '',
        groundCoverage: '',
        far: '',
        parkingSpaces: '1 Car + 2 Two-Wheelers',
      },

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  };

  const [form, setForm] = useState<ProjectProfile>(buildInitialForm);
  const [activeTab, setActiveTab] = useState<'info' | 'location' | 'land' | 'building'>('info');

  React.useEffect(() => {
    if (isOpen) {
      setForm(buildInitialForm());
      setActiveTab('info');
    }
  }, [isOpen, projectToEdit]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.projectName.trim()) {
      alert('Please enter a Project Name.');
      return;
    }
    if (!form.clientOwner.trim()) {
      alert('Please enter Client / Owner Name.');
      return;
    }

    saveProject(form);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col border border-neutral-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0F172A] text-white p-5 sm:p-6 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center border border-[#FF6B00]/30">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF6B00]">
                Central Project Profile
              </div>
              <h3 className="text-xl font-black font-['Outfit'] text-white">
                {projectToEdit ? `Edit Profile: ${projectToEdit.projectCode}` : 'Create New Project Profile'}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-neutral-200 px-6 pt-3 bg-neutral-50/80 gap-2 overflow-x-auto text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'info'
                ? 'border-[#FF6B00] text-[#FF6B00] font-extrabold'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>1. Project Information</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('location')}
            className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'location'
                ? 'border-[#FF6B00] text-[#FF6B00] font-extrabold'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>2. Location Snapshot</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('land')}
            className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'land'
                ? 'border-[#FF6B00] text-[#FF6B00] font-extrabold'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3. Land & Plot</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('building')}
            className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'building'
                ? 'border-[#FF6B00] text-[#FF6B00] font-extrabold'
                : 'border-transparent text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>4. Building Specs</span>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-1 text-xs">
          {/* TAB 1: PROJECT INFORMATION */}
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.projectName}
                    onChange={(e) => setForm({ ...form, projectName: e.target.value })}
                    placeholder="e.g. Shrestha Modern Residential Residence (B+3 RCC)"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Project Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.projectCode}
                    onChange={(e) => setForm({ ...form, projectCode: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs font-mono font-bold bg-neutral-50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Project Type *
                  </label>
                  <select
                    value={form.projectType}
                    onChange={(e) => setForm({ ...form, projectType: e.target.value as any })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white font-medium cursor-pointer"
                  >
                    <option value="Residential Building">Residential Building</option>
                    <option value="Commercial Complex">Commercial Complex</option>
                    <option value="Transmission Line & Grid">Transmission Line & Grid</option>
                    <option value="Substation Project">Substation Project</option>
                    <option value="Civil & Infrastructure">Civil & Infrastructure</option>
                    <option value="Industrial & Warehouse">Industrial & Warehouse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Client / Owner Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.clientOwner}
                    onChange={(e) => setForm({ ...form, clientOwner: e.target.value })}
                    placeholder="e.g. Er. Rajesh Shrestha"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Client Citizenship / Reg No.
                  </label>
                  <input
                    type="text"
                    value={form.clientCitizenshipNo || ''}
                    onChange={(e) => setForm({ ...form, clientCitizenshipNo: e.target.value })}
                    placeholder="e.g. 27-01-72-04519"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Client Contact Phone *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.clientContact}
                    onChange={(e) => setForm({ ...form, clientContact: e.target.value })}
                    placeholder="+977-9851023456"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Client Email Address
                  </label>
                  <input
                    type="email"
                    value={form.clientEmail}
                    onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
                    placeholder="client@example.com"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Contractor Entity
                  </label>
                  <input
                    type="text"
                    value={form.contractor}
                    onChange={(e) => setForm({ ...form, contractor: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs font-semibold bg-neutral-50"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Contractor Representative
                  </label>
                  <input
                    type="text"
                    value={form.contractorRep}
                    onChange={(e) => setForm({ ...form, contractorRep: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Contract Date
                  </label>
                  <input
                    type="date"
                    value={form.contractDate}
                    onChange={(e) => setForm({ ...form, contractDate: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Project Start Date
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Expected Completion Date
                  </label>
                  <input
                    type="date"
                    value={form.expectedCompletionDate}
                    onChange={(e) => setForm({ ...form, expectedCompletionDate: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Project Status *
                  </label>
                  <select
                    value={form.projectStatus}
                    onChange={(e) => setForm({ ...form, projectStatus: e.target.value as any })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs font-bold bg-white cursor-pointer"
                  >
                    <option value="Planning & Design">Planning & Design</option>
                    <option value="Permit Processing">Permit Processing</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="Finishing Works">Finishing Works</option>
                    <option value="Completed">Completed</option>
                    <option value="Handed Over">Handed Over</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LOCATION SNAPSHOT (HISTORICAL INTEGRITY) */}
          {activeTab === 'location' && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-xs">
                <strong>Historical Location Protection:</strong> The location configured here is stored as a project
                snapshot and automatically supplied to all contracts, permits, and certificates.
              </div>

              <NepalLocationSelector
                value={form.location}
                onChange={(updatedLoc) => setForm({ ...form, location: updatedLoc })}
              />
            </div>
          )}

          {/* TAB 3: LAND / PLOT DETAILS */}
          {activeTab === 'land' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Kitta Number (कि.नं.) *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.land.kittaNo}
                    onChange={(e) => setForm({ ...form, land: { ...form.land, kittaNo: e.target.value } })}
                    placeholder="e.g. 482 / 1205"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Map Sheet No. (सिट नं.)
                  </label>
                  <input
                    type="text"
                    value={form.land.sheetNo}
                    onChange={(e) => setForm({ ...form, land: { ...form.land, sheetNo: e.target.value } })}
                    placeholder="e.g. 102-1422-04"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Plot Area (क्षेत्रफल) *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.land.plotArea}
                    onChange={(e) => setForm({ ...form, land: { ...form.land, plotArea: e.target.value } })}
                    placeholder="e.g. 0-5-2-1 (175.25 sq.m / 1,886 sq.ft)"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Lalpurja Certificate No.
                  </label>
                  <input
                    type="text"
                    value={form.land.lalpurjaNo}
                    onChange={(e) => setForm({ ...form, land: { ...form.land, lalpurjaNo: e.target.value } })}
                    placeholder="e.g. LP-KTM-2080-9941"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Road Width (बाटोको चौडाइ)
                  </label>
                  <input
                    type="text"
                    value={form.land.roadWidth}
                    onChange={(e) => setForm({ ...form, land: { ...form.land, roadWidth: e.target.value } })}
                    placeholder="e.g. 6.0 m (20 ft Pitch Road)"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Land Use Zone
                  </label>
                  <input
                    type="text"
                    value={form.land.landUse}
                    onChange={(e) => setForm({ ...form, land: { ...form.land, landUse: e.target.value } })}
                    placeholder="e.g. Residential Urban / Commercial Mixed"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Survey / Napi Cadastral Reference
                  </label>
                  <input
                    type="text"
                    value={form.land.surveyNapiRef}
                    onChange={(e) => setForm({ ...form, land: { ...form.land, surveyNapiRef: e.target.value } })}
                    placeholder="e.g. Napi Shakha Dilibazar Survey 2080/04"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BUILDING SPECIFICATIONS */}
          {activeTab === 'building' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Building Structural Type
                  </label>
                  <input
                    type="text"
                    value={form.building.buildingType}
                    onChange={(e) => setForm({ ...form, building: { ...form.building, buildingType: e.target.value } })}
                    placeholder="e.g. RCC Moment Resisting Frame"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Proposed Use
                  </label>
                  <input
                    type="text"
                    value={form.building.proposedUse}
                    onChange={(e) => setForm({ ...form, building: { ...form.building, proposedUse: e.target.value } })}
                    placeholder="e.g. Private Residential / Commercial"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Number of Floors (तला संख्या) *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.building.numberOfFloors}
                    onChange={(e) => setForm({ ...form, building: { ...form.building, numberOfFloors: e.target.value } })}
                    placeholder="e.g. 3.5 Storeys"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Plinth Area
                  </label>
                  <input
                    type="text"
                    value={form.building.plinthArea}
                    onChange={(e) => setForm({ ...form, building: { ...form.building, plinthArea: e.target.value } })}
                    placeholder="e.g. 1,120 sq.ft (104.05 sq.m)"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs font-mono font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Total Built-up Area *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.building.totalBuiltUpArea}
                    onChange={(e) => setForm({ ...form, building: { ...form.building, totalBuiltUpArea: e.target.value } })}
                    placeholder="e.g. 3,850 sq.ft (357.67 sq.m)"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Building Height (उचाइ)
                  </label>
                  <input
                    type="text"
                    value={form.building.buildingHeight}
                    onChange={(e) => setForm({ ...form, building: { ...form.building, buildingHeight: e.target.value } })}
                    placeholder="e.g. 12.80 meters"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Ground Coverage (GC %)
                  </label>
                  <input
                    type="text"
                    value={form.building.groundCoverage}
                    onChange={(e) => setForm({ ...form, building: { ...form.building, groundCoverage: e.target.value } })}
                    placeholder="e.g. 59.3%"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Floor Area Ratio (FAR)
                  </label>
                  <input
                    type="text"
                    value={form.building.far}
                    onChange={(e) => setForm({ ...form, building: { ...form.building, far: e.target.value } })}
                    placeholder="e.g. 2.04"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
                    Parking Spaces
                  </label>
                  <input
                    type="text"
                    value={form.building.parkingSpaces}
                    onChange={(e) => setForm({ ...form, building: { ...form.building, parkingSpaces: e.target.value } })}
                    placeholder="e.g. 2 Cars + 4 Motorcycles"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer Controls */}
          <div className="pt-4 border-t border-neutral-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-7 py-2.5 bg-[#FF6B00] hover:bg-[#E04800] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{projectToEdit ? 'Save Project Changes' : 'Create Central Project Profile'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
