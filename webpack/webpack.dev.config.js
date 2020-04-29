var webpack = require("webpack");
var path = require("path");

var parentDir = path.join(__dirname, "../");

module.exports = {
  entry: ['babel-polyfill',path.join(__dirname, "../index.js")],
  devtool: 'source-map ../src',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.less$/,
        loaders: ["style-loader", "css-loader", "less-loader"]
      },
      {
				test: /\.(css|scss)$/,
				loaders: ["style-loader", "css-loader", "sass-loader"],
			},
    ]
  },
  output: {
    path: parentDir + "/dist",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: parentDir,
    historyApiFallback: true
  }
};
