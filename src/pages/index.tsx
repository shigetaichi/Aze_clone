import Head from 'next/head'
import React from 'react';
import { GetServerSideProps } from 'next';
import Container from '@material-ui/core/Container';
import Layout from 'components/globals/Layout';
import { Button, CategoryAreaWp, LangToggler3, PostFlex, TagArea, Title } from 'components';
import { wpBaseUrl } from 'lib/post';
import { lang, useLangContext } from 'context/langContext';
import { getPostsFilteredByTagAndLangWp } from 'lib/tags';
import { fetchWithCache } from "../lib/helpers";

const indexStyle = {
  fontFamily: 'serif',
  margin: '0 auto 80px',
}


export const getServerSideProps: GetServerSideProps = async () => {
  const allPostsUrl: string = "wp-json/wp/v2/posts?per_page=100&_fields=id,acf,title,date,modified,content,meta,categories,category_name,tags,tag_name";
  let allPostData: { [key: string]: Array<any> }, categories, tags, postsFilteredByTag;
  allPostData = {
    'ja': [],
    'aze': [],
    'en': [],
    'ru': [],
  }
  postsFilteredByTag = {
    'ja': [],
    'aze': [],
    'en': [],
    'ru': [],
  }
  categories = {
    'ja': [],
    'aze': [],
    'en': [],
    'ru': [],
  }
  tags = {
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
    (async () => {
      categories['ja'] = await fetchWithCache(`${wpBaseUrl}/ja/wp-json/wp/v2/categories`)
    })(),
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
    (async () => {
      postsFilteredByTag.ja = await getPostsFilteredByTagAndLangWp('ja', 8);
    })(),
    (async () => {
      postsFilteredByTag.aze = await getPostsFilteredByTagAndLangWp('az', 8);
    })(),
    (async () => {
      postsFilteredByTag.en = await getPostsFilteredByTagAndLangWp('en', 8);
    })(),
    (async () => {
      postsFilteredByTag.ru = await getPostsFilteredByTagAndLangWp('ru', 8);
    })(),
  ]);
  return {
    props: {
      allPostData,
      categories,
      tags,
      postsFilteredByTag,
    }
  }
}

const Home = ({allPostData, categories, tags, postsFilteredByTag}) => {
  const langTheme = useLangContext();
  const categoriesArray = categories[langTheme.langName];
  const allPostDataArray = allPostData[langTheme.langName];
  const tagsArray = tags[langTheme.langName];
  
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
    <Layout home title={lang(langTheme.langName).layout.home}>
      <Head>
        <meta property="og:type" content="website"/>
      </Head>
      <Container maxWidth="lg">
        <Container maxWidth="sm">
          <div style={indexStyle}>
            <p style={{display: "none",}}>Dear S.K.</p>
            {lang(langTheme.langName).top.description.map((p: string, i: number) => <p key={i}>{p}</p>)}
            <LangToggler3/>
          </div>
        </Container>
        <Title
          title={lang(langTheme.langName).selectedEight.title}
          subtitle={lang(langTheme.langName).selectedEight.subtitle}
        />
        <PostFlex thumbnailDataArray={thumbnailDataArraySelected} isPaginate={false}/>
        <div className="module-spacer--medium"/>
        <div className="module-spacer--medium"/>
        <Title
          title={lang(langTheme.langName).posts.title}
          subtitle={lang(langTheme.langName).posts.subtitle}
        />
        <PostFlex thumbnailDataArray={thumbnailDataArray} perPage={8} isPaginate={true}/>
        <div className="module-spacer--medium"/>
        <Button path={"/allposts"}>{lang(langTheme.langName).buttonText.toArchive} </Button>
        <div className="module-spacer--medium"/>
        <div className="module-spacer--medium"/>
        <div className="module-spacer--medium"/>
        <Title
          title={lang(langTheme.langName).categories.title}
          subtitle={lang(langTheme.langName).categories.subtitle}
        />
        <CategoryAreaWp categories={categoriesArray}/>
        <Title
          title={lang(langTheme.langName).tags.title}
          subtitle={lang(langTheme.langName).tags.subtitle}
        />
        <TagArea tags={tagsArray}/>
      </Container>
    </Layout>
  )
}

export default Home;
