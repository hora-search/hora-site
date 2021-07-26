import '../styles/globals.scss';
import 'highlight.js/scss/base16/solarized-light.scss'
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
