module.exports = {
  options: {
    // A handy module to keep template helper functions in
    alias: 'helper'
  },
  helpers(self, options) {
    return {
      // Example. Would be available in templates as apos.helper.isInt()
      // NOTE: async functions are NOT allowed in helpers, you should
      // write an async component instead for such cases
      //
      // isInt: (n) => {
      //   return n % 1 === 0;
      // },
    };
  }
};
