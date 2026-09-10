"use client";

import { useState } from "react";
import { X, Download, Loader2, CheckCircle2, FileText, User, Phone, Mail, ShieldCheck, BookOpen } from "lucide-react";

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
  brochurePath?: string;
  onOpenFlipbook?: () => void;
}

export default function BrochureModal({
  isOpen,
  onClose,
  projectName = "Bollywood Aero City Farms",
  brochurePath = "/downloads/brochure.pdf",
  onOpenFlipbook,
}: BrochureModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleDownloadTrigger = () => {
    try {
      const link = document.createElement("a");
      link.href = brochurePath;
      link.download = `${projectName.replace(/[^a-zA-Z0-9]/g, "-")}-Brochure.pdf`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Auto download trigger error:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Client-side phone validation
    const cleanPhone = formData.phone.replace(/[^0-9+]/g, "");
    if (cleanPhone.length < 10) {
      setStatus("error");
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      // 1. Submit lead to API
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          projectType: `Brochure Download - ${projectName}`,
          message: `Client requested official project brochure for ${projectName}. File: ${brochurePath}`,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        // 2. Trigger instant download
        handleDownloadTrigger();
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Verification failed. Please check your details.");
      }
    } catch (err) {
      // Even if network glitches, still serve the brochure to the user
      setStatus("success");
      handleDownloadTrigger();
    }
  };

  const handleClose = () => {
    setStatus("idle");
    setErrorMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white border border-slate-200 shadow-2xl overflow-hidden">
        {/* Top Decorative Gold/Dark Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-slate-900 via-amber-500 to-slate-900" />

        {/* Close Icon Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Close Brochure Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-semibold uppercase tracking-widest mb-2">
              <FileText className="w-3 h-3 text-amber-600" />
              <span>Official Documentation</span>
            </div>
            <h3 className="font-serif text-2xl text-slate-900 leading-tight">
              Download Project Brochure
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-light">
              Enter your details below to instantly verify and download the official comprehensive brochure for <strong className="font-semibold text-slate-800">{projectName}</strong>.
            </p>
          </div>

          {status === "success" ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-serif text-xl text-slate-900 font-semibold">
                  Brochure Download Started!
                </h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed mt-1">
                  Thank you, <span className="font-semibold text-slate-800">{formData.name}</span>. The official PDF has been sent to your download folder.
                </p>
              </div>

              <div className="pt-2 space-y-2">
                {onOpenFlipbook && (
                  <button
                    type="button"
                    onClick={() => {
                      handleClose();
                      onOpenFlipbook();
                    }}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Open Interactive Flipbook Now</span>
                  </button>
                )}
                <button
                  onClick={handleDownloadTrigger}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Again</span>
                </button>
                <button
                  onClick={handleClose}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-widest transition-colors shadow-md cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ajay Kumar"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Email ID */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Email ID *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Privacy/Trust Note */}
              <div className="flex items-center gap-2 text-[10px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>100% Privacy Protected. Immediate PDF Access.</span>
              </div>

              {/* Error Alert */}
              {status === "error" && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
                  {errorMessage}
                </div>
              )}

              {/* Action Buttons: Verify & Download + Cancel */}
              <div className="pt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-1/3 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider text-center transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-2/3 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Verify & Download</span>
                    </>
                  )}
                </button>
              </div>

              {onOpenFlipbook && (
                <div className="text-center pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      handleClose();
                      onOpenFlipbook();
                    }}
                    className="text-xs text-amber-600 hover:text-amber-700 font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Prefer to read online? Open Flipbook Reader</span>
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
