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

  highlight: string;

  border: string;
  borderMuted: string;

  primary: string;
  secondary: string;

  danger: string;
  warning: string;
  success: string;
  info: string;
};

export const Colors: Themes = {
  light: {
    bgDark: 'hsl(220 100% 94%)',
    bg: 'hsl(220 100% 99%)',
    bgLight: 'hsl(220 100% 100%)',

    text: 'hsl(248 100% 11%)',
    textMuted: 'hsl(222 61% 34%)',

    highlight: 'hsl(220 100% 100%)',

    border: 'hsl(221 54% 58%)',
    borderMuted: 'hsl(221 79% 70%)',

    primary: 'hsl(222 61% 34%)',
    secondary: 'hsl(42 100% 13%)',

    danger: 'hsl(7 51% 41%)',
    warning: 'hsl(53 100% 15%)',
    success: 'hsl(161 100% 17%)',
    info: 'hsl(217 54% 44%)',
  },
  dark: {
    bgDark: 'oklch(0.1 0.065 264)',
    bg: 'oklch(0.15 0.065 264)',
    bgLight: 'oklch(0.2 0.065 264)',

    text: 'oklch(0.96 0.1 264)',
    textMuted: 'oklch(0.76 0.1 264)',

    highlight: 'oklch(0.5 0.13 264)',

    border: 'oklch(0.4 0.13 264)',
    borderMuted: 'oklch(0.3 0.13 264)',

    primary: 'oklch(0.76 0.13 264)',
    secondary: 'oklch(0.76 0.13 84)',

    danger: 'oklch(0.7 0.13 30)',
    warning: 'oklch(0.7 0.13 100)',
    success: 'oklch(0.7 0.13 160)',
    info: 'oklch(0.7 0.13 260)',
  },
};
