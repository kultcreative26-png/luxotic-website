import Image from "next/image";
import { Sparkles } from "lucide-react";

interface PageHeroBannerProps {
  tag: string;
  title: string;
  highlightText?: string;
  subtitle: string;
  backgroundImage?: string;
  accentColor?: string;
}

export default function PageHeroBanner({
  tag,
  title,
  highlightText,
  subtitle,
  backgroundImage,
}: PageHeroBannerProps) {
  return (
    <section className="relative min-h-[380px] sm:min-h-[440px] w-full flex items-center bg-slate-950 text-white overflow-hidden border-b border-slate-900 pt-24 pb-16">
      {/* Background Image or Geometric Architectural Overlay */}
      {backgroundImage ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt={title}
            fill
            priority
            className="object-cover object-center brightness-[0.4] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-semibold uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{tag}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white leading-tight">
            {title}{" "}
            {highlightText && (
              <span className="italic font-light text-slate-300 block sm:inline">
                {highlightText}
              </span>
            )}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
