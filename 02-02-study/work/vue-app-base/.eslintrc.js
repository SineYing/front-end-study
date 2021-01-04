module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    'plugin:vue/essential',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    // parser: 'babel-eslint',
  },
  plugins: [
    'html'
  ],
  rules: {
    
  }
}
