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
  const siteTitle = "Azerbaijapan";
  const classes = useStyles();

  return (
    <ColorProvider>
      <Head>
        <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
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