const config = {
  schema: [
    {
      name: 'footerBgColor',
      label: 'Background Color',
      type: 'color',
      selector: '.c-footer',
      property: 'background-color'
    },
    {
      name: 'footerTextColor',
      label: 'Text Color',
      type: 'color',
      selector: '.c-footer',
      property: 'color'
    },
    {
      name: 'footerAccentColor',
      label: 'Accent Color',
      type: 'color',
      selector: '.c-footer__accent',
      property: 'color'
    },
    {
      name: 'footerBubbleColor',
      label: 'Icon Bubble Color',
      type: 'color',
      selector: '.c-footer__icon-wrapper',
      property: 'background-color'
    }
  ]
};

config.arrangement = {
  name: 'footer',
  label: 'Footer Settings',
  fields: config.schema.map(field => {
    return field.name;
  })
};

module.exports = config;
