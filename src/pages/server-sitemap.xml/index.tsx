import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { fetchWithCache } from "lib/helpers";
import { ISitemapFiled } from "next-sitemap/dist/@types/interface";
import { LocaleType } from "contexts/localeContext";

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Method to source urls from cms
  
  const supportLocale: LocaleType[] = ['ja', 'az', 'en'];
  const domain: string = 'https://azerbaijapan.xyz';
  const apiRoute: string = 'https://azerbaijapan.taichi-sigma2.com/wp-json/wp/v2/posts';
  
  let fields = [
    {
      loc: `${domain}`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
    }
  ];
  // utility functions to generate sitemap
  const localeFormatter = (data: string): LocaleType => {
    if (data) {
      switch (data) {
        case "ja":
          return "ja";
        case "az":
          return "az";
        case "en_US":
          return "en";
        case "ru":
          return "ru";
      }
    } else {
      return "ja"
    }
  }
  
  const generateSitemapObject = (v): ISitemapFiled => ({
    loc: `${domain}/${localeFormatter(v.meta['_locale'])}/posts/${v.id}`,
    lastmod: new Date(v.modified).toISOString(),
    changefreq: 'weekly',
  })
  
  const fetchAndReturnObject = async (url: string) => {
    const data: Array<any> = await fetchWithCache(url);
    return data['code'] === "rest_post_invalid_page_number" ? [] : data.map(v => generateSitemapObject(v));
  }
  
  const getAllObject = async (locale: LocaleType) => {
    for (let i: number = 1; i < 10; i++) {
      const arr: Array<any> = await fetchAndReturnObject(`${apiRoute}?lang=${locale}&page=${i}`);
      if (arr.length === 0) {
        break
      }
      fields = fields.concat(arr)
    }
  }
  
  
  // set data to fields Array
  fields = fields.concat(supportLocale.map((lo: LocaleType) => (
    {
      loc: `${domain}/${lo}`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
    }
  )));
  for (const lo of supportLocale) {
    await getAllObject(lo);
  }
  
  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
const Sitemap = () => {
}
export default Sitemap
