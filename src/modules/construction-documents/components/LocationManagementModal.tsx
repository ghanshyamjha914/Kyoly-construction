import React, { useState } from 'react';
import { MasterLocalLevel, LocalLevelType } from '../types';
import { useConstructionDocuments } from '../context/ConstructionDocumentsContext';
import {
  X,
  Database,
  Upload,
  Download,
  RotateCcw,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  AlertTriangle,
  History,
  Search,
} from 'lucide-react';

interface LocationManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationManagementModal: React.FC<LocationManagementModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    masterProvinces,
    masterDistricts,
    masterLocalLevels,
    updateMasterLocalLevel,
    addMasterLocalLevel,
    importMasterLocationData,
    rollbackMasterLocations,
    auditLogs,
  } = useConstructionDocuments();

  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'import' | 'audit'>('list');
  const [search, setSearch] = useState('');
  const [districtFilter, setDistrictFilter] = useState('ALL');

  // New Record Form
  const [newLevel, setNewLevel] = useState<Partial<MasterLocalLevel>>({
    districtId: masterDistricts[0]?.id || '',
    code: '',
    name: '',
    nameNepali: '',
    type: 'Municipality',
    totalWards: 10,
    status: 'Active',
  });

  // Edit inline
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<MasterLocalLevel | null>(null);

  // Import JSON textarea
  const [importJsonText, setImportJsonText] = useState('');
  const [importNotice, setImportNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  // Filtered local levels
  const filteredLevels = masterLocalLevels.filter((ll) => {
    const matchesSearch =
      ll.name.toLowerCase().includes(search.toLowerCase()) ||
      ll.nameNepali.includes(search) ||
      ll.code.toLowerCase().includes(search.toLowerCase());
    const matchesDistrict = districtFilter === 'ALL' || ll.districtId === districtFilter;
    return matchesSearch && matchesDistrict;
  });

  const handleStartEdit = (ll: MasterLocalLevel) => {
    setEditingId(ll.id);
    setEditForm({ ...ll });
  };

  const handleSaveEdit = () => {
    if (!editForm) return;
    updateMasterLocalLevel(editForm);
    setEditingId(null);
    setEditForm(null);
  };

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLevel.name || !newLevel.districtId) {
      alert('Please provide Name and District.');
      return;
    }

    const created: MasterLocalLevel = {
      id: `ll-${Date.now()}`,
      districtId: newLevel.districtId,
      code: newLevel.code || `LL-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newLevel.name,
      nameNepali: newLevel.nameNepali || newLevel.name,
      type: (newLevel.type as LocalLevelType) || 'Municipality',
      totalWards: newLevel.totalWards || 10,
      status: 'Active',
    };

    addMasterLocalLevel(created);
    setNewLevel({
      districtId: masterDistricts[0]?.id || '',
      code: '',
      name: '',
      nameNepali: '',
      type: 'Municipality',
      totalWards: 10,
      status: 'Active',
    });
    setActiveTab('list');
  };

  const handleToggleStatus = (ll: MasterLocalLevel) => {
    const nextStatus = ll.status === 'Active' ? 'Inactive' : 'Active';
    updateMasterLocalLevel({ ...ll, status: nextStatus });
  };

  const handleExportJson = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      provinces: masterProvinces,
      districts: masterDistricts,
      localLevels: masterLocalLevels,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nepal_master_locations_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      const res = importMasterLocationData(parsed);
      setImportNotice(`Successfully imported and merged ${res.importedCount} location entries.`);
      setImportJsonText('');
      setTimeout(() => setImportNotice(null), 4000);
    } catch {
      alert('Invalid JSON format. Please paste a valid JSON array or object containing "localLevels".');
    }
  };

  const handleRollback = () => {
    if (
      window.confirm(
        'Are you sure you want to rollback master location records to the verified Government of Nepal default reference dataset? (Existing project location snapshots will NOT be altered).'
      )
    ) {
      rollbackMasterLocations();
      alert('Master locations rolled back successfully.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col border border-neutral-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0F172A] text-white p-5 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center border border-[#FF6B00]/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF6B00]">
                Admin Database Console
              </div>
              <h3 className="text-lg font-black font-['Outfit'] text-white">
                Nepal Administrative Location Database Management
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

        {/* Tab Navigation & Global Actions */}
        <div className="px-6 py-3 border-b border-neutral-200 bg-neutral-50 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('list')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                activeTab === 'list'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
              }`}
            >
              Directory ({masterLocalLevels.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('add')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                activeTab === 'add'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
              }`}
            >
              + Add Local Level
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('import')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                activeTab === 'import'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
              }`}
            >
              Import / Export
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('audit')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                activeTab === 'audit'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
              }`}
            >
              Audit History
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportJson}
              className="px-3 py-1.5 bg-white border border-neutral-300 hover:bg-neutral-100 rounded-lg font-bold text-neutral-700 flex items-center gap-1.5 cursor-pointer"
              title="Export complete master location dataset"
            >
              <Download className="w-3.5 h-3.5 text-neutral-500" />
              <span>Export JSON</span>
            </button>

            <button
              type="button"
              onClick={handleRollback}
              className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer"
              title="Rollback to initial verified dataset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Rollback Master</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 flex-1 text-xs space-y-4">
          {importNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-lg flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>{importNotice}</span>
            </div>
          )}

          {/* TAB: DIRECTORY LIST */}
          {activeTab === 'list' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search municipality, code, nepali..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-neutral-500 font-semibold">Filter District:</span>
                  <select
                    value={districtFilter}
                    onChange={(e) => setDistrictFilter(e.target.value)}
                    className="px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white cursor-pointer"
                  >
                    <option value="ALL">All Districts ({masterDistricts.length})</option>
                    {masterDistricts.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-neutral-100 text-neutral-700 font-mono text-[11px] uppercase border-b border-neutral-200">
                    <tr>
                      <th className="p-3">Code / ID</th>
                      <th className="p-3">Local Level Name</th>
                      <th className="p-3">Nepali Name</th>
                      <th className="p-3">Classification Type</th>
                      <th className="p-3">District</th>
                      <th className="p-3 text-center">Wards</th>
                      <th className="p-3 text-center">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 text-xs">
                    {filteredLevels.map((ll) => {
                      const dist = masterDistricts.find((d) => d.id === ll.districtId);
                      const isEditing = editingId === ll.id;

                      if (isEditing && editForm) {
                        return (
                          <tr key={ll.id} className="bg-amber-50/60">
                            <td className="p-2">
                              <input
                                type="text"
                                value={editForm.code}
                                onChange={(e) => setEditForm({ ...editForm, code: e.target.value })}
                                className="w-full px-2 py-1 border rounded text-xs"
                              />
                            </td>
                            <td className="p-2">
                              <input
                                type="text"
                                value={editForm.name}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                className="w-full px-2 py-1 border rounded text-xs font-bold"
                              />
                            </td>
                            <td className="p-2">
                              <input
                                type="text"
                                value={editForm.nameNepali}
                                onChange={(e) => setEditForm({ ...editForm, nameNepali: e.target.value })}
                                className="w-full px-2 py-1 border rounded text-xs"
                              />
                            </td>
                            <td className="p-2">
                              <select
                                value={editForm.type}
                                onChange={(e) => setEditForm({ ...editForm, type: e.target.value as any })}
                                className="w-full px-2 py-1 border rounded text-xs"
                              >
                                <option value="Metropolitan City">Metropolitan City</option>
                                <option value="Sub-Metropolitan City">Sub-Metropolitan City</option>
                                <option value="Municipality">Municipality</option>
                                <option value="Rural Municipality">Rural Municipality</option>
                              </select>
                            </td>
                            <td className="p-2 text-neutral-600">{dist?.name}</td>
                            <td className="p-2 text-center">
                              <input
                                type="number"
                                min="1"
                                max="99"
                                value={editForm.totalWards}
                                onChange={(e) => setEditForm({ ...editForm, totalWards: parseInt(e.target.value, 10) || 1 })}
                                className="w-16 px-1 py-1 border rounded text-center text-xs"
                              />
                            </td>
                            <td className="p-2 text-center">
                              <span className="font-mono text-xs">{editForm.status}</span>
                            </td>
                            <td className="p-2 text-right space-x-1">
                              <button
                                type="button"
                                onClick={handleSaveEdit}
                                className="px-2 py-1 bg-emerald-600 text-white rounded text-[11px] font-bold"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingId(null)}
                                className="px-2 py-1 bg-neutral-200 text-neutral-800 rounded text-[11px]"
                              >
                                Cancel
                              </button>
                            </td>
                          </tr>
                        );
                      }

                      return (
                        <tr key={ll.id} className="hover:bg-neutral-50/80 transition-colors">
                          <td className="p-3 font-mono text-[11px] text-neutral-500 font-bold">{ll.code}</td>
                          <td className="p-3 font-bold text-[#0F172A]">{ll.name}</td>
                          <td className="p-3 text-neutral-600">{ll.nameNepali}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-neutral-100 text-neutral-700 border border-neutral-200">
                              {ll.type}
                            </span>
                          </td>
                          <td className="p-3 text-neutral-600">{dist?.name || 'Unknown'}</td>
                          <td className="p-3 text-center font-bold font-mono">{ll.totalWards}</td>
                          <td className="p-3 text-center">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                                ll.status === 'Active'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-neutral-200 text-neutral-700'
                              }`}
                            >
                              {ll.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleStartEdit(ll)}
                                className="p-1 text-neutral-500 hover:text-blue-600 rounded hover:bg-neutral-100"
                                title="Edit master entry"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleToggleStatus(ll)}
                                className="text-[10px] font-mono px-2 py-0.5 rounded hover:bg-neutral-100 text-neutral-600"
                                title="Toggle active status"
                              >
                                {ll.status === 'Active' ? 'Deactivate' : 'Activate'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: ADD NEW RECORD */}
          {activeTab === 'add' && (
            <form onSubmit={handleAddNew} className="max-w-2xl bg-neutral-50 p-6 rounded-xl border border-neutral-200 space-y-4">
              <h4 className="font-bold text-[#0F172A] text-sm uppercase font-mono">
                Add New Municipality / Local Level Record
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                    District *
                  </label>
                  <select
                    value={newLevel.districtId}
                    onChange={(e) => setNewLevel({ ...newLevel, districtId: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white"
                  >
                    {masterDistricts.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.nameNepali})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                    Classification Type *
                  </label>
                  <select
                    value={newLevel.type}
                    onChange={(e) => setNewLevel({ ...newLevel, type: e.target.value as any })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs bg-white"
                  >
                    <option value="Metropolitan City">Metropolitan City</option>
                    <option value="Sub-Metropolitan City">Sub-Metropolitan City</option>
                    <option value="Municipality">Municipality</option>
                    <option value="Rural Municipality">Rural Municipality</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                    English Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newLevel.name || ''}
                    onChange={(e) => setNewLevel({ ...newLevel, name: e.target.value })}
                    placeholder="e.g. Tokha Municipality"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                    Nepali Script Name
                  </label>
                  <input
                    type="text"
                    value={newLevel.nameNepali || ''}
                    onChange={(e) => setNewLevel({ ...newLevel, nameNepali: e.target.value })}
                    placeholder="e.g. टोखा नगरपालिका"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                    System Code / Ref ID
                  </label>
                  <input
                    type="text"
                    value={newLevel.code || ''}
                    onChange={(e) => setNewLevel({ ...newLevel, code: e.target.value })}
                    placeholder="e.g. KTM-TOK"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                    Total Wards Count *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    required
                    value={newLevel.totalWards || 10}
                    onChange={(e) => setNewLevel({ ...newLevel, totalWards: parseInt(e.target.value, 10) || 1 })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs font-bold font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="px-4 py-2 rounded-lg text-neutral-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#FF6B00] hover:bg-[#E04800] text-white rounded-lg font-bold shadow-xs cursor-pointer"
                >
                  Save Master Record
                </button>
              </div>
            </form>
          )}

          {/* TAB: IMPORT / EXPORT */}
          {activeTab === 'import' && (
            <div className="max-w-3xl space-y-4">
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3">
                <h4 className="font-bold text-[#0F172A] text-sm uppercase font-mono flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#FF6B00]" />
                  <span>Import / Merge Location JSON Dataset</span>
                </h4>
                <p className="text-neutral-500 text-xs">
                  Paste JSON containing an array of <code>localLevels</code> or standard MoFAGA records.
                  Existing codes will update; new ones will be added. Historical project snapshots remain strictly protected.
                </p>

                <textarea
                  rows={6}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder={`{\n  "localLevels": [\n    {\n      "id": "ll-custom-1",\n      "districtId": "dist-kathmandu",\n      "code": "KTM-NEW",\n      "name": "New Local Level",\n      "nameNepali": "नयाँ स्थानीय तह",\n      "type": "Municipality",\n      "totalWards": 12,\n      "status": "Active"\n    }\n  ]\n}`}
                  className="w-full p-3 font-mono text-[11px] border border-neutral-300 rounded-lg bg-white"
                />

                <button
                  type="button"
                  onClick={handleImportJson}
                  className="px-6 py-2 bg-[#0F172A] hover:bg-neutral-800 text-white rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Validate & Merge Dataset</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB: AUDIT HISTORY */}
          {activeTab === 'audit' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-bold text-[#0F172A] text-xs uppercase font-mono">
                <History className="w-4 h-4 text-[#FF6B00]" />
                <span>Administrative Modification Audit Log ({auditLogs.length} Events)</span>
              </div>

              <div className="divide-y divide-neutral-100 border border-neutral-200 rounded-xl bg-neutral-50 p-2">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-neutral-200 text-neutral-800 rounded">
                          {log.action}
                        </span>
                        <span className="font-bold text-[#0F172A]">{log.entityName}</span>
                        <span className="text-neutral-400">({log.entityType})</span>
                      </div>
                      <p className="text-neutral-600 text-[11px]">{log.description}</p>
                    </div>

                    <div className="text-right shrink-0 text-[10px] font-mono text-neutral-400">
                      <div>User: {log.user}</div>
                      <div>{new Date(log.timestamp).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
