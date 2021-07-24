const richText = require('@apostrophecms-pro/basics/lib/rich-text');
const classes = require('../../../lib/helpers/classes');

module.exports = {
  options: {
    className: classes.CONTAINER,
    widgets: {
      '@apostrophecms/rich-text': {
        styles: richText.STYLES,
        toolbar: richText.toolbars.BASE
      },
      '@apostrophecms-pro/basics-slideshow': {},
      '@apostrophecms-pro/basics-button': {},
      '@apostrophecms-pro/basics-card': {},
      '@apostrophecms/image': {},
      '@apostrophecms/video': {},
      '@apostrophecms/html': {}
    }
  }
};
