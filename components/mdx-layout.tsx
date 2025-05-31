// components/mdx-layout.tsx
import { Navbar } from './nav'
import Footer from './footer'

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
      <Navbar />
      <article className="prose">
        {children}
      </article>
      <Footer />
    </main>
  )
}
