import type { Metadata } from "next";
import Link from "next/link";
import PageHeroBanner from "@/components/PageHeroBanner";
import { SITE_DATA } from "@/data/site";
import { 
  FileText, 
  ShieldCheck, 
  Scale, 
  Building2, 
  CreditCard, 
  AlertTriangle, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | LUXOTIC Infrastructure Pvt. Ltd.",
  description:
    "Review the terms and conditions governing property inquiries, site visits, booking protocols, and advisory services with LUXOTIC Infrastructure Private Limited.",
};

export default function TermsAndConditionsPage() {
  const lastUpdated = "September 2026";

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <PageHeroBanner
        tag="LEGAL & COMPLIANCE"
        title="Terms &"
        highlightText="Conditions"
        subtitle="Please review the terms and policies governing your engagement, digital inquiries, site visits, and property transactions with LUXOTIC Infrastructure Private Limited."
        backgroundImage="/images/banners/banner-about.jpg"
      />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Quick Navigation & Legal Highlights */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-28 space-y-6">
              <div className="p-6 bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-slate-900 pb-4 border-b border-slate-200">
                  <Scale className="w-4 h-4 text-amber-600" />
                  <span>Document Index</span>
                </div>
                <nav className="mt-4 space-y-2 text-xs text-slate-600 font-medium">
                  <a href="#acceptance" className="block hover:text-slate-950 transition-colors py-1">
                    1. Acceptance of Terms
                  </a>
                  <a href="#property-info" className="block hover:text-slate-950 transition-colors py-1">
                    2. Property Representations & Dimensions
                  </a>
                  <a href="#booking-allocation" className="block hover:text-slate-950 transition-colors py-1">
                    3. Booking, EOI & Allocation Terms
                  </a>
                  <a href="#site-visits" className="block hover:text-slate-950 transition-colors py-1">
                    4. Guided Site Visits & Inspection
                  </a>
                  <a href="#payments" className="block hover:text-slate-950 transition-colors py-1">
                    5. Payment Schedules & Real Estate Conveyance
                  </a>
                  <a href="#intellectual-property" className="block hover:text-slate-950 transition-colors py-1">
                    6. Intellectual Property & Digital Assets
                  </a>
                  <a href="#limitation" className="block hover:text-slate-950 transition-colors py-1">
                    7. Limitation of Liability & Force Majeure
                  </a>
                  <a href="#jurisdiction" className="block hover:text-slate-950 transition-colors py-1">
                    8. Governing Law & Jurisdiction
                  </a>
                </nav>
                <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] text-slate-400">
                  Effective & Last Updated: <span className="font-semibold text-slate-600">{lastUpdated}</span>
                </div>
              </div>

              {/* Related Policies */}
              <div className="p-6 bg-slate-900 text-white space-y-4">
                <div className="text-xs uppercase font-semibold tracking-wider text-slate-300">
                  Related Policies
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We maintain transparent and compliant policies for all prospective buyers and investors.
                </p>
                <div className="space-y-2.5 pt-2">
                  <Link
                    href="/privacy"
                    className="flex items-center justify-between text-xs text-white hover:text-amber-400 transition-colors py-1 border-b border-slate-800"
                  >
                    <span>Privacy Policy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/disclaimer"
                    className="flex items-center justify-between text-xs text-white hover:text-amber-400 transition-colors py-1 border-b border-slate-800"
                  >
                    <span>Legal Disclaimer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center justify-between text-xs text-white hover:text-amber-400 transition-colors py-1"
                  >
                    <span>Contact Legal Desk</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Help & Support Desk */}
              <div className="p-6 border border-slate-200 bg-white">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
                  Corporate Advisory Desk
                </h4>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  For formal documentation clarification, deed inspections, or registry procedures, reach out directly.
                </p>
                <div className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{SITE_DATA.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{SITE_DATA.contact.email}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{SITE_DATA.contact.address}</span>
                  </div>
                </div>
              </div>

            </div>
          </aside>

          {/* Right Column: Detailed Clauses */}
          <main className="lg:col-span-8 space-y-12">
            
            <div className="border-b border-slate-200 pb-6">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                Official Regulatory Policy
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-slate-900 mt-2">
                Website & Transaction Terms of Service
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                These Terms and Conditions constitute a legally binding agreement between you (whether individually or representing an entity) and <strong>LUXOTIC Infrastructure Private Limited</strong> (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), concerning your access to and use of this website, downloadable literature, guided field visits, property consultations, and purchase bookings.
              </p>
            </div>

            {/* Section 1 */}
            <section id="acceptance" className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  1
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-slate-900">
                  Acceptance of Terms
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-light pl-10">
                <p>
                  By accessing, browsing, submitting an inquiry, downloading promotional master plans, or requesting a guided site visit through this website, you confirm that you have read, understood, and agreed to be bound by these Terms and Conditions in their entirety.
                </p>
                <p>
                  If you disagree with any portion of these terms, you must discontinue the use of our digital platforms immediately. We reserve the right to amend, update, or modify these terms at any time without prior written notice. Continued use following any revisions constitutes your unconditional acceptance.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="property-info" className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  2
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-slate-900">
                  Property Representations, Sizes & Availability
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-light pl-10">
                <p>
                  All project layouts, plot dimensions (Square Yards, Acres, Square Meters), internal road corridors, green belts, and amenity projections depicted on this website or in downloadable brochures (including Bollywood Aero City Farms, Radha Paradise, and Dhani Enclave) are conceptual representations designed to demonstrate the master planned vision.
                </p>
                <ul className="space-y-2 list-none pt-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Unit availability is dynamic and subject to prior booking, confirmation, and contract execution.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>On-ground physical demarcation and demarcation pillars as per approved revenue records take precedence over artistic renders.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>All buyers are given full opportunity to conduct independent legal due diligence of the title deed prior to executing the registered sale deed.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section id="booking-allocation" className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  3
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-slate-900">
                  Booking, Expression of Interest (EOI) & Allotment
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-light pl-10">
                <p>
                  Submitting an Expression of Interest (EOI) or requesting a site inspection through the digital contact form does not create an automatic entitlement or allotment of any particular plot or farmhouse unit.
                </p>
                <p>
                  Formal plot allotment is confirmed exclusively upon:
                </p>
                <div className="bg-slate-50 border border-slate-200 p-4 space-y-2">
                  <p className="font-medium text-slate-800">
                    A. Receipt of the designated earnest token / booking advance through verified corporate banking channels.
                  </p>
                  <p className="font-medium text-slate-800">
                    B. Submission and physical verification of authentic Know-Your-Customer (KYC) documentation (PAN Card, Aadhaar / Passport, Address Verification).
                  </p>
                  <p className="font-medium text-slate-800">
                    C. Execution of the formal Allotment Agreement / Memorandum of Understanding signed by an authorized signatory of LUXOTIC Infrastructure Pvt. Ltd.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="site-visits" className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  4
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-slate-900">
                  Guided Site Visits & Field Protocols
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-light pl-10">
                <p>
                  LUXOTIC Infrastructure provides dedicated, chauffeur-assisted or guided site visit coordination to our plotted townships and farmhouse estates in the Jewar Airport, Yamuna Expressway, and Noida corridors for qualified prospective investors.
                </p>
                <p>
                  Visitors are expected to follow safety guidelines during on-site ground inspections. LUXOTIC reserves the right to reschedule site visits in the event of inclement weather, active earth-moving development work, or government traffic advisories along highway corridors.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section id="payments" className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  5
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-slate-900">
                  Payment Schedules & Real Estate Conveyance
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-light pl-10">
                <p>
                  All payments must be remitted strictly via official corporate bank transfers (RTGS / NEFT / IMPS / Account Payee Cheques) in the name of <strong>LUXOTIC Infrastructure Private Limited</strong>. No cash transactions or third-party intermediary collections are authorized.
                </p>
                <p>
                  Government levies, including but not limited to stamp duty, registration charges, advocate verification fees, mutation taxes, and applicable Goods & Services Tax (GST), shall be borne by the buyer in accordance with the prevailing statutory laws of Uttar Pradesh / India.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section id="intellectual-property" className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  6
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-slate-900">
                  Intellectual Property & Digital Assets
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-light pl-10">
                <p>
                  All brand identifiers, trademarks, logos, architectural renders, 3D interactive flipbooks, floor plans, and website copywriting are the exclusive intellectual property of LUXOTIC Infrastructure Private Limited.
                </p>
                <p>
                  Reproduction, republication, framing, or commercial redistribution of any materials without express written authorization from LUXOTIC is strictly prohibited and subject to legal prosecution under the Indian Copyright Act, 1957.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section id="limitation" className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  7
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-slate-900">
                  Limitation of Liability & Force Majeure
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-light pl-10">
                <p>
                  While every reasonable effort is made to maintain accurate and up-to-date information on this website, LUXOTIC Infrastructure Pvt. Ltd. makes no warranties, express or implied, regarding continuous availability or total omission-free documentation.
                </p>
                <p>
                  Neither the company nor its directors, officers, or representatives shall be liable for indirect, incidental, or consequential damages resulting from website disruptions, telecommunication failures, or external infrastructure developments. Development timelines may be subject to force majeure events, natural impediments, or statutory administrative processes.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section id="jurisdiction" className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  8
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-slate-900">
                  Governing Law & Dispute Resolution
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-light pl-10">
                <p>
                  These Terms and Conditions, alongside any agreements arising out of real estate consultations with LUXOTIC, shall be governed by, construed, and enforced in accordance with the laws of the Republic of India.
                </p>
                <p>
                  Any dispute, claim, or controversy arising out of or relating to these terms shall be submitted to the exclusive jurisdiction of the competent civil courts situated at <strong>Gautam Buddha Nagar (Noida), Uttar Pradesh, India</strong>.
                </p>
              </div>
            </section>

            {/* Contact Box */}
            <div className="p-8 bg-slate-950 text-white mt-12">
              <h4 className="font-serif text-xl">Questions Concerning Our Terms?</h4>
              <p className="mt-2 text-xs text-slate-400 font-light leading-relaxed">
                Our legal and customer relation officers are available to clarify any contractual details or provide hard copies of statutory compliance documentation.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white text-slate-950 text-xs font-semibold uppercase tracking-wider hover:bg-slate-200 transition-colors inline-flex items-center gap-2"
                >
                  <span>Connect With Legal Office</span>
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
