import { client } from "@/sanity/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import ImageCarousel from "./ImageCarousel";

export default async function ContentPage({ params }: { params: { slug: string } }) {
  // Query to fetch mainImage and additional images
  const query = `*[
    ((_type == "painting" || _type == "epoxy") && slug.current == $slug)
  ][0]{
    _id,
    title,
    slug,
    publishedAt,
    _type,
    body,
    mainImage,
    images,
    "image": image {
      asset->{
        _id,
        url
      }
    }
  }`;
  
  const content = await client.fetch(query, { slug: params.slug });

  // Return 404 if no content is found
  if (!content) {
    return notFound();
  }

  // Determine content type
  const isPainting = content._type === "painting";
  const isEpoxy = content._type === "epoxy";

  // Check if we should use legacy "image" field or the new mainImage/images structure
  const hasNewImageStructure = !!content.mainImage;
  
  // Prepare images for carousel
  let mainImage = content.mainImage;
  let additionalImages = content.images || [];
  
  // If using legacy image structure, convert it to work with our new carousel
  if (!hasNewImageStructure && content.image && content.image.asset) {
    mainImage = {
      asset: {
        _ref: content.image.asset._id,
        _type: "reference"
      }
    };
    additionalImages = [];
  }

  return (
    <main className="pt-16 pb-16 bg-black min-h-screen">
      <div className="container mx-auto max-w-5xl px-5">
        {/* Back link - Improved spacing */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="text-gray-400 hover:text-red-500 flex items-center group transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-2 group-hover:-translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            Back to all {isPainting ? "paintings" : "epoxy projects"}
          </Link>
        </div>
        
        {/* Title - Improved typography */}
        <h1 className="text-4xl font-bold mb-3 text-white tracking-tight">{content.title}</h1>
        <p className="text-gray-400 mb-10 text-lg">
          {isPainting ? "Painting" : "Epoxy Project"}
        </p>
        
        {/* Image carousel */}
        {(mainImage || additionalImages.length > 0) && (
          <ImageCarousel 
            mainImage={mainImage} 
            additionalImages={additionalImages} 
          />
        )}
        
        {/* Render content body - Improved spacing and typography */}
        {content.body && (
          <div className="prose prose-invert max-w-none mt-10 mx-auto px-5 sm:px-0">
            {content.body.map((block: any, index: number) => (
              <p key={index} className="mb-5 text-gray-200 text-lg leading-relaxed">
                {block.children?.map((child: any, childIndex: number) => (
                  <span key={childIndex}>{child.text}</span>
                ))}
              </p>
            ))}
          </div>
        )}

        {/* Call to action - Improved spacing and styling */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-semibold mb-6 text-white">Interested in a similar project?</h3>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all shadow-lg hover:shadow-xl"
          >
            Get a Free Quote
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}