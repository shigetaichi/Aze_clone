import React, { FC } from "react";
import Link from "next/link";
import { lang, useLangContext } from "context/langContext";
import styles from 'components-style/PostCategoryAndTags.module.css';

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

const PostCategoryAndTags: FC<Props> = (props) => {
  const langTheme = useLangContext();

  return (
    <div className="post-cat-and-tags-wrapper">
      {props.category.length && (
        <div className={styles.cat}>
          {lang(langTheme.langName).categories.title}：
          {props.category.map((cat, i) => (
            <React.Fragment key={i}>
              <Link href={`/categories/${Object.keys(cat)}`}>
                <span className={styles.each_cat}>{Object.values(cat)[0][langTheme.langName]}</span>
              </Link>
            </React.Fragment>
          ))}
        </div>
      )}
      {props.tags.length && (
        <div className={styles.tags}>
          {lang(langTheme.langName).tags.title}：
          {props.tags.map((tag, i) => (
            <React.Fragment key={i}>
              <Link href={`/tags/${Object.keys(tag)}`}>
                <span className={styles.each_tag}>{Object.values(tag)[0][langTheme.langName]}</span>
              </Link>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCategoryAndTags;
