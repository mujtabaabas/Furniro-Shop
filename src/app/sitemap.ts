import { MetadataRoute } from 'next'
import { sanityClient } from '@/sanity/lib/client'

async function getProducts() {
  const query = `*[_type == "product"] {
    slug,
    _updatedAt
  }`
  return await sanityClient.fetch(query)
}

async function getCategories() {
  const query = `*[_type == "category"] {
    slug,
    _updatedAt
  }`
  return await sanityClient.fetch(query)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://furniro.com'
  
  // Get dynamic routes
  const products = await getProducts()
  const categories = await getCategories()

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Dynamic product routes
  const productRoutes = products.map((product: any) => ({
    url: `${baseUrl}/product/${product.slug.current}`,
    lastModified: new Date(product._updatedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // Dynamic category routes
  const categoryRoutes = categories.map((category: any) => ({
    url: `${baseUrl}/category/${category.slug.current}`,
    lastModified: new Date(category._updatedAt),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...productRoutes, ...categoryRoutes]
} 