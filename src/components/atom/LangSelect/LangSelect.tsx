import { useLocaleContext, useSetLocaleContext, locale, LocaleType } from 'context/localeContext';
import ClassNames from 'classnames';
import styles from './LangSelect.module.scss';
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { NextRouter, useRouter } from "next/router";
import { ThemeContext, useThemeContext } from "context/context";

const LangSelect = () => {
  const router: NextRouter = useRouter();
  const themeNames: ThemeContext = useThemeContext();
  const localeContext: LocaleType = useLocaleContext();
  const setLocaleContext: Dispatch<SetStateAction<LocaleType>> = useSetLocaleContext();

  const LangInputLabel = ClassNames(styles.langInputLabel, {
    [styles.langInputLabelDark]: themeNames.themeName === "dark"
  });
  const LangInputOptions = ClassNames(styles.langInputOptions, {
    [styles.langInputOptionsDark]: themeNames.themeName === "dark"
  });
  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    router.push(router.pathname.replace('[locale]',event.target.value));
    setLocaleContext(event.target.value as LocaleType);
  }

  return (
    <>
      <label htmlFor="lang-select" className={LangInputLabel}>{locale(localeContext).language}</label>
      <select name="lang-select" id="lang-select" className={LangInputOptions} onChange={handleChange}>
        <option value="ja">日本語</option>
        <option value="az">Azerbaycan</option>
        <option value="en">English</option>
      </select>
    </>
  )
}

export default LangSelect
