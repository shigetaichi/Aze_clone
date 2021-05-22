import { locale, LocaleType, useLocaleContext } from 'context/localeContext';
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { langType } from "types";
import Category from "components/template/Category/Category";
import { perPage, wpBaseUrl } from "lib/post";
import { fetchWithCache, filterPostDataArray } from "lib/helpers";

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const localeData: string = String(context.query.locale);
  const p: number = Number(context.query.page);
  let postsFilteredByCategory: langType, catNameArray: langType;
  postsFilteredByCategory = {
    'ja': [],
    'az': [],
    'en': [],
    'ru': [],
  };
  catNameArray = {
    'ja': [],
    'az': [],
    'en': [],
    'ru': [],
  };
  await Promise.all([
    (async () => {
      postsFilteredByCategory[localeData] = await fetchWithCache(`${wpBaseUrl}/wp-json/wp/v2/posts?categories=${Number(context.query.category)}&lang=${localeData}&per_page=${perPage}&page=${p ? p : 1}`);
    })(),
    (async () => {
      catNameArray[localeData] = await fetchWithCache(`${wpBaseUrl}/wp-json/wp/v2/categories/${Number(context.query.category)}?lang=${localeData}`);
    })(),
  ]);
  return {
    props: {
      postsFilteredByCategory,
      catNameArray,
    }
  }
}

const CategoryPage = ({postsFilteredByCategory, catNameArray}) => {
  const localeContext: LocaleType = useLocaleContext();
  const thumbnailDataArray = filterPostDataArray(postsFilteredByCategory[localeContext]);
  const catName = catNameArray[localeContext];
  
  return (
    <>
      <Head>
        <title>{catName.name + locale(localeContext).categories.title}</title>
      </Head>
      <Category catName={catName.name} thumbnailDataArray={thumbnailDataArray}/>
    </>
  )
}

export default CategoryPage
