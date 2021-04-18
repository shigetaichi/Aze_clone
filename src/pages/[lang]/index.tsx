import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Button, LangToggler3, PostFlex, Title } from 'components';
import { wpBaseUrl } from 'lib/post';
import { lang, LangContext, useLangContext } from 'context/langContext';
import { getPostsFilteredByTagAndLangWp } from 'lib/tags';
import { fetchWithCache } from "lib/helpers";
import { langType } from "types";
import styles from "styles/index.module.scss";
import Pagination from "components/molecules/Pagination/Pagination";
import { NextRouter, useRouter } from "next/router";


export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const allPostsUrl: string = "wp-json/wp/v2/posts?per_page=100&_fields=id,acf,title,date,modified,content,meta,categories,category_name,tags,tag_name";
  const langString: string = String(context.query.lang);
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
      allPostData[langString] = await fetchWithCache(`${wpBaseUrl}/${langString}/${allPostsUrl}`)
    })(),
    (async () => {
      postsFilteredByTag[langString] = await getPostsFilteredByTagAndLangWp(langString, 8);
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
  const router: NextRouter = useRouter();
  const langTheme: LangContext = useLangContext();
  const allPostDataArray = allPostData[langTheme.langName];
  
  const thumbnailDataArray = allPostDataArray.map(post => ({
    id: post.id,
    title: post.title.rendered,
    eyecatch: post.acf.eyecatch,
    description: post.content.rendered,
    tags: post.tag_name,
  }));
  
  const thumbnailDataArraySelected = postsFilteredByTag[langTheme.langName].map(postData => ({
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
        <title>{lang(langTheme.langName).layout.home}</title>
      </Head>
      <div className={styles.indexStatement}>
        <div className={styles.left}>
          <p style={{display: "none",}}>Dear S.K.</p>
          {lang(langTheme.langName).top.description.map((p: string, i: number) => <p key={i}>{p}</p>)}
        </div>
        <div className={styles.right}>
          <LangToggler3/>
        </div>
      </div>
      
      <Title
        title={lang(langTheme.langName).selectedEight.title}
        subtitle={lang(langTheme.langName).selectedEight.subtitle}
      />
      <PostFlex thumbnailDataArray={thumbnailDataArraySelected}/>
      <Pagination perPage={10} total={330}/>
      <div className="m-s-36"/>
      <div className="m-s-36"/>
      <Title
        title={lang(langTheme.langName).posts.title}
        subtitle={lang(langTheme.langName).posts.subtitle}
      />
      <PostFlex thumbnailDataArray={thumbnailDataArray}/>
      <Pagination perPage={10} total={330}/>
      <div className="m-s-36"/>
      <Button path={`/${String(router.query.lang)}/allposts`}>{lang(langTheme.langName).buttonText.toArchive}</Button>
      <div className="m-s-36"/>
      <div className="m-s-36"/>
      <div className="m-s-36"/>
    </>
  )
}

export default Home;
