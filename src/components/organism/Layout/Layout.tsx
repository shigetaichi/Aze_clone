import Head from "next/head"
import styles from './Layout.module.scss';
import ClassNames from 'classnames';
import { ThemeContext, useThemeContext } from 'context/context';
import { locale, LocaleType, useLocaleContext } from 'context/localeContext';
import Header from "components/organism/Header/Header";
import Footer from "components/organism/Footer/Footer";
import ContentLeft from "components/organism/ContentLeft/ContentLeft";
import ContentRight from "components/organism/ContentRight/ContentRight";
import { useEffect, useState } from "react";
import { wpBaseUrl } from "lib/post";
import { NextRouter, useRouter } from "next/router";

const Layout = (props) => {
  const {title, children} = props;
  const siteTitle: string = "Azerbaijapan";
  const themeNames: ThemeContext = useThemeContext();
  const localeContext: LocaleType = useLocaleContext();
  const router: NextRouter = useRouter();
  
  const LayoutStyle = ClassNames(styles.layout, {
    [styles.dark]: themeNames.themeName === 'dark'
  });
  
  const [news, setNews] = useState<string>("");
  
  useEffect(() => {
    fetch(`${wpBaseUrl}/wp-json/wp/v2/header-info/201?_fields=acf`).then(res => res.json()).then(v => setNews(v['acf'][localeContext]))
    return () => {
    };
  }, [localeContext]);
  
  return (
    <>
      <Head>
        <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
        {/* Facebook：この内容は他のSNSにも使用されます。 */}
        <meta property="og:locale" content={locale(localeContext).locale}/>
        <meta property="og:title" content={title ? `${title} | ${siteTitle}` : siteTitle} key={"og_title"}/>
        <meta property="og:type" content={router.pathname === "/" ? "website" : "article"} key={"og_type"}/>
        <meta property="og:url" content={`https://azerbaijapan.xyz${router.pathname}`} key={"og_url"}/>
        <meta property="og:image" content={props.image ? props.image : "/azerbaijapan.jpg"} key={"og_image"}/>
        <meta property="og:site_name" content="AZERBAIJAPAN" key={"og_site_name"}/>
        <meta name="description" content={locale(localeContext).description} key={"desc"}/>
        <meta property="og:description" content={locale(localeContext).description} key={"og_desc"}/>
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" key={"tw_card"}/>
        <meta name="twitter:site" content="@azerbaijapan" key={"tw_site"}/>
        <meta name="twitter:creator" content="@azerbaijapan" key={"tw_creator"}/>
        {/* Twitter Cards：※「Twitter Analytics」を使用する場合は、上記＋以下も必須。 */}
        <meta name="twitter:title" content={title ? `${title} | ${siteTitle}` : siteTitle} key={"tw_title"}/>
        <meta name="twitter:domain" content="https://azerbaijapan.xyz" key={"tw_domain"}/>
        <meta name="twitter:description" content={locale(localeContext).description} key={"tw_desc"}/>
        <meta name="twitter:image:src" content={props.image ? props.image : "/azerbaijapan.jpg"} key={"tw_image_src"}/>
        
        <link rel="icon" href={"/azerbaijapan-favicon.png"}/>
        <link rel="apple-touch-icon-precomposed" href={"/apple-touch-icon-precomposed.png"}/>
      </Head>
      <Header news={news}/>
      <main className={styles.main}>
        <div className={styles.left}>
          <ContentLeft>
            {/*<p>a</p>*/}
          </ContentLeft>
        </div>
        <div className={styles.center}>
          {children}
        </div>
        <div className={styles.right}>
          <ContentRight>
            {/*<p>b</p>*/}
          </ContentRight>
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default Layout
