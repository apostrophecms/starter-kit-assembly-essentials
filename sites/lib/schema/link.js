/**
 * A shared schema field configuration for Links.
 * You can use as is in a schema definition or
 * destructure when requiring to use only the fields you want
 */

module.exports = {
  linkText: {
    label: 'Link Text',
    type: 'string',
    required: true
  },
  linkType: {
    label: 'Link Type',
    type: 'select',
    required: true,
    choices: [
      {
        label: 'Page',
        value: 'page'
      },
      {
        label: 'File',
        value: 'file'
      },
      {
        label: 'Custom URL',
        value: 'custom'
      }
    ]
  },
  _linkPage: {
    label: 'Page to link',
    type: 'relationship',
    withType: '@apostrophecms/page',
    max: 1,
    builders: {
      project: {
        title: 1,
        _url: 1
      }
    },
    if: {
      linkType: 'page'
    },
    required: true
  },
  _linkFile: {
    label: 'File to link',
    type: 'relationship',
    withType: '@apostrophecms/file',
    max: 1,
    if: {
      linkType: 'file'
    },
    required: true
  },
  linkUrl: {
    label: 'URL for custom link',
    type: 'url',
    if: {
      linkType: 'custom'
    },
    required: true
  },
  linkTarget: {
    label: 'Will the link open a new browser tab?',
    type: 'checkboxes',
    choices: [
      {
        label: 'Open in new tab',
        value: '_blank'
      }
    ]
  },
  linkStyle: {
    label: 'Link Style',
    type: 'select',
    choices: [
      {
        label: 'Button',
        value: 'button'
      },
      {
        label: 'Inline',
        value: 'inline'
      }
    ],
    def: 'button'
  },
  linkVariant: {
    label: 'Link Color',
    type: 'select',
    choices: [
      {
        label: 'Primary Color',
        value: 'primary'
      },
      {
        label: 'Secondary Color',
        value: 'secondary'
      },
      {
        label: 'Accent Color',
        value: 'accent'
      }
    ],
    def: 'primary'
  }
};
