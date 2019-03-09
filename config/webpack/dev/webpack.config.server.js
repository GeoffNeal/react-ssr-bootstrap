const path = require('path');
const merge = require('webpack-merge');
const serverConfig = require('../webpack.server.base.js');

// Config
const { server: { dev: serverDevLoaders } } = require('../loaders');
const { server: { dev: serverDevPlugins } } = require('../plugins');
const { server: { dev: serverDevResolvers } } = require('../resolvers');

// Utils
const paths = require('../../paths.js');

module.exports = merge(serverConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  // output: {
  //   path: path.resolve(__dirname, paths.serverBuild),
  //   filename: 'js/[name]-[hash].bundle.js',
  //   publicPath: paths.publicPath
  // },
  module: {
    rules: serverDevLoaders,
  },
  plugins: serverDevPlugins,
  resolve: serverDevResolvers,
});
