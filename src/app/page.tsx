"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles, Volume2, VolumeX, Play, Pause, Maximize2, MapPin, Eye } from "lucide-react";
import { SITE_DATA } from "@/data/site";
import { PROJECTS_DATA } from "@/data/projects";
import { GALLERY_DATA, GALLERY_CATEGORIES } from "@/data/gallery";
import EnquireModal from "@/components/EnquireModal";
import GalleryModal from "@/components/GalleryModal";
import AnimatedSection from "@/components/AnimatedSection";

export default function HomePage() {
  const [enquireOpen, setEnquireOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>("All");
  const [galleryLightboxOpen, setGalleryLightboxOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-0">
      {/* HERO SECTION - CLEAN FULL-SCREEN VIDEO VIEW */}
      <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            poster="/images/hero/hero-poster.jpg"
            className="w-full h-full object-cover object-center transition-all duration-1000"
          >
            <source src="/videos/hero-banner.mp4" type="video/mp4" />
            <source src="/videos/hero-banner-2.mp4" type="video/mp4" />
            <source src="https://videos.pexels.com/video-files/7578552/7578552-hd_1920_1080_30fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Subtle Bottom Gradient for Smooth Section Blend */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />
        </div>

        {/* Floating Video Controls (Bottom Right) */}
        <div className="absolute bottom-8 right-6 z-20 flex items-center gap-2 bg-slate-900/60 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-full text-white text-xs shadow-xl">
          <button
            onClick={togglePlay}
            className="p-1 hover:text-amber-400 transition-colors"
            title={isPlaying ? "Pause Video" : "Play Video"}
            aria-label="Toggle Video Playback"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <div className="w-px h-3.5 bg-white/20" />
          <button
            onClick={toggleMute}
            className="p-1 hover:text-amber-400 transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
            aria-label="Toggle Video Audio"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <span className="text-[10px] uppercase tracking-wider text-slate-300 pl-1 font-medium hidden sm:inline">Cinematic Reel</span>
        </div>

        {/* Scroll Indicator (Bottom Center) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/80 text-[10px] uppercase tracking-widest pointer-events-none drop-shadow-md">
          <span>Scroll to Explore</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-amber-400" />
        </div>
      </section>

      {/* LUXOTIC HEADLINE STRIP & QUICK ACTIONS */}
      <section className="bg-slate-950 text-white py-14 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>LUXOTIC INFRASTRUCTURE PVT. LTD.</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-white">
                Building Landmarks. <span className="italic font-light text-slate-300">Creating Legacies.</span>
              </h2>
              <p className="text-sm text-slate-400 font-light leading-relaxed">
                Delivering premium farmhouses, plotted enclaves, and luxury residences across prime growth corridors in India with complete transparency.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
              <Link
                href="/projects"
                className="px-7 py-3.5 bg-white text-slate-900 text-xs font-semibold uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center gap-2 group shadow-lg"
              >
                <span>Explore Projects</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <button
                onClick={() => setEnquireOpen(true)}
                className="px-7 py-3.5 bg-slate-900/90 hover:bg-slate-800 border border-white/30 text-white text-xs font-semibold uppercase tracking-widest backdrop-blur-md transition-all flex items-center gap-2"
              >
                <span>Discover Luxotic</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND INTRO */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                  ABOUT LUXOTIC INFRASTRUCTURE
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl text-slate-900 leading-tight">
                  Where Vision Meets <br />
                  <span className="italic">Exceptional Living</span>
                </h2>
                <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  <p>{SITE_DATA.about.introParagraph1}</p>
                  <p>{SITE_DATA.about.introParagraph2}</p>
                  <p>{SITE_DATA.about.introParagraph3}</p>
                </div>

                <div className="pt-4 flex items-center gap-8">
                  <div>
                    <div className="text-2xl font-serif text-slate-900 font-bold">100%</div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-500">
                      Transparent Dealing
                    </div>
                  </div>
                  <div className="h-10 w-px bg-slate-200" />
                  <div>
                    <div className="text-2xl font-serif text-slate-900 font-bold">Verified</div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-500">
                      Clear Title Land
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="/about-us"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-900 hover:text-blue-900 border-b border-slate-900 pb-1 transition-all group"
                  >
                    <span>Read Our Full Story</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6 relative">
                <div className="relative aspect-[4/5] w-full overflow-hidden shadow-2xl img-zoom-container">
                  <Image
                    src="/images/fresh/luxotic-residences.jpg"
                    alt="Luxotic Premium Architectural Landmark"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-slate-900 text-white p-6 hidden sm:block max-w-xs shadow-xl border border-slate-800">
                  <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
                    Tagline
                  </div>
                  <div className="font-serif text-sm italic">
                    "{SITE_DATA.tagline}"
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* WHY LUXOTIC */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-200">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  OUR CORE DIFFERENCE
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-slate-900">
                  Why Luxotic
                </h2>
              </div>
              <p className="text-xs text-slate-500 max-w-md mt-4 md:mt-0 font-light">
                Built upon a foundation of total transparency, strategic location planning, and unyielding customer commitment.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SITE_DATA.coreValues.slice(0, 4).map((val, idx) => (
              <AnimatedSection key={val.number} delay={idx * 0.15}>
                <div className="bg-white p-8 border border-slate-200/80 luxury-card flex flex-col justify-between space-y-6 h-full">
                  <div>
                    <div className="text-3xl font-serif font-light text-slate-400 mb-4">
                      {val.number}
                    </div>
                    <h3 className="font-serif text-xl text-slate-900 mb-1">
                      {val.title}
                    </h3>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 mb-3">
                      {val.subtitle}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">
                      {val.description}
                    </p>
                  </div>
                  <div className="w-8 h-0.5 bg-slate-900" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  CURATED REAL ESTATE PORTFOLIO
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl text-slate-900">
                  Featured Projects
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-6 md:mt-0">
                {["All", "Farmhouses", "Plotted Developments", "Residential Properties"].map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                        selectedCategory === cat
                          ? "bg-slate-900 text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <AnimatedSection key={project.slug} delay={idx * 0.15}>
                <div className="group border border-slate-200 bg-white flex flex-col justify-between luxury-card h-full">
                  <div>
                    <div className="relative aspect-[16/10] w-full img-zoom-container bg-slate-100">
                      <Image
                        src={project.heroImage}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-slate-900/90 text-white text-[10px] uppercase tracking-widest px-3 py-1 font-semibold">
                        {project.category}
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        {project.location}
                      </div>
                      <h3 className="font-serif text-xl text-slate-900 group-hover:text-slate-700 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-light line-clamp-3">
                        {project.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Status: {project.status}
                    </span>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-900 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Explore Project</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-900" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CORE OFFERINGS */}
      <section className="py-24 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-2xl mb-16">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-2">
                OUR SPECIALIZED OFFERINGS
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-white">
                Tailored Real Estate Solutions
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SITE_DATA.services.slice(0, 3).map((service, idx) => (
              <AnimatedSection key={service.id} delay={idx * 0.15}>
                <div className="relative group border border-slate-800 bg-slate-900/60 p-8 space-y-6 flex flex-col justify-between hover:border-slate-700 transition-colors h-full">
                  <div className="relative aspect-[16/9] w-full overflow-hidden mb-4 img-zoom-container">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl text-white">
                      {service.title}
                    </h3>
                    <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                      "{service.tagline}"
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>
                  <Link
                    href="/our-approach"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white hover:text-amber-400 pt-4"
                  >
                    <span>Learn More</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* LUXURY PROJECT GALLERY SHOWCASE */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mb-2">
                  CURATED VISUAL EXPERIENCE
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl text-slate-900">
                  Project Gallery
                </h2>
              </div>

              <div className="flex items-center gap-4 mt-6 md:mt-0">
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-900 hover:text-amber-600 border-b border-slate-900 pb-1 transition-all group"
                >
                  <span>View All Media ({GALLERY_DATA.length})</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 mb-10">
              {GALLERY_CATEGORIES.slice(0, 5).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedGalleryCategory(cat)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                    selectedGalleryCategory === cat
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* 6 Curated Showcase Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(selectedGalleryCategory === "All"
              ? GALLERY_DATA.slice(0, 6)
              : GALLERY_DATA.filter((i) => i.category === selectedGalleryCategory).slice(0, 6)
            ).map((item, idx) => (
              <AnimatedSection key={item.id} delay={idx * 0.1}>
                <div className="group bg-white border border-slate-200 overflow-hidden luxury-card flex flex-col justify-between h-full">
                  <div
                    onClick={() => {
                      setActiveGalleryIndex(
                        GALLERY_DATA.findIndex((g) => g.id === item.id)
                      );
                      setGalleryLightboxOpen(true);
                    }}
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

                    <div className="absolute top-4 left-4 bg-slate-900/90 text-white text-[10px] uppercase tracking-widest px-3 py-1 font-semibold backdrop-blur-sm">
                      {item.tag}
                    </div>
                  </div>

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
                        onClick={() => {
                          setActiveGalleryIndex(
                            GALLERY_DATA.findIndex((g) => g.id === item.id)
                          );
                          setGalleryLightboxOpen(true);
                        }}
                        className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-slate-900 hover:text-amber-600 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-md group"
            >
              <span>Explore Complete Photo Gallery</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <AnimatedSection>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              START YOUR REAL ESTATE JOURNEY
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-slate-900 mt-2">
              Let's Create Something Exceptional.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-light leading-relaxed mt-4">
              Whether you are looking for a luxury farmhouse, a strategically located plot, or expert property consultation, our team is ready to guide you.
            </p>
            <div className="pt-6 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setEnquireOpen(true)}
                className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-widest shadow-lg transition-all"
              >
                Send Enquiry
              </button>
              <Link
                href="/contact"
                className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold uppercase tracking-widest transition-all"
              >
                Visit Contact Page
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery Fullscreen Lightbox Modal */}
      <GalleryModal
        isOpen={galleryLightboxOpen}
        images={GALLERY_DATA.map((item) => item.image)}
        initialIndex={activeGalleryIndex}
        onClose={() => setGalleryLightboxOpen(false)}
        projectName="LUXOTIC Architectural Showcase"
      />

      <EnquireModal
        isOpen={enquireOpen}
        onClose={() => setEnquireOpen(false)}
      />
    </div>
  );
}
