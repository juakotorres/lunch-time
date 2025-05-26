import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';
import cypress from 'eslint-plugin-cypress/flat';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  prettier,
  {
    files: ['cypress/**/*.ts'],
    extends: [cypress.configs.recommended],
  },
  {
    ignores: [
      'node_modules',
      'build',
      'cypress/screenshots',
      'cypress/videos',
      'cypress/results',
      'cypress/downloads',
    ],
  }
);
