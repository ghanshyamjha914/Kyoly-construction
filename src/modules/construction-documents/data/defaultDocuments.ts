import {
  HouseConstructionAgreement,
  LabourAgreement,
  SubcontractAgreement,
  BoqQuotation,
  PaymentSchedule,
  VariationOrder,
  BuildingPermitRecord,
  CompletionCertificateRecord,
  BuildingHandoverRecord,
} from '../types';

export const INITIAL_HOUSE_AGREEMENTS: HouseConstructionAgreement[] = [
  {
    id: 'agr-001',
    docNumber: 'KCY-AGR-2026-001',
    projectId: 'proj-001',
    revision: 'Rev. 0',
    date: '2026-01-20',
    status: 'Final',

    ownerDetails: {
      fullName: 'Er. Rajesh Shrestha',
      address: 'Chunikhel, Ward No. 3, Budhanilkantha, Kathmandu',
      citizenshipNo: '27-01-72-04519',
      contact: '+977-9851023456',
      email: 'rajesh.shrestha@gmail.com',
    },

    contractorDetails: {
      companyName: 'Kyoly Construction Pvt. Ltd.',
      registrationNo: '343834/080/081',
      panVatNo: '620155829',
      address: 'Buddhanagar-10, New Baneshwor, Kathmandu, Nepal',
      contact: '+977-9705551631',
      authorizedRepresentative: 'Er. Sujan Karki (Project Director)',
    },

    contractType: 'Labour + Materials',
    materialResponsibility: 'Contractor',
    materialResponsibilityDetails:
      'Contractor shall supply 100% of structural materials conforming to approved specifications: Jagdamba/Shivalik Fe500 TMT rebar, Shivam/Hetauda 43/53 Grade OPC/PPC cement, River Sand from approved quarry, machine crushed 20mm/10mm aggregate, and first-class Nepali bricks. Finishing sanitary fittings and special tiles shall be chosen by Owner and procured on agreed provisional sum.',
    scopeOfWork: [
      'Site clearance, benching, foundation layout setting using digital total station.',
      'Machine & manual soil excavation for isolated & combined column footings.',
      'Plain Cement Concrete (PCC 1:3:6) mud-mat foundation bed.',
      'RCC footing, column stub, plinth tie-beam casting with M25 ready/site-mix concrete.',
      'Superstructure RCC columns, beams, floor slabs and staircase (M25 mix, calibrated mechanical vibrator).',
      '9-inch external and 4.5-inch internal first-class brick masonry in 1:4 cement-sand mortar.',
      'Internal 1:4 cement sand plaster and external weather-coat sponge finish plastering.',
      'Concealed conduit electrical piping, modular switch boxes, earthing pit with copper plate.',
      'Concealed CPVC hot/cold water supply and PVC soil waste drainage piping.',
      'Roof terrace brick-bat coba waterproofing and parapet wall casting.',
    ],

    contractValue: 14850000, // NPR 1.485 Crore
    paymentTerms: [
      { milestone: 'Mobilization Advance upon Agreement Signing', percentage: 10, amount: 1485000, notes: 'Paid against bank guarantee/receipt' },
      { milestone: 'Completion of Footing & Foundation Casting up to Plinth Level', percentage: 15, amount: 2227500, notes: 'Verified by structural engineer' },
      { milestone: 'Ground Floor Column & First Floor Slab Casting', percentage: 15, amount: 2227500, notes: 'Cube test 28-day compliance' },
      { milestone: 'Second Floor Column & Roof Slab Casting', percentage: 15, amount: 2227500, notes: 'Structural frame completed' },
      { milestone: 'Top Floor Cover Slab & Parapet Wall', percentage: 10, amount: 1485000, notes: 'Grey structure complete' },
      { milestone: 'Full Brick Masonry & Plastering Works (Internal & External)', percentage: 15, amount: 2227500, notes: 'Plaster curing inspected' },
      { milestone: 'Plumbing, Electrical Wiring & Flooring Works', percentage: 10, amount: 1485000, notes: 'Pressure & insulation tested' },
      { milestone: 'Final Finishing, Painting, Handover & Completion Certificate', percentage: 5, amount: 742500, notes: 'Upon joint punch-list clearance' },
      { milestone: 'Retention Money (Released after Defect Liability Period)', percentage: 5, amount: 742500, notes: '365 days after handover' },
    ],

    retentionPercentage: 5,
    defectLiabilityPeriodMonths: 12,
    disputeResolutionMethod:
      'Mutual consultation within 15 days; failing which referred to arbitration under Nepal Arbitration Act 2055, conducted in Kathmandu.',
    specialConditions:
      'All structural work strictly adheres to NBC 105:2020 seismic standards. Curing shall be maintained for a minimum of 14 continuous days for all RCC and masonry surfaces.',

    signatures: {
      ownerSigned: true,
      ownerSignedDate: '2026-01-20',
      contractorSigned: true,
      contractorSignedDate: '2026-01-20',
      witness1Name: 'Er. Bishal Adhikari (Consultant Engineer)',
      witness2Name: 'Suman Shrestha (Family Representative)',
    },

    preparedBy: 'Er. Sujan Karki',
    checkedBy: 'Advocate Ramesh Bhattarai (Legal Consultant)',
    approvedBy: 'Er. Rajesh Shrestha (Client)',
    updatedAt: '2026-01-20T16:00:00Z',
  },
];

