import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { perPage, wpBaseUrl } from 'lib/post';
import { locale, LocaleType, useLocaleContext } from 'contexts/localeContext';
import { fetchWithCache } from "lib/helpers";
import Head from "next/head";
import PostList from "components/organisms/PostList/PostList";
import { langType } from "types";
import LangSelect from "components/atoms/LangSelect/LangSelect";
import Title from "components/atoms/Title/Title";
import Button from "components/atoms/Button/Button";
import { NextRouter, useRouter } from "next/router";
import Pagination from "components/molecules/Pagination/Pagination";
import { useEffect, useState } from "react";


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const langString: string = String(context.query.locale);
  const p: number = Number(context.query.page);
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
      allPostData[langString] = await fetchWithCache(`${wpBaseUrl}/${allPostsUrl}?lang=${langString}&per_page=${perPage}&page=${p ? p : 1}`)
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
  const [total, setTotal] = useState(0);
  const [paginateVisible, setPaginateVisible] = useState<boolean>(false);
  
  const thumbnailDataArray = allPostData[localeContext].map(post => ({
    id: post.id,
    title: post.title.rendered,
    eyecatch: post.acf.eyecatch,
    description: post.description,
    tags: post.tag_name,
  }));
  
  
  useEffect(() => {
    if (!localeContext) return;
    fetch(`${wpBaseUrl}/wp-json/wp/v2/posts?lang=${localeContext}`).then(res => {
      setTotal(Number(res.headers.get('X-WP-Total')));
      setPaginateVisible(true);
    })
    return () => {
    };
  }, [localeContext]);
  
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
      {paginateVisible && (<Pagination perPage={perPage} total={total}/>)}
      <Button path={`/${String(router.query.locale)}`}>{locale(localeContext).buttonText.toTop}</Button>
    </>
  )
}

export default allposts
