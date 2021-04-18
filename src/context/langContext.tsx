import React, { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from "react"

export interface LangContext {
  langName: string;
}

const langNames: LangContext = {
  langName: 'ja'
}

const LangContext = createContext<LangContext>(langNames);
const SetLangContext = createContext<Dispatch<SetStateAction<LangContext>>>(
  () => {
  },
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
  return require(`../lang/${lang}/common.json`);
}

export { LangProvider, langNames, useLangContext, useSetLangContext, lang };
