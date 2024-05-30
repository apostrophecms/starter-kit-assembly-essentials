module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Accordion',
    icon: 'arrow-down-drop-circle'
  },
  icons: {
    'arrow-down-drop-circle': 'ArrowDownDropCircle'
  },
  fields: {
    add: {
      items: {
        type: 'array',
        label: 'Items',
        titleField: 'header',
        fields: {
          add: {
            header: {
              type: 'string',
              label: 'Header'
            },
            content: {
              type: 'area',
              label: 'Content',
              options: {
                widgets: {
                  '@apostrophecms/rich-text': {
                    toolbar: [
                      'bold',
                      'italic',
                      'strike',
                      'link',
                      '|',
                      'bulletList',
                      'orderedList',
                      '|',
                      'colorButton'
                    ]
                  }
                },
                max: 1
              }
            }
          }
        }
      }
    }
  }
};
