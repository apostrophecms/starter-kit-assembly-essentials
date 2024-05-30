/**
 * A Module that can be used to add utility functions
 * that are used across multiple modules
 */

module.exports = {
  options: {
    alias: 'helpers'
  },
  /**
   * NOTE: `helpers` can be added to any module
   * https://docs.apostrophecms.org/reference/module-api/module-overview.html#helpers-self
   */
  helpers(self, options) {
    return {
      /**
       * If the following code is uncommented, the `isInt` helper
       * would be available in templates as apos.helpers.isInt()
       *
       * isInt: (n) => {
       *   return n % 1 === 0;
       * },
       *
       * NOTE: async functions are NOT allowed in helpers, you should
       * write an async component instead for such cases
       */
    };
  }
};
