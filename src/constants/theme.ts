export type Theme = {
  primary: string;
  background: string;
  backgroundSoft: string;
  text: string;
  textSoft: string;
  textMuted: string;
  border: string;
};

export const COLORS = {
  PRIMARY: '#691498',
  WHITE: '#fff',
  BLACK: '#000',
  ALMOST_BLACK: '#282828',
  ALMOST_WHITE: '#f1f1f1',
  GRAY_LIGHT: '#aaa',
  GRAY_DARK: '#444',
};

export const LightTheme: Theme = {
  primary: COLORS.PRIMARY,
  background: COLORS.WHITE,
  backgroundSoft: COLORS.ALMOST_WHITE,
  text: COLORS.ALMOST_BLACK,
  textSoft: COLORS.GRAY_DARK,
  textMuted: COLORS.GRAY_LIGHT,
  border: COLORS.ALMOST_WHITE,
};

export const DarkTheme: Theme = {
  primary: COLORS.PRIMARY,
  background: COLORS.BLACK,
  backgroundSoft: COLORS.ALMOST_BLACK,
  text: COLORS.WHITE,
  textSoft: COLORS.GRAY_LIGHT,
  textMuted: COLORS.GRAY_DARK,
  border: COLORS.ALMOST_BLACK,
};
