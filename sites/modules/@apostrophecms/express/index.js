module.exports = {
  options: {
    apiKeys: process.env.CI === '1'
      ? {
        cypressAPIKey: {
          role: 'admin'
        }
      }
      : {}
  }
};