export const INITIAL_LABOUR_AGREEMENTS: LabourAgreement[] = [
  {
    id: 'lab-001',
    docNumber: 'KCY-LAB-2026-001',
    projectId: 'proj-001',
    revision: 'Rev. 0',
    date: '2026-02-05',
    status: 'Final',

    workerName: 'Tek Bahadur Thapa',
    citizenshipId: '14-01-70-03812 (Sindhuli)',
    permanentAddress: 'Kamalamai-4, Sindhuli, Bagmati Province',
    temporaryAddress: 'Hattigauda, Budhanilkantha-3, Kathmandu',
    contactNumber: '+977-9812345678',
    emergencyContact: '+977-9809876543 (Wife: Sita Thapa)',

    tradeSkill: 'Bar Bender (Steel)',
    workDescription:
      'Precision bar bending, cutting, tying of Fe500 TMT reinforcement steel bars (8mm, 10mm, 12mm, 16mm, 20mm, 25mm) for footing mesh, column cages, beam stirrups, and two-way slab rebar according to structural bar bending schedules (BBS).',
    wageBasis: 'Daily',
    wageRate: 1450, // NPR per day
    workingHours: '8:00 AM to 5:00 PM (8 Hours standard, with 1 Hour lunch break from 12:00 PM to 1:00 PM)',
    overtimeTerms:
      'Overtime compensated at 1.5 times normal hourly rate (NPR 271.88/hr) in compliance with Section 31 of Nepal Labour Act 2074.',
    paymentSchedule: 'Weekly settlement every Sunday upon verification of biometric/site muster roll.',
    attendanceRules: 'Daily morning roll call at 7:55 AM. Three unexcused absences constitute voluntary cessation.',
    leaveEntitlement: 'Weekly rest day on Saturday. Sick leave and emergency leave as per site project guidelines.',
    toolsProvidedBy: 'Contractor',
    safetyPpeRequirements:
      'Mandatory hard hat (calibrated ISI/CE), steel-toe safety boots, cut-resistant gloves, reflective high-vis vest. Bar tying hooks and cutting levers provided by contractor.',
    accommodationProvided: true,
    foodProvided: false,
    accidentInsuranceTerms:
      'Full coverage under Kyoly Construction Group Workmen Compensation Policy (up to NPR 700,000 accidental medical/disability cover).',
    terminationClauses: '7 days advance written notice by either party; immediate dismissal for intoxication or safety violation.',
    disputeResolution: 'Settled by Site In-charge Engineer and designated Worker Representative.',

    witness1Name: 'Ram Kumar Mandal (Head Mason)',
    witness2Name: 'Deepak Sharma (Site Safety Officer)',

    preparedBy: 'Deepak Sharma (HSE Supervisor)',
    approvedBy: 'Er. Sujan Karki (Project Director)',
    updatedAt: '2026-02-05T12:00:00Z',
  },
];

export const INITIAL_SUBCONTRACT_AGREEMENTS: SubcontractAgreement[] = [
  {
    id: 'sub-001',
    docNumber: 'KCY-SUB-2026-001',
    projectId: 'proj-002',
    revision: 'Rev. 0',
    date: '2026-03-01',
    status: 'Final',

    mainContractor: 'Kyoly Construction Pvt. Ltd.',
    subcontractorName: 'Himalayan Structural Steel & Fabrication Works Pvt. Ltd.',
    subcontractorRegNo: '189422/074/075',
    subcontractorPan: '605928194',
    subcontractorContact: '+977-9851144220',
    subcontractorAddress: 'Patan Industrial Estate, Lagankhel, Lalitpur',

    scopeOfWork:
      'Design verification, workshop fabrication, sand-blasting, anti-corrosive primer painting, and site erection of structural steel mezzanine framing, roof truss systems, and external service cat-walks at Baneshwor Commercial Complex.',
    workLocation: 'Plot Block B-18, Madan Bhandari Path, New Baneshwor, Kathmandu',
    contractValue: 4250000, // NPR 42.5 Lakhs
    boqReference: 'BOQ Item Nos. 4.01 through 4.08 (Structural Steel Works)',
    startDate: '2026-03-15',
    completionDate: '2026-06-30',

    materialResponsibility: 'Subcontractor',
    labourResponsibility: 'Subcontractor shall deploy certified AWS/IS welders and calibrated riggers with PPE.',
    qualityRequirements:
      '100% visual inspection, ultrasonic flaw detection (UT) on full-penetration butt welds, minimum 75-micron zinc chromate primer.',
    safetyCompliance:
      'Mandatory double-lanyard full body harness for height work (>2.0m), zero-harm hot work permits, fire extinguisher at welding spots.',
    paymentTerms:
      '30% running bill upon workshop fabrication verification; 40% upon site delivery and assembly; 25% upon final erection and torque testing; 5% retention for 6 months.',
    measurementFrequency: 'Monthly joint measurement on actual weight installed based on theoretical steel weight table.',
    variationPolicy: 'Written variation order signed by Kyoly Project Director required prior to fabricating non-BOQ members.',
    delayLiquidatedDamages: '0.05% of subcontract value per calendar day of unexcused delay, capped at 10% maximum.',
    defectLiabilityPeriod: '6 Months from certificate of completion of structural steel package.',
    terminationTerms: '14 days notice for material breach or safety non-compliance.',
    disputeResolution: 'Kathmandu-based arbitration under Nepal Arbitration Act 2055.',

    preparedBy: 'Er. Sujan Karki',
    approvedBy: 'Sunil Shakya (Managing Director, Himalayan Steel)',
    updatedAt: '2026-03-01T15:00:00Z',
  },
];

