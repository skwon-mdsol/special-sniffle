const MedidationsPage = require('./pages/medidationsPage');

module.exports = function () {
  this.Given(/^I am on the medidations listing page$/, () => {
    MedidationsPage.visit();
  });
};
