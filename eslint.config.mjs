import eslint from '@eslint/js'; // EsLint Configuration
import eslintConfigPrettier from 'eslint-config-prettier';
import jsdoc from 'eslint-plugin-jsdoc';
import playwright from 'eslint-plugin-playwright';
import typescriptEslint from 'typescript-eslint'; // EsLint Typescript Configuration

// typescript rules defined according to typescript-eslint best practices
// eslint-plugin-playwright rules defined according playwright best practices
export default typescriptEslint.config(
  eslint.configs.recommended,
  eslintConfigPrettier,
  jsdoc.configs['flat/recommended-typescript-error'],
  playwright.configs['flat/recommended'],
  ...typescriptEslint.configs.strictTypeChecked,
  ...typescriptEslint.configs.stylisticTypeChecked,
  {
    ignores: ['commitlint.config.mjs', 'eslint.config.mjs'],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {

      //typescript-eslint rules
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/prefer-for-of': 'warn',
      '@typescript-eslint/restrict-template-expressions':'warn',
      'no-unsafe-optional-chaining': 'warn',

      //playwright rules
      'playwright/no-networkidle': 'warn',
      'playwright/no-commented-out-tests': 'error',
      'playwright/no-duplicate-hooks': 'error',
      'playwright/no-get-by-title': 'error',
      'playwright/no-restricted-matchers': 'error',
      'playwright/prefer-comparison-matcher': 'error',
      'playwright/prefer-equality-matcher': 'error',
      'playwright/prefer-hooks-in-order': 'error',
      'playwright/prefer-hooks-on-top': 'error',
      'playwright/prefer-native-locators': 'error',
      'playwright/prefer-strict-equal': 'error',
      'playwright/prefer-to-be': 'error',
      'playwright/prefer-to-contain': 'error',
      'playwright/prefer-to-have-count': 'error',
      'playwright/prefer-to-have-length': 'error',
      'playwright/require-to-throw-message': 'error',
      'playwright/require-top-level-describe': 'error',
    },
  },
);
