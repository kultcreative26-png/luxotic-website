import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowUpRight, MessageSquare } from "lucide-react";
import { SITE_DATA } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative w-48 h-12">
              <Image
                src="/logo/logo-white.svg"
                alt="LUXOTIC Infrastructure"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              LUXOTIC Infrastructure Private Limited is a trusted real estate company dedicated to delivering premium farmhouses, residential properties, and plotted developments backed by transparency, integrity, and professional service.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={SITE_DATA.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Official</span>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-widest text-slate-300 uppercase">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link href="/our-approach" className="hover:text-white transition-colors">
                  Our Approach
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="hover:text-white transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Offerings */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-widest text-slate-300 uppercase">
              Our Portfolios
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/projects/bollywood-aero-city-farms" className="hover:text-white transition-colors">
                  Bollywood Aero City Farms
                </Link>
              </li>
              <li>
                <Link href="/projects/radha-paradise" className="hover:text-white transition-colors">
                  Radha Paradise Luxury Villas
                </Link>
              </li>
              <li>
                <Link href="/projects/dhani-enclave" className="hover:text-white transition-colors">
                  Dhani Enclave Plotted Township
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  All Featured Projects
                </Link>
              </li>
              <li>
                <Link href="/our-approach" className="hover:text-white transition-colors">
                  Investment Advisory
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Site Visit Coordination
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-widest text-slate-300 uppercase">
              Corporate Office
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{SITE_DATA.contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <a href={`tel:${SITE_DATA.contact.phoneRaw}`} className="hover:text-white">
                  {SITE_DATA.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <a href={`mailto:${SITE_DATA.contact.email}`} className="hover:text-white truncate">
                  {SITE_DATA.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} LUXOTIC Infrastructure Private Limited. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/contact" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-slate-400 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/contact" className="hover:text-slate-400 transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
