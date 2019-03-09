const path = require('path');
const merge = require('webpack-merge');
const clientConfig = require('../webpack.client.base.js');

// Config
const { client: { prod: clientProdLoaders } } = require('../loaders');
const { client: { prod: clientProdPlugins } } = require('../plugins');
const { client: { prod: clientProdResolvers } } = require('../resolvers');

// Utils
const paths = require('../../paths.js');

module.exports = merge(clientConfig, {
  mode: 'production',
  devtool: 'inline-source-map',
  module: {
    rules: clientProdLoaders,
  },
  plugins: clientProdPlugins,
  resolve: clientProdResolvers,
});
