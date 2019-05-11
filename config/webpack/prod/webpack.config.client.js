const path = require('path');
const merge = require('webpack-merge');
const clientConfig = require('../webpack.client.base.js');

// Utils
const paths = require('../../paths.js');

// Config
const { client: { prod: clientProdLoaders } } = require('../loaders');
const { client: { prod: clientProdResolvers } } = require('../resolvers');
const {
  client: {
    prod: {
      regular: clientProdPlugins,
      minimizer: clientProdPluginsOptimization,
    }
  }
} = require('../plugins');

// Export
module.exports = merge(clientConfig, {
  mode: 'production',
  devtool: 'inline-source-map',
  module: {
    rules: clientProdLoaders,
  },
  plugins: clientProdPlugins,
  resolve: clientProdResolvers,
  optimization: {
    minimizer: clientProdPluginsOptimization,
  },
});
