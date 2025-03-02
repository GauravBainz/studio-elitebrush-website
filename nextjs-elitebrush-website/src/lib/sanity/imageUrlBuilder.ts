import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/client';

// Create the image URL builder using your Sanity client
const builder = imageUrlBuilder(client);

// Function to generate image URLs with optional transformations
export function urlFor(source: any) {
  return builder.image(source);
}