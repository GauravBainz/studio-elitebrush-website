
import Link from "next/link";
import Image from 'next/image';
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { urlFor } from "@/lib/sanity/imageUrlBuilder";

// Updated query to use orderRank for sorting
const CONTENT_QUERY = `*[
  _type in ["painting", "epoxy"]
  && defined(slug.current)
]|order(orderRank)[0...12]{
  _id, 
  title, 
  slug, 
  publishedAt, 
  _type, 
  body,
  mainImage,
  images,
  orderRank,
  "image": image {
    asset->{
      _id,
      url
    }
  }
}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const content = await client.fetch<SanityDocument[]>(CONTENT_QUERY, {}, options);
  
  // Separate the content into paintings and epoxy
  const paintings = content.filter(item => item._type === "painting");
  const epoxyItems = content.filter(item => item._type === "epoxy");

  return (
    <main className="relative">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-white hover:text-red-500 transition-all">
            EliteBrush Co.
          </span>
        </Link>
        <div className="flex space-x-4">
          <Link
            href="/about"
            className="px-3 py-2 text-white transition-all hover:text-red-500">
              About
          </Link>
          <Link
            href="/contact"
            className="px-3 py-2 text-white transition-all hover:text-red-500">
            Contact
          </Link>
        </div>
      </nav>

      {/* Hero Section - Fullscreen */}
      <section className="h-screen flex flex-col items-center justify-center p-10 bg-black">
        <h1 className="text-6xl font-bold mb-6 text-center text-white">EliteBrush Co.</h1>
        <p className="text-2xl text-center mb-10" style={{
            color: 'white',
            textShadow: '0 0 13px white, 0 0 26px white, 0 0 39px white'
          }}>
          Elevate Your Space With Elite Precision
        </p>

        <div className="flex space-x-5">
          <a href="#paintings" className="px-9 py-5 border border-red-500 text-red-500 rounded-md hover:bg-red-50 hover:shadow-xl hover:shadow-red-500/100 hover:-translate-y-1 transition-all duration-300">
            Painting
          </a>
          <a href="#epoxy" className="px-9 py-5 border border-red-500 text-red-500 rounded-md hover:bg-red-50 hover:shadow-xl hover:shadow-red-500/100 hover:-translate-y-1 transition-all duration-300">
            Epoxy
          </a>
        </div>
      </section>

      {/* Painting Section - Fullscreen */}
      <section id="paintings" className="min-h-screen flex flex-col justify-center p-12 bg-black">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-white">Painting Projects</h2>
              <div className="w-20 h-1 bg-red-500"></div>
            </div>
            <Link href="/paintings" className="text-red-500 hover:underline text-lg">View All</Link>
          </div>

          {/* Painting Gallery - Grid Layout with 6 items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paintings.slice(0, 6).map((painting) => (
              <Link key={painting._id} href={`/${painting.slug.current}`} className="block group">
                <div className="relative overflow-hidden rounded-sm shadow-md h-full">
                  {painting.mainImage ? (
                    <div className="relative h-64">
                      <div className="relative w-full h-full">
                        <Image
                          src={urlFor(painting.mainImage).width(500).height(400).url()}
                          alt={painting.title || "Painting image"}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdQJhYUwl8wAAAABJRU5ErkJggg=="
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ) : painting.image && painting.image.asset ? (
                    <div className="relative h-64">
                      <div className="relative w-full h-full">
                        <Image
                          src={urlFor(painting.image).width(500).height(400).url()}
                          alt={painting.title || "Painting image"}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdQJhYUwl8wAAAABJRU5ErkJggg=="
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ) : (
                    <div className="relative h-64 bg-gray-800 flex items-center justify-center">
                      <p className="text-gray-400">Image processing...</p>
                    </div>
                  )}
                  <div className="absolute bottom-0  right-0 p-3">
                    <h3 className="text-base font-semibold text-white group-hover:text-red-400 transition-colors drop-shadow-md">{painting.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Epoxy Section - Fullscreen */}
      <section id="epoxy" className="min-h-screen flex flex-col justify-center p-12 bg-black">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-white">Epoxy Projects</h2>
              <div className="w-20 h-1 bg-red-500"></div>
            </div>
            <Link href="/epoxy" className="text-red-500 hover:underline text-lg">View All</Link>
          </div>
          
          {/* Epoxy Gallery - Grid Layout with 6 items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {epoxyItems.slice(0, 6).map((epoxy) => (
                <Link key={epoxy._id} href={`/${epoxy.slug.current}`} className="block group">
                  <div className="relative overflow-hidden rounded-lg shadow-md h-full">
                    {epoxy.mainImage ? (
                      <div className="relative h-64">
                        <div className="relative w-full h-full">
                          <Image
                            src={urlFor(epoxy.mainImage).width(500).height(400).url()}
                            alt={epoxy.title || "Epoxy project image"}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdQJhYUwl8wAAAABJRU5ErkJggg=="
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ) : epoxy.image && epoxy.image.asset ? (
                      <div className="relative h-64">
                        <div className="relative w-full h-full">
                          <Image
                            src={urlFor(epoxy.image).width(500).height(400).url()}
                            alt={epoxy.title || "Epoxy project image"}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdQJhYUwl8wAAAABJRU5ErkJggg=="
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ) : (
                      <div className="relative h-64 bg-gray-800 flex items-center justify-center">
                        <p className="text-gray-400">Image processing...</p>
                      </div>
                    )}
                    <div className="absolute bottom-0  right-0 p-3">
                    <h3 className="text-base font-semibold text-white group-hover:text-red-400 transition-colors drop-shadow-md">{epoxy.title}</h3>
                  </div>
                  </div>
                </Link>
              ))}
            </div>
        </div>
      </section>
      
      {/* Call-to-Action Section - Fullscreen */}
      <section className="h-screen flex flex-col items-center justify-center p-10 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6 text-white">Ready to Transform Your Space?</h3>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-300">
            Contact us today for a free quote on your next painting or epoxy project.
            We bring your vision to life with elite precision and craftsmanship.
          </p>
          <Link
            href="/contact"
            className="px-10 py-5 bg-red-500 text-white text-lg rounded-md hover:bg-red-600 transition-colors"
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
                      <Image 
                        src="/images/instagram-logo.jpg" 
                        alt="Instagram" 
                        width={28} 
                        height={28} 
                        className="object-contain"
                      />
                    </a>
        </div>
        <p className="text-gray-400">© {new Date().getFullYear()} EliteBrush Co. All rights reserved.</p>
      </footer>
    </main>
  );
}