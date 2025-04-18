import { groq } from 'next-sanity'
import { sanityClient } from './client'

// Get all products
export const getAllProducts = async () => {
  const query = groq`*[_type == "product"]{
    _id,
    name,
    slug,
    price,
    discount,
    description,
    images,
    category->{name, slug},
    subcategory->{name, slug},
    features,
    dimensions,
    materials,
    colors,
    stock,
    isFeatured,
    isNew,
    rating
  }`
  return await sanityClient.fetch(query)
}

// Get featured products
export const getFeaturedProducts = async () => {
  const query = groq`*[_type == "product" && isFeatured == true]{
    _id,
    name,
    slug,
    price,
    discount,
    images,
    category->{name, slug},
    isNew,
    rating
  }`
  return await sanityClient.fetch(query)
}

// Get new arrivals
export const getNewArrivals = async () => {
  const query = groq`*[_type == "product" && isNew == true]{
    _id,
    name,
    slug,
    price,
    discount,
    images,
    category->{name, slug},
    isFeatured,
    rating
  }`
  return await sanityClient.fetch(query)
}

// Get all categories
export const getAllCategories = async () => {
  const query = groq`*[_type == "category"]{
    _id,
    name,
    slug,
    description,
    image,
    order
  } | order(order asc)`
  return await sanityClient.fetch(query)
}

// Get all subcategories
export const getAllSubcategories = async () => {
  const query = groq`*[_type == "subcategory"]{
    _id,
    name,
    slug,
    category->{name, slug},
    description,
    image
  }`
  return await sanityClient.fetch(query)
}

// Get active banners
export const getActiveBanners = async () => {
  const query = groq`*[_type == "banner" && isActive == true]{
    _id,
    title,
    subtitle,
    description,
    image,
    buttonText,
    buttonLink,
    order
  } | order(order asc)`
  return await sanityClient.fetch(query)
}

// Get single product by slug
export const getProductBySlug = async (slug: string) => {
  const query = groq`*[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    price,
    discount,
    description,
    images,
    category->{name, slug},
    subcategory->{name, slug},
    features,
    dimensions,
    materials,
    colors,
    stock,
    isFeatured,
    isNew,
    rating
  }`
  return await sanityClient.fetch(query, { slug })
}

// Get products by category
export const getProductsByCategory = async (categorySlug: string) => {
  const query = groq`*[_type == "product" && category->slug.current == $categorySlug]{
    _id,
    name,
    slug,
    price,
    discount,
    images,
    category->{name, slug},
    subcategory->{name, slug},
    isFeatured,
    isNew,
    rating
  }`
  return await sanityClient.fetch(query, { categorySlug })
} 