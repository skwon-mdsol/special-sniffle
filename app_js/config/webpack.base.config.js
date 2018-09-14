let webpack = require('webpack');
let path = require('path');

let NODE_ENV = process.env.NODE_ENV || 'development';

let env = {
  production: NODE_ENV === 'production',
  test: NODE_ENV === 'test',
  development: NODE_ENV === 'development'
};

module.exports = {
  target: 'electron-renderer',
  context: path.join(__dirname, '../src/'),
  entry: {
    bundle: ['babel-polyfill', 'react-hot-loader/patch', './main.js'],
    devHeader: ['./devHeader.js'],
    vendor: ['react', 'redux', 'react-redux', 'redux-thunk', 'react-bootstrap',
      'react-router', 'react-intl']
  },

  output: {
    path: path.join(__dirname, '../build/'),
    pathinfo: true,
    publicPath: path.join(__dirname, '../build/'),
    filename: '[name].js'
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: env.development,
      __PRODUCTION__: env.production,
      __TEST__: env.test,
      __CURRENT_ENV__: '\'' + (NODE_ENV) + '\''
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development' // default to development
    })
  ],

  node: {
    __dirname: false
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            options: {outputStyle: 'expanded'}
          }
        ]
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, '../src')
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        // don't try to load svg fonts
        exclude: /sandman-bower/,
        options: {
          extract: 'false'
        }
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              hash: 'sha512',
              digest: 'hex',
              name: 'webpack/[hash].[ext]'
            }
          }
        ]
      },
      // fonts
      { test: /\.woff/, loader: 'url-loader' },
      { test: /\.svg/, loader: 'url-loader' },
      { test: /\.ttf/, loader: 'url-loader' },
      { test: /\.otf/, loader: 'url-loader' },
      { test: /\.eot/, loader: 'url-loader' }
    ],
    noParse: /\.min\.js/
  }
};
