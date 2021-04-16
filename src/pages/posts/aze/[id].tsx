import { wpBaseUrl, wpGenerateNextAndPrevArray, wpGetPostDataById } from 'lib/post';
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import PostPage from "components/template/PostPage/PostPage";
import { fetchWithCache } from "lib/helpers";

// postの中のcssはglobal.cssに記載

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  let postData, nextAndPrev, categories, tags;
  categories = {
    'ja': [],
    'aze': [],
    'en': [],
    'ru': [],
  }
  tags = {
    'ja': [],
    'aze': [],
    'en': [],
    'ru': [],
  }
  await Promise.all([
    (async () => {
      postData = await wpGetPostDataById('az', Number(context.query.id));
    })(),
    (async () => {
      nextAndPrev = await wpGenerateNextAndPrevArray('az', Number(context.query.id));
    })(),
    (async () => {
      categories['ja'] = await fetchWithCache(`${wpBaseUrl}/ja/wp-json/wp/v2/categories`)
    })(),
    (async () => {
      categories['aze'] = await fetchWithCache(`${wpBaseUrl}/ja/wp-json/wp/v2/categories`)
    })(),
    (async () => {
      categories['en'] = await fetchWithCache(`${wpBaseUrl}/en/wp-json/wp/v2/categories`)
    })(),
    (async () => {
      categories['ru'] = await fetchWithCache(`${wpBaseUrl}/ja/wp-json/wp/v2/categories`)
    })(),
    (async () => {
      tags['ja'] = await fetchWithCache(`${wpBaseUrl}/ja/wp-json/wp/v2/tags`)
    })(),
    (async () => {
      tags['aze'] = await fetchWithCache(`${wpBaseUrl}/ja/wp-json/wp/v2/tags`)
    })(),
    (async () => {
      tags['en'] = await fetchWithCache(`${wpBaseUrl}/en/wp-json/wp/v2/tags`)
    })(),
    (async () => {
      tags['ru'] = await fetchWithCache(`${wpBaseUrl}/ja/wp-json/wp/v2/tags`)
    })(),
  ]);
  return {
    props: {
      postData,
      categories,
      nextAndPrev,
      tags
    }
  }
}

const Post = ({postData, categories, nextAndPrev, tags}) => {
  return (
    <PostPage postData={postData} categories={categories} nextAndPrev={nextAndPrev} tags={tags}/>
  )
}


export default Post;
