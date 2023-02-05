/* eslint-disable @typescript-eslint/no-var-requires */
const Dotenv = require("dotenv-webpack");
const { merge } = require("webpack-merge");
const CircularDependencyPlugin = require("circular-dependency-plugin");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  output: {
    filename: "[name].js",
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    open: false,
  },
  module: {
    rules: [
      {
        test: /\.s[ca]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: ".env.development",
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      include: /src/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    }),
  ],
});