export const INITIAL_BOQ_QUOTATIONS: BoqQuotation[] = [
  {
    id: 'boq-001',
    docNumber: 'KCY-BOQ-2026-001',
    projectId: 'proj-001',
    revision: 'Rev. 0',
    date: '2026-01-18',
    status: 'Final',
    title: 'Item Rate Bill of Quantities & Civil Structural Quotation for Shrestha Residence',

    items: [
      {
        id: 'item-1',
        sn: 1,
        description: 'Site clearance, benching, digital total station alignment, and profile pegging including excavation of trial pits.',
        unit: 'Lump Sum',
        quantity: 1,
        rate: 65000,
        amount: 65000,
        category: 'Earthworks',
      },
      {
        id: 'item-2',
        sn: 2,
        description: 'Earthwork excavation in foundation trenches and isolated footing pits in all types of soil including disposal of surplus earth within 50m radius.',
        unit: 'cu.m',
        quantity: 145.5,
        rate: 580,
        amount: 84390,
        category: 'Earthworks',
      },
      {
        id: 'item-3',
        sn: 3,
        description: 'Dry stone soling with hand-packed gravel packing under footings and ground floor tie beams.',
        unit: 'cu.m',
        quantity: 28.0,
        rate: 2850,
        amount: 79800,
        category: 'Foundations',
      },
      {
        id: 'item-4',
        sn: 4,
        description: 'Plain Cement Concrete (PCC 1:3:6) mud-mat foundation bed using 43 grade OPC cement and 20mm down graded aggregate.',
        unit: 'cu.m',
        quantity: 18.5,
        rate: 8900,
        amount: 164650,
        category: 'Foundations',
      },
      {
        id: 'item-5',
        sn: 5,
        description: 'Reinforced Cement Concrete (RCC M25 mix - 1:1.5:3) for footings, column necks, and plinth tie beams including machine mixing, placement, and calibrated vibratory compaction.',
        unit: 'cu.m',
        quantity: 48.0,
        rate: 14200,
        amount: 681600,
        category: 'RCC Works',
      },
      {
        id: 'item-6',
        sn: 6,
        description: 'Reinforced Cement Concrete (RCC M25 mix) for superstructure columns, longitudinal/transverse beams, floor slabs (125mm thick), and waist-slab staircase.',
        unit: 'cu.m',
        quantity: 112.5,
        rate: 15400,
        amount: 1732500,
        category: 'RCC Works',
      },
      {
        id: 'item-7',
        sn: 7,
        description: 'Thermo-Mechanically Treated (TMT) Fe500 high-yield strength deformed steel reinforcement bar cutting, bending, binding with 18 SWG annealed GI wire.',
        unit: 'kg',
        quantity: 16800,
        rate: 118,
        amount: 1982400,
        category: 'Steel Reinforcement',
      },
      {
        id: 'item-8',
        sn: 8,
        description: 'Centering and shuttering with film-faced waterproof plywood and adjustable steel props for columns, beams, slabs and staircase soffits.',
        unit: 'sq.m',
        quantity: 820.0,
        rate: 680,
        amount: 557600,
        category: 'Formwork',
      },
      {
        id: 'item-9',
        sn: 9,
        description: 'First-class chimney Nepali brick masonry work in 1:4 cement sand mortar for 9-inch external load-transfer walls including scaffolding and curing.',
        unit: 'cu.m',
        quantity: 94.0,
        rate: 12400,
        amount: 1165600,
        category: 'Masonry',
      },
      {
        id: 'item-10',
        sn: 10,
        description: '12.5mm thick cement sand plastering (1:4) on internal wall and ceiling surfaces finished smooth with trowel.',
        unit: 'sq.m',
        quantity: 1450.0,
        rate: 340,
        amount: 493000,
        category: 'Plaster & Finishing',
      },
      {
        id: 'item-11',
        sn: 11,
        description: '15mm thick double-coat external sponge plaster (1:3 cement mortar) with water-repellent additive.',
        unit: 'sq.m',
        quantity: 680.0,
        rate: 420,
        amount: 285600,
        category: 'Plaster & Finishing',
      },
      {
        id: 'item-12',
        sn: 12,
        description: 'Terrace waterproofing with polymer-modified bitumen membrane and protective cement screed (40mm) laid to proper slope towards drain spouts.',
        unit: 'sq.m',
        quantity: 135.0,
        rate: 1150,
        amount: 155250,
        category: 'Waterproofing',
      },
    ],

    subtotal: 7447390,
    discountPercentage: 2,
    discountAmount: 148948,
    taxableAmount: 7298442,
    vatPercentage: 13,
    vatAmount: 948797,
    otherCharges: 0,
    grandTotal: 8247239,
    currency: 'NPR',
    validityDays: 60,
    paymentTermsSummary: 'Staged payments as per contract agreement milestones.',
    preparedBy: 'Er. Sujan Karki',
    checkedBy: 'Er. Ramesh Pandey (Quantity Surveyor)',
    approvedBy: 'Er. Rajesh Shrestha (Owner)',
    updatedAt: '2026-01-18T14:00:00Z',
  },
];

