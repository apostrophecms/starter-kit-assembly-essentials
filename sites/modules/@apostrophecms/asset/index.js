export default {
  options: {
    // When not in production, refresh the page on restart
    refreshOnRestart: true
  },
  methods(self) {
    return {
      getNamespace() {
        return self.apos.options.theme;
      }
    };
  }
};
