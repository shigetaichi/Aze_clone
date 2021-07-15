import React, { FC, PropsWithChildren } from 'react';
import styles from './Title.module.scss';

interface titleProps {
  title: string;
  subtitle: string;
}

const Title: FC<titleProps> = (props: PropsWithChildren<titleProps>) => {
  return (
    <div className={styles.title_wrapper}>
      <h1 className={styles.title}>
        {props.title}
        <span className={styles.title_border_bottom}/>
      </h1>
      <h3 className={styles.subtitle}>{props.subtitle}</h3>
    </div>
  )
}

export default Title
