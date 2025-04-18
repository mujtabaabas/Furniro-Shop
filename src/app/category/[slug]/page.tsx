import { sanityClient } from '@/sanity/lib/client'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/client'
import { Product } from '@/sanity/lib/types'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/ProductCard'
import { FilterSidebar } from '@/components/FilterSidebar'

async function getCategory(slug: string) {
  const query = `*[_type == "category" && slug.current == "${slug}"][0] {
    _id,
    name,
    slug,
    description,
    image
  }`
  
  return sanityClient.fetch(query)
}

async function getProducts(category: string, searchParams: { [key: string]: string | string[] | undefined }) {
  const subcategory = searchParams.subcategory as string
  const sort = searchParams.sort as string
  const search = searchParams.search as string

  let query = `*[_type == "product" && category->slug.current == "${category}"`
  
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
    images,
    category->{name, slug},
    subcategory->{name, slug},
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

  return sanityClient.fetch(query)
}

async function getSubcategories(category: string) {
  const query = `*[_type == "subcategory" && category->slug.current == "${category}"] {
    _id,
    name,
    slug,
    image
  }`
  
  return sanityClient.fetch(query)
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const category = await getCategory(params.slug)
  const products = await getProducts(params.slug, searchParams)
  const subcategories = await getSubcategories(params.slug)

  if (!category) {
    return <div>Category not found</div>
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
        {category.description && (
          <p className="text-gray-600 max-w-2xl">{category.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <FilterSidebar
          category={category}
          subcategories={subcategories}
          searchParams={searchParams}
        />

        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {products.length} products found
            </p>
            <select
              className="border rounded-lg px-4 py-2"
              defaultValue={searchParams.sort as string || 'newest'}
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: Product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 