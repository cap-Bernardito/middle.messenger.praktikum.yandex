/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";
const srcDir = path.resolve(__dirname, "src");

module.exports = {
  mode: isDev ? "development" : isProd && "production",
  devtool: isDev ? "source-map" : false,
  context: path.resolve(__dirname, "src"),
  entry: {
    app: "./index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isDev ? "[name].js" : "[name]-[contenthash:8].js",
    publicPath: "/",
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  optimization: {
    minimize: isProd,
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
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      handlebars: "handlebars/dist/handlebars.js",
      app: path.resolve(srcDir, "app"),
      processes: path.resolve(srcDir, "processes"),
      pages: path.resolve(srcDir, "pages"),
      widgets: path.resolve(srcDir, "widgets"),
      features: path.resolve(srcDir, "features"),
      entities: path.resolve(srcDir, "entities"),
      shared: path.resolve(srcDir, "shared"),
    },
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    open: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },

      {
        test: /\.s[ca]ss$/i,
        use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.hbs/,
        type: "asset/source",
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "img/[name]-[contenthash][ext]",
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name]-[contenthash][ext]",
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()].concat(
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    isDev
      ? []
      : [
          new MiniCssExtractPlugin({
            filename: "[name].css?id=[contenthash]",
          }),
        ]
  ),
};
