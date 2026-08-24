"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { PROJECTS_DATA } from "@/data/projects";
import PageHeroBanner from "@/components/PageHeroBanner";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "Farmhouses",
    "Plotted Developments",
    "Residential Properties",
  ];

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-0 bg-white min-h-screen">
      {/* Unique Hero Banner */}
      <PageHeroBanner
        tag="PORTFOLIO OF LANDMARKS"
        title="Projects That Define"
        highlightText="Possibility."
        subtitle="Explore our masterplanned farmhouses, legally verified plotted enclaves, and premium residential spaces engineered for long-term legacy value."
        backgroundImage="/images/banners/banner-projects.jpg"
      />

      {/* Filter System & Project Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 pb-8 border-b border-slate-200 mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-2">
              Filter Portfolio:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.map((project) => (
              <div
                key={project.slug}
                className="group bg-white border border-slate-200 flex flex-col justify-between luxury-card"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full img-zoom-container bg-slate-100">
                    <Image
                      src={project.heroImage}
                      alt={project.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-slate-900/90 text-white text-[10px] uppercase tracking-widest px-3 py-1 font-semibold">
                      {project.category}
                    </div>
                  </div>

                  <div className="p-8 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{project.location}</span>
                    </div>

                    <h2 className="font-serif text-2xl text-slate-900 group-hover:text-slate-700 transition-colors">
                      {project.name}
                    </h2>

                    <div className="text-xs font-semibold text-amber-600 italic">
                      "{project.tagline}"
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-light line-clamp-3">
                      {project.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="p-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Status: {project.status}
                  </span>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-slate-900 group-hover:translate-x-1 transition-transform"
                  >
                    <span>View Project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
