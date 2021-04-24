import { locale, LocaleType, useLocaleContext } from 'context/localeContext';
import { getPostsFilteredByTagAndLangWp, getTagNameByLangAndId } from 'lib/tags';
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import Tag from "components/template/Tag/Tag";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  let postsFilteredByTag: { [key: string]: Array<any> }, tagNameArray: { [key: string]: any }, categories, tags;
  postsFilteredByTag = {
    'ja': [],
    'az': [],
    'en': [],
    'ru': [],
  }
  tagNameArray = {
    'ja': [],
    'az': [],
    'en': [],
    'ru': [],
  }
  await Promise.all([
    (async () => {
      postsFilteredByTag.ja = await getPostsFilteredByTagAndLangWp('ja', Number(context.query.tag));
    })(),
    (async () => {
      postsFilteredByTag.az = await getPostsFilteredByTagAndLangWp('az', Number(context.query.tag));
    })(),
    (async () => {
      postsFilteredByTag.en = await getPostsFilteredByTagAndLangWp('en', Number(context.query.tag));
    })(),
    (async () => {
      postsFilteredByTag.ru = await getPostsFilteredByTagAndLangWp('ru', Number(context.query.tag));
    })(),
    (async () => {
      tagNameArray.ja = await getTagNameByLangAndId('ja', Number(context.query.tag));
    })(),
    (async () => {
      tagNameArray.az = await getTagNameByLangAndId('az', Number(context.query.tag));
    })(),
    (async () => {
      tagNameArray.en = await getTagNameByLangAndId('en', Number(context.query.tag));
    })(),
    (async () => {
      tagNameArray.ru = await getTagNameByLangAndId('ru', Number(context.query.tag));
    })(),
  ]);
  return {
    props: {
      postsFilteredByTag,
      tagNameArray
    }
  }
}

const TagPage = ({postsFilteredByTag, tagNameArray}) => {
  const langTheme: LocaleType = useLocaleContext();
  console.log(postsFilteredByTag)
  const thumbnailDataArray = postsFilteredByTag[langTheme].map(postData => ({
    id: postData.id,
    title: postData.title.rendered,
    eyecatch: postData.acf.eyecatch,
    description: postData.content.rendered,
    tags: postData.tag_name
  }));
  const tagName = tagNameArray[langTheme];
  
  return (
    <>
      <Head>
        <title>{tagName.name + locale(langTheme).tags.title}</title>
      </Head>
      <Tag tagName={tagName.name} thumbnailDataArray={thumbnailDataArray}/>
    </>
  )
}

export default TagPage
