import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Script from 'next/script'

function MyHead() {
  return (
    <>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-ZCQDT118MM"></Script>
        <Script>
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-ZCQDT118MM');`}
        </Script>
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
