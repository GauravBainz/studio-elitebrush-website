"use client";

import { useRef } from "react";

export type Testimonial = {
  _id: string;
  name: string;
  role: string;
  text: string;
};

interface TestimonialsScrollProps {
  testimonials: Testimonial[];
}

export default function TestimonialsScroll({ testimonials }: TestimonialsScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="relative z-10 py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-10">
        <div className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-12 md:mb-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-red-500"></div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">What clients say</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                aria-label="Previous review"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 text-white/70 hover:border-white hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Next review"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 text-white/70 hover:border-white hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="-mx-4 md:-mx-10">
            <div
              ref={scrollRef}
              className="overflow-x-auto snap-x snap-mandatory scroll-pl-4 md:scroll-pl-10 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="flex gap-12 md:gap-16 px-4 md:px-10 w-max">
                {testimonials.map((t) => (
                  <div
                    key={t._id}
                    className="snap-start w-[280px] sm:w-[340px] md:w-[380px] flex-shrink-0"
                  >
                    <p className="text-red-500 text-6xl md:text-7xl leading-none font-serif">&ldquo;</p>
                    <p className="italic text-white text-base md:text-[17px] leading-relaxed -mt-3">
                      {t.text}
                    </p>
                    <div className="flex items-center gap-3 mt-5">
                      <div className="w-6 h-px bg-red-500"></div>
                      <p className="text-white/70 text-[10px] uppercase tracking-[0.2em]">
                        {t.name} · {t.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
