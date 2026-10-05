import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import {
  ShieldAlert,
  ShieldCheck,
  HardHat,
  Zap,
  AlertTriangle,
  FileCheck2,
  HeartPulse,
  Flame,
  CheckCircle,
  Eye,
  Radio,
} from 'lucide-react';

export const SafetyPage: React.FC = () => {
  const safetyProtocols = [
    {
      category: 'High-Voltage Electrical Safety',
      icon: Zap,
      accentColor: '#F4511E',
      rules: [
        'Mandatory Lockout / Tagout (LOTO) protocols with dual-padlock isolation before working on any grid feeder.',
        'Use of certified discharge earthing rods with insulated handles to eliminate capacitive residual charge.',
        'Enforcement of safe approach distance limits: minimum 3.0m clearance for 33kV and 5.0m for 132kV lines.',
        'Arc-flash protective rated suits (CAT 4 / 40 cal/cm2) worn during all breaker racking and primary testing.',
      ],
    },
    {
      category: 'Working at Heights & Tower Erection',
      icon: HardHat,
      accentColor: '#D6A548',
      rules: [
        '100% tie-off mandatory using twin-lanyard energy absorbing fall arresters on all transmission lattice towers.',
        'Independent safety lifeline ropes rigged during gin-pole and crane hoisting operations.',
        'Suspension of climbing operations during high wind speeds (> 35 km/h), lightning, or heavy torrential rainfall.',
        'Daily visual inspection of wire-rope slings, shackles, and mechanical derrick winches before load lifting.',
      ],
    },
    {
      category: 'Deep Excavation & Foundation Civil Safety',
      icon: AlertTriangle,
      accentColor: '#F4511E',
      rules: [
        'Trench shoring and soil benching implemented on all excavations deeper than 1.5 meters.',
        'Barricading with high-visibility reflective tape and warning strobe beacons around open substation pits.',
        'Underground utility mapping via electromagnetic pipe/cable locators prior to mechanical backhoe excavation.',
        'Dewatering pump supervision and gas testing in deep confined basement pits in high water-table soils.',
      ],
    },
    {
      category: 'Health, Environment & Emergency Preparedness',
      icon: HeartPulse,
      accentColor: '#D6A548',
      rules: [
        'First-aid station and trained certified emergency responder permanently stationed at every active site.',
        'Emergency vehicle with dedicated driver on standby for rapid medical evacuation in remote mountain zones.',
        'Strict spill containment trays beneath power transformer oil filtration units to prevent soil contamination.',
        'Noise attenuation baffles and dust suppression water spraying near residential commercial zones.',
      ],
    },
  ];

  const ppeItems = [
    { name: 'Industrial Safety Helmet', spec: 'EN 397 / Type 1 Class E (tested to 20,000V)' },
    { name: 'Full Body Harness', spec: 'EN 361 dual-lanyard shock absorbing' },
    { name: 'Dielectric High-Voltage Gloves', spec: 'Class 4 (tested to 36kV working)' },
    { name: 'Steel-Toe Protective Footwear', spec: 'EN ISO 20345 / 200J toe impact + anti-perforation plate' },
    { name: 'High-Visibility Safety Vest', spec: 'EN ISO 20471 Class 2 reflective' },
    { name: 'Eye & Face Shield', spec: 'ANSI Z87.1 anti-scratch & UV400 rated' },
  ];

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="bg-[#171717] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b-4 border-[#D6A548] relative overflow-hidden">
        <div className="absolute inset-0 engineering-grid-dark opacity-60" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F4511E]/15 border border-[#F4511E]/30 text-xs font-mono text-[#F4511E] uppercase tracking-wider">
              <span>ZERO HARM COMMITMENT · HSE POLICY</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-['Outfit'] tracking-tight text-white">
              Health, Safety & Environment
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light">
              Safety is not an operational afterthought at Kyoly Construction—it is our core engineering parameter across all live electrical grids, mountain towers, and civil sites.
            </p>
          </div>
        </div>
      </section>

      {/* Zero Harm Golden Rule */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#F5F5F5] rounded-2xl border-2 border-[#D6A548] p-8 sm:p-12 relative overflow-hidden mb-16 shadow-xs">
            <div className="absolute top-0 right-0 w-48 h-48 engineering-diagonal-pattern opacity-20" />
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#F4511E] text-white flex items-center justify-center">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#D6A548] font-bold uppercase tracking-wider">
                    Our Uncompromising Foundation
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-[#202124]">
                    The Zero Harm Golden Rule
                  </h2>
                </div>
              </div>

              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                Every engineer, technician, rigger, and site worker at Kyoly Construction possesses the absolute contractual right and ethical mandate to <strong>immediately halt any construction activity</strong> if conditions appear unsafe or deviate from established high-voltage or structural safety protocols.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#202124]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#F4511E]" />
                  <span>100% Daily Toolbox Talks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#D6A548]" />
                  <span>Routine Calibrated PPE Audits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600]" />
                  <span>Nepal Labor Act & OSHA Compliant</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Detailed Safety Protocols */}
          <SectionHeading
            kicker="Protocols & Governance"
            title="Domain Safety Standards"
            subtitle="Engineered risk mitigation for live substations, high-altitude lattice rigging, and deep civil foundations."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {safetyProtocols.map((protocol, idx) => {
              const Icon = protocol.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-xl bg-white border border-neutral-200 shadow-xs hover:border-[#D6A548] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${protocol.accentColor}18`, color: protocol.accentColor }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold font-['Outfit'] text-[#202124]">
                      {protocol.category}
                    </h3>
                  </div>

                  <ul className="space-y-3 text-xs text-neutral-600 leading-relaxed">
                    {protocol.rules.map((rule, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D6A548] shrink-0 mt-1.5" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* PPE Inventory Standards */}
          <div>
            <SectionHeading
              kicker="Gear Standards"
              title="Mandatory Personal Protective Equipment"
              subtitle="All workers and site visitors must be fully equipped before passing the perimeter gate."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ppeItems.map((item, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-[#F5F5F5] border border-neutral-200 flex flex-col justify-between">
                  <div className="flex items-center gap-2 mb-2">
                    <HardHat className="w-4 h-4 text-[#D6A548]" />
                    <span className="text-xs font-bold text-[#202124] font-['Outfit']">{item.name}</span>
                  </div>
                  <div className="text-[11px] font-mono text-neutral-600 bg-white p-2 rounded border border-neutral-200">
                    {item.spec}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
