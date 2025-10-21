// This is a custom layout column widget, 
// to redefine the available widgets within a layout column.
export default {
  fields: {
    add: {
      content: {
        type: 'area',
        options: {
          '@apostrophecms/rich-text': {},
          '@apostrophecms/image': { className: 'image-widget' },
          '@apostrophecms/video': {},
          link: {},
          card: {},
          accordion: {},
          slideshow: {}
        }
      }
    }
  }
};
