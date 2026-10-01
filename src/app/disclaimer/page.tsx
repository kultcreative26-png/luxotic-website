import type { Metadata } from "next";
import Link from "next/link";
import PageHeroBanner from "@/components/PageHeroBanner";
import { SITE_DATA } from "@/data/site";
import { 
  AlertTriangle, 
  Compass, 
  MapPin, 
  Building2, 
  Scale, 
  CheckCircle2, 
  Phone, 
  Mail, 
  ArrowRight, 
  FileCheck2 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer | LUXOTIC Infrastructure Pvt. Ltd.",
  description:
    "Important legal and real estate disclaimer regarding architectural renders, land specifications, investment indicators, and title verification for LUXOTIC Infrastructure projects.",
};

export default function DisclaimerPage() {
  const lastUpdated = "September 2026";

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <PageHeroBanner
        tag="LEGAL DISCLOSURE"
        title="Legal"
        highlightText="Disclaimer"
        subtitle="Important regulatory and legal disclosures regarding architectural representations, dimensional specifications, title verification, and investment expectations."
        backgroundImage="/images/banners/banner-about.jpg"
      />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Index & Quick Links */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-28 space-y-6">
              <div className="p-6 bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-slate-900 pb-4 border-b border-slate-200">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Disclaimer Index</span>
                </div>
                <nav className="mt-4 space-y-2 text-xs text-slate-600 font-medium">
                  <a href="#general" className="block hover:text-slate-950 transition-colors py-1">
                    1. Informational & Promotional Nature
                  </a>
                  <a href="#artistic" className="block hover:text-slate-950 transition-colors py-1">
                    2. Artistic Impressions & 3D Renderings
                  </a>
                  <a href="#dimensions" className="block hover:text-slate-950 transition-colors py-1">
                    3. Plot Dimensions & Master Plans
                  </a>
                  <a href="#due-diligence" className="block hover:text-slate-950 transition-colors py-1">
                    4. Independent Title Due Diligence
                  </a>
                  <a href="#investment" className="block hover:text-slate-950 transition-colors py-1">
                    5. Investment & Capital Appreciation Disclaimers
                  </a>
                  <a href="#digital-assets" className="block hover:text-slate-950 transition-colors py-1">
                    6. Digital Flipbooks & Brochure Materials
                  </a>
                  <a href="#maps" className="block hover:text-slate-950 transition-colors py-1">
                    7. Route Distances & Map Markers
                  </a>
                  <a href="#verification" className="block hover:text-slate-950 transition-colors py-1">
                    8. Official Verification Channels
                  </a>
                </nav>
                <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] text-slate-400">
                  Document Version: <span className="font-semibold text-slate-600">{lastUpdated}</span>
                </div>
              </div>

              {/* Related Policies */}
              <div className="p-6 bg-slate-900 text-white space-y-4">
                <div className="text-xs uppercase font-semibold tracking-wider text-slate-300">
                  Related Documents
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Review complete booking parameters and consumer protection frameworks.
                </p>
                <div className="space-y-2.5 pt-2">
                  <Link
                    href="/terms"
                    className="flex items-center justify-between text-xs text-white hover:text-amber-400 transition-colors py-1 border-b border-slate-800"
                  >
                    <span>Terms & Conditions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/privacy"
                    className="flex items-center justify-between text-xs text-white hover:text-amber-400 transition-colors py-1 border-b border-slate-800"
                  >
                    <span>Privacy Policy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center justify-between text-xs text-white hover:text-amber-400 transition-colors py-1"
                  >
                    <span>Schedule Verification Visit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Title Transparency Card */}
              <div className="p-6 border border-slate-200 bg-white">
                <div className="flex items-start gap-3">
                  <FileCheck2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
                      Clear Title Commitment
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      All land parcels and plotted enclaves undergo multi-tier legal audit and land revenue verification before sales launch.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </aside>

          {/* Right Column: Detailed Disclaimer */}
          <main className="lg:col-span-8 space-y-12">
            
            <div className="border-b border-slate-200 pb-6">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                Notice to Prospective Buyers & Investors
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-slate-900 mt-2">
                Real Estate Disclosures & Information Guidelines
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                This Disclaimer applies to all web pages, digital brochures, interactive 3D flipbook previews, marketing presentations, and verbal consultations provided by <strong>LUXOTIC Infrastructure Private Limited</strong>.
              </p>
            </div>

            {/* Section 1 */}
            <section id="general" className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  1
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-slate-900">
                  Informational & Promotional Purpose
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-light pl-10">
                <p>
                  The contents of this website and related digital collaterals are intended purely for promotional and informational reference. Nothing contained herein shall be interpreted or construed as a binding legal offer, warranty, or contractual guarantee from LUXOTIC Infrastructure Private Limited.
                </p>
                <p>
                  Any binding commitments or contractual obligations exist solely within the provisions of officially executed, registered agreements for sale, allotment documents, and conveyance deeds entered into between the company and the respective purchaser.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="artistic" className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  2
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-slate-900">
                  Artistic Impressions & 3D Renderings
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-light pl-10">
                <p>
                  All 3D architectural renders, walkthrough concepts, isometric masterplan illustrations, landscaping models, villa designs, and interior furnishings depicted on the site (including farmhouse mockups for Bollywood Aero City Farms, Radha Paradise, and Dhani Enclave) are conceptual artist impressions.
                </p>
                <p>
                  Actual on-ground development, landscaping foliage, materials, colour palettes, and exterior fittings are subject to engineering refinement, environmental conditions, and final architectural layout specifications.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section id="dimensions" className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  3
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-slate-900">
                  Plot Dimensions, Road Corridors & Master Plans
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-light pl-10">
                <p>
                  Plot sizes specified in Square Yards (Sq. Yds), Square Meters (Sq. Mtr), or Acres are approximate dimensions derived from master planning layouts.
                </p>
                <ul className="space-y-2 list-none">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Exact boundary coordinates, frontage widths, and internal road alignments are demarcated on-site by certified revenue surveyors.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Final sale deed values and considerations are calculated strictly according to actual physical demarcated plot measurement during registration.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section id="due-diligence" className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  4
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-slate-900">
                  Independent Title Due Diligence
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-light pl-10">
                <p>
                  LUXOTIC Infrastructure maintains the highest standards of legal scrutiny and land due diligence. However, all prospective purchasers and investors are encouraged and invited to conduct their own independent verification of ownership documents, revenue records (Khasra / Khatauni), chain of title, and zoning permissions through their independent legal counsel prior to executing any booking or sale agreement.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section id="investment" className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  5
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-slate-900">
                  Investment & Capital Appreciation Disclaimers
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-light pl-10">
                <p>
                  Any statements regarding property appreciation, regional development multipliers, or infrastructure growth (e.g. proximity to the upcoming Noida International Airport at Jewar, Yamuna Expressway, Film City, or Eastern Peripheral Expressway) reflect published public infrastructure timelines and historical real estate performance.
                </p>
                <p>
                  Past land valuation appreciation does not assure identical future performance. Real estate investments are inherently subject to market conditions, government policy revisions, and broader economic cycles.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section id="digital-assets" className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  6
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-slate-900">
                  Digital Flipbooks & Downloadable Materials
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-light pl-10">
                <p>
                  Our digital flipbooks, downloadable PDF brochures, and specification sheets are published to facilitate remote project exploration. In the event of any discrepancies between promotional marketing collateral and the final stamped and signed Allotment Agreement, the terms of the official Allotment Agreement and registered title deed shall supersede and govern.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section id="maps" className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  7
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-slate-900">
                  Route Distances & Map Markers
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-light pl-10">
                <p>
                  Commute times, highway distances (e.g., &ldquo;20 minutes from Jewar Airport&rdquo;), and location markers are estimated based on standard arterial road routes and nominal traffic circumstances. Ongoing regional highway construction or traffic management may influence transit durations.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section id="verification" className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  8
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-slate-900">
                  Official Verification & Inquiries
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-light pl-10">
                <p>
                  For certified information, original title document reviews, or site visit scheduling, please interact exclusively with authorized LUXOTIC relationship managers or visit our corporate office directly.
                </p>
                <div className="p-4 bg-slate-50 border border-slate-200 mt-3 space-y-1 text-xs text-slate-700">
                  <p><strong>Corporate Entity:</strong> LUXOTIC Infrastructure Private Limited</p>
                  <p><strong>Corporate Address:</strong> {SITE_DATA.contact.address}</p>
                  <p><strong>Contact Line:</strong> {SITE_DATA.contact.phone}</p>
                  <p><strong>Official Email:</strong> {SITE_DATA.contact.email}</p>
                </div>
              </div>
            </section>

            {/* Action Box */}
            <div className="p-8 bg-slate-950 text-white mt-12">
              <h4 className="font-serif text-xl">Schedule an In-Person Document Inspection</h4>
              <p className="mt-2 text-xs text-slate-400 font-light leading-relaxed">
                Visit our corporate office or arrange an on-site visit with our dedicated relationship managers to inspect original property files and boundary stones.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white text-slate-950 text-xs font-semibold uppercase tracking-wider hover:bg-slate-200 transition-colors inline-flex items-center gap-2"
                >
                  <span>Book Site Visit</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`tel:${SITE_DATA.contact.phoneRaw}`}
                  className="px-6 py-3 border border-slate-700 text-white text-xs font-semibold uppercase tracking-wider hover:bg-slate-900 transition-colors inline-flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {SITE_DATA.contact.phone}</span>
                </a>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
