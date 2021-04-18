import React, { FC, PropsWithChildren, useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import ClassNames from 'classnames';
import { ThemeContext, useThemeContext } from 'context/context';
import { NextRouter, useRouter } from "next/router";

interface HeaderProps {
  news: string;
}

const Header: FC<HeaderProps> = (props: PropsWithChildren<HeaderProps>) => {
  const router: NextRouter = useRouter();
  const {lang} = router.query;
  const themeNames: ThemeContext = useThemeContext();
  const HeaderStyle: string = ClassNames(styles.header, {
    [styles.dark]: themeNames.themeName === 'dark'
  })
  
  return (
    <header className={HeaderStyle}>
      <div className={styles.headerContainer}>
        <div className={styles.header1}>
          <h1 className={styles.site_title}>
            <Link href="/">
              {themeNames.themeName === 'dark' ?
                <img src={"/azerbaijapan-logo-dark.png"} alt="logo in dark theme"/> :
                <img src={"/azerbaijapan.png"} alt="azerbaijapan original logo"/>
              }
            </Link>
          </h1>
          <ul className={styles.headerIcons}>
            <li className={styles.li}>
              <a href="https://www.instagram.com/azerbaijapan/">
                <img src={"/instagram.svg"} alt="instagram icon"/>
              </a>
            </li>
          </ul>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.catList}>
            {[1,2,3].map((num: number) => <li className={styles.li} key={num}>{props.news}</li>)}
          </ul>
          <ul className={styles.langList}>
            <li className={styles.li}>日本語</li>
            <li className={styles.li}>azerbaycan</li>
            <li className={styles.li}>English</li>
            <li className={styles.li}>русский</li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
