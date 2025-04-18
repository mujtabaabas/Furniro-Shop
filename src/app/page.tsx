import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getFeaturedProducts } from '@/sanity/lib/products'
import { ProductCard } from '@/components/ProductCard'
import { FiArrowRight, FiStar, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi'

export const metadata: Metadata = {
  title: 'Furniro - Modern Furniture Store',
  description: 'Discover high-quality, modern furniture for your home. Shop our collection of stylish and comfortable pieces.',
  keywords: 'furniture, modern furniture, home decor, living room furniture, bedroom furniture',
  openGraph: {
    title: 'Furniro - Modern Furniture Store',
    description: 'Discover high-quality, modern furniture for your home.',
    images: ['/images/hero.jpg'],
  },
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gray-100">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Modern Furniture"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-4">
              Modern Furniture for Your Home
            </h1>
            <p className="text-xl mb-8">
              Discover our collection of high-quality, stylish furniture pieces
              that will transform your living space.
            </p>
            <Button size="lg" className="bg-white text-black hover:bg-gray-100">
              Shop Now
              <FiArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center">
              <FiTruck className="text-4xl text-primary mr-4" />
              <div>
                <h3 className="font-semibold">Free Shipping</h3>
                <p className="text-gray-600">On all orders over $50</p>
              </div>
            </div>
            <div className="flex items-center">
              <FiRefreshCw className="text-4xl text-primary mr-4" />
              <div>
                <h3 className="font-semibold">Easy Returns</h3>
                <p className="text-gray-600">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-center">
              <FiShield className="text-4xl text-primary mr-4" />
              <div>
                <h3 className="font-semibold">Secure Payment</h3>
                <p className="text-gray-600">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center">
              <FiStar className="text-4xl text-primary mr-4" />
              <div>
                <h3 className="font-semibold">Quality Guarantee</h3>
                <p className="text-gray-600">Premium materials</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link href="/shop" className="text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/category/living-room" className="group">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src="/images/categories/living-room.jpg"
                  alt="Living Room"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">Living Room</h3>
                </div>
              </div>
            </Link>
            <Link href="/category/bedroom" className="group">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src="/images/categories/bedroom.jpg"
                  alt="Bedroom"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">Bedroom</h3>
                </div>
              </div>
            </Link>
            <Link href="/category/dining-room" className="group">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src="/images/categories/dining-room.jpg"
                  alt="Dining Room"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">Dining Room</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, j) => (
                    <FiStar key={j} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The quality of the furniture exceeded my expectations. The delivery was fast and the assembly was straightforward."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4" />
                  <div>
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-gray-600">Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Stay updated with our latest products, offers, and design inspiration.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 rounded-lg text-black"
            />
            <Button type="submit" className="bg-white text-primary hover:bg-gray-100">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </main>
  )
}
