import { sanityClient } from '@/sanity/lib/client'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/client'
import { PortableText } from '@portabletext/react'
import { FiCalendar, FiUser, FiTag } from 'react-icons/fi'
import Link from 'next/link'

interface Category {
  title: string
  slug: {
    current: string
  }
}

interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  body: any
  mainImage: string
  author: {
    name: string
    image: string
    bio: string
  }
  categories: Category[]
  publishedAt: string
}

interface RelatedPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  mainImage: string
  author: {
    name: string
  }
  publishedAt: string
}

async function getPost(slug: string): Promise<Post> {
  const query = `*[_type == "post" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    body,
    mainImage,
    author->{name, image, bio},
    categories[]->{title, slug},
    publishedAt
  }`
  
  return sanityClient.fetch(query)
}

async function getRelatedPosts(currentPostId: string, categories: string[]): Promise<RelatedPost[]> {
  const query = `*[_type == "post" && _id != "${currentPostId}" && references(*[_type == "category" && slug.current in $categories]._id)] | order(_createdAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    author->{name},
    publishedAt
  }`
  
  return sanityClient.fetch(query, { categories })
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPost(params.slug)
  const relatedPosts = await getRelatedPosts(
    post._id,
    post.categories.map((category) => category.slug.current)
  )

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="container py-12">
      <article className="max-w-3xl mx-auto">
        {/* Post Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-gray-500">
            <div className="flex items-center gap-2">
              <FiCalendar className="h-4 w-4" />
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiUser className="h-4 w-4" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiTag className="h-4 w-4" />
              <div className="flex gap-2">
                {post.categories.map((category) => (
                  <span key={category.slug.current}>{category.title}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-[400px] w-full mb-8">
          <Image
            src={post.mainImage}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Post Content */}
        <div className="prose prose-lg max-w-none">
          <PortableText value={post.body} />
        </div>

        {/* Author Bio */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-full overflow-hidden">
              <Image
                src={post.author.image}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold">{post.author.name}</h3>
              <p className="text-gray-600">{post.author.bio}</p>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((post) => (
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
                    <h3 className="text-lg font-bold hover:text-[#B88E2F] transition-colors">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 