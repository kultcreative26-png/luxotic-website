import type { Metadata } from "next";
import Link from "next/link";
import PageHeroBanner from "@/components/PageHeroBanner";
import { SITE_DATA } from "@/data/site";
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  UserCheck, 
  Database, 
  Bell, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | LUXOTIC Infrastructure Pvt. Ltd.",
  description:
    "Learn how LUXOTIC Infrastructure Private Limited collects, uses, protects, and handles your personal information, lead inquiries, and communication preferences.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 2026";

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <PageHeroBanner
        tag="DATA PROTECTION & PRIVACY"
        title="Privacy"
        highlightText="Policy"
        subtitle="Your privacy and trust are paramount. Learn how LUXOTIC Infrastructure Private Limited safeguards your personal information and respects your communication preferences."
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
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Privacy Framework</span>
                </div>
                <nav className="mt-4 space-y-2 text-xs text-slate-600 font-medium">
                  <a href="#collection" className="block hover:text-slate-950 transition-colors py-1">
                    1. Information We Collect
                  </a>
                  <a href="#purpose" className="block hover:text-slate-950 transition-colors py-1">
                    2. Purpose of Processing
                  </a>
                  <a href="#direct-communication" className="block hover:text-slate-950 transition-colors py-1">
                    3. WhatsApp, Phone & Email Policy
                  </a>
                  <a href="#protection" className="block hover:text-slate-950 transition-colors py-1">
                    4. Data Security & Confidentiality
                  </a>
                  <a href="#sharing" className="block hover:text-slate-950 transition-colors py-1">
                    5. Non-Disclosure & Third-Party Sharing
                  </a>
                  <a href="#cookies" className="block hover:text-slate-950 transition-colors py-1">
                    6. Cookies & Digital Analytics
                  </a>
                  <a href="#user-rights" className="block hover:text-slate-950 transition-colors py-1">
                    7. User Rights & Data Rectification
                  </a>
                  <a href="#grievance" className="block hover:text-slate-950 transition-colors py-1">
                    8. Grievance Officer & Contact
                  </a>
                </nav>
                <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] text-slate-400">
                  Effective Date: <span className="font-semibold text-slate-600">{lastUpdated}</span>
                </div>
              </div>

              {/* Related Policies */}
              <div className="p-6 bg-slate-900 text-white space-y-4">
                <div className="text-xs uppercase font-semibold tracking-wider text-slate-300">
                  Related Policies
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Clear guidelines for real estate investments, site inspections, and legal covenants.
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
                    <span>Contact Grievance Desk</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Security Badge */}
              <div className="p-6 border border-slate-200 bg-white">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
                      Zero Telemarketing Spam
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Your phone & email are never sold or leased to third parties.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </aside>

          {/* Right Column: Detailed Privacy Policy */}
          <main className="lg:col-span-8 space-y-12">
            
            <div className="border-b border-slate-200 pb-6">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                Privacy Protection Commitment
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-slate-900 mt-2">
                LUXOTIC Privacy & Data Protection Statement
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                <strong>LUXOTIC Infrastructure Private Limited</strong> is deeply committed to protecting the privacy, confidentiality, and security of our clients, prospective investors, and website visitors. This policy outlines our standards regarding data collection, processing, and management in accordance with the Information Technology Act, 2000 (India) and the Digital Personal Data Protection Act, 2023.
              </p>
            </div>

            {/* Section 1 */}
            <section id="collection" className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  1
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-slate-900">
                  Information We Collect
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-light pl-10">
                <p>
                  When you interact with our website, inquire about our real estate developments (such as Bollywood Aero City Farms, Radha Paradise, or Dhani Enclave), or request a digital flipbook brochure, we may collect the following details:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 bg-slate-50 border border-slate-200">
                    <span className="font-semibold text-slate-900 block text-xs">Direct Contact Details</span>
                    <span className="text-xs text-slate-500 mt-1 block">Full Name, Telephone / WhatsApp number, Email address, and City of Residence.</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 border border-slate-200">
                    <span className="font-semibold text-slate-900 block text-xs">Property Preferences</span>
                    <span className="text-xs text-slate-500 mt-1 block">Preferred plot size, farmhouse scale, investment horizon, and planned site visit date.</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 border border-slate-200">
                    <span className="font-semibold text-slate-900 block text-xs">Transaction Records</span>
                    <span className="text-xs text-slate-500 mt-1 block">KYC documents, PAN details, bank transfer receipts, and registry allotment documentation (for contracted buyers).</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 border border-slate-200">
                    <span className="font-semibold text-slate-900 block text-xs">Technical Browsing Data</span>
                    <span className="text-xs text-slate-500 mt-1 block">IP address, browser type, device information, and anonymous session telemetry to maintain site speed.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="purpose" className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  2
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-slate-900">
                  Purpose of Information Processing
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-light pl-10">
                <p>
                  We utilize your information solely for legitimate business activities related to property advisory and customer service:
                </p>
                <ul className="space-y-2 list-none">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Providing requested architectural blueprints, layout brochures, and pricing matrices.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Scheduling guided site visit inspections with dedicated relationship managers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Processing Expression of Interest (EOI), allotment letters, and conveyance deed documentation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Ensuring regulatory compliance, tax accounting, and statutory title registry procedures.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section id="direct-communication" className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  3
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-slate-900">
                  WhatsApp, Phone & Email Communication Policy
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-light pl-10">
                <p>
                  By submitting your mobile number on our inquiry forms or contacting our official WhatsApp line, you grant express consent to receive project updates, location pins, and site visit confirmations from <strong>LUXOTIC Infrastructure</strong>.
                </p>
                <p>
                  We do not engage in automated robocalls or untargeted bulk SMS spam. Every prospective buyer is assigned a designated relationship manager. If at any time you wish to pause or discontinue updates, you can notify us simply by replying &ldquo;STOP&rdquo; on WhatsApp or emailing our desk.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section id="protection" className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  4
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-slate-900">
                  Data Security & Storage Protocols
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-light pl-10">
                <p>
                  We employ rigorous administrative, physical, and technological safeguards to defend your personal information against unauthorized access, alteration, destruction, or disclosure.
                </p>
                <p>
                  All digital communication is secured via industry-standard SSL (Secure Sockets Layer) 256-bit encryption. Access to lead and customer records is strictly limited to authorized sales and legal executive staff bound by formal non-disclosure covenants.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section id="sharing" className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  5
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-slate-900">
                  Non-Disclosure & Third-Party Sharing Restrictions
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-light pl-10">
                <p>
                  <strong>We do NOT sell, rent, license, or trade client information to any external marketing agencies, advertising networks, or data brokers.</strong>
                </p>
                <p>
                  Your information is shared only under strict circumstances:
                </p>
                <ul className="space-y-2 list-none">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>With banking institutions and NBFCs exclusively upon your written request for mortgage or loan processing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>With government revenue departments, sub-registrar offices, and certified title advocates for the execution of official sale deeds and stamp registration.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>When mandated by law, judicial subpoena, or legal law enforcement authorities.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section id="cookies" className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  6
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-slate-900">
                  Cookies & Digital Analytics
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-light pl-10">
                <p>
                  Our website uses standard essential cookies to guarantee smooth page navigation, preserve user interactive sessions (such as flipbook brochure loading), and evaluate anonymous site performance metrics.
                </p>
                <p>
                  You can set your web browser to reject cookies or warn you when cookies are being delivered. However, disabling cookies might affect the presentation of interactive brochure previews.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section id="user-rights" className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  7
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-slate-900">
                  User Rights & Data Rectification
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-light pl-10">
                <p>
                  Under Indian data protection guidelines, you maintain the following rights regarding your personal records held by LUXOTIC:
                </p>
                <div className="bg-slate-50 border border-slate-200 p-4 space-y-2">
                  <p><strong>Right to Access:</strong> You may request an overview of the personal information stored in our customer records.</p>
                  <p><strong>Right to Correction:</strong> You may update or correct inaccurate contact or KYC details at any time.</p>
                  <p><strong>Right to Erasure:</strong> Prospective leads who have not executed property contracts can request full erasure of their contact information from our CRM.</p>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section id="grievance" className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  8
                </span>
                <h3 className="font-serif text-lg sm:text-xl text-slate-900">
                  Grievance Redressal & Contact Officer
                </h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-light pl-10">
                <p>
                  In accordance with the Information Technology Act, 2000, any complaints, concerns, or requests regarding data privacy should be addressed to our designated compliance desk:
                </p>
                <div className="p-5 border border-slate-200 bg-slate-50 space-y-2 text-xs text-slate-700">
                  <p><strong>Officer:</strong> Privacy & Compliance Lead</p>
                  <p><strong>Company:</strong> LUXOTIC Infrastructure Private Limited</p>
                  <p><strong>Email:</strong> {SITE_DATA.contact.email}</p>
                  <p><strong>Telephone:</strong> {SITE_DATA.contact.phone}</p>
                  <p><strong>Location:</strong> {SITE_DATA.contact.address}</p>
                </div>
              </div>
            </section>

            {/* Action Card */}
            <div className="p-8 bg-slate-950 text-white mt-12">
              <h4 className="font-serif text-xl">Need Assistance with Your Privacy Preferences?</h4>
              <p className="mt-2 text-xs text-slate-400 font-light leading-relaxed">
                Contact our customer support team directly to manage your notifications or update your contact details.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white text-slate-950 text-xs font-semibold uppercase tracking-wider hover:bg-slate-200 transition-colors inline-flex items-center gap-2"
                >
                  <span>Submit Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`mailto:${SITE_DATA.contact.email}`}
                  className="px-6 py-3 border border-slate-700 text-white text-xs font-semibold uppercase tracking-wider hover:bg-slate-900 transition-colors inline-flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Compliance Desk</span>
                </a>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
