import { locale, LocaleType, useLocaleContext } from 'context/localeContext';
import { getPostsFilteredByTagAndLangWp, getTagNameByLangAndId } from 'lib/tags';
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import Tag from "components/template/Tag/Tag";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const localeData: string = String(context.query.locale);
  let postsFilteredByTag: { [key: string]: Array<any> }, tagNameArray: { [key: string]: any };
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
      postsFilteredByTag[localeData] = await getPostsFilteredByTagAndLangWp(localeData, Number(context.query.tag));
    })(),
    (async () => {
      tagNameArray[localeData] = await getTagNameByLangAndId(localeData, Number(context.query.tag));
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
  const localeContext: LocaleType = useLocaleContext();
  const thumbnailDataArray = postsFilteredByTag[localeContext].map(postData => ({
    id: postData.id,
    title: postData.title.rendered,
    eyecatch: postData.acf.eyecatch,
    description: postData.content.rendered,
    tags: postData.tag_name
  }));
  const tagName = tagNameArray[localeContext];
  
  return (
    <>
      <Head>
        <title>{tagName.name + locale(localeContext).tags.title}</title>
      </Head>
      <Tag tagName={tagName.name} thumbnailDataArray={thumbnailDataArray}/>
    </>
  )
}

export default TagPage
