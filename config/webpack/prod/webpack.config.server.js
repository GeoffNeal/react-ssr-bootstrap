const path = require('path');
const merge = require('webpack-merge');
const serverConfig = require('../webpack.server.base.js');

// Utils
const paths = require('../../paths.js');

// Config
const { server: { prod: serverProdLoaders } } = require('../loaders');
const { server: { prod: serverProdResolvers } } = require('../resolvers');
const {
  server: {
    prod: {
      regular: serverProdPlugins,
      minimizer: serverProdPluginsOptimization,
    }
  }
} = require('../plugins');

// Export
module.exports = merge(serverConfig, {
  mode: 'production',
  devtool: 'inline-source-map',
  // output: {
  //   path: path.resolve(__dirname, paths.serverBuild),
  //   filename: 'js/[name]-[hash].bundle.js',
  //   publicPath: paths.publicPath
  // },
  module: {
    rules: serverProdLoaders,
  },
  plugins: serverProdPlugins,
  resolve: serverProdResolvers,
  optimization: {
    minimizer: serverProdPluginsOptimization,
  },
});