export const INITIAL_PAYMENT_SCHEDULES: PaymentSchedule[] = [
  {
    id: 'pay-001',
    docNumber: 'KCY-PMT-2026-001',
    projectId: 'proj-001',
    revision: 'Rev. 1',
    date: '2026-01-22',
    status: 'Final',
    totalContractValue: 14850000,
    milestones: [
      { id: 'm-1', milestone: 'Milestone 1: Mobilization Advance', description: 'Advance upon contract signing and site mobilization.', percentage: 10, amount: 1485000, dueDate: '2026-01-25', paidAmount: 1485000, balance: 0, status: 'Paid in Full', paidDate: '2026-01-24', paymentMethod: 'Bank Transfer' },
      { id: 'm-2', milestone: 'Milestone 2: Plinth Level Clearance', description: 'Footing, column neck, tie-beam and underground plumbing stub-outs.', percentage: 15, amount: 2227500, dueDate: '2026-03-10', paidAmount: 2227500, balance: 0, status: 'Paid in Full', paidDate: '2026-03-08', paymentMethod: 'Cheque No. 049811' },
      { id: 'm-3', milestone: 'Milestone 3: First Floor Slab Cast', description: 'Casting of ground floor columns and first floor RCC slab.', percentage: 15, amount: 2227500, dueDate: '2026-04-25', paidAmount: 2227500, balance: 0, status: 'Paid in Full', paidDate: '2026-04-26', paymentMethod: 'Bank Transfer' },
      { id: 'm-4', milestone: 'Milestone 4: Second Floor Slab Cast', description: 'First floor columns and second floor RCC slab cast.', percentage: 15, amount: 2227500, dueDate: '2026-06-15', paidAmount: 2227500, balance: 0, status: 'Paid in Full', paidDate: '2026-06-18', paymentMethod: 'Bank Transfer' },
      { id: 'm-5', milestone: 'Milestone 5: Top Roof & Parapet', description: 'Attic roof slab, overhead water tank tower and terrace parapets.', percentage: 10, amount: 1485000, dueDate: '2026-07-30', paidAmount: 1485000, balance: 0, status: 'Paid in Full', paidDate: '2026-08-02', paymentMethod: 'Bank Transfer' },
      { id: 'm-6', milestone: 'Milestone 6: Brick Masonry & Plaster', description: 'All external 9" walls, internal 4.5" partitions and internal/external plaster.', percentage: 15, amount: 2227500, dueDate: '2026-09-20', paidAmount: 1500000, balance: 727500, status: 'Partially Paid', paidDate: '2026-09-25', paymentMethod: 'Bank Transfer' },
      { id: 'm-7', milestone: 'Milestone 7: MEP & Flooring', description: 'Electrical wiring, plumbing fixtures, tiling, and doors/windows framing.', percentage: 10, amount: 1485000, dueDate: '2026-10-30', paidAmount: 0, balance: 1485000, status: 'Pending' },
      { id: 'm-8', milestone: 'Milestone 8: Final Handover & Occupancy', description: 'Final painting, cleaning, punch-list rectification and municipal completion certificate.', percentage: 5, amount: 742500, dueDate: '2026-11-30', paidAmount: 0, balance: 742500, status: 'Pending' },
      { id: 'm-9', milestone: 'Milestone 9: Retention Balance', description: '5% retention released 365 days post-handover upon DLP audit.', percentage: 5, amount: 742500, dueDate: '2027-11-30', paidAmount: 0, balance: 742500, status: 'Pending' },
    ],
    totalPaid: 11152500,
    totalBalance: 3697500,
    notes: 'Stage payments tied to municipal construction inspection clearance certificates.',
    preparedBy: 'Er. Sujan Karki',
    checkedBy: 'Ramesh Adhikari (Accountant)',
    approvedBy: 'Er. Rajesh Shrestha',
    updatedAt: '2026-09-25T11:00:00Z',
  },
];

