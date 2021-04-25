import { locale, LocaleType, useLocaleContext } from 'context/localeContext';
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import Tag from "components/template/Tag/Tag";
import { perPage, wpBaseUrl } from "lib/post";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const localeData: string = String(context.query.locale);
  const p: number = Number(context.query.page);
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
      postsFilteredByTag[localeData] = await (await fetch(`${wpBaseUrl}/wp-json/wp/v2/posts?tags=${Number(context.query.tag)}&lang=${localeData}&per_page=${perPage}&page=${p ? p : 1}`)).json();
    })(),
    (async () => {
      tagNameArray[localeData] = await (await fetch(`${wpBaseUrl}/wp-json/wp/v2/tags/${Number(context.query.tag)}?lang=${localeData}`)).json();
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
