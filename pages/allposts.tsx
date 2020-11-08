import React from 'react'
import {GetStaticProps} from 'next';
import { Layout } from '../components/globals';
import Container from '@material-ui/core/Container';
import { Title, PostFlex, CategoryArea, Button } from '../components';
import { getAllCategoryData } from '../lib/category';
import { getSortedPostData } from '../lib/post';


export const getStaticProps: GetStaticProps = async () => {

  const allPostData = await getSortedPostData();
  const categories = await getAllCategoryData();
  return {
    props: {
      allPostData,
      categories,
    }
  }
}

const allposts = ({allPostData, categories}) => {
  const thumbnailDataArray = allPostData.map(post => {
    const id = post.id;
    const title = post.title;
    const eyecatch = post.eyecatch;
    const description = post.description;
    const tag = post.tag;
    return {
      id: id,
      title: title,
      eyecatch: eyecatch,
      description: description,
      tag: tag,
    }
  });
  return (
  <Layout title="全投稿一覧">
    <Container maxWidth="lg">
      <Title title={"全投稿一覧"} subtitle={"Azerbaijapanの全てがここにあります。"} />
      <PostFlex thumbnailDataArray={thumbnailDataArray} perPage={8} isPaginate={true}/>
      <div className="module-spacer--medium"></div>
      <div className="module-spacer--medium"></div>
    </Container>
    <Button text={"Topへ"} path={"/"}/>
    <div className="module-spacer--medium"></div>
    <div className="module-spacer--medium"></div>
    <Container maxWidth="lg">
      <Title title={"CATEGORIES"} subtitle={"他のカテゴリーも探索してみて下さい"}/>
      <CategoryArea categories={categories} />
    </Container>
  </Layout>
  )
}

export default allposts