export const INITIAL_VARIATION_ORDERS: VariationOrder[] = [
  {
    id: 'var-001',
    docNumber: 'KCY-VAR-2026-001',
    projectId: 'proj-001',
    revision: 'Rev. 0',
    date: '2026-05-12',
    status: 'Approved',
    variationOrderNo: 'VO-01',
    originalScopeSummary: 'Standard 125mm plain RCC ground floor porch slab.',
    variationDescription:
      'Extension of front cantilever canopy porch by 1.20 meters along with embedded LED warm spotlight conduits and perimeter drip-moulding.',
    reasonForVariation:
      'Owner requested extra all-weather car port coverage and enhanced architectural front facade elevation.',
    quantityDiff: 18.5,
    unit: 'sq.m',
    originalRate: 0,
    newRate: 4800,
    additionalOrDeductedAmount: 88800,
    timeImpactDays: 4,
    clientApprovalStatus: 'Approved',
    clientApprovalDate: '2026-05-14',
    clientApprovedBy: 'Er. Rajesh Shrestha',
    contractorApprovalStatus: 'Accepted',
    contractorApprovedBy: 'Er. Sujan Karki',
    remarks: 'Structural recalculation verified by engineer; cantilever deflection within safe NBC limit.',
    preparedBy: 'Er. Sujan Karki',
    updatedAt: '2026-05-14T10:00:00Z',
  },
];

