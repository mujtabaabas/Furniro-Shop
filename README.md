# Furniro - Modern Furniture Store

A modern e-commerce website for furniture shopping built with Next.js, Sanity CMS, and Clerk Authentication.

## Features

- 🛍️ Product catalog with categories and subcategories
- 🔍 Advanced search and filtering
- 🛒 Shopping cart functionality
- 💖 Wishlist management
- 👤 User authentication with Clerk
- 💳 Checkout process
- 📱 Responsive design
- ⚡ Fast and SEO-friendly with Next.js
- 📝 Content management with Sanity CMS

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **CMS**: Sanity.io
- **Authentication**: Clerk
- **Styling**: Tailwind CSS, Shadcn UI
- **Animation**: Framer Motion
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Sanity account
- A Clerk account

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-04-15

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/furniro.git
cd furniro
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Start the Sanity Studio:
```bash
npm run studio
```

5. Seed the database with initial data:
```bash
npm run seed
```

The application will be available at `http://localhost:3000`, and the Sanity Studio will be at `http://localhost:3333`.

## Project Structure

```
src/
├── app/                  # Next.js app directory
├── components/          # React components
├── context/            # React context providers
├── lib/               # Utility functions
└── sanity/            # Sanity configuration and schemas
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Sanity](https://www.sanity.io/)
- [Clerk](https://clerk.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
#   F u r n i r o - S h o p  
 