import Image from "next/image";
import Link from "next/link";

interface ServiceBlockProps {
  image: string;
  alt: string;
  title: string;
  description: string;
  offerings: string;
  href: string;
  ctaLabel: string;
}

function ServiceBlock({ image, alt, title, description, offerings, href, ctaLabel }: ServiceBlockProps) {
  return (
    <div>
      <Link href={href} className="block overflow-hidden aspect-[4/3] mb-6 group">
        <Image
          src={image}
          alt={alt}
          width={600}
          height={450}
          className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </Link>
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{title}</h3>
      <p className="text-white/80 leading-relaxed mb-5 max-w-md">{description}</p>
      <p className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-white/50 mb-6">
        {offerings}
      </p>
      <Link
        href={href}
        className="group inline-flex items-center gap-3 text-white text-xs uppercase tracking-[0.25em] hover:text-red-500 transition-colors duration-300"
      >
        <span>{ctaLabel}</span>
        <svg
          className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative z-10 py-20">
      <div className="container mx-auto px-4 md:px-10">
        <div className="absolute inset-0 bg-black/90"></div>

        <div className="relative z-10 p-4 md:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-red-500"></div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Services</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-red-500">What we do</h2>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <ServiceBlock
              image="/images/house-services.jpg"
              alt="Recent painting project by Elite Brush"
              title="Painting"
              description="Interior, exterior, residential, commercial. Whether it&apos;s a single room or a full repaint, we treat every wall like it&apos;s our own."
              offerings="Interior · Exterior · Limewash · Commercial"
              href="/paintings"
              ctaLabel="View painting work"
            />
            <ServiceBlock
              image="/images/HubertMetallic.JPG"
              alt="Metallic epoxy floor by Elite Brush"
              title="Epoxy Flooring"
              description="Garages, basements, breezeways, commercial spaces. Durable finishes that hold up to real life and still look unreal."
              offerings="Flake · Solid Metallic · Multi-Color Metallic"
              href="/epoxy"
              ctaLabel="View epoxy work"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