export const INITIAL_BUILDING_PERMITS: BuildingPermitRecord[] = [
  {
    id: 'pmt-001',
    docNumber: 'KCY-PMT-2026-001',
    projectId: 'proj-001',
    revision: 'Rev. 2',
    date: '2026-01-10',
    status: 'Approved',

    permitInfo: {
      applicationNo: 'EBPS-BDN-2082/83-00412',
      permitNumber: 'BDN-BP-2082-0198',
      applicationDate: '2025-11-15',
      submissionDate: '2025-11-20',
      approvalDate: '2026-01-08',
      permitIssueDate: '2026-01-10',
      permitValidUntil: '2028-01-09',
      approvedBuildingArea: '3,850 sq.ft (357.67 sq.m)',
      approvedFloors: '3.5 Storeys (Ground + 2 Floors + Attic / Staircase Cover)',
      approvedHeight: '12.80 meters',
      approvedDrawingRef: 'DWG-BDN-ARCH-STR-REV2',
      approvalLetterRef: 'BDN-MUN-ENG-82/83-Cha.No. 1422',
      currentStageStatus: 'Permit Issued',
    },

    architectural: {
      architectName: 'Ar. Shraddha Tuladhar',
      necLicenceNo: 'NEC-ARCH-4421',
      firmName: 'Aakar Studio & Partners Pvt. Ltd.',
      drawingDate: '2025-11-05',
      revision: 'Rev. 2',
      approvedDrawingRef: 'A101-A109 (Architectural Set)',
      drawingFiles: [
        { name: 'Site_Plan_And_Setback_Verification.pdf', type: 'Site Plan', date: '2025-11-05' },
        { name: 'Architectural_Floor_Plans_All_Levels.pdf', type: 'Floor Plans', date: '2025-11-05' },
        { name: 'Elevations_And_Cross_Sections.pdf', type: 'Elevations & Sections', date: '2025-11-05' },
        { name: 'Area_Analysis_Statement_FAR.pdf', type: 'Area Statement', date: '2025-11-05' },
      ],
    },

    structural: {
      structuralEngineer: 'Er. Milan K.C.',
      necLicenceNo: 'NEC-CIVIL-8921-A',
      firmName: 'Drishya Structural Consultants',
      structuralDrawingRef: 'S101-S114 (Structural Drawing Set)',
      revision: 'Rev. 1',
      structuralCalculationRef: 'STR-CALC-NBC105-2020-0042',
      soilInvestigationRef: 'GEOTECH-REP-LAB-2082-14 (Safe Bearing Capacity: 165 kN/m²)',
      seismicDesignRef: 'NBC 105:2020 / NBC 105:2025 Seismic Zoning Factor Z=0.35',
      drawingFiles: [
        { name: 'Foundation_Plan_And_Column_Schedules.pdf', type: 'Foundation', date: '2025-11-10' },
        { name: 'Beam_Slab_Reinforcement_Details.pdf', type: 'Beams & Slabs', date: '2025-11-10' },
        { name: 'Seismic_Calculation_Sheet_ETABS_Report.pdf', type: 'Calculations', date: '2025-11-10' },
        { name: 'Geotechnical_Soil_Boring_Report.pdf', type: 'Soil Report', date: '2025-10-28' },
      ],
    },

    mep: {
      electricalDesigner: 'Er. Sujan Karki',
      electricalLicenceNo: 'NEC-ELEC-5912',
      electricalDesignRef: 'E101-E104 (Electrical Conduits & Earthing Plan)',
      sanitaryDesigner: 'Er. Bibek Sharma',
      sanitaryLicenceNo: 'NEC-CIVIL-10492',
      sanitaryDesignRef: 'P101-P104 (Plumbing, Drainage & Septic Tank Plan)',
    },

    workflowSteps: [
      { stage: 1, name: 'Project Information & Client Onboarding', status: 'Completed', date: '2025-10-20', responsiblePerson: 'Er. Sujan Karki', remarks: 'Client ID, land ownership Lalpurja verified.', attachmentsCount: 3 },
      { stage: 2, name: 'Land / Plot Verification & Boundary Survey', status: 'Completed', date: '2025-10-28', responsiblePerson: 'Surveyor Nabin Shrestha', remarks: 'Napi map sheet aligned; road width 6.0m certified.', attachmentsCount: 2 },
      { stage: 3, name: 'Architectural Documents Preparation', status: 'Completed', date: '2025-11-05', responsiblePerson: 'Ar. Shraddha Tuladhar', remarks: 'KMC/Budhanilkantha setback 1.5m side, 3.0m front verified.', attachmentsCount: 4 },
      { stage: 4, name: 'Structural Documents & Seismic Calculation', status: 'Completed', date: '2025-11-10', responsiblePerson: 'Er. Milan K.C.', remarks: 'ETABS 3D seismic model tested under NBC 105:2020.', attachmentsCount: 4 },
      { stage: 5, name: 'Electrical Documents Preparation', status: 'Completed', date: '2025-11-12', responsiblePerson: 'Er. Sujan Karki', remarks: 'Load schedule & safety grounding design completed.', attachmentsCount: 2 },
      { stage: 6, name: 'Sanitary & Plumbing Documents', status: 'Completed', date: '2025-11-14', responsiblePerson: 'Er. Bibek Sharma', remarks: 'Soak pit / municipal drainage connectivity certified.', attachmentsCount: 2 },
      { stage: 7, name: 'Municipal Authority Checklist Verification', status: 'Completed', date: '2025-11-18', responsiblePerson: 'Admin Office', remarks: 'All 15 statutory documents checked and signed.', attachmentsCount: 15 },
      { stage: 8, name: 'Application / Submission (EBPS Online Portal)', status: 'Completed', date: '2025-11-20', responsiblePerson: 'Er. Sujan Karki', remarks: 'Application registered under EBPS-BDN-2082/83-00412.', attachmentsCount: 1 },
      { stage: 9, name: 'Authority Technical Review & Site Inspection', status: 'Completed', date: '2025-12-15', responsiblePerson: 'Municipal Engineer', remarks: 'Municipal site engineer inspected boundary beacons.', attachmentsCount: 2 },
      { stage: 10, name: 'Correction / Revision Response (if any)', status: 'Completed', date: '2025-12-28', responsiblePerson: 'Ar. Shraddha Tuladhar', remarks: 'Adjusted corner setback projection per municipal remark.', attachmentsCount: 1 },
      { stage: 11, name: 'Permit & Drawing Approval (Naksa Pass)', status: 'Completed', date: '2026-01-08', responsiblePerson: 'Ward & Municipal Executive', remarks: 'Approved. Official stamped blueprints received.', attachmentsCount: 1 },
      { stage: 12, name: 'Construction Execution & Stage Clearances', status: 'In Progress', date: '2026-02-01', responsiblePerson: 'Site In-charge', remarks: 'Plinth clearance certificate verified; superstructure in progress.', attachmentsCount: 4 },
      { stage: 13, name: 'Completion Certificate Application (Nirman Sampanna)', status: 'Pending', responsiblePerson: 'Er. Sujan Karki', remarks: 'Scheduled upon building completion.', attachmentsCount: 0 },
      { stage: 14, name: 'Final Completion Certificate & Handover', status: 'Pending', responsiblePerson: 'Municipal Authority', remarks: 'Final occupancy clearance.', attachmentsCount: 0 },
    ],

    checklist: [
      { id: 'chk-1', documentName: 'Application Cover Sheet & Declaration', requirementType: 'Mandatory', status: 'Approved', verifiedBy: 'Municipal Ward Officer' },
      { id: 'chk-2', documentName: 'Citizenship Certificate Copy of Owner', requirementType: 'Mandatory', status: 'Approved', verifiedBy: 'Ward 3 Administration' },
      { id: 'chk-3', documentName: 'Land Ownership Certificate (Lalpurja)', requirementType: 'Mandatory', status: 'Approved', verifiedBy: 'Malpot Office Dilibazar' },
      { id: 'chk-4', documentName: 'Current Fiscal Year Land Tax Revenue Receipt (Tiro Tirya)', requirementType: 'Mandatory', status: 'Approved', verifiedBy: 'Ward 3 Revenue Counter' },
      { id: 'chk-5', documentName: 'Official Survey Cadastral Map (Napi Naksa)', requirementType: 'Mandatory', status: 'Approved', verifiedBy: 'Napi Karyalaya' },
      { id: 'chk-6', documentName: 'Site Plan with Clear Access Road Dimension', requirementType: 'Mandatory', status: 'Approved', verifiedBy: 'Municipal Engineer' },
      { id: 'chk-7', documentName: 'Architectural Working Drawings (Plans, Elevations, Sections)', requirementType: 'Mandatory', status: 'Approved', verifiedBy: 'Senior Urban Planner' },
      { id: 'chk-8', documentName: 'Structural Working Drawings (Foundation, Beams, Columns, Slabs)', requirementType: 'Mandatory', status: 'Approved', verifiedBy: 'Senior Structural Engineer' },
      { id: 'chk-9', documentName: 'Structural Design Calculation Report (NBC 105:2020)', requirementType: 'Mandatory', status: 'Approved', verifiedBy: 'Municipal Review Board' },
      { id: 'chk-10', documentName: 'Geotechnical Soil Investigation Report', requirementType: 'Mandatory', status: 'Approved', verifiedBy: 'Soil Mechanics Reviewer' },
      { id: 'chk-11', documentName: 'Electrical Installation & Safety Earthing Drawings', requirementType: 'Mandatory', status: 'Approved', verifiedBy: 'Electrical Engineer' },
      { id: 'chk-12', documentName: 'Sanitary, Water Supply & Drainage Drawings', requirementType: 'Mandatory', status: 'Approved', verifiedBy: 'Sanitary Engineer' },
      { id: 'chk-13', documentName: 'Nepal Engineering Council (NEC) Licenses of Designers', requirementType: 'Mandatory', status: 'Approved', verifiedBy: 'Municipal Registration' },
      { id: 'chk-14', documentName: 'Adjacent Land Owners Consent Letter (Manjurinama) if setback < standard', requirementType: 'Conditional', status: 'Not Applicable', remarks: 'Standard 1.5m setback achieved on all 4 boundaries.' },
      { id: 'chk-15', documentName: 'Road Access & Public Right-of-Way Certification', requirementType: 'Mandatory', status: 'Approved', verifiedBy: 'Ward Chairperson' },
    ],

    corrections: [
      {
        id: 'cor-1',
        sn: 1,
        authorityObservation:
          'South-Eastern terrace boundary projection extends 250mm beyond the 1.5m clear setback line in drawing sheet A-103.',
        relatedDrawingOrDoc: 'Architectural Drawing Sheet A-103 (First Floor Plan)',
        actionTaken: 'Recessed south-eastern balcony by 300mm to maintain 1.55m clear open space.',
        revisionReference: 'A-103 Rev. 2',
        supportingDoc: 'Updated Architectural Drawing Set Rev. 2',
        contractorResponse:
          'Balcony has been recessed and structural column orientation confirmed. Full 1.55m setback now verified and marked on revised sheet.',
        status: 'Approved by Authority',
      },
    ],

    preparedBy: 'Er. Sujan Karki',
    reviewedBy: 'Ar. Shraddha Tuladhar',
    updatedAt: '2026-01-10T12:00:00Z',
  },
];

