import React from 'react'
import { useLangContext, useSetLangContext, lang } from '../context/langContext';
import ClassNames from 'classnames';
import styles from '../components-style/LangToggler.module.css';

const LangToggler3 = () => {
  const langTheme = useLangContext();
  const setLangTheme = useSetLangContext();

  const LangInputLabel = ClassNames(styles.langInputLabel, {
    [styles.langInputLabelDark]: langTheme.langName === "dark"
  });
  const LangInputOptions = ClassNames(styles.langInputOptions, {
    [styles.langInputOptionsDark]: langTheme.langName === "dark"
  });
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setLangTheme(() => ({ langName: event.target.value }));
  }

  return (
    <React.Fragment>
      <label htmlFor="lang-select" className={LangInputLabel}>{lang(langTheme.langName).language}</label>
      <select name="lang-select" id="lang-select" className={LangInputOptions} onChange={(e) => handleChange(e)}>
        <option value="ja">日本語</option>
        <option value="aze">Azerbaycan</option>
        <option value="en">English</option>
      </select>
    </React.Fragment>
  )
}

export default LangToggler3
