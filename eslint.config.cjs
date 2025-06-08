/* eslint-disable @typescript-eslint/no-require-imports */
const { defineConfig } = require('eslint/config')

const globals = require('globals')

const { fixupConfigRules, fixupPluginRules } = require('@eslint/compat')

const tsParser = require('@typescript-eslint/parser')
const react = require('eslint-plugin-react')
const jsxA11Y = require('eslint-plugin-jsx-a11y')
const typescriptEslint = require('@typescript-eslint/eslint-plugin')
const js = require('@eslint/js')

const { FlatCompat } = require('@eslint/eslintrc')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

module.exports = defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    extends: fixupConfigRules(
      compat.extends(
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'standard',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
      ),
    ),

    plugins: {
      react: fixupPluginRules(react),
      'jsx-a11y': jsxA11Y,
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
    },

    rules: {
      'prettier/prettier': [
        'error',
        {
          printWidth: 100,
          tabWidth: 2,
          singleQuote: true,
          trailingComma: 'all',
          arrowParens: 'always',
          semi: false,
          endOfLine: 'auto',
        },
      ],

      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      'jsx-a11y/alt-text': [
        'warn',
        {
          elements: ['img'],
          img: ['Image'],
        },
      ],

      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
    },

    settings: {
      react: {
        version: 'detect',
      },

      'import/parsers': {
        [require.resolve('@typescript-eslint/parser')]: ['.ts', '.tsx', '.d.ts'],
      },
    },
  },
])
