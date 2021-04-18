import Head from 'next/head'
import { GetServerSideProps } from 'next';
import { Button, LangToggler3, PostFlex, Title } from 'components';
import { wpBaseUrl } from 'lib/post';
import { lang, LangContext, useLangContext } from 'context/langContext';
import { getPostsFilteredByTagAndLangWp } from 'lib/tags';
import { fetchWithCache } from "lib/helpers";
import { langType } from "../types";
import styles from "styles/index.module.scss";


export const getServerSideProps: GetServerSideProps = async () => {
  const allPostsUrl: string = "wp-json/wp/v2/posts?per_page=100&_fields=id,acf,title,date,modified,content,meta,categories,category_name,tags,tag_name";
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
      allPostData['ja'] = await fetchWithCache(`${wpBaseUrl}/ja/${allPostsUrl}`)
    })(),
    (async () => {
      allPostData['az'] = await fetchWithCache(`${wpBaseUrl}/az/${allPostsUrl}`)
    })(),
    (async () => {
      allPostData['en'] = await fetchWithCache(`${wpBaseUrl}/en/${allPostsUrl}`)
    })(),
    (async () => {
      allPostData['ru'] = await fetchWithCache(`${wpBaseUrl}/ru/${allPostsUrl}`)
    })(),
    (async () => {
      postsFilteredByTag['ja'] = await getPostsFilteredByTagAndLangWp('ja', 8);
    })(),
    (async () => {
      postsFilteredByTag['az'] = await getPostsFilteredByTagAndLangWp('az', 8);
    })(),
    (async () => {
      postsFilteredByTag['en'] = await getPostsFilteredByTagAndLangWp('en', 8);
    })(),
    (async () => {
      postsFilteredByTag['ru'] = await getPostsFilteredByTagAndLangWp('ru', 8);
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
      <PostFlex thumbnailDataArray={thumbnailDataArraySelected} isPaginate={false}/>
      <div className="m-s-36"/>
      <div className="m-s-36"/>
      <Title
        title={lang(langTheme.langName).posts.title}
        subtitle={lang(langTheme.langName).posts.subtitle}
      />
      <PostFlex thumbnailDataArray={thumbnailDataArray} perPage={8} isPaginate={true}/>
      <div className="m-s-36"/>
      <Button path={"/allposts"}>{lang(langTheme.langName).buttonText.toArchive} </Button>
      <div className="m-s-36"/>
      <div className="m-s-36"/>
      <div className="m-s-36"/>
    </>
  )
}

export default Home;
