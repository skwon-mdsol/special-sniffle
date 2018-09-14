const closeFixture = require('../use-fixture').close;

module.exports = function () {
  this.After(function () {
    closeFixture(this);
  });
};
