import { default as eslint, default as pluginJs } from '@eslint/js';
import jestFormatting from 'eslint-plugin-jest-formatting';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import nodePlugin from 'eslint-plugin-n';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import hooksPlugin from 'eslint-plugin-react-hooks';
import pluginSecurity from 'eslint-plugin-security';
import globals from 'globals';

export default [
  {
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }] // Ignore les variables commençant par _
    }
  },
  {
    files: jestFormatting.configs.recommended.overrides[0].files,
    rules: jestFormatting.configs.recommended.overrides[0].rules,
    plugins: {
      'jest-formatting': jestFormatting
    }
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    plugins: {
      'jsx-a11y': jsxA11y
    },
    languageOptions: {
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.serviceworker,
        ...globals.browser
      }
    },
    rules: {
      // Active les règles recommandées
      ...jsxA11y.flatConfigs.recommended.rules,
      // Ajoutez vos règles spécifiques ici
      'jsx-a11y/alt-text': 'error' // Exemple : toujours forcer l'attribut alt
    }
  },
  eslint.configs.recommended,
  {
    plugins: {
      'react-hooks': hooksPlugin
    },
    rules: hooksPlugin.configs.recommended.rules
  },
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
    ...nodePlugin.configs['flat/recommended-script'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module'
    },
    rules: {
      'n/exports-style': ['error', 'module.exports']
    },
    ...pluginSecurity.configs.recommended
  },
  {
    ignores: ['node_modules', 'packages/**/node_modules', 'packages/**/build']
  }
];
