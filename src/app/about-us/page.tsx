import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_DATA } from "@/data/site";
import { CheckCircle2, Eye, Target } from "lucide-react";
import PageHeroBanner from "@/components/PageHeroBanner";

export const metadata: Metadata = {
  title: "About Us | LUXOTIC Infrastructure Pvt. Ltd.",
  description:
    "Learn about LUXOTIC Infrastructure Private Limited's vision, mission, director's message, and core values in delivering premium real estate, farmhouses, and plotted developments.",
};

export default function AboutUsPage() {
  return (
    <div className="space-y-0 bg-white">
      {/* Hero Header Banner */}
      <PageHeroBanner
        tag="LUXOTIC INFRASTRUCTURE PVT. LTD."
        title="Creating Spaces."
        highlightText="Shaping Futures."
        subtitle="Dedicated to delivering premium real estate solutions across farmhouses, residential properties, and plotted developments backed by transparency, integrity, and professional service."
        backgroundImage="/images/banners/banner-about.jpg"
      />

      {/* Our Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                COMPANY BACKGROUND
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-slate-900">
                Our Story
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                <p>{SITE_DATA.about.introParagraph1}</p>
                <p>{SITE_DATA.about.introParagraph2}</p>
                <p>{SITE_DATA.about.introParagraph3}</p>
                <p>{SITE_DATA.about.introParagraph4}</p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full border border-slate-200 shadow-xl overflow-hidden img-zoom-container">
                <Image
                  src="/images/fresh/luxotic-experience-lounge.jpg"
                  alt="Luxotic Infrastructure Executive Experience Lounge"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's / Director's Message */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-200 pb-6">
              <div className="text-[11px] font-semibold uppercase tracking-widest text-amber-600 mb-1">
                LEADERSHIP REFLECTION
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-slate-900">
                {SITE_DATA.founderMessage.title}
              </h3>
            </div>

            <div className="text-xs sm:text-sm font-medium text-slate-800">
              {SITE_DATA.founderMessage.greeting}
            </div>

            <div className="text-sm font-serif italic text-slate-900 border-l-2 border-slate-900 pl-4 py-1">
              "{SITE_DATA.founderMessage.welcome}"
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              {SITE_DATA.founderMessage.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-200">
              <div className="font-serif text-base text-slate-900 font-semibold">
                {SITE_DATA.founderMessage.signOffName}
              </div>
              <div className="text-xs text-slate-500 font-light">
                {SITE_DATA.founderMessage.signOffTitle}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="border border-slate-200 p-8 sm:p-10 space-y-6 bg-white luxury-card">
              <div className="w-12 h-12 bg-slate-900 text-white flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-slate-900">
                {SITE_DATA.vision.headline}
              </h3>
              <p className="font-serif text-base italic text-slate-800 border-l-2 border-amber-500 pl-4 py-1">
                "{SITE_DATA.vision.quote}"
              </p>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                {SITE_DATA.vision.fullText}
              </p>
            </div>

            <div className="border border-slate-200 p-8 sm:p-10 space-y-6 bg-white luxury-card">
              <div className="w-12 h-12 bg-slate-900 text-white flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-slate-900">
                {SITE_DATA.mission.headline}
              </h3>
              <div className="space-y-4">
                {SITE_DATA.mission.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                        {pt.title}
                      </h4>
                      <p className="text-xs text-slate-600 font-light leading-relaxed">
                        {pt.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              PHILOSOPHICAL PILLARS
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {SITE_DATA.coreValues.map((val) => (
              <div
                key={val.number}
                className="border border-slate-800 bg-slate-900/60 p-6 space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-amber-400 tracking-widest">
                    {val.number}
                  </div>
                  <h3 className="font-serif text-lg text-white mt-1">
                    {val.title}
                  </h3>
                  <div className="text-[10px] text-slate-400 italic mb-2">
                    "{val.subtitle}"
                  </div>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h3 className="font-serif text-3xl text-slate-900">
            Partner with LUXOTIC Infrastructure
          </h3>
          <p className="text-xs text-slate-600 font-light">
            Discover curated plot selections, farmhouse retreats, and investment advisory tailored to your wealth preservation goals.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-block px-8 py-3.5 bg-slate-900 text-white text-xs font-semibold uppercase tracking-widest hover:bg-slate-800"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
