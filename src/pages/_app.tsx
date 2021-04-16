import 'styles/globals.css';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router'
import * as gtag from 'lib/gtag';
import { useEffect } from 'react';
import { ColorProvider } from "context/context";
import { LangProvider } from "context/langContext";
import { Hamburger } from 'components';

function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if (!gtag.existsGaId) return;
    
    const handleRouteChange = (path) => gtag.pageview(path);
    
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])
  return (
    
    <ColorProvider>
      <LangProvider>
        <Hamburger/>
        <Component {...pageProps} />
      </LangProvider>
    </ColorProvider>
  )
}

export default MyApp
