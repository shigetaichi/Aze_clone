import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useLangContext, useSetLangContext, lang } from '../context/langContext';
import ClassNames from 'classnames';
import styles from '../components-style/LangToggler.module.css';

const LangToggler2 = () => {
  const langTheme = useLangContext();
  const setLangTheme = useSetLangContext();
  const [state, setState] = React.useState<string>("ja");
  
  const LangInputLabel = ClassNames(styles.langInputLabel, {
    [styles.langInputLabelDark]: langTheme.langName === "dark"
  });
  const LangInputOptions = ClassNames(styles.langInputOptions, {
    [styles.langInputOptionsDark]: langTheme.langName === "dark"
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
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
