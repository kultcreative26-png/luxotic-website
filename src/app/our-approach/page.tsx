import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHeroBanner from "@/components/PageHeroBanner";

export const metadata: Metadata = {
  title: "Our Approach | LUXOTIC Infrastructure Pvt. Ltd.",
  description:
    "Explore Luxotic's 6-step real estate methodology: Vision, Design, Planning, Execution, Quality Assurance, and Customer Experience.",
};

const STEPS = [
  {
    number: "01",
    title: "VISION",
    tagline: "High-potential location curation",
    description:
      "Every Luxotic project begins with rigorous strategic analysis of upcoming urban corridors, infrastructure growth vectors, and clear-title legal verification.",
    image: "/images/hero/hero-main.jpg",
  },
  {
    number: "02",
    title: "DESIGN",
    tagline: "Architectural excellence & spatial efficiency",
    description:
      "Partnering with leading architectural minds to design layouts that maximize natural light, ventilation, privacy, and aesthetic elegance.",
    image: "/images/fresh/luxotic-residences.jpg",
  },
  {
    number: "03",
    title: "PLANNING",
    tagline: "Masterplanning for generations",
    description:
      "Integrating underground utility networks, storm-water management systems, wide paved boulevards, and expansive green open spaces.",
    image: "/images/fresh/luxotic-plots-fresh.jpg",
  },
  {
    number: "04",
    title: "EXECUTION",
    tagline: "Uncompromising engineering quality",
    description:
      "Strict quality control protocols during site development, infrastructure installation, and boundary demarcation to ensure durable value.",
    image: "/images/bollywood-aerocity/hero_farmhouse.png",
  },
  {
    number: "05",
    title: "QUALITY",
    tagline: "Continuous audit & compliance",
    description: "Multi-point inspection of all materials, structural integrity, and environmental standards prior to client possession.",
    image: "/images/fresh/luxotic-interior-living.jpg",
  },
  {
    number: "06",
    title: "CUSTOMER EXPERIENCE",
    tagline: "Site visits that build confidence",
    description:
      "From guided site visits and transparent documentation to dedicated post-possession assistance, we build long-term relationships.",
    image: "/images/fresh/luxotic-experience-lounge.jpg",
  },
];

export default function OurApproachPage() {
  return (
    <div className="space-y-0 bg-white min-h-screen">
      {/* Unique Hero Banner */}
      <PageHeroBanner
        tag="METHODOLOGY & EXCELLENCE"
        title="Crafting Legacies."
        highlightText="Step by Step."
        subtitle="Our 6-phase development framework ensures that every plot, farmhouse, and residential space achieves peak legal, structural, and capital standards."
        backgroundImage="/images/banners/banner-approach.jpg"
      />

      {/* Editorial Timeline */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {STEPS.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={step.number}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                  !isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    !isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="text-4xl sm:text-5xl font-serif text-slate-300 font-light">
                    {step.number}
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-slate-900">
                    {step.title}
                  </h2>
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                    "{step.tagline}"
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div
                  className={`lg:col-span-6 ${
                    !isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="relative aspect-[16/10] w-full border border-slate-200 shadow-xl overflow-hidden img-zoom-container">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Action CTA */}
      <section className="py-20 bg-slate-950 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h3 className="font-serif text-3xl text-white">
            Experience the Luxotic Approach
          </h3>
          <p className="text-xs text-slate-400 font-light">
            Schedule a private guided site visit with our senior real-estate advisors today.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-950 text-xs font-semibold uppercase tracking-widest hover:bg-slate-100 transition-colors"
            >
              <span>Schedule Guided Site Visit</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
