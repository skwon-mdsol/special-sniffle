module.exports = {
  visit () {
    browser.url('/medidations/');
  },

  rows () {
    return browser.elements('#medidations-list > tbody > tr').value;
  }
};
