import { FC, PropsWithChildren } from 'react'
import Link from 'next/link';
import Classnames from 'classnames';
import { ThemeContext, useThemeContext } from 'context/context';
import styles from "./PostTransMenu.module.scss";


interface Props {
  translate_group: object;
}

const PostTransMenu: FC<Props> = (props: PropsWithChildren<Props>) => {
  const themeNames: ThemeContext = useThemeContext();
  const translate_group = props.translate_group;
  
  const translationLink = Classnames({
    'dark': themeNames.themeName === 'dark',
  });
  
  
  return (
    <div className={styles.translation}>
      {translate_group['en_US'] && (
        <Link href={`/en/posts/${translate_group['en_US'].ID}`}>
          <div className={styles.to_translate}>
            <a className={translationLink}>English</a>
          </div>
        </Link>
      )}
      {translate_group['ru_RU'] && (
        <Link href={`/ru/posts/${translate_group['ru_RU'].ID}`}>
          <div className={styles.to_translate}>
            <a className={translationLink}>ロシア語</a>
          </div>
        </Link>
      )}
      {translate_group['ja'] && (
        <Link href={`/ja/posts/${translate_group['ja'].ID}`}>
          <div className={styles.to_translate}>
            <a className={translationLink}>日本語</a>
          </div>
        </Link>
      )}
      {translate_group['az'] && (
        <Link href={`/az/posts/${translate_group['az'].ID}`}>
          <div className={styles.to_translate}>
            <a className={translationLink}>アゼルバイジャン語</a>
          </div>
        </Link>
      )}
    </div>
  )
}

export default PostTransMenu
