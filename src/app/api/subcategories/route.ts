import { NextResponse } from 'next/server'
import { sanityClient } from '@/sanity/lib/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    let query = `*[_type == "subcategory"`
    
    if (category) {
      query += ` && category->slug.current == "${category}"`
    }
    
    query += `] {
      _id,
      name,
      slug,
      category->{name, slug},
      description,
      image
    }`
    
    const subcategories = await sanityClient.fetch(query)
    return NextResponse.json(subcategories)
  } catch (error) {
    console.error('Error fetching subcategories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subcategories' },
      { status: 500 }
    )
  }
} 