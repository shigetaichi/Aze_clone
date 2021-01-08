import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import React from 'react';
import {GetStaticProps} from 'next';
import Container from '@material-ui/core/Container';
import Layout from '../components/globals/Layout';
import { Title, PostFlex, Button, LangToggler3, CategoryAreaWp, TagArea } from '../components';
import { wpGetPostsSortedByLang } from '../lib/post';
import { getCategoriesWp } from '../lib/category';
import {useLangContext, lang} from '../context/langContext';
import { getTagsWp } from '../lib/tags';

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
  const categories = await getCategoriesWp();
  const tags = await getTagsWp();
  return {
    props: {
      allPostData,
      categories,
      tags
    }
  }
}

const Home = ({allPostData, categories, tags}) => {
  const langTheme = useLangContext();
  const categoriesArray = categories[langTheme.langName];
  const allPostDataArray = allPostData[langTheme.langName];
  const tagsArray = tags[langTheme.langName];
  
  const thumbnailDataArray = allPostDataArray.map(post => {
    const id = post.id;
    const title = post.title;
    const eyecatch = post.eyecatch;
    const description = post.content;
    const tags = post.tag_name;
    return {
      id: id,
      title: title,
      eyecatch: eyecatch,
      description: description,
      tags: tags,
    }
  });

  return(
    <Layout home title={lang(langTheme.langName).layout.home}>
      <Head>
        <meta property="og:type" content="website"/>
      </Head>
      <Container maxWidth="lg">
        <Container maxWidth="sm">
          <div style={indexStyle}>
            <p style={{display: "none",}}>Dear S.K.</p>
            {lang(langTheme.langName).top.description.map((p, i) => {
              return (<p key={i}>{p}</p>)
            })}
            <LangToggler3/>
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

export default Home;
