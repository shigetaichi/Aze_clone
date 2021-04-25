import { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react'
import Link from 'next/link';
import Classnames from 'classnames';
import { ThemeContext, useThemeContext } from 'context/context';
import styles from "./PostTransMenu.module.scss";
import { LocaleType, useSetLocaleContext } from "context/localeContext";


interface Props {
  translate_group: object;
}

const PostTransMenu: FC<Props> = (props: PropsWithChildren<Props>) => {
  const setLocaleContext: Dispatch<SetStateAction<LocaleType>> = useSetLocaleContext();
  const themeNames: ThemeContext = useThemeContext();
  const translate_group = props.translate_group;
  
  const translationLink = Classnames({
    'dark': themeNames.themeName === 'dark',
  });
  
  
  return (
    <div className={styles.translation}>
      {translate_group['en_US'] && (
        <div className={styles.to_translate} onClick={() => setLocaleContext('ja')}>
          <Link href={`/en/posts/${translate_group['en_US'].ID}`}>
            <a className={translationLink}>English</a>
          </Link>
        </div>
      )}
      {translate_group['ru_RU'] && (
        <div className={styles.to_translate} onClick={() => setLocaleContext('ja')}>
          <Link href={`/ru/posts/${translate_group['ru_RU'].ID}`}>
            <a className={translationLink}>ロシア語</a>
          </Link>
        </div>
      )}
      {translate_group['ja'] && (
        <div className={styles.to_translate} onClick={() => setLocaleContext('ja')}>
          <Link href={`/ja/posts/${translate_group['ja'].ID}`}>
            <a className={translationLink}>日本語</a>
          </Link>
        </div>
      )}
      {translate_group['az'] && (
        <div className={styles.to_translate} onClick={() => setLocaleContext('ja')}>
          <Link href={`/az/posts/${translate_group['az'].ID}`}>
            <a className={translationLink}>アゼルバイジャン語</a>
          </Link>
        </div>
      )}
    </div>
  )
}

export default PostTransMenu
