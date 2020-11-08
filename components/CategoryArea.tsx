import React from 'react';
import Link from 'next/link';
import styles from '../components-style/CategoryArea.module.css';

const CategoryArea = (props) => {
  const categories = props.categories;
  return (
    <div className={styles.category_wrapper}>
      {categories.map((category, i) => (
        <Link href={`/categories/${category.id}`} key={i}>
          <div className={styles.category}>
            <img className={styles.categoryImage} src={category.catImage} alt=""/>
            <p className={styles.category_title}>{category.catName}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default CategoryArea
