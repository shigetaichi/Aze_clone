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
  const setLangContext: Dispatch<SetStateAction<LocaleType>> = useSetLocaleContext();
  const HeaderStyle: string = ClassNames(styles.header, {
    [styles.dark]: themeNames.themeName === 'dark'
  })
  
  return (
    <header className={HeaderStyle}>
      <div className={styles.headerContainer}>
        <div className={styles.header1}>
          <h1 className={styles.site_title}>
            <Link href={`/${router.query.lang}`}>
              {themeNames.themeName === 'dark' ?
                <img src={"/azerbaijapan-logo-dark.png"} alt="logo in dark theme"/> :
                <img src={"/azerbaijapan.png"} alt="azerbaijapan original logo"/>
              }
            </Link>
          </h1>
          <ul className={styles.langList}>
            <li className={styles.li} onClick={() => setLangContext('ja')}>
              <Link href={router.pathname.replace('[lang]', 'ja')}>日本語</Link>
            </li>
            <li className={styles.li} onClick={() => setLangContext('az')}>
              <Link href={router.pathname.replace('[lang]', 'az')}>azerbaycan</Link>
            </li>
            <li className={styles.li} onClick={() => setLangContext('en')}>
              <Link href={router.pathname.replace('[lang]', 'en')}>English</Link>
            </li>
            <li className={styles.li} onClick={() => setLangContext('ru')}>
              <Link href={router.pathname.replace('[lang]', 'ru')}>русский</Link>
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
