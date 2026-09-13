export interface DownloadableDoc {
  id: string;
  title: string;
  category: "Company Profile" | "Project Brochures" | "Project Presentations" | "Masterplans" | "Other Documents";
  fileType: "PDF" | "DOCX" | "ZIP";
  fileSize: string;
  filePath: string;
  isAvailable: boolean;
  description: string;
}

export const DOWNLOADS_DATA: DownloadableDoc[] = [
  {
    id: "company-profile",
    title: "LUXOTIC Infrastructure Corporate Profile",
    category: "Company Profile",
    fileType: "PDF",
    fileSize: "2.4 MB",
    filePath: "/downloads/Luxotic-Infrastructure-Corporate-Profile.pdf",
    isAvailable: true,
    description: "Official corporate presentation outlining Luxotic's vision, mission, core services, leadership message, and project portfolio."
  },
  {
    id: "farmhouses-brochure",
    title: "Bollywood Aero City Farms Brochure",
    category: "Project Brochures",
    fileType: "PDF",
    fileSize: "49.7 MB",
    filePath: "/downloads/brochure.pdf",
    isAvailable: true,
    description: "Comprehensive project brochure detailing Bollywood Aero City Farms plot sizes (1000-2500 Sq. Yds), enclave amenities, location map near Jewar Airport, and investment benefits."
  },
  {
    id: "radha-paradise-brochure",
    title: "Radha Paradise Luxury Villas & Plots Brochure",
    category: "Project Brochures",
    fileType: "PDF",
    fileSize: "2.6 MB",
    filePath: "/downloads/Radha-Paradise-Brochure.pdf",
    isAvailable: true,
    description: "Official project brochure with layout plans, 60 & 80 Sq.Yd. 3BHK villa construction specs, location map on NH-91 GT Road Dadri, and vicinity ecosystem."
  },
  {
    id: "dhani-enclave-brochure",
    title: "Dhani Enclave Residential Plots Brochure",
    category: "Project Brochures",
    fileType: "PDF",
    fileSize: "1.2 MB",
    filePath: "/downloads/Dhani-Enclave-Brochure.pdf",
    isAvailable: true,
    description: "Official project brochure detailing Dhani Enclave demarcated residential plots, wide internal roads, underground utilities, and location advantages near Dadri Bypass."
  },
  {
    id: "masterplan-farmhouses",
    title: "Bollywood Aero City Farms Master Layout Plan",
    category: "Masterplans",
    fileType: "PDF",
    fileSize: "1.8 MB",
    filePath: "/downloads/Luxotic-Farmhouses-Masterplan.pdf",
    isAvailable: true,
    description: "High-resolution architectural layout showing internal RCC roads, mango orchards, and plot orientation."
  },
  {
    id: "investment-guide",
    title: "Real Estate Investment & Property Advisory Guide",
    category: "Other Documents",
    fileType: "PDF",
    fileSize: "1.2 MB",
    filePath: "/downloads/Luxotic-Investment-Guide.pdf",
    isAvailable: false,
    description: "Market insights, legal due-diligence checklists, and growth trajectory analysis for NCR real estate."
  }
];
