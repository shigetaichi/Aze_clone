import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { wpBaseUrl } from 'lib/post';
import { locale, LocaleType, useLocaleContext } from 'context/localeContext';
import { fetchWithCache } from "lib/helpers";
import Head from "next/head";
import PostList from "components/organism/PostList/PostList";
import { langType } from "types";
import LangSelect from "components/atom/LangSelect/LangSelect";
import Title from "components/atom/Title/Title";
import Button from "components/atom/Button/Button";
import { NextRouter, useRouter } from "next/router";


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const langString: string = String(context.query.locale)
  // const allPostsUrl: string = "wp-json/wp/v2/posts?per_page=100&_fields=id,acf,title,date,modified,content,meta,categories,category_name,tags,tag_name";
  const allPostsUrl: string = "wp-json/wp/v2/posts";
  let allPostData: langType = {
    'ja': [],
    'az': [],
    'en': [],
    'ru': [],
  }
  await Promise.all([
    (async () => {
      allPostData[langString] = await fetchWithCache(`${wpBaseUrl}/${allPostsUrl}?lang=${langString}`)
    })(),
  ]);
  return {
    props: {
      allPostData,
    }
  }
}

const allposts = ({allPostData}) => {
  const router: NextRouter = useRouter();
  const localeContext: LocaleType = useLocaleContext();
  console.log(allPostData)
  const allPostDataArray = allPostData[localeContext];
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
        <title>{locale(localeContext).layout.archives}</title>
      </Head>
      <LangSelect/>
      <Title
        title={locale(localeContext).allposts.title}
        subtitle={locale(localeContext).allposts.subtitle}
      />
      <PostList thumbnailDataArray={thumbnailDataArray}/>
      <Button path={`/${String(router.query.locale)}`}>{locale(localeContext).buttonText.toTop}</Button>
    </>
  )
}

export default allposts
