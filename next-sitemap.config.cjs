/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.immigrationlaw.org.uk',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'], // exclude dynamic sitemap from static generation
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.immigrationlaw.org.uk/server-sitemap.xml', // dynamic sitemap
    ],
  },
  // Manually include additional paths as requested
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/about'),
    await config.transform(config, '/processing-times'),
    await config.transform(config, '/update'),
    await config.transform(config, '/blog'),
    await config.transform(config, '/privacy-policy'),
    await config.transform(config, '/genuine-visitor-rule'),
  ],
}
