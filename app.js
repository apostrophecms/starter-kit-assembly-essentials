import multisite from '@apostrophecms-pro/multisite';
import { sdk } from './telemetry.js';
import sites from './sites/index.js';
import dashboard from './dashboard/index.js';

go();

async function go() {
  try {
    if (process.env.APOS_OPENTELEMETRY) {
      await sdk.start();
    }
    await multisite({
      root: import.meta,
      // Default port, for dev
      port: 3002,
      websocket: true,
      // Change this to a hardcoded string when forking to make a new project.
      // Just set it to a string which should never change. Ideally should match
      // your repo name followed by a `-`, however if you plan to use a
      // cheap Atlas cluster (below M10), you must use a unique prefix less
      // than 12 characters (before the -).
      shortNamePrefix: process.env.APOS_PREFIX || 'a3ab-',
      // Suffix, used only for building hostnames and not affecting
      // e.g. database names. For example, if you set this to `-assembly`,
      // and your short name is `site`, the hostname for that site would be
      // `site-assembly.your-domain.com`, and your dashboard would become available
      // at `dashboard-assembly.your-domain.com`.
      shortNameSuffix: '',
      // Used to separate the locale name from the short name in hostnames.
      // For example, if you set this to `-` and your short name is `site`,
      // the hostname for the `fr` locale with "Separate Host" enabled,
      // would be `fr-site.your-domain.com`.
      localeSeparator: '.',
      // You may set the dashboard short name to a different value than the default
      // 'dashboard'. For example if set to `admin`, the dashboard would be
      // available at `https://admin.yourdomain.com`.
      dashboardShortName: process.env.APOS_DASHBOARD_SHORTNAME || 'dashboard',
      // For development. An environment variable overrides this in staging/production
      mongodbUrl: process.env.APOS_MONGODB_URI || 'mongodb://localhost:27017',
      sessionSecret: 'CHANGEME',
      sites,
      dashboard
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  }
}
