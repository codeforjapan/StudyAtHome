module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'js', 'json', 'vue'],
  collectCoverage: false,
  collectCoverageFrom: ['**/*.{tes,js,vue}', '!**/node_modules/**']
}
