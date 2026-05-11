import { getServerSideSitemap } from 'next-sitemap'

export async function GET(request) {
  // Array of slugs for the dynamic blog posts as requested
  const posts = [
    'uk-spouse-visa-requirements-2026',
    'uk-immigration-bail-explained',
    'uk-visa-fees-increase-2026',
    'uk-genuine-visitor-rule-explained',
  ]

  const fields = posts.map((slug) => ({
    loc: `https://www.immigrationlaw.org.uk/blog/${slug}`,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 0.7,
  }))

  return getServerSideSitemap(fields)
}
