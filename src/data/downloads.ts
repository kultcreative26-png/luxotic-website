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
    id: "plots-brochure",
    title: "Luxotic Horizon Plotted Enclave Brochure",
    category: "Project Brochures",
    fileType: "PDF",
    fileSize: "3.9 MB",
    filePath: "/downloads/Luxotic-Plots-Brochure.pdf",
    isAvailable: true,
    description: "Complete overview of masterplanned plotted developments, underground utilities grid, and site layout plans."
  },
  {
    id: "residences-brochure",
    title: "Luxotic Grand Residences Overview",
    category: "Project Brochures",
    fileType: "PDF",
    fileSize: "5.1 MB",
    filePath: "/downloads/Luxotic-Residences-Brochure.pdf",
    isAvailable: false, // Coming soon fallback test
    description: "Architectural layouts, floor plans, luxury finishes, and lifestyle specifications for modern luxury residences."
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
