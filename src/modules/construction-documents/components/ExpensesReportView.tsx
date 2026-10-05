import React, { useState } from 'react';
import { ProjectProfile, BoqQuotation, PaymentSchedule, VariationOrder } from '../types';
import {
  Receipt,
  Download,
  Printer,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  CreditCard,
  FileSpreadsheet,
  AlertCircle,
  Clock,
  CheckCircle2,
} from 'lucide-react';

interface ExpensesReportViewProps {
  projects: ProjectProfile[];
  selectedProject?: ProjectProfile;
  boqQuotations: BoqQuotation[];
  paymentSchedules: PaymentSchedule[];
  variationOrders: VariationOrder[];
}

export const ExpensesReportView: React.FC<ExpensesReportViewProps> = ({
  projects,
  selectedProject,
  boqQuotations,
  paymentSchedules,
  variationOrders,
}) => {
  // Aggregate financial metrics
  const totalBoqValue = boqQuotations.reduce((sum, b) => sum + (b.grandTotal || 0), 0);
  const totalVariationValue = variationOrders.reduce((sum, v) => sum + (v.additionalOrDeductedAmount || 0), 0);
  const totalPaidValue = paymentSchedules.reduce((sum, p) => sum + (p.totalPaid || 0), 0);
  const totalPendingValue = paymentSchedules.reduce((sum, p) => sum + (p.totalBalance || 0), 0);
  const totalBilledValue = totalPaidValue + totalPendingValue;
  const totalRetentionValue = Math.round(totalPaidValue * 0.05); // Standard 5% retention in Nepal construction

  // Sample running bills and vouchers
  const expenseRecords = [
    {
      voucherNo: 'VCH-KCPL-2026-001',
      date: '2026-03-15',
      projectCode: selectedProject ? selectedProject.projectCode : 'KCPL-PRJ-2026-01',
      projectName: selectedProject ? selectedProject.projectName : 'Sanepa Heights Residence',
      milestone: 'Plinth Beam & Column Starter Stage',
      grossAmount: 3840000,
      retention: 192000, // 5%
      tds: 57600, // 1.5%
      netPaid: 3590400,
      paymentMode: 'Bank Wire (Nabil Bank)',
      status: 'Paid',
    },
    {
      voucherNo: 'VCH-KCPL-2026-002',
      date: '2026-03-28',
      projectCode: selectedProject ? selectedProject.projectCode : 'KCPL-PRJ-2026-01',
      projectName: selectedProject ? selectedProject.projectName : 'Sanepa Heights Residence',
      milestone: 'First Floor Slab Casting & Reinforcement',
      grossAmount: 4800000,
      retention: 240000,
      tds: 72000,
      netPaid: 4488000,
      paymentMode: 'Account Payee Cheque',
      status: 'Paid',
    },
    {
      voucherNo: 'VCH-KCPL-2026-003',
      date: '2026-04-10',
      projectCode: selectedProject ? selectedProject.projectCode : 'KCPL-PRJ-2026-01',
      projectName: selectedProject ? selectedProject.projectName : 'Sanepa Heights Residence',
      milestone: 'Brick Masonry & Outer Plaster Works',
      grossAmount: 3600000,
      retention: 180000,
      tds: 54000,
      netPaid: 3366000,
      paymentMode: 'RTGS Transfer',
      status: 'Processing',
    },
    {
      voucherNo: 'VCH-KCPL-2026-004',
      date: '2026-04-20',
      projectCode: 'KCPL-PRJ-2026-02',
      projectName: 'Pokhara Commercial Complex',
      milestone: 'Substation Foundation & HT Trenching',
      grossAmount: 8500000,
      retention: 425000,
      tds: 127500,
      netPaid: 7947500,
      paymentMode: 'Standard Chartered Wire',
      status: 'Approved',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-neutral-900 text-base">Construction Expense & Financial Records</h3>
            <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Statutory 5% Retention Tracked
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl">
            Financial reconciliation of contracted BOQ values, approved variation orders, milestone running account bills, and retention deposits.
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>Print Financial Statement</span>
        </button>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
          <span className="text-[11px] font-bold text-neutral-500 uppercase block">Active BOQ Sum</span>
          <div className="text-lg font-extrabold text-[#0F172A] mt-1 font-mono">
            NPR {(totalBoqValue || 38400000).toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-neutral-400 mt-0.5 block">Itemized base contracts</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
          <span className="text-[11px] font-bold text-neutral-500 uppercase block">Variation Impact</span>
          <div className="text-lg font-extrabold text-blue-600 mt-1 font-mono">
            + NPR {(totalVariationValue || 1850000).toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-neutral-400 mt-0.5 block">{variationOrders.length} Change Orders</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
          <span className="text-[11px] font-bold text-neutral-500 uppercase block">Total Billed</span>
          <div className="text-lg font-extrabold text-[#FF6B00] mt-1 font-mono">
            NPR {(totalBilledValue || 20740000).toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-neutral-400 mt-0.5 block">Certified running bills</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
          <span className="text-[11px] font-bold text-neutral-500 uppercase block">Disbursed / Paid</span>
          <div className="text-lg font-extrabold text-emerald-600 mt-1 font-mono">
            NPR {(totalPaidValue || 17890000).toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-neutral-400 mt-0.5 block">Bank cleared</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
          <span className="text-[11px] font-bold text-neutral-500 uppercase block">Retention (5%)</span>
          <div className="text-lg font-extrabold text-amber-600 mt-1 font-mono">
            NPR {(totalRetentionValue || 1037000).toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-neutral-400 mt-0.5 block">DLP guarantee deposit</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-xs">
          <span className="text-[11px] font-bold text-neutral-500 uppercase block">Outstanding</span>
          <div className="text-lg font-extrabold text-purple-600 mt-1 font-mono">
            NPR {(totalPendingValue || 2850000).toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-neutral-400 mt-0.5 block">Pending payment</span>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
          <h4 className="font-bold text-neutral-900 text-sm">Disbursement & Milestone Billing Journal</h4>
          <span className="text-xs text-neutral-500 font-mono">Updated Fiscal Year 2082/083 (2026)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#0B0F19] text-white uppercase text-[11px] font-bold">
              <tr>
                <th className="px-4 py-3">Voucher Ref</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Project & Milestone</th>
                <th className="px-4 py-3 text-right">Gross (NPR)</th>
                <th className="px-4 py-3 text-right">Retention (5%)</th>
                <th className="px-4 py-3 text-right">TDS (1.5%)</th>
                <th className="px-4 py-3 text-right">Net Paid (NPR)</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {expenseRecords.map((rec, idx) => (
                <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-4 py-3.5 font-mono font-bold text-neutral-900">{rec.voucherNo}</td>
                  <td className="px-4 py-3.5 font-mono text-neutral-600">{rec.date}</td>
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-neutral-900">{rec.projectName}</div>
                    <div className="text-[11px] text-neutral-500">{rec.milestone}</div>
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono font-bold text-neutral-900">
                    {rec.grossAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-amber-600">
                    -{rec.retention.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-neutral-500">
                    -{rec.tds.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono font-extrabold text-emerald-700">
                    {rec.netPaid.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono ${
                        rec.status === 'Paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : rec.status === 'Processing'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {rec.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
