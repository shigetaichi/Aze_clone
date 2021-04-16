import React from 'react'
import { GetServerSideProps } from 'next';
import { Layout } from '../components/globals';
import Container from '@material-ui/core/Container';
import { Button, CategoryAreaWp, LangToggler, PostFlex, TagArea, Title } from '../components';
import { wpBaseUrl } from '../lib/post';
import { lang, useLangContext } from '../context/langContext';
import { fetchWithCache } from "../lib/helpers";


export const getServerSideProps: GetServerSideProps = async () => {
  const allPostsUrl: string = "wp-json/wp/v2/posts?per_page=100&_fields=id,acf,title,date,modified,content,meta,categories,category_name,tags,tag_name";
  let allPostData: { [key: string]: Array<any> }, categories, tags;
  allPostData = {
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
  ]);
  return {
    props: {
      allPostData,
      categories,
      tags
    }
  }
}

const allposts = ({allPostData, categories, tags}) => {
  const langTheme = useLangContext();
  
  const allPostDataArray = allPostData[langTheme.langName];
  const categoriesArray = categories[langTheme.langName];
  const tagsArray = tags[langTheme.langName];
  const thumbnailDataArray = allPostDataArray.map(post => ({
    id: post.id,
    title: post.title.rendered,
    eyecatch: post.acf.eyecatch,
    description: post.description,
    tags: post.tag_name,
  }));
  return (
    <Layout title={lang(langTheme.langName).layout.archives}>
      <Container maxWidth="lg">
        <LangToggler/>
        <Title
          title={lang(langTheme.langName).allposts.title}
          subtitle={lang(langTheme.langName).allposts.subtitle}
        />
        <PostFlex thumbnailDataArray={thumbnailDataArray} perPage={12} isPaginate={true}/>
        <div className="module-spacer--medium"/>
        <div className="module-spacer--medium"/>
      </Container>
      <Button path={"/"}>{lang(langTheme.langName).buttonText.toTop}</Button>
      <div className="module-spacer--medium"/>
      <div className="module-spacer--medium"/>
      <Container maxWidth="lg">
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

export default allposts
