module.exports = {
  env: {
    commonjs: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['dist'],
  rules: {
    'no-console': 2,
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'no-multi-spaces': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
  },
}
