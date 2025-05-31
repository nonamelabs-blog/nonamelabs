import '../styles/global.css'
import type { AppProps } from 'next/app'
import MdxLayout from '../components/mdx-layout'
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return <MdxLayout>
    <Component {...pageProps} />
  </MdxLayout>
}