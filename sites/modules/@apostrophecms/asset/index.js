import { join } from 'path';
import fs from 'node:fs';

export default {
  options: {
    // When not in production, refresh the page on restart
    refreshOnRestart: true,
    // Disable hot module replacement in Cypress test mode,
    // use HMR for `public` code in development mode.
    // Change `public` to `apos` for admin UI HMR.
    hmr: process.env.CI === '1' ? false : 'public',
    exampleCdnUrl: 'http://localhost:8000',
    exampleCdnVersion: process.env.CDN_VERSION ?? 'v1'
  },
  init(self) {
    // Resolve and cache the package name for quick access.
    const packageJsonPath = join(self.apos.npmRootDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    self.cdnPckageName = packageJson.name;
  },
  methods(self) {
    return {
      getNamespace() {
        return self.apos.options.theme;
      }
    };
  },
  extendMethods(self) {
    return {
      getAssetBaseUrl(_super) {
        const url = _super();
        // Override only in production mode and
        // when not in the build task.
        if (!self.isProductionMode() || self.inBuildTask) {
          return url;
        }

        const namespace = self.getNamespace();
        const cdnUrl = self.options.exampleCdnUrl;
        const cdnVersion = self.options.exampleCdnVersion;

        return `${cdnUrl}/${self.cdnPckageName}/${cdnVersion}/${namespace}`;
      }
    };
  }
};
