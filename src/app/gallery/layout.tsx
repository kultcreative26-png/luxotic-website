import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Photo Gallery & Architectural Showcase",
  description:
    "Explore high-resolution visual tours of LUXOTIC luxury farmhouses, Bollywood Aero City Farms, plotted enclaves, and lifestyle amenities across NCR.",
  keywords: [
    "Luxotic Gallery",
    "Bollywood Aero City Photos",
    "Luxury Farmhouse Images Noida",
    "Real Estate Visual Portfolio NCR",
    "Jewar Airport Farmhouse Pictures",
  ],
  openGraph: {
    title: "Project Gallery | LUXOTIC Infrastructure",
    description:
      "Curated high-resolution photo gallery of luxury farming estates, masterplans, and plotted enclaves.",
    images: ["/images/hero/hero-poster.jpg"],
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
