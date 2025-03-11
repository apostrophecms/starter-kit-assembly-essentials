export default {
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
