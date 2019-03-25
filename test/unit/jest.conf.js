const path = require(`path`)

module.exports = {
  rootDir: path.resolve(__dirname, `../../`),
  moduleFileExtensions: [
    `js`,
    `json`,
    `vue`
  ],
  moduleDirectories: [`node_modules`, `bower_components`, `shared`],
  moduleNameMapper: {
    '^@/(.*)$': `<rootDir>/src/$1`,
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/fileMock.js`,
    "\\.(css|less)$": `<rootDir>/__mocks__/styleMock.js`
  },
  transform: {
    '^.+\\.js$': `<rootDir>/node_modules/babel-jest`,
    '^.*\\.vue$': `<rootDir>/node_modules/vue-jest`,
    '^.+\\.(css|styl|less|sass|scss|png|svg|jpg|ttf|woff|woff2)$': `jest-transform-stub`
  },
  testPathIgnorePatterns: [
    `<rootDir>/test/e2e`
  ],
  snapshotSerializers: [`<rootDir>/node_modules/jest-serializer-vue`],
  setupFiles: [`<rootDir>/test/unit/setup`],
  coverageDirectory: `<rootDir>/test/unit/coverage`,
  collectCoverageFrom: [
    `src/**/*.{js,vue}`,
    `!src/main.js`,
    `!src/router/index.js`,
    `!**/node_modules/**`
  ]
}
