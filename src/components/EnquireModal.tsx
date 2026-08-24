"use client";

import { useState } from "react";
import { X, CheckCircle2, Loader2, Send } from "lucide-react";
import { SITE_DATA } from "@/data/site";

interface EnquireModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProject?: string;
}

export default function EnquireModal({
  isOpen,
  onClose,
  defaultProject = "General Inquiry",
}: EnquireModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: defaultProject,
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to submit enquiry. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error occurred. Please try calling +91 93159 30234 or WhatsApp +91 87967 71599.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-900 transition-colors"
          aria-label="Close Enquiry Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase mb-1">
            LUXOTIC INFRASTRUCTURE
          </div>
          <h3 className="font-serif text-2xl text-slate-900">
            Exclusive Enquiry
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Connect with our property advisors for curated investment details.
          </p>
        </div>

        {status === "success" ? (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="font-serif text-xl text-slate-900">
              Enquiry Received
            </h4>
            <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
              Thank you for reaching out to Luxotic Infrastructure. Our executive advisory team will contact you shortly at {formData.phone || "your provided phone"}.
            </p>
            <button
              onClick={() => {
                setStatus("idle");
                onClose();
              }}
              className="mt-4 px-6 py-2.5 bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-slate-800"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Rajesh Kumar"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Property Interest
              </label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
              >
                <option value="Bollywood Aero City Farms">Bollywood Aero City Farms (Luxury Farmhouses)</option>
                <option value="Plotted Developments">Plotted Developments</option>
                <option value="Luxury Residences">Luxury Residences</option>
                <option value="Real Estate Advisory">Real Estate Investment Advisory</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Your Requirement / Note
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Specify preferred plot size, location criteria, or timeline..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors resize-none"
              />
            </div>

            {status === "error" && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Send Request</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
