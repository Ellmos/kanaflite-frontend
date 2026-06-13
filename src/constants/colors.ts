export type Themes = {
  light: Palette;
  dark: Palette;
};

export type Palette = {
  bgDark: string;
  bg: string;
  bgLight: string;

  text: string;
  textMuted: string;

  border: string;

  primary: string;
  secondary: string;

  danger: string;
  warning: string;
  success: string;
  info: string;
};

export const Colors: Themes = {
  light: {
    bgDark: 'hsl(0 0% 90%)',
    bg: 'hsl(0 0% 95%)',
    bgLight: 'hsl(0 0% 100%)',

    text: 'hsl(0 0% 5%)',
    textMuted: 'hsl(0 0% 30%)',

    border: 'hsl(221 54% 58%)',

    primary: 'hsl(246 56% 41%)',
    secondary: 'hsl(48 100% 9%)',

    danger: 'hsl(5 77% 40%)',
    warning: 'hsl(51 100% 12%)',
    success: 'hsl(160 100% 11%)',
    info: 'hsl(217 78% 44%)',
  },
  dark: {
    bgDark: 'hsl(0 0% 0%)',
    bg: 'hsl(0 0% 5%)',
    bgLight: 'hsl(0 0% 10%)',

    text: 'hsl(0 0% 95%)',
    textMuted: 'hsl(0 0% 70%)',

    border: 'hsl(0 0% 30%)',

    primary: 'hsl(237 100% 87%)',
    secondary: 'hsl(53 100% 29%)',

    danger: 'hsl(7 94% 66%)',
    warning: 'hsl(53 100% 24%)',
    success: 'hsl(163 100% 26%)',
    info: 'hsl(217 100% 70%)',
  },
};
