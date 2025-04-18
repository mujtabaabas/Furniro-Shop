import { sanityClient } from '../lib/client'
import { products } from '../data/products'

async function importProducts() {
  try {
    // Delete all existing products
    console.log('Deleting existing products...')
    await sanityClient.delete({
      query: '*[_type == "product"]'
    })

    // Import new products
    console.log('Importing new products...')
    for (const product of products) {
      // Ensure all required fields are present and properly typed
      const productData = {
        _type: 'product',
        name: product.name,
        slug: product.slug,
        price: product.price,
        discount: product.discount || 0, // Default to 0 if discount is undefined
        description: product.description,
        images: product.images,
        category: product.category,
        subcategory: product.subcategory,
        rating: product.rating || 0, // Default to 0 if rating is undefined
        isNew: product.isNew || false, // Default to false if isNew is undefined
        isBestSeller: product.isBestSeller || false, // Default to false if isBestSeller is undefined
        stock: product.stock || 0 // Default to 0 if stock is undefined
      }

      await sanityClient.create(productData)
      console.log(`Imported product: ${product.name}`)
    }

    console.log('Import completed successfully!')
  } catch (error) {
    console.error('Error importing products:', error)
  }
}

importProducts() 