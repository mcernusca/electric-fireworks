import '../globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Electric Fireworks</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
