'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: 'js/[name]-[hash].bundle.js',
    publicPath: '/'
  },
  // ---- To be moved into appropriate config
  resolve: {
    // File extensions. Add others and needed (e.g. scss, json)
    extensions: ['.js', '.scss'],
    modules: ['node_modules'],
    // Aliases help with shortening relative paths
    // 'Components/button' === '../../../components/button'
    alias: {
      Components: path.resolve(__dirname, '../../src', 'components'),
      Containers: path.resolve(__dirname, '../../src', 'containers'),
      Utils: path.resolve(__dirname, '../../src', 'utils'),
      Styles: path.resolve(__dirname, '../../src', 'styles'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, '../../src')],
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader', options: { minimize: true } }]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              parser: 'postcss-scss'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]-[hash].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      template: require('html-webpack-template'),
      inject: false,
      appMountId: 'root',
    }),
    // NOTE: Causes depracation warning:
    // DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
    new FlowBabelWebpackPlugin()
  ]
};
