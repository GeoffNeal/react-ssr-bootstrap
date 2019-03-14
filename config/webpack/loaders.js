const path = require('path');

// Config
const paths = require('../paths');

// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const babelLoader = {
  test: /\.js$/,
  include: [path.resolve(__dirname, paths.src)],
  use: [
    {
      loader: require.resolve('babel-loader')
    },
    {
      loader: require.resolve('eslint-loader')
    }
  ]
};

const htmlLoader = {
  test: /\.html$/,
  use: [
    {
      loader: require.resolve('html-loader'),
      options: {
        minimize: true
      }
    }
  ]
};

const sassLoader = {
  test: /\.scss$/,
  include: [path.resolve(__dirname, paths.src)],
  use: [
    {
      loader: MiniCssExtractPlugin.loader
    },
    {
      loader: require.resolve('css-loader'),
      options: {
        sourceMap: true,
        modules: true,
        localIdentName: '[name]__[local]--[hash:base64:5]'
      }
    },
    {
      loader: require.resolve('sass-loader'),
      options: {
        sourceMap: true
      }
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        parser: require.resolve('postcss-scss')
      }
    }
  ]
};

module.exports = {
  client: {
    dev: [babelLoader, htmlLoader, sassLoader],
    prod: [babelLoader, htmlLoader, sassLoader],
  },
  server: {
    dev: [babelLoader, sassLoader],
    prod: [babelLoader, sassLoader],
  },
  shared: {
    dev: [],
    prod: [],
  }
};
