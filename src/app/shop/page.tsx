import { Metadata } from 'next'
import { getProducts, getCategories } from '@/sanity/lib/products'
import { ProductGrid } from '@/components/ProductGrid'
import { FilterSidebar } from '@/components/FilterSidebar'

export const metadata: Metadata = {
  title: 'Shop - Furniro',
  description: 'Browse our collection of high-quality furniture for your home.',
  keywords: 'furniture, shop, modern furniture, home decor, living room furniture, bedroom furniture',
  openGraph: {
    title: 'Shop - Furniro',
    description: 'Browse our collection of high-quality furniture for your home.',
    images: ['/images/shop.jpg'],
  },
}

export default async function ShopPage() {
  const products = await getProducts()
  const categories = await getCategories()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Shop</h1>
        <p className="text-gray-600">
          Showing {products.length} {products.length === 1 ? 'product' : 'products'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <FilterSidebar categories={categories} />
        </div>

        {/* Products */}
        <div className="lg:col-span-3">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  )
} 