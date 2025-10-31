export default {
  testEnvironment: "node",
  transform: {},
  testMatch: ["**/tests/**/*.test.js", "**/?(*.)+(spec|test).js"],
  collectCoverageFrom: [
    "**/*.js",
    "!**/node_modules/**",
    "!**/dist/**",
    "!**/coverage/**",
    "!**/*.config.js",
    "!**/build.js",
  ],
  coverageDirectory: "coverage",
  verbose: true,
};