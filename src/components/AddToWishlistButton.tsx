'use client'

import { Button } from '@/components/ui/button'
import { FiHeart } from 'react-icons/fi'
import { useStore } from '@/context/StoreContext'
import { Product } from '@/sanity/lib/types'

interface AddToWishlistButtonProps {
  product: Product
}

export function AddToWishlistButton({ product }: AddToWishlistButtonProps) {
  const { addToWishlist } = useStore()

  return (
    <Button 
      variant="outline"
      className="flex-1"
      onClick={() => addToWishlist({
        _id: product._id,
        name: product.name,
        price: product.price,
        discount: product.discount,
        image: product.images[0]
      })}
    >
      <FiHeart className="mr-2" />
      Add to Wishlist
    </Button>
  )
} 