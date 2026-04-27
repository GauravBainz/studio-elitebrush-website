import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="relative z-10 py-20">
      <div className="container mx-auto px-4 md:px-10">
        <div className="absolute inset-0 bg-black/90"></div>

        <div className="relative z-10">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="text-white p-4 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-red-500"></div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">About</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-red-500">Who we are</h2>
              <p className="mb-4 leading-relaxed">
                We started Elite Brush Coatings because we saw a gap — Prince George deserved better work than what was out there. So we built something around actually doing it right.
              </p>
              <p className="mb-4 leading-relaxed">
                We&apos;re young, we&apos;re local, and we take a lot of pride in what we put our name on. Whether it&apos;s a fresh coat of paint or a full epoxy floor, we treat every job like it matters — because to us, it does.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <div className="w-8 h-px bg-red-500"></div>
                <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-white/80 flex flex-wrap items-center gap-x-2.5">
                  <span>No shortcuts.</span>
                  <span className="text-white/30">/</span>
                  <span>No excuses.</span>
                  <span className="text-white/30">/</span>
                  <span className="text-red-500">Just good work.</span>
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-10 pt-6 border-t border-white/10">
                <div>
                  <p className="text-red-500 text-2xl md:text-3xl font-bold">50+</p>
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-white/70 mt-1">Projects Completed</p>
                </div>
                <div>
                  <p className="text-red-500 text-2xl md:text-3xl font-bold">5.0★</p>
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-white/70 mt-1">Google Reviews</p>
                </div>
                <div>
                  <p className="text-red-500 text-2xl md:text-3xl font-bold">100%</p>
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-white/70 mt-1">Locally Owned</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="overflow-hidden aspect-[3/4]">
                    <Image
                      src="/images/gaurav-headshot.jpeg"
                      alt="Gaurav Bains, Co-Founder"
                      width={300}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="mt-3">
                    <p className="text-white text-sm font-medium">Gaurav Bains</p>
                    <p className="text-white/50 text-[10px] uppercase tracking-[0.15em] mt-1 leading-relaxed">Co-Founder &amp; Director of Operations</p>
                  </div>
                </div>
                <div>
                  <div className="overflow-hidden aspect-[3/4]">
                    <Image
                      src="/images/kavan-headshot.jpeg"
                      alt="Kavan, Co-Founder"
                      width={300}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="mt-3">
                    <p className="text-white text-sm font-medium">Kavan</p>
                    <p className="text-white/50 text-[10px] uppercase tracking-[0.15em] mt-1 leading-relaxed">Co-Founder &amp; Director of Field Operations</p>
                  </div>
                </div>
              </div>

              <a
                href="https://www.instagram.com/elitebrushco/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 mt-6 py-3 px-5 border border-white/15 hover:border-white/40 hover:bg-white/[0.03] transition-all duration-300"
              >
                <svg className="w-5 h-5 text-red-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">See our latest work on Instagram</p>
                  <p className="text-white text-sm font-medium group-hover:text-red-500 transition-colors duration-300 mt-0.5">@elitebrushco</p>
                </div>
                <svg
                  className="w-3 h-3 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
