import React from 'react';
import styles from '../components-style/Title.module.css';

const Title = (props: {title: string, subtitle: string}) => {
  return (
    <React.Fragment>
      <h1 className={styles.title}>
        {props.title}
        <span className={styles.title_border_bottom}></span>
      </h1>
      <h3 className={styles.subtitle}>{props.subtitle}</h3>
    </React.Fragment>
  )
}

export default Title
