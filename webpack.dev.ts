import CircularDependencyPlugin from "circular-dependency-plugin";
import Dotenv from "dotenv-webpack";
import webpack from "webpack";
import webpackDevServer from "webpack-dev-server";
import { merge } from "webpack-merge";

import common from "./webpack.common";

const config: webpack.Configuration | webpackDevServer.Configuration = merge(common, {
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

export default config;
