import React, { useState, useEffect } from 'react';
import { PaymentSchedule, PaymentMilestone, ProjectProfile, DocumentStatus } from '../types';
import { useConstructionDocuments } from '../context/ConstructionDocumentsContext';
import { DocumentPrintHeaderFooter } from './DocumentPrintHeaderFooter';
import { DocumentStatusBadge } from './DocumentStatusBadge';
import { LegalDisclaimerBox } from './LegalDisclaimerBox';
import {
  X,
  Save,
  Printer,
  CreditCard,
  Plus,
  Trash2,
  DollarSign,
  CheckCircle2,
  Clock,
  Eye,
  Edit3,
} from 'lucide-react';

interface PaymentScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  scheduleToEdit?: PaymentSchedule;
  project?: ProjectProfile;
}

export const PaymentScheduleModal: React.FC<PaymentScheduleModalProps> = ({
  isOpen,
  onClose,
  scheduleToEdit,
  project,
}) => {
  const {
    savePaymentSchedule,
    getNextDocNumber,
    projects,
    selectedProjectId,
  } = useConstructionDocuments();

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const currentProject =
    project ||
    projects.find((p) => p.id === (scheduleToEdit?.projectId || selectedProjectId)) ||
    projects[0];

  const buildInitialForm = (): PaymentSchedule => {
    if (scheduleToEdit) {
      return JSON.parse(JSON.stringify(scheduleToEdit));
    }

    const totalContractValue = 8500000;
    const defaultMilestones: PaymentMilestone[] = [
      {
        id: 'pm-1',
        milestone: 'Advance / Mobilization',
        description: 'Signing of contract, site handover and mobilization of team and machinery.',
        percentage: 10,
        amount: 850000,
        dueDate: '2026-02-15',
        paidAmount: 850000,
        balance: 0,
        status: 'Paid in Full',
        paidDate: '2026-02-14',
        paymentMethod: 'Bank Transfer (Nabil Bank)',
        receiptReference: 'RCP-2026-018',
      },
      {
        id: 'pm-2',
        milestone: 'Foundation & Footing Casting',
        description: 'Excavation, soling, PCC mud mat, reinforcement placing and raft/isolated footings casting.',
        percentage: 15,
        amount: 1275000,
        dueDate: '2026-03-20',
        paidAmount: 1275000,
        balance: 0,
        status: 'Paid in Full',
        paidDate: '2026-03-22',
        paymentMethod: 'Cheque No. 0491028',
        receiptReference: 'RCP-2026-042',
      },
      {
        id: 'pm-3',
        milestone: 'Plinth Beam Level',
        description: 'Backfilling, gravel compaction, plinth tie beam casting and DPC waterproof treatment.',
        percentage: 15,
        amount: 1275000,
        dueDate: '2026-04-30',
        paidAmount: 1000000,
        balance: 275000,
        status: 'Partially Paid',
        paidDate: '2026-04-28',
        paymentMethod: 'Bank Transfer',
        receiptReference: 'RCP-2026-067',
      },
      {
        id: 'pm-4',
        milestone: 'Ground Floor Slab Casting',
        description: 'Column erection, shuttering, beam-slab reinforcement and RCC M20 casting.',
        percentage: 15,
        amount: 1275000,
        dueDate: '2026-06-15',
        paidAmount: 0,
        balance: 1275000,
        status: 'Invoiced',
        receiptReference: 'INV-2026-089',
      },
      {
        id: 'pm-5',
        milestone: 'First Floor Slab & Superstructure',
        description: 'First floor RCC frame and roof slab casting.',
        percentage: 15,
        amount: 1275000,
        dueDate: '2026-08-01',
        paidAmount: 0,
        balance: 1275000,
        status: 'Pending',
      },
      {
        id: 'pm-6',
        milestone: 'Brick Masonry & Internal Plastering',
        description: 'Exterior 9-inch and interior 4.5-inch brickwork with 1:4 cement sand plaster.',
        percentage: 15,
        amount: 1275000,
        dueDate: '2026-09-30',
        paidAmount: 0,
        balance: 1275000,
        status: 'Pending',
      },
      {
        id: 'pm-7',
        milestone: 'Finishing & Services Handover',
        description: 'Tiling, painting, doors, windows, CPVC plumbing & electrical fixtures.',
        percentage: 10,
        amount: 850000,
        dueDate: '2026-11-15',
        paidAmount: 0,
        balance: 850000,
        status: 'Pending',
      },
      {
        id: 'pm-8',
        milestone: 'Retention Money (Defects Liability)',
        description: '5% retention released after 12 months Defect Liability Period.',
        percentage: 5,
        amount: 425000,
        dueDate: '2027-11-15',
        paidAmount: 0,
        balance: 425000,
        status: 'Pending',
      },
    ];

    const totalPaid = defaultMilestones.reduce((acc, m) => acc + (m.paidAmount || 0), 0);
    const totalBalance = totalContractValue - totalPaid;

    return {
      id: `ps-${Date.now()}`,
      docNumber: getNextDocNumber('PAY'),
      projectId: currentProject?.id || '',
      revision: 'Rev 1',
      date: new Date().toISOString().split('T')[0],
      status: 'Final',
      totalContractValue,
      milestones: defaultMilestones,
      totalPaid,
      totalBalance,
      notes:
        'All milestone disbursements are subjected to physical site verification by Kyoly Project Engineer. Invoices become due within 7 days of joint certification.',
      preparedBy: 'Billing & Commercial Team - Kyoly',
      checkedBy: 'Senior Financial Controller',
      approvedBy: 'Project Director',
      updatedAt: new Date().toISOString(),
    };
  };

  const [formData, setFormData] = useState<PaymentSchedule>(buildInitialForm);

  useEffect(() => {
    if (isOpen) {
      setFormData(buildInitialForm());
    }
  }, [isOpen, scheduleToEdit, project, selectedProjectId]);

  if (!isOpen) return null;

  const handleMilestoneChange = (index: number, field: keyof PaymentMilestone, val: any) => {
    const updated = [...formData.milestones];
    const item = { ...updated[index], [field]: val };

    if (field === 'percentage') {
      const pct = parseFloat(val) || 0;
      item.amount = Math.round((formData.totalContractValue * pct) / 100);
      item.balance = item.amount - (item.paidAmount || 0);
    } else if (field === 'paidAmount') {
      const paid = parseFloat(val) || 0;
      item.paidAmount = paid;
      item.balance = item.amount - paid;
      if (paid >= item.amount && item.amount > 0) item.status = 'Paid in Full';
      else if (paid > 0) item.status = 'Partially Paid';
    }

    updated[index] = item;
    const totalPaid = updated.reduce((sum, m) => sum + (m.paidAmount || 0), 0);
    const totalBalance = formData.totalContractValue - totalPaid;

    setFormData({
      ...formData,
      milestones: updated,
      totalPaid,
      totalBalance,
    });
  };

  const handleAddMilestone = () => {
    const newM: PaymentMilestone = {
      id: `pm-${Date.now()}`,
      milestone: 'New Construction Milestone',
      description: 'Milestone scope and verification criteria...',
      percentage: 0,
      amount: 0,
      dueDate: new Date().toISOString().split('T')[0],
      paidAmount: 0,
      balance: 0,
      status: 'Pending',
    };
    setFormData({
      ...formData,
      milestones: [...formData.milestones, newM],
    });
  };

  const handleDeleteMilestone = (index: number) => {
    const updated = formData.milestones.filter((_, i) => i !== index);
    const totalPaid = updated.reduce((sum, m) => sum + (m.paidAmount || 0), 0);
    const totalBalance = formData.totalContractValue - totalPaid;
    setFormData({
      ...formData,
      milestones: updated,
      totalPaid,
      totalBalance,
    });
  };

  const handleSave = () => {
    savePaymentSchedule(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Header Bar */}
        <div className="bg-[#0B0F19] text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center border border-[#FF6B00]/30">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  Milestone Payment Schedule & Progress Billing
                </h2>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#FF6B00] text-white">
                  {formData.docNumber}
                </span>
                <span className="text-xs text-neutral-400 font-mono">({formData.revision})</span>
              </div>
              <p className="text-xs text-neutral-400">
                Phase-wise disbursement schedule, running bills, retention money & reconciliation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-neutral-900 rounded-lg p-0.5 border border-neutral-800 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5 transition-colors ${
                  activeTab === 'edit' ? 'bg-[#FF6B00] text-white shadow-xs' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editor</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5 transition-colors ${
                  activeTab === 'preview' ? 'bg-[#FF6B00] text-white shadow-xs' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Print Schedule</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-neutral-50/50">
          {activeTab === 'edit' ? (
            <div className="space-y-6">
              {/* Financial KPI Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs">
                  <span className="text-xs font-bold text-neutral-500 uppercase block">Total Contract Value</span>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-sm font-bold text-neutral-400">NPR</span>
                    <input
                      type="number"
                      value={formData.totalContractValue}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        const updated = formData.milestones.map((m) => {
                          const amt = Math.round((val * m.percentage) / 100);
                          return { ...m, amount: amt, balance: amt - (m.paidAmount || 0) };
                        });
                        const totalPaid = updated.reduce((s, m) => s + (m.paidAmount || 0), 0);
                        setFormData({
                          ...formData,
                          totalContractValue: val,
                          milestones: updated,
                          totalPaid,
                          totalBalance: val - totalPaid,
                        });
                      }}
                      className="text-lg font-extrabold text-[#0F172A] w-full border-b border-neutral-300 focus:border-[#FF6B00] outline-hidden font-mono"
                    />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-xs bg-emerald-50/30">
                  <span className="text-xs font-bold text-emerald-800 uppercase block">Total Disbursed / Paid</span>
                  <div className="text-lg font-extrabold text-emerald-700 font-mono mt-1">
                    NPR {formData.totalPaid.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-medium">
                    ({((formData.totalPaid / (formData.totalContractValue || 1)) * 100).toFixed(1)}% of contract)
                  </span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs bg-amber-50/30">
                  <span className="text-xs font-bold text-amber-800 uppercase block">Remaining Balance</span>
                  <div className="text-lg font-extrabold text-amber-800 font-mono mt-1">
                    NPR {formData.totalBalance.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-amber-700 font-medium">Outstanding pending milestones</span>
                </div>
              </div>

              {/* Milestones Table */}
              <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-neutral-900 text-sm">Milestone Breakdown & Payment Status</h3>
                    <p className="text-xs text-neutral-500">
                      Manage stage percentages, milestone due dates, recorded receipts, and remaining balances.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddMilestone}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FF6B00] hover:bg-[#E04800] text-white rounded-lg text-xs font-bold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Milestone</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#0B0F19] text-white uppercase text-[11px] font-bold">
                      <tr>
                        <th className="px-3 py-3 w-12 text-center">S.N.</th>
                        <th className="px-3 py-3">Milestone Stage</th>
                        <th className="px-3 py-3 w-20 text-center">%</th>
                        <th className="px-3 py-3 w-32 text-right">Target Amount</th>
                        <th className="px-3 py-3 w-32 text-right">Paid Amount</th>
                        <th className="px-3 py-3 w-28 text-center">Status</th>
                        <th className="px-3 py-3 w-28">Due Date</th>
                        <th className="px-2 py-3 w-12 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {formData.milestones.map((m, idx) => (
                        <tr key={m.id} className="hover:bg-neutral-50/80">
                          <td className="px-3 py-2.5 text-center font-mono font-bold text-neutral-500">
                            {idx + 1}
                          </td>
                          <td className="px-3 py-2.5">
                            <input
                              type="text"
                              value={m.milestone}
                              onChange={(e) => handleMilestoneChange(idx, 'milestone', e.target.value)}
                              className="w-full px-2 py-1 border border-neutral-200 rounded font-semibold text-xs text-neutral-900"
                            />
                            <input
                              type="text"
                              value={m.description || ''}
                              onChange={(e) => handleMilestoneChange(idx, 'description', e.target.value)}
                              className="w-full px-2 py-0.5 border border-transparent hover:border-neutral-200 rounded text-[11px] text-neutral-500 mt-1"
                              placeholder="Add milestone description..."
                            />
                          </td>
                          <td className="px-3 py-2.5">
                            <input
                              type="number"
                              value={m.percentage}
                              onChange={(e) => handleMilestoneChange(idx, 'percentage', e.target.value)}
                              className="w-full px-2 py-1 border border-neutral-200 rounded text-center font-bold text-xs"
                            />
                          </td>
                          <td className="px-3 py-2.5 text-right font-mono font-bold text-neutral-900">
                            Rs. {m.amount.toLocaleString()}
                          </td>
                          <td className="px-3 py-2.5">
                            <input
                              type="number"
                              value={m.paidAmount}
                              onChange={(e) => handleMilestoneChange(idx, 'paidAmount', e.target.value)}
                              className="w-full px-2 py-1 border border-emerald-300 bg-emerald-50/50 rounded font-mono font-bold text-right text-xs text-emerald-800"
                            />
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            <select
                              value={m.status}
                              onChange={(e) => handleMilestoneChange(idx, 'status', e.target.value)}
                              className="px-2 py-1 rounded text-xs font-bold border border-neutral-300 bg-white"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Invoiced">Invoiced</option>
                              <option value="Partially Paid">Partially Paid</option>
                              <option value="Paid in Full">Paid in Full</option>
                              <option value="Overdue">Overdue</option>
                            </select>
                          </td>
                          <td className="px-3 py-2.5">
                            <input
                              type="date"
                              value={m.dueDate}
                              onChange={(e) => handleMilestoneChange(idx, 'dueDate', e.target.value)}
                              className="w-full px-2 py-1 border border-neutral-200 rounded text-xs text-neutral-700"
                            />
                          </td>
                          <td className="px-2 py-2.5 text-center">
                            <button
                              type="button"
                              onClick={() => handleDeleteMilestone(idx)}
                              disabled={formData.milestones.length <= 1}
                              className="p-1 text-neutral-400 hover:text-red-500 transition-colors disabled:opacity-30"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <LegalDisclaimerBox documentType="Payment Schedule" />
            </div>
          ) : (
            /* PRINT PREVIEW */
            <div className="bg-white p-6 sm:p-10 rounded-xl shadow-lg border border-neutral-300 max-w-4xl mx-auto text-[#0F172A] leading-relaxed">
              <DocumentPrintHeaderFooter
                docNumber={formData.docNumber}
                revision={formData.revision}
                date={formData.date}
                docTitle="MILESTONE PAYMENT SCHEDULE & FINANCIAL STATEMENT"
                project={currentProject}
                status={formData.status}
              />

              <div className="my-6 space-y-4 text-xs">
                <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 flex justify-between items-center">
                  <div>
                    <span className="text-neutral-500 block">Total Agreed Contract Sum:</span>
                    <strong className="text-base text-neutral-900 font-mono">
                      NPR {formData.totalContractValue.toLocaleString()}
                    </strong>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-500 block">Total Disbursed:</span>
                    <strong className="text-emerald-700 font-mono text-sm">
                      NPR {formData.totalPaid.toLocaleString()}
                    </strong>
                  </div>
                </div>

                <table className="w-full border border-neutral-300 text-xs">
                  <thead className="bg-neutral-100 font-bold">
                    <tr>
                      <th className="border p-1.5 text-center w-12">S.N.</th>
                      <th className="border p-1.5 text-left">Milestone Description</th>
                      <th className="border p-1.5 text-center w-16">%</th>
                      <th className="border p-1.5 text-right w-28">Amount</th>
                      <th className="border p-1.5 text-right w-28">Paid</th>
                      <th className="border p-1.5 text-center w-24">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.milestones.map((m, idx) => (
                      <tr key={idx}>
                        <td className="border p-1.5 text-center font-mono">{idx + 1}</td>
                        <td className="border p-1.5 font-medium">{m.milestone}</td>
                        <td className="border p-1.5 text-center">{m.percentage}%</td>
                        <td className="border p-1.5 text-right font-mono">Rs. {m.amount.toLocaleString()}</td>
                        <td className="border p-1.5 text-right font-mono text-emerald-700">
                          Rs. {m.paidAmount.toLocaleString()}
                        </td>
                        <td className="border p-1.5 text-center font-semibold">{m.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <LegalDisclaimerBox documentType="Payment Schedule" />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white px-6 py-3.5 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <DocumentStatusBadge status={formData.status} />
            <span className="text-xs text-neutral-500">
              Outstanding: <strong className="text-neutral-900 font-mono">NPR {formData.totalBalance.toLocaleString()}</strong>
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
                <span>Print Schedule</span>
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
              <span>Save Schedule</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
