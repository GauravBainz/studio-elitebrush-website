import Link from "next/link";

interface ServiceHeroProps {
  heading: string;
  intro?: string;
}

export default function ServiceHero({ heading, intro }: ServiceHeroProps) {
  return (
    <section className="relative z-10 pt-28 pb-8 md:pt-32 md:pb-10">
      <div className="container mx-auto px-4 md:px-10">
        <div className="p-4 md:p-6">
          <Link
            href="/#services"
            className="group inline-flex items-center gap-2 text-white/50 hover:text-red-500 text-[10px] uppercase tracking-[0.3em] mb-8 transition-colors duration-300"
          >
            <svg
              className="w-3 h-3 transition-transform duration-300 group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to services</span>
          </Link>

          <h1
            className={`text-4xl md:text-6xl font-bold text-red-500 leading-tight ${intro ? "mb-8" : ""}`}
          >
            {heading}
          </h1>
          {intro && (
            <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl">{intro}</p>
          )}
        </div>
      </div>
    </section>
  );
}
