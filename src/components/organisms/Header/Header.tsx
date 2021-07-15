import { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import ClassNames from 'classnames';
import { ThemeContext, useThemeContext } from 'contexts/context';
import { NextRouter, useRouter } from "next/router";
import { LocaleType, useSetLocaleContext } from "contexts/localeContext";
import { generateRoute } from "lib/helpers";

interface HeaderProps {
  news: string;
}

const Header: FC<HeaderProps> = (props: PropsWithChildren<HeaderProps>) => {
  const router: NextRouter = useRouter();
  const themeNames: ThemeContext = useThemeContext();
  const setLocaleContext: Dispatch<SetStateAction<LocaleType>> = useSetLocaleContext();
  const HeaderStyle: string = ClassNames(styles.header, {
    [styles.dark]: themeNames.themeName === 'dark'
  })
  
  return (
    <header className={HeaderStyle}>
      <div className={styles.headerContainer}>
        <div className={styles.header1}>
          <h1 className={styles.site_title}>
            <Link href={`/${router.query.locale}`}>
              {themeNames.themeName === 'dark' ?
                <a><img src={"/azerbaijapan-logo-dark.png"} alt="logo in dark theme" loading={"lazy"}/></a> :
                <a><img src={"/azerbaijapan.png"} alt="azerbaijapan original logo" loading={"lazy"}/></a>
              }
            </Link>
          </h1>
          <ul className={styles.langList}>
            <li className={styles.li} onClick={() => setLocaleContext('ja')}>
              <Link href={generateRoute('ja', router)}><a>日本語</a></Link>
            </li>
            <li className={styles.li} onClick={() => setLocaleContext('az')}>
              <Link href={generateRoute('az', router)}><a>azerbaycan</a></Link>
            </li>
            <li className={styles.li} onClick={() => setLocaleContext('en')}>
              <Link href={generateRoute('en', router)}><a>English</a></Link>
            </li>
            {/*<li className={styles.li} onClick={() => setLocaleContext('ru')}>*/}
            {/*  <Link href={generateRoute('ru', router)}>русский</Link>*/}
            {/*</li>*/}
          </ul>
          <ul className={styles.headerIcons}>
            <li className={styles.li}>
              <a href="https://www.instagram.com/azerbaijapan/" target={"_blank"}>
                <img src={"/instagram.svg"} alt="instagram icon" loading={"lazy"}/>
              </a>
            </li>
          </ul>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.news}>
            {[1, 2, 3].map((num: number) => <li className={styles.li} key={num}>{props.news}</li>)}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
