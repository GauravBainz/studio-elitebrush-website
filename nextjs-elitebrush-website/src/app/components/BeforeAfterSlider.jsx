"use client"

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const BeforeAfterSlider = ({ beforeImage, afterImage, className = '' }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMouseDown = (e) => {
    e.preventDefault();
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    setSliderPosition(percentage);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    isDragging.current = true;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };

    const handleGlobalMouseMove = (e) => {
      if (!isDragging.current || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      
      setSliderPosition(percentage);
    };

    const preventScroll = (e) => {
      if (containerRef.current && containerRef.current.contains(e.target)) {
        e.preventDefault();
      }
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('touchmove', preventScroll, { passive: false });
    
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      {/* Instruction banner - more compact for mobile */}
      <div className="text-center mb-3">
        <div className="inline-flex items-center px-3 py-1.5 bg-black/50 rounded-md text-white text-xs font-medium backdrop-blur-sm">
          <span>DRAG SLIDER</span>
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className="relative w-full rounded-xl overflow-hidden cursor-col-resize select-none touch-none shadow-2xl"
        onMouseDown={handleMouseDown}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ 
          userSelect: 'none', 
          WebkitUserSelect: 'none', 
          touchAction: 'none',
          aspectRatio: '4/3', // iPhone photo aspect ratio
          maxHeight: '80vh' // Prevent oversized images on smaller screens
        }}
      >
        {/* After image (bottom layer) */}
        <div className="absolute inset-0 select-none">
          <Image
            src={afterImage}
            alt="After comparison"
            fill
            className="object-cover select-none"
            priority
            draggable="false"
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 80vw, 50vw"
            quality={85}
          />
          <div className="absolute bottom-2 right-2 bg-red-500/90 px-2 py-1 rounded text-white text-xs font-semibold shadow-lg backdrop-blur-sm">
            AFTER
          </div>
        </div>
        
        {/* Before image with clip path (top layer) */}
        <div 
          className="absolute inset-0 select-none"
          style={{ 
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` 
          }}
        >
          <Image
            src={beforeImage}
            alt="Before comparison"
            fill
            className="object-cover select-none"
            priority
            draggable="false"
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 80vw, 50vw"
            quality={85}
          />
          <div className="absolute bottom-2 left-2 bg-black/90 px-2 py-1 rounded text-white text-xs font-semibold shadow-lg backdrop-blur-sm">
            BEFORE
          </div>
        </div>
        
        {/* Slider control - optimized for touch */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-2xl z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Circle control - larger for better touch interaction */}
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-2xl border-2 border-gray-100 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-150">
            <div className="w-6 h-6 flex items-center justify-center text-gray-700">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;