'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/sanity/lib/types'
import { Button } from '@/components/ui/button'
import { FiHeart, FiShoppingCart } from 'react-icons/fi'
import { urlFor } from '@/sanity/lib/client'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group">
      <div className="relative h-[300px] w-full overflow-hidden bg-[#F4F5F7]">
        <Link href={`/product/${product.slug.current}`}>
          <Image
            src={urlFor(product.images[0]).url()}
            alt={product.name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        {product.discount && product.discount > 0 && (
          <span className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 text-sm">
            -{product.discount}%
          </span>
        )}
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 text-sm">
            New
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex justify-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <FiHeart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <FiShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Link href={`/product/${product.slug.current}`}>
          <h3 className="text-lg font-medium hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[#B88E2F] font-bold">
            Rp {product.price.toLocaleString()}
          </span>
          {product.discount && product.discount > 0 && (
            <span className="text-gray-500 line-through text-sm">
              Rp {(product.price * (1 + product.discount/100)).toLocaleString()}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${
                product.rating && i < Math.round(product.rating)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-sm text-gray-500">({product.rating || 0})</span>
        </div>
      </div>
    </div>
  )
} 