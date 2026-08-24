"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryModalProps {
  isOpen: boolean;
  images: string[];
  initialIndex?: number;
  onClose: () => void;
  projectName?: string;
}

export default function GalleryModal({
  isOpen,
  images,
  initialIndex = 0,
  onClose,
  projectName = "Luxotic Gallery",
}: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length, currentIndex]);

  if (!isOpen || images.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Header Bar */}
      <div className="flex items-center justify-between text-white z-10">
        <div>
          <div className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
            {projectName}
          </div>
          <div className="text-xs font-serif text-slate-200">
            Image {currentIndex + 1} of {images.length}
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-white transition-colors"
          aria-label="Close Lightbox Viewer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 z-20 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="relative w-full h-full max-w-5xl max-h-[75vh]">
          <Image
            src={images[currentIndex]}
            alt={`${projectName} - Photo ${currentIndex + 1}`}
            fill
            className="object-contain"
            priority
          />
        </div>

        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-6 z-20 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Thumbnail Bar */}
      <div className="flex items-center justify-center space-x-2 overflow-x-auto py-2 z-10">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`relative w-16 h-12 border-2 transition-all ${
              idx === currentIndex
                ? "border-amber-400 opacity-100 scale-105"
                : "border-transparent opacity-50 hover:opacity-100"
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
