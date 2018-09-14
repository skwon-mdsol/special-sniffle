module.exports = function () {
  this.Given(/^I have (.*)$/, function (fixtureName) {
    const fixtures = {
      '1 medidation': 'one-medidation'
    };

    // start a json-server with the fixture json
    // closing any if they already exist.
    // return the promise and cucumber will wait for it to settle befor emoving
    // to the next step.
    const useFixture = require('../support/use-fixture');
    useFixture.close(this);
    return useFixture(fixtures[fixtureName]).then(server => {
      this.jsonServer = server;
    });
  });
};
