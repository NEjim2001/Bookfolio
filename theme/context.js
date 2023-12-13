import React, {createContext, useContext, useState} from 'react';
import {useColorScheme} from 'nativewind';

const DarkModeContext = createContext();

export const DarkModeProvider = ({children}) => {
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{isDarkMode, toggleDarkMode}}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};