export const INITIAL_COMPLETION_CERTIFICATES: CompletionCertificateRecord[] = [
  {
    id: 'cmp-001',
    docNumber: 'KCY-CMP-2026-001',
    projectId: 'proj-001',
    revision: 'Draft Rev. 0',
    date: '2026-10-01',
    status: 'Draft',

    permitNumber: 'BDN-BP-2082-0198',
    approvedDrawingReference: 'DWG-BDN-ARCH-STR-REV2',
    owner: 'Er. Rajesh Shrestha',
    projectAddress: 'Chunikhel, Ward No. 3, Budhanilkantha, Kathmandu',
    wardNo: 3,
    kittaNo: '482',

    approvedArea: 3850,
    actualAsBuiltArea: 3850,
    approvedFloors: '3.5 Storeys',
    actualFloors: '3.5 Storeys',

    completionDate: '2026-11-30',
    applicationDate: '2026-10-01',
    certificateNumber: 'DRAFT-CERT-BDN-2083-001',
    authorityRemarks:
      'Structure built strictly conforming to approved municipal drawings BDN-BP-2082-0198. Final joint field inspection scheduled upon completion of paint coats.',
    hasDiscrepancy: false,

    preparedBy: 'Er. Sujan Karki',
    certifiedBy: 'Er. Milan K.C. (Structural Engineer)',
    approvedBy: 'Pending Municipal Ward & Executive Approval',
    updatedAt: '2026-10-01T15:00:00Z',
  },
];

