module.exports = {
  root: true,
  'env': {
    'browser': true,
    'node': true
  },
  parserOptions: {
    'ecmaVersion': 6,
    'sourceType': 'module',
  },
  extends: [
    // add more generic rule sets here, such as:
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
