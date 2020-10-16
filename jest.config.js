module.exports = {
  roots: ['<rootDir>/src'],
  //  setupFiles: ['<rootDir>/test/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'js', 'json', 'vue'],
  collectCoverage: false,
  collectCoverageFrom: ['**/*.{tes,js,vue}', '!**/node_modules/**'],
}
