import React, { useState, useEffect } from 'react';
import { BoqQuotation, BoqItem, ProjectProfile, DocumentStatus } from '../types';
import { useConstructionDocuments } from '../context/ConstructionDocumentsContext';
import { DocumentPrintHeaderFooter } from './DocumentPrintHeaderFooter';
import { DocumentStatusBadge } from './DocumentStatusBadge';
import { LegalDisclaimerBox } from './LegalDisclaimerBox';
import { AreaCalculatorModal } from './AreaCalculatorModal';
import {
  X,
  Save,
  Printer,
  FileSpreadsheet,
  Plus,
  Trash2,
  Copy,
  Calculator,
  Download,
  Upload,
  Eye,
  Edit3,
  DollarSign,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface BoqQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotationToEdit?: BoqQuotation;
  project?: ProjectProfile;
}

export const BoqQuotationModal: React.FC<BoqQuotationModalProps> = ({
  isOpen,
  onClose,
  quotationToEdit,
  project,
}) => {
  const {
    saveBoqQuotation,
    getNextDocNumber,
    projects,
    selectedProjectId,
  } = useConstructionDocuments();

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [activeItemIndexForCalc, setActiveItemIndexForCalc] = useState<number | null>(null);

  // Associated project
  const currentProject =
    project ||
    projects.find((p) => p.id === (quotationToEdit?.projectId || selectedProjectId)) ||
    projects[0];

  const buildInitialForm = (): BoqQuotation => {
    if (quotationToEdit) {
      return JSON.parse(JSON.stringify(quotationToEdit));
    }

    const defaultItems: BoqItem[] = [
      {
        id: 'item-1',
        sn: 1,
        category: 'Earthwork & Foundation',
        description: 'Earthwork excavation in foundation trenches including dressing, ramming, and disposal up to 50m lead.',
        unit: 'cu.m',
        quantity: 145,
        rate: 550,
        amount: 145 * 550,
        remarks: 'As per structural drawing S-01',
      },
      {
        id: 'item-2',
        sn: 2,
        category: 'Earthwork & Foundation',
        description: 'Stone soling under foundation and floor with dry hand-packed boulders including sand filling and compaction.',
        unit: 'sq.m',
        quantity: 110,
        rate: 680,
        amount: 110 * 680,
        remarks: '150mm thickness',
      },
      {
        id: 'item-3',
        sn: 3,
        category: 'Concrete Works',
        description: 'Plain Cement Concrete (PCC 1:2:4) in foundation bed and mud mat including mixing, placing, and curing.',
        unit: 'cu.m',
        quantity: 18.5,
        rate: 11500,
        amount: 18.5 * 11500,
        remarks: '100mm thick bed',
      },
      {
        id: 'item-4',
        sn: 4,
        category: 'Concrete Works',
        description: 'Reinforced Cement Concrete (RCC M20/M25 design mix) in footings, columns, tie beams, and suspended floor slabs.',
        unit: 'cu.m',
        quantity: 62.4,
        rate: 18200,
        amount: 62.4 * 18200,
        remarks: 'Machine mix with vibrator compaction',
      },
      {
        id: 'item-5',
        sn: 5,
        category: 'Reinforcement Steel',
        description: 'Supplying, cutting, bending, binding, and placing Fe500D TMT reinforcement bars including binding wire.',
        unit: 'kg',
        quantity: 5800,
        rate: 118,
        amount: 5800 * 118,
        remarks: 'Grade Fe500D (Jindal/Hama)',
      },
      {
        id: 'item-6',
        sn: 6,
        category: 'Masonry Works',
        description: 'First-class chimney baked brick masonry in 1:4 cement-sand mortar in superstructure including scaffolding.',
        unit: 'cu.m',
        quantity: 48.0,
        rate: 15400,
        amount: 48.0 * 15400,
        remarks: '230mm & 115mm walls',
      },
      {
        id: 'item-7',
        sn: 7,
        category: 'Finishing & Plaster',
        description: '12.5mm thick cement sand plaster in 1:4 mortar on internal and external brick/RCC surfaces.',
        unit: 'sq.m',
        quantity: 420,
        rate: 450,
        amount: 420 * 450,
        remarks: 'Internal smooth finish',
      },
      {
        id: 'item-8',
        sn: 8,
        category: 'Plumbing & Electrical',
        description: 'Concealed CPVC hot & cold water piping, soil pipe line, septic tank connections, and earthing installation.',
        unit: 'lump sum',
        quantity: 1,
        rate: 450000,
        amount: 450000,
        remarks: 'First phase rough-in',
      },
    ];

    const subtotal = defaultItems.reduce((acc, item) => acc + item.amount, 0);
    const discountAmount = Math.round(subtotal * 0.02);
    const taxableAmount = subtotal - discountAmount;
    const vatPercentage = 13;
    const vatAmount = Math.round(taxableAmount * 0.13);
    const grandTotal = taxableAmount + vatAmount;

    return {
      id: `boq-${Date.now()}`,
      docNumber: getNextDocNumber('BOQ'),
      projectId: currentProject?.id || '',
      revision: 'Rev 0',
      date: new Date().toISOString().split('T')[0],
      status: 'Final',
      title: 'Detailed Bill of Quantities & Engineering Cost Estimate',
      items: defaultItems,
      subtotal,
      discountPercentage: 2,
      discountAmount,
      taxableAmount,
      vatPercentage,
      vatAmount,
      otherCharges: 0,
      grandTotal,
      currency: 'NPR',
      validityDays: 30,
      paymentTermsSummary: 'Payment as per verified milestone measurements; 10% advance upon contract signing.',
      preparedBy: 'Er. Sujan Karki (Cost Estimator)',
      checkedBy: 'Senior Structural Engineer',
      approvedBy: 'Managing Director',
      updatedAt: new Date().toISOString(),
    };
  };

  const [formData, setFormData] = useState<BoqQuotation>(buildInitialForm);

  useEffect(() => {
    if (isOpen) {
      setFormData(buildInitialForm());
    }
  }, [isOpen, quotationToEdit, project, selectedProjectId]);

  if (!isOpen) return null;

  // Recalculate totals
  const recalculate = (items: BoqItem[], discPct = formData.discountPercentage, vatPct = formData.vatPercentage, other = formData.otherCharges) => {
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
    const discountAmount = Math.round((subtotal * discPct) / 100);
    const taxableAmount = subtotal - discountAmount;
    const vatAmount = Math.round((taxableAmount * vatPct) / 100);
    const grandTotal = taxableAmount + vatAmount + other;

    return {
      subtotal,
      discountAmount,
      taxableAmount,
      vatAmount,
      grandTotal,
    };
  };

  const handleItemChange = (idx: number, field: keyof BoqItem, value: any) => {
    const updated = [...formData.items];
    const item = { ...updated[idx], [field]: value };

    if (field === 'quantity' || field === 'rate') {
      const q = field === 'quantity' ? parseFloat(value) || 0 : item.quantity;
      const r = field === 'rate' ? parseFloat(value) || 0 : item.rate;
      item.amount = Math.round(q * r);
    }

    updated[idx] = item;
    const calc = recalculate(updated);
    setFormData({
      ...formData,
      items: updated,
      ...calc,
    });
  };

  const handleAddItem = () => {
    const newItem: BoqItem = {
      id: `item-${Date.now()}`,
      sn: formData.items.length + 1,
      category: 'General Works',
      description: 'New construction work specification...',
      unit: 'sq.m',
      quantity: 10,
      rate: 1000,
      amount: 10000,
      remarks: '',
    };
    const updated = [...formData.items, newItem];
    const calc = recalculate(updated);
    setFormData({
      ...formData,
      items: updated,
      ...calc,
    });
  };

  const handleDuplicateItem = (idx: number) => {
    const target = formData.items[idx];
    const duplicated: BoqItem = {
      ...target,
      id: `item-${Date.now()}`,
      sn: formData.items.length + 1,
      description: `${target.description} (Copy)`,
    };
    const updated = [...formData.items, duplicated];
    const calc = recalculate(updated);
    setFormData({
      ...formData,
      items: updated,
      ...calc,
    });
  };

  const handleDeleteItem = (idx: number) => {
    const updated = formData.items
      .filter((_, i) => i !== idx)
      .map((item, i) => ({ ...item, sn: i + 1 }));
    const calc = recalculate(updated);
    setFormData({
      ...formData,
      items: updated,
      ...calc,
    });
  };

  const handleApplyCalcResult = (calcType: string, resultValue: number, unit: string) => {
    if (activeItemIndexForCalc !== null && formData.items[activeItemIndexForCalc]) {
      const updated = [...formData.items];
      const target = updated[activeItemIndexForCalc];
      target.quantity = resultValue;
      target.unit = unit;
      target.amount = Math.round(target.quantity * target.rate);
      target.remarks = `${target.remarks ? target.remarks + ' | ' : ''}Calculated via ${calcType}: ${resultValue} ${unit}`;
      updated[activeItemIndexForCalc] = target;

      const calc = recalculate(updated);
      setFormData({
        ...formData,
        items: updated,
        ...calc,
      });
    }
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = ['S.N.', 'Category', 'Description', 'Unit', 'Quantity', 'Rate (NPR)', 'Amount (NPR)', 'Remarks'];
    const rows = formData.items.map((i) => [
      i.sn,
      `"${i.category}"`,
      `"${i.description.replace(/"/g, '""')}"`,
      i.unit,
      i.quantity,
      i.rate,
      i.amount,
      `"${i.remarks || ''}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${formData.docNumber}_BOQ_Quotation.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSave = () => {
    saveBoqQuotation(formData);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
        <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[94vh]">
          {/* Header Bar */}
          <div className="bg-[#0B0F19] text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center border border-[#FF6B00]/30">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white tracking-wide">
                    Bill of Quantities (BOQ) & Cost Estimation
                  </h2>
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#FF6B00] text-white">
                    {formData.docNumber}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">({formData.revision})</span>
                </div>
                <p className="text-xs text-neutral-400">
                  Itemized construction measurements, statutory VAT calculation & engineering rates
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
                  <span>BOQ Table</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5 transition-colors ${
                    activeTab === 'preview' ? 'bg-[#FF6B00] text-white shadow-xs' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Official Quotation</span>
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

          {/* Main Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-neutral-50/50">
            {activeTab === 'edit' ? (
              <div className="space-y-6">
                {/* Meta Control Bar */}
                <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-neutral-600 uppercase mb-1">
                      Quotation Title / Description
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-bold text-[#0F172A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-600 uppercase mb-1">
                      Estimation Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-600 uppercase mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as DocumentStatus })}
                      className="w-full px-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-bold"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Correction Required">Correction Required</option>
                      <option value="Final">Final</option>
                      <option value="Approved">Approved</option>
                    </select>
                  </div>
                </div>

                {/* BOQ Items Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-neutral-200 shadow-xs">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleAddItem}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FF6B00] hover:bg-[#E04800] text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Work Item</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveItemIndexForCalc(formData.items.length > 0 ? 0 : null);
                        setIsCalculatorOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-semibold transition-colors"
                    >
                      <Calculator className="w-3.5 h-3.5 text-[#FF6B00]" />
                      <span>Area / Volume Calculator</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleExportCsv}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-semibold transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-[#0B0F19] text-white uppercase text-[11px] font-bold">
                        <tr>
                          <th className="px-3 py-3 w-12 text-center">S.N.</th>
                          <th className="px-3 py-3 w-36">Category</th>
                          <th className="px-3 py-3">Work / Material Description</th>
                          <th className="px-3 py-3 w-20 text-center">Unit</th>
                          <th className="px-3 py-3 w-24 text-right">Quantity</th>
                          <th className="px-3 py-3 w-28 text-right">Rate (NPR)</th>
                          <th className="px-3 py-3 w-32 text-right">Amount (NPR)</th>
                          <th className="px-2 py-3 w-20 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {formData.items.map((item, idx) => (
                          <tr key={item.id} className="hover:bg-neutral-50/80 transition-colors">
                            <td className="px-3 py-2 text-center font-mono font-bold text-neutral-500">
                              {idx + 1}
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={item.category || ''}
                                onChange={(e) => handleItemChange(idx, 'category', e.target.value)}
                                className="w-full px-2 py-1 border border-neutral-200 rounded text-xs font-semibold text-neutral-800"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <textarea
                                rows={2}
                                value={item.description}
                                onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                                className="w-full px-2 py-1 border border-neutral-200 rounded text-xs text-neutral-800 leading-tight focus:border-[#FF6B00]"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="text"
                                value={item.unit}
                                onChange={(e) => handleItemChange(idx, 'unit', e.target.value)}
                                className="w-full px-2 py-1 border border-neutral-200 rounded text-center text-xs font-mono font-medium"
                              />
                            </td>
                            <td className="px-3 py-2">
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  step="any"
                                  value={item.quantity}
                                  onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                                  className="w-full px-2 py-1 border border-neutral-200 rounded text-right font-mono font-bold text-xs"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveItemIndexForCalc(idx);
                                    setIsCalculatorOpen(true);
                                  }}
                                  title="Calculate quantity"
                                  className="p-1 hover:bg-neutral-100 text-neutral-500 rounded"
                                >
                                  <Calculator className="w-3 h-3 text-[#FF6B00]" />
                                </button>
                              </div>
                            </td>
                            <td className="px-3 py-2">
                              <input
                                type="number"
                                step="any"
                                value={item.rate}
                                onChange={(e) => handleItemChange(idx, 'rate', e.target.value)}
                                className="w-full px-2 py-1 border border-neutral-200 rounded text-right font-mono font-bold text-xs"
                              />
                            </td>
                            <td className="px-3 py-2 text-right font-mono font-bold text-xs text-[#0F172A]">
                              Rs. {item.amount.toLocaleString()}
                            </td>
                            <td className="px-2 py-2">
                              <div className="flex items-center justify-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => handleDuplicateItem(idx)}
                                  className="p-1 text-neutral-400 hover:text-neutral-700 transition-colors"
                                  title="Duplicate"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteItem(idx)}
                                  disabled={formData.items.length <= 1}
                                  className="p-1 text-neutral-400 hover:text-red-500 transition-colors disabled:opacity-30"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* BOQ Summary Card */}
                  <div className="bg-neutral-50 p-4 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 text-xs">
                      <label className="block font-bold text-neutral-700 uppercase">
                        Quotation Validity & Payment Summary
                      </label>
                      <textarea
                        rows={2}
                        value={formData.paymentTermsSummary}
                        onChange={(e) => setFormData({ ...formData, paymentTermsSummary: e.target.value })}
                        className="w-full px-3 py-1.5 border border-neutral-300 rounded-lg text-xs"
                      />
                      <div className="flex items-center gap-2 text-neutral-600">
                        <span>Validity Period:</span>
                        <input
                          type="number"
                          value={formData.validityDays}
                          onChange={(e) => setFormData({ ...formData, validityDays: parseInt(e.target.value) || 30 })}
                          className="w-16 px-2 py-1 border border-neutral-300 rounded font-bold text-center"
                        />
                        <span>Days from quotation date</span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-neutral-200 space-y-2 text-xs">
                      <div className="flex justify-between text-neutral-600">
                        <span>Subtotal (Items 1 to {formData.items.length}):</span>
                        <span className="font-mono font-bold text-neutral-900">
                          NPR {formData.subtotal.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2 text-neutral-600">
                        <div className="flex items-center gap-1">
                          <span>Discount:</span>
                          <input
                            type="number"
                            value={formData.discountPercentage}
                            onChange={(e) => {
                              const pct = parseFloat(e.target.value) || 0;
                              const calc = recalculate(formData.items, pct, formData.vatPercentage);
                              setFormData({ ...formData, discountPercentage: pct, ...calc });
                            }}
                            className="w-14 px-1.5 py-0.5 border border-neutral-300 rounded text-center font-bold"
                          />
                          <span>%</span>
                        </div>
                        <span className="font-mono text-neutral-700">
                          - NPR {formData.discountAmount.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between font-semibold text-neutral-700 pt-1 border-t border-neutral-100">
                        <span>Taxable Amount:</span>
                        <span className="font-mono">NPR {formData.taxableAmount.toLocaleString()}</span>
                      </div>

                      <div className="flex items-center justify-between gap-2 text-neutral-600">
                        <div className="flex items-center gap-1">
                          <span>Nepal VAT:</span>
                          <input
                            type="number"
                            value={formData.vatPercentage}
                            onChange={(e) => {
                              const vat = parseFloat(e.target.value) || 0;
                              const calc = recalculate(formData.items, formData.discountPercentage, vat);
                              setFormData({ ...formData, vatPercentage: vat, ...calc });
                            }}
                            className="w-14 px-1.5 py-0.5 border border-neutral-300 rounded text-center font-bold"
                          />
                          <span>%</span>
                        </div>
                        <span className="font-mono text-neutral-700">
                          + NPR {formData.vatAmount.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t-2 border-neutral-200">
                        <span className="font-extrabold text-sm text-[#0F172A]">Grand Total (NPR):</span>
                        <span className="font-mono font-extrabold text-base text-[#FF6B00]">
                          Rs. {formData.grandTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <LegalDisclaimerBox documentType="BOQ & Cost Estimate" />
              </div>
            ) : (
              /* FORMAL PRINT VIEW */
              <div className="bg-white p-6 sm:p-10 rounded-xl shadow-lg border border-neutral-300 max-w-5xl mx-auto text-[#0F172A]">
                <DocumentPrintHeaderFooter
                  docNumber={formData.docNumber}
                  revision={formData.revision}
                  date={formData.date}
                  docTitle="BILL OF QUANTITIES & ENGINEERING ESTIMATE"
                  project={currentProject}
                  status={formData.status}
                />

                <div className="my-6 space-y-4">
                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 text-xs grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <span className="text-neutral-500 block">Client / Owner:</span>
                      <strong className="text-neutral-900">{currentProject?.clientOwner}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Project Site:</span>
                      <strong>
                        {currentProject?.location.localLevelName}-{currentProject?.location.wardNo},{' '}
                        {currentProject?.location.districtName}
                      </strong>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Plot Area / Kitta:</span>
                      <strong>
                        {currentProject?.land.plotArea} (Kitta: {currentProject?.land.kittaNo})
                      </strong>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Quotation Validity:</span>
                      <strong>{formData.validityDays} Days</strong>
                    </div>
                  </div>

                  {/* Clean Table for Print */}
                  <table className="w-full text-xs border border-neutral-300">
                    <thead className="bg-neutral-100 text-neutral-800 font-bold">
                      <tr>
                        <th className="border border-neutral-300 p-2 text-center w-12">S.N.</th>
                        <th className="border border-neutral-300 p-2 text-left">Work / Material Description</th>
                        <th className="border border-neutral-300 p-2 text-center w-16">Unit</th>
                        <th className="border border-neutral-300 p-2 text-right w-20">Quantity</th>
                        <th className="border border-neutral-300 p-2 text-right w-24">Rate (NPR)</th>
                        <th className="border border-neutral-300 p-2 text-right w-28">Amount (NPR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="border border-neutral-300 p-1.5 text-center font-mono">{idx + 1}</td>
                          <td className="border border-neutral-300 p-1.5">
                            <span className="font-semibold text-neutral-900 block">{item.category}</span>
                            <span className="text-neutral-700">{item.description}</span>
                            {item.remarks && (
                              <span className="block text-[10px] text-neutral-500 italic mt-0.5">
                                Note: {item.remarks}
                              </span>
                            )}
                          </td>
                          <td className="border border-neutral-300 p-1.5 text-center font-mono">{item.unit}</td>
                          <td className="border border-neutral-300 p-1.5 text-right font-mono">
                            {item.quantity.toLocaleString()}
                          </td>
                          <td className="border border-neutral-300 p-1.5 text-right font-mono">
                            {item.rate.toLocaleString()}
                          </td>
                          <td className="border border-neutral-300 p-1.5 text-right font-mono font-semibold">
                            Rs. {item.amount.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="font-bold bg-neutral-50 text-xs">
                      <tr>
                        <td colSpan={5} className="border border-neutral-300 p-1.5 text-right">
                          Subtotal:
                        </td>
                        <td className="border border-neutral-300 p-1.5 text-right font-mono">
                          Rs. {formData.subtotal.toLocaleString()}
                        </td>
                      </tr>
                      {formData.discountAmount > 0 && (
                        <tr>
                          <td colSpan={5} className="border border-neutral-300 p-1.5 text-right font-normal">
                            Discount ({formData.discountPercentage}%):
                          </td>
                          <td className="border border-neutral-300 p-1.5 text-right font-mono text-neutral-600">
                            - Rs. {formData.discountAmount.toLocaleString()}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td colSpan={5} className="border border-neutral-300 p-1.5 text-right">
                          Taxable Amount:
                        </td>
                        <td className="border border-neutral-300 p-1.5 text-right font-mono">
                          Rs. {formData.taxableAmount.toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={5} className="border border-neutral-300 p-1.5 text-right font-normal">
                          VAT ({formData.vatPercentage}%):
                        </td>
                        <td className="border border-neutral-300 p-1.5 text-right font-mono">
                          + Rs. {formData.vatAmount.toLocaleString()}
                        </td>
                      </tr>
                      <tr className="bg-neutral-100 text-sm">
                        <td colSpan={5} className="border border-neutral-300 p-2 text-right font-extrabold text-[#0F172A]">
                          Grand Total (Nepalese Rupees):
                        </td>
                        <td className="border border-neutral-300 p-2 text-right font-mono font-extrabold text-[#FF6B00]">
                          Rs. {formData.grandTotal.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>

                  {/* Signatures */}
                  <div className="pt-8 mt-6 border-t-2 border-neutral-300 grid grid-cols-3 gap-6 text-xs text-center">
                    <div>
                      <div className="h-16 border-b border-dashed border-neutral-400 flex items-end justify-center pb-1">
                        <span className="font-serif italic text-neutral-700">Er. Sujan Karki</span>
                      </div>
                      <p className="font-bold mt-2 text-neutral-900">Prepared By</p>
                      <p className="text-neutral-500">Cost Estimator / Quantity Surveyor</p>
                    </div>
                    <div>
                      <div className="h-16 border-b border-dashed border-neutral-400 flex items-end justify-center pb-1">
                        <span className="font-serif italic text-neutral-700">Checked</span>
                      </div>
                      <p className="font-bold mt-2 text-neutral-900">Checked By</p>
                      <p className="text-neutral-500">Chief Engineering Division</p>
                    </div>
                    <div>
                      <div className="h-16 border-b border-dashed border-neutral-400 flex items-end justify-center pb-1">
                        <span className="font-serif italic text-neutral-700">Approved</span>
                      </div>
                      <p className="font-bold mt-2 text-neutral-900">Approved By</p>
                      <p className="text-neutral-500">Authorized Signatory - Kyoly</p>
                    </div>
                  </div>
                </div>

                <LegalDisclaimerBox documentType="BOQ & Cost Estimate" />
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="bg-white px-6 py-3.5 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <DocumentStatusBadge status={formData.status} />
              <span className="text-xs text-neutral-500">
                Total Estimate:{' '}
                <strong className="text-neutral-900 font-mono">NPR {formData.grandTotal.toLocaleString()}</strong>
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
                  <span>Print BOQ</span>
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
                <span>Save BOQ</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Area Calculator Modal */}
      <AreaCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onApplyResult={handleApplyCalcResult}
      />
    </>
  );
};
