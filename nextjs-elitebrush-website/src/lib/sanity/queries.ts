export const portfolioQuery = (type: "painting" | "epoxy") => `*[
  _type == "${type}"
  && defined(slug.current)
]|order(orderRank asc){
  _id,
  title,
  slug,
  publishedAt,
  body,
  mainImages[] {
    asset->{ _id, url },
    alt,
    caption
  },
  beforeAfterImages {
    before { asset->{ _id, url } },
    after { asset->{ _id, url } }
  }
}`;

export const detailQuery = `*[
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
    asset->{ _id, url }
  }
}`;

export const testimonialsQuery = `*[
  _type == "testimonial"
]|order(orderRank asc){
  _id,
  name,
  role,
  text
}`;

export const sanityFetchOptions = { next: { revalidate: 30 } };
