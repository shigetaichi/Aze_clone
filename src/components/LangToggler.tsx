import React, { FC, useState, useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useLangContext, useSetLangContext, lang } from '../context/langContext';
import ClassNames from 'classnames';
import styles from './atom/LangSelect/LangSelect.module.scss';


const LangToggler: FC = () => {
  const langTheme = useLangContext();
  const setLangTheme = useSetLangContext();
  const [isOpen, setIsOpen] = useState<boolean>();


  const LangInputLabel = ClassNames(styles.langInputLabel, {
    [styles.langInputLabelDark]: langTheme.langName === "dark"
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLangTheme(() => ({ langName: event.target.value }));
  }

  const selectLang = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setLangTheme(() => ({ langName: event.target.value }));
  }
  return (
    <div className={styles.langToggler}>
      {/* <FormControl className={styles.formControl}>
        <InputLabel id="langSelect" className={LangInputLabel}>{lang(langTheme.langName).language}</InputLabel>
        <Select
          value={langTheme.langName}
          onChange={handleChange}
          labelId="langSelect"
        >
          <MenuItem value={'ja'}>日本語</MenuItem>
          <MenuItem value={'aze'}>azerbaycan</MenuItem>
          <MenuItem value={'en'}>English</MenuItem>
        </Select>
      </FormControl> */}
      <div className={styles.formControl}>
        <label htmlFor="langPopup" className={styles.lang_title}>{isOpen ? "CLOSE": lang(langTheme.langName).language}</label>
        <input type="checkbox" id="langPopup" className={styles.lang_popup} onChange={() => setIsOpen(!isOpen)}/>
        <ul className={styles.lang_ul}>
          <li>
            <input
              type="radio"
              name="lang"
              id="lang-ja"
              value="ja"
              onChange={selectLang}
            />
            <label className={styles.langlist} htmlFor="lang-ja">日本語</label>
          </li>
          <li>
            <input
              type="radio"
              name="lang"
              id="lang-aze"
              value="aze"
              onChange={selectLang}
            />
            <label htmlFor="lang-aze">azerbaycan</label>
          </li>
          <li>
            <input
              type="radio"
              name="lang"
              id="lang-en"
              value="en"
              onChange={selectLang}/>
            <label htmlFor="lang-en">English</label>
          </li>
        </ul>
      </div>
      {/* <div className="cp_ipselect">
        <input type="radio" name="option" />
          <i className="toggle cp_sl07_arrowdown"></i>
          <i className="toggle cp_sl07_arrowup"></i>
        <span className="cp_sl07_selectlabel">Choose</span>
        <label className="option">
          <input type="radio" name="option" />
          <span className="cp_sl07_title">cat</span>
        </label>
        <label className="option">
          <input type="radio" name="option" />
          <span className="cp_sl07_title">dog</span>
        </label>
        <label className="option">
          <input type="radio" name="option" />
          <span className="cp_sl07_title">rabbit</span>
        </label>
        <label className="option">
          <input type="radio" name="option" />
          <span className="cp_sl07_title">squirrel</span>
        </label>
      </div> */}
    </div>
  )
}

export default LangToggler
