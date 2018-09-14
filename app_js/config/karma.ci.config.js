module.exports = function (config) {
  var options = require('./karma.base.config');
  options.singleRun = true;
  options.autoWatch = false;
  options.logLevel = config.LOG_WARN;
  config.set(options);
};
