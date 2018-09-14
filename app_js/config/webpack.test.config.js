let config = require('./webpack.base.config');

// remove commons chunk plugin
config.plugins.pop();
config.externals = {
  cheerio: 'window',
  'react/addons': true,
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true
};

module.exports = config;
