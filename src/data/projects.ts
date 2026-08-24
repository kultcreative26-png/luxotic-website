export interface Project {
  slug: string;
  name: string;
  category: "Farmhouses" | "Plotted Developments" | "Residential Properties";
  categorySlug: "farmhouses" | "plots" | "residential";
  tagline: string;
  location: string;
  heroImage: string;
  status: "Ongoing" | "Upcoming" | "Ready for Possession";
  shortDescription: string;
  overview: string[];
  highlights: string[];
  amenities: { name: string; icon: string }[];
  gallery: string[];
  masterplanImage: string;
  brochurePath: string;
  reraNumber: string;
  squareFootage: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    slug: "bollywood-aero-city-farms",
    name: "Bollywood Aero City Farms",
    category: "Farmhouses",
    categorySlug: "farmhouses",
    tagline: "Where Luxury Meets Nature's Endless Beauty",
    location: "Village Sarakpur, G.B. Nagar (15 Mins to Jewar Airport / Yamuna Expressway)",
    heroImage: "/images/bollywood-aerocity/hero_farmhouse.png",
    status: "Ongoing",
    shortDescription: "Premium luxury farming estates near Noida International Airport & Yamuna Expressway. Gated community featuring private luxury villas, clubhouse, horse riding track, organic mango & guava orchards, and pakka construction allowed.",
    overview: [
      "Bollywood Aero City Farms curates world-class luxury farming villas and private green estates in Village Sarakpur, Greater Noida / Yamuna Expressway corridor.",
      "Positioned at Delhi NCR's next growth nucleus — just 15 minutes from Noida International Airport (Jewar) and the upcoming 1000-acre Film City — offering unmatched capital appreciation and wellness retreat living.",
      "100% secure gated community with solid boundary walls for each farm, 24/7 CCTV security, wide internal RCC roads, sanctioned government electricity, and 15+ mature organic fruit-bearing trees per estate."
    ],
    highlights: [
      "Pakka construction fully allowed — build signature villas, private pools, decks & boundary walls",
      "Just 15 mins to Noida International Airport (Jewar) & 1000-Acre Film City",
      "Gated community with plot sizes starting from 1000 to 2500+ Sq. Yards",
      "Enriched organic mango & guava orchards on every private estate",
      "Luxury clubhouse with swimming pool, gym, cafe & bonfire party deck",
      "Horse riding track & net cricket sports arena",
      "Wide internal RCC roads with designer streetlights & 24/7 CCTV surveillance",
      "Fast connectivity: 5 mins to New Noida corridor, 8 mins to Dankaur Station, 10 mins to F1 Track"
    ],
    amenities: [
      { name: "Luxury Clubhouse & Gym", icon: "Home" },
      { name: "Swimming Pool", icon: "Waves" },
      { name: "Organic Mango Orchards", icon: "Trees" },
      { name: "Horse Riding Track", icon: "Milestone" },
      { name: "24/7 Gated Security & CCTV", icon: "ShieldCheck" },
      { name: "Bonfire & Party Deck", icon: "Flame" },
      { name: "Wide Internal RCC Roads", icon: "Milestone" },
      { name: "Net Cricket Arena", icon: "Grid" }
    ],
    gallery: [
      "/images/bollywood-aerocity/hero_farmhouse.png",
      "/images/bollywood-aerocity/aerial_farm_estates.png",
      "/images/bollywood-aerocity/luxury_clubhouse.png",
      "/images/bollywood-aerocity/lifestyle_bonfire.png"
    ],
    masterplanImage: "/images/bollywood-aerocity/aerial_farm_estates.png",
    brochurePath: "/downloads/brochure.pdf",
    reraNumber: "Sanctioned Layout / Gated Development",
    squareFootage: "1,000 – 2,500+ Sq. Yards (Est. Starting ₹1.75 Cr*)"
  },
  {
    slug: "luxotic-horizon-plots",
    name: "Luxotic Horizon Plotted Enclave",
    category: "Plotted Developments",
    categorySlug: "plots",
    tagline: "Secure today. Prosper tomorrow.",
    location: "Strategic Growth Corridor, Noida, UP",
    heroImage: "/images/fresh/luxotic-plots-fresh.jpg",
    status: "Ongoing",
    shortDescription: "Masterplanned premium residential & investment plots featuring underground utility infrastructure, wide paved roads, and unmatched growth potential.",
    overview: [
      "Luxotic Horizon Plotted Enclave offers strategically located residential plots engineered for high return on investment and immediate construction readiness.",
      "Featuring subterranean electricity cables, modern drainage, solar avenue lighting, and wide internal paved boulevards, this project sets new benchmarks for plotted developments.",
      "Ideal for building custom luxury villas or establishing a resilient real estate asset portfolio in India's fastest-growing corridor."
    ],
    highlights: [
      "Legally verified clear-title plot boundaries",
      "Underground cabling & underground drainage systems",
      "Grand entry gate house with access control",
      "Proximity to upcoming infrastructure corridors & commercial hubs",
      "Flexible plot sizes tailored to custom villa layouts",
      "Immediate site visit & booking support"
    ],
    amenities: [
      { name: "Underground Utilities", icon: "Zap" },
      { name: "Solar Streetlights", icon: "Sun" },
      { name: "Demarcated Plots", icon: "MapPin" },
      { name: "Grand Entrance Gate", icon: "Building2" },
      { name: "Storm Water Drainage", icon: "CloudRain" },
      { name: "Green Park Zones", icon: "Trees" }
    ],
    gallery: [
      "/images/fresh/luxotic-plots-fresh.jpg",
      "/images/fresh/luxotic-masterplan-render.jpg",
      "/images/sustainability/sustainable-green-building.jpg",
      "/images/fresh/luxotic-residences.jpg"
    ],
    masterplanImage: "/images/fresh/luxotic-masterplan-render.jpg",
    brochurePath: "/downloads/luxotic-plots-brochure.pdf",
    reraNumber: "[CONTENT REQUIRED]",
    squareFootage: "[CONTENT REQUIRED]"
  },
  {
    slug: "luxotic-grand-residences",
    name: "Luxotic Grand Residences",
    category: "Residential Properties",
    categorySlug: "residential",
    tagline: "Modern residential spaces crafted for comfort and class.",
    location: "Prime City Location, Noida, UP",
    heroImage: "/images/fresh/luxotic-residences.jpg",
    status: "Upcoming",
    shortDescription: "Sophisticated luxury apartments and independent residences combining contemporary architecture, double-height lobbies, and world-class lifestyle amenities.",
    overview: [
      "Luxotic Grand Residences are designed to redefine modern urban living through sleek architectural facades, thoughtful spatial planning, and high-specification interiors.",
      "Each residence provides abundant natural light, panoramic balcony views, energy-efficient glazing, and private elevator lobbies.",
      "Embodying modern luxury with zero wasted space, creating an enduring heritage home for generations to come."
    ],
    highlights: [
      "Contemporary glass & stone architectural elevation",
      "Double-height entrance lobby with concierge service",
      "High-speed passenger & service elevators",
      "Dedicated multi-tier resident parking",
      "Energy-efficient orientation & smart home readiness",
      "Prime proximity to schools, hospitals & transit corridors"
    ],
    amenities: [
      { name: "Grand Clubhouse", icon: "Home" },
      { name: "Fitness Center", icon: "Dumbbell" },
      { name: "High-Speed Elevators", icon: "ArrowUp" },
      { name: "Concierge Desk", icon: "UserCheck" },
      { name: "Power Backup", icon: "BatteryCharging" },
      { name: "EV Charging Bay", icon: "Zap" }
    ],
    gallery: [
      "/images/fresh/luxotic-residences.jpg",
      "/images/fresh/luxotic-interior-living.jpg",
      "/images/hero/hero-main.jpg",
      "/images/fresh/luxotic-experience-lounge.jpg"
    ],
    masterplanImage: "/images/fresh/luxotic-masterplan-render.jpg",
    brochurePath: "/downloads/luxotic-residences-brochure.pdf",
    reraNumber: "[CONTENT REQUIRED]",
    squareFootage: "[CONTENT REQUIRED]"
  }
];
