module.exports = {
  fields: {
    add: {
      main: {
        type: 'area',
        label: 'Main',
        options: {
          widgets: require('@apostrophecms-pro/basics/lib/widgets').widgets
        }
      }
    }
  }
};
