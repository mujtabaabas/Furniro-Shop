'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store'
import { urlFor } from '@/sanity/lib/client'
import { FiShoppingCart, FiTrash2, FiArrowLeft } from 'react-icons/fi'

export default function WishlistPage() {
  const router = useRouter()
  const { state, removeFromWishlist, addToCart } = useStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (state.wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-8">Your Wishlist is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your wishlist yet.
          </p>
          <Button
            onClick={() => router.push('/shop')}
            className="bg-primary hover:bg-primary/90"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {state.wishlist.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-sm overflow-hidden group"
          >
            {/* Product Image */}
            <Link href={`/product/${product.slug}`}>
              <div className="relative h-64 bg-gray-100">
                <Image
                  src={urlFor(product.images[0]).url()}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>

            {/* Product Info */}
            <div className="p-6">
              <Link
                href={`/product/${product.slug}`}
                className="text-lg font-semibold hover:text-primary"
              >
                {product.name}
              </Link>
              <p className="text-gray-600 mt-2">${product.price.toFixed(2)}</p>

              {/* Actions */}
              <div className="flex items-center space-x-4 mt-4">
                <Button
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  <FiShoppingCart className="mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeFromWishlist(product._id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <FiTrash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        onClick={() => router.push('/shop')}
        className="mt-12"
      >
        <FiArrowLeft className="mr-2" />
        Continue Shopping
      </Button>
    </div>
  )
} 