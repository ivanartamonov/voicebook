import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
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

  const setTheme = useCallback((newTheme: ColorSchemeName) => {
    setThemeMode(newTheme);
    if (newTheme !== null) {
      setIsDark(newTheme === 'dark');
    }
  }, []);

  const contextValue = useMemo(
    () => ({theme, isDark, setTheme, themeMode}),
    [theme, isDark, setTheme, themeMode],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
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
