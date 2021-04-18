import React from 'react'
import styles from './PostList.module.scss';
import { lang, LangContext, useLangContext } from 'context/langContext';
import Pagination from "components/molecules/Pagination/Pagination";
import Thumbnail from "components/molecules/Thumbnail/Thumbnail";

const sliceByNumber = (array, number) => {
  const length = Math.ceil(array.length / number)
  return new Array(length).fill(undefined).map((_, i) =>
    array.slice(i * number, (i + 1) * number)
  )
}

interface Props {
  thumbnailDataArray: Array<any>;
}

const PostList = (props: Props) => {
  const langTheme: LangContext = useLangContext();
  
  return (
    <>
      {props.thumbnailDataArray.length === 0 ?
        <p className={styles.post_flex_no_posts}>{lang(langTheme.langName).nopost.now}</p>
        :
        <div className={styles.post_flex}>
          {props.thumbnailDataArray.map((thumbnailData, i) => (
            <Thumbnail
              key={i}
              id={thumbnailData.id}
              title={thumbnailData.title}
              image={thumbnailData.eyecatch}
              description={thumbnailData.description}
              tags={thumbnailData.tags}
            />
          ))}
        </div>
      }
    </>
  )
}

export default PostList
