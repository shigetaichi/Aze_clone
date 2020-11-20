import React from 'react'
import Head from "next/head"
import Link from "next/link";
import { Header, Footer } from ".";
import styles from '../../components-style/globals/Layout.module.css';
import ClassNames from 'classnames';
import { useThemeContext } from '../../context/context';
import { LangToggler } from '..';

const Layout = (props) => {
  const {title, children } = props;
  const image = props.image ? props.image : "/azerbaijapan.jpg";
  const siteTitle = "Azerbaijapan";
  const themeNames = useThemeContext();

  const LayoutStyle = ClassNames(styles.layout,{
    [styles.dark]: themeNames.themeName === 'dark'
  });

  return (
    <React.Fragment>
      <Head>
        <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
        <meta name="description" content="Azerbaijapanは日本とアゼルバイジャンの架け橋的なwebサイトになればいいと思っています。語学はもちろんのこと、様々なジャンルの記事を集積していきます。アゼルバイジャンに関わる全ての日本人の助けになれれば幸いです。"></meta>
        <link rel="icon" href="/azerbaijapan-favicon.png" />
        <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-precomposed.png"></link>
        <meta name="twitter:card" content="summary_large_image" />
        {/* <meta name="twitter:site" content="@ユーザー名" /> */}
        <meta name="twitter:description" content="Azerbaijapanは日本とアゼルバイジャンの架け橋的なwebサイトになればいいと思っています。語学はもちろんのこと、様々なジャンルの記事を集積していきます。アゼルバイジャンに関わる全ての日本人の助けになれれば幸いです。" />
        <meta name="twitter:image:src" content={image} />
      </Head>
      <Header/>
      <div className={LayoutStyle}>
        <LangToggler/>
        <main>
          <div className="page-main">
            {children}
          </div>
        </main>
      </div>
      <Footer/>
    </React.Fragment>
  )
}

export default Layout