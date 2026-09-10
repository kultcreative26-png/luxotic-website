"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Download,
  CheckCircle2,
  ArrowLeft,
  Maximize2,
  ShieldCheck,
  Zap,
  Trees,
  Lock,
  Waves,
  Grid,
  Sun,
  CloudRain,
  Building2,
  Home,
  Dumbbell,
  ArrowUp,
  UserCheck,
  BatteryCharging,
  Milestone,
  Flame,
  BookOpen,
} from "lucide-react";
import { Project } from "@/data/projects";
import { SITE_DATA } from "@/data/site";
import GalleryModal from "@/components/GalleryModal";
import EnquireModal from "@/components/EnquireModal";
import BrochureModal from "@/components/BrochureModal";
import BrochureFlipbookModal from "@/components/BrochureFlipbookModal";

const getAmenityIcon = (iconName: string) => {
  switch (iconName) {
    case "Waves":
      return <Waves className="w-5 h-5 text-slate-800" />;
    case "Flame":
      return <Flame className="w-5 h-5 text-slate-800" />;
    case "ShieldCheck":
      return <ShieldCheck className="w-5 h-5 text-slate-800" />;
    case "Lock":
      return <Lock className="w-5 h-5 text-slate-800" />;
    case "Milestone":
      return <Milestone className="w-5 h-5 text-slate-800" />;
    case "Grid":
      return <Grid className="w-5 h-5 text-slate-800" />;
    case "Trees":
      return <Trees className="w-5 h-5 text-slate-800" />;
    case "Zap":
      return <Zap className="w-5 h-5 text-slate-800" />;
    case "Sun":
      return <Sun className="w-5 h-5 text-slate-800" />;
    case "MapPin":
      return <MapPin className="w-5 h-5 text-slate-800" />;
    case "Building2":
      return <Building2 className="w-5 h-5 text-slate-800" />;
    case "CloudRain":
      return <CloudRain className="w-5 h-5 text-slate-800" />;
    case "Home":
      return <Home className="w-5 h-5 text-slate-800" />;
    case "Dumbbell":
      return <Dumbbell className="w-5 h-5 text-slate-800" />;
    case "ArrowUp":
      return <ArrowUp className="w-5 h-5 text-slate-800" />;
    case "UserCheck":
      return <UserCheck className="w-5 h-5 text-slate-800" />;
    case "BatteryCharging":
      return <BatteryCharging className="w-5 h-5 text-slate-800" />;
    default:
      return <CheckCircle2 className="w-5 h-5 text-slate-800" />;
  }
};

