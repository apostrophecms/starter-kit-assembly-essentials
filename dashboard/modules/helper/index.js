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
  alias: 'helpers',
  extend: 'apostrophe-module',
  baseTextStyles: baseTextStyles,
  baseTextToolbar: baseTextToolbar,
  construct: function (self, options) {
    self.addHelpers({
      baseTextStyles: baseTextStyles,
      baseTextToolbar: baseTextToolbar,
      widgets: widgets
    });
  }
};
