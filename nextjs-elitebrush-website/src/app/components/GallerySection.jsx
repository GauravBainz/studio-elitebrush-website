"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { urlFor } from "@/lib/sanity/imageUrlBuilder";

// This component handles the gallery with the view more functionality
export default function GallerySection({ portfolioPaintings }) {
  const [showAll, setShowAll] = useState(false);
  const [imagesToDisplay, setImagesToDisplay] = useState([]);
  const [remainingImages, setRemainingImages] = useState([]);
  const [isClient, setIsClient] = useState(false);
  
  // Use useEffect to run the shuffling only on the client side
  // This ensures consistent rendering between server and client
  useEffect(() => {
    setIsClient(true);
    
    // Create a flat array of all images from all paintings
    const allImages = portfolioPaintings.flatMap((painting) => {
      const images = Array.isArray(painting.mainImages) ? painting.mainImages : [];
      return images.map((image, imageIndex) => ({
        image,
        painting,
        key: `${painting._id}-${imageIndex}`
      }));
    });
    
    // Use a seeded random approach or a stable sort instead of pure randomness
    // For simplicity, we'll just sort by painting title + image index which is stable
    const stableSortedImages = [...allImages].sort((a, b) => {
      const titleA = a.painting.title || '';
      const titleB = b.painting.title || '';
      return titleA.localeCompare(titleB);
    });
    
    // Initial images (first 6)
    const initial = stableSortedImages.slice(0, 6);
    
    // Images to show after clicking "View More"
    const remaining = stableSortedImages.slice(6);
    
    setImagesToDisplay(initial);
    setRemainingImages(remaining);
  }, [portfolioPaintings]);

  // Function to handle "View More" button click
  const handleViewMoreClick = () => {
    if (showAll) {
      // Just hide the additional images
      setShowAll(false);
    } else {
      // Show all images
      setShowAll(true);
    }
  };

  // Determine what content to show during SSR vs client rendering
  const displayImages = showAll ? [...imagesToDisplay, ...remainingImages] : imagesToDisplay;

  return (
    <section id="portfolio" className="py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Gallery</h2>
        
        {isClient && displayImages.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Display either initial 6 or all images */}
              {displayImages.map(({ image, painting, key }, index) => (
                <div 
                  key={key} 
                  className="overflow-hidden rounded-xl shadow-lg bg-black/30 border border-white/10"
                >
                  {/* Fixed aspect ratio container */}
                  <div className="relative pt-[75%]"> {/* 4:3 aspect ratio */}
                    <Image
                      src={urlFor(image).url()}
                      alt={image.alt || painting.title || "Portfolio Image"}
                      className="object-cover absolute inset-0 w-full h-full"
                      width={600}
                      height={450}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 6} // Prioritize first 6 images
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* View More / View Less button - only show if there are more than 6 images */}
            {(imagesToDisplay.length + remainingImages.length) > 6 && (
              <div className="mt-12 text-center">
                <button
                  onClick={handleViewMoreClick}
                  className="group relative px-8 py-3 bg-black/40 text-white font-semibold rounded-xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Button text changes based on state */}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {showAll ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        View Less
                      </>
                    ) : (
                      <>
                        View All ({remainingImages.length} more)
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </>
                    )}
                  </span>
                  
                  {/* Hover effect overlay */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600/80 to-red-800/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-white text-xl">
            {isClient && "No portfolio images found."}
            {!isClient && "Loading gallery..."}
          </div>
        )}
      </div>
    </section>
  );
}