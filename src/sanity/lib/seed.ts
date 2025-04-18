import { sanityClient } from './client'

const categories = [
  {
    _type: 'category',
    name: 'Living Room',
    slug: { _type: 'slug', current: 'living-room' },
    description: 'Furniture for your living room',
    order: 1,
  },
  {
    _type: 'category',
    name: 'Bedroom',
    slug: { _type: 'slug', current: 'bedroom' },
    description: 'Furniture for your bedroom',
    order: 2,
  },
  {
    _type: 'category',
    name: 'Dining Room',
    slug: { _type: 'slug', current: 'dining-room' },
    description: 'Furniture for your dining room',
    order: 3,
  },
  {
    _type: 'category',
    name: 'Office',
    slug: { _type: 'slug', current: 'office' },
    description: 'Furniture for your home office',
    order: 4,
  },
]

const subcategories = [
  {
    _type: 'subcategory',
    name: 'Sofas',
    slug: { _type: 'slug', current: 'sofas' },
    description: 'Comfortable sofas and couches',
    category: { _type: 'reference', _ref: '' }, // Will be updated after category creation
  },
  {
    _type: 'subcategory',
    name: 'Coffee Tables',
    slug: { _type: 'slug', current: 'coffee-tables' },
    description: 'Stylish coffee tables',
    category: { _type: 'reference', _ref: '' },
  },
  {
    _type: 'subcategory',
    name: 'Beds',
    slug: { _type: 'slug', current: 'beds' },
    description: 'Comfortable beds',
    category: { _type: 'reference', _ref: '' },
  },
  {
    _type: 'subcategory',
    name: 'Wardrobes',
    slug: { _type: 'slug', current: 'wardrobes' },
    description: 'Spacious wardrobes',
    category: { _type: 'reference', _ref: '' },
  },
]

const products = [
  {
    _type: 'product',
    name: 'Modern Sofa',
    slug: { _type: 'slug', current: 'modern-sofa' },
    price: 999.99,
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'A comfortable and stylish modern sofa perfect for any living room.',
          },
        ],
      },
    ],
    features: [
      'High-density foam cushions',
      'Stain-resistant fabric',
      'Solid wood frame',
      'Modern design',
    ],
    dimensions: {
      width: 220,
      height: 85,
      depth: 95,
    },
    materials: ['Fabric', 'Wood', 'Foam'],
    colors: ['Gray', 'Blue', 'Beige'],
    stock: 10,
    isFeatured: true,
    isNew: true,
    rating: 4.5,
    inStock: true,
    category: { _type: 'reference', _ref: '' },
    subcategory: { _type: 'reference', _ref: '' },
  },
  // Add more products here
]

const banners = [
  {
    _type: 'banner',
    title: 'New Collection',
    subtitle: 'Save up to 50%',
    description: 'Discover our latest furniture collection with amazing discounts.',
    buttonText: 'Shop Now',
    buttonLink: '/shop',
    isActive: true,
    order: 1,
  },
  {
    _type: 'banner',
    title: 'Summer Sale',
    subtitle: 'Hot Deals',
    description: 'Get ready for summer with our exclusive outdoor furniture collection.',
    buttonText: 'Learn More',
    buttonLink: '/shop',
    isActive: true,
    order: 2,
  },
]

async function seedData() {
  try {
    // Delete existing documents
    await sanityClient.delete({ query: '*[!(_id in path("drafts.**"))]' })

    // Create categories
    const createdCategories = await Promise.all(
      categories.map(category => sanityClient.create(category))
    )

    // Update subcategories with category references
    const subcategoriesWithRefs = subcategories.map((subcategory, index) => ({
      ...subcategory,
      category: {
        _type: 'reference',
        _ref: createdCategories[Math.floor(index / 2)]._id,
      },
    }))

    // Create subcategories
    const createdSubcategories = await Promise.all(
      subcategoriesWithRefs.map(subcategory => sanityClient.create(subcategory))
    )

    // Update products with category and subcategory references
    const productsWithRefs = products.map(product => ({
      ...product,
      category: {
        _type: 'reference',
        _ref: createdCategories[0]._id,
      },
      subcategory: {
        _type: 'reference',
        _ref: createdSubcategories[0]._id,
      },
    }))

    // Create products
    await Promise.all(productsWithRefs.map(product => sanityClient.create(product)))

    // Create banners
    await Promise.all(banners.map(banner => sanityClient.create(banner)))

    console.log('✅ Database seeded successfully')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
  }
}

seedData() 