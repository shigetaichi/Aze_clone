import React from 'react'
import { getAllCategoryId, getPostsFilteredByCategory, getCatName, getAllCategoryData, getAllCategoryIdWp, getPostsFilteredByCategoryAndLangWp, getAllCategoryWp, getCatNameByLangAndId } from '../../lib/category';
import { Layout } from '../../components/globals';
import Container from '@material-ui/core/Container';
import { Title, PostFlex, CategoryArea, Button, CategoryAreaWp } from '../../components';
import { useLangContext, lang } from '../../context/langContext';

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
  // const categories = await getAllCategoryData();
  const categoriesJp = await getAllCategoryWp('ja');
  const categoriesAze = await getAllCategoryWp('az');
  const categoriesEn = await getAllCategoryWp('en');
  const categoriesRu = await getAllCategoryWp('ru');
  const categories = {
    'ja': categoriesJp,
    'aze': categoriesAze,
    'en': categoriesEn,
    'ru': categoriesRu,
  }
  return {
    props: {
      postsFilteredByCategory,
      catNameArray,
      categories
    }
  }
}

const Category = ({postsFilteredByCategory, catNameArray, categories}) => {
  const langTheme = useLangContext();
  const thumbnailDataArray = postsFilteredByCategory[langTheme.langName].map(postData => {
    const id = postData.id;
    const title = postData.title.rendered;
    const eyecatch = postData.acf.eyecatch;
    const description = postData.content.rendered;
    return {id, title, eyecatch, description};
  });
  const catName = catNameArray[langTheme.langName];
  const categoriesArray = categories[langTheme.langName];
  
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
      </Container>
    </Layout>
  )
}

export default Category
