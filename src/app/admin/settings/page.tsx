"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  Shield,
  Save,
  CheckCircle2,
  Lock,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { SiteSettings } from "@/lib/admin-store";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Password Change State
  const [passData, setPassData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passLoading, setPassLoading] = useState(false);
  const [passMsg, setPassMsg] = useState({ text: "", isError: false });

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
      }
    } catch (err) {
      console.error("Fetch settings error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (data.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3500);
      } else {
        alert(data.error || "Failed to save settings.");
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passData.newPassword !== passData.confirmPassword) {
      setPassMsg({ text: "New passwords do not match.", isError: true });
      return;
    }

    setPassLoading(true);
    setPassMsg({ text: "", isError: false });

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "change_password",
          password: passData.currentPassword,
          newPassword: passData.newPassword,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setPassMsg({ text: "Password updated successfully!", isError: false });
        setPassData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setPassMsg({ text: data.error || "Failed to change password.", isError: true });
      }
    } catch (err) {
      setPassMsg({ text: "Network error.", isError: true });
    } finally {
      setPassLoading(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 font-mono text-xs uppercase tracking-widest">
        Loading System Settings...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Site Content & Contact Settings"
        subtitle="Update corporate phone numbers, Founder & Director details, company address, and security."
      />

      <div className="px-4 sm:px-8 space-y-8">
        {saveSuccess && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Site configuration and contact settings updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSaveSettings} className="space-y-8">
          {/* SECTION 1: CONTACT INFORMATION */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-amber-400 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>OFFICIAL CONTACT & HELPLINE DETAILS</span>
              </div>
              <h2 className="font-serif text-2xl text-white font-normal">
                Corporate Contact Channels
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Primary Contact Phone (Display) *
                </label>
                <input
                  type="text"
                  required
                  value={settings.contact.phone}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, phone: e.target.value },
                    })
                  }
                  placeholder="+91 93159 30234"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  WhatsApp Number (With Country Code) *
                </label>
                <input
                  type="text"
                  required
                  value={settings.contact.whatsapp}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, whatsapp: e.target.value },
                    })
                  }
                  placeholder="+91 87967 71599"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Official Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  value={settings.contact.email}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, email: e.target.value },
                    })
                  }
                  placeholder="luxoticinfrastructure@gmail.com"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Working Hours
                </label>
                <input
                  type="text"
                  value={settings.contact.workingHours}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, workingHours: e.target.value },
                    })
                  }
                  placeholder="Mon - Sat: 9:30 AM - 6:30 PM"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Corporate Office Address
                </label>
                <textarea
                  rows={2}
                  value={settings.contact.address}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, address: e.target.value },
                    })
                  }
                  placeholder="Plot No. B-4, Sector 132, Noida, Uttar Pradesh 201304"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: FOUNDER & LEADERSHIP PROFILE */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-amber-400 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>EXECUTIVE LEADERSHIP PROFILE</span>
              </div>
              <h2 className="font-serif text-2xl text-white font-normal">
                Founder & Director Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Founder & Director Name *
                </label>
                <input
                  type="text"
                  required
                  value={settings.leadership.founderName}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      leadership: {
                        ...settings.leadership,
                        founderName: e.target.value,
                      },
                    })
                  }
                  placeholder="Ajay Kumar"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Official Designation *
                </label>
                <input
                  type="text"
                  required
                  value={settings.leadership.founderTitle}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      leadership: {
                        ...settings.leadership,
                        founderTitle: e.target.value,
                      },
                    })
                  }
                  placeholder="Founder & Director, LUXOTIC Infrastructure Private Limited"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Welcome Statement
                </label>
                <input
                  type="text"
                  value={settings.leadership.welcomeQuote}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      leadership: {
                        ...settings.leadership,
                        welcomeQuote: e.target.value,
                      },
                    })
                  }
                  placeholder="Welcome to LUXOTIC Infrastructure Private Limited."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500 italic"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: BRANDING & VISION */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-amber-400 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>BRAND POSITIONING & VISION</span>
              </div>
              <h2 className="font-serif text-2xl text-white font-normal">
                Company Brand Statements
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Brand Tagline
                </label>
                <input
                  type="text"
                  value={settings.branding.tagline}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      branding: { ...settings.branding, tagline: e.target.value },
                    })
                  }
                  placeholder="Building Landmarks. Creating Legacies."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Vision Statement Quote
                </label>
                <input
                  type="text"
                  value={settings.branding.visionQuote}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      branding: { ...settings.branding, visionQuote: e.target.value },
                    })
                  }
                  placeholder="To be a trusted leader in real estate..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500 italic"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "Saving Changes..." : "Save All Site Settings"}</span>
              </button>
            </div>
          </div>
        </form>

        {/* SECTION 4: ADMIN PASSWORD & SECURITY */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-amber-400 mb-1 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>SECURITY & ACCESS CONTROL</span>
            </div>
            <h2 className="font-serif text-2xl text-white font-normal">
              Change Admin Password
            </h2>
          </div>

          {passMsg.text && (
            <div
              className={`p-3.5 rounded-lg text-xs font-semibold ${
                passMsg.isError
                  ? "bg-rose-500/10 border border-rose-500/30 text-rose-400"
                  : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
              }`}
            >
              {passMsg.text}
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4 max-w-lg text-xs">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Current Password *
              </label>
              <input
                type="password"
                required
                value={passData.currentPassword}
                onChange={(e) =>
                  setPassData({ ...passData, currentPassword: e.target.value })
                }
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  New Password *
                </label>
                <input
                  type="password"
                  required
                  value={passData.newPassword}
                  onChange={(e) =>
                    setPassData({ ...passData, newPassword: e.target.value })
                  }
                  placeholder="Min 6 characters"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  required
                  value={passData.confirmPassword}
                  onChange={(e) =>
                    setPassData({ ...passData, confirmPassword: e.target.value })
                  }
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={passLoading}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{passLoading ? "Updating..." : "Update Password"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
