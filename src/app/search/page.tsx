'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FiSearch, FiFilter, FiX } from 'react-icons/fi'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/client'
import Link from 'next/link'
import { sanityClient } from '@/sanity/lib/client'
import { Product, Category } from '@/sanity/lib/types'
import { ProductCard } from '@/components/ProductCard'
import { FilterSidebar } from '@/components/FilterSidebar'

async function getProducts(searchParams: { [key: string]: string | string[] | undefined }) {
  const search = searchParams.q as string
  const sort = searchParams.sort as string
  const price = searchParams.price as string
  const inStock = searchParams.inStock as string
  const isNew = searchParams.isNew as string

  let query = `*[_type == "product"`

  if (search) {
    query += ` && (name match "${search}*" || description match "${search}*")`
  }

  if (price) {
    const [min, max] = price.split('-')
    if (min && max) {
      query += ` && price >= ${min} && price <= ${max}`
    } else if (min) {
      query += ` && price >= ${min}`
    }
  }

  if (inStock === 'true') {
    query += ` && inStock == true`
  }

  if (isNew === 'true') {
    query += ` && isNew == true`
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

async function getCategories() {
  const query = `*[_type == "category"] {
    _id,
    name,
    slug,
    description,
    image
  }`
  
  return sanityClient.fetch(query)
}

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [products, setProducts] = useState<Product[]>([])

  const handleSearch = async () => {
    // Implement search functionality using Sanity client
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <div className="container py-12">
      {/* Search Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <Button
          variant="outline"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <FiFilter className="mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Sidebar */}
        {isFilterOpen && (
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="font-bold mb-4">Price Range</h3>
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  placeholder="Min"
                />
                <span>-</span>
                <Input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  placeholder="Max"
                />
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Categories</h3>
              <div className="space-y-2">
                {/* Add categories here */}
              </div>
            </div>

            <Button className="w-full" onClick={handleSearch}>
              Apply Filters
            </Button>
          </div>
        )}

        {/* Product Grid */}
        <div className={`${isFilterOpen ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  key={product._id}
                  href={`/product/${product.category.slug.current}/${product._id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="relative aspect-square">
                      <Image
                        src={urlFor(product.images[0]).url()}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                      {product.discount && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded">
                          {product.discount}% OFF
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-2">{product.name}</h3>
                      <div className="flex items-center gap-4">
                        {product.discount ? (
                          <>
                            <span className="font-bold text-[#B88E2F]">
                              ${(product.price - (product.price * product.discount / 100)).toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              ${product.price.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="font-bold text-[#B88E2F]">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 