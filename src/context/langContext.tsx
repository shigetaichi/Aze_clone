import React, { createContext, useState, useContext, FC,  Dispatch, SetStateAction, ReactNode } from "react"

export interface LangContext {
  langName: string;
}

const langNames: LangContext = {
  langName: 'ja'
}

const LangContext = createContext<LangContext>(langNames);
const SetLangContext = createContext<Dispatch<SetStateAction<LangContext>>>(
  () => {},
)

const useLangContext = () => {
  return useContext(LangContext);
}
const useSetLangContext = () => {
  return useContext(SetLangContext);
}

const LangProvider: FC = (props: {
    langNames?: LangContext,
    children: ReactNode,
  }) => {
  const [langName, setLangName] = useState<LangContext>(props.langNames ?? langNames);

  return (
    <LangContext.Provider value={langName}>
      <SetLangContext.Provider value={setLangName}>
        {props.children}
      </SetLangContext.Provider>
    </LangContext.Provider>
  )
}

const lang = (lang) => {
  const langJsonData = require(`./lang/${lang}/common.json`);
  return langJsonData;
}

export { LangProvider, langNames, useLangContext, useSetLangContext, lang };
