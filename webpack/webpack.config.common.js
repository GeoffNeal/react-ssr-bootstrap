const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'main.bundle.js',
    publicPath: '/dist/'
  },
  // ---- To be moved into appropriate config
  devtool: 'source-map',
  resolve: {
    // File extensions. Add others and needed (e.g. scss, json)
    extensions: ['.js', '.scss'],
    modules: ['node_modules'],
    // Aliases help with shortening relative paths
    // 'Components/button' === '../../../components/button'
    alias: {
      Components: path.resolve(__dirname, '../src', 'components'),
      Containers: path.resolve(__dirname, '../src', 'containers'),
      Utils: path.resolve(__dirname, '../src', 'utils'),
      Styles: path.resolve(__dirname, '../src', 'styles'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              parser: 'postcss-scss'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // NOTE: Causes depracation warning:
    // DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
    new FlowBabelWebpackPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, '../src'),
    compress: true,
    port: 3000
  }
};
