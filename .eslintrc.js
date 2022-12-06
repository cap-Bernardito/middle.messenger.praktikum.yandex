module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      modules: true,
    },
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
  },
  plugins: ["@typescript-eslint", "simple-import-sort", "prettier"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  rules: {
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [
          ["^@?\\w"],
          ["^(app)(/.*|$)"],
          ["^(proccess)(/.*|$)"],
          ["^(pages)(/.*|$)"],
          ["^(widgets)(/.*|$)"],
          ["^(features)(/.*|$)"],
          ["^(entities)(/.*|$)"],
          ["^(shared)(/.*|$)"],
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          ["^styles(/.*|$)"],
          ["^.+\\.s?css$"],
        ],
      },
    ],
    "simple-import-sort/exports": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
  },
  settings: {
    "import/extensions": [".js", ".ts"],
  },
};
