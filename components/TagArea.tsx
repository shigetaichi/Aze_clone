import React from 'react';
import styles from '../components-style/TagArea.module.css';
import Link from 'next/link';

const TagArea = ({tags}) => {
  // const tags = props.tags;
  return (
    <div className={styles.tags_wrapper}>
      {tags.map((tag, i) => (
        <React.Fragment key={i}>
          <Link href={`/tags/${tag.id}`}>
            <p className={styles.eachTag}>{tag.name}</p>
          </Link>
        </React.Fragment>
      ))}
    </div>
  )
}

export default TagArea

