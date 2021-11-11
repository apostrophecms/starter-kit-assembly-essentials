const mongo = require('mongodb');
const mm = require('@apostrophecms-pro/mongodb-multiplexer');

// Domain name configuration is in domains.js
const domains = require('./domains.js');

const dashboardHostnames = Object.values(domains).map(domain => `dashboard.${domain}`.replace(/:\d+$/, ''));

go().then(function (result) {
  // There is no top level await so we catch this here.
  // At this point either the task is running or the site is up.
  // A task will exit on its own.
}).catch(function (err) {
  console.error(err);
  process.exit(1);
});

async function go() {
  if (process.env.MONGODB_MULTIPLEXER) {
    const realClient = await mongo.MongoClient.connect('mongodb://localhost:27017', {
      useUnifiedTopology: true
    });
    const realDb = realClient.db('mm-test');
    client = mm({
      db: realDb
    });
  }
  await require('@apostrophecms-pro/multisite')({
    // Default port, for dev
    port: 3000,
    // Change this to a hardcoded string when forking to make a new project.
    // Just set it to a string which should never change. Ideally should match
    // your repo name followed by a -, however if you plan to use a
    // cheap Atlas cluster (below M10), you must use a unique prefix less
    // than 12 characters (before the -).
    shortNamePrefix: process.env.APOS_PREFIX || 'a3ab-',
    // For development. An environment variable overrides this in staging/production
    mongodbUrl: 'mongodb://localhost:27017',
    sessionSecret: 'CHANGEME',
    sites: require('./sites/index.js'),
    dashboard: require('./dashboard/index.js'),
    dashboardHostname: dashboardHostnames,
    client
  });
}
