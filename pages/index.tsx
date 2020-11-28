import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import React from 'react';
import {GetStaticProps} from 'next';
import Container from '@material-ui/core/Container';
import Layout from '../components/globals/Layout';
import { Title, Slick, PostFlex, Button, CategoryArea, Hamburger, LangToggler, LangToggler2, CategoryAreaWp } from '../components';
import { getSortedPostData, wpGetPostsSortedByLang } from '../lib/post';
import { getAllCategoryData, getAllCategoryWp } from '../lib/category';
import {useLangContext, lang} from '../context/langContext';

const indexStyle = {
  fontFamily: 'serif',
  margin: '0 auto 80px',
}


export const getStaticProps: GetStaticProps = async () => {
  const allPostDataJp = await wpGetPostsSortedByLang('ja');
  const allPostDataAze = await wpGetPostsSortedByLang('az');
  const allPostDataEn = await wpGetPostsSortedByLang('en');
  const allPostDataRu = await wpGetPostsSortedByLang('ru');
  const allPostData = {
    'ja': allPostDataJp,
    'aze': allPostDataAze,
    'en': allPostDataEn,
    'ru': allPostDataRu,
  }
  // const allPostData = await getSortedPostData();
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
      allPostData,
      categories
    }
  }
}

const Home = ({allPostData, categories}) => {
  const langTheme = useLangContext();
  const categoriesArray = categories[langTheme.langName];
  const allPostDataArray = allPostData[langTheme.langName];
  
  const thumbnailDataArray = allPostDataArray.map(post => {
    const id = post.id;
    const title = post.title;
    const eyecatch = post.eyecatch;
    const description = post.content;
    const tag = post.tags;
    return {
      id: id,
      title: title,
      eyecatch: eyecatch,
      description: description,
      tag: tag,
    }
  });

  return(
    <Layout home title={lang(langTheme.langName).layout.home}>
      <Container maxWidth="lg">
        <Container maxWidth="sm">
          <div style={indexStyle}>
            <p style={{display: "none",}}>Dear S.K.</p>
            {lang(langTheme.langName).top.description.map((p, i) => {
              return (<p key={i}>{p}</p>)
            })}
            <LangToggler2/>
            <p>You can choose your language from here. And This select menu is also in "MENU" at the top-right corner!</p>
          </div>
        </Container>
        <Title
          title={lang(langTheme.langName).selectedEight.title}
          subtitle={lang(langTheme.langName).selectedEight.subtitle}
        />
        <PostFlex thumbnailDataArray={thumbnailDataArray} isPaginate={false}/>
        <div className="module-spacer--medium"></div>
        <div className="module-spacer--medium"></div>
        <Title
          title={lang(langTheme.langName).posts.title}
          subtitle={lang(langTheme.langName).posts.subtitle}
        />
        {/* <Slick thumbnailDataArray={thumbnailDataArray} /> */}
        <PostFlex thumbnailDataArray={thumbnailDataArray} perPage={8} isPaginate={false}/>
        <div className="module-spacer--medium"></div>
        <Button text={lang(langTheme.langName).buttonText.toArchive} path={"/allposts"} />
        <div className="module-spacer--medium"></div>
        <div className="module-spacer--medium"></div>
        <div className="module-spacer--medium"></div>
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

export default Home;
