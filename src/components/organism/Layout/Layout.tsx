import Head from "next/head"
import styles from './Layout.module.scss';
import ClassNames from 'classnames';
import { useThemeContext } from 'context/context';
import { locale, LocaleType, useLocaleContext } from 'context/localeContext';
import Header from "components/organism/Header/Header";
import Footer from "components/organism/Footer/Footer";
import ContentLeft from "components/organism/ContentLeft/ContentLeft";
import ContentRight from "components/organism/ContentRight/ContentRight";

const Layout = (props) => {
  const {title, children} = props;
  const image = props.image ? props.image : "/azerbaijapan.jpg";
  const url = props.url ? props.url : 'https://azerbaijapan.xyz/';
  const siteTitle = "Azerbaijapan";
  const themeNames = useThemeContext();
  const localeContext: LocaleType = useLocaleContext();
  
  const LayoutStyle = ClassNames(styles.layout, {
    [styles.dark]: themeNames.themeName === 'dark'
  });
  
  
  return (
    <>
      <Head>
        <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
        {/* Facebook：この内容は他のSNSにも使用されます。 */}
        <meta property="og:locale" content={locale(localeContext).locale}/>
        <meta property="og:title" content={title}/>
        <meta property="og:type" content="article"/>
        <meta property="og:url" content={"https://azerbaijapan.xyz" + url}/>
        <meta property="og:image" content={image}/>
        <meta property="og:site_name" content="AZERBAIJAPAN"/>
        <meta name="description" content={locale(localeContext).description}/>
        <meta property="og:description" content={locale(localeContext).description}/>
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content="@azerbaijapan"/>
        <meta name="twitter:creator" content="@azerbaijapan"/>
        {/* Twitter Cards：※「Twitter Analytics」を使用する場合は、上記＋以下も必須。 */}
        <meta name="twitter:title" content={title}/>
        <meta name="twitter:domain" content="https://azerbaijapan.xyz"/>
        <meta name="twitter:description" content={locale(localeContext).description}/>
        <meta name="twitter:image:src" content={image}/>
        
        <link rel="icon" href={"/azerbaijapan-favicon.png"}/>
        <link rel="apple-touch-icon-precomposed" href={"/apple-touch-icon-precomposed.png"}/>
      </Head>
      <Header news={"サンプルニュースだよサンプルニュースだよサンプルニュースだよ"}/>
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
