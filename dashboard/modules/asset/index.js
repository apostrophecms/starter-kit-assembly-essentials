module.exports = {
  afterConstruct: function (self) {
    // in dev, these are injected by webpack for live reload; in prod,
    // we must push them as assets
    if (process.env.NODE_ENV === 'production') {
      self.pushAsset('script', 'site', { when: 'always' });
      self.pushAsset('stylesheet', 'site', { when: 'always' });
    }
  }
};