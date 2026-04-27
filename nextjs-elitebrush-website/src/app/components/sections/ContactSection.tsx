import ContactForm from "../ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="relative z-10 py-24 md:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,8,8,0) 0%, rgba(10,8,8,0.85) 18%, rgba(10,8,8,0.95) 100%)",
        }}
      ></div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 80% 40%, rgba(225, 49, 10, 0.10), transparent 60%)",
        }}
      ></div>

      <div className="container mx-auto px-4 md:px-10">
        <div className="p-4 md:p-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-red-500"></div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Get in touch</p>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-red-500 leading-tight">
              Tell us about your project
            </h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-16 max-w-2xl">
              Free quote, no pressure. The more you tell us up front, the faster we can come back with real numbers.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-12 lg:gap-20">
            <ContactForm />

            <aside className="lg:pt-1">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">Reach us directly</p>
              <div className="space-y-4">
                <div>
                  <p className="text-white/40 text-xs mb-1">Email</p>
                  <a
                    href="mailto:elitebrushco@gmail.com"
                    className="text-white hover:text-red-500 transition-colors duration-300"
                  >
                    elitebrushco@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1">Phone</p>
                  <a
                    href="tel:+12506405402"
                    className="block text-white hover:text-red-500 transition-colors duration-300"
                  >
                    (250) 640-5402 — Gaurav
                  </a>
                  <a
                    href="tel:+17782810166"
                    className="block text-white hover:text-red-500 transition-colors duration-300 mt-1"
                  >
                    (778) 281-0166 — Kavan
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <div className="text-center mt-20">
        <p className="text-white/30 text-[10px] uppercase tracking-[0.3em]">
          Powered by{" "}
          <a
            href="https://sahova.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors duration-300"
          >
            Sahova
          </a>
        </p>
      </div>
    </section>
  );
}
