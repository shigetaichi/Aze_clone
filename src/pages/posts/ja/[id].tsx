import { wpGenerateNextAndPrevArray, wpGetPostDataById } from 'lib/post';
import { getCategoriesWp } from 'lib/category';
import { getTagsWp } from 'lib/tags';
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import PostPage from "components/template/PostPage/PostPage";

// postの中のcssはglobal.cssに記載

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  let postData, nextAndPrev, categories, tags;
  await Promise.all([
    (async () => {
      postData = await wpGetPostDataById('ja', Number(context.query.id));
    })(),
    (async () => {
      nextAndPrev = await wpGenerateNextAndPrevArray('ja', Number(context.query.id));
    })(),
    (async () => {
      categories = await getCategoriesWp();
    })(),
    (async () => {
      tags = await getTagsWp();
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
