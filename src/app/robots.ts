import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/checkout/',
        '/cart/',
        '/wishlist/',
        '/account/',
      ],
    },
    sitemap: 'https://furniro.com/sitemap.xml',
  }
} 