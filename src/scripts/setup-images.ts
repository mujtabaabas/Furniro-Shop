const fs = require('fs')
const path = require('path')
const https = require('https')

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images')
const SUBDIRECTORIES = [
  'products',
  'categories',
  'payment',
  'icons'
]

// Create directories
function createDirectories() {
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true })
  }

  SUBDIRECTORIES.forEach(dir => {
    const dirPath = path.join(IMAGES_DIR, dir)
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
  })
}

// Download placeholder images
async function downloadImage(url: string, filepath: string) {
  return new Promise((resolve, reject) => {
    https.get(url, (response: import('http').IncomingMessage) => {
      if (response.statusCode === 200) {
        response.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath))
      } else {
        response.resume()
        reject(new Error(`Request Failed With a Status Code: ${response.statusCode}`))
      }
    })
  })
}

async function setupImages() {
  try {
    createDirectories()

    // Download hero image
    await downloadImage(
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      path.join(IMAGES_DIR, 'hero.jpg')
    )

    // Download about page hero image
    await downloadImage(
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      path.join(IMAGES_DIR, 'about-hero.jpg')
    )

    // Download category images
    const categories = [
      { name: 'living-room', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
      { name: 'bedroom', url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
      { name: 'dining-room', url: 'https://images.unsplash.com/photo-1600494603989-fb422534e50f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' }
    ]

    for (const category of categories) {
      await downloadImage(
        category.url,
        path.join(IMAGES_DIR, 'categories', `${category.name}.jpg`)
      )
    }

    // Download payment method icons
    const paymentMethods = [
      { name: 'visa', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png' },
      { name: 'mastercard', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png' },
      { name: 'paypal', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1280px-PayPal.svg.png' },
      { name: 'amex', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo.svg/1280px-American_Express_logo.svg.png' }
    ]

    for (const method of paymentMethods) {
      await downloadImage(
        method.url,
        path.join(IMAGES_DIR, 'payment', `${method.name}.png`)
      )
    }

    // Download favicon and app icons
    const icons = [
      { name: 'favicon-32x32', url: 'https://raw.githubusercontent.com/vercel/next.js/canary/examples/blog-starter/public/favicon-32x32.png' },
      { name: 'favicon-16x16', url: 'https://raw.githubusercontent.com/vercel/next.js/canary/examples/blog-starter/public/favicon-16x16.png' },
      { name: 'apple-touch-icon', url: 'https://raw.githubusercontent.com/vercel/next.js/canary/examples/blog-starter/public/apple-touch-icon.png' },
      { name: 'android-192x192', url: 'https://raw.githubusercontent.com/vercel/next.js/canary/examples/blog-starter/public/android-chrome-192x192.png' },
      { name: 'android-512x512', url: 'https://raw.githubusercontent.com/vercel/next.js/canary/examples/blog-starter/public/android-chrome-512x512.png' }
    ]

    for (const icon of icons) {
      await downloadImage(
        icon.url,
        path.join(IMAGES_DIR, 'icons', `${icon.name}.png`)
      )
    }

    console.log('Images setup completed successfully!')
  } catch (error) {
    console.error('Error setting up images:', error)
  }
}

setupImages() 