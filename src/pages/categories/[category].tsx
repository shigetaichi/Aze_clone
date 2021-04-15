import React from 'react'
import {
  getAllCategoryIdWp,
  getCategoriesWp,
  getCatNameByLangAndId,
  getPostsFilteredByCategoryAndLangWp
} from '../../lib/category';
import { Layout } from '../../components/globals';
import Container from '@material-ui/core/Container';
import { Button, CategoryAreaWp, PostFlex, TagArea, Title } from '../../components';
import { lang, useLangContext } from '../../context/langContext';
import { getTagsWp } from '../../lib/tags';

export const getStaticPaths = async () => {
  const paths = await getAllCategoryIdWp();
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({params}) => {
  let postsFilteredByCategory: { [key: string]: Array<any> }, catNameArray: { [key: string]: any }, categories, tags;
  postsFilteredByCategory = {
    'ja': [],
    'aze': [],
    'en': [],
    'ru': [],
  };
  catNameArray = {
    'ja': [],
    'aze': [],
    'en': [],
    'ru': [],
  };
  await Promise.all([
    (async () => {
      postsFilteredByCategory.ja = await getPostsFilteredByCategoryAndLangWp('ja', params.category);
    })(),
    (async () => {
      postsFilteredByCategory.aze = await getPostsFilteredByCategoryAndLangWp('az', params.category);
    })(),
    (async () => {
      postsFilteredByCategory.en = await getPostsFilteredByCategoryAndLangWp('en', params.category);
    })(),
    (async () => {
      postsFilteredByCategory.ru = await getPostsFilteredByCategoryAndLangWp('ru', params.category);
    })(),
    (async () => {
      catNameArray.ja = await getCatNameByLangAndId('ja', params.category);
    })(),
    (async () => {
      catNameArray.aze = await getCatNameByLangAndId('az', params.category);
    })(),
    (async () => {
      catNameArray.en = await getCatNameByLangAndId('en', params.category);
    })(),
    (async () => {
      catNameArray.ru = await getCatNameByLangAndId('ru', params.category);
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
      postsFilteredByCategory,
      catNameArray,
      categories,
      tags
    }
  }
}

const Category = ({postsFilteredByCategory, catNameArray, categories, tags}) => {
  const langTheme = useLangContext();
  const thumbnailDataArray = postsFilteredByCategory[langTheme.langName].map(postData => ({
    id: postData.id,
    title: postData.title.rendered,
    eyecatch: postData.acf.eyecatch,
    description: postData.content.rendered,
    tags: postData.tag_name,
  }));
  const catName = catNameArray[langTheme.langName];
  const categoriesArray = categories[langTheme.langName];
  const tagsArray = tags[langTheme.langName];
  
  return (
    <Layout title={catName.name + lang(langTheme.langName).categories.title}>
      <Container maxWidth="lg">
        <Title title={catName.name} subtitle={lang(langTheme.langName).categoryArchive.subtitle}/>
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

export default Category
