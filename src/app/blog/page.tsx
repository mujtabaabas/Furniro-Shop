import { sanityClient } from '@/sanity/lib/client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface Category {
  title: string
  slug: {
    current: string
  }
}

interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  mainImage: string
  author: {
    name: string
    image: string
  }
  categories: Category[]
  publishedAt: string
}

async function getPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "post"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    author->{name, image},
    categories[]->{title, slug},
    publishedAt
  }`
  
  return sanityClient.fetch(query)
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Link href={`/blog/${post.slug.current}`}>
              <div className="relative h-48 w-full">
                <Image
                  src={post.mainImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{post.author.name}</span>
                </div>
                <h2 className="text-xl font-bold mb-2 hover:text-[#B88E2F] transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories.map((category) => (
                    <span
                      key={category.slug.current}
                      className="px-2 py-1 bg-gray-100 text-sm rounded-full"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
                <Button variant="ghost" className="p-0">
                  Read More
                </Button>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
} 