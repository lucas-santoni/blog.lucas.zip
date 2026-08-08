import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import astro from 'eslint-plugin-astro'
import globals from 'globals'

// Agent worktrees live in .claude/worktrees/, each a full checkout with its
// own tsconfig.json. typescript-eslint then finds several candidate roots and
// refuses to guess, failing every file with "multiple candidate
// TSConfigRootDirs". Ignoring the directory is not enough — the root is
// resolved before file filtering — so pin it to this config's own location.
const ROOT = fileURLToPath(new URL('.', import.meta.url))

const styleRules = {
  semi: ['error', 'never', { beforeStatementContinuationChars: 'always' }],
  quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
}

export default [
  {
    ignores: ['dist/**', '.astro/**', '.vercel/**', 'node_modules/**', '.claude/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: ROOT,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...styleRules,
      '@typescript-eslint/semi': 'off',
      '@typescript-eslint/quotes': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      ...styleRules,
    },
  },
  {
    files: ['**/*.astro'],
    rules: {
      ...styleRules,
    },
  },
]
