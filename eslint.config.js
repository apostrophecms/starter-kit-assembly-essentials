import apostrophe from 'eslint-config-apostrophe';
import pluginCypress from 'eslint-plugin-cypress';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores([
    '*.d.ts'
  ]),
  apostrophe,
  pluginCypress.configs.recommended
]);
