const webpack = require('webpack');
const path = require('path');

// Normal plugins
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');

// Plugins for webpack minimizer
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// Plugins for everything
// ================================================================

const sharedAllPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new CleanWebpackPlugin(['dist'], {
    root: path.resolve(__dirname, '../../')
  })
]

const sharedAllPluginsOptimization = [];

// Plugins for development
// ================================================================

const sharedDevPlugins = [
  // Only plugins that can be used for both client and server
  new WriteFileWebpackPlugin(),
  // NOTE: Causes depracation warning:
  // DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
  // new FlowBabelWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css"
  }),
];

// Plugins for production
// ================================================================

const sharedprodPlugins = [
  // Only plugins that can be used for both client and server
  new MiniCssExtractPlugin({
    filename: "[name]-[contenthash].css",
    chunkFilename: "[id]-[contenthash].css"
  }),
];

const sharedprodPluginsOptimization = [
  new OptimizeCSSAssetsPlugin({}),
];

// Plugins for client
// ================================================================

const sharedClientPlugins = [
  // Only plugins that can be used in both dev and prod
  new webpack.DefinePlugin({
    __SERVER__: 'false',
    __BROWSER__: 'true',
  }),
  new HtmlWebpackPlugin({
    template: require('html-webpack-template'),
    inject: false,
    appMountId: 'root',
  }),
  new ManifestPlugin({ filename: 'manifest.json' }),
];

const sharedClientPluginsOptimization = [];

// Plugins for server
// ================================================================

const sharedServerPlugins = [
  // Only plugins that can be used in both dev and prod
  new webpack.DefinePlugin({
    __SERVER__: 'true',
    __BROWSER__: 'false',
  }),
];

const sharedServerPluginsOptimization = [];

// Plugin combinations
// ================================================================

const clientDevPlugins = [
  ...sharedAllPlugins,
  ...sharedDevPlugins,
  ...sharedClientPlugins,
];

const clientProdPlugins = [
  ...sharedAllPlugins,
  ...sharedprodPlugins,
  ...sharedClientPlugins,
];

const serverDevPlugins = [
  ...sharedAllPlugins,
  ...sharedDevPlugins,
  ...sharedServerPlugins,
];

const serverProdPlugins = [
  ...sharedAllPlugins,
  ...sharedprodPlugins,
  ...sharedServerPlugins,
];

// Optimization plugin combinations
// ================================================================

const clientProdPluginsOptimization = [
  ...sharedAllPluginsOptimization,
  ...sharedprodPluginsOptimization,
  ...sharedClientPluginsOptimization,
  new UglifyJsPlugin({
    cache: true,
    parallel: true,
    sourceMap: true // set to true if you want JS source maps
  }),
];

const serverProdPluginsOptimization = [
  ...sharedAllPluginsOptimization,
  ...sharedprodPluginsOptimization,
  ...sharedServerPluginsOptimization,
];

module.exports = {
  client: {
    dev: clientDevPlugins,
    prod: {
      regular: clientProdPlugins,
      minimizer: clientProdPluginsOptimization,
    }
  },
  server: {
    dev: serverDevPlugins,
    prod: {
      regular: serverProdPlugins,
      minimizer: serverProdPluginsOptimization,
    }
  },
};
