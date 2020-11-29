import React, { FC } from 'react'
import Link from 'next/link';
import Classnames from 'classnames';
import { useThemeContext } from '../context/context';


interface props {
  translate_group: object;
}

const PostTranslationMenu: FC<props> = (props) => {
  const themeNames = useThemeContext();
  const translate_group = props.translate_group;

  const translationLink = Classnames({
    'dark': themeNames.themeName === 'dark',
  });
  

  return (
    <div className="post-translations">
      {translate_group['en_US'] && (
        <Link href={`/posts/en/${translate_group['en_US'].ID}`}>
          <div className="to-translate">
            <a className={translationLink}>English</a>
          </div>
        </Link>
      )}
      {translate_group['ru_RU'] && (
        <Link href={`/posts/ru/${translate_group['ru_RU'].ID}`}>
          <div className="to-translate">
            <a className={translationLink}>ロシア語</a>
          </div>
        </Link>
      )}
      {translate_group['ja'] && (
        <Link href={`/posts/ja/${translate_group['ja'].ID}`}>
          <div className="to-translate">
            <a className={translationLink}>日本語</a>
          </div>
        </Link>
      )}
      {translate_group['az'] && (
        <Link href={`/posts/aze/${translate_group['az'].ID}`}>
          <div className="to-translate">
            <a className={translationLink}>アゼルバイジャン語</a>
          </div>
        </Link>
      )}
    </div>
  )
}

export default PostTranslationMenu
