import { FC } from 'react';
import styles from './TagArea.module.scss';
import Link from 'next/link';
import { NextRouter, useRouter } from "next/router";

interface Props {
  tags: Array<any>;
}

const TagArea: FC<Props> = ({tags}: Props) => {
  const router: NextRouter = useRouter();
  return (
    <div className={styles.tags_wrapper}>
      {tags.map((tag) => (
        <Link href={`/${String(router.query.locale)}/tags/${tag.id}`} key={tag.id}>
          <a className={styles.eachTag}>{tag.name}</a>
        </Link>
      ))}
    </div>
  )
}

export default TagArea

