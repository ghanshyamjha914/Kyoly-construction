import React, { useState } from 'react';
import { ProjectProfile, LocationSnapshot } from '../types';
import { useConstructionDocuments } from '../context/ConstructionDocumentsContext';
import { NepalLocationSelector } from './NepalLocationSelector';
import { X, ShieldAlert, Check, RefreshCw } from 'lucide-react';

interface ProjectLocationUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectProfile;
}

export const ProjectLocationUpdateModal: React.FC<ProjectLocationUpdateModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const { updateProjectLocation } = useConstructionDocuments();
  const [newLocation, setNewLocation] = useState<LocationSnapshot>(project.location);
  const [confirmedExplicitly, setConfirmedExplicitly] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setNewLocation(JSON.parse(JSON.stringify(project.location)));
      setConfirmedExplicitly(false);
    }
  }, [isOpen, project]);

  if (!isOpen) return null;

  const handleUpdate = () => {
    if (!confirmedExplicitly) {
      alert('Please check the confirmation box to explicitly acknowledge updating the project location snapshot.');
      return;
    }

    updateProjectLocation(project.id, newLocation);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl border border-neutral-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0F172A] text-white p-5 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-400">
                Historical Snapshot Management
              </div>
              <h3 className="text-lg font-black font-['Outfit'] text-white">
                Update Project Location Snapshot
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

        {/* Body */}
        <div className="p-6 space-y-5 text-xs">
          {/* Warning / Protection Notice */}
          <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 text-blue-900 space-y-2">
            <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-xs">
              <ShieldAlert className="w-4 h-4 text-blue-600" />
              <span>Historical Protection Policy:</span>
            </div>
            <p className="text-[11px] leading-relaxed text-blue-800">
              In accordance with Kyoly Construction Document Integrity standards, projects preserve their historical location
              snapshot forever. Updating this project location will update future generated documents for <strong>{project.projectName}</strong>,
              without modifying any other existing historical projects or municipal permits.
            </p>
          </div>

          {/* Current Saved Snapshot */}
          <div className="p-3 bg-neutral-100 rounded-lg border border-neutral-200">
            <span className="font-mono text-[10px] uppercase font-bold text-neutral-500 block mb-1">
              Current Saved Snapshot (Created {new Date(project.location.snapshotTimestamp).toLocaleString()}):
            </span>
            <div className="font-bold text-[#0F172A] text-xs">
              {project.location.streetTole ? `${project.location.streetTole}, ` : ''}
              Ward {project.location.wardNo}, {project.location.localLevelName} ({project.location.localLevelType}),{' '}
              {project.location.districtName}, {project.location.provinceName}
            </div>
          </div>

          {/* New Location Selector */}
          <div>
            <span className="font-bold text-[#0F172A] uppercase block mb-2 text-xs">
              Select New Official Location for this Project:
            </span>
            <NepalLocationSelector value={newLocation} onChange={setNewLocation} />
          </div>

          {/* Explicit Confirmation Checkbox */}
          <div className="pt-2 border-t border-neutral-200 flex items-start gap-2.5">
            <input
              type="checkbox"
              id="confirm-location-update"
              checked={confirmedExplicitly}
              onChange={(e) => setConfirmedExplicitly(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-[#FF6B00] rounded border-neutral-300 focus:ring-[#FF6B00] cursor-pointer"
            />
            <label
              htmlFor="confirm-location-update"
              className="text-xs text-neutral-800 font-semibold cursor-pointer select-none"
            >
              I explicitly confirm that I intend to update the location snapshot for project {project.projectCode}.
              I understand this action will apply to future documents for this project only.
            </label>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-neutral-900 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleUpdate}
              disabled={!confirmedExplicitly}
              className="px-6 py-2.5 bg-[#FF6B00] hover:bg-[#E04800] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Check className="w-4 h-4" />
              <span>Confirm & Update Project Location</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
