module.exports = {
  // Suggested groupings to avoid a cluttered admin bar
  addGroups: [
    {
      label: 'Admin',
      items: [
        'apostrophe-users',
        'apostrophe-redirects',
        'apostrophe-tags'
      ]
    },
    {
      label: 'Media',
      items: [
        'apostrophe-images',
        'apostrophe-files'
      ]
    },
    {
      label: 'Content',
      items: [
        'apostrophe-pages'
      ]
    }
  ]
};
