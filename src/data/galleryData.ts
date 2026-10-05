export interface GalleryItem {
  id: string;
  title: string;
  category: 'Transmission Line' | 'Substation & Switchyard' | 'Residential Buildings' | 'Commercial Buildings' | 'Civil Construction';
  location: string;
  year: string;
  description: string;
  technicalSpecs: string;
  visualTheme: 'transmission' | 'substation' | 'distribution' | 'building' | 'civil' | 'mep' | 'inspection' | 'transformer';
  imageUrl: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-trans-1',
    title: 'High-Voltage Lattice Tower Assembly & Rigging',
    category: 'Transmission Line',
    location: 'Dhalkebar-Janakpurdham Power Corridor, Nepal',
    year: '2024',
    description: 'Galvanized high-tensile steel lattice tower erection using mechanical derrick gin poles and hoist winches.',
    technicalSpecs: '132kV Double Circuit · Tower Weight: 14.8 MT · Stub Anchors in M25 Concrete',
    visualTheme: 'transmission',
    imageUrl: 'https://images.unsplash.com/photo-1509390144018-eeaf65052242?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'gal-trans-2',
    title: 'Conductor Sagging & Tension Stringing Across Valley',
    category: 'Transmission Line',
    location: 'Trishuli River Valley Crossing, Nuwakot',
    year: '2024',
    description: 'Controlled tension stringing of ACSR Panther conductors across mountain gorge without ground contact.',
    technicalSpecs: 'Tension Load: 22.5 kN · Clearance: 28m above highway · OPGW Optical Fibers',
    visualTheme: 'transmission',
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'gal-sub-1',
    title: '16 MVA Substation Power Transformer Positioning',
    category: 'Substation & Switchyard',
    location: 'Hetauda Industrial Substation, Makwanpur',
    year: '2024',
    description: 'Precision hydraulic positioning of a 38-tonne oil-immersed step-up power transformer onto vibration-dampened plinths.',
    technicalSpecs: '33/11kV 16 MVA · Nitrogen Injection Fire Protection System (NIFPS)',
    visualTheme: 'transformer',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'gal-sub-2',
    title: 'SF6 Gas Circuit Breakers & Switchyard Gantries',
    category: 'Substation & Switchyard',
    location: 'Southern Grid Interconnection Bay, Nepal',
    year: '2024',
    description: 'Outdoor high-voltage switchyard bay featuring 145kV SF6 circuit breakers and motorized disconnectors.',
    technicalSpecs: 'Rated Voltage: 145kV · Breaking Capacity: 40kA / 3s · Gas Pressure Sensors',
    visualTheme: 'substation',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'gal-res-1',
    title: 'Modern Earthquake-Resilient Residential Villa Structure',
    category: 'Residential Buildings',
    location: 'Budhanilkantha, Kathmandu Valley',
    year: '2023',
    description: 'Seismic-resistant RCC frame casting with isolated footings and tie beams under NBC-105:2020 standards.',
    technicalSpecs: 'NBC-105:2020 Zone V · Fe500D TMT Rebar · Micro-Silica Blended M25 Concrete',
    visualTheme: 'building',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'gal-res-2',
    title: 'Multi-Family Residential Housing Complex Design',
    category: 'Residential Buildings',
    location: 'Lalitpur Urban Housing Scheme, Nepal',
    year: '2024',
    description: 'Structural framing and cantilever balcony construction with modern aesthetic brick-tile facade detailing.',
    technicalSpecs: 'G+4 Stories · Continuous Beam-Slab System · Solar Rooftop Array Ready',
    visualTheme: 'building',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861564?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'gal-comm-1',
    title: 'Commercial Corporate Complex Diaphragm Retention Pour',
    category: 'Commercial Buildings',
    location: 'Bagdol, Lalitpur, Kathmandu Valley',
    year: '2024',
    description: 'Continuous 750 cubic meter monolithic raft foundation concrete pour with twin boom pump placers.',
    technicalSpecs: 'Raft Thickness: 1.2m · High-Yield TMT Rebar Matrix · Continuous Temperature Logging',
    visualTheme: 'building',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'gal-comm-2',
    title: 'Post-Tensioned Floor Slabs & Glass Facade Framing',
    category: 'Commercial Buildings',
    location: 'Kathmandu Corporate Tower, Nepal',
    year: '2023',
    description: 'High-rise commercial structure featuring post-tensioned wide span floor slabs and curtain wall brackets.',
    technicalSpecs: 'Span: 9.5m Column-Free · Post-Tensioned Tendons · Fire Suppression Risers',
    visualTheme: 'building',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'gal-civ-1',
    title: 'Reinforced Concrete Bridge Pier & Cantilever Cap Casting',
    category: 'Civil Construction',
    location: 'Terai Highway River Crossing Project, Nepal',
    year: '2023',
    description: 'Heavy reinforcement cage binding for cylindrical RCC bridge piers and cantilever pier caps with steel formwork.',
    technicalSpecs: 'Pier Diameter: 1.8m · Height: 9.4m · M35 Self-Compacting Concrete (SCC)',
    visualTheme: 'civil',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'gal-civ-2',
    title: 'Hill Slope Gabion Retention & Drainage Revetment',
    category: 'Civil Construction',
    location: 'Mid-Hills Highway Protection Corridor, Nepal',
    year: '2024',
    description: 'Multi-tiered heavy gabion wire mesh retaining walls with geotextile backing for landslide and slope stabilization.',
    technicalSpecs: 'Triple-Twisted Galvanized Mesh · Geotextile Filter Fabric · Weep Hole Drainage',
    visualTheme: 'civil',
    imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
  },
];
