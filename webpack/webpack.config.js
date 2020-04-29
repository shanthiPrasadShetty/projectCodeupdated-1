var webpack = require("webpack");
var path = require("path");
var JavaScriptObfuscator = require('webpack-obfuscator');
var CompressionPlugin = require("compression-webpack-plugin");
const HtmlPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var parentDir = path.join(__dirname, "../");
const VENDOR_MODULES = [
  "aws-sdk",
  "axios",
  "icepick",
  "lodash",
  "material-ui",
  "querystring",
  "react",
  "react-dom",
  "react-redux",
  "react-router",
  "react-router-redux",
  "react-select",
]

module.exports = {
  mode: 'production',
  entry: {
    taskmonk: ['babel-polyfill', path.join(__dirname, "./index.js")],
   'startup.modules': VENDOR_MODULES,
  },
 
  devtool: 'cheap-module-source-map ../src',
  module: {
    rules: [
      { test: /\.html$/, loader: 'html-loader' },
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
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        loaders: ["url-loader"],
      },
    ]
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    modules: [path.resolve(__dirname, "../src"), "node_modules"]
  },
  output: {
    path: __dirname + "/public",
    filename: "[name].js",
  },
  devServer: {
    contentBase: parentDir,
    historyApiFallback: true,
    hot: false,
    inline: false
  },
  plugins: [
    new HtmlPlugin({
      title: 'TaskMonkWeb',
      template: parentDir+'/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production'),
        }
    }),
    new JavaScriptObfuscator ({
      rotateUnicodeArray: true
    }, ['vendors.js'])
  ],
  optimization: {
    minimize: true,
    minimizer: [],
    runtimeChunk: {
      name: "manifest",
    },
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    noEmitOnErrors: true,    
  },
};
