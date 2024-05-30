const {
  linkText, linkType, linkUrl, _linkFile, _linkPage, linkStyle, linkVariant
} = require('../../../lib/schema/link');

module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Card',
    icon: 'sign-text-icon'
  },
  fields: {
    add: {
      clickable: {
        type: 'boolean',
        label: 'Clickable',
        help: 'Should clicking on this Card take the user somewhere?',
        def: true
      },
      _image: {
        type: 'relationship',
        label: 'Card Image',
        withType: '@apostrophecms/image',
        max: 1
      },
      text: {
        type: 'area',
        label: 'Card Text',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [
                'styles',
                '|',
                'bold',
                'italic',
                'strike',
                '|',
                'alignLeft',
                'alignCenter',
                'alignRight',
                'bulletList',
                'orderedList',
                '|',
                'colorButton'
              ]
            }
          },
          max: 1
        }
      },
      actions: {
        type: 'array',
        label: 'Card Actions',
        titleField: 'linkText',
        fields: {
          add: {
            linkText,
            linkType,
            linkUrl,
            _linkFile,
            _linkPage,
            linkStyle,
            linkVariant
          }
        },
        if: {
          clickable: false
        }
      },
      linkType: {
        ...linkType,
        if: {
          clickable: true
        }
      },
      linkUrl,
      _linkFile,
      _linkPage
    }
  }
};
