export interface GalleryItem {
  id: string;
  title: string;
  category: "Farmhouses" | "Plotted Enclaves" | "Residences" | "Interiors & Lifestyle" | "Masterplans";
  image: string;
  location: string;
  tag: string;
  description: string;
}

export const GALLERY_CATEGORIES = [
  "All",
  "Farmhouses",
  "Plotted Enclaves",
  "Residences",
  "Interiors & Lifestyle",
  "Masterplans",
] as const;

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Twilight Architectural Masterpiece Villa",
    category: "Residences",
    image: "/images/hero/hero-poster.jpg",
    location: "Greater Noida Growth Corridor",
    tag: "Infinity Pool & Cantilever Villa",
    description: "Ultra-luxury modern villa design featuring panoramic glass facades, private infinity pool, and ambient evening architectural illumination."
  },
  {
    id: "gal-2",
    title: "Bollywood Aerocity Luxury Farmhouse Estate",
    category: "Farmhouses",
    image: "/images/bollywood-aerocity/hero_farmhouse.png",
    location: "Near Jewar International Airport",
    tag: "Exclusive Country Estate",
    description: "Expansive green farm villa surrounded by manicured lawns, mature orchards, and bespoke modern country architecture."
  },
  {
    id: "gal-3",
    title: "Grand Royal Clubhouse & Wellness Pavilion",
    category: "Interiors & Lifestyle",
    image: "/images/bollywood-aerocity/luxury_clubhouse.png",
    location: "Bollywood Aerocity, Jewar",
    tag: "Signature Amenities",
    description: "State-of-the-art community clubhouse equipped with infinity swimming pool, lounge facilities, sports courts, and wellness spaces."
  },
  {
    id: "gal-4",
    title: "Contemporary Gated Plotted Enclaves",
    category: "Plotted Enclaves",
    image: "/images/fresh/luxotic-plots-fresh.jpg",
    location: "Yamuna Expressway Corridor",
    tag: "Clear-Title Land Plots",
    description: "Wide tree-lined avenues, underground cabling, demarcated freehold plots, and robust boundary security infrastructure."
  },
  {
    id: "gal-5",
    title: "Bespoke Modern Luxury Residences",
    category: "Residences",
    image: "/images/fresh/luxotic-residences.jpg",
    location: "Prime Growth Corridors, NCR",
    tag: "Urban Architectural Landmarks",
    description: "Meticulously designed residential towers and duplex villas featuring sustainable materials and double-height living spaces."
  },
  {
    id: "gal-6",
    title: "Private Evening Lounge & Firepit Courtyard",
    category: "Interiors & Lifestyle",
    image: "/images/bollywood-aerocity/lifestyle_bonfire.png",
    location: "Bollywood Aerocity Estates",
    tag: "Outdoor Luxury Living",
    description: "Custom-designed open-air gathering courtyard with stone firepit, mood lighting, and tranquil landscaping for evening entertainment."
  },
  {
    id: "gal-7",
    title: "Aerial View of Farmhouse Enclaves",
    category: "Farmhouses",
    image: "/images/bollywood-aerocity/aerial_farm_estates.png",
    location: "Jewar Aerocity Belt",
    tag: "Master-Planned Farm Enclave",
    description: "Bird's eye perspective highlighting large plot parcels, landscaped internal grid roads, and peaceful green surroundings."
  },
  {
    id: "gal-8",
    title: "High-End Designer Living Room Interiors",
    category: "Interiors & Lifestyle",
    image: "/images/fresh/luxotic-interior-living.jpg",
    location: "Luxotic Signature Residences",
    tag: "Opulent Interior Design",
    description: "Floor-to-ceiling glass expanses, imported Italian marble finishes, premium lighting fixtures, and custom modular furnishings."
  },
  {
    id: "gal-9",
    title: "Eco-Conscious Green Architecture",
    category: "Residences",
    image: "/images/sustainability/green-building.jpg",
    location: "Luxotic Sustainable Developments",
    tag: "Green Certified Architecture",
    description: "Biophilic architectural design incorporating vertical green facades, solar integration, and natural ventilation channels."
  },
  {
    id: "gal-10",
    title: "Master Community Layout & Landscape Blueprint",
    category: "Masterplans",
    image: "/images/fresh/luxotic-masterplan-render.jpg",
    location: "Yamuna Expressway Region",
    tag: "Strategic Township Masterplan",
    description: "Detailed 3D architectural rendering illustrating zoning, arterial road networks, clubhouse zones, and green recreational belts."
  },
  {
    id: "gal-11",
    title: "VIP Experience Lounge & Client Advisory Suite",
    category: "Interiors & Lifestyle",
    image: "/images/fresh/luxotic-experience-lounge.jpg",
    location: "Luxotic Corporate Experience Center",
    tag: "Private Consultation Lounge",
    description: "Luxury consultation lounge designed for exclusive project walkthroughs, VR site inspections, and personalized advisory sessions."
  },
  {
    id: "gal-12",
    title: "Orchard Farmhouse Retreat",
    category: "Farmhouses",
    image: "/images/fresh/luxotic-farmhouse-fresh.jpg",
    location: "Greater Noida & Jewar Corridor",
    tag: "Weekend Family Getaway",
    description: "Serene private farmhouse property complete with fruit orchards, organic gardening patches, and modern pavilion accommodations."
  }
];
