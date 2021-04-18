import { GetServerSideProps } from 'next';
import { Button, LangToggler, Title } from 'components';
import { wpBaseUrl } from 'lib/post';
import { lang, useLangContext } from 'context/langContext';
import { fetchWithCache } from "lib/helpers";
import Head from "next/head";
import PostList from "components/organism/PostList/PostList";


export const getServerSideProps: GetServerSideProps = async () => {
  const allPostsUrl: string = "wp-json/wp/v2/posts?per_page=100&_fields=id,acf,title,date,modified,content,meta,categories,category_name,tags,tag_name";
  let allPostData: { [key: string]: Array<any> };
  allPostData = {
    'ja': [],
    'aze': [],
    'en': [],
    'ru': [],
  }
  await Promise.all([
    (async () => {
      allPostData.ja = await fetchWithCache(`${wpBaseUrl}/ja/${allPostsUrl}`)
    })(),
    (async () => {
      allPostData.aze = await fetchWithCache(`${wpBaseUrl}/az/${allPostsUrl}`)
    })(),
    (async () => {
      allPostData.en = await fetchWithCache(`${wpBaseUrl}/en/${allPostsUrl}`)
    })(),
    (async () => {
      allPostData.ru = await fetchWithCache(`${wpBaseUrl}/ru/${allPostsUrl}`)
    })(),
  ]);
  return {
    props: {
      allPostData,
    }
  }
}

const allposts = ({allPostData}) => {
  const langTheme = useLangContext();
  
  const allPostDataArray = allPostData[langTheme.langName];
  const thumbnailDataArray = allPostDataArray.map(post => ({
    id: post.id,
    title: post.title.rendered,
    eyecatch: post.acf.eyecatch,
    description: post.description,
    tags: post.tag_name,
  }));
  return (
    <>
      <Head>
        <title>{lang(langTheme.langName).layout.archives}</title>
      </Head>
      <LangToggler/>
      <Title
        title={lang(langTheme.langName).allposts.title}
        subtitle={lang(langTheme.langName).allposts.subtitle}
      />
      <PostList thumbnailDataArray={thumbnailDataArray}/>
      <Button path={"/"}>{lang(langTheme.langName).buttonText.toTop}</Button>
    </>
  )
}

export default allposts
