import Link from "next/link";
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <div className="absolute top-4 left-4">
      <Link href="/">
          <span className="text-white hover:text-red-500 transition-all">
            EliteBrush Co.
          </span>
        </Link>
      </div>
      
      <div className="absolute top-4 right-4">
        <Link 
          href="/contact" 
          className="px-5 py-2 text-white rounded-md transition-all 
                    hover:text-red-500 hover:text-shadow-lg">
          Contact
        </Link>
      </div>
      
      <section className="mt-24">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Story</h1>
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-red-500">Who We Are</h2>
            <p className="mb-4">
              Founded in 2018, EliteBrush Co. has been transforming spaces across the region with our premium painting and epoxy solutions. What started as a passion project has grown into a full-service company dedicated to excellence in every brushstroke.
            </p>
            <p className="mb-4">
              Our team of skilled artisans combines years of experience with an eye for detail that elevates every project we undertake. We believe that your space deserves more than just a coat of paint – it deserves a transformation that reflects your unique style and vision.
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-red-500">Our Approach</h2>
            <p className="mb-4">
              At EliteBrush Co., we approach each project with precision and care. We begin with a detailed consultation to understand your goals, followed by meticulous preparation and execution that ensures stunning, long-lasting results.
            </p>
            <p className="mb-4">
              Whether we're applying rich, even coats of premium paint or creating custom epoxy masterpieces that transform ordinary surfaces into extraordinary features, our commitment to quality remains unwavering.
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-red-500">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-medium mb-2">Premium Painting</h3>
                <p>Interior and exterior painting services for residential and commercial spaces using only the highest quality materials.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-medium mb-2">Custom Epoxy</h3>
                <p>Stunning epoxy treatments for floors, countertops, and decorative elements that combine durability with artistic expression.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-medium mb-2">Color Consultation</h3>
                <p>Expert guidance to help you select the perfect palette for your space, considering lighting, architecture, and personal style.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-medium mb-2">Surface Preparation</h3>
                <p>Comprehensive preparation services including repairs, priming, and surface treatment to ensure flawless application.</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-red-500">Our Promise</h2>
            <p className="mb-4">
              We promise to deliver exceptional craftsmanship, transparent communication, and results that exceed your expectations. Every project we complete is a reflection of our dedication to our craft and our clients.
            </p>
            <div className="mt-6 text-center">
              <Link 
                href="/contact" 
                className="px-8 py-4 border border-red-500 text-red-500 rounded-md hover:bg-red-50 hover:shadow-xl hover:shadow-red-500/100 hover:-translate-y-1 transition-all duration-300"
              >
                Let's Work Together
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}