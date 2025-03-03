"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/imageUrlBuilder";

const ImageCarousel = ({ mainImage, additionalImages }: { 
  mainImage: any; 
  additionalImages: any[] 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCurrentImageLoaded, setIsCurrentImageLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<{[key: number]: boolean}>({});
  const allImages = mainImage ? [mainImage, ...additionalImages] : additionalImages;
  
  // Reset loading state when current index changes
  useEffect(() => {
    setIsCurrentImageLoaded(!!loadedImages[currentIndex]);
  }, [currentIndex, loadedImages]);

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => ({
      ...prev,
      [index]: true
    }));
    
    if (index === currentIndex) {
      setIsCurrentImageLoaded(true);
    }
  };
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };

  // Preload images
  useEffect(() => {
    // Preload next image
    const nextIndex = currentIndex === allImages.length - 1 ? 0 : currentIndex + 1;
    if (!loadedImages[nextIndex] && allImages[nextIndex]) {
      const nextImg = new Image();
      nextImg.src = urlFor(allImages[nextIndex]).auto('format').fit('max').url();
      nextImg.onload = () => handleImageLoad(nextIndex);
    }
    
    // Preload previous image
    const prevIndex = currentIndex === 0 ? allImages.length - 1 : currentIndex - 1;
    if (!loadedImages[prevIndex] && allImages[prevIndex]) {
      const prevImg = new Image();
      prevImg.src = urlFor(allImages[prevIndex]).auto('format').fit('max').url();
      prevImg.onload = () => handleImageLoad(prevIndex);
    }
  }, [currentIndex, allImages, loadedImages]);

  return (
    <>
      {/* Fixed Navigation - Same as in page.tsx */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-white hover:text-red-500 transition-all font-medium">
            EliteBrush Co.
          </span>
        </Link>
        <div className="flex space-x-6">
          <Link
            href="/about"
            className="px-3 py-2 text-white transition-all hover:text-red-500">
            Our Story
          </Link>
          <Link
            href="/contact"
            className="px-3 py-2 text-white transition-all hover:text-red-500">
            Contact
          </Link>
        </div>
      </nav>

      <div className="relative w-full max-w-xl mx-auto mb-6">
        {/* Main Image Container */}
        <div className="relative aspect-[3/4] max-h-[65vh] mx-auto rounded-sm overflow-hidden">
          {/* Loading state */}
          {!isCurrentImageLoaded && (
            <div className="absolute inset-0 bg-gray-100/10 backdrop-blur-md flex items-center justify-center">
              <div className="w-10 h-10 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          {/* Display tag if it exists */}
          {allImages[currentIndex]?.tag && (
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 text-sm font-medium rounded-full z-10">
              {allImages[currentIndex].tag}
            </div>
          )}
          
          <img
            src={urlFor(allImages[currentIndex])
              .auto('format')
              .fit('max')
              .url()}
            alt={allImages[currentIndex]?.alt || "Project image"}
            className={`w-full h-full object-contain transition-transform duration-300 ${
              isCurrentImageLoaded ? 'opacity-100 blur-0' : 'opacity-70 blur-sm'
            }`}
            onLoad={() => handleImageLoad(currentIndex)}
          />
          
          {/* Image counter - minimalist version */}
          <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
            {currentIndex + 1} / {allImages.length}
          </div>
        </div>
        
        {/* Navigation buttons - more minimalist */}
        <button 
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        <button 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
      
      {/* Thumbnail gallery - modernized */}
      <div className="flex gap-2 overflow-x-auto py-2 px-4 max-w-4xl mx-auto pb-4 scrollbar-hide">
        {allImages.map((image, index) => {
          const isThumbnailLoaded = loadedImages[index];
          
          return (
            <div 
              key={index}
              className={`flex-shrink-0 aspect-[3/4] w-16 sm:w-20 cursor-pointer overflow-hidden rounded-lg transition-all relative ${
                index === currentIndex 
                  ? 'ring-2 ring-red-500 ring-offset-2' 
                  : 'opacity-70 hover:opacity-100'
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              {/* Thumbnail loading state */}
              {!isThumbnailLoaded && (
                <div className="absolute inset-0 bg-gray-200/20 backdrop-blur-sm"></div>
              )}
              
              <img 
                src={urlFor(image).width(100).height(133).url()} 
                alt={`Thumbnail ${index}`} 
                className={`w-full h-full object-cover transition-all duration-300 ${
                  isThumbnailLoaded ? 'blur-0' : 'blur-sm'
                }`}
                onLoad={() => handleImageLoad(index)}
              />
              
              {/* Thumbnail tag - minimal version */}
              {image.tag && index !== currentIndex && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm text-white text-xs py-0.5 text-center truncate">
                  {image.tag}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Add CSS for hiding scrollbar */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default ImageCarousel;