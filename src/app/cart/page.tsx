'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store'
import { urlFor } from '@/sanity/lib/client'
import { FiMinus, FiPlus, FiTrash2, FiArrowLeft } from 'react-icons/fi'

export default function CartPage() {
  const router = useRouter()
  const { state, updateCartQuantity, removeFromCart } = useStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const subtotal = state.cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )
  const shipping = subtotal > 50 ? 0 : 10
  const total = subtotal + shipping

  if (state.cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-8">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
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
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-8">
            {state.cart.map((item) => (
              <div
                key={item.product._id}
                className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 p-6 bg-white rounded-lg shadow-sm"
              >
                {/* Product Image */}
                <div className="relative w-full sm:w-32 h-32">
                  <Image
                    src={urlFor(item.product.images[0]).url()}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="text-lg font-semibold hover:text-primary"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-gray-600 mt-1">
                    ${item.product.price.toFixed(2)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateCartQuantity(
                            item.product._id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="h-8 w-8"
                      >
                        <FiMinus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateCartQuantity(item.product._id, item.quantity + 1)
                        }
                        className="h-8 w-8"
                      >
                        <FiPlus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.product._id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="ghost"
            onClick={() => router.push('/shop')}
            className="mt-8"
          >
            <FiArrowLeft className="mr-2" />
            Continue Shopping
          </Button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => router.push('/checkout')}
              className="w-full mt-6 bg-primary hover:bg-primary/90"
            >
              Proceed to Checkout
            </Button>

            <div className="mt-6 text-sm text-gray-600">
              <p className="mb-2">We accept:</p>
              <div className="flex space-x-4">
                <Image
                  src="/images/payment/visa.png"
                  alt="Visa"
                  width={40}
                  height={25}
                  className="h-6 w-auto"
                />
                <Image
                  src="/images/payment/mastercard.png"
                  alt="Mastercard"
                  width={40}
                  height={25}
                  className="h-6 w-auto"
                />
                <Image
                  src="/images/payment/paypal.png"
                  alt="PayPal"
                  width={40}
                  height={25}
                  className="h-6 w-auto"
                />
                <Image
                  src="/images/payment/amex.png"
                  alt="American Express"
                  width={40}
                  height={25}
                  className="h-6 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}