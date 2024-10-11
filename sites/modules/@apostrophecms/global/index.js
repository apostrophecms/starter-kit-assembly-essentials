import link from '../../../lib/schema/link.js';

const {
  linkText, linkType, linkUrl, _linkFile, _linkPage, linkTarget
} = link;

export default {
  fields: {
    add: {
      logo: {
        type: 'area',
        label: 'Logo',
        options: {
          widgets: {
            '@apostrophecms/image': {}
          },
          max: 1
        }
      },
      headerLinks: {
        type: 'array',
        label: 'Navigation',
        titleField: 'linkText',
        fields: {
          add: {
            linkText,
            linkType,
            linkUrl,
            _linkFile,
            _linkPage,
            linkTarget
          }
        }
      }
    },
    group: {
      navigation: {
        label: 'Site Header',
        fields: [ 'logo', 'headerLinks' ]
      }
    }
  }
};
