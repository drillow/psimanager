import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import reactConfig from '@rocketseat/eslint-config/react'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended, 
      ...tseslint.configs.recommended
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      ...reactConfig.plugins
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...reactConfig.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)