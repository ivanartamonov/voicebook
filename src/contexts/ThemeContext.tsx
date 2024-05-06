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
  themeMode: ColorSchemeName;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({children}: ThemeProviderProps) => {
  const [themeMode, setThemeMode] = useState<ColorSchemeName>(null);
  const [isDark, setIsDark] = useState(Appearance.getColorScheme() === 'dark');

  useEffect(() => {
    Appearance.setColorScheme(themeMode);

    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      setIsDark(colorScheme === 'dark');
    });

    return () => subscription.remove();
  }, [themeMode]);

  const theme = isDark ? DarkTheme : LightTheme;

  const setTheme = (newTheme: ColorSchemeName) => {
    setThemeMode(newTheme);
    if (newTheme !== null) {
      setIsDark(newTheme === 'dark');
    }
  };

  return (
    <ThemeContext.Provider value={{theme, isDark, setTheme, themeMode}}>
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
