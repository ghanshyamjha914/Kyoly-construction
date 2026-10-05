import React, { useState } from 'react';
import { X, Calculator, Ruler, Layers, ShieldAlert, Check } from 'lucide-react';

interface AreaCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyResult?: (calcType: string, resultValue: number, unit: string) => void;
}

type CalculationMode =
  | 'floor-area'
  | 'wall-area'
  | 'plaster-area'
  | 'painting-area'
  | 'concrete-volume'
  | 'excavation-volume';

export const AreaCalculatorModal: React.FC<AreaCalculatorModalProps> = ({
  isOpen,
  onClose,
  onApplyResult,
}) => {
  const [mode, setMode] = useState<CalculationMode>('floor-area');

  // Input states in meters or feet
  const [unitSystem, setUnitSystem] = useState<'meters' | 'feet'>('feet');
  const [length, setLength] = useState<number>(30);
  const [width, setWidth] = useState<number>(20);
  const [height, setHeight] = useState<number>(10);
  const [quantity, setQuantity] = useState<number>(1);
  const [deductions, setDeductions] = useState<number>(0); // openings / windows deduction

  if (!isOpen) return null;

  // Conversions & calculations
  const calculateResult = () => {
    const l = Math.max(0, length);
    const w = Math.max(0, width);
    const h = Math.max(0, height);
    const q = Math.max(1, quantity);
    const ded = Math.max(0, deductions);

    switch (mode) {
      case 'floor-area': {
        const area = l * w * q - ded;
        return {
          value: Math.max(0, area),
          unit: unitSystem === 'feet' ? 'sq.ft' : 'sq.m',
          title: 'Total Net Floor Area',
          formula: `(${l} × ${w} × ${q}) - ${ded}`,
          nepaliUnits:
            unitSystem === 'feet'
              ? `${(area / 342.25).toFixed(2)} Aana / ${(area / 5476).toFixed(2)} Ropani`
              : `${(area * 10.7639 / 342.25).toFixed(2)} Aana`,
        };
      }
      case 'wall-area': {
        // 2 * (L + W) * H
        const perimeter = 2 * (l + w);
        const area = perimeter * h * q - ded;
        return {
          value: Math.max(0, area),
          unit: unitSystem === 'feet' ? 'sq.ft' : 'sq.m',
          title: 'Total Wall Surface Area',
          formula: `2 × (${l} + ${w}) × ${h} × ${q} - ${ded}`,
          nepaliUnits: 'Standard wall masonry / shuttering contact area',
        };
      }
      case 'plaster-area': {
        // Both faces + ceiling option
        const wallArea = 2 * (l + w) * h * q - ded;
        const ceilingArea = l * w * q;
        const totalPlaster = wallArea + ceilingArea;
        return {
          value: Math.max(0, totalPlaster),
          unit: unitSystem === 'feet' ? 'sq.ft' : 'sq.m',
          title: 'Total Internal Plaster Area (Walls + Ceiling)',
          formula: `Wall Area (${wallArea.toFixed(1)}) + Ceiling (${ceilingArea.toFixed(1)})`,
          nepaliUnits: 'Recommended cement mortar 1:4 (12.5mm thickness)',
        };
      }
      case 'painting-area': {
        const wallArea = 2 * (l + w) * h * q - ded;
        const ceilingArea = l * w * q;
        const totalArea = wallArea + ceilingArea;
        return {
          value: Math.max(0, totalArea),
          unit: unitSystem === 'feet' ? 'sq.ft' : 'sq.m',
          title: 'Total Surface Painting Area (2 Primer + 2 Coats)',
          formula: `Walls + Ceiling (${totalArea.toFixed(1)})`,
          nepaliUnits: `Est. Paint needed: ~${(totalArea / (unitSystem === 'feet' ? 90 : 8.5)).toFixed(1)} Litres`,
        };
      }
      case 'concrete-volume': {
        // L * W * H * Q
        const vol = l * w * h * q;
        return {
          value: vol,
          unit: unitSystem === 'feet' ? 'cu.ft (cft)' : 'cu.m',
          title: 'Total Reinforced Concrete Volume',
          formula: `${l} × ${w} × ${h} × ${q}`,
          nepaliUnits:
            unitSystem === 'feet'
              ? `${(vol / 35.3147).toFixed(2)} cu.m (M25 mix: ~${Math.ceil((vol / 35.3147) * 8.2)} Cement Bags)`
              : `${(vol * 35.3147).toFixed(1)} cft (M25 mix: ~${Math.ceil(vol * 8.2)} Cement Bags)`,
        };
      }
      case 'excavation-volume': {
        const vol = l * w * h * q;
        return {
          value: vol,
          unit: unitSystem === 'feet' ? 'cu.ft (cft)' : 'cu.m',
          title: 'Total Earthwork Soil Excavation Volume',
          formula: `${l} × ${w} × ${h} × ${q}`,
          nepaliUnits:
            unitSystem === 'feet'
              ? `${(vol / 35.3147).toFixed(2)} cu.m (~${Math.ceil(vol / (35.3147 * 5))} Tipper Trips)`
              : `${vol.toFixed(2)} cu.m (~${Math.ceil(vol / 5)} Tipper Trips)`,
        };
      }
    }
  };

  const result = calculateResult();

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl border border-neutral-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0F172A] text-white p-5 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center border border-[#FF6B00]/30">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF6B00]">
                Engineering Measurement Aid
              </div>
              <h3 className="text-lg font-black font-['Outfit'] text-white">
                Construction Area & Quantity Calculator
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

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Mode Selector Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-neutral-100 rounded-xl">
            {[
              { id: 'floor-area', label: 'Floor Area' },
              { id: 'wall-area', label: 'Wall Area' },
              { id: 'plaster-area', label: 'Plaster Area' },
              { id: 'painting-area', label: 'Painting Area' },
              { id: 'concrete-volume', label: 'Concrete Volume' },
              { id: 'excavation-volume', label: 'Excavation' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setMode(tab.id as CalculationMode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  mode === tab.id
                    ? 'bg-white text-[#0F172A] shadow-xs border border-neutral-200'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Unit Toggle: Feet vs Meters */}
          <div className="flex items-center justify-between text-xs border-b border-neutral-200 pb-3">
            <span className="font-semibold text-neutral-700">Preferred Unit System:</span>
            <div className="inline-flex rounded-lg border border-neutral-300 p-0.5 bg-neutral-100">
              <button
                type="button"
                onClick={() => setUnitSystem('feet')}
                className={`px-3 py-1 rounded-md font-bold text-xs cursor-pointer ${
                  unitSystem === 'feet' ? 'bg-[#FF6B00] text-white shadow-xs' : 'text-neutral-700 hover:text-black'
                }`}
              >
                Imperial (Feet / sq.ft / cft)
              </button>
              <button
                type="button"
                onClick={() => setUnitSystem('meters')}
                className={`px-3 py-1 rounded-md font-bold text-xs cursor-pointer ${
                  unitSystem === 'meters' ? 'bg-[#FF6B00] text-white shadow-xs' : 'text-neutral-700 hover:text-black'
                }`}
              >
                Metric (Meters / sq.m / cu.m)
              </button>
            </div>
          </div>

          {/* Dimension Inputs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                Length ({unitSystem === 'feet' ? 'ft' : 'm'})
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={length}
                onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-bold text-[#0F172A] focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                Width / Breadth ({unitSystem === 'feet' ? 'ft' : 'm'})
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={width}
                onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-bold text-[#0F172A] focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
              />
            </div>

            {(mode === 'wall-area' ||
              mode === 'plaster-area' ||
              mode === 'painting-area' ||
              mode === 'concrete-volume' ||
              mode === 'excavation-volume') && (
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                  Height / Depth ({unitSystem === 'feet' ? 'ft' : 'm'})
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={height}
                  onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-bold text-[#0F172A] focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                Quantity / Number
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-bold text-[#0F172A] focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
              />
            </div>

            {(mode === 'floor-area' || mode === 'wall-area' || mode === 'plaster-area' || mode === 'painting-area') && (
              <div className="col-span-2 sm:col-span-4">
                <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                  Deductions (Openings, Doors, Windows, Cut-outs in {unitSystem === 'feet' ? 'sq.ft' : 'sq.m'})
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={deductions}
                  onChange={(e) => setDeductions(parseFloat(e.target.value) || 0)}
                  placeholder="e.g. 48 sq.ft for standard door and window"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-neutral-800 focus:ring-2 focus:ring-[#FF6B00] focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Results Display Box */}
          <div className="rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 text-white p-5 border border-neutral-700 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono text-[#FF6B00] uppercase font-bold tracking-wider">
                  {result.title}
                </span>
                <div className="text-3xl font-black font-['Outfit'] text-white mt-1">
                  {result.value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}{' '}
                  <span className="text-lg font-mono text-neutral-400 font-normal">{result.unit}</span>
                </div>
                <div className="text-xs text-neutral-400 font-mono mt-1">Formula: {result.formula}</div>
              </div>

              {result.nepaliUnits && (
                <div className="sm:border-l sm:pl-4 border-neutral-700 text-right sm:text-left">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">Context / Equivalent</div>
                  <div className="text-xs font-bold text-amber-400 mt-0.5">{result.nepaliUnits}</div>
                </div>
              )}
            </div>
          </div>

          {/* Mandatory Specific Disclaimer */}
          <div className="rounded-lg bg-amber-50 border border-amber-300 p-3 text-[11px] text-amber-900 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong>Measurement Disclaimer:</strong> Measurements are calculation aids and must be verified against approved
              drawings and actual site measurements.
            </p>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-neutral-900 cursor-pointer"
            >
              Close
            </button>
            {onApplyResult && (
              <button
                type="button"
                onClick={() => {
                  onApplyResult(mode, result.value, result.unit);
                  onClose();
                }}
                className="px-5 py-2.5 bg-[#FF6B00] hover:bg-[#E04800] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Apply to Form / BOQ</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
