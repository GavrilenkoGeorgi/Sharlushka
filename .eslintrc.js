// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    "indent": ["error", 2],
    "no-trailing-spaces": [1, { "skipBlankLines": false }],
    "no-multiple-empty-lines": ["error", { "max": 1}],
    "no-multi-spaces": "error",
    'quotes': [2, "backtick"],
    "padded-blocks": ['error', { blocks: 'never', classes: 'never', switches: 'never' }],
    // "no-extra-parens": "error", // later
    "semi": ["error", "never"],
    "comma-dangle": ["error", "never"],
    "no-console": "off",
    // allow async-await
    "generator-star-spacing": "off",
    "max-len": ["error", { "code": 130 }], // for now
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "spaced-comment": ["error", "always", {
      "line": {
          "markers": ["/"],
          "exceptions": ["-", "+"]
      },
      "block": {
          "markers": ["!"],
          "exceptions": ["*"],
          "balanced": true
      }
    }],
    "vue/array-bracket-spacing": "error"
  }
}
