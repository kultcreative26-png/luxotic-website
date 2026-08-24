"use client";

import { Menu, ExternalLink, ShieldCheck, Phone, Bell } from "lucide-react";
import Link from "next/link";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onOpenMobileMenu?: () => void;
  newLeadsCount?: number;
}

export default function AdminHeader({
  title,
  subtitle,
  onOpenMobileMenu,
  newLeadsCount = 0,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-4 text-white flex items-center justify-between">
      {/* Left: Mobile Toggle & Title */}
      <div className="flex items-center gap-4">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            aria-label="Open Admin Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div>
          <h1 className="font-serif text-xl sm:text-2xl font-normal text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-slate-400 font-light mt-0.5 hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right: Quick Shortcuts & Admin Profile */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* New Leads Notification Pill */}
        {newLeadsCount > 0 && (
          <Link
            href="/admin/leads"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider hover:bg-emerald-500/20 transition-colors"
          >
            <Bell className="w-3.5 h-3.5 animate-bounce" />
            <span>{newLeadsCount} New Leads</span>
          </Link>
        )}

        {/* Public Site Link */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        {/* Admin Badge */}
        <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-serif text-xs font-bold">
            LX
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold text-white leading-tight">
              Administrator
            </div>
            <div className="text-[10px] text-emerald-400 font-mono">
              Online • Super Admin
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
