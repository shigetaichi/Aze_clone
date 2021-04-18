import React, { FC, useEffect, useState } from 'react'
import styles from './Footer.module.scss';
import ClassNames from 'classnames';
import { ThemeContext, useThemeContext } from 'context/context';
import { CategoryAreaWp, TagArea, Title } from "../../index";
import { lang, LangContext, useLangContext } from "context/langContext";
import { fetchWithCache } from "lib/helpers";
import { wpBaseUrl } from "lib/post";
import { langType } from "../../../types";

const Footer: FC = () => {
  const langTheme: LangContext = useLangContext();
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
        title={lang(langTheme.langName).categories.title}
        subtitle={lang(langTheme.langName).categories.subtitle}
      />
      {categories[langTheme.langName] && <CategoryAreaWp categories={categories[langTheme.langName]}/>}
      <Title
        title={lang(langTheme.langName).tags.title}
        subtitle={lang(langTheme.langName).tags.subtitle}
      />
      {tags[langTheme.langName] && <TagArea tags={tags[langTheme.langName]}/>}
      <footer className={FooterStyle}>
        <div className="module-spacer--medium"/>
        <a className={styles.instagram_icon} href="https://www.instagram.com/azerbaijapan/">
          <img src={"/instagram.svg"} alt="instagram icon"/>
        </a>
        <div className="module-spacer--extra-extra-small"/>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          © 2020 AZERBAIJAPAN
        </a>
      </footer>
    </>
  )
}

export default Footer
