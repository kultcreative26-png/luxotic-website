"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ArrowUpRight, MessageSquare } from "lucide-react";
import { SITE_DATA } from "@/data/site";
import EnquireModal from "./EnquireModal";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [enquireOpen, setEnquireOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Projects", href: "/projects" },
    { name: "Our Approach", href: "/our-approach" },
    { name: "Sustainability", href: "/sustainability" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const isHomePage = pathname === "/";
  // On home page top, overlay is dark bg hero, so header text can be white before scroll.
  const isTransparentHero = isHomePage && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3.5"
            : isHomePage
            ? "bg-gradient-to-b from-black/60 via-black/20 to-transparent py-5"
            : "bg-white border-b border-slate-100 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative flex items-center gap-3 group">
            <div className="relative w-36 sm:w-44 h-10 transition-opacity">
              <Image
                src={
                  isTransparentHero
                    ? "/logo/logo-white.svg"
                    : "/logo/logo-dark.svg"
                }
                alt="LUXOTIC Infrastructure"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs uppercase tracking-widest font-semibold transition-colors duration-200 ${
                    isTransparentHero
                      ? isActive
                        ? "text-amber-400 font-bold"
                        : "text-white/90 hover:text-white"
                      : isActive
                      ? "text-slate-900 font-bold border-b-2 border-slate-900 pb-1"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={`tel:${SITE_DATA.contact.phoneRaw}`}
              className={`text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isTransparentHero
                  ? "text-white/90 hover:text-white"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{SITE_DATA.contact.phone}</span>
            </a>

            <button
              onClick={() => setEnquireOpen(true)}
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 transition-all duration-200 rounded-none shadow-sm hover:shadow group"
            >
              <span>Enquire Now</span>
              <ArrowUpRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setEnquireOpen(true)}
              className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white bg-slate-900"
            >
              Enquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 focus:outline-none transition-colors ${
                mobileMenuOpen ? "text-slate-900" : isTransparentHero ? "text-white" : "text-slate-900"
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-900" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col justify-between pt-24 pb-8 px-6 lg:hidden animate-in fade-in duration-200">
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-serif tracking-wider uppercase ${
                  pathname === link.href
                    ? "text-slate-900 font-bold"
                    : "text-slate-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-6 space-y-4">
            <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
              LUXOTIC Infrastructure Pvt. Ltd.
            </div>
            <a
              href={`tel:${SITE_DATA.contact.phoneRaw}`}
              className="flex items-center gap-3 text-slate-800 text-sm font-semibold"
            >
              <Phone className="w-4 h-4 text-slate-900" />
              <span>{SITE_DATA.contact.phone}</span>
            </a>
            <a
              href={SITE_DATA.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 text-white font-medium text-xs tracking-wider uppercase"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      {/* Enquire Modal */}
      <EnquireModal
        isOpen={enquireOpen}
        onClose={() => setEnquireOpen(false)}
      />
    </>
  );
}
