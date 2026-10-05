import React, { useState } from 'react';
import { useConstructionDocuments } from '../context/ConstructionDocumentsContext';
import { X, History, Search, Download, ShieldCheck, Filter } from 'lucide-react';

interface AuditLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditLogModal: React.FC<AuditLogModalProps> = ({ isOpen, onClose }) => {
  const { auditLogs } = useConstructionDocuments();
  const [search, setSearch] = useState('');
  const [filterAction, setFilterAction] = useState('ALL');

  if (!isOpen) return null;

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.entityName.toLowerCase().includes(search.toLowerCase()) ||
      log.description.toLowerCase().includes(search.toLowerCase()) ||
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase());

    const matchesAction = filterAction === 'ALL' || log.action === filterAction;
    return matchesSearch && matchesAction;
  });

  const handleExportLogs = () => {
    const headers = ['Timestamp', 'Action', 'Entity Type', 'Entity Name', 'User', 'Description'];
    const rows = filteredLogs.map((l) => [
      `"${l.timestamp}"`,
      l.action,
      l.entityType,
      `"${l.entityName.replace(/"/g, '""')}"`,
      `"${l.user}"`,
      `"${l.description.replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Kyoly_Audit_Logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#0B0F19] text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center border border-[#FF6B00]/30">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">
                Document & Location Audit Trail Log
              </h2>
              <p className="text-xs text-neutral-400">
                Immutable chronological ledger of project modifications, revisions, and location protections
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportLogs}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border border-neutral-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-neutral-200 bg-neutral-50 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search audit trail by project, user, action or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-white border border-neutral-300 rounded-xl text-xs focus:outline-hidden focus:border-[#FF6B00]"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-500 font-medium">Action:</span>
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="px-3 py-1.5 bg-white border border-neutral-300 rounded-xl text-xs font-semibold"
            >
              <option value="ALL">All Actions ({auditLogs.length})</option>
              <option value="CREATE">CREATE</option>
              <option value="UPDATE">UPDATE</option>
              <option value="STATUS_CHANGE">STATUS_CHANGE</option>
              <option value="LOCATION_UPDATE">LOCATION_UPDATE</option>
              <option value="IMPORT">IMPORT</option>
              <option value="ROLLBACK">ROLLBACK</option>
            </select>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#0B0F19] text-white uppercase text-[11px] font-bold sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 w-40">Timestamp</th>
                <th className="px-4 py-3 w-32">Action</th>
                <th className="px-4 py-3 w-28">Entity</th>
                <th className="px-4 py-3 w-48">Name / Ref</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3 w-36">User</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-neutral-500">
                    No matching audit records found.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-neutral-50/80">
                    <td className="px-4 py-2.5 font-mono text-[11px] text-neutral-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                          log.action === 'CREATE'
                            ? 'bg-emerald-100 text-emerald-800'
                            : log.action === 'UPDATE'
                            ? 'bg-blue-100 text-blue-800'
                            : log.action === 'STATUS_CHANGE'
                            ? 'bg-purple-100 text-purple-800'
                            : log.action === 'LOCATION_UPDATE'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-neutral-100 text-neutral-800'
                        }`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 font-medium text-neutral-600">{log.entityType}</td>
                    <td className="px-4 py-2.5 font-bold text-neutral-900">{log.entityName}</td>
                    <td className="px-4 py-2.5 text-neutral-700">{log.description}</td>
                    <td className="px-4 py-2.5 font-mono text-[11px] text-neutral-500">{log.user}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="bg-white px-6 py-3 border-t border-neutral-200 flex justify-between items-center shrink-0 text-xs text-neutral-500">
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Audit log protection active (tamper-resistant ledger)</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
