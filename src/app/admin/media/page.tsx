"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Video,
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit2,
  Save,
  Play,
  Sparkles,
  CheckCircle2,
  X,
  Volume2,
  VolumeX,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { MediaConfig } from "@/lib/admin-store";
import { GalleryItem } from "@/data/gallery";

export default function AdminMediaPage() {
  const [mediaConfig, setMediaConfig] = useState<MediaConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingVideo, setSavingVideo] = useState(false);
  const [videoSuccess, setVideoSuccess] = useState(false);

  // Gallery Modal State
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [galleryFormData, setGalleryFormData] = useState<GalleryItem>({
    id: "",
    title: "",
    category: "Farmhouses",
    image: "/images/hero/hero-poster.jpg",
    location: "Greater Noida / Yamuna Expressway",
    tag: "Exclusive Country Estate",
    description: "",
  });

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      if (data.success) {
        setMediaConfig(data.media);
      }
    } catch (err) {
      console.error("Fetch media error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleSaveHeroVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaConfig) return;
    setSavingVideo(true);
    setVideoSuccess(false);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heroVideo: mediaConfig.heroVideo }),
      });
      const data = await res.json();
      if (data.success) {
        setVideoSuccess(true);
        setTimeout(() => setVideoSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Save video error:", err);
    } finally {
      setSavingVideo(false);
    }
  };

  const handleSaveGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaConfig) return;

    const list = [...mediaConfig.gallery];
    const idx = list.findIndex((g) => g.id === galleryFormData.id);
    if (idx >= 0) {
      list[idx] = galleryFormData;
    } else {
      list.unshift({ ...galleryFormData, id: `g-${Date.now()}` });
    }

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gallery: list }),
      });
      const data = await res.json();
      if (data.success) {
        setMediaConfig(data.media);
        setGalleryModalOpen(false);
      }
    } catch (err) {
      console.error("Save gallery item error:", err);
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if (!mediaConfig || !confirm("Delete this photo from the gallery?")) return;
    const list = mediaConfig.gallery.filter((g) => g.id !== id);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gallery: list }),
      });
      const data = await res.json();
      if (data.success) {
        setMediaConfig(data.media);
      }
    } catch (err) {
      console.error("Delete photo error:", err);
    }
  };

  if (loading || !mediaConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 font-mono text-xs uppercase tracking-widest">
        Loading Media Assets...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Hero Video & Media Manager"
        subtitle="Control home page background video footage, poster fallback, and luxury photo gallery."
      />

      <div className="px-4 sm:px-8 space-y-10">
        {/* SECTION 1: HERO BANNER VIDEO CONTROLLER */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-amber-400 mb-1 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-amber-400" />
                <span>HOME PAGE BANNER VIDEO</span>
              </div>
              <h2 className="font-serif text-2xl text-white font-normal">
                Architectural Video Footage & Settings
              </h2>
            </div>

            {videoSuccess && (
              <div className="px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-lg flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Video Settings Saved!</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Live Video Preview Box */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Live Video Preview
              </div>
              <div className="relative aspect-video w-full bg-black rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
                <video
                  key={mediaConfig.heroVideo.primarySource}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source
                    src={mediaConfig.heroVideo.primarySource}
                    type="video/mp4"
                  />
                  <source
                    src={mediaConfig.heroVideo.secondarySource}
                    type="video/mp4"
                  />
                </video>

                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm text-white text-[10px] uppercase font-mono px-2 py-0.5 rounded">
                  Live Preview
                </div>
              </div>
              <p className="text-[11px] text-slate-500 font-light">
                Unbranded clean drone video playing on website home banner.
              </p>
            </div>

            {/* Video Form Settings */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSaveHeroVideo} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Primary Video MP4 URL / File Path *
                  </label>
                  <input
                    type="text"
                    required
                    value={mediaConfig.heroVideo.primarySource}
                    onChange={(e) =>
                      setMediaConfig({
                        ...mediaConfig,
                        heroVideo: {
                          ...mediaConfig.heroVideo,
                          primarySource: e.target.value,
                        },
                      })
                    }
                    placeholder="/videos/hero-banner.mp4"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500 font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Fallback Poster Image Path
                  </label>
                  <input
                    type="text"
                    value={mediaConfig.heroVideo.posterImage}
                    onChange={(e) =>
                      setMediaConfig({
                        ...mediaConfig,
                        heroVideo: {
                          ...mediaConfig.heroVideo,
                          posterImage: e.target.value,
                        },
                      })
                    }
                    placeholder="/images/hero/hero-poster.jpg"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500 font-mono text-[11px]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 pt-1">
                  <label className="flex items-center gap-2 p-3 bg-slate-950 border border-slate-800 rounded-lg cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={mediaConfig.heroVideo.autoPlay}
                      onChange={(e) =>
                        setMediaConfig({
                          ...mediaConfig,
                          heroVideo: {
                            ...mediaConfig.heroVideo,
                            autoPlay: e.target.checked,
                          },
                        })
                      }
                      className="rounded bg-slate-900 border-slate-700 text-amber-500"
                    />
                    <span className="text-[11px] text-slate-300 font-medium">Autoplay</span>
                  </label>

                  <label className="flex items-center gap-2 p-3 bg-slate-950 border border-slate-800 rounded-lg cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={mediaConfig.heroVideo.loop}
                      onChange={(e) =>
                        setMediaConfig({
                          ...mediaConfig,
                          heroVideo: {
                            ...mediaConfig.heroVideo,
                            loop: e.target.checked,
                          },
                        })
                      }
                      className="rounded bg-slate-900 border-slate-700 text-amber-500"
                    />
                    <span className="text-[11px] text-slate-300 font-medium">Loop Forever</span>
                  </label>

                  <label className="flex items-center gap-2 p-3 bg-slate-950 border border-slate-800 rounded-lg cursor-pointer hover:border-slate-700">
                    <input
                      type="checkbox"
                      checked={mediaConfig.heroVideo.muted}
                      onChange={(e) =>
                        setMediaConfig({
                          ...mediaConfig,
                          heroVideo: {
                            ...mediaConfig.heroVideo,
                            muted: e.target.checked,
                          },
                        })
                      }
                      className="rounded bg-slate-900 border-slate-700 text-amber-500"
                    />
                    <span className="text-[11px] text-slate-300 font-medium">Muted by Default</span>
                  </label>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={savingVideo}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>{savingVideo ? "Updating..." : "Save Video Settings"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* SECTION 2: PHOTO GALLERY MEDIA HUB */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-amber-400 mb-1 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                <span>PHOTO GALLERY & SHOWCASE</span>
              </div>
              <h2 className="font-serif text-2xl text-white font-normal">
                Curated Image Gallery ({mediaConfig.gallery.length} Photos)
              </h2>
            </div>

            <button
              onClick={() => {
                setGalleryFormData({
                  id: `g-${Date.now()}`,
                  title: "New Luxury Showcase Photo",
                  category: "Farmhouses",
                  image: "/images/bollywood-aerocity/hero_farmhouse.png",
                  location: "Yamuna Expressway Corridor",
                  tag: "Exclusive Country Estate",
                  description: "Architectural rendering of luxury countryside estate with private gardens.",
                });
                setGalleryModalOpen(true);
              }}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Photo</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaConfig.gallery.map((item) => (
              <div
                key={item.id}
                className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-slate-950/90 text-white text-[9px] font-semibold uppercase px-2 py-0.5 rounded">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <div className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                      {item.location}
                    </div>
                    <h3 className="font-serif text-sm text-white font-normal">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-light line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      setGalleryFormData(item);
                      setGalleryModalOpen(true);
                    }}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors"
                    title="Edit Photo"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDeleteGalleryItem(item.id)}
                    className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded transition-colors"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Item Modal */}
      {galleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-6 sm:p-8 space-y-6">
            <button
              onClick={() => setGalleryModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-amber-400 mb-1">
                GALLERY MEDIA ASSET
              </div>
              <h3 className="font-serif text-2xl text-white">Edit Photo Asset</h3>
            </div>

            <form onSubmit={handleSaveGalleryItem} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  value={galleryFormData.title}
                  onChange={(e) =>
                    setGalleryFormData({ ...galleryFormData, title: e.target.value })
                  }
                  placeholder="Bollywood Aero City Farmhouse Villa"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={galleryFormData.category}
                    onChange={(e) =>
                      setGalleryFormData({
                        ...galleryFormData,
                        category: e.target.value as GalleryItem["category"],
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Farmhouses">Farmhouses</option>
                    <option value="Plotted Enclaves">Plotted Enclaves</option>
                    <option value="Residences">Residences</option>
                    <option value="Interiors & Lifestyle">Interiors & Lifestyle</option>
                    <option value="Masterplans">Masterplans</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Tag Badge
                  </label>
                  <input
                    type="text"
                    value={galleryFormData.tag}
                    onChange={(e) =>
                      setGalleryFormData({ ...galleryFormData, tag: e.target.value })
                    }
                    placeholder="Signature Architecture"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Image Path / URL *
                </label>
                <input
                  type="text"
                  required
                  value={galleryFormData.image}
                  onChange={(e) =>
                    setGalleryFormData({ ...galleryFormData, image: e.target.value })
                  }
                  placeholder="/images/bollywood-aerocity/hero_farmhouse.png"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={galleryFormData.location}
                  onChange={(e) =>
                    setGalleryFormData({ ...galleryFormData, location: e.target.value })
                  }
                  placeholder="Village Sarakpur, Greater Noida"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={galleryFormData.description}
                  onChange={(e) =>
                    setGalleryFormData({ ...galleryFormData, description: e.target.value })
                  }
                  placeholder="Description..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setGalleryModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wider shadow-md"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
