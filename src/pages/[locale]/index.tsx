import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { perPage, wpBaseUrl } from 'lib/post';
import { locale, LocaleType, useLocaleContext } from 'context/localeContext';
import { fetchWithCache } from "lib/helpers";
import { langType } from "types";
import Top from "components/template/Top/Top";


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const langString: string = String(context.query.locale);
  const p: number = Number(context.query.page);
  const allPostsUrl: string = `wp-json/wp/v2/posts`;
  // const allPostsUrl: string = `wp-json/wp/v2/posts?per_page=100&?lang=${langString}&_fields=id,acf,title,date,modified,content,meta,categories,category_name,tags,tag_name`;
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
    // (async () => {
    //   postsFilteredByTag[langString] = await getPostsFilteredByTagAndLangWp(langString, 8);
    // })(),
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
  
  const thumbnailDataArray = allPostData[localeContext].map(post => ({
    id: post.id,
    title: post.title.rendered,
    eyecatch: post.acf.eyecatch,
    description: post.content.rendered,
    tags: post.tag_name,
  }));
  
  const thumbnailDataArraySelected = postsFilteredByTag[localeContext].map(postData => ({
    id: postData.id,
    title: postData.title.rendered,
    eyecatch: postData.acf.eyecatch,
    description: postData.content.rendered,
    tags: postData.tag_name
  }));
  
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
