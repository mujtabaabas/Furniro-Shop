import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/sanity/lib/types'

interface ProductGridProps {
  products: Product[]
  title?: string
}

const ProductGrid = ({ products, title = "Our Products" }: ProductGridProps) => {
  return (
    <section className="py-16 px-4 md:px-8">
      {title && (
        <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {products.map((product) => (
          <Link 
            key={product._id}
            href={`/product/${product.slug.current}`}
            className="group"
          >
            <div className="relative h-[300px] w-full overflow-hidden bg-[#F4F5F7]">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              />
              {product.discount > 0 && (
                <span className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 text-sm">
                  -{product.discount}%
                </span>
              )}
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 text-sm">
                  New
                </span>
              )}
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium">{product.name}</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[#B88E2F] font-bold">
                  Rp {product.price.toLocaleString()}
                </span>
                {product.discount > 0 && (
                  <span className="text-gray-500 line-through text-sm">
                    Rp {(product.price * (1 + product.discount/100)).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Link 
          href="/shop"
          className="inline-block border-2 border-[#B88E2F] text-[#B88E2F] px-8 py-3 hover:bg-[#B88E2F] hover:text-white transition-colors"
        >
          Show More
        </Link>
      </div>
    </section>
  )
}

export default ProductGrid 