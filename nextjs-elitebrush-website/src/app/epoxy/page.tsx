import Link from "next/link";
import Image from 'next/image';
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { urlFor } from "@/lib/sanity/imageUrlBuilder";

// Query to fetch all epoxy content
const EPOXY_QUERY = `*[
  _type == "epoxy"
  && defined(slug.current)
]|order(publishedAt desc){
  _id, 
  title, 
  slug, 
  publishedAt, 
  body,
  mainImage,
  "image": image {
    asset->{
      _id,
      url
    }
  }
}`;

const options = { next: { revalidate: 30 } };

export default async function EpoxyPage() {
  const epoxyProjects = await client.fetch<SanityDocument[]>(EPOXY_QUERY, {}, options);

  return (
    <main className="relative pt-24 min-h-screen bg-black">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-black">
        <Link href="/">
          <Image 
            src="/images/logo.png" 
            alt="EliteBrush Co." 
            width={150} 
            height={43} 
            style={{ height: 'auto', maxHeight: '43px' }} 
          />
        </Link>
        <div className="flex space-x-6">
          <Link 
            href="/about" 
            className="px-3 py-2 text-white transition-all hover:text-red-500">
            Our Story
          </Link>
          <Link 
            href="/contact" 
            className="px-3 py-2 text-white transition-all hover:text-red-500">
            Contact
          </Link>
        </div>
      </nav>

      {/* Page Header */}
      <div className="max-w-7xl mx-auto w-full px-6 mb-12">
        <div className="flex items-center mb-8">
          <Link href="/" className="text-gray-400 hover:text-red-500 flex items-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            Home
          </Link>
          <h1 className="text-4xl font-bold text-white">All Epoxy Projects</h1>
        </div>
        <div className="w-20 h-1 bg-red-500 mb-8"></div>
      </div>

      {/* Epoxy Gallery - Grid Layout */}
      <div className="max-w-7xl mx-auto w-full px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {epoxyProjects.map((epoxy) => (
            <Link key={epoxy._id} href={`/${epoxy.slug.current}`} className="block group">
              <div className="relative overflow-hidden rounded-lg shadow-md h-full">
                {epoxy.mainImage ? (
                  <div className="relative h-64">
                    <img
                      src={urlFor(epoxy.mainImage).width(500).height(400).url()}
                      alt={epoxy.title || "Epoxy project image"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ) : epoxy.image && epoxy.image.asset && (
                  <div className="relative h-64">
                    <img
                      src={urlFor(epoxy.image).width(500).height(400).url()}
                      alt={epoxy.title || "Epoxy project image"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}
                <div className="absolute bottom-0 right-0 p-3">
                    <h3 className="text-base font-semibold text-white group-hover:text-red-400 transition-colors drop-shadow-md">{epoxy.title}</h3>
                 </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Call-to-Action */}
      <section className="py-16 px-6 bg-black border-t border-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Transform Your Space?</h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-300">
            Contact us today for a free quote on your next epoxy project.
            We bring your vision to life with elite precision and craftsmanship.
          </p>
          <Link
            href="/contact"
            className="px-8 py-4 bg-red-500 text-white text-lg rounded-md hover:bg-red-600 transition-colors"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-7 px-10 text-center border-t border-gray-800 bg-black">
        <div className="flex justify-center space-x-6 mb-6">
          <a href="https://www.facebook.com/profile.php?id=61568642015108" className="text-gray-400 hover:text-red-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>
          <a href="https://www.instagram.com/elitebrushco/" className="text-gray-400 hover:text-red-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
            </svg>
          </a>
        </div>
        <p className="text-gray-400">© {new Date().getFullYear()} EliteBrush Co. All rights reserved.</p>
      </footer>
    </main>
  );
}