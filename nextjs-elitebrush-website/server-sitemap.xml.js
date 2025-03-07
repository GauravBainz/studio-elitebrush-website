import { getServerSideSitemap } from 'next-sitemap'
import { client } from '../lib/sanity'

export const getServerSideProps = async (ctx) => {
  // Fetch your dynamic content from Sanity
  const posts = await client.fetch(`
    *[_type == "post"] {
      "slug": slug.current,
      _updatedAt
    }
  `)

  const fields = posts.map((post) => ({
    loc: `https://elitebrush.co/blog/${post.slug}`,
    lastmod: post._updatedAt,
    // Optional: Add priority and changefreq
    priority: 0.7,
    changefreq: 'weekly',
  }))

  return getServerSideSitemap(ctx, fields)
}

// This is needed to prevent Next.js from trying to render this page
export default function Sitemap() {}