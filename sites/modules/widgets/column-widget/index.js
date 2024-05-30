/**
 * Widget configuration that is shared for all columns
 */
const widgets = {
  '@apostrophecms/rich-text': {},
  '@apostrophecms/image': { className: 'image-widget' },
  '@apostrophecms/video': {},
  link: {},
  card: {},
  accordion: {}
};

module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Columns',
    alias: 'columnsWidget',
    icon: 'view-column-icon'
  },
  fields: {
    add: {
      layout: {
        type: 'select',
        label: 'Column Layout',
        required: true,
        choices: [
          {
            label: '1 column, 100%',
            value: '100'
          },
          {
            label: '2 columns, 50%',
            value: '50'
          },
          {
            label: '2 columns, 66% / 33%',
            value: '66-33'
          },
          {
            label: '2 columns, 75% / 25%',
            value: '75-25'
          },
          {
            label: '2 columns, 33% / 66%',
            value: '33-66'
          },
          {
            label: '2 columns, 25% / 75%',
            value: '25-75'
          },
          {
            label: '3 columns, 33.3%',
            value: '33'
          },
          {
            label: '4 columns, 25%',
            value: '25'
          }
        ],
        def: '100'
      },
      column1: {
        label: 'Column One',
        type: 'area',
        contextual: true,
        options: {
          widgets: {
            ...widgets,
            slideshow: {
              swiper: {
                /**
                 * Override the default Swiper configuration by setting any of the
                 * available Swiper parameters here. Pagination and Navigation are
                 * enabled by default.
                 * https://swiperjs.com/swiper-api#parameters
                 */
                allowTouchMove: false
              }
            }
          }
        },
        if: {
          $or: [
            { layout: '100' },
            { layout: '50' },
            { layout: '25-75' },
            { layout: '33-66' },
            { layout: '75-25' },
            { layout: '66-33' },
            { layout: '33' },
            { layout: '25' }
          ]
        }
      },
      column2: {
        label: 'Column Two',
        type: 'area',
        contextual: true,
        options: { widgets },
        if: {
          $or: [
            { layout: '50' },
            { layout: '25-75' },
            { layout: '33-66' },
            { layout: '75-25' },
            { layout: '66-33' },
            { layout: '33' },
            { layout: '25' }
          ]
        }
      },
      column3: {
        label: 'Column Three',
        type: 'area',
        contextual: true,
        options: { widgets },
        if: {
          $or: [
            { layout: '33' },
            { layout: '25' }
          ]
        }
      },
      column4: {
        label: 'Column Four',
        type: 'area',
        contextual: true,
        options: { widgets },
        if: {
          $or: [
            { layout: '25' }
          ]
        }
      },
      backgroundColor: {
        type: 'color',
        label: 'Background Color'
      }
    }
  },
  helpers(self) {
    return {
      /**
       * A helper to get the number of columns the editor has selected
       * Used in the template to generate the columns and areas
       */
      getColumns(layout) {

        const columns = {
          1: [ '100' ],
          2: [ '50', '66-33', '75-25', '33-66', '25-75' ],
          3: [ '33' ],
          4: [ '25' ]
        };

        let number = 1;
        for (const key in columns) {
          if (columns[key].includes(layout)) {
            number = key;
          }
        }
        return parseInt(number);
      }
    };
  }
};
