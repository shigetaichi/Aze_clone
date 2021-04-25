import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useEffect, useState } from "react"
import { localeData } from "../lang/common";
import { NextRouter, useRouter } from "next/router";

export type LocaleType = 'ja' | 'az' | 'en' | 'ru';

const LocaleContext = createContext<LocaleType>('ja');
const SetLocaleContext = createContext<Dispatch<SetStateAction<LocaleType>>>(
  () => {
  },
)

const useLocaleContext = () => {
  return useContext(LocaleContext);
}
const useSetLocaleContext = () => {
  return useContext(SetLocaleContext);
}

const LocaleProvider: FC = (props: {
  locale?: LocaleType,
  children: ReactNode,
}) => {
  const router: NextRouter = useRouter();
  const [locale, setLocale] = useState<LocaleType>(String(router.query.locale) as LocaleType ? String(router.query.locale) as LocaleType : 'ja');
  
  return (
    <LocaleContext.Provider value={locale}>
      <SetLocaleContext.Provider value={setLocale}>
        {props.children}
      </SetLocaleContext.Provider>
    </LocaleContext.Provider>
  )
}

const locale = (lang: string) => !lang ? localeData['ja'] : localeData[lang];

export { LocaleProvider, useLocaleContext, useSetLocaleContext, locale };
