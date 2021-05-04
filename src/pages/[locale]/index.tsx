import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { perPage, wpBaseUrl } from 'lib/post';
import { locale, LocaleType, useLocaleContext } from 'context/localeContext';
import { fetchWithCache, filterPostDataArray } from "lib/helpers";
import { langType } from "types";
import Top from "components/template/Top/Top";


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const langString: string = String(context.query.locale);
  const p: number = Number(context.query.page);
  const allPostsUrl: string = `wp-json/wp/v2/posts`;
  let allPostData: langType = {
    'ja': [],
    'az': [],
    'en': [],
    'ru': [],
  }, postsFilteredByTag: langType = {
    'ja': [],
    'az': [],
    'en': [],
    'ru': [],
  }
  await Promise.all([
    (async () => {
      allPostData[langString] = await fetchWithCache(`${wpBaseUrl}/${allPostsUrl}?lang=${langString}&per_page=${perPage}&page=${p ? p : 1}`)
    })(),
    (async () => {
      postsFilteredByTag[langString] = await fetchWithCache(`${wpBaseUrl}/${allPostsUrl}?tags=${8}&lang=${langString}`);
    })(),
  ]);
  return {
    props: {
      allPostData,
      postsFilteredByTag,
    }
  }
}

const Home = ({allPostData, postsFilteredByTag}) => {
  const localeContext: LocaleType = useLocaleContext();
  
  const thumbnailDataArray = filterPostDataArray(allPostData[localeContext]);
  
  const thumbnailDataArraySelected = filterPostDataArray(postsFilteredByTag[localeContext]);
  
  return (
    <>
      <Head>
        <meta property="og:type" content="website"/>
        <title>{locale(localeContext).layout.home}</title>
      </Head>
      
      <Top arraySelected={thumbnailDataArraySelected} topArray={thumbnailDataArray}/>
    </>
  )
}

export default Home;
