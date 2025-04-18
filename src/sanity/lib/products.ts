import { sanityClient } from './client'
import { Product } from './types'

export async function getProducts() {
  const query = `*[_type == "product"] {
    _id,
    name,
    slug,
    price,
    discount,
    description,
    "images": images[].asset->url,
    "category": category->{
      _id,
      name,
      slug
    },
    "subcategory": subcategory->{
      _id,
      name,
      slug
    },
    rating,
    isNew,
    isBestSeller,
    stock,
    _createdAt,
    _updatedAt
  }`

  const products = await sanityClient.fetch(query)
  return products as Product[]
}

export async function getProductBySlug(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    price,
    discount,
    description,
    "images": images[].asset->url,
    "category": category->{
      _id,
      name,
      slug
    },
    "subcategory": subcategory->{
      _id,
      name,
      slug
    },
    rating,
    isNew,
    isBestSeller,
    stock,
    _createdAt,
    _updatedAt
  }`

  const product = await sanityClient.fetch(query, { slug })
  return product as Product
}

export async function getProductsByCategory(categorySlug: string) {
  const query = `*[_type == "product" && category->slug.current == $categorySlug] {
    _id,
    name,
    slug,
    price,
    discount,
    description,
    "images": images[].asset->url,
    "category": category->{
      _id,
      name,
      slug
    },
    "subcategory": subcategory->{
      _id,
      name,
      slug
    },
    rating,
    isNew,
    isBestSeller,
    stock,
    _createdAt,
    _updatedAt
  }`

  const products = await sanityClient.fetch(query, { categorySlug })
  return products as Product[]
}

export async function getProductsBySubcategory(subcategorySlug: string) {
  const query = `*[_type == "product" && subcategory->slug.current == $subcategorySlug] {
    _id,
    name,
    slug,
    price,
    discount,
    description,
    "images": images[].asset->url,
    "category": category->{
      _id,
      name,
      slug
    },
    "subcategory": subcategory->{
      _id,
      name,
      slug
    },
    rating,
    isNew,
    isBestSeller,
    stock,
    _createdAt,
    _updatedAt
  }`

  const products = await sanityClient.fetch(query, { subcategorySlug })
  return products as Product[]
}

export async function getFeaturedProducts() {
  const query = `*[_type == "product" && (isNew == true || isBestSeller == true)] {
    _id,
    name,
    slug,
    price,
    discount,
    description,
    "images": images[].asset->url,
    "category": category->{
      _id,
      name,
      slug
    },
    "subcategory": subcategory->{
      _id,
      name,
      slug
    },
    rating,
    isNew,
    isBestSeller,
    stock,
    _createdAt,
    _updatedAt
  }`

  const products = await sanityClient.fetch(query)
  return products as Product[]
}

export async function getRelatedProducts(productId: string, categoryId: string) {
  const query = `*[_type == "product" && _id != $productId && category._ref == $categoryId][0...4] {
    _id,
    name,
    slug,
    price,
    discount,
    description,
    "images": images[].asset->url,
    "category": category->{
      _id,
      name,
      slug
    },
    "subcategory": subcategory->{
      _id,
      name,
      slug
    },
    rating,
    isNew,
    isBestSeller,
    stock,
    _createdAt,
    _updatedAt
  }`

  const products = await sanityClient.fetch(query, { productId, categoryId })
  return products as Product[]
}

export async function getCategories() {
  const query = `*[_type == "product"] {
    "category": category->name
  }`
  
  const products = await sanityClient.fetch(query)
  const categories = [...new Set(products.map((p: { category: string }) => p.category))].filter(Boolean)
  return categories as string[]
} 