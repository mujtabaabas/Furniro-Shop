'use client'

import { useState } from 'react'
import { FiX, FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/client'
import { useStore } from '@/context/StoreContext'
import Link from 'next/link'

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false)
  const { cart, removeFromCart, updateCartQuantity, cartTotal, cartCount } = useStore()

  return (
    <>
      <Button 
        variant="ghost" 
        className="relative p-2"
        onClick={() => setIsOpen(true)}
      >
        <FiShoppingCart className="h-5 w-5" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#B88E2F] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Shopping Cart</h2>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                <FiX className="h-5 w-5" />
              </Button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Your cart is empty</p>
                <Button 
                  className="mt-4"
                  onClick={() => setIsOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item._id} className="flex gap-4 border-b pb-4">
                      <div className="relative w-24 h-24">
                        <Image
                          src={urlFor(item.image).url()}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.name}</h3>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeFromCart(item._id)}
                          >
                            <FiX className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center border rounded">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateCartQuantity(item._id, item.quantity - 1)}
                            >
                              <FiMinus className="h-4 w-4" />
                            </Button>
                            <span className="px-2">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateCartQuantity(item._id, item.quantity + 1)}
                            >
                              <FiPlus className="h-4 w-4" />
                            </Button>
                          </div>
                          <span className="font-bold">
                            ${(item.discount 
                              ? (item.price - (item.price * item.discount / 100)) * item.quantity
                              : item.price * item.quantity
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/checkout">
                      Proceed to Checkout
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
} 