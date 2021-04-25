import React from 'react';
import Link from 'next/link';
import styles from './Thumbnail.module.scss';
import ClassNames from 'classnames';
import { ThemeContext, useThemeContext } from 'context/context';
import { NextRouter, useRouter } from "next/router";

const Thumbnail = (props) => {
  const router: NextRouter = useRouter();
  const themeNames: ThemeContext = useThemeContext();
  const PostThumbnailStyle = ClassNames(styles.content, {
    [styles.contentDark]: themeNames.themeName === 'dark'
  });
  let dummy;
  let tagsArray;
  if (props.tags) {
    dummy = props.tags.map(tag => {
      let arr = [];
      for (const [key, value] of Object.entries(tag)) {
        arr.push({'id': key, 'value': value});
      }
      return arr;
    });
    tagsArray = dummy[0];
  }
  
  return (
    <Link href={`/${String(router.query.locale)}/posts/${props.id}`}>
      <div className={styles.root}>
        <div className={styles.media}>
          <img className={styles.image} src={props.image} alt=""/>
        </div>
        <div className={PostThumbnailStyle}>
            <span className={styles.postThumbnail_title}>
              {props.title}
            </span>
          <div className={styles.tagArea}>
            {tagsArray && tagsArray.map((tag, i) => (
              <Link key={i} href={`${router.query.locale}/tags/${tag.id}`}>
                <span className={styles.eachTag}>{tag.value}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Thumbnail
