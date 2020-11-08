import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../components-style/globals/Header.module.css';
import Hamburger from '../Hamburger';

const scrollTop = (): number => {
  return Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
};

const Header = () => {
  const [isTop, setIsTop] = useState<boolean>(true);

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
    <header className={styles.header}>
      <h1 className={styles.site_title}>
        <Link href="/">
          <a id="header-logo" style={scrollStyle} href="/"><img src="/azerbaijapan.png" alt=""/></a>
        </Link>
      </h1>
      <Hamburger/>
    </header>
  )
}

export default Header
