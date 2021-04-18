import 'styles/globals.scss';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router'
import * as gtag from 'lib/gtag';
import { useEffect } from 'react';
import { ColorProvider } from "context/context";
import { LangProvider } from "context/langContext";
import { Hamburger } from 'components';
import Layout from "components/organism/Layout/Layout";
import { GetServerSideProps } from "next";
import { fetchWithCache } from "../lib/helpers";
import { wpBaseUrl } from "../lib/post";


export const getServerSideProps: GetServerSideProps = async () => {
  let categories = {
    'ja': [],
    'aze': [],
    'en': [],
    'ru': [],
  }
  let tags = {
    'ja': [],
    'aze': [],
    'en': [],
    'ru': [],
  }
  await Promise.all([
    (async () => {
      categories['aze'] = await fetchWithCache(`${wpBaseUrl}/ja/wp-json/wp/v2/categories`)
    })(),
    (async () => {
      categories['en'] = await fetchWithCache(`${wpBaseUrl}/en/wp-json/wp/v2/categories`)
    })(),
    (async () => {
      categories['ru'] = await fetchWithCache(`${wpBaseUrl}/ja/wp-json/wp/v2/categories`)
    })(),
    (async () => {
      tags['ja'] = await fetchWithCache(`${wpBaseUrl}/ja/wp-json/wp/v2/tags`)
    })(),
    (async () => {
      tags['aze'] = await fetchWithCache(`${wpBaseUrl}/ja/wp-json/wp/v2/tags`)
    })(),
    (async () => {
      tags['en'] = await fetchWithCache(`${wpBaseUrl}/en/wp-json/wp/v2/tags`)
    })(),
    (async () => {
      tags['ru'] = await fetchWithCache(`${wpBaseUrl}/ja/wp-json/wp/v2/tags`)
    })(),
  ]);
  return {
    props: {
      categories,
      tags,
    }
  }
}

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
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LangProvider>
    </ColorProvider>
  )
}

export default MyApp