export default function ProjectDetailClient({ project }: { project: Project }) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);
  const [enquireOpen, setEnquireOpen] = useState(false);
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [flipbookOpen, setFlipbookOpen] = useState(false);

  return (
    <div className="pt-24 bg-white min-h-screen space-y-0">
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects Overview</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[450px] w-full bg-slate-950 overflow-hidden">
        <Image
          src={project.heroImage}
          alt={project.name}
          fill
          priority
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 text-white">
          <div className="max-w-7xl mx-auto space-y-4">
            <div className="inline-block px-3 py-1 bg-amber-500 text-slate-950 text-[10px] uppercase tracking-widest font-bold">
              {project.category}
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white">
              {project.name}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-semibold">
                <MapPin className="w-4 h-4 text-amber-400" />
                {project.location}
              </span>
              <span>•</span>
              <span className="uppercase tracking-wider">
                Status: {project.status}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setFlipbookOpen(true)}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg cursor-pointer group"
              >
                <BookOpen className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>Read Interactive Flipbook</span>
              </button>
              <button
                type="button"
                onClick={() => setBrochureModalOpen(true)}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 backdrop-blur-sm transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Brochure</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Specs Bar */}
      <section className="border-b border-slate-200 bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-900">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                CATEGORY
              </div>
              <div className="font-serif text-base font-medium">{project.category}</div>
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                LOCATION
              </div>
              <div className="font-serif text-base font-medium">{project.location}</div>
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                OWNERSHIP / TITLE
              </div>
              <div className="font-serif text-base font-medium text-slate-700">
                {project.titleStatus || project.reraNumber || "Clear Title / Freehold"}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                DEVELOPMENT SCALE
              </div>
              <div className="font-serif text-base font-medium text-slate-700">
                {project.squareFootage}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-16">
              <div className="space-y-4">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                  PROJECT OVERVIEW
                </div>
                <h2 className="font-serif text-3xl text-slate-900">
                  About the Project
                </h2>
                <div className="space-y-4 text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                  {project.overview.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                  DISTINCT FEATURES
                </div>
                <h3 className="font-serif text-2xl text-slate-900">
                  Key Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 font-medium">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                  WORLD-CLASS FACILITIES
                </div>
                <h3 className="font-serif text-2xl text-slate-900">
                  Amenities & Infrastructure
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {project.amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-6 border border-slate-200 bg-white luxury-card space-y-3"
                    >
                      <div>{getAmenityIcon(item.icon)}</div>
                      <div className="text-xs font-semibold text-slate-900">
                        {item.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                      VISUAL TOUR
                    </div>
                    <h3 className="font-serif text-2xl text-slate-900">
                      Project Gallery
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedGalleryIdx(0);
                      setGalleryOpen(true);
                    }}
                    className="text-xs font-semibold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 hover:underline"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span>View Fullscreen</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {project.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedGalleryIdx(idx);
                        setGalleryOpen(true);
                      }}
                      className="relative aspect-square w-full overflow-hidden border border-slate-200 group"
                    >
                      <Image
                        src={img}
                        alt={`${project.name} photo ${idx + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <Maximize2 className="w-5 h-5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-28 bg-white border border-slate-200 p-8 shadow-lg space-y-6">
                <div className="border-b border-slate-200 pb-4">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                    GET IN TOUCH
                  </div>
                  <h4 className="font-serif text-xl text-slate-900">
                    Interested in {project.name}?
                  </h4>
                </div>

                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Request official project pricing, site visit scheduling, plot availability, or full technical documentation.
                </p>

                <button
                  type="button"
                  onClick={() => setFlipbookOpen(true)}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md group cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Open Interactive Flipbook</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBrochureModalOpen(true)}
                  className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Brochure (PDF)</span>
                </button>

                <button
                  onClick={() => setEnquireOpen(true)}
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-widest transition-colors shadow-sm cursor-pointer"
                >
                  Enquire About This Project
                </button>

                <div className="pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
                  <div>
                    • Direct Helpline:{" "}
                    <a
                      href={`tel:${SITE_DATA.contact.phoneRaw}`}
                      className="font-medium text-slate-900 hover:text-amber-600"
                    >
                      {SITE_DATA.contact.phone}
                    </a>
                  </div>
                  <div>• Site Visits Available Wed–Mon (Tuesday Closed)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GalleryModal
        isOpen={galleryOpen}
        images={project.gallery}
        initialIndex={selectedGalleryIdx}
        onClose={() => setGalleryOpen(false)}
        projectName={project.name}
      />

      <EnquireModal
        isOpen={enquireOpen}
        onClose={() => setEnquireOpen(false)}
        defaultProject={project.name}
      />

      <BrochureModal
        isOpen={brochureModalOpen}
        onClose={() => setBrochureModalOpen(false)}
        projectName={project.name}
        brochurePath={project.brochurePath}
        onOpenFlipbook={() => setFlipbookOpen(true)}
      />

      <BrochureFlipbookModal
        isOpen={flipbookOpen}
        onClose={() => setFlipbookOpen(false)}
        projectName={project.name}
        brochurePath={project.brochurePath}
        pages={
          project.brochurePages && project.brochurePages.length > 0
            ? project.brochurePages
            : project.gallery
        }
        onDownloadClick={() => {
          setFlipbookOpen(false);
          setBrochureModalOpen(true);
        }}
      />
    </div>
  );
}
