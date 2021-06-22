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
        categories['ja'] = await fetchWithCache(`${wpBaseUrl}/wp-json/wp/v2/categories?lang=ja`)
      })(),
      (async () => {
        categories['az'] = await fetchWithCache(`${wpBaseUrl}/wp-json/wp/v2/categories?lang=az`)
      })(),
      (async () => {
        categories['en'] = await fetchWithCache(`${wpBaseUrl}/wp-json/wp/v2/categories?lang=en`)
      })(),
      (async () => {
        categories['ru'] = await fetchWithCache(`${wpBaseUrl}/wp-json/wp/v2/categories?lang=ru`)
      })(),
    ]);
    return categories
  }
  
  const getTags = async () => {
    let tags: langType = {'ja': [], 'az': [], 'en': [], 'ru': [],}
    await Promise.all([
      (async () => {
        tags['ja'] = await fetchWithCache(`${wpBaseUrl}/wp-json/wp/v2/tags?lang=ja`)
      })(),
      (async () => {
        tags['az'] = await fetchWithCache(`${wpBaseUrl}/wp-json/wp/v2/tags?lang=az`)
      })(),
      (async () => {
        tags['en'] = await fetchWithCache(`${wpBaseUrl}/wp-json/wp/v2/tags?lang=en`)
      })(),
      (async () => {
        tags['ru'] = await fetchWithCache(`${wpBaseUrl}/wp-json/wp/v2/tags?lang=ru`)
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
        <a className={styles.instagram_icon} href="https://www.instagram.com/azerbaijapan/" target={"_blank"}>
          <img src={"/instagram.svg"} alt="instagram icon" loading={"lazy"}/>
        </a>
        <Link href={"/"}>
          <a>© 2020 AZERBAIJAPAN</a>
        </Link>
      </footer>
    </>
  )
}

export default Footer
