import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './nav'
import Footer from './footer'
import { Metadata } from 'next'

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

const cx = (...classes) => classes.filter(Boolean).join(' ')
export default function MdxLayout({ children }: { children: React.ReactNode }) {
    // Create any shared layout or styles here
    return (
        <html
          lang="en"
          className={cx(
            'text-black bg-white dark:text-white dark:bg-black',
            'antialiased max-w-xl mx-4 mt-8 lg:mx-auto',
            GeistSans.variable,
            GeistMono.variable
          )}
        >
          <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
            <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
              <Navbar />
              <article className="prose">
                {children}
              </article>
              <Footer />
            </main>
          </body>
        </html>
      )
}