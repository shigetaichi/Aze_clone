import { FC, PropsWithChildren, useEffect, useState } from "react";
import { locale, LocaleType, useLocaleContext } from "context/localeContext";
import styles from './PostCategoryAndTags.module.scss';
import { NextRouter, useRouter } from "next/router";
import { wpBaseUrl } from "../../../lib/post";
import { fetchWithCache } from "../../../lib/helpers";
import Link from "next/link";

interface Category {
  id: number;
  nameObj: { [key: string]: string };
}

interface Tags {
  id: number;
  nameObj: { [key: string]: string };
}

interface Props {
  // categories: Array<Category>;
  // tags?: Array<Tags>;
  categories: Array<number>;
  tags?: Array<number>;
}

const PostCategoryAndTags: FC<Props> = (props: PropsWithChildren<Props>) => {
  const router: NextRouter = useRouter();
  const localeContext: LocaleType = useLocaleContext();
  
  const cat = useState<Array<number>>(props.categories)[0];
  const tag = useState<Array<number>>(props.tags)[0];
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
        {cat && cat.map((c: number, i: number) => (
          <Link href={`/${String(router.query.locale)}/categories/${cat[i]}`} key={i}>
            <span className={styles.each_cat}>{cats[i]}</span>
          </Link>
        ))}
      </div>
      <div className={styles.tags}>
        {locale(localeContext).tags.title}：
        {tag && tag.map((t: number, i: number) => (
          <Link href={`/${String(router.query.locale)}/tags/${tag[i]}`} key={i}>
            <span className={styles.each_tag}>{tags[i]}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostCategoryAndTags;
