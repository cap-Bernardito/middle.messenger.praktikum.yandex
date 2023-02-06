/* eslint-disable @typescript-eslint/no-var-requires */
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  devtool: false,
  output: {
    filename: "[name]-[contenthash:8].js",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            keep_fnames: true,
          },
          mangle: {
            keep_fnames: true,
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.s[ca]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: ".env.production",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css?id=[contenthash]",
    }),
  ],
});
