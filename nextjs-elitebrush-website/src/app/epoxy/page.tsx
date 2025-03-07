import Link from "next/link";
import Image from 'next/image';
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { urlFor } from "@/lib/sanity/imageUrlBuilder";
import BeforeAfterSlider from "@/app/components/BeforeAfterSlider";

// Query to fetch all epoxy content
const EPOXY_QUERY = `*[
  _type == "epoxy"
  && defined(slug.current)
]|order(orderRank desc){
  _id, 
  title, 
  slug, 
  publishedAt, 
  body,
  beforeAfterImages {
    before {
      asset->{
        _id,
        url
      }
    },
    after {
      asset->{
        _id,
        url
      }
    }
  }
}`;

const options = { next: { revalidate: 30 } };

export default async function EpoxyPage() {
  const epoxyProjects = await client.fetch<SanityDocument[]>(EPOXY_QUERY, {}, options);

  // Filter to only include epoxy projects with before/after images
  const projectsWithSliders = epoxyProjects.filter(
    project => project.beforeAfterImages && 
    project.beforeAfterImages.before && 
    project.beforeAfterImages.after
  );

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-black/90 to-red-500">
      {/* Fixed Navigation - now transparent */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-10 py-4">           
          <div className="flex justify-between items-center">             
            {/* Logo Area - No background */}             
            <div className="flex-shrink-0">               
              <Link href="/">                 
                <div className="text-white text-2xl font-bold">                   
                  <Image                     
                    src="/images/elite-logo-nobg.png"                     
                    alt="Elite Brush Co. Logo"                     
                    width={140}                     
                    height={40}                     
                    className="object-contain"                   
                  />                 
                </div>               
              </Link>             
            </div>              
            
            {/* Desktop Navigation - enclosed in black rectangle with blur */}             
            <nav className="hidden md:block">               
              <div className="bg-black/60 backdrop-blur-lg rounded-full px-8 py-3 border border-gray-700/50">                 
                <ul className="flex items-center space-x-10 text-white font-medium">                 
                  <li>                     
                    <Link href="/#painting" className="relative group py-2 px-1">                       
                      <span className="relative z-10 transition-colors group-hover:text-red-500">Painting</span>                       
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>                     
                    </Link>                   
                  </li>                 
                  <li>                     
                    <Link href="/#epoxy" className="relative group py-2 px-1">                       
                      <span className="relative z-10 transition-colors group-hover:text-red-500">Epoxy</span>                       
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>                     
                    </Link>                   
                  </li>                   
                  <li>                     
                    <Link href="/#contact" className="relative group py-2 px-1">                       
                      <span className="relative z-10 transition-colors group-hover:text-red-500">Contact</span>                       
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>                     
                    </Link>                   
                  </li>                   
                  <li>                     
                    <Link href="/#about" className="relative group py-2 px-1">                       
                      <span className="relative z-10 transition-colors group-hover:text-red-500">About</span>                       
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>                     
                    </Link>                   
                  </li>                 
                </ul>               
              </div>             
            </nav>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-12">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-center mb-8">
              <Link href="/" className="text-white/80 hover:text-white flex items-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                Home
              </Link>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Before & After Epoxy Transformations</h1>
            <div className="w-20 h-1 bg-white mb-6"></div>
            <p className="text-xl text-white/80 max-w-3xl">
              See the dramatic difference our epoxy services make with these before and after comparisons.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery of Before/After Sliders */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          {/* Grid of all sliders */}
          {projectsWithSliders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {projectsWithSliders.map((project) => (
                <div key={project._id} className="bg-black/20 p-6 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-bold text-white text-center mb-6">{project.title || "See The Difference"}</h3>
                  <BeforeAfterSlider
                    beforeImage={urlFor(project.beforeAfterImages.before).url()}
                    afterImage={urlFor(project.beforeAfterImages.after).url()}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-white text-xl">
              Coming Soon! Stay Tuned!
            </div>
          )}
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-5xl mx-auto bg-black/40 backdrop-blur-lg p-8 md:p-12 border border-white/10">
            <h2 className="text-4xl font-bold text-center text-white mb-2">Ready to Transform Your Space?</h2>
            <p className="text-xl text-center text-white/80 mb-10">
              Contact us today for a free quote on your next epoxy project.
              We bring your vision to life with elite precision and craftsmanship.
            </p>
            <div className="flex justify-center">
              <Link
                href="/#contact"
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-lg rounded-lg transition duration-300 transform hover:scale-105"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 text-center border-t border-white/10 bg-black">
        <div className="container mx-auto">
          <div className="flex justify-center space-x-6 mb-6">
            <a href="https://www.facebook.com/profile.php?id=61568642015108" className="text-white/70 hover:text-red-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/elitebrushco/" className="text-white/70 hover:text-red-500 transition-colors">
              <Image 
                src="/images/instagram-logo.jpg" 
                alt="Instagram" 
                width={28} 
                height={28} 
                className="object-contain"
              />
            </a>
          </div>
          <p className="text-white/70">© {new Date().getFullYear()} EliteBrush Co. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}