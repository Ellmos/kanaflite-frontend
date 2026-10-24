import { StyleSheet } from 'react-native-unistyles';

type CommomTheme = {
  spacings: {
    /** 4px */
    xxs: number;
    /** 8px */
    xs: number;
    /** 12px */
    sm: number;
    /** 16px */
    md: number;
    /** 24px */
    lg: number;
    /** 32px */
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
  fonts: {
    sizes: {
      sm: number;
      md: number;
      lg: number;
    };
  };
};

const commonTheme: CommomTheme = {
  spacings: {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
  },
  fonts: {
    sizes: {
      sm: 12,
      md: 16,
      lg: 20,
    },
  },
};

type ColorPalette = {
  colors: {
    background: {
      dark: string;
      default: string;
      light: string;
    };
    text: {
      default: string;
      muted: string;
    };

    border: string;

    primary: string;
    secondary: string;

    action: {
      danger: string;
      warning: string;
      success: string;
      info: string;
    };
  };
};

const lightPalette: ColorPalette = {
  colors: {
    background: {
      dark: 'hsl(0 0% 90%)',
      default: 'hsl(0 0% 95%)',
      light: 'hsl(0 0% 100%)',
    },
    text: {
      default: 'hsl(0 0% 5%)',
      muted: 'hsl(0 0% 30%)',
    },

    border: 'hsl(221 54% 58%)',

    primary: 'hsl(246 56% 41%)',
    secondary: 'hsl(48 100% 9%)',

    action: {
      danger: 'hsl(5 77% 40%)',
      warning: 'hsl(51 100% 12%)',
      success: 'hsl(160 100% 11%)',
      info: 'hsl(217 78% 44%)',
    },
  },
};

const darkPalette: ColorPalette = {
  colors: {
    background: {
      dark: 'hsl(0 0% 0%)',
      default: 'hsl(0 0% 5%)',
      light: 'hsl(0 0% 10%)',
    },
    text: {
      default: 'hsl(0 0% 95%)',
      muted: 'hsl(0 0% 70%)',
    },

    border: 'hsl(0 0% 30%)',

    primary: 'hsl(237 100% 87%)',
    secondary: 'hsl(53 100% 29%)',

    action: {
      danger: 'hsl(7 94% 66%)',
      warning: 'hsl(53 100% 24%)',
      success: 'hsl(163 100% 26%)',
      info: 'hsl(217 100% 70%)',
    },
  },
};

type Theme = CommomTheme & ColorPalette;

const lightTheme: Theme = {
  ...commonTheme,
  ...lightPalette,
};

const darkTheme: Theme = {
  ...commonTheme,
  ...darkPalette,
};

const ThemeName = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

const appThemes = {
  [ThemeName.LIGHT]: lightTheme,
  [ThemeName.DARK]: darkTheme,
};

type AppThemes = typeof appThemes;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes: appThemes,
  settings: {
    adaptiveThemes: true,
  },
});
