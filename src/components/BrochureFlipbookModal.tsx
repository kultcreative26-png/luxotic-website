"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  Minimize2,
  BookOpen,
  LayoutGrid,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from "lucide-react";

interface BrochureFlipbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  brochurePath: string;
  pages: string[];
  onDownloadClick?: () => void;
}

export default function BrochureFlipbookModal({
  isOpen,
  onClose,
  projectName,
  brochurePath,
  pages,
  onDownloadClick,
}: BrochureFlipbookModalProps) {
  // Current page index (0-based)
  // In dual-page mode: currentIndex represents the left page (0 is cover alone on right or dual spread)
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");
  const modalContainerRef = useRef<HTMLDivElement>(null);

  // Check window width for responsive single vs dual page mode
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight" || e.key === " ") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [isOpen, currentPage, pages.length, isMobile]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setCurrentPage(0);
      setZoomLevel(1);
      setShowThumbnails(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !pages || pages.length === 0) return null;

  const totalPages = pages.length;

  const handleNext = () => {
    if (isMobile) {
      if (currentPage < totalPages - 1) {
        setFlipDirection("next");
        setCurrentPage((prev) => prev + 1);
      }
    } else {
      // Desktop: 0 is cover, then 1-2, 3-4, etc.
      if (currentPage === 0) {
        setFlipDirection("next");
        setCurrentPage(1);
      } else if (currentPage + 2 < totalPages) {
        setFlipDirection("next");
        setCurrentPage((prev) => prev + 2);
      } else if (currentPage + 1 < totalPages) {
        setFlipDirection("next");
        setCurrentPage((prev) => prev + 1);
      }
    }
  };

  const handlePrev = () => {
    if (isMobile) {
      if (currentPage > 0) {
        setFlipDirection("prev");
        setCurrentPage((prev) => prev - 1);
      }
    } else {
      if (currentPage <= 1) {
        setFlipDirection("prev");
        setCurrentPage(0);
      } else {
        setFlipDirection("prev");
        setCurrentPage((prev) => Math.max(1, prev - 2));
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalContainerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const canPrev = currentPage > 0;
  const canNext = isMobile ? currentPage < totalPages - 1 : currentPage < totalPages - 1;

  // Compute displayed pages for desktop dual mode
  // currentPage === 0 -> single cover page centered or on right
  const isCover = !isMobile && currentPage === 0;
  const leftPageIdx = isMobile ? currentPage : isCover ? -1 : currentPage;
  const rightPageIdx = isMobile ? -1 : isCover ? 0 : currentPage + 1 < totalPages ? currentPage + 1 : -1;

  return (
    <div
      ref={modalContainerRef}
      className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-md select-none animate-in fade-in duration-200"
    >
      {/* Top Controls Header Bar */}
      <header className="h-16 border-b border-slate-800/80 bg-slate-900/90 px-4 sm:px-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-sm sm:text-base text-white tracking-wide flex items-center gap-2">
              <span>{projectName}</span>
              <span className="text-[10px] uppercase font-sans tracking-widest px-2 py-0.5 bg-slate-800 text-amber-400 border border-slate-700">
                Live Flipbook
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 font-light hidden sm:block">
              Interactive page-by-page official brochure preview
            </p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Zoom In/Out */}
          <div className="hidden sm:flex items-center border border-slate-700 divide-x divide-slate-700 bg-slate-800/60">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.15))}
              className="p-2 text-slate-400 hover:text-white transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="px-2.5 py-1 text-[11px] font-mono text-slate-300 hover:text-white transition-colors"
              title="Reset Zoom"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.6, z + 0.15))}
              className="p-2 text-slate-400 hover:text-white transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnails Toggle */}
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={`p-2 border transition-colors ${
              showThumbnails
                ? "bg-amber-500 text-slate-950 border-amber-500"
                : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700"
            }`}
            title="Toggle Page Thumbnails"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Download CTA Button */}
          {onDownloadClick ? (
            <button
              onClick={onDownloadClick}
              className="px-3 sm:px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>
          ) : (
            <a
              href={brochurePath}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>
          )}

          {/* Close Modal Button */}
          <button
            onClick={onClose}
            className="p-2 bg-slate-800/80 hover:bg-red-600/90 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            title="Close Preview (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Book Stage Area */}
      <main className="relative flex-1 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Previous Page Floating Button */}
        <button
          onClick={handlePrev}
          disabled={!canPrev}
          className={`absolute left-3 sm:left-6 z-30 p-3 sm:p-4 rounded-full border border-slate-700/80 bg-slate-900/80 text-white backdrop-blur-md shadow-2xl transition-all ${
            canPrev
              ? "hover:bg-amber-500 hover:text-slate-950 hover:scale-110 cursor-pointer"
              : "opacity-20 cursor-not-allowed"
          }`}
          title="Previous Page (Left Arrow)"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Next Page Floating Button */}
        <button
          onClick={handleNext}
          disabled={!canNext}
          className={`absolute right-3 sm:right-6 z-30 p-3 sm:p-4 rounded-full border border-slate-700/80 bg-slate-900/80 text-white backdrop-blur-md shadow-2xl transition-all ${
            canNext
              ? "hover:bg-amber-500 hover:text-slate-950 hover:scale-110 cursor-pointer"
              : "opacity-20 cursor-not-allowed"
          }`}
          title="Next Page (Right Arrow)"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* 3D Realistic Book Container */}
        <div
          className="relative transition-transform duration-300 flex items-center justify-center"
          style={{
            transform: `scale(${zoomLevel})`,
            perspective: "1600px",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {/* MOBILE SINGLE PAGE VIEW */}
            {isMobile ? (
              <motion.div
                key={`mobile-page-${currentPage}`}
                initial={{
                  opacity: 0,
                  rotateY: flipDirection === "next" ? 45 : -45,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  rotateY: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotateY: flipDirection === "next" ? -45 : 45,
                  scale: 0.96,
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative max-h-[70vh] aspect-[1/1.414] shadow-2xl bg-white border border-slate-700 rounded-sm overflow-hidden"
              >
                <Image
                  src={pages[currentPage]}
                  alt={`${projectName} brochure page ${currentPage + 1}`}
                  fill
                  priority
                  className="object-contain"
                  sizes="90vw"
                />
                {/* Subtle paper gradient overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/10 via-transparent to-black/10" />
              </motion.div>
            ) : isCover ? (
              /* DESKTOP FRONT COVER (Single page centered like a closed book) */
              <motion.div
                key="cover-page"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative max-h-[74vh] h-[680px] aspect-[1/1.414] bg-white border-r-4 border-b-4 border-slate-900 shadow-2xl rounded-r-md overflow-hidden group cursor-pointer"
                onClick={handleNext}
              >
                <Image
                  src={pages[0]}
                  alt={`${projectName} brochure cover`}
                  fill
                  priority
                  className="object-contain"
                  sizes="50vw"
                />
                {/* Book spine on left */}
                <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/40 via-black/10 to-transparent pointer-events-none" />
                {/* Cover Gloss Sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none" />

                {/* Click to open badge */}
                <div className="absolute bottom-6 right-6 px-4 py-2 bg-slate-950/80 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow-lg">
                  <span>Click to Open Book</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </motion.div>
            ) : (
              /* DESKTOP TWO-PAGE BOOK SPREAD */
              <motion.div
                key={`spread-${leftPageIdx}-${rightPageIdx}`}
                initial={{
                  opacity: 0.8,
                  rotateY: flipDirection === "next" ? 8 : -8,
                }}
                animate={{
                  opacity: 1,
                  rotateY: 0,
                }}
                exit={{
                  opacity: 0.8,
                  rotateY: flipDirection === "next" ? -8 : 8,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative flex items-center justify-center max-h-[74vh] h-[680px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* LEFT PAGE */}
                <div className="relative h-full aspect-[1/1.414] bg-white border-l border-y border-slate-700/80 overflow-hidden shadow-inner">
                  {leftPageIdx >= 0 && leftPageIdx < totalPages ? (
                    <>
                      <Image
                        src={pages[leftPageIdx]}
                        alt={`${projectName} brochure page ${leftPageIdx + 1}`}
                        fill
                        priority
                        className="object-contain"
                        sizes="45vw"
                      />
                      {/* Left page spine gradient shadow (crease) */}
                      <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-black/35 via-black/15 to-transparent pointer-events-none" />
                      {/* Page number footer watermark */}
                      <div className="absolute bottom-2 left-4 text-[10px] font-mono text-slate-500">
                        Page {leftPageIdx + 1}
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-slate-900/40 flex items-center justify-center text-slate-600 text-xs font-mono">
                      [End of Spread]
                    </div>
                  )}
                </div>

                {/* CENTRAL BOOK SPINE BINDING SHADOW */}
                <div className="relative w-2 h-full bg-gradient-to-r from-black/50 via-slate-800 to-black/50 shadow-2xl z-10" />

                {/* RIGHT PAGE */}
                <div className="relative h-full aspect-[1/1.414] bg-white border-r border-y border-slate-700/80 overflow-hidden shadow-inner">
                  {rightPageIdx >= 0 && rightPageIdx < totalPages ? (
                    <>
                      <Image
                        src={pages[rightPageIdx]}
                        alt={`${projectName} brochure page ${rightPageIdx + 1}`}
                        fill
                        priority
                        className="object-contain"
                        sizes="45vw"
                      />
                      {/* Right page spine gradient shadow (crease) */}
                      <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-black/35 via-black/15 to-transparent pointer-events-none" />
                      {/* Page number footer watermark */}
                      <div className="absolute bottom-2 right-4 text-[10px] font-mono text-slate-500">
                        Page {rightPageIdx + 1}
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-slate-900/40 flex items-center justify-center text-slate-600 text-xs font-mono">
                      [End of Brochure]
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Thumbnail Strip (Toggable) */}
      <AnimatePresence>
        {showThumbnails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 110, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-slate-800 bg-slate-900/95 overflow-x-auto px-4 py-3 flex items-center gap-3 z-20 scrollbar-thin scrollbar-thumb-slate-700"
          >
            {pages.map((img, idx) => {
              const isSelected = isMobile
                ? currentPage === idx
                : isCover
                ? idx === 0
                : idx === leftPageIdx || idx === rightPageIdx;

              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (isMobile) {
                      setCurrentPage(idx);
                    } else {
                      if (idx === 0) {
                        setCurrentPage(0);
                      } else {
                        // Keep odd/even pairs aligned
                        setCurrentPage(idx % 2 === 1 ? idx : Math.max(1, idx - 1));
                      }
                    }
                  }}
                  className={`relative flex-shrink-0 h-20 aspect-[1/1.414] bg-white border-2 overflow-hidden transition-all ${
                    isSelected
                      ? "border-amber-400 scale-105 shadow-md shadow-amber-500/20"
                      : "border-slate-700 opacity-60 hover:opacity-100 hover:border-slate-400"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumb ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] font-mono text-white text-center py-0.5">
                    {idx + 1}
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Toolbar */}
      <footer className="h-14 border-t border-slate-800/80 bg-slate-900/90 px-4 sm:px-6 flex items-center justify-between text-xs text-slate-300 z-20">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(0)}
            disabled={currentPage === 0}
            className="p-1.5 hover:text-white disabled:opacity-30 transition-colors cursor-pointer"
            title="First Page / Cover"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-slate-400">
            {isMobile ? (
              <>Page <strong className="text-white">{currentPage + 1}</strong> of {totalPages}</>
            ) : isCover ? (
              <>Cover Page (1 of {totalPages})</>
            ) : (
              <>
                Pages{" "}
                <strong className="text-white">
                  {leftPageIdx + 1}
                  {rightPageIdx >= 0 ? `-${rightPageIdx + 1}` : ""}
                </strong>{" "}
                of {totalPages}
              </>
            )}
          </span>
        </div>

        {/* Page Slider / Progress Bar */}
        <div className="hidden md:flex items-center gap-3 w-64 max-w-xs">
          <input
            type="range"
            min={0}
            max={totalPages - 1}
            value={currentPage}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (isMobile) {
                setCurrentPage(val);
              } else {
                setCurrentPage(val === 0 ? 0 : val % 2 === 1 ? val : Math.max(1, val - 1));
              }
            }}
            className="w-full h-1 bg-slate-700 accent-amber-400 cursor-pointer"
          />
        </div>

        {/* Quick Instructions / Keyboard Hint */}
        <div className="flex items-center gap-3 text-slate-400 text-[11px]">
          <span className="hidden sm:inline">Use ◄ ► Arrow Keys to Flip</span>
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className="text-amber-400 hover:underline cursor-pointer"
          >
            {showThumbnails ? "Hide Thumbnails" : "Show All Pages"}
          </button>
        </div>
      </footer>
    </div>
  );
}
