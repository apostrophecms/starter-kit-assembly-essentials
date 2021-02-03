module.exports = {
  seoGoogleFields: true,
  addFields: [
    {
      name: 'loginBackgrounds',
      label: 'Login Backgrounds',
      type: 'array',
      titleField: 'caption',
      schema: [
        {
          type: 'string',
          name: 'caption',
          label: 'Caption'
        },
        {
          name: 'image',
          label: 'Image',
          type: 'singleton',
          widgetType: 'apostrophe-images',
          options: {
            minSize: [ 1000, 300 ],
            limit: [ 1 ]
          }
        }
      ]
    }
  ]
};
