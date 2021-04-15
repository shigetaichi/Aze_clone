import React, { FC } from 'react'
import { useThemeContext, useSetThemeContext } from '../context/context'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  radioGroup: {
    flexDirection: 'row',
  },

})

const Toggler: FC = () => {
  const classes = useStyles();
  const themeNames = useThemeContext();
  const setThemeName = useSetThemeContext();
  const [value, setValue] = React.useState('light');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    setThemeName(() => ({ themeName: (event.target as HTMLInputElement).value }));
  };
  
  return (
    <div>
      {themeNames.themeName}
      <FormControl component="fieldset">
        <FormLabel component="legend">Color Theme</FormLabel>
        <RadioGroup className={classes.radioGroup} aria-label="gender" name="gender1" value={value} onChange={handleChange}>
          <FormControlLabel value="light" control={<Radio />} label="Light" labelPlacement="top" />
          <FormControlLabel value="dark" control={<Radio />} label="dark" labelPlacement="top" />
          <FormControlLabel value="other" control={<Radio />} label="Other" labelPlacement="top" />
        </RadioGroup>
      </FormControl>
    </div>
  )
}

export default Toggler;
