import Image from 'next/image'
import Link from 'next/link'

const images = [
  '/share/share1.jpg',
  '/share/share2.jpg',
  '/share/share3.jpg',
  '/share/share4.jpg',
  '/share/share5.jpg',
  '/share/share6.jpg',
  '/share/share7.jpg',
  '/share/share8.jpg',
]

const Share = () => {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Share your setup with</h2>
        <p className="text-2xl text-[#B88E2F] font-medium">#FuniroFurniture</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <Link 
            key={index}
            href="https://instagram.com/funiro"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square w-full overflow-hidden"
          >
            <Image
              src={image}
              alt={`Furniture setup ${index + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Share 