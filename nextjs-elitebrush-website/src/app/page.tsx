import Navigation from "./components/Navigation";
import VideoBackground from "./components/sections/VideoBackground";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import TestimonialsScroll, { type Testimonial } from "./components/sections/TestimonialsScroll";
import ContactSection from "./components/sections/ContactSection";
import { client } from "@/sanity/client";
import { testimonialsQuery, sanityFetchOptions } from "@/lib/sanity/queries";

export default async function HomePage() {
  const testimonials = await client.fetch<Testimonial[]>(
    testimonialsQuery,
    {},
    sanityFetchOptions
  );

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <VideoBackground />
      <Navigation variant="home" />
      <Hero />
      <About />
      <Services />
      <TestimonialsScroll testimonials={testimonials} />
      <ContactSection />
    </div>
  );
}
