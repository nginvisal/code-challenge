import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Default from '../components/layouts/default';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Default> 
      <Component {...pageProps} />
    </Default>
  );
}

export default MyApp
