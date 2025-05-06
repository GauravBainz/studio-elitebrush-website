"use client";

import { useState } from "react";
import Image from 'next/image';
import { urlFor } from "@/lib/sanity/imageUrlBuilder";
import type { SanityDocument } from "next-sanity";

// Define the props interface
interface EpoxyGallerySectionProps {
  portfolioEpoxy: SanityDocument[];
}

export default function EpoxyGallerySection({ portfolioEpoxy }: EpoxyGallerySectionProps) {
  // State to track how many items to show
  const [displayCount, setDisplayCount] = useState(6);
  
  // Function to increase the display count
  const showMore = () => {
    setDisplayCount(prevCount => prevCount + 6);
  };

  return (
    <section id="portfolio" className="py-20 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Our Epoxy Portfolio</h2>
        <p className="text-xl text-white/80 text-center mb-16 max-w-2xl mx-auto">
          Browse our collection of professional epoxy work, showcasing our attention to detail and quality craftsmanship.
        </p>
        
        {portfolioEpoxy.length > 0 ? (
          <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioEpoxy.slice(0, displayCount).map((project) => {
                // Get the first image for each project
                const mainImage = project.images && Array.isArray(project.images) && project.images.length > 0 
                  ? project.images[0] 
                  : null;
                
                return mainImage ? (
                  <div 
                    key={project._id} 
                    className="group relative overflow-hidden rounded-xl bg-black/30 backdrop-blur-sm p-4 border border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-1"
                  >
                    <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
                      <Image
                        src={urlFor(mainImage).url()}
                        alt={mainImage.alt || project.title || "Epoxy project"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Red gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                    {/* Optional caption from the first image */}
                    {mainImage.caption && (
                      <p className="text-white/80">{mainImage.caption}</p>
                    )}
                  </div>
                ) : null;
              })}
            </div>
            
            {/* Show More Button - only show if there are more items to load */}
            {displayCount < portfolioEpoxy.length && (
              <div className="mt-12 text-center">
                <button
                  onClick={showMore}
                  className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
                >
                  Show More Projects
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-white text-xl">
            No epoxy projects found.
          </div>
        )}
      </div>
    </section>
  );
}