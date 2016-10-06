var path = require("path");
var webpack = require("webpack");

var AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  entry: "./src/entries/game.tsx",
  output: {
    path: "../server/public/assets/webpack",
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.scss$/,
        loader: 'style!css?minify&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass',
      },
    ],
    preLoaders: [
      {
        test: /\.tsx$/,
        loader: 'baggage?styles.scss=styles',
      },
    ],
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ["", ".js", ".ts", ".tsx", ".scss", ".d.ts"]
  },
  plugins: [
    new AssetsPlugin({path: path.join('..', 'server', 'public', 'assets', 'webpack')}),
  ],
};
