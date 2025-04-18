import Image from 'next/image'
import Link from 'next/link'

const categories = [
  {
    name: 'Dining',
    image: '/categories/dining.jpg',
    href: '/category/dining-room'
  },
  {
    name: 'Living',
    image: '/categories/living.jpg',
    href: '/category/living-room'
  },
  {
    name: 'Bedroom',
    image: '/categories/bedroom.jpg',
    href: '/category/bedroom'
  }
]

const Categories = () => {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Browse The Range</h2>
        <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {categories.map((category) => (
          <Link 
            key={category.name}
            href={category.href}
            className="group"
          >
            <div className="relative h-[400px] w-full overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-xl font-medium text-center mt-4">{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Categories 