const path = require("path").resolve;
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: path(__dirname, "..", "src", "index.js"),
  },
  output: {
    filename: "[name].[contenthash:6].js",
    path: path(__dirname, "..", "build"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "source-map-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path(__dirname, "..", "public", "index.html"),
    }),
  ],
  devtool: "source-map",
};
