module.exports = {
  // The webpack build pushes assets to this module in production.
  // It is also not a bad place to add theme specific
  // variations on helpers; since the active theme
  // is aliased as `apos.theme` these can be called easily
  options: {
    alias: 'theme',
    // Silence startup warning since this is just an empty
    // starting point for your own work
    ignoreNoCodeWarning: true
  }
};
