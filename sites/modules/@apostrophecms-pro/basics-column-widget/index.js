const richText = require('@apostrophecms-pro/basics/lib/rich-text');

module.exports = {
  options: {
    widgets: {
      '@apostrophecms/rich-text': {
        styles: richText.styles,
        toolbar: richText.toolbars.BASE
      },
      '@apostrophecms-pro/basics-slideshow': {},
      '@apostrophecms-pro/basics-button': {},
      '@apostrophecms-pro/basics-card': {},
      '@apostrophecms-pro/basics-hero': {},
      '@apostrophecms/video': {},
      '@apostrophecms/html': {}
    }
  }
};
