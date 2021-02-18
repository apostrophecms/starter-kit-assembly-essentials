const richText = require('@apostrophecms-pro/basics/lib/rich-text');

module.exports = {
  extend: '@apostrophecms/page-type',
  fields: {
    add: {
      main: {
        type: 'area',
        label: 'Main',
        options: {
          widgets: {
            '@apostrophecms-pro/basics-column': {
              widgets: {
                '@apostrophecms/rich-text': {
                  styles: richText.styles,
                  toolbar: richText.toolbars.BASE
                },
                '@apostrophecms-pro/basics-image': {},
                '@apostrophecms-pro/basics-button': {},
                '@apostrophecms-pro/basics-card': {},
                '@apostrophecms-pro/basics-hero': {},
                '@apostrophecms/video': {},
                '@apostrophecms/html': {}
              }
            }
          }
        }
      }
    }
  }
};
