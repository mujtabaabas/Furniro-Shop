import { NextResponse } from 'next/server'
import { sanityClient } from '@/sanity/lib/client'

export async function GET() {
  try {
    const query = `*[_type == "category"] | order(order asc) {
      _id,
      name,
      slug,
      description,
      image,
      order
    }`
    
    const categories = await sanityClient.fetch(query)
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
} 