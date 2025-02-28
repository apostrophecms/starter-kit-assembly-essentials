export default {
  options: {
    // When not in production, refresh the page on restart
    refreshOnRestart: true,
    // Disable hot module replacement in Cypress test mode,
    // use HMR for `public` code in development mode.
    // Change `public` to `apos` for admin UI HMR.
    hmr: process.env.CI === '1' ? false : 'public'
  },
  methods(self) {
    return {
      getNamespace() {
        return self.apos.options.theme;
      }
    };
  }
};
