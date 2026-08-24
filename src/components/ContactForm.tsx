"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2, Phone } from "lucide-react";
import { SITE_DATA } from "@/data/site";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Bollywood Aero City Farms",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

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
        setErrorMessage(data.error || "Form submission failed. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network issue. Please reach us directly at +91 93159 30234 or WhatsApp +91 87967 71599.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-slate-50 border border-slate-200 p-8 text-center space-y-4">
        <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
        <h3 className="font-serif text-2xl text-slate-900">
          Thank You for Connecting
        </h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
          Your enquiry has been securely transmitted to Luxotic Infrastructure Private Limited. Our senior property advisor will reach out to you shortly.
        </p>
        <button
          onClick={() => {
            setFormData({
              name: "",
              email: "",
              phone: "",
              projectType: "Bollywood Aero City Farms",
              message: "",
            });
            setStatus("idle");
          }}
          className="mt-4 px-6 py-2.5 bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-slate-800"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
          Full Name *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Vikramaditya Sharma"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Phone Number *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 93159 30234"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="investor@example.com"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
          Category / Project Interest
        </label>
        <select
          value={formData.projectType}
          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors"
        >
          <option value="Bollywood Aero City Farms">Bollywood Aero City Farms (Luxury Farmhouses)</option>
          <option value="Plotted Developments">Plotted Developments</option>
          <option value="Luxury Residences">Residential Properties</option>
          <option value="Real Estate Investment Advisory">Real Estate Investment Advisory</option>
          <option value="Property Consultation">Property Consultation & Site Visits</option>
          <option value="General Corporate Enquiry">General Corporate Enquiry</option>
        </select>
      </div>

      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
          Your Detailed Inquiry / Requirement
        </label>
        <textarea
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Describe your location preference, budget parameters, plot size, or scheduling a site visit..."
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 focus:bg-white transition-colors resize-none"
        />
      </div>

      {status === "error" && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Transmitting Request...</span>
          </>
        ) : (
          <>
            <span>Submit Official Enquiry</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
