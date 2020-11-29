import React from 'react'
import { getAllCategoryId, getPostsFilteredByCategory, getCatName, getAllCategoryData, getAllCategoryIdWp, getPostsFilteredByCategoryAndLangWp, getAllCategoryWp, getCatNameByLangAndId } from '../../lib/category';
import { Layout } from '../../components/globals';
import Container from '@material-ui/core/Container';
import { Title, PostFlex, CategoryArea, Button, CategoryAreaWp } from '../../components';
import { useSetLangContext, useLangContext, lang } from '../../context/langContext';
import { wpGetAllPostIds } from '../../lib/post';

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

// const test = async() => {
//   const res = await fetch(`https://azerbaijapan.taichi-sigma2.com/wp-json/wp/v2/categories?_fields=id`);
//   console.log(res);
//   const data = await res.text();
//   console.log(data);
//   const data2 = await JSON.parse(data);
//   console.log(data2);
//   const a = await wpGetAllPostIds();
//   console.log(a);
// }
// test();

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
    <Layout title="カテゴリー別一覧">
      <Container maxWidth="lg">
        <Title title={catName.name} subtitle={`お求めの投稿はありましたか？`} />
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
