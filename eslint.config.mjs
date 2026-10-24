import expoConfig from 'eslint-config-expo/flat.js';
import { defineConfig } from 'eslint-define-config';
import pluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-plugin-prettier/recommended';

const baseConfig = defineConfig([
  ...expoConfig,
  {
    name: 'global-ignores',
    ignores: ['node_modules/**', 'babel.config.js', '.expo/**', 'metro.config.js'],
  },
  {
    files: ['**/*.{js,ts,jsx,tsx,mjs}'],
    plugins: {
      prettier: pluginPrettier,
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        NodeJS: true,
      },
    },
    rules: {
      eqeqeq: 'off',
      'react-hooks/exhaustive-deps': 'error',
      'prefer-const': 'error',

      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal'],
          pathGroups: [
            { pattern: '@(react|react-native)', group: 'external', position: 'before' },
            { pattern: '@src/**', group: 'internal' },
          ],
          pathGroupsExcludedImportTypes: ['internal', 'react'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          jsxSingleQuote: true,
          printWidth: 120,
        },
      ],
    },
  },
  // keep last to override all other configs
  prettierConfig,
]);

export default defineConfig(baseConfig);
