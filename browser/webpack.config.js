var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: "./src/entries/game.tsx",
  output: {
    path: "./dist",
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
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ["", ".js", ".ts", ".tsx", ".scss"]
  },
  plugins: [
  ],
};
