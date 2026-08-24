"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [newLeadsCount, setNewLeadsCount] = useState(0);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    // Check authentication token in localStorage or cookie
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("luxotic_admin_session");
      const hasCookie = document.cookie.includes("luxotic_admin_session");

      if (!token && !hasCookie && !isLoginPage) {
        setAuthenticated(false);
        router.push("/admin/login");
      } else {
        setAuthenticated(true);
      }
    }
  }, [pathname, isLoginPage, router]);

  // Fetch count of new leads periodically for the notification badge
  useEffect(() => {
    if (isLoginPage) return;

    const fetchLeadCount = async () => {
      try {
        const res = await fetch("/api/admin/leads");
        const data = await res.json();
        if (data.success && typeof data.newLeadsCount === "number") {
          setNewLeadsCount(data.newLeadsCount);
        }
      } catch (err) {
        // Silently catch
      }
    };

    fetchLeadCount();
    const interval = setInterval(fetchLeadCount, 15000);
    return () => clearInterval(interval);
  }, [isLoginPage]);

  // For login page, render full screen without sidebar
  if (isLoginPage) {
    return <div className="min-h-screen bg-slate-950">{children}</div>;
  }

  // Prevent flash of unauthenticated content
  if (authenticated === false) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="text-xs uppercase tracking-widest text-slate-400 font-mono animate-pulse">
          Authenticating Admin Portal...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased font-sans">
      {/* Sidebar Navigation */}
      <AdminSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        newLeadsCount={newLeadsCount}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
        <main className="flex-1 pb-16">{children}</main>
      </div>
    </div>
  );
}
