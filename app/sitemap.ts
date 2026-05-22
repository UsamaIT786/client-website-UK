import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.immigrationlaw.org.uk';

  return [
    // 1. Core Static Pages
    { 
      url: `${baseUrl}`, 
      lastModified: new Date(), 
      changeFrequency: 'daily' as const, 
      priority: 1.0 
    },
    { 
      url: `${baseUrl}/about`, 
      lastModified: new Date(), 
      changeFrequency: 'monthly' as const, 
      priority: 0.8 
    },
    { 
      url: `${baseUrl}/processing-times`, 
      lastModified: new Date(), 
      changeFrequency: 'weekly' as const, 
      priority: 0.8 
    },
    { 
      url: `${baseUrl}/update`, 
      lastModified: new Date(), 
      changeFrequency: 'weekly' as const, 
      priority: 0.8 
    },
    { 
      url: `${baseUrl}/blog`, 
      lastModified: new Date(), 
      changeFrequency: 'weekly' as const, 
      priority: 0.8 
    },
    { 
      url: `${baseUrl}/genuine-visitor-rule`, 
      lastModified: new Date(), 
      changeFrequency: 'monthly' as const, 
      priority: 0.8 
    },
    { 
      url: `${baseUrl}/privacy-policy`, 
      lastModified: new Date(), 
      changeFrequency: 'monthly' as const, 
      priority: 0.5 
    },

    // 2. Individual Blog Posts (Strictly isolated to fix Bug 1 & Bug 2)
    {
      url: `${baseUrl}/blog/uk-immigration-bail-explained`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7
    },
    {
      url: `${baseUrl}/blog/uk-genuine-visitor-rule-explained`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7
    },
    {
      // BUG 2 FIX: Decoupled string and clean standalone Date object
      url: `${baseUrl}/blog/uk-spouse-visa-requirements-2026`,
      lastModified: new Date('2026-05-20'),
      changeFrequency: 'weekly' as const,
      priority: 0.7
    },
    {
      url: `${baseUrl}/blog/continuous-residence-absences-uk-settlement`,
      lastModified: new Date('2026-05-14'),
      changeFrequency: 'weekly' as const,
      priority: 0.7
    },
    {
      url: `${baseUrl}/blog/uk-immigration-visa-routes-guide`,
      lastModified: new Date('2026-05-21'),
      changeFrequency: 'monthly' as const,
      priority: 0.7
    }
  ];
}