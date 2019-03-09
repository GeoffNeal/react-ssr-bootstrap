const path = require('path');
const merge = require('webpack-merge');
const serverConfig = require('../webpack.server.base.js');

// Config
const { server: { prod: serverProdLoaders } } = require('../loaders');
const { server: { prod: serverProdPlugins } } = require('../plugins');
const { server: { prod: serverProdResolvers } } = require('../resolvers');

// Utils
const paths = require('../../paths.js');

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
  resolve: serverProdResolvers
});
