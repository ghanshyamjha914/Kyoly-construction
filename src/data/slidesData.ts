export interface HeroSlide {
  id: number;
  slug: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  category: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  imageUrl: string;
  videoUrl?: string;
  isVideo?: boolean;
  specs: { label: string; value: string }[];
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    slug: 'corporate-showcase',
    tag: 'CORPORATE SHOWCASE · POWER & INFRASTRUCTURE',
    title: 'Building Infrastructure. Powering Progress.',
    subtitle: 'High-Voltage Transmission Lines, Substations & Civil Engineering',
    description: 'A trusted engineering and construction partner advancing Nepal’s energy and infrastructure expansion with turnkey delivery, uncompromised safety, and technical excellence.',
    badge: 'Corporate Video Showcase',
    category: 'Power & Infrastructure',
    ctaText: 'Explore Our Capabilities',
    ctaLink: '/services',
    secondaryCtaText: 'Request Consultation',
    secondaryCtaLink: '/contact',
    imageUrl: '/kyoly-hero-video-poster.jpg',
    videoUrl: '/kyoly-hero-video.mp4',
    isVideo: true,
    specs: [
      { label: 'Transmission', value: '66kV - 400kV' },
      { label: 'Substations', value: '132kV / 33kV' },
      { label: 'Standards', value: 'NEA & NBC Compliant' },
    ],
  },
  {
    id: 2,
    slug: 'transmission-line',
    tag: 'POWER INFRASTRUCTURE · NEPAL',
    title: 'High-Voltage Transmission Lines',
    subtitle: '66kV to 400kV National Grid Corridors Across Mountain Terrains',
    description: 'Turnkey GPS route alignment, foundation piling, galvanized steel lattice tower erection, and precision tension conductor stringing across rugged terrain and torrential river crossings.',
    badge: '66kV to 400kV Capability',
    category: 'Power & Electrical Infrastructure',
    ctaText: 'Explore Transmission Lines',
    ctaLink: '/services/transmission-line',
    secondaryCtaText: 'Request Consultation',
    secondaryCtaLink: '/contact',
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2000&q=85',
    specs: [
      { label: 'Voltage Range', value: '66kV - 400kV' },
      { label: 'Towers', value: 'Lattice Steel' },
      { label: 'Standard', value: 'IS 802 / IEC' },
    ],
  },
  {
    id: 3,
    slug: 'substation-switchyard',
    tag: 'GRID RELIABILITY · SUBSTATIONS',
    title: 'Modern Substation & Switchyard Infrastructure',
    subtitle: 'High-Capacity 33kV & 132kV Turnkey Outdoor Switchyards',
    description: 'Complete civil foundations, heavy power transformer plinths, SF6 circuit breakers, numerical protection control panels, and SCADA automation for utility and industrial grids.',
    badge: '132kV / 33kV / 11kV Substation Systems',
    category: 'Power & Electrical Infrastructure',
    ctaText: 'Explore Substations',
    ctaLink: '/services/substation-switchyard',
    secondaryCtaText: 'Request Consultation',
    secondaryCtaLink: '/contact',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=85',
    specs: [
      { label: 'Configurations', value: '33kV / 132kV' },
      { label: 'Switchgear', value: 'AIS & GIS SF6' },
      { label: 'Earth Grid', value: '< 1.0 Ohm' },
    ],
  },
  {
    id: 4,
    slug: 'residential-building-design',
    tag: 'RESIDENTIAL ARCHITECTURE & BUILD',
    title: 'Elegant Modern Residential Architecture',
    subtitle: 'Seismic-Resilient Luxury Residences & Multi-Family Homes',
    description: 'Architectural space planning, advanced 3D structural analysis, ductile RCC framing conforming to NBC-105:2020, and turnkey construction of modern residential homes and villas.',
    badge: 'NBC-105:2020 Seismic Code',
    category: 'Building Design & Construction',
    ctaText: 'Explore Residential Design',
    ctaLink: '/services/residential-building-design',
    secondaryCtaText: 'Get Quote',
    secondaryCtaLink: '/contact',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    specs: [
      { label: 'Seismic Zone', value: 'Zone V Compliant' },
      { label: 'Structural System', value: 'Ductile SMRF Frame' },
      { label: 'Execution', value: 'Turnkey Design & Build' },
    ],
  },
  {
    id: 5,
    slug: 'commercial-building-design',
    tag: 'COMMERCIAL INFRASTRUCTURE',
    title: 'Contemporary Commercial Complexes & Towers',
    subtitle: 'Multi-Story Corporate Hubs, Retailing Centers & Modern Facades',
    description: 'Heavy commercial RCC structural framing, multi-basement retention systems, column-free post-tensioned spans, glass curtain walls, and integrated commercial MEP installations.',
    badge: 'High-Rise Commercial & Mixed-Use',
    category: 'Building Design & Construction',
    ctaText: 'Explore Commercial Works',
    ctaLink: '/services/commercial-building-design',
    secondaryCtaText: 'Request Consultation',
    secondaryCtaLink: '/contact',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85',
    specs: [
      { label: 'Structure Type', value: 'Dual Shear Wall + SMRF' },
      { label: 'Basements', value: 'Multi-Level Retention' },
      { label: 'Safety Code', value: 'NFPA & NBC 107' },
    ],
  },
];
