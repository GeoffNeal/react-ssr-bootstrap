const webpack = require('webpack');

const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');

const sharedAllPlugins = [
  new webpack.HotModuleReplacementPlugin(),
]

const sharedDevPlugins = [
  // Only plugins that can be used for both client and server
  new WriteFileWebpackPlugin(),
  // NOTE: Causes depracation warning:
  // DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
  new FlowBabelWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css"
  }),
];

const sharedprodPlugins = [
  // Only plugins that can be used for both client and server
  new MiniCssExtractPlugin({
    filename: "[name]-[contenthash].css",
    chunkFilename: "[id]-[contenthash].css"
  })
];

const sharedClientPlugins = [
  // Only plugins that can be used in both dev and prod
  new webpack.DefinePlugin({
    __SERVER__: 'false',
    __BROWSER__: 'true',
  }),
  new HtmlWebpackPlugin({
    template: require('html-webpack-template'),
    title: 'Space Place',
    inject: false,
    appMountId: 'root',
  }),
  new ManifestPlugin({ filename: 'manifest.json' }),
];

const sharedServerPlugins = [
  // Only plugins that can be used in both dev and prod
  new webpack.DefinePlugin({
    __SERVER__: 'true',
    __BROWSER__: 'false',
  }),
];

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
  ...sharedServerPlugins
];

const serverProdPlugins = [
  ...sharedAllPlugins,
  ...sharedprodPlugins,
  ...sharedServerPlugins
];

module.exports = {
  client: {
    dev: clientDevPlugins,
    prod: clientProdPlugins,
  },
  server: {
    dev: serverDevPlugins,
    prod: serverProdPlugins,
  },
};
