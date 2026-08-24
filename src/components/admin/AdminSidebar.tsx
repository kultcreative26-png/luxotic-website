"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building,
  FileText,
  Video,
  Settings,
  LogOut,
  ExternalLink,
  Sparkles,
  ChevronRight,
} from "lucide-react";

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  newLeadsCount?: number;
}

export default function AdminSidebar({
  mobileOpen = false,
  onCloseMobile,
  newLeadsCount = 0,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
      localStorage.removeItem("luxotic_admin_session");
      router.push("/admin/login");
    } catch (err) {
      router.push("/admin/login");
    }
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: "Leads & Visitors",
      href: "/admin/leads",
      icon: Users,
      badge: newLeadsCount > 0 ? `${newLeadsCount} New` : null,
    },
    {
      name: "Projects Manager",
      href: "/admin/projects",
      icon: Building,
      badge: null,
    },
    {
      name: "Brochures & Docs",
      href: "/admin/brochures",
      icon: FileText,
      badge: null,
    },
    {
      name: "Hero Video & Media",
      href: "/admin/media",
      icon: Video,
      badge: null,
    },
    {
      name: "Content & Settings",
      href: "/admin/settings",
      icon: Settings,
      badge: null,
    },
  ];

  const content = (
    <div className="flex flex-col h-full bg-slate-950 text-slate-200 border-r border-slate-800/80 w-64 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800/80">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="flex flex-col">
            <div className="relative w-36 h-8">
              <Image
                src="/logo/logo-white.svg"
                alt="LUXOTIC Infrastructure"
                fill
                className="object-contain object-left"
              />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-400 mt-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Control Center</span>
            </span>
          </Link>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-6 space-y-1">
        <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 px-3 pb-2">
          Main Modules
        </div>

        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname?.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 group ${
                isActive
                  ? "bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? "text-slate-950" : "text-slate-400 group-hover:text-amber-400"
                  }`}
                />
                <span>{item.name}</span>
              </div>

              {item.badge ? (
                <span
                  className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    isActive
                      ? "bg-slate-950 text-amber-400"
                      : "bg-emerald-500 text-white animate-pulse"
                  }`}
                >
                  {item.badge}
                </span>
              ) : (
                <ChevronRight
                  className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isActive ? "opacity-100 text-slate-950" : "text-slate-500"
                  }`}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-800/80 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
        >
          <div className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            <span>View Public Website</span>
          </div>
          <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">Live</span>
        </a>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3.5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-rose-400 hover:text-white hover:bg-rose-950/40 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed Left) */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-30">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />
          <div className="relative z-10">{content}</div>
        </div>
      )}
    </>
  );
}
