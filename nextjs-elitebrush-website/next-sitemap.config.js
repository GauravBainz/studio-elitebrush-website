/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://elitebrush.co',
    generateRobotsTxt: true,
    exclude: ['/admin', '/studio'],
    robotsTxtOptions: {
      additionalSitemaps: [
        'https://elitebrush.co/server-sitemap.xml',
      ],
    },
  }