import React from 'react'
import { GetStaticProps } from 'next';
import { Layout } from '../components/globals';
import Container from '@material-ui/core/Container';
import { Button, CategoryAreaWp, LangToggler, PostFlex, TagArea, Title } from '../components';
import { getCategoriesWp } from '../lib/category';
import { wpGetPostsSortedByLang } from '../lib/post';
import { lang, useLangContext } from '../context/langContext';
import { getTagsWp } from '../lib/tags';


export const getStaticProps: GetStaticProps = async () => {
  let allPostData: { [key: string]: Array<any> }, categories, tags;
  allPostData = {
    'ja': [],
    'aze': [],
    'en': [],
    'ru': [],
  }
  await Promise.all([
    (async () => {
      allPostData.ja = await wpGetPostsSortedByLang('ja')
    })(),
    (async () => {
      allPostData.aze = await wpGetPostsSortedByLang('az')
    })(),
    (async () => {
      allPostData.en = await wpGetPostsSortedByLang('en')
    })(),
    (async () => {
      allPostData.ru = await wpGetPostsSortedByLang('ru')
    })(),
    (async () => {
      categories = await getCategoriesWp();
    })(),
    (async () => {
      tags = await getTagsWp();
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
    title: post.title,
    eyecatch: post.eyecatch,
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
        <div className="module-spacer--medium"></div>
        <div className="module-spacer--medium"></div>
      </Container>
      <Button text={lang(langTheme.langName).buttonText.toTop} path={"/"}/>
      <div className="module-spacer--medium"></div>
      <div className="module-spacer--medium"></div>
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
