import { useLangContext, useSetLangContext, lang, LangContext } from 'context/langContext';
import ClassNames from 'classnames';
import styles from './LangSelect.module.scss';
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { NextRouter, useRouter } from "next/router";

const LangSelect = () => {
  const router: NextRouter = useRouter();
  const langTheme: LangContext = useLangContext();
  const setLangTheme: Dispatch<SetStateAction<LangContext>> = useSetLangContext();

  const LangInputLabel = ClassNames(styles.langInputLabel, {
    [styles.langInputLabelDark]: langTheme.langName === "dark"
  });
  const LangInputOptions = ClassNames(styles.langInputOptions, {
    [styles.langInputOptionsDark]: langTheme.langName === "dark"
  });
  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    router.push(router.pathname.replace('[lang]',event.target.value));
    setLangTheme(() => ({ langName: event.target.value }));
  }

  return (
    <>
      <label htmlFor="lang-select" className={LangInputLabel}>{lang(langTheme.langName).language}</label>
      <select name="lang-select" id="lang-select" className={LangInputOptions} onChange={handleChange}>
        <option value="ja">日本語</option>
        <option value="az">Azerbaycan</option>
        <option value="en">English</option>
      </select>
    </>
  )
}

export default LangSelect
