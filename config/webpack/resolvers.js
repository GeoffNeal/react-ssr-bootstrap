const path = require('path');

const paths = require('../paths');

const resolver = {
  // File extensions. Add others and needed (e.g. scss, json)
  extensions: ['.js', '.scss'],
  modules: ['node_modules'],
  // Aliases help with shortening relative paths
  // 'Components/button' === '../../../components/button'
  alias: {
    Components: path.resolve(__dirname, paths.src ,'shared', 'components'),
    Containers: path.resolve(__dirname, paths.src ,'shared', 'containers'),
    Utils: path.resolve(__dirname, paths.src, 'utils'),
    ExpressMiddleware: path.resolve(__dirname, paths.srcServer, 'middleware'),
  },
};

module.exports = {
  client: {
    dev: resolver,
    prod: resolver,
  },
  server: {
    dev: resolver,
    prod: resolver,
  }
};
