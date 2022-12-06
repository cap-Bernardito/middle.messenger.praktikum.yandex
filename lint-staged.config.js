module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix .", "prettier --write"],
  "*.{json,md,yml,scss,css}": ["prettier --write"],
};
