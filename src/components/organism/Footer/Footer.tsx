import { FC, useEffect, useState } from 'react'
import styles from './Footer.module.scss';
import ClassNames from 'classnames';
import { ThemeContext, useThemeContext } from 'context/context';
import { locale, LocaleType, useLocaleContext } from "context/localeContext";
import { fetchWithCache } from "lib/helpers";
import { wpBaseUrl } from "lib/post";
import CategoryArea from "components/molecules/CategoryArea/CategoryArea";
import Link from "next/link";
import { langType } from "types";
import TagArea from "components/molecules/TagArea/TagArea";
import Title from "components/atom/Title/Title";

const Footer: FC = () => {
  const localeTheme: LocaleType = useLocaleContext();
  const themeNames: ThemeContext = useThemeContext();
  const FooterStyle = ClassNames(styles.footer, {
    [styles.dark]: themeNames.themeName === 'dark'
  })
  
  const [categories, setCategories] = useState<langType>({'ja': [], 'az': [], 'en': [], 'ru': [],});
  const [tags, setTags] = useState<langType>({'ja': [], 'az': [], 'en': [], 'ru': [],});
  
  const getCategories = async (): Promise<langType> => {
    let categories: langType = {'ja': [], 'az': [], 'en': [], 'ru': [],}
    await Promise.all([
      (async () => {
        categories['ja'] = await fetchWithCache(`${wpBaseUrl}/ja/wp-json/wp/v2/categories`)
      })(),
      (async () => {
        categories['az'] = await fetchWithCache(`${wpBaseUrl}/az/wp-json/wp/v2/categories`)
      })(),
      (async () => {
        categories['en'] = await fetchWithCache(`${wpBaseUrl}/en/wp-json/wp/v2/categories`)
      })(),
      (async () => {
        categories['ru'] = await fetchWithCache(`${wpBaseUrl}/ru/wp-json/wp/v2/categories`)
      })(),
    ]);
    return categories
  }
  
  const getTags = async () => {
    let tags: langType = {'ja': [], 'az': [], 'en': [], 'ru': [],}
    await Promise.all([
      (async () => {
        tags['ja'] = await fetchWithCache(`${wpBaseUrl}/ja/wp-json/wp/v2/tags`)
      })(),
      (async () => {
        tags['az'] = await fetchWithCache(`${wpBaseUrl}/az/wp-json/wp/v2/tags`)
      })(),
      (async () => {
        tags['en'] = await fetchWithCache(`${wpBaseUrl}/en/wp-json/wp/v2/tags`)
      })(),
      (async () => {
        tags['ru'] = await fetchWithCache(`${wpBaseUrl}/ru/wp-json/wp/v2/tags`)
      })(),
    ]);
    return tags;
  }
  
  useEffect(() => {
    getCategories().then((cat: langType) => setCategories(cat));
    getTags().then((tag: langType) => setTags(tag));
    
    return () => {
    };
  }, []);
  
  return (
    <>
      <Title
        title={locale(localeTheme).categories.title}
        subtitle={locale(localeTheme).categories.subtitle}
      />
      {categories[localeTheme] && <CategoryArea categories={categories[localeTheme]}/>}
      <Title
        title={locale(localeTheme).tags.title}
        subtitle={locale(localeTheme).tags.subtitle}
      />
      {tags[localeTheme] && <TagArea tags={tags[localeTheme]}/>}
      <footer className={FooterStyle}>
        <div className="module-spacer--medium"/>
        <a className={styles.instagram_icon} href="https://www.instagram.com/azerbaijapan/">
          <img src={"/instagram.svg"} alt="instagram icon"/>
        </a>
        <Link href={"/"}>
          © 2020 AZERBAIJAPAN
        </Link>
      </footer>
    </>
  )
}

export default Footer
