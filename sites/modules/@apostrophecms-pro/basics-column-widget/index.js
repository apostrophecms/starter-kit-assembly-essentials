const richText = require('@apostrophecms-pro/basics/lib/rich-text');

module.exports = {
  options: {
    // TODO: Update to `className` when available.
    class: 'o-container',
    widgets: {
      '@apostrophecms/rich-text': {
        styles: richText.styles,
        toolbar: richText.toolbars.BASE
      },
      '@apostrophecms-pro/basics-slideshow': {
        class: 'o-widget'
      },
      '@apostrophecms-pro/basics-button': {
        class: 'o-widget'
      },
      '@apostrophecms-pro/basics-card': {
        class: 'o-widget'
      },
      '@apostrophecms-pro/basics-hero': {
        class: 'o-widget'
      },
      '@apostrophecms/image': {},
      '@apostrophecms/video': {},
      '@apostrophecms/html': {}
    }
  }
};
