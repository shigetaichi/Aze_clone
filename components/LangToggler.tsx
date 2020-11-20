import React, { FC, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useLangContext, useSetLangContext } from '../context/langContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const LangToggler: FC = () => {
  const classes = useStyles();
  const langTheme = useLangContext();
  const setLangTheme = useSetLangContext();
  const [langValue, setLangValue] = useState<string>(langTheme.langName);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLangValue(event.target.value);
    setLangTheme(() => ({ langName: event.target.value }));
  }
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>Language</InputLabel>
        <Select
          value={langValue}
          onChange={handleChange}
        >
          <MenuItem value={'ja'}>日本語</MenuItem>
          <MenuItem value={'aze'}>azerbaycan</MenuItem>
          <MenuItem value={'en'}>English</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default LangToggler
