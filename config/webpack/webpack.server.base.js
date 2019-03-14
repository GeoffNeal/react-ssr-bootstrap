const paths = require('../paths');

module.exports = {
  name: 'server',
  target: 'node',
  entry: {
    server: [require.resolve('@babel/polyfill'), `${paths.srcServer}/index.js`]
  },
  output: {
    path: paths.serverBuild,
    filename: 'server.js',
    publicPath: paths.publicPath,
  },
  stats: {
    colors: true,
  },
};
