import React from 'react'
import { getAllCategoryId, getPostsFilteredByCategory, getCatName, getAllCategoryData } from '../../lib/category';
import { Layout } from '../../components/globals';
import Container from '@material-ui/core/Container';
import { Title, PostFlex, CategoryArea, Button } from '../../components';

export const getStaticPaths = async () => {
  const paths = await getAllCategoryId();
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({params}) => {
  const postsFilteredByCategory = await getPostsFilteredByCategory(params.category);
  const catName = await getCatName(params.category);
  const categories = await getAllCategoryData();
  return {
    props: {
      postsFilteredByCategory,
      catName,
      categories
    }
  }
}

const Category = ({postsFilteredByCategory, catName, categories}) => {
  const thumbnailDataArray = postsFilteredByCategory.map(postData => {
    const id = postData.id;
    const title = postData.title;
    const eyecatch = postData.eyecatch;
    const description = postData.description;
    return {id, title, eyecatch, description};
  })
  
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
        <Title title={"CATEGORIES"} subtitle={"他のカテゴリーも探索してみて下さい"}/>
        <CategoryArea categories={categories} />
      </Container>
    </Layout>
  )
}

export default Category
