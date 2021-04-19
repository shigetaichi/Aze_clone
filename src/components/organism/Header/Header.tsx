import React, { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import ClassNames from 'classnames';
import { ThemeContext, useThemeContext } from 'context/context';
import { NextRouter, useRouter } from "next/router";
import { LocaleType, useSetLocaleContext } from "context/localeContext";

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
  
  const generateRoute = (locale: LocaleType): string => {
    let s: string = router.pathname;
    Object.keys(router.query).map((v: string) => {
      s = s.replace(`[${v}]`,v === 'locale' ? locale : String(router.query[v]))
    })
    return s
  }
  
  return (
    <header className={HeaderStyle}>
      <div className={styles.headerContainer}>
        <div className={styles.header1}>
          <h1 className={styles.site_title}>
            <Link href={`/${router.query.locale}`}>
              {themeNames.themeName === 'dark' ?
                <img src={"/azerbaijapan-logo-dark.png"} alt="logo in dark theme"/> :
                <img src={"/azerbaijapan.png"} alt="azerbaijapan original logo"/>
              }
            </Link>
          </h1>
          <ul className={styles.langList}>
            <li className={styles.li} onClick={() => setLocaleContext('ja')}>
              <Link href={generateRoute('ja')}>日本語</Link>
            </li>
            <li className={styles.li} onClick={() => setLocaleContext('az')}>
              <Link href={generateRoute('az')}>azerbaycan</Link>
            </li>
            <li className={styles.li} onClick={() => setLocaleContext('en')}>
              <Link href={generateRoute('en')}>English</Link>
            </li>
            <li className={styles.li} onClick={() => setLocaleContext('ru')}>
              <Link href={generateRoute('ru')}>русский</Link>
            </li>
          </ul>
          <ul className={styles.headerIcons}>
            <li className={styles.li}>
              <a href="https://www.instagram.com/azerbaijapan/">
                <img src={"/instagram.svg"} alt="instagram icon"/>
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
