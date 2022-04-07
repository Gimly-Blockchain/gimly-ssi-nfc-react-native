module.exports = {
    'env': {
        'es6': true,
        'node': true,
        'jest': true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'modules': true
        },
        'ecmaVersion': 6,
        'sourceType': 'module',
        'project': './tsconfig.json',
    },
    'plugins': [
        'react',
        'react-hooks'
    ],
    'rules': {
        'indent': [
            'warn',
            4, 
            { 'SwitchCase': 1 }
        ],
        'quotes': ['error', 'single', { 'avoidEscape': true }],
        'no-empty-function': 'off',
        'react/display-name': 'off',
        'react/prop-types': 'off',
        'linebreak-style': [
            'error',
            'unix'
        ],
        'semi': [
            'warn',
            'always'
        ]
    },
    'settings': {
        'react': {
          'version': 'detect',
        },
      },
};
