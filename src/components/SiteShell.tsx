"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageTransition from "@/components/PageTransition";
import VisitorTracker from "@/components/VisitorTracker";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <>
        {children}
      </>
    );
  }

  return (
    <>
      <VisitorTracker />
      <Header />
      <main className="flex-grow">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
