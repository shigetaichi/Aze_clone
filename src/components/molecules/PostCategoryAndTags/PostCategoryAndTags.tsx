import { FC, PropsWithChildren, useState } from "react";
import { locale, LocaleType, useLocaleContext } from "context/localeContext";
import styles from './PostCategoryAndTags.module.scss';
import { NextRouter, useRouter } from "next/router";
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
  categories: Array<Category>;
  tags?: Array<Tags>;
}

const PostCategoryAndTags: FC<Props> = (props: PropsWithChildren<Props>) => {
  const router: NextRouter = useRouter();
  const localeContext: LocaleType = useLocaleContext();
  
  const cat = useState<Array<any>>(props.categories)[0];
  const tag = useState<Array<any>>(props.tags)[0];
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.cat}>
        {locale(localeContext).categories.title}：
        {cat && cat.map((c, i: number) => (
          <Link href={`/${String(router.query.locale)}/categories/${Object.keys(cat[i])}`} key={i}>
            <span className={styles.each_cat}>{Object.values(cat[i])[0][localeContext]}</span>
          </Link>
        ))}
      </div>
      <div className={styles.tags}>
        {locale(localeContext).tags.title}：
        {tag && tag.map((t, i: number) => (
          <Link href={`/${String(router.query.locale)}/tags/${Object.keys(tag[i])}`} key={i}>
            <span className={styles.each_tag}>{Object.values(tag[i])[0][localeContext]}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostCategoryAndTags;
