import React, { FC, PropsWithChildren } from 'react'
import Link from 'next/link';
import styles from './CategoryArea.module.scss';

interface Props {
  categories: Array<any>;
}

const CategoryArea: FC<Props> = (props: PropsWithChildren<Props>) => {
  const categories = props.categories;
  
  return (
    <div className={styles.category_wrapper}>
      {categories && categories.map((category) => (
        <Link href={`/categories/${category.id}`} key={category.id}>
          <div className={styles.category}>
            <div className={styles.image_wrapper}>
              <img className={styles.image} src={category.acf.category_images} alt=""/>
            </div>
            <div className={styles.title_wrapper}>
              <p className={styles.title}>{category.name}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default CategoryArea
