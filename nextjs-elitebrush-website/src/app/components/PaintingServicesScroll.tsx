"use client";

import { useRef, type ReactNode } from "react";

type Service = {
  number: string;
  name: string;
  description: string;
  icon: ReactNode;
};

const iconProps = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  className: "w-8 h-8",
};

const SERVICES: Service[] = [
  {
    number: "01",
    name: "Interior Painting",
    description:
      "Walls, trim, ceilings, doors. Premium paints, careful prep, and a clean job site.",
    icon: (
      <svg {...iconProps}>
        <path d="M3 21V8l9-5 9 5v13" />
        <path d="M3 21h18" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    number: "02",
    name: "Exterior Painting",
    description:
      "Weather-resistant finishes built for Northern BC winters. Stucco, siding, decks.",
    icon: (
      <svg {...iconProps}>
        <path d="M3 12l9-9 9 9" />
        <path d="M5 10v10h14V10" />
        <path d="M9 14h6" />
        <path d="M9 17h6" />
      </svg>
    ),
  },
  {
    number: "03",
    name: "New Build Residential",
    description:
      "Working with builders on new construction — primer to final coat, on schedule and to spec.",
    icon: (
      <svg {...iconProps}>
        <path d="M3 21V9l9-6 9 6v12" />
        <path d="M3 21h18" />
        <path d="M10 21V13h4v8" />
        <path d="M7 9v3" />
        <path d="M17 9v3" />
      </svg>
    ),
  },
  {
    number: "04",
    name: "Limewash",
    description:
      "Old-world finish, modern application. Breathable mineral coating that gives masonry a lived-in European look.",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="13" height="5" rx="0.5" />
        <path d="M16 6.5h4v3h-9V13" />
        <rect x="7.5" y="13" width="7" height="8" rx="0.5" />
      </svg>
    ),
  },
  {
    number: "05",
    name: "Commercial",
    description:
      "Offices, retail, multi-unit, restaurants. We work around your schedule so business keeps moving.",
    icon: (
      <svg {...iconProps}>
        <path d="M4 21V5a1 1 0 011-1h14a1 1 0 011 1v16" />
        <path d="M2 21h20" />
        <path d="M9 8h.01M9 12h.01M9 16h.01M15 8h.01M15 12h.01M15 16h.01" strokeWidth={2} />
      </svg>
    ),
  },
];

export default function PaintingServicesScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative z-10 pt-2 pb-12 md:pt-4 md:pb-14">
      <div className="container mx-auto px-4 md:px-10">
        <div className="p-4 md:p-6">
          <div className="flex justify-end mb-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                aria-label="Previous service"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 text-white/70 hover:border-white hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Next service"
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
              <div className="flex gap-8 md:gap-10 px-4 md:px-10 w-max">
                {SERVICES.map((service) => (
                  <div
                    key={service.number}
                    className="snap-start w-[260px] sm:w-[280px] md:w-[300px] flex-shrink-0"
                  >
                    <div className="text-white/70 mb-6">{service.icon}</div>
                    <div className="flex items-center gap-3 mb-3">
                      <p className="text-red-500 text-xs font-bold tracking-[0.25em]">{service.number}</p>
                      <div className="w-6 h-px bg-red-500/40"></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{service.name}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{service.description}</p>
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
