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
  brochurePages?: string[];
  titleStatus: string;
  reraNumber?: string;
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
    brochurePages: [
      "/images/bollywood-aerocity/brochure_pages/page_1.jpg",
      "/images/bollywood-aerocity/brochure_pages/page_2.jpg",
      "/images/bollywood-aerocity/brochure_pages/page_3.jpg",
      "/images/bollywood-aerocity/brochure_pages/page_4.jpg",
      "/images/bollywood-aerocity/brochure_pages/page_5.jpg",
      "/images/bollywood-aerocity/brochure_pages/page_6.jpg",
      "/images/bollywood-aerocity/brochure_pages/page_7.jpg",
      "/images/bollywood-aerocity/brochure_pages/page_8.jpg",
      "/images/bollywood-aerocity/brochure_pages/page_9.jpg",
      "/images/bollywood-aerocity/brochure_pages/page_10.jpg",
      "/images/bollywood-aerocity/brochure_pages/page_11.jpg",
      "/images/bollywood-aerocity/brochure_pages/page_12.jpg"
    ],
    titleStatus: "100% Clear Title / Gated Development",
    reraNumber: "100% Clear Title / Gated Development",
    squareFootage: "1,000 – 2,500+ Sq. Yards (Est. Starting ₹1.75 Cr*)"
  },
  {
    slug: "radha-paradise",
    name: "Radha Paradise",
    category: "Residential Properties",
    categorySlug: "residential",
    tagline: "Luxury, Comfort, Community Perfectly Planned",
    location: "NH-91, GT Road, Opp. Mohan Swaroop Hospital, Dadri (New Noida), Gautam Budh Nagar - 201207",
    heroImage: "/images/radha-paradise/hero_entrance.jpg",
    status: "Ongoing",
    shortDescription: "One of the most sought-after residential gated developments in Dadri (New Noida) on NH-91 GT Road. Offering 60 & 80 Sq.Yd. 3BHK customizable luxury duplex villas and plots, earthquake-resistant RCC construction, and seamless connectivity to DMIC and Eastern Peripheral Expressway.",
    overview: [
      "RADHA PARADISE is a prestigious residential villa community in Dadri (New Noida), thoughtfully designed and executed under the vision 'Udaan Hamari, Aashiyana Aapka' by Luxotic Infrastructure Pvt. Ltd.",
      "Strategically situated directly on NH-91 GT Road opposite Mohan Swaroop Hospital, Radha Paradise enjoys seamless multi-lane connectivity to key city destinations, Eastern Peripheral Expressway (6-lane EPE), and DMIC (Delhi-Mumbai Industrial Corridor - Japan assisted), making it an ideal choice for both end-users and investors.",
      "The township features earthquake-resistant RCC framed structures, 60 Sq.Yd. (15'6\" x 35') and 80 Sq.Yd. (18'6\" x 39') 3BHK duplex floor plans with customizable layouts, polished vitrified flooring, wide 20' & 22' paved boulevards, underground drainage, 24/7 CCTV gated security, and a grand community temple."
    ],
    highlights: [
      "Direct NH-91 GT Road location opposite Mohan Swaroop Hospital, Dadri (New Noida)",
      "3 Km from Eastern Peripheral Expressway (6-Lane EPE) & 2 Km from DMIC Corridor",
      "Just 2 Km from Dadri Air Force Station & 400 meters from Dadri Bypass",
      "Customizable 3BHK Duplex Villas: 60 Sq.Yd. (15'6\" x 35') & 80 Sq.Yd. (18'6\" x 39')",
      "Earthquake-Resistant RCC Structure with polished vitrified flooring & designer false ceiling",
      "Wide 20' and 22' internal paved roads with street lighting & underground drainage",
      "Civic ecosystem within 3 km: Top schools (Kaushalya World School, Decent Public School), hospitals, banks & shopping",
      "Gated society with 24/7 CCTV surveillance, boundary walls & grand entrance gate"
    ],
    amenities: [
      { name: "Underground Sewerage System", icon: "ShieldCheck" },
      { name: "24/7 Gated Security & CCTV", icon: "Lock" },
      { name: "Dedicated Electricity & Power Backup", icon: "Zap" },
      { name: "Community Green Parks & Play Zone", icon: "Trees" },
      { name: "Grand Society Temple", icon: "Home" },
      { name: "Wide 20' & 22' Paved Roads", icon: "Milestone" },
      { name: "Earthquake-Resistant Structure", icon: "Building2" },
      { name: "Vicinity to Top Schools & Hospitals", icon: "MapPin" }
    ],
    gallery: [
      "/images/radha-paradise/hero_entrance.jpg",
      "/images/radha-paradise/villa_floorplans.jpg",
      "/images/radha-paradise/amenities_vicinity.jpg",
      "/images/radha-paradise/masterplan_layout.jpg"
    ],
    masterplanImage: "/images/radha-paradise/masterplan_layout.jpg",
    brochurePath: "/downloads/Radha-Paradise-Brochure.pdf",
    brochurePages: [
      "/images/radha-paradise/page_1.jpg",
      "/images/radha-paradise/page_2.jpg",
      "/images/radha-paradise/page_3.jpg",
      "/images/radha-paradise/page_4.jpg"
    ],
    titleStatus: "100% Clear Title / Freehold Gated Society",
    reraNumber: "100% Clear Title / Freehold Gated Society",
    squareFootage: "60 & 80 Sq.Yd. (3BHK Luxury Duplex Villas & Plots)"
  },
  {
    slug: "dhani-enclave",
    name: "Dhani Enclave",
    category: "Plotted Developments",
    categorySlug: "plots",
    tagline: "Live Connected. Live Better.",
    location: "Near Dadri Bypass, NH-91, Dadri (New Noida), Uttar Pradesh",
    heroImage: "/images/dhani-enclave/hero_entrance.jpg",
    status: "Upcoming",
    shortDescription: "A thoughtfully planned upcoming township near Dadri Bypass on NH-91 (New Noida) offering premium residential plots for modern living. Features wide internal roads, underground utilities, landscaped green parks, and 24x7 gated security.",
    overview: [
      "DHANI ENCLAVE is an upcoming masterplanned residential plotted community in Dadri (New Noida), developed under the vision 'Udaan Hamari, Aashiyana Aapka' by Luxotic Infrastructure Pvt. Ltd.",
      "Strategically situated near Dadri Bypass right on NH-91, Dhani Enclave blends modern infrastructure, green open surroundings, and seamless connectivity to Noida, Greater Noida, Ghaziabad, and the upcoming Jewar International Airport (approx. 40 minutes).",
      "The township features wide well-designed internal roads, underground electricity network, underground water supply, landscaped community parks, 24x7 CCTV security, and immediate access to top schools, hospitals, and transit points within a 3 km radius."
    ],
    highlights: [
      "Strategically Located on NH-91 near Dadri Bypass, Dadri (New Noida)",
      "Seamless multi-corridor connectivity to Noida, Greater Noida, and Ghaziabad",
      "Approx. 40 minutes drive to Noida International Airport (Jewar)",
      "Close to major industrial corridors (DMIC) and Eastern Peripheral Expressway (6-lane EPE)",
      "Modern Underground Infrastructure: Underground cabling & underground water supply",
      "Wide, well-designed internal avenues with street lights throughout the township",
      "24x7 Gated Security with active campus CCTV surveillance",
      "Comprehensive Social Infrastructure within 3 km: Top schools, hospitals, fuel stations, and shopping hubs"
    ],
    amenities: [
      { name: "Underground Electricity Network", icon: "Zap" },
      { name: "Underground Water Supply", icon: "CloudRain" },
      { name: "24/7 Gated Security & CCTV", icon: "Lock" },
      { name: "Wide Internal Paved Roads", icon: "Milestone" },
      { name: "Landscaped Green Parks", icon: "Trees" },
      { name: "Street Lights Throughout Township", icon: "Sun" },
      { name: "Grand Entry Gate House", icon: "Building2" },
      { name: "3 Km to Schools & Hospitals", icon: "MapPin" }
    ],
    gallery: [
      "/images/dhani-enclave/hero_entrance.jpg",
      "/images/dhani-enclave/lifestyle_family.jpg",
      "/images/dhani-enclave/vicinity_amenities.jpg",
      "/images/dhani-enclave/site_location_view.jpg"
    ],
    masterplanImage: "/images/dhani-enclave/site_location_view.jpg",
    brochurePath: "/downloads/Dhani-Enclave-Brochure.pdf",
    brochurePages: [
      "/images/dhani-enclave/page_1.jpg",
      "/images/dhani-enclave/page_2.jpg"
    ],
    titleStatus: "100% Clear Title / Upcoming Gated Enclave",
    reraNumber: "100% Clear Title / Upcoming Gated Enclave",
    squareFootage: "Demarcated Residential Plots (Flexible Sizes Available)"
  }
];
