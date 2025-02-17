export default {
  tasks(self) {
    if (process.env.CI !== '1') {
      return {};
    }
    return {
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
    };
  }
};
