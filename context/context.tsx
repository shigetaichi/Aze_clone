import React, { createContext, useState, useContext, FC,  Dispatch, SetStateAction, ReactNode } from "react"

export type ThemeContext = {
  themeName: string;
};

const themeNames: ThemeContext = {
  themeName: 'light',
}

const ThemeContext = createContext<ThemeContext>(themeNames);
const SetThemeContext = createContext<Dispatch<SetStateAction<ThemeContext>>>(
  () => {},
)

const useThemeContext = () => {
  return useContext(ThemeContext);
}
const useSetThemeContext = () => {
  return useContext(SetThemeContext);
}

const ColorProvider: FC = (props: {
    themeNames?: ThemeContext,
    children: ReactNode,
  }) => {
  const [themeName, setThemeName] = useState<ThemeContext>(props.themeNames ?? themeNames);
  
  return (
    <ThemeContext.Provider value={themeName}>
      <SetThemeContext.Provider value={setThemeName}>
        {props.children}
      </SetThemeContext.Provider>
    </ThemeContext.Provider>
  )
}

// useContextを使って、ThemeContext.Providerに渡されたvalueを利用するためのuseThemeContextというヘルパー関数を定義
// const useThemeContext = () => useContext(ThemeContext);


export { ColorProvider, themeNames, useThemeContext, useSetThemeContext };