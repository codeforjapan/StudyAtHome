module.exports = {
  plugins: ['eslint-plugin-tsdoc'],
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/vue'
  ],
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always'
        }
      }
    ],
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true
      }
    ],
    'tsdoc/syntax': 'error'
  }
}
