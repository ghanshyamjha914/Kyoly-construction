import React from 'react';

interface EngineeringVisualProps {
  type: 'transmission' | 'substation' | 'distribution' | 'building' | 'civil' | 'design' | 'design-estimation' | 'mep' | 'inspection' | 'transformer';
  className?: string;
  overlayText?: string;
  badge?: string;
  interactive?: boolean;
}

export const EngineeringVisual: React.FC<EngineeringVisualProps> = ({
  type,
  className = 'w-full h-full min-h-[220px]',
  overlayText,
  badge,
  interactive = false,
}) => {
  return (
    <div
      className={`relative overflow-hidden bg-[#141414] select-none flex items-center justify-center ${className} ${
        interactive ? 'group' : ''
      }`}
    >
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 engineering-grid-dark opacity-75" />

      {/* Subtle Engineering Diagonal Accent in Corner */}
      <div className="absolute top-0 right-0 w-24 h-24 engineering-diagonal-pattern opacity-30 pointer-events-none" />

      {/* SVG Schematics for each Domain Type */}
      <div className="relative w-full h-full flex items-center justify-center p-4">
        {type === 'transmission' && (
          <svg viewBox="0 0 600 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-[360px]">
            <defs>
              <linearGradient id="skyGradTrans" x1="0" y1="0" x2="0" y2="100%">
                <stop offset="0%" stopColor="#0B132B" />
                <stop offset="60%" stopColor="#1C2541" />
                <stop offset="100%" stopColor="#141414" />
              </linearGradient>
              <linearGradient id="goldLattice" x1="0" y1="0" x2="100%" y2="0">
                <stop offset="0%" stopColor="#D6A548" />
                <stop offset="100%" stopColor="#E9C46A" />
              </linearGradient>
            </defs>
            <rect width="600" height="340" fill="url(#skyGradTrans)" />
            {/* Nepalese Himalayan Mountain Silhouettes */}
            <path d="M0 240 L70 180 L140 220 L210 150 L280 200 L350 140 L420 190 L500 130 L600 210 V340 H0 Z" fill="#1E2A38" opacity="0.6" />
            <path d="M40 250 L120 205 L180 235 L260 175 L330 220 L410 160 L490 210 L560 170 L600 200 V340 H0 Z" fill="#171F2C" opacity="0.8" />
            <path d="M0 270 Q150 250 300 280 T600 270 V340 H0 Z" fill="#111822" />

            {/* Distant Secondary Transmission Tower */}
            <g opacity="0.4" transform="translate(130, 110) scale(0.45)">
              <polygon points="50,10 65,10 85,260 30,260" stroke="#D6A548" strokeWidth="3" fill="none" />
              <line x1="20" y1="50" x2="95" y2="50" stroke="#D6A548" strokeWidth="4" />
              <line x1="10" y1="90" x2="105" y2="90" stroke="#D6A548" strokeWidth="4" />
              <line x1="25" y1="130" x2="90" y2="130" stroke="#D6A548" strokeWidth="4" />
            </g>

            {/* Main Foreground High-Voltage Lattice Tower */}
            <g transform="translate(330, 20)">
              {/* Peak Point */}
              <polygon points="80,10 92,10 115,300 57,300" stroke="url(#goldLattice)" strokeWidth="2.5" fill="none" />
              {/* Crossarms */}
              {/* Upper Crossarm */}
              <line x1="30" y1="55" x2="142" y2="55" stroke="#D6A548" strokeWidth="3.5" />
              <polygon points="30,55 86,30 142,55" stroke="#D6A548" strokeWidth="1.5" fill="none" />
              {/* Middle Crossarm */}
              <line x1="15" y1="105" x2="157" y2="105" stroke="#D6A548" strokeWidth="4" />
              <polygon points="15,105 86,75 157,105" stroke="#D6A548" strokeWidth="1.5" fill="none" />
              {/* Lower Crossarm */}
              <line x1="25" y1="155" x2="147" y2="155" stroke="#D6A548" strokeWidth="3.5" />

              {/* Lattice X Bracing */}
              <line x1="75" y1="55" x2="97" y2="105" stroke="#D6A548" strokeWidth="1.5" />
              <line x1="97" y1="55" x2="75" y2="105" stroke="#D6A548" strokeWidth="1.5" />
              <line x1="72" y1="105" x2="100" y2="155" stroke="#D6A548" strokeWidth="1.5" />
              <line x1="100" y1="105" x2="72" y2="155" stroke="#D6A548" strokeWidth="1.5" />
              <line x1="68" y1="155" x2="104" y2="210" stroke="#D6A548" strokeWidth="1.5" />
              <line x1="104" y1="155" x2="68" y2="210" stroke="#D6A548" strokeWidth="1.5" />
              <line x1="63" y1="210" x2="109" y2="265" stroke="#D6A548" strokeWidth="1.5" />
              <line x1="109" y1="210" x2="63" y2="265" stroke="#D6A548" strokeWidth="1.5" />

              {/* Insulator Strings & Orange Corona Sparks */}
              <line x1="30" y1="55" x2="30" y2="78" stroke="#F4511E" strokeWidth="2.5" strokeDasharray="3 2" />
              <line x1="142" y1="55" x2="142" y2="78" stroke="#F4511E" strokeWidth="2.5" strokeDasharray="3 2" />
              <line x1="15" y1="105" x2="15" y2="132" stroke="#F4511E" strokeWidth="2.5" strokeDasharray="3 2" />
              <line x1="157" y1="105" x2="157" y2="132" stroke="#F4511E" strokeWidth="2.5" strokeDasharray="3 2" />

              <circle cx="30" cy="78" r="3.5" fill="#F4511E" />
              <circle cx="142" cy="78" r="3.5" fill="#F4511E" />
              <circle cx="15" cy="132" r="3.5" fill="#F4511E" />
              <circle cx="157" cy="132" r="3.5" fill="#F4511E" />
            </g>

            {/* Catenary High-Voltage Transmission Cables */}
            <path d="M0 95 Q170 145 345 98 T600 115" stroke="#F4511E" strokeWidth="2.5" fill="none" opacity="0.9" />
            <path d="M0 145 Q160 195 345 152 T600 165" stroke="#D6A548" strokeWidth="2.5" fill="none" />
            <path d="M0 170 Q160 220 345 178 T600 195" stroke="#D6A548" strokeWidth="2" fill="none" opacity="0.8" />
            {/* OPGW Top Shield Wire */}
            <path d="M0 45 Q210 70 416 30 T600 40" stroke="#FFFFFF" strokeWidth="1.5" fill="none" opacity="0.75" />

            {/* Ground Elevation Foundation */}
            <rect x="375" y="315" width="28" height="15" fill="#D6A548" rx="2" />
            <rect x="430" y="315" width="28" height="15" fill="#D6A548" rx="2" />
          </svg>
        )}

        {type === 'substation' && (
          <svg viewBox="0 0 600 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-[360px]">
            <rect width="600" height="340" fill="#121820" />
            {/* Gravel Switchyard Ground Bed */}
            <rect y="230" width="600" height="110" fill="#1A1F26" />
            <line x1="0" y1="230" x2="600" y2="230" stroke="#D6A548" strokeWidth="3" />

            {/* Heavy Power Transformer Unit */}
            <g transform="translate(60, 110)">
              {/* Concrete Plinth */}
              <rect x="10" y="110" width="160" height="20" fill="#2E3440" stroke="#D6A548" strokeWidth="1.5" />
              {/* Main Tank Body */}
              <rect x="25" y="30" width="130" height="80" fill="#202630" stroke="#D6A548" strokeWidth="2" rx="4" />
              {/* Cooling Radiator Fins */}
              <g stroke="#D6A548" strokeWidth="2">
                <line x1="38" y1="35" x2="38" y2="105" />
                <line x1="48" y1="35" x2="48" y2="105" />
                <line x1="58" y1="35" x2="58" y2="105" />
                <line x1="68" y1="35" x2="68" y2="105" />
                <line x1="78" y1="35" x2="78" y2="105" />
                <line x1="88" y1="35" x2="88" y2="105" />
                <line x1="98" y1="35" x2="98" y2="105" />
                <line x1="108" y1="35" x2="108" y2="105" />
                <line x1="118" y1="35" x2="118" y2="105" />
              </g>
              {/* Conservator Oil Tank on Top */}
              <rect x="45" y="8" width="80" height="20" rx="6" fill="#F4511E" stroke="#FF7043" strokeWidth="1.5" />
              {/* High-Voltage Bushings */}
              <g stroke="#D6A548" strokeWidth="3">
                <line x1="55" y1="8" x2="50" y2="-22" />
                <line x1="85" y1="8" x2="85" y2="-25" />
                <line x1="115" y1="8" x2="120" y2="-22" />
              </g>
              {/* Bushing Sheds */}
              <ellipse cx="50" cy="-10" rx="8" ry="3" fill="#D6A548" />
              <ellipse cx="85" cy="-12" rx="8" ry="3" fill="#D6A548" />
              <ellipse cx="120" cy="-10" rx="8" ry="3" fill="#D6A548" />
            </g>

            {/* Switchyard Gantry Structure */}
            <g transform="translate(260, 40)">
              {/* Left Column */}
              <line x1="30" y1="190" x2="30" y2="20" stroke="#D6A548" strokeWidth="4" />
              <line x1="45" y1="190" x2="45" y2="20" stroke="#D6A548" strokeWidth="3" />
              <line x1="30" y1="50" x2="45" y2="80" stroke="#D6A548" strokeWidth="1.5" />
              <line x1="45" y1="50" x2="30" y2="80" stroke="#D6A548" strokeWidth="1.5" />
              <line x1="30" y1="110" x2="45" y2="140" stroke="#D6A548" strokeWidth="1.5" />
              <line x1="45" y1="110" x2="30" y2="140" stroke="#D6A548" strokeWidth="1.5" />

              {/* Right Column */}
              <line x1="220" y1="190" x2="220" y2="20" stroke="#D6A548" strokeWidth="4" />
              <line x1="235" y1="190" x2="235" y2="20" stroke="#D6A548" strokeWidth="3" />

              {/* Horizontal Overhead Beam */}
              <rect x="20" y="15" width="230" height="14" fill="#1C2330" stroke="#D6A548" strokeWidth="2" />

              {/* Overhead Busbars & Drop Conductors */}
              <line x1="0" y1="20" x2="320" y2="20" stroke="#F4511E" strokeWidth="3" />
              <line x1="0" y1="26" x2="320" y2="26" stroke="#D6A548" strokeWidth="2.5" />

              {/* SF6 Circuit Breaker Columns */}
              <g transform="translate(90, 85)">
                <rect x="0" y="70" width="80" height="35" fill="#202124" stroke="#D6A548" strokeWidth="2" rx="3" />
                <rect x="10" y="0" width="16" height="70" fill="#333" stroke="#F4511E" strokeWidth="2" rx="4" />
                <rect x="54" y="0" width="16" height="70" fill="#333" stroke="#F4511E" strokeWidth="2" rx="4" />
                <circle cx="18" cy="15" r="4" fill="#D6A548" />
                <circle cx="62" cy="15" r="4" fill="#D6A548" />
              </g>
            </g>

            {/* Warning Hazard Stripe on base */}
            <rect x="0" y="328" width="600" height="12" fill="#D6A548" />
          </svg>
        )}

        {type === 'distribution' && (
          <svg viewBox="0 0 600 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-[360px]">
            <rect width="600" height="340" fill="#141C24" />
            {/* Roadway & Paved Embankment */}
            <path d="M0 250 L600 230 V340 H0 Z" fill="#1B222C" />
            <line x1="0" y1="290" x2="600" y2="280" stroke="#D6A548" strokeWidth="2" strokeDasharray="20 15" />

            {/* Utility Concrete Spun Poles */}
            <g transform="translate(180, 40)">
              {/* Main Pole */}
              <polygon points="25,0 35,0 42,240 18,240" fill="#3A4350" stroke="#D6A548" strokeWidth="1.5" />
              {/* Crossarms */}
              <rect x="-40" y="30" width="140" height="8" fill="#202124" stroke="#D6A548" strokeWidth="2" rx="1" />
              <rect x="-20" y="70" width="100" height="8" fill="#202124" stroke="#D6A548" strokeWidth="2" rx="1" />

              {/* Pin Insulators */}
              <g fill="#D6A548">
                <circle cx="-30" cy="24" r="5" />
                <circle cx="30" cy="24" r="5" />
                <circle cx="90" cy="24" r="5" />
                <circle cx="-10" cy="64" r="5" />
                <circle cx="70" cy="64" r="5" />
              </g>

              {/* Pole-Mounted Distribution Transformer */}
              <rect x="42" y="90" width="46" height="58" fill="#252C37" stroke="#F4511E" strokeWidth="2" rx="3" />
              <rect x="48" y="100" width="34" height="6" fill="#D6A548" />
              <circle cx="65" cy="125" r="4" fill="#F4511E" />
            </g>

            {/* Secondary Distant Pole */}
            <g transform="translate(440, 70) scale(0.7)">
              <polygon points="25,0 35,0 42,240 18,240" fill="#3A4350" stroke="#D6A548" strokeWidth="1" />
              <rect x="-40" y="30" width="140" height="8" fill="#202124" stroke="#D6A548" strokeWidth="1.5" />
            </g>

            {/* Power Lines connecting poles */}
            <path d="M0 65 Q90 95 150 70 T410 88 T600 75" stroke="#F4511E" strokeWidth="3" fill="none" />
            <path d="M0 72 Q90 102 210 70 T470 95 T600 82" stroke="#D6A548" strokeWidth="2.5" fill="none" />
            <path d="M0 105 Q120 135 270 102 T510 120 T600 110" stroke="#D6A548" strokeWidth="2" fill="none" />
            {/* Neutral / ABC bundled low voltage cable */}
            <path d="M0 170 Q140 195 240 160 T600 175" stroke="#8892B0" strokeWidth="4" strokeDasharray="8 3" fill="none" />
          </svg>
        )}

        {type === 'building' && (
          <svg viewBox="0 0 600 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-[360px]">
            <rect width="600" height="340" fill="#13171F" />
            {/* Ground Excavation */}
            <rect y="260" width="600" height="80" fill="#1C232E" />
            <line x1="0" y1="260" x2="600" y2="260" stroke="#D6A548" strokeWidth="2.5" />

            {/* Tower Construction Crane */}
            <g transform="translate(380, 20)">
              {/* Mast / Vertical Tower */}
              <rect x="30" y="30" width="16" height="210" fill="#2A303C" stroke="#D6A548" strokeWidth="2" />
              <line x1="30" y1="30" x2="46" y2="60" stroke="#D6A548" strokeWidth="1" />
              <line x1="46" y1="60" x2="30" y2="90" stroke="#D6A548" strokeWidth="1" />
              <line x1="30" y1="90" x2="46" y2="120" stroke="#D6A548" strokeWidth="1" />
              <line x1="46" y1="120" x2="30" y2="150" stroke="#D6A548" strokeWidth="1" />
              <line x1="30" y1="150" x2="46" y2="180" stroke="#D6A548" strokeWidth="1" />
              {/* Operator Cabin */}
              <rect x="22" y="16" width="22" height="18" fill="#F4511E" rx="2" />
              {/* Horizontal Jib Arm */}
              <line x1="-120" y1="22" x2="160" y2="22" stroke="#D6A548" strokeWidth="3.5" />
              {/* Counterweight */}
              <rect x="120" y="24" width="30" height="20" fill="#202124" stroke="#D6A548" strokeWidth="1.5" />
              {/* Hoist Cable & Hook */}
              <line x1="-60" y1="22" x2="-60" y2="110" stroke="#F4511E" strokeWidth="1.5" strokeDasharray="3 2" />
              <polygon points="-65,110 -55,110 -60,118" fill="#F4511E" />
            </g>

            {/* Multi-story RCC Building Structure with Concrete Slabs */}
            <g transform="translate(60, 60)">
              {/* Foundation Columns */}
              <g fill="#242B38" stroke="#D6A548" strokeWidth="2">
                <rect x="20" y="20" width="16" height="180" />
                <rect x="80" y="20" width="16" height="180" />
                <rect x="140" y="20" width="16" height="180" />
                <rect x="200" y="20" width="16" height="180" />
                <rect x="260" y="20" width="16" height="180" />
              </g>

              {/* Concrete Slabs (Floors) */}
              <g fill="#2D3748" stroke="#D6A548" strokeWidth="2">
                <rect x="10" y="18" width="276" height="12" rx="2" />
                <rect x="10" y="60" width="276" height="12" rx="2" />
                <rect x="10" y="105" width="276" height="12" rx="2" />
                <rect x="10" y="150" width="276" height="12" rx="2" />
                <rect x="0" y="195" width="296" height="16" fill="#1A202C" rx="2" />
              </g>

              {/* Glass Facade & Window Frames */}
              <g stroke="#64748B" strokeWidth="1" fill="#1E293B" opacity="0.8">
                <rect x="36" y="32" width="44" height="26" />
                <rect x="96" y="32" width="44" height="26" />
                <rect x="156" y="32" width="44" height="26" />
                <rect x="216" y="32" width="44" height="26" />

                <rect x="36" y="74" width="44" height="28" fill="#D6A548" fillOpacity="0.1" />
                <rect x="96" y="74" width="44" height="28" fill="#D6A548" fillOpacity="0.1" />
                <rect x="156" y="74" width="44" height="28" fill="#D6A548" fillOpacity="0.1" />
                <rect x="216" y="74" width="44" height="28" fill="#D6A548" fillOpacity="0.1" />
              </g>

              {/* Top Rooftop Rebar Extensions */}
              <g stroke="#F4511E" strokeWidth="2">
                <line x1="24" y1="18" x2="24" y2="4" />
                <line x1="28" y1="18" x2="28" y2="4" />
                <line x1="84" y1="18" x2="84" y2="4" />
                <line x1="88" y1="18" x2="88" y2="4" />
                <line x1="144" y1="18" x2="144" y2="4" />
                <line x1="204" y1="18" x2="204" y2="4" />
                <line x1="264" y1="18" x2="264" y2="4" />
              </g>
            </g>
          </svg>
        )}

        {type === 'civil' && (
          <svg viewBox="0 0 600 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-[360px]">
            <rect width="600" height="340" fill="#101720" />
            {/* River Gorge & Mountains */}
            <path d="M0 160 L120 110 L250 145 L380 90 L510 135 L600 100 V340 H0 Z" fill="#1C2733" opacity="0.6" />
            <path d="M0 250 Q160 210 300 240 T600 230 L600 340 H0 Z" fill="#0D1B2A" />
            {/* Flowing Water Gradient */}
            <path d="M0 280 C180 270 320 290 600 275 L600 340 H0 Z" fill="#1B3B6F" opacity="0.7" />

            {/* Heavy Reinforced Concrete Highway Bridge */}
            {/* Massive Concrete Piers */}
            <g fill="#2B3542" stroke="#D6A548" strokeWidth="2">
              {/* Left Pier */}
              <polygon points="120,135 155,135 165,290 110,290" />
              {/* Middle Pier */}
              <polygon points="280,135 320,135 330,295 270,295" />
              {/* Right Pier */}
              <polygon points="445,135 480,135 490,290 435,290" />
            </g>

            {/* Pier Caps */}
            <rect x="100" y="125" width="75" height="14" fill="#384353" stroke="#D6A548" strokeWidth="2" rx="2" />
            <rect x="260" y="125" width="80" height="14" fill="#384353" stroke="#D6A548" strokeWidth="2" rx="2" />
            <rect x="425" y="125" width="75" height="14" fill="#384353" stroke="#D6A548" strokeWidth="2" rx="2" />

            {/* Longitudinal Pre-stressed Concrete Girders & Deck */}
            <rect x="0" y="112" width="600" height="16" fill="#202731" stroke="#D6A548" strokeWidth="3" />
            <line x1="0" y1="120" x2="600" y2="120" stroke="#F4511E" strokeWidth="2" strokeDasharray="16 8" />

            {/* Safety Guardrails */}
            <line x1="0" y1="102" x2="600" y2="102" stroke="#D6A548" strokeWidth="2.5" />
            <g stroke="#D6A548" strokeWidth="1.5">
              {Array.from({ length: 25 }).map((_, i) => (
                <line key={i} x1={i * 25} y1="102" x2={i * 25} y2="112" />
              ))}
            </g>
          </svg>
        )}

        {(type === 'design' || type === 'design-estimation') && (
          <svg viewBox="0 0 600 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-[360px]">
            <rect width="600" height="340" fill="#0B1329" />
            {/* Architectural Blueprint Grid */}
            <g opacity="0.3" stroke="#38BDF8" strokeWidth="0.8">
              {Array.from({ length: 20 }).map((_, i) => (
                <line key={`v-${i}`} x1={i * 30} y1="0" x2={i * 30} y2="340" />
              ))}
              {Array.from({ length: 12 }).map((_, i) => (
                <line key={`h-${i}`} x1="0" y1={i * 30} x2="600" y2={i * 30} />
              ))}
            </g>

            {/* Blueprint Floor Plan & Structural Cad Drawing */}
            <g transform="translate(60, 40)">
              {/* Outer structural boundary walls */}
              <rect x="20" y="20" width="280" height="200" fill="#1E293B" stroke="#D6A548" strokeWidth="3" rx="2" />
              {/* Interior wall partitions */}
              <line x1="20" y1="110" x2="160" y2="110" stroke="#38BDF8" strokeWidth="2.5" />
              <line x1="160" y1="20" x2="160" y2="220" stroke="#38BDF8" strokeWidth="2.5" />
              <line x1="160" y1="140" x2="300" y2="140" stroke="#38BDF8" strokeWidth="2.5" />
              <line x1="230" y1="140" x2="230" y2="220" stroke="#38BDF8" strokeWidth="2" />

              {/* Column Markers (Seismic Plinths) */}
              <rect x="15" y="15" width="12" height="12" fill="#D6A548" />
              <rect x="154" y="15" width="12" height="12" fill="#D6A548" />
              <rect x="293" y="15" width="12" height="12" fill="#D6A548" />
              <rect x="15" y="104" width="12" height="12" fill="#D6A548" />
              <rect x="154" y="104" width="12" height="12" fill="#D6A548" />
              <rect x="293" y="134" width="12" height="12" fill="#D6A548" />
              <rect x="15" y="213" width="12" height="12" fill="#D6A548" />
              <rect x="154" y="213" width="12" height="12" fill="#D6A548" />
              <rect x="293" y="213" width="12" height="12" fill="#D6A548" />

              {/* Dimension measurement lines */}
              <line x1="20" y1="5" x2="300" y2="5" stroke="#F4511E" strokeWidth="1.5" />
              <polyline points="20,2 20,8" stroke="#F4511E" strokeWidth="1.5" />
              <polyline points="300,2 300,8" stroke="#F4511E" strokeWidth="1.5" />
              <text x="135" y="0" fill="#F4511E" fontSize="10" fontFamily="monospace">14.50 m</text>
            </g>

            {/* Estimation Costing & BOQ Sheet Table */}
            <g transform="translate(390, 45)">
              <rect x="0" y="0" width="170" height="230" rx="6" fill="#172033" stroke="#D6A548" strokeWidth="2" />
              <rect x="0" y="0" width="170" height="28" rx="6" fill="#0F172A" />
              <text x="12" y="18" fill="#D6A548" fontSize="11" fontWeight="bold" fontFamily="sans-serif">BILL OF QUANTITIES (BOQ)</text>
              {/* Table Rows */}
              <line x1="0" y1="60" x2="170" y2="60" stroke="#334155" strokeWidth="1" />
              <line x1="0" y1="95" x2="170" y2="95" stroke="#334155" strokeWidth="1" />
              <line x1="0" y1="130" x2="170" y2="130" stroke="#334155" strokeWidth="1" />
              <line x1="0" y1="165" x2="170" y2="165" stroke="#334155" strokeWidth="1" />
              <line x1="0" y1="195" x2="170" y2="195" stroke="#D6A548" strokeWidth="1.5" />

              <text x="10" y="48" fill="#94A3B8" fontSize="9" fontFamily="monospace">01. M25 Concrete (Raft)</text>
              <text x="10" y="83" fill="#94A3B8" fontSize="9" fontFamily="monospace">02. Fe500D TMT Steel</text>
              <text x="10" y="118" fill="#94A3B8" fontSize="9" fontFamily="monospace">03. Brick Masonry</text>
              <text x="10" y="153" fill="#94A3B8" fontSize="9" fontFamily="monospace">04. NBC-105 Structural</text>
              <text x="10" y="215" fill="#38BDF8" fontSize="10" fontWeight="bold" fontFamily="monospace">ESTIMATED RATE: PASS</text>
            </g>

            {/* Engineer Drafting Compass / Geometry Tool */}
            <g transform="translate(320, 180) rotate(-25)">
              <line x1="0" y1="0" x2="35" y2="90" stroke="#D6A548" strokeWidth="3" />
              <line x1="0" y1="0" x2="-35" y2="90" stroke="#D6A548" strokeWidth="3" />
              <circle cx="0" cy="0" r="8" fill="#0F172A" stroke="#D6A548" strokeWidth="2.5" />
              <circle cx="0" cy="0" r="3" fill="#F4511E" />
              <path d="M-20 60 Q0 70 20 60" stroke="#F4511E" strokeWidth="1.5" fill="none" />
            </g>
          </svg>
        )}

        {(type === 'mep' || type === 'transformer' || type === 'inspection') && (
          <svg viewBox="0 0 600 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-[360px]">
            <rect width="600" height="340" fill="#151A22" />
            {/* Industrial Plant / Mechanical Room Layout */}
            <g transform="translate(60, 40)">
              {/* Ductwork & Piping Matrix */}
              <path d="M20 40 H220 V160 H340" stroke="#D6A548" strokeWidth="18" strokeLinecap="round" fill="none" opacity="0.9" />
              <path d="M40 80 H260 V220 H440" stroke="#F4511E" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.8" />
              <path d="M80 120 H180 V240" stroke="#38BDF8" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.7" />

              {/* Pressure Gauges / Indicators */}
              <circle cx="220" cy="40" r="16" fill="#202124" stroke="#D6A548" strokeWidth="3" />
              <circle cx="220" cy="40" r="4" fill="#F4511E" />
              <line x1="220" y1="40" x2="228" y2="34" stroke="#D6A548" strokeWidth="2" />

              {/* Main Low-Tension Switchboard Cabinet */}
              <rect x="330" y="80" width="130" height="150" fill="#1F2937" stroke="#D6A548" strokeWidth="3" rx="4" />
              <rect x="345" y="95" width="100" height="28" fill="#111827" stroke="#F4511E" strokeWidth="2" rx="2" />
              <circle cx="360" cy="109" r="4" fill="#22C55E" />
              <circle cx="376" cy="109" r="4" fill="#EAB308" />
              <circle cx="392" cy="109" r="4" fill="#EF4444" />

              {/* Air Circuit Breaker Drawers */}
              <rect x="345" y="135" width="100" height="36" fill="#374151" stroke="#D6A548" strokeWidth="1.5" rx="2" />
              <rect x="345" y="180" width="100" height="36" fill="#374151" stroke="#D6A548" strokeWidth="1.5" rx="2" />
            </g>
          </svg>
        )}
      </div>

      {/* Badge in top left corner */}
      {badge && (
        <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#171717]/90 backdrop-blur-xs border border-[#D6A548]/40 rounded text-[11px] font-bold tracking-wider text-[#D6A548] uppercase">
          {badge}
        </div>
      )}

      {/* Overlay Text in bottom bar */}
      {overlayText && (
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white">
          <div className="text-xs font-semibold tracking-wide text-neutral-200">
            {overlayText}
          </div>
        </div>
      )}
    </div>
  );
};
