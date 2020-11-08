import Head from "next/head"
import Link from "next/link"
import { ColorProvider } from "../../context/context";
import { Header, Footer } from ".";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  layout: {
    margin: '220px 0 0',
    "@media (max-width: 1024px)": {
      margin: '180px 0 0',
    },
    "@media (max-width: 900px)": {
      margin: '140px 0 0',
    },
    "@media (max-width: 768px)": {
      margin: '120px 0 0',
    },
    "@media (max-width: 480px)": {
      margin: '100px 0 0',
    },
  }
}));

const Layout = (props) => {
  const {title, children } = props;
  const image = props.image ? props.image : "/azerbaijapan.jpg";
  const siteTitle = "Azerbaijapan";
  const classes = useStyles();

  return (
    <ColorProvider>
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
      <div className={classes.layout}>
        <main>
          <div className="page-main">
            {children}
          </div>
        </main>
      </div>
      <Footer/>
    </ColorProvider>
  )
}

export default Layout