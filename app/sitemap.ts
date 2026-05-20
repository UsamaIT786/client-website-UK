import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.immigrationlaw.org.uk';

  // Base list of static paths
  const staticPaths = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/processing-times`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/update`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/genuine-visitor-rule`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
  ];

  // Dynamic active blogs
  const activeBlogs = [
    'uk-spouse-visa-requirements-2026',
    'uk-immigration-bail-explained',
    'uk-genuine-visitor-rule-explained',
  ].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Target new blog post with explicit lastModified and priority
  const continuousResidenceBlog = {
    url: `${baseUrl}/blog/continuous-residence-absences-uk-settlement`,
    lastModified: new Date('2026-05-14'),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  };

  return [...staticPaths, ...activeBlogs, continuousResidenceBlog];
}
