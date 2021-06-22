import { VFC } from 'react';
import styles from './TagArea.module.scss';
import Link from 'next/link';
import { NextRouter, useRouter } from "next/router";

interface Props {
  tags: Array<any>;
}

const TagArea: VFC<Props> = ({tags}: Props) => {
  const router: NextRouter = useRouter();
  return (
    <div className={styles.tags_wrapper}>
      {tags.map((tag) => (
        <Link href={`/${router.query.locale ? String(router.query.locale) : 'ja'}/tags/${tag.id}`} key={tag.id}>
          <a className={styles.eachTag}>{tag.name}</a>
        </Link>
      ))}
    </div>
  )
}

export default TagArea

