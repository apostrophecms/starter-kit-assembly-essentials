export default {
  fields: {
    add: {
      basicAuthPassword: {
        type: 'string',
        help: 'If not blank, the username will be "access". You will usually want to clear this field before going live to the public'
      }
    },
    group: {
      basicAuth: {
        label: 'Basic Authentication',
        fields: [ 'basicAuthPassword' ]
      }
    }
  },
  tasks(self) {
    return {
      ...(process.env.CI === '1' && {
        'cypress-config': {
          usage: 'List Cypress configuration and CLI commands for creating DB dumps.\n' +
          '\nUsage: node app site:cypress-config [siteShortName]',
          async task(argv) {
            const task = await import(
              '@apostrophecms-pro/cypress-tools/apos/assembly-config.js'
            );
            try {
              const result = await task.default(self.apos, argv);
              console.log(result);
            } catch (e) {
              console.error(e.message);
              return 1;
            }
          }
        }
      })
    };
  }
};
