const path = require('path');
const paths = require('../paths');

module.exports = {
  name: 'client',
  target: 'web',
  entry: {
    main: [
      require.resolve('core-js/stable'),
      require.resolve('regenerator-runtime/runtime'),
      `${paths.srcClient}/index.js`
    ],
  },
  output: {
    path: path.join(paths.clientBuild, paths.publicPath),
    filename: 'js/[name]-[hash].bundle.js',
    publicPath: paths.publicPath,
    chunkFilename: '[name].[chunkhash:8].chunk.js',
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  stats: {
    colors: true,
  },
};
