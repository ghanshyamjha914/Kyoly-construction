export interface ServiceSpecification {
  label: string;
  value: string;
}

export interface SubServiceItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  categoryNumber: number;
  shortDescription: string;
  fullDescription: string;
  keyFeatures: string[];
  deliverables: string[];
  standards: string;
  visualType: 'transmission' | 'substation' | 'distribution' | 'building' | 'civil' | 'design' | 'design-estimation' | 'mep' | 'transformer';
  imageUrl: string;
  specs: ServiceSpecification[];
  estimatedDuration?: string;
  targetClients?: string;
}

export interface MainServiceCategory {
  number: number;
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  iconName: 'Building' | 'Zap' | 'HardHat' | 'Cpu' | 'Compass';
  subServices: SubServiceItem[];
}

export const MAIN_SERVICE_CATEGORIES: MainServiceCategory[] = [
  // 1. Building Design & Construction
  {
    number: 1,
    id: 'building-design-construction',
    slug: 'building-design-construction',
    title: 'Building Design & Construction',
    tagline: 'Seismic Resilient Architecture & Turnkey Building Execution',
    description: 'Complete architectural space planning, NBC-105:2020 seismic structural engineering, multi-story commercial framing, and turnkey construction management across Nepal.',
    iconName: 'Building',
    subServices: [
      {
        id: 'residential-building-design',
        slug: 'residential-building-design',
        title: 'Residential Building Design & Construction',
        category: 'Building Design & Construction',
        categorySlug: 'building-design-construction',
        categoryNumber: 1,
        shortDescription: 'Modern seismic-resilient architectural and structural engineering for villas, private residences, and multi-family apartments.',
        fullDescription: 'Kyoly Construction provides complete residential design and construction services tailored to the unique climate, seismic conditions, and lifestyle in Nepal. Every home is engineered to meet the latest Nepal National Building Code (NBC-105:2020) guidelines. Our turnkey scope encompasses architectural space planning, 3D photorealistic exterior/interior visualizations, soil testing, raft and isolated footings, reinforced concrete framing, premium masonry, and turnkey handover.',
        keyFeatures: [
          'Architectural 2D space planning & 3D realistic exterior/interior visualizations',
          'Seismic structural analysis using ETABS & SAP2000 strictly conforming to NBC-105:2020',
          'Reinforced concrete (RCC) ductile detailing for earthquake resilience (NBC-205 & IS 13920)',
          'Municipal building permit documentation, structural endorsement, and municipality sign-off',
          'Turnkey construction execution with dedicated on-site civil engineers & strict QA/QC',
        ],
        deliverables: [
          'Municipality-approved architectural, structural, electrical, and sanitary drawing packages',
          'Itemized Bill of Quantities (BOQ) with realistic Nepalese material rate estimation',
          'Foundation soil bearing capacity certification and structural stability report',
          'Periodic stage-wise rebar inspection and concrete cube test strength dossiers',
        ],
        standards: 'NBC 105:2020 / NBC 205 / IS 456 / IS 1893 / IS 13920',
        visualType: 'building',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        specs: [
          { label: 'Seismic Zone', value: 'Seismic Zone V (Nepal National Building Code)' },
          { label: 'Structural System', value: 'Ductile RCC Moment-Resisting Frame (SMRF)' },
          { label: 'Foundation Types', value: 'Raft, Mat, Strap, or Isolated RCC Footings' },
          { label: 'Modeling Software', value: 'AutoCAD, ETABS, Revit Architecture' },
        ],
        estimatedDuration: '4 - 10 Months (Design through Structural Handover)',
        targetClients: 'Private Homeowners, Real Estate Developers, Housing Societies',
      },
      {
        id: 'commercial-building-design',
        slug: 'commercial-building-design',
        title: 'Commercial Building & Complex Design',
        category: 'Building Design & Construction',
        categorySlug: 'building-design-construction',
        categoryNumber: 1,
        shortDescription: 'High-performance corporate office towers, shopping complexes, hospitals, and hospitality infrastructure.',
        fullDescription: 'Our commercial design and construction team engineers heavy commercial hubs that maximize rentable floor space, streamline occupant circulation, and comply with strict fire life-safety standards. We deliver multi-basement retaining wall solutions, post-tensioned beam-slab systems, structural steel mezzanine decks, energy-efficient glass curtain facades, and integrated commercial MEP networks.',
        keyFeatures: [
          'High-rise commercial RCC framing with shear walls and dual lateral load systems',
          'Deep multi-level basement excavation support, soldier piling, and waterproofing',
          'Energy-efficient glass curtain wall facades with thermal break and solar control',
          'Centralized HVAC ducting routes, elevator shaft structural designs, and fire escape egress',
          'Heavy-traffic structural floor loading calculations conforming to IS 875 Part 2',
        ],
        deliverables: [
          'Comprehensive multidisciplinary BIM model coordinating structural, MEP, and architectural assets',
          'Structural safety stability certificate endorsed by licensed structural engineer',
          'Government and municipal commercial occupancy permit packages',
          'As-built drawings, operations & maintenance manuals, and warranty documentation',
        ],
        standards: 'NBC 105:2020 / NBC 206 / NFPA 101 Life Safety / IS 456 / ASHRAE 90.1',
        visualType: 'building',
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        specs: [
          { label: 'Occupancy Classification', value: 'Commercial / Mixed-Use / Institutional' },
          { label: 'Lateral System', value: 'Shear Wall + Special Moment Resisting Frame (Dual System)' },
          { label: 'Basement Retention', value: 'Secant Piles / RCC Diaphragm Walls' },
          { label: 'Fire Safety Standard', value: 'NBC 107 / NFPA 101 Life Safety Code' },
        ],
        estimatedDuration: '10 - 24 Months (Turnkey Commercial Construction)',
        targetClients: 'Corporations, Healthcare Providers, Retail Malls, Hospitality Chains',
      },
      {
        id: 'structural-architecture-3d',
        slug: 'structural-architecture-3d',
        title: 'Structural Architecture & 3D BIM Modeling',
        category: 'Building Design & Construction',
        categorySlug: 'building-design-construction',
        categoryNumber: 1,
        shortDescription: 'Advanced Building Information Modeling (BIM), finite element structural analysis, and clash detection.',
        fullDescription: 'We deploy cutting-edge 3D BIM modeling and finite element software to bridge the gap between architectural ambition and structural integrity. Our engineers build coordinated parametric 3D models in Autodesk Revit and export geometry directly into ETABS/SAP2000 for dynamic response spectrum and time-history analysis, resolving multidisciplinary clashes before concrete is poured on-site.',
        keyFeatures: [
          'Multi-disciplinary 3D BIM modeling (LOD 300 to LOD 400) for structural & architectural coordination',
          'Finite Element Method (FEM) analysis for irregular floor diaphragms and transfer slabs',
          'Automated clash detection eliminating MEP pipe and structural rebar interference on-site',
          'Photorealistic daylight rendering, walkthrough animation, and solar shadow studies',
        ],
        deliverables: [
          'Coordinated Revit / IFC building model files and Navisworks clash reports',
          'Detailed rebar bending schedules (BBS) and fabrication level drawings',
          'Dynamic structural modal vibration and drift verification reports',
        ],
        standards: 'ISO 19650 (BIM) / NBC 105:2020 / ACI 318 / BS EN 1992',
        visualType: 'building',
        imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
        specs: [
          { label: 'BIM Level of Detail', value: 'LOD 300 - LOD 400 (Construction Ready)' },
          { label: 'Analysis Tools', value: 'ETABS Ultimate, SAP2000, SAFE, Revit' },
          { label: 'Clash Tolerance', value: 'Zero structural-MEP clash sign-off' },
        ],
        estimatedDuration: '3 - 6 Weeks (Complete BIM Modeling & Analysis)',
        targetClients: 'Architects, Developers, General Contractors, Government Agencies',
      },
      {
        id: 'turnkey-interior-finishing',
        slug: 'turnkey-interior-finishing',
        title: 'Turnkey Interior & Finishing Works',
        category: 'Building Design & Construction',
        categorySlug: 'building-design-construction',
        categoryNumber: 1,
        shortDescription: 'High-end corporate fit-outs, industrial epoxy flooring, false ceiling systems, and acoustic treatments.',
        fullDescription: 'Kyoly Construction provides complete turnkey interior and architectural finishing execution. From commercial corporate headquarters to luxury residences, our craftsmen and site engineers oversee premium marble/granite cladding, acoustic drywall partitions, fire-rated ceiling grids, heavy-duty industrial epoxy coatings, and architectural lighting fixtures.',
        keyFeatures: [
          'High-traffic commercial epoxy and polyurethane floor coatings for cleanrooms and warehouses',
          'Acoustic drywall partitioning and decorative fire-retardant ceiling installations',
          'Custom architectural joinery, modular corporate workstations, and executive cabins',
          'Integrated architectural lighting, smart automation controls, and HVAC diffuser blending',
        ],
        deliverables: [
          'Complete interior material sample boards and technical specification datasheets',
          'Surface preparation and moisture barrier compliance certificates',
          'Defect-free handover sign-off and 12-month post-completion warranty',
        ],
        standards: 'NBC 206 / ASTM C840 / ISO 14001 / Green Building Norms',
        visualType: 'building',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        specs: [
          { label: 'Finish Types', value: 'Epoxy, Vitrified, Granite, Acoustic Gypsum' },
          { label: 'Fire Rating', value: 'Flame Spread Rated / NFPA 101 Compliant' },
          { label: 'Warranty', value: '1 to 5 Year Warranty on Materials & Execution' },
        ],
        estimatedDuration: '1 - 4 Months',
        targetClients: 'Corporate Offices, Luxury Homeowners, Commercial Showrooms',
      },
    ],
  },

  // 2. Power & Electrical Infrastructure
  {
    number: 2,
    id: 'power-electrical-infrastructure',
    slug: 'power-electrical-infrastructure',
    title: 'Power & Electrical Infrastructure',
    tagline: 'High-Voltage Transmission Corridors, Substations & National Grid Solutions',
    description: 'Turnkey EPC contractor for high-voltage transmission lines up to 400kV, 33kV/132kV automated substations, power transformers, and national grid distribution infrastructure.',
    iconName: 'Zap',
    subServices: [
      {
        id: 'transmission-line',
        slug: 'transmission-line',
        title: 'High-Voltage Transmission Lines (66kV - 400kV)',
        category: 'Power & Electrical Infrastructure',
        categorySlug: 'power-electrical-infrastructure',
        categoryNumber: 2,
        shortDescription: 'High-voltage transmission line engineering up to 400kV traversing river valleys, hills, and national power corridors.',
        fullDescription: 'Kyoly Construction is an approved specialist in turnkey engineering, procurement, and construction (EPC) for overhead high-voltage transmission lines spanning 66kV, 132kV, 220kV, and 400kV. Our field crews execute topographic GPS route surveys, tower spotting using PLS-CADD, specialized rock-anchor foundations, lattice steel tower erection, and tension stringing across torrential Himalayan rivers and deep gorges.',
        keyFeatures: [
          '66kV, 132kV, 220kV & 400kV overhead transmission line survey, alignment & profile design',
          'Stub-setting, chimney, pad-chimney, and rock-anchor foundation engineering in rough terrain',
          'Galvanized steel lattice tower assembly and erection using mechanical derrick gin poles',
          'Hydraulic tension stringing of ACSR/AAAC conductors and OPGW optical fiber ground wires',
          'River-crossing long span tower construction with heightened clearance calculations',
        ],
        deliverables: [
          'Complete PLS-CADD alignment profiles, sag-tension calculations, and clearance reports',
          'Tower footing earthing resistance test logs (< 10 Ohms) and pre-commissioning sign-offs',
          'As-built route alignment maps and NEA grid synchronization clearance dossiers',
        ],
        standards: 'IS 802 / IEC 60826 / IEEE 738 / NEA Grid Transmission Code',
        visualType: 'transmission',
        imageUrl: 'https://images.unsplash.com/photo-1509390144018-eeaf65052242?auto=format&fit=crop&w=1200&q=80',
        specs: [
          { label: 'Voltage Levels', value: '66kV, 132kV, 220kV, 400kV' },
          { label: 'Tension Stringing', value: 'Hydraulic Puller-Tensioner with ACSR/AAAC/OPGW' },
          { label: 'Tower Types', value: 'Galvanized Lattice Steel (Suspension, Tension, Angle, Dead-End)' },
          { label: 'Terrain Capability', value: 'Plains, Mountain Slopes, Heavy River Crossings' },
        ],
        estimatedDuration: '6 - 18 Months (EPC Transmission Contract)',
        targetClients: 'Nepal Electricity Authority (NEA), Independent Hydro IPPs, Transmission Companies',
      },
      {
        id: 'substation-switchyard',
        slug: 'substation-switchyard',
        title: 'Substation & Switchyard Construction (33kV / 132kV)',
        category: 'Power & Electrical Infrastructure',
        categorySlug: 'power-electrical-infrastructure',
        categoryNumber: 2,
        shortDescription: 'Turnkey 33kV, 66kV, and 132kV outdoor switchyards, power transformer plinths, and automated protection control rooms.',
        fullDescription: 'We deliver comprehensive electrical substation engineering for national utilities, independent hydropower developers, and heavy industrial facilities. Our scope covers massive reinforced concrete transformer foundations, blast separation walls, gantry structures, busbar systems, SF6 circuit breakers, lightning surge arresters, and numerical relay protection control rooms integrated with SCADA telemetry.',
        keyFeatures: [
          '33/11kV, 66/33kV and 132/33kV turnkey outdoor AIS & GIS switchyard layout & civil works',
          'High-capacity transformer plinth construction with oil collection sumps & soak pits',
          'Erection of SF6 gas circuit breakers, disconnectors/isolators, CT/PT instrument transformers',
          'Numerical protection relay panels, DC auxiliary battery banks, and SCADA automation',
          'Low-impedance copper-bonded earthing mat grid installation (< 1.0 Ohm impedance)',
        ],
        deliverables: [
          'Relay coordination trip curves, secondary injection test dossiers, and insulation test records',
          'Earth mat touch and step potential safety compliance certificate according to IEEE 80',
          'Official NEA grid interconnect approval, energization protocol, and warranty certificates',
        ],
        standards: 'IEC 61936-1 / IEC 62271 / IEEE 80 / NEA Substation Engineering Norms',
        visualType: 'substation',
        imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        specs: [
          { label: 'Voltage Configurations', value: '33/11kV, 66/33kV, 132/33kV, 132/11kV' },
          { label: 'Substation Types', value: 'Air Insulated (AIS) & Gas Insulated (GIS)' },
          { label: 'Earth Resistance', value: '< 1.0 Ohm (Mesh Ground Grid with Treated Earth Pits)' },
          { label: 'Protection System', value: 'Numerical Differential, Overcurrent & Earth Fault Relays' },
        ],
        estimatedDuration: '6 - 14 Months',
        targetClients: 'Nepal Electricity Authority, Hydropower Promoters, Industrial Parks',
      },
      {
        id: 'power-transformer-erection',
        slug: 'power-transformer-erection',
        title: 'Power Transformer Erection, Filtration & Testing',
        category: 'Power & Electrical Infrastructure',
        categorySlug: 'power-electrical-infrastructure',
        categoryNumber: 2,
        shortDescription: 'Installation, oil vacuum dehydration filtration, nitrogen purging, and pre-commissioning testing for heavy power transformers.',
        fullDescription: 'We execute high-precision rigging, skidding, and assembly for large power transformers ranging from 5 MVA to 100 MVA. Our technical crews operate mobile high-vacuum oil filtration units to achieve dielectric breakdown voltages > 65 kV, perform bushing installation, radiator bank erection, Buchholz relay calibration, and exhaustive electrical tests before grid connection.',
        keyFeatures: [
          'Heavy rigging, hydraulic jacking, and placement of transformers onto reinforced plinths',
          'High-vacuum transformer oil filling, continuous vacuum dehydration & moisture filtration',
          'Bushing erection, conservator tank, silica gel breather, and radiator assembly',
          'Full pre-commissioning testing: Tan Delta, winding resistance, SFRA, turns ratio & insulation resistance',
        ],
        deliverables: [
          'Transformer oil dielectric breakdown voltage (BDV) and dissolved gas analysis (DGA) test reports',
          'Sweep Frequency Response Analysis (SFRA) and winding ratio test certification',
          'Final pre-commissioning checklist approved by certifying electrical inspector',
        ],
        standards: 'IEC 60076 / IEEE C57.12 / IS 2026',
        visualType: 'transformer',
        imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
        specs: [
          { label: 'Capacity Range', value: '5 MVA to 100 MVA, 11kV to 132kV' },
          { label: 'Oil Breakdown Voltage', value: '> 60 kV (Filtered & Vacuum Dehydrated)' },
          { label: 'Testing Methods', value: 'Tan Delta, Megger, Winding Resistance, SFRA, Turns Ratio' },
        ],
        estimatedDuration: '2 - 6 Weeks (Per Transformer Unit)',
        targetClients: 'Hydropower Plants, Utility Substations, Steel Mills, Cement Plants',
      },
      {
        id: 'power-distribution-grid',
        slug: 'power-distribution-grid',
        title: 'Overhead & Underground Power Distribution Grids',
        category: 'Power & Electrical Infrastructure',
        categorySlug: 'power-electrical-infrastructure',
        categoryNumber: 2,
        shortDescription: '11kV and 400V distribution grid construction, Aerial Bundled Conductor (ABC) conversion, and pole-mounted distribution substations.',
        fullDescription: 'Our distribution grid division modernizes urban and rural electrification systems across Nepal. We specialize in converting hazardous bare overhead wires into insulated Aerial Bundled Conductors (ABC), erecting tubular steel and PSC poles, installing pole-mounted distribution transformers (50 kVA - 250 kVA), and laying underground HT/LT cable trenches.',
        keyFeatures: [
          '11kV medium-voltage and 400V/230V low-voltage overhead distribution network construction',
          'Installation of Aerial Bundled Conductor (ABC) networks eliminating power theft and line hazards',
          'Pole-mounted distribution transformer erection (50 kVA, 100 kVA, 200 kVA) with drop-out fuses',
          'Trench excavation, sand bedding, concrete cable tile protection, and underground cable laying',
        ],
        deliverables: [
          'Consumer load balancing sheets and line-loss reduction performance reports',
          'Insulation resistance and continuity test records for all feeder branches',
          'Handover dossier to municipal utility authority with complete GIS asset mapping',
        ],
        standards: 'NEA Distribution Construction Norms / IS 14255 / IEC 60502',
        visualType: 'distribution',
        imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
        specs: [
          { label: 'Operating Voltages', value: '11 kV / 33 kV / 400 V / 230 V (Three Phase & Single Phase)' },
          { label: 'Conductor Types', value: 'XLPE Insulated ABC, ACSR Rabbit / Dog Conductor' },
          { label: 'Poles', value: 'PSC Concrete Poles, Swaged Steel Tubular Poles' },
        ],
        estimatedDuration: '3 - 12 Months',
        targetClients: 'Nepal Electricity Authority, Rural Electrification User Groups, Smart Cities',
      },
    ],
  },

  // 3. Civil & Infrastructure Works
  {
    number: 3,
    id: 'civil-infrastructure-works',
    slug: 'civil-infrastructure-works',
    title: 'Civil & Infrastructure Works',
    tagline: 'Heavy Earthworks, RCC Bridges, Slope Stabilization & Municipal Drainage',
    description: 'Heavy civil infrastructure contracting across Nepal including reinforced concrete bridges, deep foundations, mountain road slope stabilization, and industrial stormwater networks.',
    iconName: 'HardHat',
    subServices: [
      {
        id: 'heavy-civil-foundations',
        slug: 'heavy-civil-foundations',
        title: 'Heavy Civil Foundations, Rafts & Piling',
        category: 'Civil & Infrastructure Works',
        categorySlug: 'civil-infrastructure-works',
        categoryNumber: 3,
        shortDescription: 'Mass concrete raft foundations, cast-in-situ bored piling, machine plinths, and soil improvement.',
        fullDescription: 'Our heavy civil engineering division specializes in deep foundations for heavy industrial structures, bridge piers, and multi-story towers. We execute bored cast-in-situ concrete piles, micropiling for seismic retrofits, mass concrete raft foundations with thermal temperature control, and vibration-isolated machine foundations.',
        keyFeatures: [
          'Cast-in-situ bored piling using hydraulic rotary rigs in gravelly and clayey strata',
          'Mass concrete raft foundations with low-heat cement mix and thermocouple heat monitoring',
          'Heavy industrial vibratory machine foundation plinths with anti-vibration neoprene isolators',
          'Site dewatering, deep well-point systems, and high water-table excavation management',
        ],
        deliverables: [
          'Pile integrity test (PIT) reports and static vertical load test verification certificates',
          'Ready-mix concrete 7-day and 28-day cube crushing strength test reports',
          'Complete geotechnical settlement monitoring logs and as-built foundation survey',
        ],
        standards: 'IS 2911 (Piling) / IS 456 / DoR Bridge Specifications / ASTM D5882',
        visualType: 'civil',
        imageUrl: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1200&q=80',
        specs: [
          { label: 'Pile Diameters', value: '450 mm to 1200 mm Bored Cast-in-Situ' },
          { label: 'Concrete Grades', value: 'M25, M30, M35, M40 High Performance Concrete' },
          { label: 'Load Capacity', value: 'Static Pile Load Testing up to 2.5x Design Load' },
        ],
        estimatedDuration: '2 - 6 Months',
        targetClients: 'Bridge Contractors, Industrial Plants, Infrastructure Authorities',
      },
      {
        id: 'civil-construction',
        slug: 'civil-construction',
        title: 'RCC Bridge & Culvert Construction',
        category: 'Civil & Infrastructure Works',
        categorySlug: 'civil-infrastructure-works',
        categoryNumber: 3,
        shortDescription: 'Reinforced concrete girder bridges, box culverts, river training guide bunds, and well foundations.',
        fullDescription: 'Kyoly Construction takes on challenging river-crossing civil contracts across Nepal. Our capabilities span reinforced concrete T-beam and pre-stressed box girder bridges, open caisson well sinking in riverbeds, heavy concrete abutments with elastomeric bearing pads, and reinforced box culverts for highways and municipal bypasses.',
        keyFeatures: [
          'Reinforced concrete T-beam and pre-stressed concrete girder bridge superstructure construction',
          'Pneumatic and open well foundation sinking in deep riverbed alluvial soils',
          'High-capacity elastomeric neoprene bearing installations and bridge expansion joints',
          'Heavy stone masonry and concrete guide bunds for river training and scour protection',
        ],
        deliverables: [
          'DoR-approved structural bridge design and hydraulic scour depth calculation dossiers',
          'Pre-stressing elongation and tendon grouting pressure quality records',
          'Official bridge static and dynamic load test certificates before public traffic opening',
        ],
        standards: 'Department of Roads (DoR) Nepal Standards / IRC:5 / IRC:6 / IRC:21',
        visualType: 'civil',
        imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        specs: [
          { label: 'Span Capacities', value: '15m to 60m+ RCC / Pre-Stressed Girder Spans' },
          { label: 'Loading Standards', value: 'IRC Standard Heavy Highway Loadings' },
          { label: 'Substructure', value: 'Mass RCC Abutments, Circular Piers, Well Foundations' },
        ],
        estimatedDuration: '8 - 24 Months',
        targetClients: 'Department of Roads (DoR), Provincial Ministries, Municipal Infrastructure',
      },
      {
        id: 'slope-protection-retaining',
        slug: 'slope-protection-retaining',
        title: 'Slope Protection, Retaining Walls & Gabions',
        category: 'Civil & Infrastructure Works',
        categorySlug: 'civil-infrastructure-works',
        categoryNumber: 3,
        shortDescription: 'Hill road slope stabilization, zinc-coated wire gabion revetments, soil nailing, and cantilever RCC retaining walls.',
        fullDescription: 'Given the rugged mountain topography of Nepal, slope stability is paramount. We engineer engineered retaining walls, heavily galvanized zinc-coated wire gabion structures, soil nailing, shotcrete surface protection, and vegetative soil bio-engineering to protect roads, building pads, and riverbanks from landslides and monsoon flash floods.',
        keyFeatures: [
          'Heavy zinc-coated double-twisted wire mesh gabion revetment walls with boulder filling',
          'Reinforced concrete cantilever and counterfort retaining walls with weep hole drainage',
          'Soil nailing, horizontal drain drilling, and wire-mesh shotcrete slope armoring',
          'Soil bio-engineering using deep-rooting grasses and brush layering for natural erosion control',
        ],
        deliverables: [
          'Slope stability factor of safety (FoS) geotechnical calculation sheets (> 1.5 FoS)',
          'Gabion wire tensile strength and zinc coating thickness test certificates',
          'Weep hole sub-surface drainage layout drawings and settlement monitoring records',
        ],
        standards: 'DoR Norms / IS 16014 (Gabions) / FHWA Rock Slope Engineering Guidelines',
        visualType: 'civil',
        imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
        specs: [
          { label: 'Wall Heights', value: 'Up to 12m Multi-Tier Gabion & RCC Systems' },
          { label: 'Wire Specifications', value: 'Heavily Galvanized Double-Twisted Hexagonal Mesh' },
          { label: 'Backfill Drainage', value: 'Geotextile Non-Woven Fabric with Graded Filter Material' },
        ],
        estimatedDuration: '1 - 6 Months',
        targetClients: 'Highway Projects, Hydropower Access Roads, Mountain Resorts',
      },
      {
        id: 'drainage-stormwater-systems',
        slug: 'drainage-stormwater-systems',
        title: 'Industrial Drainage & Stormwater Infrastructure',
        category: 'Civil & Infrastructure Works',
        categorySlug: 'civil-infrastructure-works',
        categoryNumber: 3,
        shortDescription: 'High-capacity stormwater drainage, reinforced concrete canals, interceptor drains, and runoff retention ponds.',
        fullDescription: 'We build durable stormwater conveyance infrastructure designed to withstand torrential monsoon rains. Our teams construct cast-in-situ reinforced concrete U-shaped drains, precast concrete box culverts, sediment catch basins, oil-water separators for industrial sites, and urban flood alleviation canals.',
        keyFeatures: [
          'Cast-in-situ and precast reinforced concrete stormwater drainage canals with removable covers',
          'Hydraulic sizing calculated from 50-year return period rainfall intensity data',
          'Sediment trap basins, trash racks, and energy dissipating outlet structures',
          'Industrial stormwater collection with integrated gravity oil-grit separation chambers',
        ],
        deliverables: [
          'Hydraulic gradient calculation sheets and runoff discharge capacity reports',
          'Concrete water-tightness and invert slope grade verification survey',
          'Comprehensive municipal drainage connection permits and as-built plans',
        ],
        standards: 'IS 1742 / NBC 208 / DoR Drainage Guidelines',
        visualType: 'civil',
        imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
        specs: [
          { label: 'Drain Sections', value: 'Rectangular RCC Box, Trapezoidal Masonry, Precast U-Drains' },
          { label: 'Peak Capacity', value: 'Sized for 50-Year Return Monsoon Peak Runoff' },
          { label: 'Cover Slabs', value: 'Heavy Duty IRC Standard Traffic-Load Graded Slabs' },
        ],
        estimatedDuration: '2 - 8 Months',
        targetClients: 'Industrial Zones, Municipalities, Real Estate Townships',
      },
    ],
  },

  // 4. Electrical Installation & Services
  {
    number: 4,
    id: 'electrical-installation-services',
    slug: 'electrical-installation-services',
    title: 'Electrical Installation & Services',
    tagline: 'Industrial HT/LT Panels, Commercial MEP, Grounding & Renewable Backup',
    description: 'Full-spectrum electrical engineering services including industrial power distribution panels, complete commercial MEP, low-impedance earthing systems, and commercial solar installations.',
    iconName: 'Cpu',
    subServices: [
      {
        id: 'industrial-electrification-panels',
        slug: 'industrial-electrification-panels',
        title: 'Industrial Electrification & HT/LT Panels',
        category: 'Electrical Installation & Services',
        categorySlug: 'electrical-installation-services',
        categoryNumber: 4,
        shortDescription: 'Custom switchgear, Motor Control Centers (MCC), Automatic Power Factor Correction (APFC), and heavy cable termination.',
        fullDescription: 'Kyoly Construction designs, fabricates, installs, and commissions industrial electrical distribution systems. We build compartmentalized Motor Control Centers (MCC), Main LT Switchboards, busduct trunking systems, variable frequency drive (VFD) panels, and automated power factor correction (APFC) capacitor banks to eliminate utility penalties.',
        keyFeatures: [
          'Design and installation of CPRI-tested modular Main LT Distribution Switchboards',
          'Motor Control Centers (MCC) and Intelligent VFD automation panels',
          'Automatic Power Factor Correction (APFC) panels maintaining power factor > 0.98',
          'Heavy XLPE armored copper/aluminum power cable laying, ladder tray erection, and heat-shrink terminations',
        ],
        deliverables: [
          'Panel single line diagrams (SLD), schematic wiring schedules, and cable routing schedules',
          'Dielectric insulation resistance, high-voltage withstand, and contact resistance test reports',
          'Safety compliance clearance from government electrical inspectorate',
        ],
        standards: 'IEC 61439-1/2 / IS 8623 / IEEE 241 Industrial Power Systems',
        visualType: 'mep',
        imageUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1200&q=80',
        specs: [
          { label: 'Panel Busbar Rating', value: 'Up to 4000A Electrolytic Grade Tinned Copper/Aluminum' },
          { label: 'Ingress Protection', value: 'IP54 / IP55 Indoor & Outdoor Enclosures' },
          { label: 'Short Circuit Rating', value: '50 kA for 1 Second (CPRI Tested Type)' },
        ],
        estimatedDuration: '1 - 4 Months',
        targetClients: 'Manufacturing Plants, Processing Factories, Cold Stores, Hotels',
      },
      {
        id: 'commercial-building-mep',
        slug: 'commercial-building-mep',
        title: 'Commercial Building MEP (Electrical, Mechanical & Fire)',
        category: 'Electrical Installation & Services',
        categorySlug: 'electrical-installation-services',
        categoryNumber: 4,
        shortDescription: 'Integrated building electrification, VRF air conditioning, fire hydrants, automated sprinklers, and plumbing.',
        fullDescription: 'Our MEP division turns empty concrete shells into intelligent, fully functioning commercial buildings. We handle the complete integration of high-rise building electrical wiring, energy-efficient VRF/chilled water HVAC systems, fire detection and suppression networks, emergency escape lighting, and booster pumping systems.',
        keyFeatures: [
          'Complete low-smoke zero-halogen (LSZH) fire-retardant electrical building wiring & conduits',
          'Variable Refrigerant Flow (VRF) and centralized HVAC cooling and ventilation systems',
          'Addressable fire alarm panels, optical smoke detectors, and automated sprinkler networks',
          'Hydro-pneumatic booster pumping systems, water filtration, and sanitary drainage stacks',
        ],
        deliverables: [
          'Coordinated MEP shop drawings and reflected ceiling layout plans (RCP)',
          'Air balancing and water pressure hydrostatic leak test certificates',
          'Building occupancy fire safety NOC from municipal fire services',
        ],
        standards: 'NBC 207 / NBC 208 / NFPA 13 & 72 / ASHRAE / IS 732',
        visualType: 'mep',
        imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
        specs: [
          { label: 'Wiring Standard', value: 'FR-LSH (Fire Retardant Low Smoke & Halogen) Copper' },
          { label: 'Fire Suppression', value: 'Wet Riser Hydrant System + Automatic Sprinklers' },
          { label: 'HVAC Integration', value: 'VRF / Inverter Packaged Units with Fresh Air Recovery' },
        ],
        estimatedDuration: '3 - 10 Months',
        targetClients: 'Commercial Towers, Hospitals, Banks, Hotels, Educational Campuses',
      },
      {
        id: 'grounding-lightning-protection',
        slug: 'grounding-lightning-protection',
        title: 'Lightning Protection & Low-Impedance Earthing',
        category: 'Electrical Installation & Services',
        categorySlug: 'electrical-installation-services',
        categoryNumber: 4,
        shortDescription: 'Chemical earth pits, copper bonded grounding electrodes, Early Streamer Emission (ESE) lightning arresters, and surge suppression.',
        fullDescription: 'Nepal experiences high lightning flash densities during pre-monsoon and monsoon seasons. We design and install low-impedance grounding grids and advanced lightning protection systems to shield sensitive industrial equipment, substations, and residential complexes from devastating direct lightning strikes and switching surges.',
        keyFeatures: [
          'Early Streamer Emission (ESE) and traditional Faraday mesh air terminal installations',
          'Copper-bonded steel ground rods and maintenance-free chemical ground enhancement compounds',
          'Equipotential bonding of all exposed structural steel, metallic pipes, and equipment enclosures',
          'Type 1 + Type 2 heavy-duty Surge Protection Devices (SPD) installed at main electrical panels',
        ],
        deliverables: [
          'Earth resistance testing logs with calibrated 4-pin earth testers confirming < 1.0 Ohm',
          'Lightning protection radius calculation sheets conforming to NFC 17-102 and IEC 62305',
          'Annual maintenance inspection certificates and ground integrity sign-offs',
        ],
        standards: 'IEC 62305 / NFC 17-102 / IEEE 80 / IS 3043 (Earthing)',
        visualType: 'substation',
        imageUrl: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=1200&q=80',
        specs: [
          { label: 'Target Earth Resistance', value: '< 1.0 Ohm for Sensitive Electronics & Power' },
          { label: 'Protection Radius', value: 'Up to 100m+ per ESE Air Terminal Unit' },
          { label: 'Electrode Life', value: '25+ Years Maintenance-Free Copper Bonded Rods' },
        ],
        estimatedDuration: '1 - 3 Weeks',
        targetClients: 'Industrial Facilities, Data Centers, High-Rise Towers, Substations',
      },
      {
        id: 'renewable-solar-backup',
        slug: 'renewable-solar-backup',
        title: 'Commercial Solar PV & Diesel Generator Backup Systems',
        category: 'Electrical Installation & Services',
        categorySlug: 'electrical-installation-services',
        categoryNumber: 4,
        shortDescription: 'Rooftop on-grid/hybrid solar power plants, net-metering synchronization with NEA, and automated emergency generator transfer.',
        fullDescription: 'Kyoly Construction engineers resilient clean energy and backup power infrastructure. We install commercial rooftop solar photovoltaic (PV) arrays with net-metering approvals from the Nepal Electricity Authority, high-efficiency grid-tied inverters, acoustic-enclosed diesel generators (15 kVA to 1000 kVA), and Automatic Transfer Switches (ATS) for seamless power continuity.',
        keyFeatures: [
          'High-efficiency Tier 1 monocrystalline solar PV modules with anodized aluminum racking',
          'On-grid and hybrid solar inverters with online cloud generation monitoring',
          'Acoustic soundproof diesel generator sets with synchronized Automatic Transfer Switches (ATS)',
          'Net-metering application processing and bi-directional meter installation with NEA',
        ],
        deliverables: [
          'Solar generation simulation reports (PVsyst) estimating monthly kilowatt-hour savings',
          'Structural roof load integrity assessment certificate for solar racking installations',
          'NEA net-metering interconnection sign-off and warranty certificate (25-year panel warranty)',
        ],
        standards: 'IEC 61215 / IEC 61730 / IEEE 1547 / NEA Net-Metering Guidelines',
        visualType: 'distribution',
        imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
        specs: [
          { label: 'Solar Capacity', value: '10 kWp to 500 kWp+ Commercial Rooftop & Ground Mount' },
          { label: 'Generator Range', value: '15 kVA to 1000 kVA Silent DG Sets' },
          { label: 'Switching Speed', value: '< 10 Seconds Automatic Transfer Switch (ATS)' },
        ],
        estimatedDuration: '3 - 8 Weeks',
        targetClients: 'Factories, Hotels, Educational Institutes, Hospitals, Commercial Complex',
      },
    ],
  },

  // 5. Engineering Design & Consultancy
  {
    number: 5,
    id: 'engineering-design-consultancy',
    slug: 'engineering-design-consultancy',
    title: 'Engineering Design & Consultancy',
    tagline: 'DPR Feasibility, Seismic Modeling, Official BOQ Estimation & Tender Advisory',
    description: 'Expert engineering consulting delivering Detailed Project Reports (DPR), advanced seismic analysis, government approved BOQ tender rates, and municipal permit clearance.',
    iconName: 'Compass',
    subServices: [
      {
        id: 'design-estimation',
        slug: 'design-estimation',
        title: 'Detailed Project Reports (DPR) & Feasibility Studies',
        category: 'Engineering Design & Consultancy',
        categorySlug: 'engineering-design-consultancy',
        categoryNumber: 5,
        shortDescription: 'Comprehensive technical, geotechnical, environmental, and financial feasibility studies for infrastructure projects.',
        fullDescription: 'Before committing capital, developers and agencies rely on our technical consultancy team to assess project feasibility. We conduct topographic land surveys, sub-soil geotechnical drilling, environmental screening, hydrological discharge calculations, structural concept designs, and financial internal rate of return (IRR) models.',
        keyFeatures: [
          'Detailed topographic total-station and drone photogrammetric land mapping',
          'Geotechnical soil investigation with Standard Penetration Tests (SPT) and laboratory soil mechanics',
          'Hydrological catchment discharge modeling and flood-risk hazard mapping',
          'Financial viability analysis, capital expenditure (CAPEX) vs operational expenditure (OPEX) models',
        ],
        deliverables: [
          'Bank-grade Detailed Project Report (DPR) formatted for commercial lenders and government ministries',
          'Geotechnical soil test interpretive report with recommended foundation bearing capacities',
          'Risk mitigation matrix and preliminary construction timeline schedule',
        ],
        standards: 'Nepal Engineering Council / National Planning Commission Guidelines / FIDIC',
        visualType: 'design-estimation',
        imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
        specs: [
          { label: 'Report Format', value: 'Bankable DPR with Technical, Geotechnical & Financial Volumes' },
          { label: 'Survey Accuracy', value: 'Total Station & RTK GPS Survey (< 5mm Accuracy)' },
          { label: 'Soil Testing', value: 'Borehole Drilling, SPT, Atterberg Limits, Direct Shear Tests' },
        ],
        estimatedDuration: '4 - 12 Weeks',
        targetClients: 'Government Ministries, Private Developers, Commercial Banks, International Donors',
      },
      {
        id: 'seismic-structural-analysis',
        slug: 'seismic-structural-analysis',
        title: 'Structural Seismic Analysis & Retrofitting',
        category: 'Engineering Design & Consultancy',
        categorySlug: 'engineering-design-consultancy',
        categoryNumber: 5,
        shortDescription: 'Advanced non-linear dynamic earthquake modeling, pushover analysis, and seismic retrofitting for existing buildings.',
        fullDescription: 'Situated in the seismically active Himalayan collision zone, buildings in Nepal require rigorous earthquake engineering. We perform response spectrum and non-linear static pushover analyses under NBC-105:2020. For existing vulnerable buildings, we design engineered seismic retrofitting solutions such as RCC column jacketing, steel bracing, and carbon-fiber reinforced polymer (CFRP) wraps.',
        keyFeatures: [
          'Response spectrum and non-linear pushover seismic modeling using ETABS Ultimate',
          'Structural drift, soft-story, torsional irregularity, and P-Delta displacement checks',
          'Seismic vulnerability assessment of existing buildings using non-destructive testing (NDT)',
          'Engineered retrofitting solutions: RCC jacketing, shear wall additions, and CFRP wrapping',
        ],
        deliverables: [
          'Seismic structural stability certification endorsed by registered structural engineer',
          'Pushover capacity curves and performance point verification reports',
          'Retrofitting construction drawings with bar bending details and anchor specifications',
        ],
        standards: 'NBC 105:2020 / IS 1893 (Part 1) / ASCE 41-17 (Seismic Evaluation & Retrofit)',
        visualType: 'design',
        imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
        specs: [
          { label: 'Code Conformance', value: 'NBC 105:2020 (Nepal National Building Code - Seismic)' },
          { label: 'Analysis Types', value: 'Equivalent Static, Response Spectrum, Pushover Non-Linear' },
          { label: 'Retrofit Options', value: 'CFRP Wrap, Steel Bracing, Micro-Concrete Column Jacketing' },
        ],
        estimatedDuration: '2 - 6 Weeks',
        targetClients: 'Building Owners, International NGOs, Embassies, Schools, Hospitals',
      },
      {
        id: 'boq-tender-cost-estimation',
        slug: 'boq-tender-cost-estimation',
        title: 'Bill of Quantities (BOQ) & Tender Cost Estimation',
        category: 'Engineering Design & Consultancy',
        categorySlug: 'engineering-design-consultancy',
        categoryNumber: 5,
        shortDescription: 'Computer-aided quantity take-offs, itemized BOQs, and rate analysis based on official Nepal Government district rates.',
        fullDescription: 'Accurate cost forecasting prevents cost overruns and contract disputes. Our quantity surveying cell performs meticulous CAD/BIM quantity take-offs to prepare comprehensive Bill of Quantities (BOQ). We apply official government district rates (DUDBC and Department of Roads norms) to construct realistic construction budgets and tender bidding documents.',
        keyFeatures: [
          'Precise digital quantity take-offs extracted from architectural and structural drawings',
          'Detailed rate analysis conforming to official Nepal Government DUDBC / DoR District Rates',
          'Preparation of Standard Bidding Documents (SBD) for public procurement and private tenders',
          'Value engineering reviews to eliminate redundant materials without compromising safety',
        ],
        deliverables: [
          'Itemized Excel and PDF Bill of Quantities (BOQ) with comprehensive technical specifications',
          'Government approved rate analysis breakdown sheets (labor, materials, equipment, overheads)',
          'Confidential engineer cost estimate and bid evaluation criteria package',
        ],
        standards: 'Public Procurement Act of Nepal (PPA) / DUDBC Norms / DoR Standard Specifications',
        visualType: 'design-estimation',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
        specs: [
          { label: 'Rate Basis', value: 'Latest Fiscal Year District Rate Schedules (Kathmandu & All 77 Districts)' },
          { label: 'Take-Off Method', value: 'Digital CAD Extraction & 3D BIM Automated Schedules' },
          { label: 'Tender Standards', value: 'PPMO Standard Bidding Documents (SBD) / FIDIC Red & Yellow' },
        ],
        estimatedDuration: '1 - 3 Weeks',
        targetClients: 'Public Agencies, Private Contractors, Bidders, Property Developers',
      },
      {
        id: 'municipal-permit-approvals',
        slug: 'municipal-permit-approvals',
        title: 'Municipal Building Permit & Statutory Approvals',
        category: 'Engineering Design & Consultancy',
        categorySlug: 'engineering-design-consultancy',
        categoryNumber: 5,
        shortDescription: 'Complete municipality permit drawing sets, structural endorsement, and formal occupancy certificate clearance.',
        fullDescription: 'Navigating municipal building permit bureaucracy in Nepal can be time-consuming. Kyoly Construction handles the entire municipal approval lifecycle—from initial architectural clearance (Dharauti / Map Pass), structural endorsement by registered structural engineers, to final building completion and occupancy certificates (Nirman Sampanna Pramanpatra).',
        keyFeatures: [
          'Preparation of municipality standard permit drawing sheets (Blueprint drawings, floor plans, sections)',
          'Formal structural design endorsement and safety undertaking signed by licensed engineers',
          'Processing through municipal electronic building permit systems (e-BPS) across Nepal',
          'Stage-wise site inspections, plinth level sign-off, and final occupancy certificate procurement',
        ],
        deliverables: [
          'Municipality stamped approved architectural and structural permit blueprints',
          'Official municipal building permit letter (Nirman Ijaajat Patra)',
          'Final construction completion and occupancy certificate (Nirman Sampanna Pramanpatra)',
        ],
        standards: 'Nepal National Building Code (NBC) / Local Municipality By-Laws / NEC Standards',
        visualType: 'design',
        imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
        specs: [
          { label: 'Jurisdiction', value: 'Kathmandu Valley Municipalities, Janakpurdham & All Municipalities across Nepal' },
          { label: 'Permit Platform', value: 'e-BPS (Electronic Building Permit System) & Direct Municipal Submission' },
          { label: 'Sign-Off', value: 'Nepal Engineering Council (NEC) Licensed Structural Engineer' },
        ],
        estimatedDuration: '3 - 8 Weeks (Subject to Municipal Review Timelines)',
        targetClients: 'Homeowners, Commercial Developers, Industrial Facility Owners',
      },
    ],
  },
];

// Flat list of all sub-services for easy lookup by slug
export const ALL_SUB_SERVICES: SubServiceItem[] = MAIN_SERVICE_CATEGORIES.flatMap(
  (category) => category.subServices
);

// Helper function to find a sub-service by slug
export function getSubServiceBySlug(slug: string): SubServiceItem | undefined {
  return ALL_SUB_SERVICES.find((s) => s.slug === slug || s.id === slug);
}

// Helper to find related sub-services in the same category
export function getRelatedSubServices(categorySlug: string, currentSlug: string): SubServiceItem[] {
  const category = MAIN_SERVICE_CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) return [];
  return category.subServices.filter((s) => s.slug !== currentSlug);
}

// Backward compatibility for existing components referencing SERVICES_DATA
export const SERVICES_DATA = ALL_SUB_SERVICES;
export type ServiceItem = SubServiceItem;
