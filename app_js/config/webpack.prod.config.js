const config = require('./webpack.base.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

// Use the extract text plugin to get a separate css file
config.module.rules[0].use = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader']
});

config.plugins = config.plugins.concat([
  new ExtractTextPlugin('./[name]-[chunkhash].css'),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor'
  }),
  new webpack.optimize.UglifyJsPlugin(),
  // write out a json manifest of the assets
  function () {
    this.plugin('done', stats => {
      fs.writeFileSync(
        path.join(__dirname, '../build/manifest.json'),
        JSON.stringify(stats.toJson().assetsByChunkName)
      );
    });
  }
]);

config.output.filename = '[name]-[chunkhash].js';

module.exports = config;
