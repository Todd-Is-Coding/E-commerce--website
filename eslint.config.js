const js = require('@eslint/js');
const globals = require('globals');
const airbnb = require('eslint-config-airbnb-base');
const prettier = require('eslint-config-prettier');
const importPlugin = require('eslint-plugin-import');
const nodePlugin = require('eslint-plugin-node');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  js.configs.recommended,

  {
    files: ['**/*.js'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      globals: {
        ...globals.node
      }
    },

    plugins: {
      import: importPlugin,
      node: nodePlugin,
      prettier: prettierPlugin
    },

    rules: {
      ...airbnb.rules,

      'prettier/prettier': 'error',

      'no-console': 'warn',
      'no-undef': 'warn',
      'consistent-return': 'off',
      'func-names': 'off',
      'class-methods-use-this': 'off',

      'prefer-destructuring': ['error', { object: true, array: false }],

      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: 'req|res|next|val'
        }
      ],

      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index'],
          'newlines-between': 'always'
        }
      ],

      'node/no-unsupported-features/es-syntax': 'off'
    }
  },

  prettier
];
