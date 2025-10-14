import basicAuth from 'express-basic-auth';

export default {
  options: {
    apiKeys: process.env.CI === '1'
      ? {
        cypressAPIKey: {
          role: 'admin'
        }
      }
      : {}
  },
  middleware(self) {
    if (self.options.basicAuthPassword) {
      return {
        basicAuth: basicAuth({
          challenge: true,
          users: {
            access: self.options.basicAuthPassword
          }
        })
      };
    } else {
      return {};
    }
  }
};
