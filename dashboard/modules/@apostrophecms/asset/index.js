import { join } from 'path';
import fs from 'node:fs';

export default {
  options: {
    // When not in production, refresh the page on restart
    refreshOnRestart: true,
    exampleCdnUrl: 'http://localhost:8000',
    exampleCdnVersion: process.env.CDN_VERSION ?? 'v1'
  },
  init(self) {
    // Resolve and cache the package name for quick access.
    const packageJsonPath = join(self.apos.npmRootDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    self.cdnPckageName = packageJson.name;
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

        // Use `dashboard` instead of the namespace
        // to avoid conflicts with the site themes.
        // The same logic should be applied in the deploy script.
        const namespace = 'dashboard';
        const cdnUrl = self.options.exampleCdnUrl;
        const cdnVersion = self.options.exampleCdnVersion;
        const baseUrl = `${cdnUrl}/${self.cdnPckageName}/${cdnVersion}/${namespace}`;

        return baseUrl;
      }
    };
  }
};
