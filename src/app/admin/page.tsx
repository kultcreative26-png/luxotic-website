"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Building,
  FileText,
  Video,
  Settings,
  TrendingUp,
  ArrowUpRight,
  MessageSquare,
  Phone,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  Download,
  Activity,
  Calendar,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { LeadItem, VisitorLog } from "@/lib/admin-store";

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [visitors, setVisitors] = useState<VisitorLog[]>([]);
  const [projectsCount, setProjectsCount] = useState(3);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leadsRes, projectsRes] = await Promise.all([
          fetch("/api/admin/leads?includeVisitors=true"),
          fetch("/api/admin/projects"),
        ]);

        const leadsData = await leadsRes.json();
        const projectsData = await projectsRes.json();

        if (leadsData.success) {
          setLeads(leadsData.leads || []);
          setVisitors(leadsData.visitors || []);
        }

        if (projectsData.success) {
          setProjectsCount(projectsData.total || 3);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const newLeads = leads.filter((l) => l.status === "New");
  const brochureDownloads = leads.filter((l) => l.source === "Brochure Download");
  const vipVisits = leads.filter((l) => l.source === "VIP Site Visit" || l.status === "Site Visit Scheduled");

  const handleUpdateStatus = async (id: string, newStatus: LeadItem["status"]) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Executive Control Center"
        subtitle="Real-time performance metrics, customer leads, media configuration & project data."
        newLeadsCount={newLeads.length}
      />

      <div className="px-4 sm:px-8 space-y-8">
        {/* KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Total Leads */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl relative overflow-hidden group hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Total Leads Captured
              </div>
              <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <div className="text-3xl font-serif text-white font-normal">
                {leads.length}
              </div>
              {newLeads.length > 0 && (
                <span className="text-xs text-emerald-400 font-semibold">
                  +{newLeads.length} New
                </span>
              )}
            </div>
            <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Real-time visitor inquiries & brochure downloads</span>
            </div>
          </div>

          {/* Card 2: Brochure Downloads */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl relative overflow-hidden group hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Brochure Downloads
              </div>
              <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                <Download className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <div className="text-3xl font-serif text-white font-normal">
                {brochureDownloads.length}
              </div>
              <span className="text-xs text-slate-400">Verified Leads</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-500">
              Bollywood Aero City & Plotted Enclaves
            </div>
          </div>

          {/* Card 3: Active Projects */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl relative overflow-hidden group hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Portfolio Projects
              </div>
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                <Building className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <div className="text-3xl font-serif text-white font-normal">
                {projectsCount}
              </div>
              <span className="text-xs text-emerald-400">Active Developments</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-500">
              Farmhouses, Plots & Residences
            </div>
          </div>

          {/* Card 4: Site Activity */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl relative overflow-hidden group hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Live Visitor Sessions
              </div>
              <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <div className="text-3xl font-serif text-white font-normal">
                {visitors.length}
              </div>
              <span className="text-xs text-purple-400 font-mono">Sessions Tracked</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-500">
              Logged via automated visitor analytics
            </div>
          </div>
        </div>

        {/* Action Shortcuts & Quick Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/leads"
            className="p-5 bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-800 hover:border-amber-500/50 rounded-xl transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-lg">
                <Users className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                Leads & Inquiries Hub
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">
                View all captured client leads, call or WhatsApp them in 1-click, and export to CSV.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/projects"
            className="p-5 bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-800 hover:border-amber-500/50 rounded-xl transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
                <Building className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                Projects Manager
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Add new projects, update pricing, descriptions, amenities, and photos.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/media"
            className="p-5 bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-800 hover:border-amber-500/50 rounded-xl transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-lg">
                <Video className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                Hero Video & Media
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Change home banner background video loop, fallback poster, and photo gallery.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/settings"
            className="p-5 bg-gradient-to-br from-slate-900 to-slate-900/80 border border-slate-800 hover:border-amber-500/50 rounded-xl transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-lg">
                <Settings className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors">
                Site & Contact Info
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Update phone/WhatsApp numbers, Director Ajay Kumar profile, and brand tagline.
              </p>
            </div>
          </Link>
        </div>

        {/* Recent Inquiries Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-amber-400 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Real-Time Lead Inbox</span>
              </div>
              <h2 className="font-serif text-xl text-white font-normal">
                Recent Inquiries & Brochure Downloads
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/api/admin/leads?format=csv"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </a>

              <Link
                href="/admin/leads"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>View All Leads</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800 font-semibold">
                <tr>
                  <th className="py-3.5 px-6">Client Name</th>
                  <th className="py-3.5 px-4">Contact Info</th>
                  <th className="py-3.5 px-4">Project / Interest</th>
                  <th className="py-3.5 px-4">Source</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Received</th>
                  <th className="py-3.5 px-6 text-right">Instant Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {leads.slice(0, 6).map((lead) => {
                  const cleanPhone = lead.phone ? lead.phone.replace(/[^0-9]/g, "") : "";
                  const waText = encodeURIComponent(
                    `Hello ${lead.name}, thank you for your enquiry regarding ${lead.projectType} with LUXOTIC Infrastructure. How can our executive team assist you today?`
                  );

                  return (
                    <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-6 font-medium text-white">
                        <div className="font-semibold text-sm">{lead.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                          ID: {lead.id}
                        </div>
                      </td>

                      <td className="py-4 px-4 space-y-0.5">
                        <div className="text-slate-200 font-mono font-medium">
                          {lead.phone}
                        </div>
                        {lead.email && (
                          <div className="text-slate-400 text-[11px] truncate max-w-[160px]">
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

                      <td className="py-4 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            handleUpdateStatus(lead.id, e.target.value as LeadItem["status"])
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
                                title="Chat on WhatsApp"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </a>

                              <a
                                href={`tel:${cleanPhone}`}
                                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
                                title="Call Client"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
