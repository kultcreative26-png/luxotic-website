"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track admin panel visits as public leads/visitors
    if (pathname?.startsWith("/admin")) return;

    const trackVisit = async () => {
      try {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const isTablet = /iPad|Tablet/i.test(navigator.userAgent) || (window.innerWidth >= 640 && window.innerWidth <= 1024);
        const device = isMobile ? "Mobile" : isTablet ? "Tablet" : "Desktop";

        let browser = "Unknown";
        if (navigator.userAgent.indexOf("Chrome") !== -1) browser = "Chrome";
        else if (navigator.userAgent.indexOf("Safari") !== -1) browser = "Safari";
        else if (navigator.userAgent.indexOf("Firefox") !== -1) browser = "Firefox";
        else if (navigator.userAgent.indexOf("Edge") !== -1) browser = "Edge";

        await fetch("/api/track-visitor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            page: pathname || "/",
            referrer: document.referrer ? new URL(document.referrer).hostname : "Direct / Organic",
            device,
            browser,
          }),
        });
      } catch (err) {
        // Silently catch tracking errors to never interrupt user experience
      }
    };

    trackVisit();
  }, [pathname]);

  return null;
}
