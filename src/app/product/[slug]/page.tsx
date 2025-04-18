import { sanityClient } from '@/sanity/lib/client'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/client'
import { Product } from '@/sanity/lib/types'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/ProductCard'
import { AddToCartButton } from '@/components/AddToCartButton'
import { AddToWishlistButton } from '@/components/AddToWishlistButton'

async function getProduct(slug: string): Promise<Product> {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    price,
    discount,
    description,
    images,
    features,
    dimensions,
    materials,
    colors,
    stock,
    rating,
    category->{
      name,
      slug
    },
    subcategory->{
      name,
      slug
    }
  }`
  
  return await sanityClient.fetch(query, { slug })
}

async function getRelatedProducts(category: string, currentProductId: string): Promise<Product[]> {
  const query = `*[_type == "product" && category->slug.current == "${category}" && _id != "${currentProductId}"][0...4] {
    _id,
    name,
    slug,
    price,
    discount,
    images,
    isNew,
    rating
  }`
  
  return sanityClient.fetch(query)
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string }
}) {
  const product = await getProduct(params.slug)
  const relatedProducts = await getRelatedProducts(
    product.category.slug.current,
    product._id
  )

  if (!product) {
    return <div>Product not found</div>
  }

  const discountedPrice = product.discount 
    ? product.price - (product.price * product.discount / 100)
    : product.price

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={urlFor(product.images[0]).url()}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.slice(1).map((image: any, index: number) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={urlFor(image).url()}
                  alt={`${product.name} - Image ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < (product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.rating || 0} reviews)</span>
            </div>
          </div>

          <div className="space-y-2">
            {product.discount && (
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-[#B88E2F]">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm text-red-500">
                  {product.discount}% OFF
                </span>
              </div>
            )}
            {!product.discount && (
              <span className="text-2xl font-bold text-[#B88E2F]">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="prose max-w-none">
            {product.description}
          </div>

          {product.features && product.features.length > 0 && (
            <div>
              <h3 className="font-bold mb-2">Features</h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.features.map((feature: string, index: number) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {product.dimensions && (
            <div>
              <h3 className="font-bold mb-2">Dimensions</h3>
              <p>
                {product.dimensions.width}cm (W) × {product.dimensions.height}cm (H) × {product.dimensions.depth}cm (D)
              </p>
            </div>
          )}

          {product.materials && product.materials.length > 0 && (
            <div>
              <h3 className="font-bold mb-2">Materials</h3>
              <p>{product.materials.join(', ')}</p>
            </div>
          )}

          {product.colors && product.colors.length > 0 && (
            <div>
              <h3 className="font-bold mb-2">Available Colors</h3>
              <div className="flex gap-2">
                {product.colors.map((color: string, index: number) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full border"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 pt-4">
            <AddToCartButton product={product} />
            <AddToWishlistButton product={product} />
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
} 