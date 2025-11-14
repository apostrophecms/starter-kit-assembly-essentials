/**
 * This is a more advanced setup of Palette where the fields and groups have
 * been organized in separate files based on groups. Edit the configs in
 * `lib/configs` to if you'd like to change the existing schema or add
 * new files in lib/configs to add additional fields and groups.
 * The code below should automatically add your fields and groups to Palette
 * as long as your config files export an `add` property containing the fields
 * and `group` property containing the group definition.
 */

import path from 'node:path';
import url from 'node:url';

export default {
  async fields(self, options) {
    const configs = await getConfigs('lib/configs');
    return {
      add: filter(configs, 'add'),
      group: filter(configs, 'group')
    };
    async function getConfigs(folder) {
      const dirname = path.dirname(url.fileURLToPath(import.meta.url));
      const files = options.apos.util.glob(path.join(dirname, folder, '**/*.js'));
      const configs = [];
      for (const file of files) {
        const { default: config } = await import(url.pathToFileURL(file));
        configs.push(config);
      }
      return configs;
    }
  }
};

function filter(configurations, key) {
  let items = {};

  for (const config of Object.keys(configurations)) {
    items = {
      ...items,
      ...configurations[config][key]
    };
  };

  return items;
}
