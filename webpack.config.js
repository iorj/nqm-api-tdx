/* global __dirname, require, module*/
"use strict";

const webpack = require("webpack");
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require("path");
const env  = require("yargs").argv.env; // use --env with webpack 2

let libraryName = "nqm-api-tdx";

let plugins = [], outputFile;

if (env === "build") {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + ".min.js";
} else {
  outputFile = libraryName + ".js";
}

const config = {
  entry: __dirname + "/src/api-tdx.js",
  devtool: "source-map",
  output: {
    path: __dirname + "/lib",
    filename: outputFile,
    library: libraryName,
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: "babel-loader",
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve("./src")],
    extensions: [".json", ".js"]
  },
  plugins: plugins,
  externals: {
    "base-64": "base-64",
    bluebird: "bluebird",
    debug: "debug",
    "@nqminds/isomorphic-fetch": "@nqminds/isomorphic-fetch",
    lodash: {
      commonjs: "lodash",
      commonjs2: "lodash",
      amd: "_",
      root: "_",
    },
  },
};

module.exports = config;
