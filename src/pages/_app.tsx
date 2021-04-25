import 'styles/globals.scss';
import { AppProps } from 'next/app';
import { NextRouter, useRouter } from 'next/router'
import * as gtag from 'lib/gtag';
import { useEffect } from 'react';
import { ColorProvider } from "context/context";
import { LocaleProvider } from "context/localeContext";
import Layout from "components/organism/Layout/Layout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { fetchWithCache } from "lib/helpers";
import { wpBaseUrl } from "lib/post";
import nprogress from 'nprogress' // NProgressインポート
import 'nprogress/nprogress.css'


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const langString: string = String(context.query.lang);
  let categories = {
    'ja': [],
    'az': [],
    'en': [],
    'ru': [],
  }
  let tags = {
    'ja': [],
    'az': [],
    'en': [],
    'ru': [],
  }
  await Promise.all([
    (async () => {
      categories[langString] = await fetchWithCache(`${wpBaseUrl}/${langString}/wp-json/wp/v2/categories`)
    })(),
    (async () => {
      tags[langString] = await fetchWithCache(`${wpBaseUrl}/${langString}/wp-json/wp/v2/tags`)
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
  const router: NextRouter = useRouter();
  if (process.browser) nprogress.start();
  
  useEffect(() => {
    nprogress.done();
  })
  useEffect(() => {
    if (!gtag.existsGaId) return;
    
    const handleRouteChange = (path: string) => gtag.pageview(path);
    
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])
  return (
    <ColorProvider>
      <LocaleProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LocaleProvider>
    </ColorProvider>
  )
}

export default MyApp
