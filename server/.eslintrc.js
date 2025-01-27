module.exports = {
  env: {
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'jest'],
  rules: {
    'lines-between-class-members': 'off',
    'class-methods-use-this': 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'prettier/prettier': ['error'],
    // Easier debugging with better stacktraces
    'no-return-await': 'off',
    // Cleaner to not have to specify file extensions in imports
    'import/extensions': ['error', 'never'],
    // Server should use logging, but we should probably create a customer logger
    'no-console': 'off',
    // Forcing a default export can cause future headaches
    'import/prefer-default-export': 'off',
    // Some packages we use do not have typescript defs and must be required
    '@typescript-eslint/no-var-requires': 'off',
    // Fix some eslint issues when using typescript
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-use-before-define': 'off',
    // Fixes typescript definitions and allows functions (can be safely hoisted)
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/no-namespace': 'off',
  },
}
