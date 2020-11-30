import React from 'react'
import {Layout} from '../../components/globals/index';
import Container from '@material-ui/core/Container';
import { Title, PostFlex, CategoryArea, Button, CategoryAreaWp, TagArea } from '../../components';
import { useLangContext, lang } from '../../context/langContext';
import { getCategoriesWp } from '../../lib/category';
import { getPostsFilteredByTagAndLangWp, getAllTagIdWp, getTagNameByLangAndId, getTagsWp } from '../../lib/tags';

export const getStaticPaths = async () => {
  const paths = await getAllTagIdWp();
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({params}) => {
  const postsFilteredByTagJp = await getPostsFilteredByTagAndLangWp('ja',params.tag);
  const postsFilteredByTagAze = await getPostsFilteredByTagAndLangWp('az',params.tag);
  const postsFilteredByTagEn = await getPostsFilteredByTagAndLangWp('en',params.tag);
  const postsFilteredByTagRu = await getPostsFilteredByTagAndLangWp('ru',params.tag);
  const postsFilteredByTag = {
    'ja': postsFilteredByTagJp,
    'aze': postsFilteredByTagAze,
    'en': postsFilteredByTagEn,
    'ru': postsFilteredByTagRu,
  }
  const tagNameJp = await getTagNameByLangAndId('ja', params.tag);
  const tagNameAze = await getTagNameByLangAndId('az', params.tag);
  const tagNameEn = await getTagNameByLangAndId('en', params.tag);
  const tagNameRu = await getTagNameByLangAndId('ru', params.tag);
  const tagNameArray = {
    'ja': tagNameJp,
    'aze': tagNameAze,
    'en': tagNameEn,
    'ru': tagNameRu,
  }
  const categories = await getCategoriesWp();
  const tags = await getTagsWp();
  return {
    props: {
      postsFilteredByTag,
      tagNameArray,
      categories,
      tags
    }
  }
}

const Tag = ({postsFilteredByTag, tagNameArray, categories, tags}) => {
  const langTheme = useLangContext();
  const thumbnailDataArray = postsFilteredByTag[langTheme.langName].map(postData => {
    const id = postData.id;
    const title = postData.title.rendered;
    const eyecatch = postData.acf.eyecatch;
    const description = postData.content.rendered;
    const tags = postData.tags;
    return {id, title, eyecatch, description, tags};
  });
  const tagName = tagNameArray[langTheme.langName];
  const categoriesArray = categories[langTheme.langName];
  const tagsArray = tags[langTheme.langName];
  
  return (
    <Layout title={tagName.name + lang(langTheme.langName).categories.title}>
      <Container maxWidth="lg">
        <Title title={tagName.name} subtitle={lang(langTheme.langName).categoryArchive.subtitle} />
        <PostFlex thumbnailDataArray={thumbnailDataArray}/>
        <div className="module-spacer--medium"></div>
        <div className="module-spacer--medium"></div>
      </Container>
      <div className="module-spacer--medium"></div>
      <div className="module-spacer--medium"></div>
      <Button text={lang(langTheme.langName).buttonText.toArchive} path={"/allposts"}/>
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

export default Tag
