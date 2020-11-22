import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import React from 'react';
import {GetStaticProps} from 'next';
import Container from '@material-ui/core/Container';
import Layout from '../components/globals/Layout';
import { Title, Slick, PostFlex, Button, CategoryArea, Hamburger, LangToggler, LangToggler2 } from '../components';
import { getSortedPostData } from '../lib/post';
import { getAllCategoryData } from '../lib/category';
import {useLangContext, lang} from '../context/langContext';

const indexStyle = {
  fontFamily: 'serif',
  margin: '0 auto 80px',
}


export const getStaticProps: GetStaticProps = async () => {
  const allPostData = await getSortedPostData();
  const categories = await getAllCategoryData();
  return {
    props: {
      allPostData,
      categories
    }
  }
}

const Home = ({allPostData, categories}) => {
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
        <CategoryArea categories={categories} />
      </Container>
    </Layout>
  )
}

export default Home;