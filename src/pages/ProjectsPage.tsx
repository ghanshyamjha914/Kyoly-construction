import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PROJECTS_DATA, ProjectItem } from '../data/projectsData';
import { SectionHeading } from '../components/SectionHeading';
import { EngineeringVisual } from '../components/EngineeringVisual';
import {
  MapPin,
  Calendar,
  Building,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  X,
  FileText,
  Clock,
  Sparkles,
  Camera,
  Upload,
  Plus,
  ImageIcon,
  Trash2,
} from 'lucide-react';
import { getWhatsAppUrl, siteConfig } from '../config/siteConfig';

interface ProjectsPageProps {
  onOpenQuote: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onOpenQuote }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [activeTab, setActiveTab] = useState<'All' | 'Ongoing' | 'Completed'>(
    initialCategory === 'Ongoing' ? 'Ongoing' : initialCategory === 'Completed' ? 'Completed' : 'All'
  );
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [userProjectPhotos, setUserProjectPhotos] = useState<Record<string, { title: string; caption?: string; url: string }[]>>(() => {
    try {
      const saved = localStorage.getItem('kyoly_user_project_photos');
      const parsed = saved ? JSON.parse(saved) : {};
      const chapurSaved = localStorage.getItem('kyoly_chapur_photos');
      if (chapurSaved) {
        const chapurList = JSON.parse(chapurSaved);
        if (Array.isArray(chapurList) && chapurList.length > 0) {
          parsed['project-5'] = chapurList;
          parsed['project-7'] = chapurList;
        }
      }
      return parsed;
    } catch {
      return {};
    }
  });

  const handlePhotoUpload = (projectId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const photoUrl = event.target.result as string;
          const cleanName = file.name.replace(/\.[^/.]+$/, '');
          const isChapur = projectId === 'project-5' || projectId === 'project-7';
          const newPhoto = {
            title: isChapur ? (cleanName.toLowerCase().includes('chapur') ? cleanName : `${cleanName} - Chapur Substation`) : cleanName,
            caption: isChapur ? 'Verified Chapur Substation actual site photograph' : `Verified site record uploaded for ${projectId}`,
            url: photoUrl,
          };

          setUserProjectPhotos((prev) => {
            const updated = {
              ...prev,
              [projectId]: [...(prev[projectId] || []), newPhoto],
              ...(isChapur
                ? {
                    'project-5': [...(prev['project-5'] || []), newPhoto],
                    'project-7': [...(prev['project-7'] || []), newPhoto],
                  }
                : {}),
            };
            try {
              localStorage.setItem('kyoly_user_project_photos', JSON.stringify(updated));
              if (isChapur) {
                localStorage.setItem('kyoly_chapur_photos', JSON.stringify(updated['project-7'] || []));
              }
            } catch {
              // ignore quota
            }
            return updated;
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemovePhoto = (projectId: string, photoIndex: number) => {
    setUserProjectPhotos((prev) => {
      const isChapur = projectId === 'project-5' || projectId === 'project-7';
      const curList = [...(prev[projectId] || [])];
      curList.splice(photoIndex, 1);
      const updated = {
        ...prev,
        [projectId]: curList,
        ...(isChapur
          ? {
              'project-5': curList,
              'project-7': curList,
            }
          : {}),
      };
      try {
        localStorage.setItem('kyoly_user_project_photos', JSON.stringify(updated));
        if (isChapur) {
          localStorage.setItem('kyoly_chapur_photos', JSON.stringify(curList));
        }
      } catch {
        // ignore
      }
      return updated;
    });
    setActivePhotoIndex(0);
  };

  const handleRemoveAllPhotos = (projectId: string) => {
    setUserProjectPhotos((prev) => {
      const isChapur = projectId === 'project-5' || projectId === 'project-7';
      const updated = { ...prev };
      delete updated[projectId];
      if (isChapur) {
        delete updated['project-5'];
        delete updated['project-7'];
      }
      try {
        localStorage.setItem('kyoly_user_project_photos', JSON.stringify(updated));
        if (isChapur) {
          localStorage.removeItem('kyoly_chapur_photos');
        }
      } catch {
        // ignore
      }
      return updated;
    });
    setActivePhotoIndex(0);
  };

  // Sync state with URL parameter if it changes
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam === 'Ongoing') {
      setActiveTab('Ongoing');
    } else if (categoryParam === 'Completed') {
      setActiveTab('Completed');
    }
  }, [searchParams]);

  const handleTabChange = (tab: 'All' | 'Ongoing' | 'Completed') => {
    setActiveTab(tab);
    if (tab === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: tab });
    }
  };

  const completedProjects = PROJECTS_DATA.filter((project) => project.category === 'Completed');
  const ongoingProjects = PROJECTS_DATA.filter((project) => project.category === 'Ongoing');

  const renderProjectCard = (project: ProjectItem) => {
    const customPhotos = userProjectPhotos[project.id] || [];
    const projectPhotos = [
      ...(project.galleryPhotos || []),
      ...customPhotos,
    ];
    const displayImage = projectPhotos.length > 0 ? projectPhotos[0].url : project.imageUrl;
    const hasCustomPhotos = customPhotos.length > 0;

    return (
      <div
        key={project.id}
        className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
      >
        {/* Project Image or Direct Upload Option */}
        <div className="h-52 w-full relative bg-[#0F172A] overflow-hidden">
          {displayImage ? (
            <>
              <img
                src={displayImage}
                alt={project.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Upload / Replace Photo & Remove on ALL Completed Projects */}
              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 z-10">
                <label
                  onClick={(e) => e.stopPropagation()}
                  className="px-2.5 py-1 bg-black/85 hover:bg-[#FF6B00] text-white rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors border border-white/20 shadow-xs"
                >
                  <Upload className="w-3 h-3 text-[#D6A548]" />
                  <span>Upload / Replace Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handlePhotoUpload(project.id, e)}
                  />
                </label>

                {hasCustomPhotos && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveAllPhotos(project.id);
                    }}
                    className="px-2 py-1 bg-red-950/85 hover:bg-red-600 text-white rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors border border-red-500/40 shadow-xs"
                    title="Remove custom photo and reset"
                  >
                    <Trash2 className="w-3 h-3 text-red-300" />
                    <span>Remove</span>
                  </button>
                )}
              </div>
            </>
          ) : (
            <label
              onClick={(e) => e.stopPropagation()}
              className="w-full h-full flex flex-col items-center justify-center p-4 text-center cursor-pointer bg-gradient-to-b from-[#0F172A] to-[#1E293B] hover:from-[#1E293B] hover:to-[#0F172A] border-2 border-dashed border-[#FF6B00]/70 transition-all group-hover:border-[#FF6B00]"
            >
              <div className="w-12 h-12 rounded-full bg-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] mb-2 group-hover:scale-110 transition-transform shadow-inner">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-white tracking-wide">
                Direct Upload Site Photo
              </span>
              <span className="text-[10px] text-slate-300 mt-1 max-w-[210px] leading-tight truncate px-2">
                {project.name}
              </span>
              <span className="mt-2.5 px-3 py-1 bg-[#FF6B00] hover:bg-[#e04800] text-white text-[10px] font-bold rounded uppercase tracking-wider transition-colors shadow">
                Browse & Upload
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handlePhotoUpload(project.id, e)}
              />
            </label>
          )}

          <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-[#FF6B00] text-white rounded text-[10px] font-bold uppercase tracking-wider shadow-sm z-10 pointer-events-none">
            {project.scopeCategory}
          </div>

          {/* Photo Count Indicator */}
          {projectPhotos.length > 0 && (
            <div className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-black/75 backdrop-blur-xs text-white rounded text-[10px] font-bold flex items-center gap-1.5 shadow-sm border border-white/20 z-10 pointer-events-none">
              <Camera className="w-3 h-3 text-[#D6A548]" />
              <span>{projectPhotos.length} Site Photos</span>
            </div>
          )}

          {/* Category / Status Badge */}
          {displayImage && (
            <div className="absolute bottom-2.5 right-2.5 z-10 pointer-events-none">
              <span className="px-2.5 py-1 rounded bg-emerald-600 text-white text-[10px] font-mono font-bold tracking-wider backdrop-blur-xs shadow-xs">
                COMPLETED
              </span>
            </div>
          )}
        </div>

        {/* Project Information */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
              <span className="truncate">{project.location}</span>
            </div>

            {/* Project Name (Cleanly truncated for uniformity, full name in modal) */}
            <h3
              className="text-base font-bold font-['Outfit'] text-[#0F172A] group-hover:text-[#FF6B00] transition-colors mb-2 leading-snug line-clamp-2"
              title={project.name}
            >
              {project.name}
            </h3>

            {/* Contract Identification (if present) */}
            {project.contractId && (
              <div className="mb-2.5 inline-block px-2 py-0.5 rounded bg-slate-100 border border-neutral-200 text-[10px] font-mono text-slate-700 font-semibold">
                Contract: {project.contractId}
              </div>
            )}

            {/* Client */}
            <div className="text-xs text-slate-600 mb-3.5 leading-snug">
              <span className="text-slate-400 font-medium">Client: </span>
              <strong className="text-slate-800">{project.client}</strong>
            </div>

            {/* Major Work Completed as Bullet Points */}
            <div className="mb-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                <span>Major Work Completed:</span>
              </div>
              <ul className="space-y-1 text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-neutral-200">
                {project.majorWorks.slice(0, 3).map((work, wIdx) => (
                  <li key={wIdx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] shrink-0 mt-1.5" />
                    <span className="leading-snug">{work}</span>
                  </li>
                ))}
                {project.majorWorks.length > 3 && (
                  <li className="text-[11px] font-semibold text-[#FF6B00] pt-1">
                    + {project.majorWorks.length - 3} more completed items
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Card Action: View Details */}
          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
            <button
              onClick={() => {
                setActiveProject(project);
                setActivePhotoIndex(0);
              }}
              className="text-xs font-bold text-[#FF6B00] hover:text-[#E04800] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <span className="text-[10px] font-mono text-slate-400 font-medium">
              {project.status}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderOngoingPlaceholder = () => (
    <div className="text-center py-16 px-6 sm:px-12 bg-[#F8FAFC] border-2 border-dashed border-neutral-200 rounded-2xl max-w-3xl mx-auto my-6 space-y-5">
      <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center mx-auto text-[#FF6B00] shadow-xs">
        <Clock className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <div className="inline-block px-3 py-1 rounded bg-[#FF6B00]/10 text-[#FF6B00] font-mono text-xs font-bold uppercase tracking-wider">
          Section in Preparation
        </div>
        <h3 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-[#0F172A]">
          Upcoming Project Updates
        </h3>
        <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
          Our ongoing project portfolio will be updated soon. Please check back for the latest project information.
        </p>
      </div>
      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => handleTabChange('Completed')}
          className="px-5 py-2.5 bg-[#FF6B00] hover:bg-[#E04800] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-xs"
        >
          View Completed Projects (10)
        </button>
        <button
          onClick={onOpenQuote}
          className="px-5 py-2.5 bg-white hover:bg-neutral-100 text-[#0F172A] border border-neutral-300 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
        >
          Tender / Contract Inquiries
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-[#0F172A] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b-4 border-[#FF6B00] relative overflow-hidden">
        <div className="absolute inset-0 engineering-grid-dark opacity-60" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FF6B00]/15 border border-[#FF6B00]/30 text-xs font-mono text-[#FF6B00] uppercase tracking-wider">
              <span>PROJECT EXECUTION RECORD · NEPAL</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-['Outfit'] tracking-tight text-white">
              Our Projects
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              Explore our track record across Ongoing and Completed civil, structural, substation, and high-voltage transmission contracts throughout Nepal.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Two Main Categories Tab Switcher: Ongoing Projects & Completed Projects */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-neutral-200 pb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Displaying:</span>
              <span className="text-xs font-bold text-[#0F172A] bg-slate-100 px-2.5 py-1 rounded">
                {activeTab === 'All'
                  ? `All Projects (${completedProjects.length})`
                  : activeTab === 'Completed'
                  ? `Completed Projects (${completedProjects.length})`
                  : `Ongoing Projects (${ongoingProjects.length})`}
              </span>
            </div>

            {/* Segmented Tab Controls */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-neutral-200">
              <button
                onClick={() => handleTabChange('All')}
                className={`px-4 py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  activeTab === 'All'
                    ? 'bg-white text-[#0F172A] shadow-sm'
                    : 'text-slate-600 hover:text-[#0F172A]'
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => handleTabChange('Completed')}
                className={`px-4 py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  activeTab === 'Completed'
                    ? 'bg-white text-emerald-700 shadow-sm font-extrabold'
                    : 'text-slate-600 hover:text-[#0F172A]'
                }`}
              >
                Completed Projects ({completedProjects.length})
              </button>
              <button
                onClick={() => handleTabChange('Ongoing')}
                className={`px-4 py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  activeTab === 'Ongoing'
                    ? 'bg-white text-[#FF6B00] shadow-sm font-extrabold'
                    : 'text-slate-600 hover:text-[#0F172A]'
                }`}
              >
                Ongoing Projects
              </button>
            </div>
          </div>

          {/* Official Projects Notice */}
          <div className="mb-8 p-3.5 bg-orange-50/70 border border-orange-200/80 rounded-xl flex items-center justify-between text-xs text-slate-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0" />
              <span>
                <strong>Project Execution Track Record:</strong> Official contracts delivered and underway across Nepal for NEA, CAAN, PMD, and corporate industrial clients.
              </span>
            </div>
            <span className="hidden sm:inline font-mono text-[11px] text-[#FF6B00] font-bold">
              Govt. Licensed Contractor
            </span>
          </div>

          {/* TAB 1: ONGOING PROJECTS VIEW */}
          {activeTab === 'Ongoing' && (
            <div className="space-y-6">
              <div className="border-b border-neutral-200 pb-3">
                <h2 className="text-xl font-bold font-['Outfit'] text-[#0F172A]">
                  Ongoing Projects
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Current infrastructure execution contracts and active technical works
                </p>
              </div>

              {ongoingProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {ongoingProjects.map((project) => renderProjectCard(project))}
                </div>
              ) : (
                renderOngoingPlaceholder()
              )}
            </div>
          )}

          {/* TAB 2: COMPLETED PROJECTS VIEW */}
          {activeTab === 'Completed' && (
            <div className="space-y-6">
              <div className="border-b border-neutral-200 pb-3">
                <h2 className="text-xl font-bold font-['Outfit'] text-[#0F172A]">
                  Completed Projects ({completedProjects.length})
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verified civil, electrical, substation, and transmission line contracts completed by Kyoly Construction
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {completedProjects.map((project) => renderProjectCard(project))}
              </div>
            </div>
          )}

          {/* TAB 3: ALL PROJECTS VIEW (SHOWS COMPLETED + SEPARATE ONGOING SECTION) */}
          {activeTab === 'All' && (
            <div className="space-y-16">
              {/* Completed Projects Subsection */}
              <div className="space-y-6">
                <div className="border-b border-neutral-200 pb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold font-['Outfit'] text-[#0F172A]">
                      Completed Projects ({completedProjects.length})
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Successfully delivered engineering, structural, and power substation contracts
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold font-mono">
                    10 Verified Records
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {completedProjects.map((project) => renderProjectCard(project))}
                </div>
              </div>

              {/* Ongoing Projects Subsection */}
              <div className="space-y-6 pt-6 border-t border-neutral-200">
                <div className="border-b border-neutral-200 pb-3">
                  <h2 className="text-xl font-bold font-['Outfit'] text-[#0F172A]">
                    Ongoing Projects
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Active infrastructure contracts across Nepal
                  </p>
                </div>

                {ongoingProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ongoingProjects.map((project) => renderProjectCard(project))}
                  </div>
                ) : (
                  renderOngoingPlaceholder()
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Project Details Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-[#0F172A] text-white p-6 flex items-center justify-between border-b-2 border-[#FF6B00]">
              <div className="pr-4">
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#FF6B00] uppercase tracking-wider mb-1">
                  <span>{activeProject.category} Project</span>
                  <span>·</span>
                  <span>{activeProject.scopeCategory}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-['Outfit'] text-white leading-snug">
                  {activeProject.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {/* Photo Showcase & Verified Site Documentation */}
              {(() => {
                const allPhotos = [
                  ...(activeProject.galleryPhotos || []),
                  ...(userProjectPhotos[activeProject.id] || []),
                ];
                if (allPhotos.length === 0) {
                  if (activeProject.imageUrl) {
                    return (
                      <div className="h-56 w-full rounded-lg overflow-hidden border border-neutral-200 relative bg-slate-900 group">
                        <img
                          src={activeProject.imageUrl}
                          alt={activeProject.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                        <span className="absolute bottom-3 left-3 px-3 py-1 bg-[#FF6B00] text-white text-xs font-bold rounded shadow-xs z-10">
                          {activeProject.scopeCategory}
                        </span>
                        <label className="absolute top-3 right-3 px-3 py-1.5 bg-black/85 hover:bg-[#FF6B00] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-white/20 shadow-md z-10">
                          <Upload className="w-3.5 h-3.5 text-[#D6A548]" />
                          <span>Upload / Replace Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => handlePhotoUpload(activeProject.id, e)}
                          />
                        </label>
                        {activeProject.contractId && (
                          <span className="absolute bottom-3 right-3 px-3 py-1 bg-black/80 text-white font-mono text-xs rounded border border-white/20 z-10">
                            {activeProject.contractId}
                          </span>
                        )}
                      </div>
                    );
                  }

                  return (
                    <label className="w-full min-h-[220px] rounded-xl border-2 border-dashed border-[#FF6B00] bg-slate-900/90 hover:bg-slate-900 transition-colors p-8 flex flex-col items-center justify-center text-center cursor-pointer group shadow-inner">
                      <div className="w-14 h-14 rounded-full bg-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] mb-3 group-hover:scale-110 transition-transform">
                        <Upload className="w-7 h-7" />
                      </div>
                      <h4 className="text-base font-bold text-white font-['Outfit']">
                        Direct Upload Site Photo
                      </h4>
                      <p className="text-xs text-slate-300 max-w-md mt-1 leading-relaxed">
                        Click here to select and upload actual site photographs directly from your computer.
                      </p>
                      <span className="mt-4 px-4 py-2 bg-[#FF6B00] hover:bg-[#e04800] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Select & Upload Photo</span>
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handlePhotoUpload(activeProject.id, e)}
                      />
                    </label>
                  );
                }

                const currentPhoto = allPhotos[activePhotoIndex] || allPhotos[0];

                return (
                  <div className="space-y-3">
                    {/* Header bar with photo count and upload button */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-orange-100 text-[#FF6B00] text-xs font-bold font-mono">
                          Site Photos ({allPhotos.length})
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          Verified Project Execution Records
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FF6B00] hover:bg-[#e04800] text-white rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-xs">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Another Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => handlePhotoUpload(activeProject.id, e)}
                          />
                        </label>
                        <button
                          onClick={() => handleRemovePhoto(activeProject.id, activePhotoIndex)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-red-900/40 hover:bg-red-900/70 text-red-200 border border-red-800 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                          title="Remove current photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    {/* Main Active Photo View */}
                    <div className="relative rounded-xl overflow-hidden border border-neutral-200 bg-slate-950 shadow-md">
                      <div className="h-64 sm:h-72 w-full flex items-center justify-center bg-black/90">
                        <img
                          src={currentPhoto.url}
                          alt={currentPhoto.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                      {/* Photo details overlay */}
                      <div className="absolute bottom-0 inset-x-0 p-4 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                        <div>
                          <div className="text-xs font-mono uppercase tracking-wider text-[#D6A548] font-bold">
                            {activeProject.id === 'project-5' || activeProject.id === 'project-7' ? 'Chapur Substation Site Record' : `${activeProject.location} Site Record`}
                          </div>
                          <h4 className="text-sm sm:text-base font-bold font-['Outfit'] text-white">
                            {currentPhoto.title}
                          </h4>
                          {currentPhoto.caption && (
                            <p className="text-xs text-slate-300 mt-0.5 max-w-lg leading-relaxed">
                              {currentPhoto.caption}
                            </p>
                          )}
                        </div>
                        <span className="px-2.5 py-1 bg-black/60 rounded text-[11px] font-mono text-slate-300 border border-white/20 shrink-0 self-start sm:self-auto">
                          Photo {activePhotoIndex + 1} of {allPhotos.length}
                        </span>
                      </div>
                    </div>

                    {/* Thumbnails Carousel */}
                    <div className="flex items-center gap-2 overflow-x-auto py-1.5">
                      {allPhotos.map((photo, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => setActivePhotoIndex(pIdx)}
                          className={`relative w-24 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                            activePhotoIndex === pIdx
                              ? 'border-[#FF6B00] ring-2 ring-[#FF6B00]/30 scale-105 shadow-md'
                              : 'border-neutral-200 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={photo.url} alt={photo.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-x-0 bottom-0 bg-black/70 px-1 py-0.5 text-[9px] text-white truncate text-center font-medium">
                            {photo.title}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Status, Client and Location Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-neutral-200 text-xs">
                <div>
                  <div className="text-slate-500 font-medium">Category / Status</div>
                  <div className="font-bold text-[#0F172A] mt-0.5">{activeProject.category} ({activeProject.status})</div>
                </div>
                <div>
                  <div className="text-slate-500 font-medium">Location</div>
                  <div className="font-bold text-[#0F172A] mt-0.5">{activeProject.location}</div>
                </div>
                <div>
                  <div className="text-slate-500 font-medium">Client / Employer</div>
                  <div className="font-bold text-[#FF6B00] mt-0.5">{activeProject.client}</div>
                </div>
              </div>

              {/* Major Work Completed with Clean Bullet Points */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6B00]" />
                  <span>Major Work Completed:</span>
                </h4>
                <ul className="space-y-2 p-4 rounded-xl bg-slate-50 border border-neutral-200">
                  {activeProject.majorWorks.map((work, wIdx) => (
                    <li key={wIdx} className="flex items-start gap-2.5 text-xs text-slate-800 font-medium">
                      <span className="w-2 h-2 rounded-full bg-[#FF6B00] shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{work}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Parameters preview */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 font-mono">
                  Project Record Summary
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeProject.specs.map((spec, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-slate-50 border border-neutral-200 flex justify-between items-center text-xs"
                    >
                      <span className="text-slate-500 font-medium">{spec.label}:</span>
                      <span className="font-bold text-[#0F172A] font-mono text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-neutral-200 flex items-center justify-between">
              <a
                href={getWhatsAppUrl(`Inquiry about project: ${activeProject.name} at ${activeProject.location}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#25D366] font-bold hover:underline flex items-center gap-1.5"
              >
                <span>Inquire via WhatsApp</span>
                <span>→</span>
              </a>
              <button
                onClick={() => setActiveProject(null)}
                className="px-5 py-2 bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
