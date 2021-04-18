import { getCatNameByLangAndId, getPostsFilteredByCategoryAndLangWp } from 'lib/category';
import { Button, Title } from 'components';
import { lang, LangContext, useLangContext } from 'context/langContext';
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import PostList from "components/organism/PostList/PostList";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  let postsFilteredByCategory: { [key: string]: Array<any> }, catNameArray: { [key: string]: any };
  postsFilteredByCategory = {
    'ja': [],
    'aze': [],
    'en': [],
    'ru': [],
  };
  catNameArray = {
    'ja': [],
    'aze': [],
    'en': [],
    'ru': [],
  };
  await Promise.all([
    (async () => {
      postsFilteredByCategory.ja = await getPostsFilteredByCategoryAndLangWp('ja', Number(context.query.category));
    })(),
    (async () => {
      postsFilteredByCategory.aze = await getPostsFilteredByCategoryAndLangWp('az', Number(context.query.category));
    })(),
    (async () => {
      postsFilteredByCategory.en = await getPostsFilteredByCategoryAndLangWp('en', Number(context.query.category));
    })(),
    (async () => {
      postsFilteredByCategory.ru = await getPostsFilteredByCategoryAndLangWp('ru', Number(context.query.category));
    })(),
    (async () => {
      catNameArray.ja = await getCatNameByLangAndId('ja', Number(context.query.category));
    })(),
    (async () => {
      catNameArray.aze = await getCatNameByLangAndId('az', Number(context.query.category));
    })(),
    (async () => {
      catNameArray.en = await getCatNameByLangAndId('en', Number(context.query.category));
    })(),
    (async () => {
      catNameArray.ru = await getCatNameByLangAndId('ru', Number(context.query.category));
    })(),
  ]);
  return {
    props: {
      postsFilteredByCategory,
      catNameArray,
    }
  }
}

const Category = ({postsFilteredByCategory, catNameArray}) => {
  const langTheme: LangContext = useLangContext();
  const thumbnailDataArray = postsFilteredByCategory[langTheme.langName].map(postData => ({
    id: postData.id,
    title: postData.title.rendered,
    eyecatch: postData.acf.eyecatch,
    description: postData.content.rendered,
    tags: postData.tag_name,
  }));
  const catName = catNameArray[langTheme.langName];
  
  return (
    <>
      <Head>
        <title>{catName.name + lang(langTheme.langName).categories.title}</title>
      </Head>
      <Title title={catName.name} subtitle={lang(langTheme.langName).categoryArchive.subtitle}/>
      <PostList thumbnailDataArray={thumbnailDataArray}/>
      <Button path={"/allposts"}>{lang(langTheme.langName).buttonText.toArchive}</Button>
    </>
  )
}

export default Category
