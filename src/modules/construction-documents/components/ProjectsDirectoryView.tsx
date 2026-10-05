import React from 'react';
import { ProjectProfile } from '../types';
import {
  FolderKanban,
  Plus,
  MapPin,
  Building,
  Calendar,
  ShieldCheck,
  Edit,
  Phone,
  Layers,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface ProjectsDirectoryViewProps {
  projects: ProjectProfile[];
  selectedProjectId: string;
  onSelectProject: (id: string) => void;
  onEditProject: (project: ProjectProfile) => void;
  onNewProject: () => void;
  onUpdateLocation: (project: ProjectProfile) => void;
}

export const ProjectsDirectoryView: React.FC<ProjectsDirectoryViewProps> = ({
  projects,
  selectedProjectId,
  onSelectProject,
  onEditProject,
  onNewProject,
  onUpdateLocation,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-neutral-900 text-base">Central Project Profiles Directory</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/20">
              {projects.length} Active Records
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl">
            Single-source central project profile. Stores client, land coordinates, plot kitta, and building metrics once and automatically supplies them to all agreements, BOQs, payments, and municipal permits.
          </p>
        </div>

        <button
          type="button"
          onClick={onNewProject}
          className="px-4 py-2.5 bg-[#FF6B00] hover:bg-[#E04800] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Project Profile</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {projects.map((proj) => {
          const isSelected = selectedProjectId === proj.id;
          return (
            <div
              key={proj.id}
              className={`bg-white rounded-2xl p-5 border transition-all ${
                isSelected
                  ? 'border-[#FF6B00] shadow-md ring-2 ring-[#FF6B00]/20'
                  : 'border-neutral-200 hover:border-neutral-300 shadow-xs'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-neutral-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-neutral-900">{proj.projectName}</h4>
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-neutral-100 text-neutral-700">
                      {proj.projectCode}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500 mt-1 flex items-center gap-2">
                    <span>Client / Owner: <strong className="text-neutral-800">{proj.clientOwner}</strong></span>
                    <span>·</span>
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Phone className="w-3 h-3 text-neutral-400" />
                      {proj.clientContact}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${
                    proj.projectStatus === 'Completed'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-blue-100 text-blue-800 border border-blue-200'
                  }`}
                >
                  {proj.projectStatus}
                </span>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 py-3 text-xs">
                <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                  <span className="text-neutral-400 block text-[10px] font-mono uppercase font-bold">
                    Location Snapshot (Protected)
                  </span>
                  <div className="font-semibold text-neutral-800 mt-0.5">
                    {proj.location.localLevelName}-{proj.location.wardNo}, {proj.location.districtName}
                  </div>
                  <div className="text-[11px] text-neutral-500 truncate">{proj.location.streetTole}</div>
                </div>

                <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                  <span className="text-neutral-400 block text-[10px] font-mono uppercase font-bold">
                    Land & Plot Specification
                  </span>
                  <div className="font-semibold text-neutral-800 mt-0.5">
                    Kitta: <strong>{proj.land.kittaNo}</strong> ({proj.land.plotArea})
                  </div>
                  <div className="text-[11px] text-neutral-500 truncate">
                    Lalpurja: {proj.land.lalpurjaNo} · Road: {proj.land.roadWidth}
                  </div>
                </div>

                <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                  <span className="text-neutral-400 block text-[10px] font-mono uppercase font-bold">
                    Building Architecture & FAR
                  </span>
                  <div className="font-semibold text-neutral-800 mt-0.5">
                    {proj.building.buildingType} · {proj.building.numberOfFloors}
                  </div>
                  <div className="text-[11px] text-neutral-500 truncate">
                    Built-up: {proj.building.totalBuiltUpArea} · FAR: {proj.building.far}
                  </div>
                </div>

                <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
                  <span className="text-neutral-400 block text-[10px] font-mono uppercase font-bold">
                    Execution Schedule
                  </span>
                  <div className="font-semibold text-neutral-800 mt-0.5">
                    Start: {proj.startDate}
                  </div>
                  <div className="text-[11px] text-neutral-500 truncate">
                    Target: {proj.expectedCompletionDate}
                  </div>
                </div>
              </div>

              {/* Card Footer & Actions */}
              <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Province {proj.location.provinceId} Location Protected</span>
                </div>

                <div className="flex items-center gap-2">
                  {!isSelected ? (
                    <button
                      type="button"
                      onClick={() => onSelectProject(proj.id)}
                      className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      Select Active
                    </button>
                  ) : (
                    <span className="px-2.5 py-1 bg-[#FF6B00]/10 text-[#FF6B00] rounded-lg text-xs font-bold font-mono flex items-center gap-1 border border-[#FF6B00]/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Current Active</span>
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => onUpdateLocation(proj)}
                    className="px-2.5 py-1.5 bg-neutral-100 hover:bg-orange-50 text-neutral-700 hover:text-[#FF6B00] rounded-lg text-xs font-semibold transition-colors border border-neutral-200 cursor-pointer"
                    title="Explicitly update location snapshot without altering older documents"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onEditProject(proj)}
                    className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
