import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="relative h-[600px] w-full">
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt="New Collection"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#FFF3E3] p-8 md:p-12 max-w-[500px] mx-4 md:mx-16">
        <span className="text-base">New Arrival</span>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
          Discover Our<br />New Collection
        </h1>
        <p className="text-sm md:text-base mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
        </p>
        <Link 
          href="/shop"
          className="inline-block bg-[#B88E2F] text-white px-8 py-3 hover:bg-[#A17922] transition-colors"
        >
          BUY NOW
        </Link>
      </div>
    </section>
  )
}

export default Hero 