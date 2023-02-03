module.exports = {
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/src/__tests__/setup-env.ts"],
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.ts"],
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!(nanoid)/)"],
  transform: {
    "\\.[jt]sx?$": "babel-jest",
    "\\.hbs$": "<rootDir>/node_modules/jest-text-transformer",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/src/__tests__"],
  moduleNameMapper: {
    "\\.(scss)$": "identity-obj-proxy",
    "^shared(.*)$": "<rootDir>/src/shared$1",
    "^app(.*)$": "<rootDir>/src/app$1",
    "^__tests__(.*)$": "<rootDir>/src/__tests__$1",
  },
};
