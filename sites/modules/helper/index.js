module.exports = {
  alias: 'helpers',
  extend: 'apostrophe-module',
  construct: function (self, options) {
    self.addHelpers({
      // Example. Available in templates as apos.helpers.isInt()
      // NOTE: async functions are NOT allowed in helpers, listen for
      // promise events like apostrophe-pages:beforeSend
      // isInt: (n) => {
      //   return n % 1 === 0;
      // },
    });
  }
};
