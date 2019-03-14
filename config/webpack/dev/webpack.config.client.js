const path = require('path');
const merge = require('webpack-merge');
const clientConfig = require('../webpack.client.base.js');

// Config
const { client: { dev: clientDevLoaders } } = require('../loaders');
const { client: { dev: clientDevPlugins } } = require('../plugins');
const { client: { dev: clientDevResolvers } } = require('../resolvers');

// Utils
const paths = require('../../paths.js');

module.exports = merge(clientConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: clientDevLoaders,
  },
  plugins: clientDevPlugins,
  resolve: clientDevResolvers,
  devServer: {
    contentBase: path.join(__dirname, paths.clientBuild),
    compress: true,
    port: 3000
  },
});
