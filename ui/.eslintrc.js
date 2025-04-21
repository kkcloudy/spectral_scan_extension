const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  extends: ['react-app', 'prettier', 'prettier/react'],
  plugins: ['prettier'],
  rules: {
    'linebreak-style': 0,
    'react/jsx-key': 2,
    'react/prop-types': 1,
    'consistent-return': 0,
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
    'import/first': 2,
    'import/no-duplicates': 2,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-wrap-multilines': 0,
    'react/jsx-indent': 0,
    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 0,
    'react-hooks/exhaustive-deps': 2,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'spaced-comment': 1,
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'no-debugger': 1,
    'no-console': 1,
    'no-restricted-imports': [
      'error',
      {
        patterns: ['.*'],
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true,
        ignoreMemberSort: true,
        allowSeparatedGroups: true,
      },
    ],
    'jsx-quotes': [1, 'prefer-double'],
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['state'] },
    ],
    'prettier/prettier': ['error', prettierOptions],
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: { 'prettier/prettier': ['warn', prettierOptions] },
    },
  ],
};
