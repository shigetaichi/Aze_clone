import React from 'react'
import { getAllCategoryId, getPostsFilteredByCategory, getCatName, getAllCategoryData, getAllCategoryIdWp, getPostsFilteredByCategoryAndLangWp, getCatNameWp, getAllCategoryWp } from '../../lib/category';
import { Layout } from '../../components/globals';
import Container from '@material-ui/core/Container';
import { Title, PostFlex, CategoryArea, Button, CategoryAreaWp } from '../../components';
import { useSetLangContext, useLangContext, lang } from '../../context/langContext';

export const getStaticPaths = async () => {
  const paths = await getAllCategoryIdWp();
  // const paths = await getAllCategoryId();
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
      categories
    }
  }
}

const Category = ({postsFilteredByCategory, categories}) => {
  let catName;
  const langTheme = useLangContext();
  const postsFilteredByCategoryAndLang = postsFilteredByCategory[langTheme.langName];
  const thumbnailDataArray = postsFilteredByCategoryAndLang.map(postData => {
    catName = postData.category_name[0];
    const id = postData.id;
    const title = postData.title.rendered;
    const eyecatch = postData.acf.eyecatch;
    const description = postData.content.rendered;
    return {id, title, eyecatch, description};
  });
  const categoriesArray = categories[langTheme.langName];
  
  
  return (
    <Layout title="カテゴリー別一覧">
      <Container maxWidth="lg">
        <Title title={catName} subtitle={`お求めの投稿はありましたか？`} />
        <PostFlex thumbnailDataArray={thumbnailDataArray}/>
        <div className="module-spacer--medium"></div>
        <div className="module-spacer--medium"></div>
      </Container>
      <div className="module-spacer--medium"></div>
      <div className="module-spacer--medium"></div>
      <Button text={"投稿一覧へ"} path={"/allposts"}/>
      <div className="module-spacer--medium"></div>
      <div className="module-spacer--medium"></div>
      <Container maxWidth="lg">
        {/* <Title title={"CATEGORIES"} subtitle={"他のカテゴリーも探索してみて下さい"}/> */}
        <Title
          title={lang(langTheme.langName).categories.title}
          subtitle={lang(langTheme.langName).categories.subtitle}
        />
        {/* <CategoryArea categories={categories} /> */}
        <CategoryAreaWp categories={categoriesArray} />
      </Container>
    </Layout>
  )
}

export default Category
