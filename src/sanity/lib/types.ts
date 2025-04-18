import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { urlFor } from '@/sanity/lib/client'

export interface Category {
  _id: string
  name: string
  slug: {
    current: string
  }
  description?: string
  image?: SanityImageSource
  order?: number
}

export interface Subcategory {
  _id: string
  name: string
  slug: {
    current: string
  }
  category: {
    name: string
    slug: {
      current: string
    }
  }
  description?: string
  image?: SanityImageSource
}

export interface Product {
  _id: string
  name: string
  slug: {
    current: string
  }
  price: number
  discount?: number
  description: any[] // Sanity Portable Text
  images: SanityImageSource[]
  category: {
    name: string
    slug: {
      current: string
    }
  }
  subcategory?: {
    name: string
    slug: {
      current: string
    }
  }
  features?: string[]
  dimensions?: {
    width: number
    height: number
    depth: number
  }
  materials?: string[]
  colors?: string[]
  stock: number
  isFeatured: boolean
  isNew: boolean
  rating?: number
  inStock: boolean
}

export interface Banner {
  _id: string
  title: string
  subtitle?: string
  description?: string
  image: SanityImageSource
  buttonText?: string
  buttonLink?: string
  isActive: boolean
  order?: number
} 