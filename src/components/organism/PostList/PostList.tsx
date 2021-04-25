import React from 'react'
import styles from './PostList.module.scss';
import { locale, LocaleType, useLocaleContext } from 'context/localeContext';
import Thumbnail from "components/molecules/Thumbnail/Thumbnail";

interface Props {
  thumbnailDataArray: Array<any>;
}

const PostList = (props: Props) => {
  const localeContext: LocaleType = useLocaleContext();
  
  return (
    <>
      {props.thumbnailDataArray.length === 0 ?
        <p className={styles.post_flex_no_posts}>{locale(localeContext).nopost.now}</p>
        :
        <div className={styles.post_flex}>
          {props.thumbnailDataArray.map((thumbnailData, i: number) => (
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
