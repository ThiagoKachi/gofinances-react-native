module.exports = {
  preset: "jest-expo",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/android/",
    "/ios/",
  ],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.tsx', '!src/**/*.spec.tsx'],
  coverageReporters: [
    "lcov",
  ],
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "jest-styled-components"
  ],
  jest: {
    setupFiles: ["./path/to/jestSetupFile.js"] 
  },
}