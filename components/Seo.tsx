// components/Seo.tsx
import { Metadata } from 'next'
import Head from 'next/head'

interface SeoProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export const metadata: Metadata = {
    title: {
      default: 'Next.js Portfolio Starter',
      template: '%s | Next.js Portfolio Starter',
    },
    description: 'This is my portfolio.',
    openGraph: {
      title: 'My Portfolio',
      description: 'This is my portfolio.',
      siteName: 'My Portfolio',
      locale: 'en_US',
      type: 'website',
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
}

const defaultTitle = 'Next.js Portfolio Starter'
const defaultDescription = 'This is my portfolio.'
const siteName = 'My Portfolio'
const defaultOgImage = '/og-default.jpg' // or whatever you want
const baseUrl = 'https://example.com' // change to your domain

export default function SEO({
  title = defaultTitle,
  description = defaultDescription,
  image = defaultOgImage,
  url = baseUrl,
}: SeoProps) {
  const fullTitle = title === defaultTitle ? title : `${title} | ${defaultTitle}`
  const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Robots */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
    </Head>
  )
}
