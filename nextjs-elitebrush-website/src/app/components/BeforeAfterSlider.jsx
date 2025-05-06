"use client"

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const BeforeAfterSlider = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50); // Back to middle
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevent text selection
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
    // Prevent default behavior to stop browser scrolling/panning
    e.preventDefault();
    
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    setSliderPosition(percentage);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    
    // Prevent page scrolling when touching the slider area
    const preventScroll = (e) => {
      if (containerRef.current && containerRef.current.contains(e.target)) {
        e.preventDefault();
      }
    };
    
    // Add passive: false to ensure preventDefault works
    document.addEventListener('touchmove', preventScroll, { passive: false });
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  return (
    <div className="relative">
      {/* Instruction banner */}
      <div className="text-center mb-4">
        <div className="flex justify-between items-center px-4 py-2 bg-black/40 rounded-lg text-white font-medium">
          <div className="flex items-center">
            
          </div>
          <div className="text-sm">DRAG SLIDER</div>
          
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className="relative h-96 rounded-lg overflow-hidden cursor-col-resize select-none touch-none"
        onMouseDown={handleMouseDown}
        onTouchMove={handleTouchMove}
        onTouchStart={(e) => {e.preventDefault(); isDragging.current = true;}}
        onTouchEnd={() => isDragging.current = false}
        style={{ userSelect: 'none', WebkitUserSelect: 'none', touchAction: 'none' }}
      >
        {/* After image (bottom layer) */}
        <div className="absolute inset-0 select-none">
          <Image
            src={afterImage}
            alt="After"
            fill
            className="object-cover select-none"
            priority
            draggable="false"
          />
          <div className="absolute bottom-4 right-4 bg-red-500/70 px-3 py-1 rounded text-white text-sm font-medium">AFTER</div>
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
            alt="Before"
            fill
            className="object-cover select-none"
            priority
            draggable="false"
          />
          <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded text-white text-sm font-medium">BEFORE</div>
        </div>
        
        {/* Slider control - modified to be at the bottom */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Circle control moved to bottom (80% from top) */}
          <div className="absolute top-4/5 bottom-16 -translate-y-1/2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
            <div className="w-6 h-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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