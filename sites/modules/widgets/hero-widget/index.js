const link = require('../../../lib/schema/link');

module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Hero',
    icon: 'sign-text-icon'
  },
  fields: {
    add: {
      content: {
        type: 'area',
        label: 'Content',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {}
          },
          max: 1
        }
      },
      actions: {
        type: 'array',
        label: 'Actions',
        titleField: 'linkText',
        fields: {
          add: link
        }
      },
      media: {
        type: 'select',
        label: 'Media',
        help: 'Use an image or video for the Hero\'s background',
        choices: [
          {
            label: 'Image',
            value: 'image',
            def: true
          },
          {
            label: 'Video',
            value: 'video'
          }
        ]
      },
      _image: {
        type: 'relationship',
        label: 'Hero Image',
        withType: '@apostrophecms/image',
        if: {
          media: 'image'
        }
      },
      videoUrl: {
        type: 'url',
        label: 'External Video URL',
        help: 'A URL to an externally hosted .mp4',
        if: {
          media: 'video'
        }
      },
      _videoPoster: {
        type: 'relationship',
        label: 'Video Poster',
        help: 'This image will appear as the video is loading',
        withType: '@apostrophecms/image',
        if: {
          background: 'video'
        }
      },
      size: {
        type: 'select',
        label: 'Size',
        choices: [
          {
            label: 'Small',
            value: 'small'
          },
          {
            label: 'Medium',
            value: 'medium',
            def: true
          },
          {
            label: 'Large',
            value: 'large'
          }
        ]
      },
      backgroundColor: {
        type: 'color',
        label: 'Background Color',
        help: 'This option can also be used to set a screen over an image or video by setting the color\'s opacity to a decimal',
        options: {
          format: 'rgb'
        }
      }
    }
  }
};
