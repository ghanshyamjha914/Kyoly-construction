import React, { useMemo } from 'react';
import { LocationSnapshot, MasterLocalLevel } from '../types';
import { useConstructionDocuments } from '../context/ConstructionDocumentsContext';
import { getDistrictsByProvince, getLocalLevelsByDistrict, getWardsArray } from '../data/nepalLocationData';
import { MapPin, Navigation, Building2, Home } from 'lucide-react';

interface NepalLocationSelectorProps {
  value: LocationSnapshot;
  onChange: (updated: LocationSnapshot) => void;
  disabled?: boolean;
}

export const NepalLocationSelector: React.FC<NepalLocationSelectorProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  const { masterProvinces, masterDistricts, masterLocalLevels } = useConstructionDocuments();

  // Filter districts available for current province
  const availableDistricts = useMemo(() => {
    return getDistrictsByProvince(value.provinceId, masterDistricts);
  }, [value.provinceId, masterDistricts]);

  // Filter local levels available for current district
  const availableLocalLevels = useMemo(() => {
    return getLocalLevelsByDistrict(value.districtId, masterLocalLevels);
  }, [value.districtId, masterLocalLevels]);

  // Find active local level to determine maximum wards
  const currentLocalLevel = useMemo(() => {
    return masterLocalLevels.find((ll) => ll.id === value.localLevelId);
  }, [value.localLevelId, masterLocalLevels]);

  const wardsList = useMemo(() => {
    const total = currentLocalLevel?.totalWards || 15;
    return getWardsArray(total);
  }, [currentLocalLevel]);

  // Handlers for cascading selection
  const handleProvinceChange = (provinceId: string) => {
    const prov = masterProvinces.find((p) => p.id === provinceId);
    if (!prov) return;

    const nextDistricts = getDistrictsByProvince(prov.id, masterDistricts);
    const defaultDistrict = nextDistricts[0];
    const nextLocalLevels = defaultDistrict ? getLocalLevelsByDistrict(defaultDistrict.id, masterLocalLevels) : [];
    const defaultLocalLevel = nextLocalLevels[0];

    onChange({
      ...value,
      provinceId: prov.id,
      provinceName: prov.name,
      provinceNameNepali: prov.nameNepali,
      districtId: defaultDistrict ? defaultDistrict.id : '',
      districtName: defaultDistrict ? defaultDistrict.name : '',
      districtNameNepali: defaultDistrict ? defaultDistrict.nameNepali : '',
      localLevelId: defaultLocalLevel ? defaultLocalLevel.id : '',
      localLevelName: defaultLocalLevel ? defaultLocalLevel.name : '',
      localLevelNameNepali: defaultLocalLevel ? defaultLocalLevel.nameNepali : '',
      localLevelType: defaultLocalLevel ? defaultLocalLevel.type : 'Municipality',
      wardNo: 1,
    });
  };

  const handleDistrictChange = (districtId: string) => {
    const dist = masterDistricts.find((d) => d.id === districtId);
    if (!dist) return;

    const nextLocalLevels = getLocalLevelsByDistrict(dist.id, masterLocalLevels);
    const defaultLocalLevel = nextLocalLevels[0];

    onChange({
      ...value,
      districtId: dist.id,
      districtName: dist.name,
      districtNameNepali: dist.nameNepali,
      localLevelId: defaultLocalLevel ? defaultLocalLevel.id : '',
      localLevelName: defaultLocalLevel ? defaultLocalLevel.name : '',
      localLevelNameNepali: defaultLocalLevel ? defaultLocalLevel.nameNepali : '',
      localLevelType: defaultLocalLevel ? defaultLocalLevel.type : 'Municipality',
      wardNo: 1,
    });
  };

  const handleLocalLevelChange = (localLevelId: string) => {
    const ll = masterLocalLevels.find((l) => l.id === localLevelId);
    if (!ll) return;

    onChange({
      ...value,
      localLevelId: ll.id,
      localLevelName: ll.name,
      localLevelNameNepali: ll.nameNepali,
      localLevelType: ll.type,
      wardNo: Math.min(value.wardNo || 1, ll.totalWards),
    });
  };

  return (
    <div className="space-y-4 p-4 rounded-xl bg-neutral-50/80 border border-neutral-200">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-2.5">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#FF6B00]" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] font-mono">
            Administrative Location (Nepal Government / MoFAGA Reference)
          </h4>
        </div>
        <span className="text-[10px] text-neutral-500 font-mono">
          Hierarchy: Province → District → Local Level → Ward
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* 1. PROVINCE */}
        <div>
          <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
            1. Province *
          </label>
          <select
            disabled={disabled}
            value={value.provinceId}
            onChange={(e) => handleProvinceChange(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 bg-white font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] disabled:bg-neutral-100 disabled:text-neutral-500 cursor-pointer"
          >
            {masterProvinces.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.name} ({prov.nameNepali})
              </option>
            ))}
          </select>
        </div>

        {/* 2. DISTRICT */}
        <div>
          <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
            2. District ({availableDistricts.length}) *
          </label>
          <select
            disabled={disabled}
            value={value.districtId}
            onChange={(e) => handleDistrictChange(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 bg-white font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] disabled:bg-neutral-100 disabled:text-neutral-500 cursor-pointer"
          >
            {availableDistricts.map((dist) => (
              <option key={dist.id} value={dist.id}>
                {dist.name} ({dist.nameNepali})
              </option>
            ))}
          </select>
        </div>

        {/* 3. LOCAL LEVEL */}
        <div>
          <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
            3. Local Level / Municipality *
          </label>
          <select
            disabled={disabled}
            value={value.localLevelId}
            onChange={(e) => handleLocalLevelChange(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 bg-white font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] disabled:bg-neutral-100 disabled:text-neutral-500 cursor-pointer"
          >
            {availableLocalLevels.map((ll) => (
              <option key={ll.id} value={ll.id}>
                {ll.name} ({ll.type})
              </option>
            ))}
          </select>
          {currentLocalLevel && (
            <span className="text-[10px] text-neutral-500 block mt-0.5 truncate font-mono">
              {currentLocalLevel.nameNepali} · {currentLocalLevel.totalWards} Wards
            </span>
          )}
        </div>

        {/* 4. WARD NUMBER */}
        <div>
          <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1">
            4. Ward No. *
          </label>
          <select
            disabled={disabled}
            value={value.wardNo}
            onChange={(e) => onChange({ ...value, wardNo: parseInt(e.target.value, 10) || 1 })}
            className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 bg-white font-bold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] disabled:bg-neutral-100 disabled:text-neutral-500 cursor-pointer"
          >
            {wardsList.map((w) => (
              <option key={w} value={w}>
                Ward {w} (वडा नं. {w})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Street / Tole & House No. (Always Editable) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
        <div className="sm:col-span-2">
          <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1 flex items-center gap-1.5">
            <Navigation className="w-3 h-3 text-[#FF6B00]" />
            <span>Street / Tole / Area Name * (Editable)</span>
          </label>
          <input
            type="text"
            disabled={disabled}
            value={value.streetTole}
            onChange={(e) => onChange({ ...value, streetTole: e.target.value })}
            placeholder="e.g. Chunikhel Marg, Hattigauda / Madan Bhandari Path"
            className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 bg-white text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] disabled:bg-neutral-100"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-[#0F172A] uppercase mb-1 flex items-center gap-1.5">
            <Home className="w-3 h-3 text-[#FF6B00]" />
            <span>House / Building No. / Landmark</span>
          </label>
          <input
            type="text"
            disabled={disabled}
            value={value.houseBuildingNo || ''}
            onChange={(e) => onChange({ ...value, houseBuildingNo: e.target.value })}
            placeholder="e.g. House No. 142 / Plot B-18"
            className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 bg-white text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] disabled:bg-neutral-100"
          />
        </div>
      </div>

      {/* Active Location String Preview */}
      <div className="bg-white rounded-lg p-2.5 border border-neutral-200 text-xs text-neutral-700 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-bold uppercase text-neutral-400">Formatted Address:</span>
          <span className="font-semibold text-[#0F172A]">
            {value.streetTole ? `${value.streetTole}, ` : ''}
            Ward {value.wardNo}, {value.localLevelName}, {value.districtName}, {value.provinceName}, Nepal
          </span>
        </div>
        {value.snapshotTimestamp && (
          <span className="text-[10px] font-mono text-neutral-400">
            Snapshot: {new Date(value.snapshotTimestamp).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};
