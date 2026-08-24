"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, MapPin, Sparkles, ArrowUpRight, Maximize2 } from "lucide-react";
import PageHeroBanner from "@/components/PageHeroBanner";
import AnimatedSection from "@/components/AnimatedSection";
import GalleryModal from "@/components/GalleryModal";
import EnquireModal from "@/components/EnquireModal";
import { GALLERY_DATA, GALLERY_CATEGORIES, GalleryItem } from "@/data/gallery";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [enquireOpen, setEnquireOpen] = useState(false);

  const filteredItems =
    selectedCategory === "All"
      ? GALLERY_DATA
      : GALLERY_DATA.filter((item) => item.category === selectedCategory);

  const allImages = filteredItems.map((item) => item.image);

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="space-y-0 bg-white min-h-screen">
      {/* Hero Banner */}
      <PageHeroBanner
        tag="VISUAL PORTFOLIO & ARCHITECTURE"
        title="Project Gallery"
        highlightText="& Architectural Showcase."
        subtitle="Explore high-resolution visual tours of our luxury farmhouses, plotted developments, masterplanned enclaves, and lifestyle amenities across prime NCR growth corridors."
        backgroundImage="/images/hero/hero-poster.jpg"
      />

      {/* Gallery Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Filter Controls */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 pb-8 border-b border-slate-200 gap-6">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-2">
                CURATED VISUAL ARCHIVE
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-slate-900">
                Visual Experience
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {GALLERY_CATEGORIES.map((cat) => {
                const count =
                  cat === "All"
                    ? GALLERY_DATA.length
                    : GALLERY_DATA.filter((i) => i.category === cat).length;
                const isActive = selectedCategory === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                      isActive
                        ? "bg-slate-900 text-white shadow-md"
                        : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200/80"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gallery Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, idx) => (
              <AnimatedSection key={item.id} delay={idx * 0.08}>
                <div className="group bg-white border border-slate-200 overflow-hidden luxury-card flex flex-col justify-between h-full">
                  {/* Photo Container */}
                  <div
                    onClick={() => openLightbox(idx)}
                    className="relative aspect-[16/11] w-full overflow-hidden bg-slate-100 cursor-pointer img-zoom-container"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Gradient Overlay & Hover Button */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="px-4 py-2.5 bg-white text-slate-900 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Maximize2 className="w-3.5 h-3.5 text-slate-900" />
                        <span>View High-Res</span>
                      </div>
                    </div>

                    {/* Tag Badge */}
                    <div className="absolute top-4 left-4 bg-slate-900/90 text-white text-[10px] uppercase tracking-widest px-3 py-1 font-semibold backdrop-blur-sm">
                      {item.tag}
                    </div>
                  </div>

                  {/* Info Content */}
                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-600 uppercase tracking-wider">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{item.location}</span>
                      </div>
                      <h3 className="font-serif text-lg text-slate-900 group-hover:text-slate-700 transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 font-light leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        {item.category}
                      </span>
                      <button
                        onClick={() => openLightbox(idx)}
                        className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-slate-900 hover:text-amber-600 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16 bg-white border border-slate-200">
              <p className="text-sm text-slate-500 font-light">
                No gallery media found for this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Experience VIP Site Visit Banner */}
      <section className="py-20 bg-slate-950 text-white border-t border-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-white text-[11px] font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>EXPERIENCE LUXOTIC IN PERSON</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-white mt-4">
              Schedule a Guided Private Site Tour
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-light leading-relaxed mt-3">
              Witness our masterplans, luxury farmhouse layouts, and plotted enclaves live on-ground. Our senior property advisors provide private chauffeured tours upon appointment.
            </p>
            <div className="pt-6 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setEnquireOpen(true)}
                className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 text-xs font-semibold uppercase tracking-widest shadow-xl transition-all flex items-center gap-2"
              >
                <span>Book VIP Site Visit</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <Link
                href="/projects"
                className="px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-white/20 text-white text-xs font-semibold uppercase tracking-widest transition-all"
              >
                Explore Projects
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Full-Screen Lightbox Modal */}
      <GalleryModal
        isOpen={lightboxOpen}
        images={allImages}
        initialIndex={activeImageIndex}
        onClose={() => setLightboxOpen(false)}
        projectName={`LUXOTIC Showcase (${selectedCategory})`}
      />

      {/* Enquire Modal */}
      <EnquireModal
        isOpen={enquireOpen}
        onClose={() => setEnquireOpen(false)}
      />
    </div>
  );
}
