import { FC } from 'react';
import styles from './TagArea.module.scss';
import Link from 'next/link';

interface Props {
  tags: Array<any>;
}

const TagArea: FC<Props> = ({tags}: Props) => {
  return (
    <div className={styles.tags_wrapper}>
      {tags.map((tag) => (
        <Link href={`/tags/${tag.id}`} key={tag.id}>
          <p className={styles.eachTag}>{tag.name}</p>
        </Link>
      ))}
    </div>
  )
}

export default TagArea

