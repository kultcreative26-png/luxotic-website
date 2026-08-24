import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Trees, Sun, CloudRain, ShieldCheck, Zap, Heart } from "lucide-react";
import PageHeroBanner from "@/components/PageHeroBanner";

export const metadata: Metadata = {
  title: "Sustainability | LUXOTIC Infrastructure Pvt. Ltd.",
  description:
    "Discover Luxotic Infrastructure's commitment to eco-conscious development, green landscapes, energy planning, and sustainable infrastructure.",
};

export default function SustainabilityPage() {
  const pillars = [
    {
      icon: <Trees className="w-6 h-6 text-emerald-600" />,
      title: "Green Surroundings & Native Landscapes",
      description:
        "Every farmhouse and plotted development integrates native tree plantations, open green parks, and low-water landscape flora.",
    },
    {
      icon: <CloudRain className="w-6 h-6 text-blue-600" />,
      title: "Rainwater Harvesting & Drainage",
      description:
        "Engineered storm-water channels and groundwater recharge pits built directly into our masterplanned road networks.",
    },
    {
      icon: <Sun className="w-6 h-6 text-amber-500" />,
      title: "Solar-Assisted Infrastructure",
      description:
        "Incorporating solar avenue streetlights and energy-efficient lighting grids across internal boulevards.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-slate-800" />,
      title: "Responsible Land Planning",
      description:
        "Demarcating generous open space ratios, respecting local ecosystems, and preventing over-density.",
    },
    {
      icon: <Zap className="w-6 h-6 text-slate-800" />,
      title: "Future-Ready Utilities Grid",
      description:
        "Underground cabling infrastructure designed to support EV charging points, clean power grids, and smart home connectivity.",
    },
    {
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      title: "Community & Ecological Wellbeing",
      description:
        "Creating serene environment retreats where families enjoy clean air, quiet surroundings, and sustainable long-term living.",
    },
  ];

  return (
    <div className="space-y-0 bg-white min-h-screen">
      {/* Unique Hero Banner */}
      <PageHeroBanner
        tag="SUSTAINABLE DEVELOPMENT"
        title="Building Responsibly."
        highlightText="Creating Lasting Value."
        subtitle="At LUXOTIC Infrastructure, responsible planning and ecological sensitivity are integral to how we build farmhouses, plots, and residential environments."
        backgroundImage="/images/banners/banner-sustainability.jpg"
      />

      {/* Main Feature Layout */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            <div className="lg:col-span-6 space-y-6">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-emerald-700">
                ECO-CONSCIOUS PHILOSOPHY
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-slate-900">
                Harmony Between Luxury & Nature
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                We believe true luxury lies in breathing fresh air, surrounded by lush green foliage, within thoughtfully planned enclaves. Our approach ensures that every development minimizes environmental impact while maximizing long-term appreciation for property owners.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[16/10] w-full border border-slate-200 shadow-xl overflow-hidden img-zoom-container">
                <Image
                  src="/images/sustainability/sustainable-green-building.jpg"
                  alt="Luxotic Sustainable Green Architecture"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="p-8 border border-slate-200 bg-white luxury-card space-y-4"
              >
                <div>{p.icon}</div>
                <h3 className="font-serif text-xl text-slate-900">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 bg-slate-50 border-t border-slate-200 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h3 className="font-serif text-3xl text-slate-900">
            Invest in Sustainable Real Estate
          </h3>
          <p className="text-xs text-slate-600 font-light">
            Connect with our advisory team to discover green farmhouse enclaves and eco-friendly plotted developments.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-block px-8 py-3.5 bg-slate-900 text-white text-xs font-semibold uppercase tracking-widest hover:bg-slate-800"
            >
              Enquire Sustainable Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
