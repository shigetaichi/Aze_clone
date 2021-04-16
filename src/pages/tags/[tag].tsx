import React from 'react'
import { Layout } from '../../components/globals';
import Container from '@material-ui/core/Container';
import { Button, CategoryAreaWp, PostFlex, TagArea, Title } from '../../components';
import { lang, useLangContext } from '../../context/langContext';
import { getCategoriesWp } from '../../lib/category';
import { getPostsFilteredByTagAndLangWp, getTagNameByLangAndId, getTagsWp } from '../../lib/tags';
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  let postsFilteredByTag: { [key: string]: Array<any> }, tagNameArray: { [key: string]: any }, categories, tags;
  postsFilteredByTag = {
    'ja': [],
    'aze': [],
    'en': [],
    'ru': [],
  }
  tagNameArray = {
    'ja': [],
    'aze': [],
    'en': [],
    'ru': [],
  }
  await Promise.all([
    (async () => {
      postsFilteredByTag.ja = await getPostsFilteredByTagAndLangWp('ja', Number(context.query.tag));
    })(),
    (async () => {
      postsFilteredByTag.aze = await getPostsFilteredByTagAndLangWp('az', Number(context.query.tag));
    })(),
    (async () => {
      postsFilteredByTag.en = await getPostsFilteredByTagAndLangWp('en', Number(context.query.tag));
    })(),
    (async () => {
      postsFilteredByTag.ru = await getPostsFilteredByTagAndLangWp('ru', Number(context.query.tag));
    })(),
    (async () => {
      tagNameArray.ja = await getTagNameByLangAndId('ja', Number(context.query.tag));
    })(),
    (async () => {
      tagNameArray.aze = await getTagNameByLangAndId('az', Number(context.query.tag));
    })(),
    (async () => {
      tagNameArray.en = await getTagNameByLangAndId('en', Number(context.query.tag));
    })(),
    (async () => {
      tagNameArray.ru = await getTagNameByLangAndId('ru', Number(context.query.tag));
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
      postsFilteredByTag,
      tagNameArray,
      categories,
      tags
    }
  }
}

const Tag = ({postsFilteredByTag, tagNameArray, categories, tags}) => {
  const langTheme = useLangContext();
  const thumbnailDataArray = postsFilteredByTag[langTheme.langName].map(postData => ({
    id: postData.id,
    title: postData.title.rendered,
    eyecatch: postData.acf.eyecatch,
    description: postData.content.rendered,
    tags: postData.tag_name
  }));
  const tagName = tagNameArray[langTheme.langName];
  const categoriesArray = categories[langTheme.langName];
  const tagsArray = tags[langTheme.langName];
  
  return (
    <Layout title={tagName.name + lang(langTheme.langName).categories.title}>
      <Container maxWidth="lg">
        <Title title={tagName.name} subtitle={lang(langTheme.langName).categoryArchive.subtitle}/>
        <PostFlex thumbnailDataArray={thumbnailDataArray}/>
        <div className="module-spacer--medium"/>
        <div className="module-spacer--medium"/>
      </Container>
      <div className="module-spacer--medium"/>
      <div className="module-spacer--medium"/>
      <Button path={"/allposts"}>{lang(langTheme.langName).buttonText.toArchive}</Button>
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

export default Tag
