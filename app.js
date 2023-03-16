const multisite = require('@apostrophecms-pro/multisite');
const { sdk } = require('./telemetry');

go();

async function go() {
  try {
    if (process.env.APOS_OPENTELEMETRY) {
      await sdk.start();
    }
    await multisite({
      // Default port, for dev
      port: 3000,
      websocket: true,
      // Change this to a hardcoded string when forking to make a new project.
      // Just set it to a string which should never change. Ideally should match
      // your repo name followed by a -, however if you plan to use a
      // cheap Atlas cluster (below M10), you must use a unique prefix less
      // than 12 characters (before the -).
      shortNamePrefix: process.env.APOS_PREFIX || 'a3ab-',
      // You may set the dashboard short name to a different value, than the default
      // 'dashboard'. For exanple if set to `admin`, the dashboard would be
      // available at `http://admin.yourdomain.com`.
      dashboardShortName: process.env.APOS_DASHBOARD || 'dashboard',
      // For development. An environment variable overrides this in staging/production
      mongodbUrl: 'mongodb://localhost:27017',
      sessionSecret: 'CHANGEME',
      sites: require('./sites/index.js'),
      dashboard: require('./dashboard/index.js')
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
