import Image from 'next/image'
import Link from 'next/link'

const Inspiration = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-[#FCF8F3]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              50+ Beautiful rooms<br />inspiration
            </h2>
            <p className="text-gray-600 mb-6">
              Our designer already made a lot of beautiful prototype of rooms that inspire you
            </p>
            <Link 
              href="/inspiration"
              className="inline-block bg-[#B88E2F] text-white px-8 py-3 hover:bg-[#A17922] transition-colors"
            >
              Explore More
            </Link>
          </div>
          
          <div className="relative">
            <div className="relative h-[600px] w-full">
              <Image
                src="/inspiration/room1.jpg"
                alt="Beautiful Room"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="absolute bottom-8 left-8 right-8 bg-white p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Inner Peace</h3>
              <div className="flex justify-between items-center">
                <Link 
                  href="/inspiration/inner-peace"
                  className="text-[#B88E2F] hover:underline"
                >
                  Read More
                </Link>
                <span className="text-gray-500">01 - Bed Room</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Inspiration 