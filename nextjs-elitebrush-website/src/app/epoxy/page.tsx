import Image from "next/image";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { portfolioQuery, sanityFetchOptions } from "@/lib/sanity/queries";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import GallerySection from "@/app/components/GallerySection";
import ServiceHero from "@/app/components/ServiceHero";
import ServiceCTA from "@/app/components/ServiceCTA";
import SubpageBackground from "@/app/components/SubpageBackground";
import BeforeAfterGrid from "@/app/components/BeforeAfterGrid";

const EPOXY_TYPES = [
  {
    image: "/images/flakesystem.jpeg",
    name: "Flake System",
    description:
      "High-performance decorative flake flooring with unmatched durability and a unique, vibrant finish. Garages, basements, workshops — built for real life.",
  },
  {
    image: "/images/one-colour-metallic.jpeg",
    name: "Solid Colour Metallic",
    description:
      "Seamless, high-gloss finish with metallic pigments that create a swirling, one-of-a-kind effect. Striking aesthetic with serious staying power.",
  },
  {
    image: "/images/metallic.jpeg",
    name: "Multi-Color Metallic",
    description:
      "Vibrant pigments blended for depth and movement — a floor that genuinely turns heads. Each one is unique to the space; no two come out the same.",
  },
];

export default async function EpoxyPage() {
  const epoxyProjects = await client.fetch<SanityDocument[]>(
    portfolioQuery("epoxy"),
    {},
    sanityFetchOptions
  );

  const portfolioProjects = epoxyProjects.filter(
    (p) => Array.isArray(p.mainImages) && p.mainImages.length > 0
  );

  const projectsWithSliders = epoxyProjects.filter(
    (p) => p.beforeAfterImages?.before && p.beforeAfterImages?.after
  );

  return (
    <main className="relative min-h-screen isolate">
      <SubpageBackground />
      <Navigation variant="subpage" />

      <ServiceHero heading="Epoxy" />

      <section className="relative z-10 pt-2 pb-16 md:pt-4 md:pb-20">
        <div className="container mx-auto px-4 md:px-10">
          <div className="p-4 md:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-red-500"></div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Systems we install</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-red-500">Epoxy types</h2>

            <div className="grid md:grid-cols-3 gap-10 md:gap-12">
              {EPOXY_TYPES.map((type) => (
                <div key={type.name}>
                  <div className="overflow-hidden aspect-[4/3] mb-5">
                    <Image
                      src={type.image}
                      alt={type.name}
                      width={600}
                      height={450}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{type.name}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {projectsWithSliders.length > 0 && (
        <section id="transformations" className="relative z-10 pt-6 pb-16 md:pt-8 md:pb-20">
          <div className="container mx-auto px-4 md:px-10">
            <div className="p-4 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-red-500"></div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">See the difference</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-red-500">
                Before &amp; After
              </h2>

              <BeforeAfterGrid projects={projectsWithSliders} />
            </div>
          </div>
        </section>
      )}

      <GallerySection projects={portfolioProjects} />

      <ServiceCTA
        heading="Ready to upgrade your floors?"
        body="Tell us about your space and we'll get back with a free, detailed quote — no pressure, no upsell."
      />

      <Footer />
    </main>
  );
}
