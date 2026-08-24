"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Search,
  Download,
  Plus,
  Trash2,
  MessageSquare,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  Filter,
  Activity,
  Globe,
  Smartphone,
  Monitor,
  RefreshCw,
  X,
  Sparkles,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { LeadItem, VisitorLog } from "@/lib/admin-store";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [visitors, setVisitors] = useState<VisitorLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"leads" | "visitors">("leads");

  // New Lead Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [newLeadData, setNewLeadData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "Bollywood Aero City Farms",
    message: "",
    source: "Quick Lead",
  });
  const [creating, setCreating] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads?includeVisitors=true");
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads || []);
        setVisitors(data.visitors || []);
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, status: LeadItem["status"]) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status } : l))
        );
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this lead?")) return;
    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLeadData),
      });
      const data = await res.json();
      if (data.success) {
        setLeads([data.lead, ...leads]);
        setModalOpen(false);
        setNewLeadData({
          name: "",
          phone: "",
          email: "",
          projectType: "Bollywood Aero City Farms",
          message: "",
          source: "Quick Lead",
        });
      }
    } catch (err) {
      console.error("Create lead error:", err);
    } finally {
      setCreating(false);
    }
  };

  // Filtered Leads logic
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.projectType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSource =
      selectedSource === "All" || lead.source === selectedSource;

    const matchesStatus =
      selectedStatus === "All" || lead.status === selectedStatus;

    return matchesSearch && matchesSource && matchesStatus;
  });

  const newCount = leads.filter((l) => l.status === "New").length;

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Leads & Visitor Activity Hub"
        subtitle="Track incoming client inquiries, brochure download requests, and real-time visitor sessions."
        newLeadsCount={newCount}
      />

      <div className="px-4 sm:px-8 space-y-6">
        {/* Main Tab Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("leads")}
              className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === "leads"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Captured Client Leads</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full ${
                  activeTab === "leads"
                    ? "bg-slate-950 text-amber-400"
                    : "bg-slate-800 text-slate-300"
                }`}
              >
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("visitors")}
              className={`px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeTab === "visitors"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Visitor Activity Sessions</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full ${
                  activeTab === "visitors"
                    ? "bg-slate-950 text-amber-400"
                    : "bg-slate-800 text-slate-300"
                }`}
              >
                {visitors.length}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchLeads}
              className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800 transition-colors"
              title="Refresh Leads"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>

            <a
              href="/api/admin/leads?format=csv"
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </a>

            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Lead</span>
            </button>
          </div>
        </div>

        {/* TAB 1: CAPTURED LEADS */}
        {activeTab === "leads" && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 bg-slate-900/60 p-4 border border-slate-800 rounded-xl">
              {/* Search */}
              <div className="relative lg:col-span-2">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, phone, email, or project..."
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Source Filter */}
              <div>
                <select
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="All">All Sources ({leads.length})</option>
                  <option value="Brochure Download">Brochure Downloads</option>
                  <option value="Enquiry Modal">Enquiry Modal</option>
                  <option value="Contact Page">Contact Page</option>
                  <option value="VIP Site Visit">VIP Site Visits</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New ({newCount})</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                  <option value="In Discussion">In Discussion</option>
                  <option value="Converted">Converted</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800 font-semibold">
                    <tr>
                      <th className="py-4 px-6">Client Info</th>
                      <th className="py-4 px-4">Phone & Email</th>
                      <th className="py-4 px-4">Project Requested</th>
                      <th className="py-4 px-4">Source</th>
                      <th className="py-4 px-4">Requirement / Note</th>
                      <th className="py-4 px-4">Status</th>
                      <th className="py-4 px-4">Date</th>
                      <th className="py-4 px-6 text-right">Quick Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredLeads.map((lead) => {
                      const cleanPhone = lead.phone ? lead.phone.replace(/[^0-9]/g, "") : "";
                      const waText = encodeURIComponent(
                        `Hello ${lead.name}, thank you for your interest in ${lead.projectType} with LUXOTIC Infrastructure. Our advisory team is here to assist you with brochures, site visits, and pricing.`
                      );

                      return (
                        <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-4 px-6">
                            <div className="font-semibold text-white text-sm">
                              {lead.name}
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                              {lead.id}
                            </div>
                          </td>

                          <td className="py-4 px-4 space-y-1">
                            <div className="font-mono text-slate-200 font-medium">
                              {lead.phone}
                            </div>
                            {lead.email && (
                              <div className="text-slate-400 text-[11px] truncate max-w-[170px]">
                                {lead.email}
                              </div>
                            )}
                          </td>

                          <td className="py-4 px-4">
                            <span className="px-2.5 py-1 bg-slate-800 text-slate-200 rounded text-[11px] font-medium inline-block">
                              {lead.projectType}
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <span
                              className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded ${
                                lead.source === "Brochure Download"
                                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                  : lead.source === "VIP Site Visit"
                                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                  : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                              }`}
                            >
                              {lead.source}
                            </span>
                          </td>

                          <td className="py-4 px-4 max-w-xs">
                            <p className="text-[11px] text-slate-400 line-clamp-2">
                              {lead.message || "No custom message"}
                            </p>
                          </td>

                          <td className="py-4 px-4">
                            <select
                              value={lead.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  lead.id,
                                  e.target.value as LeadItem["status"]
                                )
                              }
                              className={`px-2 py-1 rounded text-[11px] font-semibold uppercase tracking-wider bg-slate-950 border focus:outline-none cursor-pointer ${
                                lead.status === "New"
                                  ? "text-emerald-400 border-emerald-500/40"
                                  : lead.status === "Contacted"
                                  ? "text-blue-400 border-blue-500/40"
                                  : lead.status === "Site Visit Scheduled"
                                  ? "text-amber-400 border-amber-500/40"
                                  : "text-slate-400 border-slate-700"
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                              <option value="In Discussion">In Discussion</option>
                              <option value="Converted">Converted</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>

                          <td className="py-4 px-4 text-slate-400 text-[11px] whitespace-nowrap">
                            {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>

                          <td className="py-4 px-6 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-2">
                              {cleanPhone && (
                                <>
                                  <a
                                    href={`https://wa.me/${cleanPhone}?text=${waText}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-emerald-600/90 hover:bg-emerald-600 text-white rounded-lg transition-colors"
                                    title="WhatsApp Lead"
                                  >
                                    <MessageSquare className="w-3.5 h-3.5" />
                                  </a>

                                  <a
                                    href={`tel:${cleanPhone}`}
                                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
                                    title="Call Lead"
                                  >
                                    <Phone className="w-3.5 h-3.5" />
                                  </a>
                                </>
                              )}

                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-colors"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filteredLeads.length === 0 && (
                <div className="p-12 text-center text-slate-500 space-y-2">
                  <p className="text-sm">No leads match your search criteria.</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedSource("All");
                      setSelectedStatus("All");
                    }}
                    className="text-xs text-amber-400 hover:underline uppercase tracking-wider"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: VISITOR ACTIVITY LOGS */}
        {activeTab === "visitors" && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-slate-800">
                <h3 className="font-serif text-lg text-white font-normal">
                  Live Visitor Sessions & Page Hits
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Automatically logged in real-time when clients browse your website.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800 font-semibold">
                    <tr>
                      <th className="py-3.5 px-6">Page Visited</th>
                      <th className="py-3.5 px-4">Traffic Source / Referrer</th>
                      <th className="py-3.5 px-4">Device</th>
                      <th className="py-3.5 px-4">Browser</th>
                      <th className="py-3.5 px-6 text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {visitors.map((v) => (
                      <tr key={v.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3.5 px-6 font-mono text-amber-400">
                          {v.page}
                        </td>
                        <td className="py-3.5 px-4 text-slate-300">
                          <span className="flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-slate-500" />
                            <span>{v.referrer}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="flex items-center gap-1.5">
                            {v.device === "Mobile" ? (
                              <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                            ) : (
                              <Monitor className="w-3.5 h-3.5 text-purple-400" />
                            )}
                            <span>{v.device}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 font-mono">
                          {v.browser || "Chrome"}
                        </td>
                        <td className="py-3.5 px-6 text-right text-slate-400 text-[11px] whitespace-nowrap">
                          {new Date(v.timestamp).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Manual Create Lead Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-6 sm:p-8 space-y-6">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-amber-400 mb-1">
                MANUAL ENTRY
              </div>
              <h3 className="font-serif text-xl text-white">Add New Client Lead</h3>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newLeadData.name}
                  onChange={(e) => setNewLeadData({ ...newLeadData, name: e.target.value })}
                  placeholder="e.g. Ramesh Chandra"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-xs text-white rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newLeadData.phone}
                    onChange={(e) => setNewLeadData({ ...newLeadData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-xs text-white rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newLeadData.email}
                    onChange={(e) => setNewLeadData({ ...newLeadData, email: e.target.value })}
                    placeholder="client@mail.com"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-xs text-white rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Project / Interest
                </label>
                <select
                  value={newLeadData.projectType}
                  onChange={(e) => setNewLeadData({ ...newLeadData, projectType: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-xs text-white rounded-lg focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="Bollywood Aero City Farms">Bollywood Aero City Farms</option>
                  <option value="Plotted Developments">Plotted Developments</option>
                  <option value="Luxury Residences">Luxury Residences</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Requirement Note
                </label>
                <textarea
                  rows={3}
                  value={newLeadData.message}
                  onChange={(e) => setNewLeadData({ ...newLeadData, message: e.target.value })}
                  placeholder="Plot size requirements, budget, site visit dates..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-xs text-white rounded-lg focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold uppercase tracking-wider rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-colors"
                >
                  {creating ? "Saving..." : "Save Lead"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
