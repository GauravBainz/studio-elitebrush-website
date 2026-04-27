"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/imageUrlBuilder";

export default function GallerySection({ projects }) {
  const [showAll, setShowAll] = useState(false);
  const [imagesToDisplay, setImagesToDisplay] = useState([]);
  const [remainingImages, setRemainingImages] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    setIsClient(true);

    const allImages = projects.flatMap((project) => {
      const images = Array.isArray(project.mainImages) ? project.mainImages : [];
      return images.map((image, imageIndex) => ({
        image,
        project,
        key: `${project._id}-${imageIndex}`,
      }));
    });

    setImagesToDisplay(allImages.slice(0, 6));
    setRemainingImages(allImages.slice(6));
  }, [projects]);

  const displayImages = showAll ? [...imagesToDisplay, ...remainingImages] : imagesToDisplay;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const showPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + displayImages.length) % displayImages.length));
  }, [displayImages.length]);
  const showNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % displayImages.length));
  }, [displayImages.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  const activeImage = lightboxIndex !== null ? displayImages[lightboxIndex] : null;

  return (
    <section id="portfolio" className="relative z-10 py-20">
      <div className="container mx-auto px-4 md:px-10">
        <div className="p-4 md:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-red-500"></div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Recent work</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-red-500">Gallery</h2>

          {isClient && displayImages.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {displayImages.map(({ image, project, key }, index) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    className="relative overflow-hidden aspect-[4/3] group cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                    aria-label={`View ${image.alt || project.title || "image"} larger`}
                  >
                    <Image
                      src={urlFor(image).url()}
                      alt={image.alt || project.title || "Portfolio Image"}
                      className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                      width={600}
                      height={450}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 6}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.5))" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8V4m0 0h4M3 4l4 4m14-4v4m0-4h-4m4 0l-4 4M3 16v4m0 0h4m-4 0l4-4m14 4l-4-4m4 4v-4m0 4h-4" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>

              {remainingImages.length > 0 && (
                <div className="mt-14 text-center">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="group inline-flex items-center gap-3 px-8 py-3 rounded-full border border-white/40 text-white text-xs uppercase tracking-[0.25em] hover:bg-white hover:text-black hover:border-white transition-all duration-500 ease-out"
                  >
                    <span>
                      {showAll ? "View less" : `View all (${remainingImages.length} more)`}
                    </span>
                    <svg
                      className={`w-3 h-3 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-white/50 text-xs uppercase tracking-[0.3em]">
              {isClient ? "No portfolio images found" : "Loading gallery"}
            </p>
          )}
        </div>
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 flex items-center justify-center p-4 md:p-10 pointer-events-none"
          >
            <div className="relative max-w-[92vw] max-h-[80vh] w-full h-full">
              <Image
                src={urlFor(activeImage.image).width(1800).quality(90).url()}
                alt={activeImage.image.alt || activeImage.project.title || "Portfolio image"}
                fill
                sizes="92vw"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {displayImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous image"
                className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full border border-white/30 bg-black/60 text-white/80 hover:border-white hover:text-white hover:bg-black/80 transition-all duration-300 z-[60]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Next image"
                className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full border border-white/30 bg-black/60 text-white/80 hover:border-white hover:text-white hover:bg-black/80 transition-all duration-300 z-[60]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div className="absolute bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-white/60 text-[10px] uppercase tracking-[0.3em] z-[60]">
            <span>{String(lightboxIndex + 1).padStart(2, "0")}</span>
            <div className="w-6 h-px bg-white/30"></div>
            <span>{String(displayImages.length).padStart(2, "0")}</span>
          </div>
        </div>
      )}
    </section>
  );
}
