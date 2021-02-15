const baseTextToolbar = [
  'Styles',
  'Bold', 'Italic', 'Link', 'Unlink',
  'Split', 'NumberedList', 'BulletedList'
];
const baseTextStyles = [
  { name: 'Body', element: 'p' }
];
const widgets = {
  'gallery': {}
};

module.exports = {
  options: {
    alias: 'helpers',
    baseTextStyles: baseTextStyles,
    baseTextToolbar: baseTextToolbar,
  },
  helpers(self, options) {
    return {
      baseTextStyles,
      baseTextToolbar,
      widgets
    };
  }
};
