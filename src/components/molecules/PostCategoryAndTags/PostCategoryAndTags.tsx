import { FC, PropsWithChildren, useEffect, useState } from "react";
import { locale, LocaleType, useLocaleContext } from "context/localeContext";
import styles from './PostCategoryAndTags.module.scss';
import { NextRouter, useRouter } from "next/router";
import { wpBaseUrl } from "lib/post";
import { fetchWithCache } from "lib/helpers";
import Link from "next/link";

interface Props {
  categories: Array<number>;
  tags?: Array<number>;
}

const PostCategoryAndTags: FC<Props> = (props: PropsWithChildren<Props>) => {
  const router: NextRouter = useRouter();
  const localeContext: LocaleType = useLocaleContext();
  
  const [cats, setCats] = useState([]);
  const [tags, setTags] = useState([]);
  
  
  const getData = async () => {
    await Promise.all([
      (async () => {
        await Promise.all(props.categories.map(async (c: number) => fetchWithCache(`${wpBaseUrl}/wp-json/wp/v2/categories/${c}?lang=${localeContext}`).then(r => setCats(prevState => [...prevState, r['name']]))));
      })(),
      (async () => {
        await Promise.all(props.tags.map(async (t: number) => fetchWithCache(`${wpBaseUrl}/wp-json/wp/v2/tags/${t}?lang=${localeContext}`).then(r => setTags(prevState => [...prevState, r['name']]))));
      })(),
    ]);
  }
  
  useEffect(() => {
    getData().then(() => {
    });
    return () => {
    };
  }, []);
  
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.cat}>
        {locale(localeContext).categories.title}：
        {cats && cats.map((c: number, i: number) => (
          <Link href={`/${String(router.query.locale)}/categories/${cats[i]}`} key={i}>
            <span className={styles.each_cat}>{cats[i]}</span>
          </Link>
        ))}
      </div>
      <div className={styles.tags}>
        {locale(localeContext).tags.title}：
        {tags && tags.map((t: number, i: number) => (
          <Link href={`/${String(router.query.locale)}/tags/${tags[i]}`} key={i}>
            <span className={styles.each_tag}>{tags[i]}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostCategoryAndTags;
