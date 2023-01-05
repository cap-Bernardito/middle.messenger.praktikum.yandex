module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix .", "prettier --write"],
  "*.{json,md,yml}": ["prettier --write"],
  "*.{scss,css}": ["stylelint --fix", "prettier --write"],
};
