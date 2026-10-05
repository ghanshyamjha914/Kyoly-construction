export interface ProjectItem {
  id: string;
  name: string;
  contractId?: string;
  client: string;
  location: string;
  category: 'Ongoing' | 'Completed';
  status: string;
  scopeCategory: string;
  majorWorks: string[];
  visualType: 'transmission' | 'substation' | 'building' | 'civil' | 'distribution';
  imageUrl: string;
  shortDescription: string;
  details: string;
  specs: { label: string; value: string }[];
  galleryPhotos?: { title: string; caption?: string; url?: string; fileKey?: string }[];
}

export const PROJECTS_DATA: ProjectItem[] = [
  // 1. Protection Work
  {
    id: 'project-1',
    name: 'Protection Work',
    client: 'Makalu Distilleries Pvt. Ltd., Kamladi, Kathmandu',
    location: 'Abukhaireni, Tanahu District',
    category: 'Completed',
    status: 'Completed',
    scopeCategory: 'Civil & Protection Works',
    majorWorks: [
      'Stone Masonry Work',
    ],
    visualType: 'civil',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861564?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Stone masonry protection work executed for Makalu Distilleries in Abukhaireni, Tanahu District.',
    details: 'Civil engineering protection structure including extensive stone masonry work to stabilize ground conditions and protect facility infrastructure.',
    specs: [
      { label: 'Client', value: 'Makalu Distilleries Pvt. Ltd.' },
      { label: 'Location', value: 'Abukhaireni, Tanahu District' },
      { label: 'Scope', value: 'Stone Masonry Protection' },
      { label: 'Status', value: 'Completed' },
    ],
  },

  // 2. Supply and Installation of Electrical Works
  {
    id: 'project-2',
    name: 'Supply and Installation of Electrical Works',
    client: 'Civil Aviation Authority of Nepal TIA / SHARMA-PRERA-ASHISH J/V',
    location: 'Sterile Hall, Tribhuvan International Airport',
    category: 'Completed',
    status: 'Completed',
    scopeCategory: 'Aviation Electrical & MEP',
    majorWorks: [
      'Supply and Installation Works',
    ],
    visualType: 'distribution',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Supply and installation of specialized electrical works at the Sterile Hall of Tribhuvan International Airport.',
    details: 'Comprehensive electrical supply and professional installation works delivered for the Civil Aviation Authority of Nepal inside the Sterile Hall of Tribhuvan International Airport.',
    specs: [
      { label: 'Client', value: 'CAAN TIA / SHARMA-PRERA-ASHISH J/V' },
      { label: 'Location', value: 'Sterile Hall, TIA, Kathmandu' },
      { label: 'Scope', value: 'Electrical Supply & Installation' },
      { label: 'Status', value: 'Completed' },
    ],
  },

  // 3. Supply and Installation of Electrical and Fixture for Commercial Building
  {
    id: 'project-3',
    name: 'Supply and Installation of Electrical and Fixture for Commercial Building',
    client: 'International Infra Builders Pvt. Ltd. (BIZBELL)',
    location: 'Tinkune, Kathmandu',
    category: 'Completed',
    status: 'Completed',
    scopeCategory: 'Commercial MEP & Fixtures',
    majorWorks: [
      'MEP Works',
    ],
    visualType: 'building',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Complete MEP supply and fixture installation for modern commercial building complex in Tinkune, Kathmandu.',
    details: 'Complete mechanical, electrical, and plumbing (MEP) execution including commercial power distribution, lighting fixtures, and containment systems for International Infra Builders.',
    specs: [
      { label: 'Client', value: 'International Infra Builders (BIZBELL)' },
      { label: 'Location', value: 'Tinkune, Kathmandu' },
      { label: 'Scope', value: 'Commercial MEP Works' },
      { label: 'Status', value: 'Completed' },
    ],
  },

  // 4. Rural and Distribution Network and Reinforcement in Province-02, Lot 1 & Lot 2
  {
    id: 'project-4',
    name: 'Rural and Distribution Network and Reinforcement in Province-02, Lot 1 & Lot 2',
    client: 'Project Management Directorate, NEA, Matatirtha, Chandragiri / Tata Projects, Noida, India',
    location: 'Manra Substation, Manra Shishwa, Mahottari',
    category: 'Completed',
    status: 'Completed',
    scopeCategory: 'Substation & Distribution Grid',
    majorWorks: [
      'Construction of Foundation',
      'Installation of 33kV, 16MVA Power Transformer – 1 Set',
    ],
    visualType: 'substation',
    imageUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Reinforcement works including transformer civil foundation and 33kV 16MVA power transformer installation at Manra Substation.',
    details: 'Civil foundation engineering and mechanical/electrical installation of 33kV, 16MVA power transformer unit for NEA Project Management Directorate in collaboration with Tata Projects.',
    specs: [
      { label: 'Client', value: 'PMD NEA / Tata Projects' },
      { label: 'Location', value: 'Manra Substation, Mahottari' },
      { label: 'Transformer', value: '33kV, 16MVA – 1 Set' },
      { label: 'Civil Works', value: 'Heavy Foundation Construction' },
    ],
  },

  // 5. Foundation Upgradation Works for 132kV GCB Nawalpur 1 & Nawalpur 2 at Chapur Substation
  {
    id: 'project-5',
    name: 'Foundation Upgradation Works for 132kV Gas Circuit Breaker Nawalpur 1 & Nawalpur 2 at Chapur Substation',
    client: 'NEA, Dhalkebar Grid Division',
    location: 'Chapur Substation, Rautahat',
    category: 'Completed',
    status: 'Completed',
    scopeCategory: '132kV Substation Upgradation',
    majorWorks: [
      'Construction of Foundation',
      '132kV GCB – 1 Set',
    ],
    visualType: 'substation',
    imageUrl: '',
    shortDescription: 'Civil foundation upgradation and 132kV Gas Circuit Breaker installation at Chapur Substation.',
    details: 'Substation civil foundation upgradation, concrete plinth casting, and 132kV Gas Circuit Breaker (GCB) erection for Nawalpur 1 & Nawalpur 2 feeder bays.',
    specs: [
      { label: 'Client', value: 'NEA, Dhalkebar Grid Division' },
      { label: 'Location', value: 'Chapur Substation, Rautahat' },
      { label: 'Equipment', value: '132kV GCB – 1 Set' },
      { label: 'Civil Scope', value: 'Foundation Upgradation' },
    ],
  },

  // 6. Foundation Upgradation Works for 132kV GCB Mirchaiya 2 at Dhalkebar Substation
  {
    id: 'project-6',
    name: 'Foundation Upgradation Works for 132kV Gas Circuit Breaker Mirchaiya 2 at Dhalkebar Substation',
    client: 'NEA, Dhalkebar Grid Division',
    location: 'Dhalkebar Substation, Dhanusha',
    category: 'Completed',
    status: 'Completed',
    scopeCategory: '132kV Substation Upgradation',
    majorWorks: [
      'Construction of Foundation',
      '132kV GCB – 1 Set',
    ],
    visualType: 'substation',
    imageUrl: 'https://images.unsplash.com/photo-1509390144018-eeaf65052242?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Civil foundation upgradation and 132kV Gas Circuit Breaker installation at Dhalkebar Substation.',
    details: 'Precision civil foundation reconstruction and installation of 132kV Gas Circuit Breaker (Mirchaiya 2 bay) inside the central Dhalkebar Substation facility.',
    specs: [
      { label: 'Client', value: 'NEA, Dhalkebar Grid Division' },
      { label: 'Location', value: 'Dhalkebar Substation, Dhanusha' },
      { label: 'Equipment', value: '132kV GCB – 1 Set' },
      { label: 'Civil Scope', value: 'Foundation Upgradation' },
    ],
  },

  // 7. Power Transformer at Chapur Substation (Re-GOD/2078/079-14)
  {
    id: 'project-7',
    name: 'Supply, Delivery, Shifting, Installation, Testing & Commissioning of Power Transformer at Various Substations',
    contractId: 'Re-GOD/2078/079-14',
    client: 'NEA, Grid Operation Department / PowerChinaSEPCO1-ANK JV',
    location: 'Chapur Substation, Rautahat',
    category: 'Completed',
    status: 'Completed',
    scopeCategory: 'Substation Transformer & Switchyard',
    majorWorks: [
      'Construction of Foundation',
      '132kV GCB – 1 Set',
      '33kV LA – 3 Nos.',
      '33kV CT – 3 Nos.',
      '30kV VCB – 1 Set',
      '33kV DS – 1 Set',
      '33kV LM – 1 Set',
      'Cable Trench – 35m',
      'Switchyard Aggregate Laying',
    ],
    visualType: 'substation',
    imageUrl: '',
    shortDescription: 'Turnkey foundation, 132kV GCB, 33kV switchgear, 35m cable trench, and switchyard aggregate laying at Chapur Substation.',
    details: 'Execution under Main Contract Re-GOD/2078/079-14: Civil foundations, 132kV GCB, 33kV Lightning Arresters (3 Nos.), 33kV Current Transformers (3 Nos.), 30kV Vacuum Circuit Breaker, Disconnecting Switch, 35 meters cable trench construction, and full switchyard gravel aggregate laying.',
    specs: [
      { label: 'Contract ID', value: 'Re-GOD/2078/079-14' },
      { label: 'Client', value: 'NEA GOD / PowerChinaSEPCO1-ANK JV' },
      { label: 'Location', value: 'Chapur Substation, Rautahat' },
      { label: 'Cable Trench', value: '35m Constructed' },
    ],
  },

  // 8. Power Transformer at Nawalpur Substation (GOD/2080/081-04)
  {
    id: 'project-8',
    name: 'Supply, Delivery, Shifting, Installation, Testing & Commissioning of Power Transformer at Various Substations',
    contractId: 'GOD/2080/081-04',
    client: 'NEA, Grid Operation Department / PowerChinaSEPCO1-ANK JV',
    location: 'Nawalpur Substation, Sarlahi',
    category: 'Completed',
    status: 'Completed',
    scopeCategory: 'Substation Transformer & Switchyard',
    majorWorks: [
      'Construction of Foundation and Installation',
      '33kV, 16MVA Power Transformer – 1 Set',
      '33kV LA – 3 Nos.',
      '33kV CT – 3 Nos.',
      '30kV VCB – 1 Set',
      '33kV DS – 1 Set',
      '33kV PT – 3 Nos.',
      '33kV BS – 3 Nos.',
      '33kV PI – 3 Nos.',
      '33kV LM – 2 Nos.',
      'Cable Trench – 25m',
      'Switchyard Aggregate Laying',
    ],
    visualType: 'substation',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Foundation construction, 33kV 16MVA transformer, full 33kV outdoor bay switchgear, 25m cable trench, and aggregate laying at Nawalpur.',
    details: 'Execution under Main Contract GOD/2080/081-04: Complete foundation construction and installation of 33kV, 16MVA Power Transformer (1 Set), 33kV LA (3 Nos.), 33kV CT (3 Nos.), 30kV VCB (1 Set), 33kV DS (1 Set), 33kV PT (3 Nos.), 33kV BS (3 Nos.), 33kV PI (3 Nos.), 33kV LM (2 Nos.), 25 meters cable trench, and switchyard aggregate laying.',
    specs: [
      { label: 'Contract ID', value: 'GOD/2080/081-04' },
      { label: 'Client', value: 'NEA GOD / PowerChinaSEPCO1-ANK JV' },
      { label: 'Location', value: 'Nawalpur Substation, Sarlahi' },
      { label: 'Transformer', value: '33kV, 16MVA – 1 Set' },
    ],
  },

  // 9. Monopole Installation Works Between Tower No. 119 & 120 (KGD-STC-02, 2082/083/-04)
  {
    id: 'project-9',
    name: 'Monopole Installation Works Between Tower No. 119 & 120 of Trishuli and Balaju 66kV Transmission Line',
    contractId: 'KGD-STC-02, 2082/083/-04',
    client: 'NEA, Kathmandu Grid Division / Om Sai Samling JV',
    location: 'Banasthali, Kathmandu',
    category: 'Completed',
    status: 'Completed',
    scopeCategory: '66kV Transmission Line',
    majorWorks: [
      'Construction of 66kV Tower Foundation and Installation',
      '66kV Foundation – 1 No.',
    ],
    visualType: 'transmission',
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Construction of 66kV tower foundation and monopole installation between Tower 119 & 120 in Banasthali, Kathmandu.',
    details: 'Execution under Main Contract KGD-STC-02, 2082/083/-04: Specialized urban transmission line works comprising civil foundation construction and monopole steel tower erection for the Trishuli-Balaju 66kV transmission line corridor.',
    specs: [
      { label: 'Contract ID', value: 'KGD-STC-02, 2082/083/-04' },
      { label: 'Client', value: 'NEA Kathmandu Grid / Om Sai Samling JV' },
      { label: 'Location', value: 'Banasthali, Kathmandu' },
      { label: 'Scope', value: '66kV Foundation & Monopole' },
    ],
  },

  // 10. 63 MVA Transformer Modification at Nawalpur (GOD/2080/081-04)
  {
    id: 'project-10',
    name: 'Supply, Delivery, Shifting, Installation, Testing & Commissioning of Power Transformer at Various Substations',
    contractId: 'GOD/2080/081-04',
    client: 'NEA, Grid Operation Department / PowerChinaSEPCO1-ANK JV',
    location: 'Nawalpur Substation, Sarlahi',
    category: 'Completed',
    status: 'Completed',
    scopeCategory: 'Transformer Modification & Substation',
    majorWorks: [
      '63 MVA Transformer Modification at Nawalpur',
    ],
    visualType: 'substation',
    imageUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Heavy electrical modification of 63 MVA power transformer unit at Nawalpur Substation in Sarlahi.',
    details: 'Execution under Main Contract GOD/2080/081-04: Technical modification, shifting, and commissioning works for the high-capacity 63 MVA power transformer at Nawalpur Substation.',
    specs: [
      { label: 'Contract ID', value: 'GOD/2080/081-04' },
      { label: 'Client', value: 'NEA GOD / PowerChinaSEPCO1-ANK JV' },
      { label: 'Location', value: 'Nawalpur Substation, Sarlahi' },
      { label: 'Modification', value: '63 MVA Transformer Unit' },
    ],
  },
];
