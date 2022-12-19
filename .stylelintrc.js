module.exports = {
  extends: ["stylelint-config-standard-scss", "stylelint-config-clean-order", "stylelint-config-prettier"],
  plugins: ["stylelint-order", "stylelint-scss"],
  rules: {
    "selector-class-pattern":
      "^(?:(?:o|c|u|t|s|is|has|_|js|qa)-)?[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:__[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:--[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:\\[.+\\])?$",
  },
  ignoreFiles: ["dist/*", "node_modules/*"],
};
