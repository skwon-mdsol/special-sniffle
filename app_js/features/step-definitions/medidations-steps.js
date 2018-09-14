const assert = require('assert');
const MedidationsPage = require('./pages/medidationsPage');

module.exports = function () {
  this.Then(/^I should see 1 medidation table row$/, () => {
    assert.equal(MedidationsPage.rows().length, 1);
  });
};
