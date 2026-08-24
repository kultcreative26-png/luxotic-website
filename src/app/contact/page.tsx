import type { Metadata } from "next";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, MessageSquare, Sparkles } from "lucide-react";
import { SITE_DATA } from "@/data/site";
import ContactForm from "@/components/ContactForm";
import PageHeroBanner from "@/components/PageHeroBanner";

export const metadata: Metadata = {
  title: "Contact Us | LUXOTIC Infrastructure Pvt. Ltd.",
  description:
    "Get in touch with Luxotic Infrastructure Private Limited for luxury farmhouses, residential plots, and investment advisory in Noida and NCR.",
};

export default function ContactPage() {
  return (
    <div className="space-y-0 bg-white min-h-screen">
      {/* High-Impact Architectural Hero Banner */}
      <PageHeroBanner
        tag="DIRECT INQUIRIES & ADVISORY"
        title="Let's Create Something"
        highlightText="Exceptional."
        subtitle="Connect with our dedicated real-estate team for property consultations, guided site visits, plot availability, and investment advisory."
        backgroundImage="/images/fresh/luxotic-experience-lounge.jpg"
      />

      {/* Main Form & Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Editorial Contact Form */}
            <div className="lg:col-span-7 bg-white border border-slate-200 p-8 sm:p-10 shadow-lg space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-800 text-[10px] font-semibold uppercase tracking-widest mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>LUXOTIC INFRASTRUCTURE</span>
                </div>
                <h2 className="font-serif text-3xl text-slate-900">
                  Send Your Enquiry
                </h2>
                <p className="text-xs text-slate-500 font-light mt-1">
                  Select your inquiry type below to receive customized project specifications and schedule site visits.
                </p>
              </div>

              <ContactForm />
            </div>

            {/* Right Column: Office Details & Feature Visual */}
            <div className="lg:col-span-5 space-y-8">
              {/* Feature Image Card */}
              <div className="relative aspect-[16/10] w-full border border-slate-200 shadow-lg overflow-hidden img-zoom-container">
                <Image
                  src="/images/fresh/luxotic-residences.jpg"
                  alt="Luxotic Executive Corporate Office"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold">
                    Corporate Headquarters
                  </div>
                  <div className="font-serif text-sm font-light">
                    Noida, Uttar Pradesh, India
                  </div>
                </div>
              </div>

              {/* Office Details Box */}
              <div className="bg-slate-950 text-white p-8 border border-slate-900 space-y-6 shadow-xl">
                <div className="space-y-2 border-b border-slate-800 pb-4">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-amber-400">
                    DIRECT CONTACT
                  </div>
                  <h3 className="font-serif text-xl text-white">
                    {SITE_DATA.companyName}
                  </h3>
                </div>

                <div className="space-y-5 text-xs text-slate-300">
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                        Office Location
                      </div>
                      <div className="text-white mt-0.5">
                        {SITE_DATA.contact.address}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                        Telephone Advisory
                      </div>
                      <a
                        href={`tel:${SITE_DATA.contact.phoneRaw}`}
                        className="text-white hover:text-amber-400 transition-colors mt-0.5 block font-medium"
                      >
                        {SITE_DATA.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                        Official Email
                      </div>
                      <a
                        href={`mailto:${SITE_DATA.contact.email}`}
                        className="text-white hover:text-amber-400 transition-colors mt-0.5 block break-all font-medium"
                      >
                        {SITE_DATA.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                        Operational Hours
                      </div>
                      <div className="text-white mt-0.5">
                        {SITE_DATA.contact.workingHours}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <a
                    href={SITE_DATA.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Instant WhatsApp Connect</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
