import React, { useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useLangContext, useSetLangContext, lang } from '../context/langContext';
import ClassNames from 'classnames';
import styles from '../components-style/LangToggler.module.css';

const LangToggler2 = () => {
  const langTheme = useLangContext();
  const setLangTheme = useSetLangContext();
  
  const LangInputLabel = ClassNames(styles.langInputLabel, {
    [styles.langInputLabelDark]: langTheme.langName === "dark"
  });
  const LangInputOptions = ClassNames(styles.langInputOptions, {
    [styles.langInputOptionsDark]: langTheme.langName === "dark"
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLangTheme(() => ({ langName: event.target.value }));
  };
  return (
  <FormControl className={styles.formControl}>
    <InputLabel htmlFor="age-native-simple" className={LangInputLabel}>{lang(langTheme.langName).language}</InputLabel>
    <Select
      native
      value={langTheme.langName}
      onChange={handleChange}
      inputProps={{
        name: 'age',
        id: 'age-native-simple',
      }}
      className={LangInputOptions}
    >
      <option value={"ja"}>日本語</option>
      <option value={"aze"}>Azerbaycan</option>
      <option value={"en"}>English</option>
    </Select>
  </FormControl>
  )
}

export default LangToggler2
