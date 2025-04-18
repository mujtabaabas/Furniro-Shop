import { NextResponse } from 'next/server'
import { sanityClient } from '@/sanity/lib/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const subcategory = searchParams.get('subcategory')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort')
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')

    let query = `*[_type == "product"`
    
    if (category) {
      query += ` && category->slug.current == "${category}"`
    }
    
    if (subcategory) {
      query += ` && subcategory->slug.current == "${subcategory}"`
    }
    
    if (search) {
      query += ` && (name match "${search}*" || description match "${search}*")`
    }
    
    query += `] {
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

    if (sort) {
      switch (sort) {
        case 'price-asc':
          query += ' | order(price asc)'
          break
        case 'price-desc':
          query += ' | order(price desc)'
          break
        case 'newest':
          query += ' | order(_createdAt desc)'
          break
        case 'rating':
          query += ' | order(rating desc)'
          break
        default:
          query += ' | order(_createdAt desc)'
      }
    }

    if (limit) {
      query += `[0...${limit}]`
    }

    if (offset) {
      query += `[${offset}...]`
    }

    const products = await sanityClient.fetch(query)
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
} 