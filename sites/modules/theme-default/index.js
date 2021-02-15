module.exports = {
  options: {
    alias: 'theme'
  },
  // The webpack build pushes assets to this module.
  // It is also not a bad place to add theme specific
  // variations on helpers; since the active theme
  // is aliased as `apos.theme` these can be called easily
};
