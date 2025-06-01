// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

export default function Document() {
  return (
    <Html
      lang="en"
      className={[
        'text-black bg-white dark:text-white dark:bg-black',
        'antialiased max-w-xl mx-4 mt-8 lg:mx-auto',
        GeistSans.variable,
        GeistMono.variable,
      ].join(' ')}
    >
      <Head />
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
