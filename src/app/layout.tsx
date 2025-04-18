import "./globals.css";
import { Poppins } from 'next/font/google';
import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { StoreProvider } from '@/lib/store'
import { Navbar } from '@/components/Navbar';
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Furniro - Modern Furniture Store',
    template: '%s | Furniro'
  },
  description: 'Discover our collection of modern and stylish furniture for your home. Shop high-quality furniture pieces for your living room, bedroom, dining room, and more.',
  keywords: ['furniture', 'modern furniture', 'home decor', 'living room furniture', 'bedroom furniture', 'dining room furniture', 'office furniture'],
  authors: [{ name: 'Furniro Team' }],
  creator: 'Furniro',
  publisher: 'Furniro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://furniro.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://furniro.com',
    title: 'Furniro - Modern Furniture Store',
    description: 'Discover our collection of modern and stylish furniture for your home.',
    siteName: 'Furniro',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Furniro - Modern Furniture Store',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Furniro - Modern Furniture Store',
    description: 'Discover our collection of modern and stylish furniture for your home.',
    images: ['/images/twitter-image.jpg'],
    creator: '@furniro',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/android-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/android-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/icons/site.webmanifest",
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`${poppins.className} antialiased`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
