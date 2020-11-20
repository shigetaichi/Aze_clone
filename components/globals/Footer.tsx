import React from 'react'
import styles from '../../components-style/globals/Footer.module.css';
import ClassNames from 'classnames';
import { useThemeContext } from '../../context/context';

const Footer = () => {
  const themeNames = useThemeContext();
  const FooterStyle = ClassNames(styles.footer, {
    [styles.dark]: themeNames.themeName === 'dark'
  })
  return (
    <footer className={FooterStyle}>
      <div className="module-spacer--medium"></div>
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
      >
        © 2020 AZERBAIJAPAN
      </a>
    </footer>
  )
}

export default Footer
