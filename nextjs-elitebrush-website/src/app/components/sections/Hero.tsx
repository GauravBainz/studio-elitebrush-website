import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative z-10 flex items-center justify-center md:justify-start min-h-screen pt-24 px-10 md:pl-20 md:pr-10">
      <div className="text-white max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-center md:text-left">
          Elevate Your Space With Elite Precision
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-center md:text-left">
          Northern BC&apos;s Premier Painting and Epoxy Flooring
        </p>
        <div className="flex justify-center md:justify-start">
          <Link
            href="#contact"
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/70 backdrop-blur-sm text-white text-sm font-medium uppercase tracking-[0.2em] transition-all duration-500 ease-out hover:bg-white hover:text-black hover:border-white"
          >
            Start Your Project
            <svg
              xmlns="http://www.w3.org/2000/svg"
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
    </div>
  );
}
