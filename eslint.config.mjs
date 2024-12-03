import globals from 'globals';
import pluginJs from '@eslint/js';

import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.commonjs, ...globals.node } } },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    files: ['src/frontend/**/*.js', 'src/frontend/**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
  {
    files: ['src/backend/**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module'
    }
    /*
    plugins: {
        security,
        node
    }
    */
  }
];
