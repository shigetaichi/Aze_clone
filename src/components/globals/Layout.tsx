import React from 'react'
import Head from "next/head"
import Link from "next/link";
import { Header, Footer } from "./index";
import styles from '../../components-style/globals/Layout.module.css';
import ClassNames from 'classnames';
import { useThemeContext } from '../../context/context';
import { useLangContext, lang } from '../../context/langContext';
import { LangToggler2, LangToggler } from '../index';

const Layout = (props) => {
  const {title, children } = props;
  const image = props.image ? props.image : "/azerbaijapan.jpg";
  const url = props.url ? props.url : 'https://azerbaijapan.xyz/';
  const siteTitle = "Azerbaijapan";
  const themeNames = useThemeContext();
  const langTheme = useLangContext();

  const LayoutStyle = ClassNames(styles.layout,{
    [styles.dark]: themeNames.themeName === 'dark'
  });

  return (
    <React.Fragment>
      <Head>
        <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
        {/* Facebook：この内容は他のSNSにも使用されます。 */}
        <meta property="og:locale" content={lang(langTheme.langName).locale} />
        <meta property="og:title" content={title}/>
        <meta property="og:type" content="article"/>
        <meta property="og:url" content={"https://azerbaijapan.xyz" + url}/>
        <meta property="og:image" content={image}/>
        <meta property="og:site_name" content="AZERBAIJAPAN"/>
        <meta name="description" content={lang(langTheme.langName).description}/>
        <meta property="og:description" content={lang(langTheme.langName).description} />
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@azerbaijapan"/>
        <meta name="twitter:creator" content="@azerbaijapan" />
        {/* Twitter Cards：※「Twitter Analytics」を使用する場合は、上記＋以下も必須。 */}
        <meta name="twitter:title" content={title}/>
        <meta name="twitter:domain" content="https://azerbaijapan.xyz"/>
        <meta name="twitter:description" content={lang(langTheme.langName).description} />
        <meta name="twitter:image:src" content={image}/>

        <link rel="icon" href="/azerbaijapan-favicon.png" />
        <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-precomposed.png"/>
      </Head>
      <Header news={"サンプルニュースだよサンプルニュースだよサンプルニュースだよ"}/>
      <div className={LayoutStyle}>
        {/* <LangToggler/> */}
        {/* <LangToggler2/> */}
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
