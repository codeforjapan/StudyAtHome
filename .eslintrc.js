module.exports = {
  root: true,
  plugins: ['eslint-plugin-tsdoc'],
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'prettier',
  ],
  rules: {
    'require-await': 'off',
    'nuxt/no-cjs-in-config': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/experimental-script-setup-vars': 'off',
    'vue/no-arrow-functions-in-watch': 'off',
    'vue/no-custom-modifiers-on-v-model': 'off',
    'vue/no-dupe-v-else-if': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/no-mutating-props': 'off',
    'vue/no-v-for-template-key': 'off',
    'vue/no-v-model-argument': 'off',
    'vue/one-component-per-file': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
        },
      },
    ],
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
      },
    ],
    'tsdoc/syntax': 'error',
  },
}
