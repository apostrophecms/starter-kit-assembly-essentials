module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Slideshow',
    icon: 'image-multiple'
  },
  icons: {
    'image-multiple': 'ImageMultiple'
  },
  fields: {
    add: {
      images: {
        type: 'array',
        titleField: 'caption',
        min: 2,
        fields: {
          add: {
            _image: {
              type: 'relationship',
              label: 'Image',
              max: 1,
              required: true,
              withType: '@apostrophecms/image'
            },
            caption: {
              type: 'string',
              label: 'Caption',
              textarea: true
            }
          }
        }
      }
    }
  }
};
