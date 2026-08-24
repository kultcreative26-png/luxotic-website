"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  MapPin,
  CheckCircle2,
  Sparkles,
  X,
  FileText,
  Save,
  Layers,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Project } from "@/data/projects";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<Project>>({
    name: "",
    slug: "",
    category: "Farmhouses",
    categorySlug: "farmhouses",
    tagline: "",
    location: "",
    status: "Ongoing",
    squareFootage: "",
    reraNumber: "",
    shortDescription: "",
    heroImage: "/images/bollywood-aerocity/hero_farmhouse.png",
    brochurePath: "/downloads/brochure.pdf",
    overview: [""],
    highlights: [""],
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects || []);
      }
    } catch (err) {
      console.error("Fetch projects error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setIsEditing(false);
    setFormData({
      name: "",
      slug: "",
      category: "Farmhouses",
      categorySlug: "farmhouses",
      tagline: "Where Luxury Meets Nature's Endless Beauty",
      location: "Delhi NCR Growth Corridor",
      status: "Ongoing",
      squareFootage: "1,000 – 2,500+ Sq. Yards",
      reraNumber: "Sanctioned Gated Development",
      shortDescription: "Ultra-luxury gated enclave with private estate villas, wide RCC roads and clubhouse.",
      heroImage: "/images/bollywood-aerocity/hero_farmhouse.png",
      brochurePath: "/downloads/brochure.pdf",
      overview: [
        "Curated luxury real estate development in prime growth corridor.",
        "Offering unparalleled capital appreciation and luxury lifestyle.",
      ],
      highlights: [
        "100% secure gated community with 24/7 security",
        "Pakka construction fully allowed with private pools and boundary walls",
        "15 minutes to Jewar International Airport corridor",
      ],
      amenities: [
        { name: "Luxury Clubhouse", icon: "Home" },
        { name: "Swimming Pool", icon: "Waves" },
        { name: "24/7 Gated Security", icon: "ShieldCheck" },
      ],
      gallery: [
        "/images/bollywood-aerocity/hero_farmhouse.png",
        "/images/bollywood-aerocity/aerial_farm_estates.png",
      ],
    });
    setModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setIsEditing(true);
    setFormData({ ...project });
    setModalOpen(true);
  };

  const handleDeleteProject = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete project: ${slug}?`)) return;
    try {
      const res = await fetch(`/api/admin/projects?slug=${slug}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setProjects(projects.filter((p) => p.slug !== slug));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Auto-generate slug if missing
      const slug =
        formData.slug ||
        formData.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

      const payload = {
        ...formData,
        slug,
      };

      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        fetchProjects();
      } else {
        alert(data.error || "Failed to save project.");
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Projects & Developments Manager"
        subtitle="Create, update, and manage luxury real estate developments, pricing, amenities & media."
      />

      <div className="px-4 sm:px-8 space-y-6">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Active Portfolio:
            </span>
            <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 font-bold rounded-full text-xs">
              {projects.length} Projects
            </span>
          </div>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-slate-700 transition-all"
            >
              <div>
                {/* Hero Image Preview */}
                <div className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden">
                  <Image
                    src={project.heroImage}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded">
                    {project.category}
                  </div>
                  <div
                    className={`absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded ${
                      project.status === "Ongoing"
                        ? "bg-emerald-500 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {project.status}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>

                  <h3 className="font-serif text-xl text-white font-normal group-hover:text-amber-400 transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-xs text-slate-400 font-light line-clamp-2 leading-relaxed">
                    {project.shortDescription || project.tagline}
                  </p>

                  <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-500 block uppercase tracking-wider text-[9px]">
                        Plot Sizes / Price
                      </span>
                      <span className="text-slate-200 font-medium truncate block">
                        {project.squareFootage}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase tracking-wider text-[9px]">
                        Brochure Assigned
                      </span>
                      <span className="text-emerald-400 font-mono text-[10px] truncate block">
                        {project.brochurePath ? "Active PDF" : "None"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between">
                <a
                  href={`/projects/${project.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  <span>Preview Page</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(project)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
                    title="Edit Project"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDeleteProject(project.slug)}
                    className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Project Full Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-amber-400 mb-1">
                {isEditing ? "EDIT DEVELOPMENT" : "CREATE NEW DEVELOPMENT"}
              </div>
              <h3 className="font-serif text-2xl text-white">
                {isEditing ? `Edit: ${formData.name}` : "Add New Real Estate Project"}
              </h3>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Bollywood Aero City Farms"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    URL Slug (Identifier) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. bollywood-aero-city-farms"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500 font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      const cat = e.target.value as Project["category"];
                      const slug: Project["categorySlug"] =
                        cat === "Farmhouses"
                          ? "farmhouses"
                          : cat === "Plotted Developments"
                          ? "plots"
                          : "residential";
                      setFormData({
                        ...formData,
                        category: cat,
                        categorySlug: slug,
                      });
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Farmhouses">Farmhouses</option>
                    <option value="Plotted Developments">Plotted Developments</option>
                    <option value="Residential Properties">Residential Properties</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Development Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as Project["status"] })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Ready for Possession">Ready for Possession</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Plot Sizes / Starting Price
                  </label>
                  <input
                    type="text"
                    value={formData.squareFootage}
                    onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
                    placeholder="1,000 – 2,500+ Sq. Yards"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Tagline / Punchline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="Where Luxury Meets Nature's Endless Beauty"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Location Corridor
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Village Sarakpur, G.B. Nagar (15 Mins to Jewar Airport)"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Hero Image URL / Path
                  </label>
                  <input
                    type="text"
                    value={formData.heroImage}
                    onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                    placeholder="/images/bollywood-aerocity/hero_farmhouse.png"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500 font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Assigned Brochure PDF Path
                  </label>
                  <input
                    type="text"
                    value={formData.brochurePath}
                    onChange={(e) => setFormData({ ...formData, brochurePath: e.target.value })}
                    placeholder="/downloads/brochure.pdf"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500 font-mono text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Summary for project card previews on Home and Project listing..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg uppercase tracking-wider text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg uppercase tracking-wider text-xs flex items-center gap-2 shadow-md transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? "Saving..." : "Save Project"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
