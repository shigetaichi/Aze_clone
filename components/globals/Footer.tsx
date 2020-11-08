import React from 'react'
import styles from '../../styles/Home.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="module-spacer--medium"></div>
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.copyright}
      >
        © 2020 AZERBAIJAPAN
      </a>
    </footer>
  )
}

export default Footer
