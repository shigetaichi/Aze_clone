import React from 'react'
import {GetStaticProps} from 'next';
import { Layout } from '../components/globals';
import Container from '@material-ui/core/Container';
import { Title, PostFlex, Button, LangToggler, CategoryAreaWp, TagArea } from '../components';
import { getCategoriesWp } from '../lib/category';
import { wpGetPostsSortedByLang } from '../lib/post';
import {useLangContext, lang} from '../context/langContext';
import { getTagsWp } from '../lib/tags';


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

const allposts = ({allPostData, categories, tags}) => {
  const langTheme = useLangContext();

  const allPostDataArray = allPostData[langTheme.langName];
  const categoriesArray = categories[langTheme.langName];
  const tagsArray = tags[langTheme.langName];
  const thumbnailDataArray = allPostDataArray.map(post => {
    return {
      id: post.id,
      title: post.title,
      eyecatch: post.eyecatch,
      description: post.description,
      tags: post.tag_name,
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
      <PostFlex thumbnailDataArray={thumbnailDataArray} perPage={12} isPaginate={true}/>
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

export default allposts
