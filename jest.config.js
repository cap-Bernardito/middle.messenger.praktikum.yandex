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
    "^app(.*)$": "<rootDir>/src/app$1",
    "^processes(.*)$": "<rootDir>/src/processes$1",
    "^pages(.*)$": "<rootDir>/src/pages$1",
    "^widgets(.*)$": "<rootDir>/src/widgets$1",
    "^features(.*)$": "<rootDir>/src/features$1",
    "^entities(.*)$": "<rootDir>/src/entities$1",
    "^shared(.*)$": "<rootDir>/src/shared$1",
    "^__tests__(.*)$": "<rootDir>/src/__tests__$1",
  },
};
