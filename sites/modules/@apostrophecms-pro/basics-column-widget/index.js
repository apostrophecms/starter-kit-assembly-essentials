const richText = require('@apostrophecms-pro/basics/lib/rich-text');

module.exports = {
  options: {
    class: 'o-container',
    widgets: {
      '@apostrophecms/rich-text': {
        styles: richText.styles,
        toolbar: richText.toolbars.BASE
      },
      '@apostrophecms-pro/basics-slideshow': {},
      '@apostrophecms-pro/basics-button': {},
      '@apostrophecms-pro/basics-card': {},
      '@apostrophecms-pro/basics-hero': {},
      '@apostrophecms/image': {},
      '@apostrophecms/video': {},
      '@apostrophecms/html': {}
    }
  }
};
