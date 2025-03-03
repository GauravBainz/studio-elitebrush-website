import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/client';

// Create a Sanity image URL builder instance
const builder = imageUrlBuilder(client);

// Define proper type for the image reference
interface SanityImageReference {
  asset: {
    _ref: string;
    _type: string;
  };
}

// Generate image URLs from Sanity image references
export function urlFor(source: SanityImageReference) {
  return builder.image(source);
}