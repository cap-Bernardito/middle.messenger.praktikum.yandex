/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/__tests__/setupEnv.ts"],
  moduleNameMapper: {
    "^shared(.*)$": "<rootDir>/src/shared$1",
  },
};
