import { wpBaseUrl, wpGenerateNextAndPrevArray } from 'lib/post';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import PostPage from "components/template/PostPage/PostPage";
import { fetchWithCache } from "lib/helpers";
import { wpGetCatNamesById } from "lib/category";
import { wpGetTagNamesById } from "lib/tags";

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
      postData = await fetchWithCache(`${wpBaseUrl}/ja/wp-json/wp/v2/posts/${Number(context.query.id)}?_fields=id,acf,title,date,modified,content,meta,categories,category_name,tags,translate_group`);
    })(),
    (async () => {
      nextAndPrev = await wpGenerateNextAndPrevArray('ja', Number(context.query.id));
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
  
  postData['cat_obj'] = await Promise.all(postData.categories.map(each => (
    wpGetCatNamesById(each)
  )))
  postData['tags_obj'] = await Promise.all(postData.tags.map(each => (
    wpGetTagNamesById(each)
  )))
  return {
    props: {
      postData,
      categories,
      nextAndPrev,
      tags
    }
  }
}

const Post: NextPage = ({postData, categories, nextAndPrev, tags}) => {
  
  return (
    <PostPage postData={postData} categories={categories} nextAndPrev={nextAndPrev} tags={tags}/>
  )
}


export default Post;
