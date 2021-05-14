import React, { FC, PropsWithChildren } from 'react'
import Link from 'next/link';
import styles from './CategoryArea.module.scss';
import { NextRouter, useRouter } from "next/router";

interface Props {
  categories: Array<any>;
}

const CategoryArea: FC<Props> = (props: PropsWithChildren<Props>) => {
  const router: NextRouter = useRouter();
  const categories = props.categories;
  
  return (
    <div className={styles.category_wrapper}>
      {categories && categories.map((category) => (
        <Link href={`/${String(router.query.locale)}/categories/${category.id}`} key={category.id}>
          <a className={styles.category}>
            <div className={styles.image_wrapper}>
              <img className={styles.image} src={category.acf.category_images} alt=""/>
            </div>
            <div className={styles.title_wrapper}>
              <p className={styles.title}>{category.name}</p>
            </div>
          </a>
        </Link>
      ))}
    </div>
  )
}

export default CategoryArea
