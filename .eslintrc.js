module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    '@react-native-community'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    semi: 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unknown-property': 'off',
    'react/prop-types': 'off',
    'react/no-unstable-nested-components':
      'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    'no-prototype-builtins': 'off',
    quotes: 'off',
    'comma-dangle': 'off',
    'react-native/no-inline-styles':
      'off',
    'no-unused-vars': 'off',
    'no-extra-semi': 'off',
    'react-hooks/exhaustive-deps':
      'off',
    indent: 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'DeleteExpression',
        message:
          "Deleting properties using the '..' operator is not allowed."
      }
    ],
    '@typescript-eslint/ban-ts-comment':
      [
        'error',
        {
          'ts-ignore': 'off'
        }
      ],
    '@typescript-eslint/no-unsafe-call':
      'off'
  }
};
