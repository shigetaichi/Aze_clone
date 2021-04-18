import { wpBaseUrl, wpGenerateNextAndPrevArray } from 'lib/post';
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import PostPage from "components/template/PostPage/PostPage";
import { fetchWithCache } from "lib/helpers";
import { wpGetCatNamesById } from "lib/category";
import { wpGetTagNamesById } from "lib/tags";

// postの中のcssはglobal.cssに記載

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  let postData, nextAndPrev;
  await Promise.all([
    (async () => {
      postData = await fetchWithCache(`${wpBaseUrl}/${context.query.lang}/wp-json/wp/v2/posts/${Number(context.query.id)}?_fields=id,acf,title,date,modified,content,meta,categories,category_name,tags,translate_group`);
    })(),
    (async () => {
      nextAndPrev = await wpGenerateNextAndPrevArray(`${context.query.lang}`, Number(context.query.id));
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
    <PostPage postData={postData} nextAndPrev={nextAndPrev}/>
  )
}


export default Post;
