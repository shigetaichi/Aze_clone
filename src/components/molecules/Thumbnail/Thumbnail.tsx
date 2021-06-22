import { Key, VFC } from 'react';
import Link from 'next/link';
import styles from './Thumbnail.module.scss';
import ClassNames from 'classnames';
import { ThemeContext, useThemeContext } from 'context/context';
import { NextRouter, useRouter } from "next/router";

interface ThumbnailProps {
  id: number;
  image: string;
  title: string;
  description: string;
  tags: Array<any>;
}

const Thumbnail: VFC<ThumbnailProps> = (props: ThumbnailProps) => {
  const router: NextRouter = useRouter();
  const themeNames: ThemeContext = useThemeContext();
  const PostThumbnailStyle = ClassNames(styles.content, {
    [styles.contentDark]: themeNames.themeName === 'dark'
  });
  
  return (
    <Link href={`/${String(router.query.locale)}/posts/${props.id}`}>
      <a className={styles.root}>
        <div className={styles.media}>
          <img className={styles.image} src={props.image} alt="" loading={"lazy"}/>
        </div>
        <div className={PostThumbnailStyle}>
          <span className={styles.postThumbnail_title}>
            {props.title}
          </span>
          <div className={styles.tagArea}>
            {props.tags && Object.entries(props.tags[0]).map((v: Array<any>, i: Key) => (
              <Link key={i} href={`/${String(router.query.locale)}/tags/${v[0]}`}>
                <span className={styles.eachTag}>{v[1]}</span>
              </Link>
            ))}
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Thumbnail
