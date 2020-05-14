module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: ['stylelint-scss'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'color-hex-case': 'lower',
    'color-hex-length': 'long',
    'string-quotes': 'single'
  }
}
