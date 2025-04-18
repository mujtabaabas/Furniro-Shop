import Image from 'next/image'

export const metadata = {
  title: 'About Us | Furniro',
  description: 'Learn about Furniro - our story, mission, and commitment to quality furniture design.',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Our Story</h1>
        
        <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src="/images/about-hero.jpg"
            alt="Furniro Showroom"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
            <p className="text-gray-600">
              Furniro was founded in 2010 with a simple mission: to create beautiful, functional furniture that enhances your living space. 
              We believe that great design should be accessible to everyone, which is why we combine quality craftsmanship with affordable pricing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Our Philosophy</h2>
            <p className="text-gray-600">
              At Furniro, we believe that furniture should be more than just functional - it should tell a story. 
              Each piece in our collection is designed with care, considering both form and function. 
              We work with skilled craftsmen and use sustainable materials to create furniture that lasts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Sustainability</h2>
            <p className="text-gray-600">
              We're committed to reducing our environmental impact. 
              From sourcing sustainable materials to implementing eco-friendly manufacturing processes, 
              we strive to create furniture that's kind to both your home and the planet.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-600">
              Our team of designers, craftsmen, and customer service professionals work together to bring you 
              the best possible furniture shopping experience. We're passionate about what we do and 
              dedicated to helping you find the perfect pieces for your home.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
} 