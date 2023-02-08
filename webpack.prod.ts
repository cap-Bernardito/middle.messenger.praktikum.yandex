import Dotenv from "dotenv-webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import webpack from "webpack";
import { merge } from "webpack-merge";

import common from "./webpack.common";

const config: webpack.Configuration = merge(common, {
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

export default config;
