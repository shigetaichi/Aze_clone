import React from 'react'
import { Layout } from '../../components/globals';
import Container from '@material-ui/core/Container';
import { Button, CategoryAreaWp, PostFlex, TagArea, Title } from '../../components';
import { lang, useLangContext } from '../../context/langContext';
import { getCategoriesWp } from '../../lib/category';
import { getAllTagIdWp, getPostsFilteredByTagAndLangWp, getTagNameByLangAndId, getTagsWp } from '../../lib/tags';

export const getStaticPaths = async () => {
  const paths = await getAllTagIdWp();
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({params}) => {
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
      postsFilteredByTag.ja = await getPostsFilteredByTagAndLangWp('ja', params.tag);
    })(),
    (async () => {
      postsFilteredByTag.aze = await getPostsFilteredByTagAndLangWp('az', params.tag);
    })(),
    (async () => {
      postsFilteredByTag.en = await getPostsFilteredByTagAndLangWp('en', params.tag);
    })(),
    (async () => {
      postsFilteredByTag.ru = await getPostsFilteredByTagAndLangWp('ru', params.tag);
    })(),
    (async () => {
      tagNameArray.ja = await getTagNameByLangAndId('ja', params.tag);
    })(),
    (async () => {
      tagNameArray.aze = await getTagNameByLangAndId('az', params.tag);
    })(),
    (async () => {
      tagNameArray.en = await getTagNameByLangAndId('en', params.tag);
    })(),
    (async () => {
      tagNameArray.ru = await getTagNameByLangAndId('ru', params.tag);
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
        <div className="module-spacer--medium"></div>
        <div className="module-spacer--medium"></div>
      </Container>
      <div className="module-spacer--medium"></div>
      <div className="module-spacer--medium"></div>
      <Button text={lang(langTheme.langName).buttonText.toArchive} path={"/allposts"}/>
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

export default Tag
