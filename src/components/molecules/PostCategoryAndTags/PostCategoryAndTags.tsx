import { FC, PropsWithChildren } from "react";
import Link from "next/link";
import { locale, LocaleType, useLocaleContext } from "context/localeContext";
import styles from './PostCategoryAndTags.module.scss';

interface Category {
  id: number;
  nameObj: { [key: string]: string };
}

interface Tags {
  id: number;
  nameObj: { [key: string]: string };
}

interface Props {
  category: Array<Category>;
  tags?: Array<Tags>;
}

const PostCategoryAndTags: FC<Props> = (props: PropsWithChildren<Props>) => {
  const localeContext: LocaleType = useLocaleContext();
  
  return (
    <div className="post-cat-and-tags-wrapper">
      {props.category.length && (
        <div className={styles.cat}>
          {locale(localeContext).categories.title}：
          {props.category.map((cat: Category, i: number) => (
            <Link href={`/categories/${Object.keys(cat)}`} key={i}>
              <span className={styles.each_cat}>{Object.values(cat)[0][localeContext]}</span>
            </Link>
          ))}
        </div>
      )}
      {props.tags.length && (
        <div className={styles.tags}>
          {locale(localeContext).tags.title}：
          {props.tags.map((tag: Tags, i: number) => (
            <Link href={`/tags/${Object.keys(tag)}`} key={i}>
              <span className={styles.each_tag}>{Object.values(tag)[0][localeContext]}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCategoryAndTags;
