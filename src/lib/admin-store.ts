import fs from "fs";
import path from "path";
import { SITE_DATA } from "@/data/site";
import { PROJECTS_DATA, Project } from "@/data/projects";
import { GALLERY_DATA, GalleryItem } from "@/data/gallery";
import { DOWNLOADS_DATA, DownloadableDoc } from "@/data/downloads";

const DATA_DIR = path.join(process.cwd(), "data_store");

// Helper to ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Generic file reader with fallback
function readJsonFile<T>(fileName: string, fallback: T): T {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, fileName);
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(content) as T;
    }
  } catch (err) {
    console.error(`[AdminStore] Error reading ${fileName}:`, err);
  }
  return fallback;
}

// Generic file writer
function writeJsonFile<T>(fileName: string, data: T): boolean {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, fileName);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error(`[AdminStore] Error writing ${fileName}:`, err);
    return false;
  }
}

// 1. LEADS INTERFACE & STORE
export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  projectType: string;
  message?: string;
  source: "Brochure Download" | "Enquiry Modal" | "Contact Page" | "VIP Site Visit" | "Quick Lead";
  status: "New" | "Contacted" | "Site Visit Scheduled" | "In Discussion" | "Converted" | "Closed";
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

// Initial demo leads so the dashboard looks great immediately
const INITIAL_LEADS: LeadItem[] = [
  {
    id: "lead-1",
    name: "Vikram Malhotra",
    phone: "+91 98112 34567",
    email: "vikram.m@example.com",
    projectType: "Bollywood Aero City Farms",
    message: "Interested in 2000 Sq. Yds farm plot near Jewar Airport. Looking for quick site visit this Saturday.",
    source: "Brochure Download",
    status: "New",
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
  },
  {
    id: "lead-2",
    name: "Ananya Singhal",
    phone: "+91 98710 99887",
    email: "ananya.singhal@outlook.com",
    projectType: "Bollywood Aero City Farms",
    message: "Requested official comprehensive project brochure for Bollywood Aero City Farms. File: /downloads/brochure.pdf",
    source: "Brochure Download",
    status: "Contacted",
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: "lead-3",
    name: "Harish Vardhan",
    phone: "+91 99990 12345",
    email: "h.vardhan@gmail.com",
    projectType: "Plotted Developments",
    message: "Looking for clear-title commercial / residential plot near Yamuna Expressway.",
    source: "Contact Page",
    status: "Site Visit Scheduled",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  }
];

export function getLeads(): LeadItem[] {
  return readJsonFile<LeadItem[]>("leads.json", INITIAL_LEADS);
}

