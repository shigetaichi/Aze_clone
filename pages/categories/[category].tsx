import React from 'react'
import { getAllCategoryId, getPostsFilteredByCategory, getCatName, getAllCategoryData, getAllCategoryIdWp, getPostsFilteredByCategoryAndLangWp, getAllCategoryWp, getCatNameByLangAndId, getCategoriesWp } from '../../lib/category';
import { Layout } from '../../components/globals';
import Container from '@material-ui/core/Container';
import { Title, PostFlex, CategoryArea, Button, CategoryAreaWp, TagArea } from '../../components';
import { useLangContext, lang } from '../../context/langContext';
import { getTagsWp } from '../../lib/tags';

export const getStaticPaths = async () => {
  const paths = await getAllCategoryIdWp();
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({params}) => {
  const postsFilteredByCategoryJp = await getPostsFilteredByCategoryAndLangWp('ja',params.category);
  const postsFilteredByCategoryAze = await getPostsFilteredByCategoryAndLangWp('az',params.category);
  const postsFilteredByCategoryEn = await getPostsFilteredByCategoryAndLangWp('en',params.category);
  const postsFilteredByCategoryRu = await getPostsFilteredByCategoryAndLangWp('ru',params.category);
  const postsFilteredByCategory = {
    'ja': postsFilteredByCategoryJp,
    'aze': postsFilteredByCategoryAze,
    'en': postsFilteredByCategoryEn,
    'ru': postsFilteredByCategoryRu,
  }

  const catNameJp = await getCatNameByLangAndId('ja', params.category);
  const catNameAze = await getCatNameByLangAndId('az', params.category);
  const catNameEn = await getCatNameByLangAndId('en', params.category);
  const catNameRu = await getCatNameByLangAndId('ru', params.category);
  const catNameArray = {
    'ja': catNameJp,
    'aze': catNameAze,
    'en': catNameEn,
    'ru': catNameRu,
  }
  const categories = await getCategoriesWp();
  const tags = await getTagsWp();
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
  const thumbnailDataArray = postsFilteredByCategory[langTheme.langName].map(postData => {
    const id = postData.id;
    const title = postData.title.rendered;
    const eyecatch = postData.acf.eyecatch;
    const description = postData.content.rendered;
    const tags = postData.tag_name;
    return {id, title, eyecatch, description, tags};
  });
  const catName = catNameArray[langTheme.langName];
  const categoriesArray = categories[langTheme.langName];
  const tagsArray = tags[langTheme.langName];
  
  return (
    <Layout title={catName.name + lang(langTheme.langName).categories.title}>
      <Container maxWidth="lg">
        <Title title={catName.name} subtitle={lang(langTheme.langName).categoryArchive.subtitle} />
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
        <CategoryAreaWp categories={categoriesArray} />
        <Title
          title={lang(langTheme.langName).tags.title}
          subtitle={lang(langTheme.langName).tags.subtitle}
        />
        <TagArea tags={tagsArray} />
      </Container>
    </Layout>
  )
}

export default Category
