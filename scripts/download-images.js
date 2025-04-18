const fs = require('fs')
const https = require('https')
const path = require('path')

const images = {
  'hero-bg.jpg': 'https://images.unsplash.com/photo-1634712282287-14ed57b9cc89',
  'categories/dining.jpg': 'https://images.unsplash.com/photo-1617806118233-18e1de247200',
  'categories/living.jpg': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
  'categories/bedroom.jpg': 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0',
  'inspiration/room1.jpg': 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a',
  'share/share1.jpg': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
  'share/share2.jpg': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
  'share/share3.jpg': 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a',
  'share/share4.jpg': 'https://images.unsplash.com/photo-1616137466211-f939a420be84',
  'share/share5.jpg': 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a',
  'share/share6.jpg': 'https://images.unsplash.com/photo-1616046229478-9901c5536a45',
  'share/share7.jpg': 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a',
  'share/share8.jpg': 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20',
}

async function downloadImage(url, filepath) {
  const dir = path.dirname(filepath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filepath)
        response.pipe(file)
        file.on('finish', () => {
          file.close()
          resolve()
        })
      } else {
        response.resume()
        reject(new Error(`Request Failed With a Status Code: ${response.statusCode}`))
      }
    })
  })
}

async function downloadAllImages() {
  const publicDir = path.join(process.cwd(), 'public')
  
  for (const [filename, url] of Object.entries(images)) {
    const filepath = path.join(publicDir, filename)
    console.log(`Downloading ${filename}...`)
    try {
      await downloadImage(url, filepath)
      console.log(`Downloaded ${filename}`)
    } catch (error) {
      console.error(`Error downloading ${filename}:`, error)
    }
  }
}

downloadAllImages() 