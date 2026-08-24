import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Real Estate Projects & Farmhouses",
  description:
    "Discover premium masterplanned farmhouses, legally verified plotted enclaves, and luxury residential developments near Jewar Airport & Yamuna Expressway.",
  keywords: [
    "Luxotic Projects",
    "Bollywood Aero City Farms",
    "Plots Near Jewar Airport",
    "Yamuna Expressway Farmhouses",
    "Gated Communities Greater Noida",
  ],
  openGraph: {
    title: "Projects Portfolio | LUXOTIC Infrastructure",
    description:
      "Explore landmark developments and luxury plotted estates across NCR growth corridors.",
    images: ["/images/bollywood-aerocity/hero_farmhouse.png"],
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
