import { NextResponse } from 'next/server'
import { sanityClient } from '@/sanity/lib/client'

export async function GET() {
  try {
    const query = `*[_type == "banner" && isActive == true] | order(order asc) {
      _id,
      title,
      subtitle,
      description,
      image,
      buttonText,
      buttonLink,
      isActive,
      order
    }`
    
    const banners = await sanityClient.fetch(query)
    return NextResponse.json(banners)
  } catch (error) {
    console.error('Error fetching banners:', error)
    return NextResponse.json(
      { error: 'Failed to fetch banners' },
      { status: 500 }
    )
  }
} 