import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../components-style/globals/Header.module.css';
import Hamburger from '../Hamburger';
import ClassNames from 'classnames';
import { useThemeContext } from '../../context/context';

const scrollTop = (): number => {
  return Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
};

const Header = () => {
  const [isTop, setIsTop] = useState<boolean>(true);
  const themeNames = useThemeContext();
  const HeaderStyle = ClassNames(styles.header, {
    [styles.dark]: themeNames.themeName === 'dark'
  })

  const onScroll = (): void => {
    const position = scrollTop();
    if (position >= 5) {
      setIsTop(false);
    } else {
      setIsTop(true);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
    return (): void => document.removeEventListener("scroll", onScroll);
  });

  const  scrollStyle: React.CSSProperties = isTop
    ? {}
    : { width: '30%' };

  return (
    <header className={HeaderStyle}>
      <h1 className={styles.site_title}>
        <Link href="/">
          <a id="header-logo" style={scrollStyle} href="/">
            {themeNames.themeName === 'dark' ? 
              <img src="/azerbaijapan-logo-dark.png" alt=""/>:
              <img src="/azerbaijapan.png" alt=""/>
            }
          </a>
        </Link>
      </h1>
      <Hamburger/>
    </header>
  )
}

export default Header
