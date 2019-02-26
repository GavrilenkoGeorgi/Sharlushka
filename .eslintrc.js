// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    // 'plugin:vue/essential', 
    'plugin:vue/recommended'
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    // 'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    "no-trailing-spaces": [2, { "skipBlankLines": true }],
    "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}

/*
module.exports = {
  extends: [
      
      // These four options are more or less levels of strictness, give the above URL a read through and decide how strict you want your linting to be
      //   Also note we're not setting this up with general JS linting here, just .vue linting
      
      // 'plugin:vue/base',
      // 'plugin:vue/essential',
      'plugin:vue/strongly-recommended',
      // 'plugin:vue/recommended',
  ],
}
*/
