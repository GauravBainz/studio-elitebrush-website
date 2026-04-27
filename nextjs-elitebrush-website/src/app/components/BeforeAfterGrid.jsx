"use client";

import { useState } from "react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { urlFor } from "@/lib/sanity/imageUrlBuilder";

const INITIAL_COUNT = 4;

export default function BeforeAfterGrid({ projects }) {
  const [showAll, setShowAll] = useState(false);

  const initial = projects.slice(0, INITIAL_COUNT);
  const remaining = projects.slice(INITIAL_COUNT);
  const visible = showAll ? projects : initial;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {visible.map((project) => (
          <div key={project._id}>
            <BeforeAfterSlider
              beforeImage={urlFor(project.beforeAfterImages.before).url()}
              afterImage={urlFor(project.beforeAfterImages.after).url()}
            />
            <p className="text-white/60 text-[10px] uppercase tracking-[0.25em] mt-5 text-center">
              {project.title || "Transformation"}
            </p>
          </div>
        ))}
      </div>

      {remaining.length > 0 && (
        <div className="mt-14 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group inline-flex items-center gap-3 px-8 py-3 rounded-full border border-white/40 text-white text-xs uppercase tracking-[0.25em] hover:bg-white hover:text-black hover:border-white transition-all duration-500 ease-out"
          >
            <span>
              {showAll ? "View less" : `View all (${remaining.length} more)`}
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
  );
}
