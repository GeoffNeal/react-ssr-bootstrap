module.exports = (env = 'production') => {
  if (env === 'development' || env === 'dev') {
    process.env.NODE_ENV = 'development';
    return [require('./dev/webpack.config.client.js'), require('./dev/webpack.config.server.js')];
  }
  process.env.NODE_ENV = 'production';
  return [require('./prod/webpack.config.client.js'), require('./prod/webpack.config.server.js')];
};
