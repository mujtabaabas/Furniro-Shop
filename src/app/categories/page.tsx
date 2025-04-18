import Image from 'next/image'
import Link from 'next/link'
import { getCategories } from '@/sanity/lib/products'

export const metadata = {
  title: 'Categories | Furniro',
  description: 'Browse our collection of furniture categories including living room, bedroom, and dining room furniture.',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Our Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link 
            key={category._id} 
            href={`/shop?category=${category.slug.current}`}
            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-80 w-full">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
              <p className="text-sm opacity-90">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}