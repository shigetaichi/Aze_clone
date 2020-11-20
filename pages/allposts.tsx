import React from 'react'
import {GetStaticProps} from 'next';
import { Layout } from '../components/globals';
import Container from '@material-ui/core/Container';
import { Title, PostFlex, CategoryArea, Button, LangToggler } from '../components';
import { getAllCategoryData } from '../lib/category';
import { getSortedPostData } from '../lib/post';
import {useLangContext, lang} from '../context/langContext';


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
  const langTheme = useLangContext();
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
  <Layout title={lang(langTheme.langName).layout.archives}>
    <Container maxWidth="lg">
      <LangToggler/>
      <Title
        title={lang(langTheme.langName).allposts.title}
        subtitle={lang(langTheme.langName).allposts.subtitle}
      />
      <PostFlex thumbnailDataArray={thumbnailDataArray} perPage={8} isPaginate={true}/>
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
      <CategoryArea categories={categories} />
    </Container>
  </Layout>
  )
}

export default allposts
