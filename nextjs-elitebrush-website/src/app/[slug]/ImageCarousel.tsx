"use client";

import { useState } from "react";
import { urlFor } from "@/lib/sanity/imageUrlBuilder";

const ImageCarousel = ({ mainImage, additionalImages }: { 
  mainImage: any; 
  additionalImages: any[] 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const allImages = mainImage ? [mainImage, ...additionalImages] : additionalImages;
  
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

  return (
    <>
      <div className="relative w-full rounded-lg overflow-hidden mb-8">
        {/* Main Image */}
        <div className="relative aspect-[3/4] max-h-[70vh] mx-auto">
          <div className="relative h-full w-full">
            {/* Display tag if it exists */}
            {allImages[currentIndex]?.tag && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 font-bold rounded-md z-10">
                {allImages[currentIndex].tag}
              </div>
            )}
            
            <img
              src={urlFor(allImages[currentIndex])
                .auto('format')
                .fit('max')
                .url()}
              alt={allImages[currentIndex]?.alt || "Project image"}
              className="w-full h-full object-contain"
            />
            
            {/* Image counter */}
            <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>
        
        {/* Navigation buttons */}
        <button 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-red-500 text-white p-3 rounded-full transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
        >
          ←
        </button>
        <button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-red-500 text-white p-3 rounded-full transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
        >
          →
        </button>
        
        {/* Thumbnail indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {allImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Thumbnail gallery */}
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mb-8">
        {allImages.map((image, index) => (
          <div 
            key={index}
            className={`aspect-[3/4] cursor-pointer overflow-hidden rounded-md border-2 transition-all relative ${
              index === currentIndex ? 'border-red-500' : 'border-transparent'
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <img 
              src={urlFor(image).width(150).height(200).url()} 
              alt={`Thumbnail ${index}`} 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
            
            {/* Thumbnail tag */}
            {image.tag && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs py-1 text-center">
                {image.tag}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageCarousel;