import { wpBaseUrl, wpGenerateNextAndPrevArray } from 'lib/post';
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import PostTemplate from "components/template/Post/PostTemplate";
import { fetchWithCache } from "lib/helpers";
import { wpGetCatNamesById } from "lib/category";
import { wpGetTagNamesById } from "lib/tags";

// postの中のcssはglobal.cssに記載

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  let postData, nextAndPrev;
  const localeParam: string = String(context.query.locale);
  const idParam: number = Number(context.query.id);
  await Promise.all([
    (async () => {
      postData = await fetchWithCache(`${wpBaseUrl}/${localeParam}/wp-json/wp/v2/posts/${idParam}?_fields=id,acf,title,date,modified,content,meta,categories,category_name,tags,translate_group`);
    })(),
    (async () => {
      nextAndPrev = await wpGenerateNextAndPrevArray(`${localeParam}`, idParam);
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
      nextAndPrev,
    }
  }
}

const Post = ({postData, nextAndPrev}) => {
  return (
    <PostTemplate postData={postData} nextAndPrev={nextAndPrev}/>
  )
}


export default Post;
