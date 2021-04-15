import React from 'react'
import { useThemeContext } from '../context/context';

const TogglerChild = () => {
  const themeNames = useThemeContext();
  return (
    <div>
      {themeNames.themeName}
    </div>
  )
}

export default TogglerChild
