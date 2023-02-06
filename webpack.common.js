/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const srcDir = path.resolve(__dirname, "src");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    app: "./index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  watchOptions: {
    ignored: /node_modules/,
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
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: "babel-loader",
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
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
