"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Download,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  ExternalLink,
  Save,
  X,
  Sparkles,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { DownloadableDoc } from "@/data/downloads";

export default function AdminBrochuresPage() {
  const [brochures, setBrochures] = useState<DownloadableDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<Partial<DownloadableDoc>>({
    id: "",
    title: "",
    category: "Project Brochures",
    fileType: "PDF",
    fileSize: "49.7 MB",
    filePath: "/downloads/brochure.pdf",
    isAvailable: true,
    description: "",
  });

  const fetchBrochures = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/brochures");
      const data = await res.json();
      if (data.success) {
        setBrochures(data.brochures || []);
      }
    } catch (err) {
      console.error("Fetch brochures error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrochures();
  }, []);

  const openAddModal = () => {
    setFormData({
      id: `doc-${Date.now()}`,
      title: "New Project Brochure",
      category: "Project Brochures",
      fileType: "PDF",
      fileSize: "15.0 MB",
      filePath: "/downloads/brochure.pdf",
      isAvailable: true,
      description: "Comprehensive project presentation detailing layouts, amenities, and connectivity.",
    });
    setModalOpen(true);
  };

  const openEditModal = (doc: DownloadableDoc) => {
    setFormData({ ...doc });
    setModalOpen(true);
  };

  const handleToggleAvailable = async (doc: DownloadableDoc) => {
    const updated = { ...doc, isAvailable: !doc.isAvailable };
    try {
      const res = await fetch("/api/admin/brochures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doc: updated }),
      });
      const data = await res.json();
      if (data.success) {
        setBrochures(data.brochures);
      }
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const handleSaveDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/brochures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doc: formData }),
      });
      const data = await res.json();
      if (data.success) {
        setBrochures(data.brochures);
        setModalOpen(false);
      }
    } catch (err) {
      console.error("Save doc error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Brochures & Documents Manager"
        subtitle="Manage downloadable project brochures, masterplans, and corporate presentations."
      />

      <div className="px-4 sm:px-8 space-y-6">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Active Documents:
            </span>
            <span className="px-2.5 py-0.5 bg-blue-500/10 text-blue-400 font-bold rounded-full text-xs">
              {brochures.length} Files
            </span>
          </div>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Brochure / Doc</span>
          </button>
        </div>

        {/* Brochures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {brochures.map((doc) => (
            <div
              key={doc.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col justify-between space-y-6 group hover:border-slate-700 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 bg-slate-800 text-slate-300 rounded">
                    {doc.category}
                  </span>
                  <span className="text-xs font-mono text-amber-400 font-medium">
                    {doc.fileType} • {doc.fileSize}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xl text-white font-normal group-hover:text-amber-400 transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-light mt-1.5 leading-relaxed">
                    {doc.description}
                  </p>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-lg text-[11px] font-mono text-slate-300 flex items-center justify-between">
                  <span className="text-slate-500 truncate mr-2">Path: {doc.filePath}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold ${
                      doc.isAvailable
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {doc.isAvailable ? "Active Download" : "Coming Soon"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <a
                    href={doc.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Test Download</span>
                  </a>

                  <button
                    onClick={() => handleToggleAvailable(doc)}
                    className="px-3 py-2 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-medium transition-colors"
                  >
                    {doc.isAvailable ? "Set Coming Soon" : "Set Active"}
                  </button>
                </div>

                <button
                  onClick={() => openEditModal(doc)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
                  title="Edit Brochure"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Brochure Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-6 sm:p-8 space-y-6">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-amber-400 mb-1">
                DOCUMENT CONFIGURATION
              </div>
              <h3 className="font-serif text-2xl text-white">Edit Brochure Details</h3>
            </div>

            <form onSubmit={handleSaveDoc} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Brochure Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Bollywood Aero City Farms Brochure"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Project Brochures">Project Brochures</option>
                    <option value="Masterplans">Masterplans</option>
                    <option value="Company Profile">Company Profile</option>
                    <option value="Other Documents">Other Documents</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    File Size Display
                  </label>
                  <input
                    type="text"
                    value={formData.fileSize}
                    onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                    placeholder="49.7 MB"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  File Path / URL *
                </label>
                <input
                  type="text"
                  required
                  value={formData.filePath}
                  onChange={(e) => setFormData({ ...formData, filePath: e.target.value })}
                  placeholder="/downloads/brochure.pdf"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500 font-mono"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  Files placed inside <code>public/downloads/</code> can be accessed via <code>/downloads/filename.pdf</code>.
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary of brochure contents..."
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
                  <span>{saving ? "Saving..." : "Save Brochure"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
