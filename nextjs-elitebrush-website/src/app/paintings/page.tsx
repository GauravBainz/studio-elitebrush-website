import Link from "next/link";
import Image from 'next/image';
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { urlFor } from "@/lib/sanity/imageUrlBuilder";
import BeforeAfterSlider from "@/app/components/BeforeAfterSlider";
import GallerySection from "@/app/components/GallerySection"; // Import the new component

// Updated query to fetch mainImages array instead of single mainImage
const PAINTINGS_QUERY = `*[
  _type == "painting"
  && defined(slug.current)
]|order(orderRank desc){
  _id, 
  title, 
  slug, 
  publishedAt, 
  body,
  mainImages[] {
    asset->{
      _id,
      url
    },
    alt,
    caption
  },
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

export default async function PaintingsPage() {
  const paintings = await client.fetch<SanityDocument[]>(PAINTINGS_QUERY, {}, options);

  // Filter to only include paintings with before/after images
  const paintingsWithSliders = paintings.filter(
    painting => painting.beforeAfterImages && 
    painting.beforeAfterImages.before && 
    painting.beforeAfterImages.after
  );

  // Filter to get paintings with main images for portfolio display
  const portfolioPaintings = paintings.filter(
    painting => painting.mainImages && Array.isArray(painting.mainImages) && painting.mainImages.length > 0
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

      {/* Hero Section with Gallery Navigation Tabs */}
      <section className="relative z-10 pt-32 pb-12">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-center mb-8">
            
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Our Work</h1>
            <div className="w-20 h-1 bg-white mb-6"></div>
            <p className="text-xl text-white/80 max-w-3xl mb-10">
              Browse our transformative painting services and see the quality of our craftsmanship.
            </p>
            
            {/* Updated Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
              {/* Gallery Button */}
              <a 
                href="#portfolio" 
                className="group relative flex items-center justify-center px-8 py-4 bg-black/40 text-white font-semibold text-lg rounded-xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Icon */}
                <span className="absolute left-6 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 transition-all duration-300 group-hover:bg-red-500 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                
                {/* Text */}
                <span className="ml-10 mr-4 transition-all duration-300 group-hover:translate-x-1">View Gallery</span>
                
                {/* Arrow indicator */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                
                {/* Hover effect overlay */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600/80 to-red-800/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>

              {/* Before & After Button */}
              <a 
                href="#transformations" 
                className="group relative flex items-center justify-center px-8 py-4 bg-red-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Icon */}
                <span className="absolute left-6 flex items-center justify-center w-10 h-10 rounded-full bg-white/20 transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </span>
                
                {/* Text */}
                <span className="ml-10 mr-4 transition-all duration-300 group-hover:translate-x-1">See Transformations</span>
                
                {/* Arrow indicator */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                
                {/* Hover effect overlay */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-700/80 to-red-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Use the new Gallery Component that includes the View More functionality */}
      <GallerySection portfolioPaintings={portfolioPaintings} />

      {/* Separator with Enhanced Back-to-Top Link */}
      <div className="relative py-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center">
          <a 
            href="#" 
            className="px-8 py-3 bg-black/50 backdrop-blur-md text-white text-sm font-medium rounded-full transition-all duration-300 hover:bg-red-600 border border-white/20 hover:border-red-400 hover:shadow-lg hover:shadow-red-500/20 transform hover:-translate-y-1 group"
          >
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform transition-transform group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Back to Top
            </span>
          </a>
        </div>
      </div>

      {/* SECTION 2: Before & After Transformations - Keep as is */}
     {/* Updated Before & After Transformations Section */}
<section id="transformations" className="py-16 px-6">
  <div className="container mx-auto">
    <h2 className="text-3xl font-bold text-white mb-8 text-center">Before & After</h2>
    
    {/* Grid of all sliders */}
    {paintingsWithSliders.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {paintingsWithSliders.map((painting) => (
          <div key={painting._id} className="transform transition duration-300">
            <h3 className="text-xl font-medium text-white mb-3 pl-1">{painting.title || "Transformation"}</h3>
            <BeforeAfterSlider
              beforeImage={urlFor(painting.beforeAfterImages.before).url()}
              afterImage={urlFor(painting.beforeAfterImages.after).url()}
            />
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center text-white text-xl">
        No before/after transformations found.
      </div>
    )}
  </div>
</section>

      {/* Call-to-Action - Keep consistent with the gradient theme */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-5xl mx-auto bg-black/40 backdrop-blur-lg p-8 md:p-12 border border-white/10">
            <h2 className="text-4xl font-bold text-center text-white mb-2">Ready to Transform Your Space?</h2>
            <p className="text-xl text-center text-white/80 mb-10">
              Contact us today for a free quote on your next painting project.
              We bring your vision to life with elite precision and craftsmanship.
            </p>
            <div className="flex justify-center">
              <Link
                href="/#contact"
                className="px-10 py-5 bg-red-600 hover:bg-red-700 text-white text-lg rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-red-700/30 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get a Free Quote
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></span>
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