export const INITIAL_HANDOVER_RECORDS: BuildingHandoverRecord[] = [
  {
    id: 'hnd-001',
    docNumber: 'KCY-HND-2026-001',
    projectId: 'proj-001',
    revision: 'Draft Rev. 0',
    date: '2026-10-02',
    status: 'Draft',

    contractNo: 'KCY-AGR-2026-001',
    completionDate: '2026-11-30',
    handoverDate: '2026-12-05',
    ownerRep: 'Er. Rajesh Shrestha',
    contractorRep: 'Er. Sujan Karki (Kyoly Construction)',

    checklist: [
      { id: 'h-1', category: 'Civil Structural Works (Columns, Beams, Slabs, Foundation)', inspected: true, status: 'Satisfactory', remarks: 'No cracks, deflection or distress observed.' },
      { id: 'h-2', category: 'Architectural & Masonry Works', inspected: true, status: 'Satisfactory', remarks: 'Brick masonry plumb and joint alignment verified.' },
      { id: 'h-3', category: 'Doors, Windows & Glazing Hardware', inspected: true, status: 'Satisfactory', remarks: 'UPVC windows and seasoned teak doors operating smoothly.' },
      { id: 'h-4', category: 'Flooring, Skirting & Staircase Treads', inspected: true, status: 'Satisfactory', remarks: 'Vitrified tiles and granite treads properly leveled.' },
      { id: 'h-5', category: 'Internal & External Painting', inspected: true, status: 'Satisfactory', remarks: 'Weather-coat and luxury emulsion uniform coverage.' },
      { id: 'h-6', category: 'Electrical Distribution Board, MCBs & Earthing', inspected: true, status: 'Satisfactory', remarks: 'Earth resistance measured at 2.4 ohms (< 5 ohms standard).' },
      { id: 'h-7', category: 'Lighting Fixtures, Switches & Sockets', inspected: true, status: 'Satisfactory', remarks: 'All circuits tested and labeled.' },
      { id: 'h-8', category: 'Plumbing, Water Supply & Pump Connections', inspected: true, status: 'Satisfactory', remarks: 'Overhead tank float switch and booster pump calibrated.' },
      { id: 'h-9', category: 'Sanitary Fixtures, Faucets & Showers', inspected: true, status: 'Satisfactory', remarks: 'Hindware/Jaquar fittings pressure tested.' },
      { id: 'h-10', category: 'Drainage, Soil Waste & Septic Connection', inspected: true, status: 'Satisfactory', remarks: 'Manhole chambers sealed with GI covers.' },
      { id: 'h-11', category: 'Roof Terrace & Balcony Waterproofing', inspected: true, status: 'Satisfactory', remarks: 'Ponding test for 72 hours showed zero leakage.' },
      { id: 'h-12', category: 'External Compound Wall, Gate & Paving', inspected: true, status: 'Satisfactory', remarks: 'Sliding motorized main gate functioning properly.' },
      { id: 'h-13', category: 'Keys Handed Over (Main, Rooms, Terrace, Gate)', inspected: true, status: 'Satisfactory', remarks: 'Total 24 labeled key sets delivered.' },
      { id: 'h-14', category: 'Equipment User Manuals & Maintenance Guides', inspected: true, status: 'Satisfactory', remarks: 'Water pump, solar heater, inverter manuals provided.' },
      { id: 'h-15', category: 'Manufacturer Warranties (Tiles, CPVC, Paints, Pump)', inspected: true, status: 'Satisfactory', remarks: 'Manufacturer warranty cards bound in dossier.' },
      { id: 'h-16', category: 'As-Built Architectural & Structural Drawings', inspected: true, status: 'Satisfactory', remarks: '3 laminated bound sets delivered to owner.' },
      { id: 'h-17', category: 'Municipal Building Permit & Approvals File', inspected: true, status: 'Satisfactory', remarks: 'Original approved blueprint and tax receipts archived.' },
      { id: 'h-18', category: 'Municipal Completion Certificate (Nirman Sampanna)', inspected: false, status: 'Needs Attention', remarks: 'Awaiting final municipal seal.' },
      { id: 'h-19', category: 'Safety Inspection & Fire Extinguisher Provision', inspected: true, status: 'Satisfactory', remarks: '2 ABC 4kg fire extinguishers installed at staircase.' },
      { id: 'h-20', category: 'Deep Site Cleaning & Debris Removal', inspected: true, status: 'Satisfactory', remarks: 'All construction mortar and scaffolding cleared.' },
    ],

    punchList: [
      { id: 'p-1', sn: 1, item: 'Master Bedroom Door Stopper', location: '1st Floor Master Bedroom', defectOrOutstandingWork: 'Install magnetic floor-mounted door stopper.', responsibleParty: 'Kyoly Carpenter Team', targetDate: '2026-10-15', status: 'Open', remarks: 'Hardware in procurement.' },
      { id: 'p-2', sn: 2, item: 'Kitchen Sink Silicone Sealant', location: 'Ground Floor Kitchen', defectOrOutstandingWork: 'Apply anti-fungal transparent silicone bead along granite counter edge.', responsibleParty: 'Plumber', targetDate: '2026-10-12', status: 'In Progress' },
      { id: 'p-3', sn: 3, item: 'Terrace Garden Drain Grate', location: 'Top Terrace East', defectOrOutstandingWork: 'Place SS 304 dome leaf-guard over 4" rainwater downpipe.', responsibleParty: 'Plumber', targetDate: '2026-10-10', status: 'Rectified' },
    ],

    keysHandedOverCount: 24,
    equipmentManualsHandedOver: true,
    warrantiesHandedOver: true,
    asBuiltDrawingsHandedOver: true,
    completionCertificateHandedOver: false,
    finalStatementNotes:
      'The building has been inspected jointly by Owner and Kyoly Construction Project Management. Minor punch-list items scheduled for rectification within 7 working days.',

    ownerSigned: false,
    contractorSigned: true,
    updatedAt: '2026-10-02T16:00:00Z',
  },
];
