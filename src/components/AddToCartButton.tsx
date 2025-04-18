'use client'

import { Button } from '@/components/ui/button'
import { FiShoppingCart } from 'react-icons/fi'
import { useStore } from '@/context/StoreContext'
import { Product } from '@/sanity/lib/types'

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useStore()

  return (
    <Button 
      className="flex-1"
      onClick={() => addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        discount: product.discount,
        image: product.images[0]
      })}
    >
      <FiShoppingCart className="mr-2" />
      Add to Cart
    </Button>
  )
} 