export function saveLead(leadData: Omit<LeadItem, "id" | "createdAt" | "updatedAt" | "status"> & { status?: LeadItem["status"] }): LeadItem {
  const leads = getLeads();
  const newLead: LeadItem = {
    id: `LX-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`,
    ...leadData,
    status: leadData.status || "New",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  leads.unshift(newLead);
  writeJsonFile("leads.json", leads);
  return newLead;
}

export function updateLeadStatus(id: string, status: LeadItem["status"], notes?: string): LeadItem | null {
  const leads = getLeads();
  const idx = leads.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  leads[idx].status = status;
  leads[idx].updatedAt = new Date().toISOString();
  if (notes !== undefined) {
    leads[idx].notes = notes;
  }
  writeJsonFile("leads.json", leads);
  return leads[idx];
}

export function deleteLead(id: string): boolean {
  const leads = getLeads();
  const filtered = leads.filter((l) => l.id !== id);
  if (filtered.length === leads.length) return false;
  return writeJsonFile("leads.json", filtered);
}

// 2. VISITOR ACTIVITY TRACKER
export interface VisitorLog {
  id: string;
  page: string;
  referrer: string;
  device: "Mobile" | "Tablet" | "Desktop";
  browser?: string;
  timestamp: string;
}

export function getVisitors(): VisitorLog[] {
  return readJsonFile<VisitorLog[]>("visitors.json", [
    {
      id: "v-1",
      page: "/",
      referrer: "Direct / Organic",
      device: "Desktop",
      browser: "Chrome",
      timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    },
    {
      id: "v-2",
      page: "/projects/bollywood-aero-city-farms",
      referrer: "Google Search",
      device: "Mobile",
      browser: "Safari",
      timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    },
    {
      id: "v-3",
      page: "/gallery",
      referrer: "Direct",
      device: "Desktop",
      browser: "Chrome",
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    }
  ]);
}

export function logVisitor(log: Omit<VisitorLog, "id" | "timestamp">): VisitorLog {
  const visitors = getVisitors();
  const newLog: VisitorLog = {
    id: `v-${Date.now()}`,
    ...log,
    timestamp: new Date().toISOString(),
  };
  visitors.unshift(newLog);
  // Keep last 500 visitor logs
  if (visitors.length > 500) visitors.length = 500;
  writeJsonFile("visitors.json", visitors);
  return newLog;
}

// 3. PROJECTS STORE
export function getProjects(): Project[] {
  return readJsonFile<Project[]>("projects.json", PROJECTS_DATA);
}

export function saveProjects(projects: Project[]): boolean {
  return writeJsonFile("projects.json", projects);
}

export function getProjectBySlug(slug: string): Project | undefined {
  const projects = getProjects();
  return projects.find((p) => p.slug === slug);
}

export function upsertProject(project: Project): Project {
  const projects = getProjects();
  const idx = projects.findIndex((p) => p.slug === project.slug);
  if (idx >= 0) {
    projects[idx] = project;
  } else {
    projects.push(project);
  }
  saveProjects(projects);
  return project;
}

export function deleteProject(slug: string): boolean {
  const projects = getProjects();
  const filtered = projects.filter((p) => p.slug !== slug);
  if (filtered.length === projects.length) return false;
  return saveProjects(filtered);
}

// 4. MEDIA & HERO VIDEO CONFIG
export interface MediaConfig {
  heroVideo: {
    primarySource: string;
    secondarySource: string;
    cdnFallback: string;
    posterImage: string;
    autoPlay: boolean;
    loop: boolean;
    muted: boolean;
    headline: string;
    subHeadline: string;
    description: string;
  };
  gallery: GalleryItem[];
}

const DEFAULT_MEDIA_CONFIG: MediaConfig = {
  heroVideo: {
    primarySource: "/videos/hero-banner.mp4",
    secondarySource: "/videos/hero-banner-2.mp4",
    cdnFallback: "https://videos.pexels.com/video-files/7578552/7578552-hd_1920_1080_30fps.mp4",
    posterImage: "/images/hero/hero-poster.jpg",
    autoPlay: true,
    loop: true,
    muted: true,
    headline: "Building Landmarks. Creating Legacies.",
    subHeadline: "LUXOTIC INFRASTRUCTURE PVT. LTD.",
    description: "Delivering premium farmhouses, plotted enclaves, and luxury residences across prime growth corridors in India with complete transparency.",
  },
  gallery: GALLERY_DATA,
};

export function getMediaConfig(): MediaConfig {
  return readJsonFile<MediaConfig>("media.json", DEFAULT_MEDIA_CONFIG);
}

export function saveMediaConfig(config: MediaConfig): boolean {
  return writeJsonFile("media.json", config);
}

// 5. BROCHURES & DOCUMENTS STORE
export function getBrochures(): DownloadableDoc[] {
  return readJsonFile<DownloadableDoc[]>("brochures.json", DOWNLOADS_DATA);
}

export function saveBrochures(brochures: DownloadableDoc[]): boolean {
  return writeJsonFile("brochures.json", brochures);
}

// 6. SITE SETTINGS STORE
export interface SiteSettings {
  contact: {
    phone: string;
    phoneRaw: string;
    whatsapp: string;
    whatsappRaw: string;
    email: string;
    website: string;
    address: string;
    workingHours: string;
  };
  social: {
    whatsapp: string;
    linkedin: string;
    instagram: string;
    facebook: string;
    twitter: string;
  };
  leadership: {
    founderName: string;
    founderTitle: string;
    welcomeQuote: string;
    messageContent: string[];
  };
  branding: {
    companyName: string;
    brandShort: string;
    tagline: string;
    subHeadline: string;
    visionQuote: string;
    visionText: string;
  };
}

const DEFAULT_SITE_SETTINGS: SiteSettings = {
  contact: SITE_DATA.contact,
  social: SITE_DATA.social,
  leadership: {
    founderName: "Ajay Kumar",
    founderTitle: "Founder & Director, LUXOTIC Infrastructure Private Limited",
    welcomeQuote: "Welcome to LUXOTIC Infrastructure Private Limited.",
    messageContent: SITE_DATA.founderMessage.content,
  },
  branding: {
    companyName: SITE_DATA.companyName,
    brandShort: SITE_DATA.brandShort,
    tagline: SITE_DATA.tagline,
    subHeadline: SITE_DATA.subHeadline,
    visionQuote: SITE_DATA.vision.quote,
    visionText: SITE_DATA.vision.fullText,
  },
};

export function getSiteSettings(): SiteSettings {
  return readJsonFile<SiteSettings>("settings.json", DEFAULT_SITE_SETTINGS);
}

export function saveSiteSettings(settings: SiteSettings): boolean {
  return writeJsonFile("settings.json", settings);
}

// 7. ADMIN AUTH CREDENTIALS STORE
export interface AdminAuthConfig {
  email: string;
  passwordHash: string; // Plain/SHA fallback for prototype
  lastLogin?: string;
}

const DEFAULT_ADMIN_AUTH: AdminAuthConfig = {
  email: "admin@luxotic.com",
  passwordHash: "Luxotic@2026",
};

export function getAdminAuth(): AdminAuthConfig {
  return readJsonFile<AdminAuthConfig>("admin_auth.json", DEFAULT_ADMIN_AUTH);
}

export function saveAdminAuth(auth: AdminAuthConfig): boolean {
  return writeJsonFile("admin_auth.json", auth);
}
