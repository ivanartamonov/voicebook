import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {Appearance, ColorSchemeName} from 'react-native';
import {Theme, LightTheme, DarkTheme} from '../constants/theme';

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  setTheme: (newTheme: ColorSchemeName) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({children}: ThemeProviderProps) => {
  const colorScheme = Appearance.getColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setIsDark(colorScheme === 'dark');
    });

    return () => subscription.remove();
  }, []);

  const theme = isDark ? DarkTheme : LightTheme;

  const setTheme = (newTheme: ColorSchemeName) => {
    Appearance.setColorScheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{theme, isDark, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
