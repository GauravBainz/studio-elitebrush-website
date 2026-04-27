import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { portfolioQuery, sanityFetchOptions } from "@/lib/sanity/queries";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import GallerySection from "@/app/components/GallerySection";
import BeforeAfterGrid from "@/app/components/BeforeAfterGrid";
import ServiceHero from "@/app/components/ServiceHero";
import ServiceCTA from "@/app/components/ServiceCTA";
import PaintingServicesScroll from "@/app/components/PaintingServicesScroll";
import SubpageBackground from "@/app/components/SubpageBackground";

export default async function PaintingsPage() {
  const paintings = await client.fetch<SanityDocument[]>(
    portfolioQuery("painting"),
    {},
    sanityFetchOptions
  );

  const projectsWithSliders = paintings.filter(
    (p) => p.beforeAfterImages?.before && p.beforeAfterImages?.after
  );
  const portfolioProjects = paintings.filter(
    (p) => Array.isArray(p.mainImages) && p.mainImages.length > 0
  );

  return (
    <main className="relative min-h-screen isolate">
      <SubpageBackground />
      <Navigation variant="subpage" />

      <ServiceHero heading="Painting" />

      <PaintingServicesScroll />

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
        heading="Ready to transform your space?"
        body="Tell us about your project and we'll get back with a free, detailed quote — no pressure, no upsell."
      />

      <Footer />
    </main>
  );
}
