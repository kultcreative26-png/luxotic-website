"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, Loader2, Sparkles, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@luxotic.com");
  const [password, setPassword] = useState("Luxotic@2026");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("luxotic_admin_session", data.token || "authenticated");
        router.push("/admin");
      } else {
        setError(data.error || "Invalid credentials. Please verify your email & password.");
      }
    } catch (err: any) {
      setError("Network error. Please ensure the development server is running.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail("admin@luxotic.com");
    setPassword("Luxotic@2026");
    setError("");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 sm:p-10 rounded-xl shadow-2xl relative z-10 space-y-8">
        {/* Logo & Heading */}
        <div className="text-center space-y-3">
          <div className="relative w-48 h-12 mx-auto">
            <Image
              src="/logo/logo-white.svg"
              alt="LUXOTIC Infrastructure"
              fill
              className="object-contain object-center"
              priority
            />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-semibold uppercase tracking-widest rounded-full">
            <Sparkles className="w-3 h-3" />
            <span>Executive Control Console</span>
          </div>
          <h2 className="font-serif text-2xl text-white font-normal">
            Admin Authentication
          </h2>
          <p className="text-xs text-slate-400 font-light">
            Sign in to manage projects, brochures, hero media, and real-time client leads.
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-lg animate-in fade-in duration-200">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@luxotic.com"
                className="w-full pl-10 pr-3.5 py-3 bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-3 bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-600 rounded-lg focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-lg shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                <span>Access Control Hub</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Helper */}
        <div className="pt-4 border-t border-slate-800/80 text-center space-y-2">
          <div className="text-[11px] text-slate-400">
            Default Credentials:{" "}
            <code className="text-amber-400 bg-slate-950 px-1.5 py-0.5 rounded font-mono text-[10px]">
              admin@luxotic.com
            </code>{" "}
            /{" "}
            <code className="text-amber-400 bg-slate-950 px-1.5 py-0.5 rounded font-mono text-[10px]">
              Luxotic@2026
            </code>
          </div>
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="text-[10px] text-slate-400 hover:text-amber-400 underline uppercase tracking-wider"
          >
            Auto-fill Credentials
          </button>
        </div>
      </div>
    </div>
  );
}
