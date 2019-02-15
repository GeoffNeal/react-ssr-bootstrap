'use strict';

// DON'T FORGET TESTING
// DON'T FORGET GIT HOOKS
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../../dist'),
    compress: true,
    port: 3000
  }
});
