import { locale, LocaleType, useLocaleContext } from 'contexts/localeContext';
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import Tag from "components/templates/Tag/Tag";
import { perPage, wpBaseUrl } from "lib/post";
import { fetchWithCache, filterPostDataArray } from "lib/helpers";

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
      postsFilteredByTag[localeData] = await fetchWithCache(`${wpBaseUrl}/wp-json/wp/v2/posts?tags=${Number(context.query.tag)}&lang=${localeData}&per_page=${perPage}&page=${p ? p : 1}`);
    })(),
    (async () => {
      tagNameArray[localeData] = await fetchWithCache(`${wpBaseUrl}/wp-json/wp/v2/tags/${Number(context.query.tag)}?lang=${localeData}`);
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
  const thumbnailDataArray = filterPostDataArray(postsFilteredByTag[localeContext]);
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
