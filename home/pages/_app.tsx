import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyHead() {
  return (
    <>
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZCQDT118MM"></script>
        <script>
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-ZCQDT118MM');`}
        </script>
      </Head>
    </>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  return <div>
      <Component {...pageProps} />
      <MyHead></MyHead>
    </div>
}
export default MyApp
