module.exports = {
  methods(self) {
    return {
      getNamespace() {
        return self.apos.options.theme;
      }
    };
  }
};
