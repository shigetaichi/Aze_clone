import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Button, Title } from 'components';
import { wpBaseUrl } from 'lib/post';
import { lang, useLangContext } from 'context/langContext';
import { fetchWithCache } from "lib/helpers";
import Head from "next/head";
import PostList from "components/organism/PostList/PostList";
import { langType } from "types";
import LangSelect from "components/atom/LangSelect/LangSelect";


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const langString: string = String(context.query.lang)
  const allPostsUrl: string = "wp-json/wp/v2/posts?per_page=100&_fields=id,acf,title,date,modified,content,meta,categories,category_name,tags,tag_name";
  let allPostData: langType = {
    'ja': [],
    'az': [],
    'en': [],
    'ru': [],
  }
  await Promise.all([
    (async () => {
      allPostData[langString] = await fetchWithCache(`${wpBaseUrl}/${langString}/${allPostsUrl}`)
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
      <LangSelect/>
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
