import Head from 'next/head'
import React from 'react';
import {GetStaticProps} from 'next';
import Container from '@material-ui/core/Container';
import Layout from '../components/globals/Layout';
import { Title, PostFlex, Button, LangToggler3, CategoryAreaWp, TagArea } from '../components';
import { wpGetPostsSortedByLang } from '../lib/post';
import { getCategoriesWp } from '../lib/category';
import {useLangContext, lang} from '../context/langContext';
import { getTagsWp, getPostsFilteredByTagAndLangWp } from '../lib/tags';

const indexStyle = {
  fontFamily: 'serif',
  margin: '0 auto 80px',
}


export const getStaticProps: GetStaticProps = async () => {
  const allPostData = {
    'ja': await wpGetPostsSortedByLang('ja'),
    'aze': await wpGetPostsSortedByLang('az'),
    'en': await wpGetPostsSortedByLang('en'),
    'ru': await wpGetPostsSortedByLang('ru'),
  }
  const categories = await getCategoriesWp();
  const tags = await getTagsWp();
  const postsFilteredByTag = {
    'ja': await getPostsFilteredByTagAndLangWp('ja',8),
    'aze': await getPostsFilteredByTagAndLangWp('az',8),
    'en': await getPostsFilteredByTagAndLangWp('en',8),
    'ru': await getPostsFilteredByTagAndLangWp('ru',8),
  }
  return {
    props: {
      allPostData,
      categories,
      tags,
      postsFilteredByTag,
    }
  }
}

const Home = ({allPostData, categories, tags, postsFilteredByTag}) => {
  const langTheme = useLangContext();
  const categoriesArray = categories[langTheme.langName];
  const allPostDataArray = allPostData[langTheme.langName];
  const tagsArray = tags[langTheme.langName];

  const thumbnailDataArray = allPostDataArray.map(post => ({
    id: post.id,
    title: post.title,
    eyecatch: post.eyecatch,
    description: post.content,
    tags: post.tag_name,
  }));

  const thumbnailDataArraySelected = postsFilteredByTag[langTheme.langName].map(postData => ({
    id: postData.id,
    title: postData.title.rendered,
    eyecatch: postData.acf.eyecatch,
    description: postData.content.rendered,
    tags: postData.tag_name
  }));

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
        <PostFlex thumbnailDataArray={thumbnailDataArraySelected} isPaginate={false}/>
        <div className="module-spacer--medium"></div>
        <div className="module-spacer--medium"></div>
        <Title
          title={lang(langTheme.langName).posts.title}
          subtitle={lang(langTheme.langName).posts.subtitle}
        />
        {/* <Slick thumbnailDataArray={thumbnailDataArray} /> */}
        <PostFlex thumbnailDataArray={thumbnailDataArray} perPage={8} isPaginate={true}/>
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
