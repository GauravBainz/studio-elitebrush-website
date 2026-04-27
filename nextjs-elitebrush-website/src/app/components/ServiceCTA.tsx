import Link from "next/link";

interface ServiceCTAProps {
  heading: string;
  body: string;
  buttonLabel?: string;
}

export default function ServiceCTA({
  heading,
  body,
  buttonLabel = "Get a free quote",
}: ServiceCTAProps) {
  return (
    <section className="relative z-10 py-20">
      <div className="container mx-auto px-4 md:px-10">
        <div className="p-4 md:p-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-red-500"></div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Get in touch</p>
            <div className="w-8 h-px bg-red-500"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">{heading}</h2>
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-10">{body}</p>
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/70 backdrop-blur-sm text-white text-sm font-medium uppercase tracking-[0.2em] transition-all duration-500 ease-out hover:bg-white hover:text-black hover:border-white"
          >
            {buttonLabel}
            <svg
              className="w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
