export const products = [
  {
    _type: 'product',
    name: 'Modern Sofa',
    slug: {
      _type: 'slug',
      current: 'modern-sofa'
    },
    price: 899.99,
    discount: 10,
    description: 'A comfortable and stylish modern sofa perfect for your living room.',
    images: [
      {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: 'image-1'
        }
      }
    ],
    category: {
      _type: 'reference',
      _ref: 'category-1'
    },
    subcategory: {
      _type: 'reference',
      _ref: 'subcategory-1'
    },
    rating: 4.5,
    isNew: true,
    isBestSeller: true,
    stock: 10
  },
  {
    _type: 'product',
    name: 'Wooden Dining Table',
    slug: {
      _type: 'slug',
      current: 'wooden-dining-table'
    },
    price: 599.99,
    description: 'Elegant wooden dining table for family gatherings.',
    images: [
      {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: 'image-2'
        }
      }
    ],
    category: {
      _type: 'reference',
      _ref: 'category-2'
    },
    subcategory: {
      _type: 'reference',
      _ref: 'subcategory-2'
    },
    rating: 4.8,
    isBestSeller: true,
    stock: 5
  },
  {
    _type: 'product',
    name: 'Office Chair',
    slug: {
      _type: 'slug',
      current: 'office-chair'
    },
    price: 299.99,
    discount: 15,
    description: 'Ergonomic office chair for maximum comfort during work hours.',
    images: [
      {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: 'image-3'
        }
      }
    ],
    category: {
      _type: 'reference',
      _ref: 'category-3'
    },
    subcategory: {
      _type: 'reference',
      _ref: 'subcategory-3'
    },
    rating: 4.2,
    isNew: true,
    stock: 15
  }
] 