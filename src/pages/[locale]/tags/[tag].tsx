import { locale, LocaleType, useLocaleContext } from 'context/localeContext';
import { getPostsFilteredByTagAndLangWp, getTagNameByLangAndId } from 'lib/tags';
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import PostList from "components/organism/PostList/PostList";
import Title from "../../../components/atom/Title/Title";
import Button from "../../../components/atom/Button/Button";
import { NextRouter, useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  let postsFilteredByTag: { [key: string]: Array<any> }, tagNameArray: { [key: string]: any }, categories, tags;
  postsFilteredByTag = {
    'ja': [],
    'aze': [],
    'en': [],
    'ru': [],
  }
  tagNameArray = {
    'ja': [],
    'aze': [],
    'en': [],
    'ru': [],
  }
  await Promise.all([
    (async () => {
      postsFilteredByTag.ja = await getPostsFilteredByTagAndLangWp('ja', Number(context.query.tag));
    })(),
    (async () => {
      postsFilteredByTag.aze = await getPostsFilteredByTagAndLangWp('az', Number(context.query.tag));
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
      tagNameArray.aze = await getTagNameByLangAndId('az', Number(context.query.tag));
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

const Tag = ({postsFilteredByTag, tagNameArray}) => {
  const router: NextRouter = useRouter();
  const langTheme: LocaleType = useLocaleContext();
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
        <title>{tagName.name + locale(langTheme).categories.title}</title>
      </Head>
      <Title title={tagName.name} subtitle={locale(langTheme).categoryArchive.subtitle}/>
      <PostList thumbnailDataArray={thumbnailDataArray}/>
      <Button path={`/${String(router.query.locale)}`}>{locale(langTheme).buttonText.toArchive}</Button>
    </>
  )
}

export default Tag
