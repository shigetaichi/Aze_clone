import React from 'react';
import Link from 'next/link';
import styles from './Thumbnail.module.scss';
import ClassNames from 'classnames';
import { ThemeContext, useThemeContext } from 'context/context';
import { LocaleType, useLocaleContext } from 'context/localeContext';

const Thumbnail = (props) => {
  const themeNames: ThemeContext = useThemeContext();
  const localeContext: LocaleType = useLocaleContext();
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
    <Link href={`/posts/${localeContext}/[id]`} as={`/posts/${localeContext}/${props.id}`}>
      <div className={styles.root}>
        <div>
          <div className={styles.media}>
            <img className={styles.image} src={props.image} alt=""/>
          </div>
          <div className={PostThumbnailStyle}>
            <span className={styles.postThumbnail_title}>
              {props.title}
            </span>
            <div className={styles.tagArea}>
              {tagsArray && tagsArray.map((tag, i) => (
                <Link key={i} href={`/tags/${tag.id}`}>
                  <span className={styles.eachTag}>{tag.value}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Thumbnail
