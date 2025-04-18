'use client'

import { useState } from 'react'
import { Product } from '@/sanity/lib/types'
import { ProductCard } from './ProductCard'

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'rating'

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>('newest')

  const sortProducts = (products: Product[], sortBy: SortOption) => {
    const sortedProducts = [...products]
    switch (sortBy) {
      case 'price-asc':
        return sortedProducts.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return sortedProducts.sort((a, b) => b.price - a.price)
      case 'rating':
        return sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      default:
        return sortedProducts.sort((a, b) => b._id.localeCompare(a._id))
    }
  }

  const sortedProducts = sortProducts(products, sortBy)

  return (
    <div>
      <div className="flex justify-end mb-6">
        <select
          className="border rounded-lg px-4 py-2 bg-white"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
} 