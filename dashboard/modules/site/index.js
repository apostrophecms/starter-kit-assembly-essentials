const fs = require('fs');
const fetch = require('node-fetch');

const themes = require('../../../../themes.js');

module.exports = {
  baseUrlDomains: require('../../../../domains.js'),
  addFields: [
    {
      name: 'logo',
      label: 'Logo',
      type: 'singleton',
      widgetType: 'apostrophe-images',
      options: {
        aspectRatio: [ 1, 1 ],
        minSize: [ 500, 500 ],
        limit: [ 1 ]
      }
    },
    {
      name: 'theme',
      type: 'select',
      label: 'Theme',
      choices: themes
    },
    {
      name: 'locales',
      type: 'array',
      label: 'Locales',
      help: 'For internationalization. Leave empty for monolingual sites.',
      titleField: 'label',
      schema: [
        {
          type: 'string',
          name: 'name',
          label: 'Locale Name',
          required: true,
          help: '(examples: en, en-us, es, fr, etc. DO NOT CHANGE A LOCALE NAME once it has content.'
        },
        {
          type: 'string',
          name: 'label',
          label: 'Locale Label',
          required: true,
          help: '(example: US English. May be shown to end users)'
        }
      ]
    }    
  ],
  removeFields: ['tags'],
  arrangeFields: [
    {
      name: 'basics',
      label: 'Basics',
      first: true,
      fields: [
        'title',
        'theme',
        'logo',
        'published',
        'slug'
      ]
    },
    {
      name: 'urls',
      label: 'URLs',
      fields: [
        'shortName',
        'prodHostname',
        'redirect',
        'canonicalize',
        'canonicalizeStatus'
      ]
    },
    {
      name: 'localization',
      label: 'Localization',
      fields: [
        'locales'
      ]
    }
  ],
  construct: function (self, options) {
    
    self.addTask('list-themes', 'List the theme shortnames. Used by the cloud asset generation system.', (apos, argv, callback) => {
      console.log(themes.map(theme => theme.value).join('\n'));
      return callback(null);
    });

    const superAfterSave = self.afterSave;
    self.afterSave = function (req, piece, options, callback) {
      return superAfterSave(req, piece, options, async function (err) {
        if (err) {
          return callback(err);
        }
        try {
          // Use the platform balancer API to immediately get a certificate for
          // the new site, so it can be accessed right away after creation.
          //
          // Sites created on a worker will be temporary and the worker won't
          // have the PB API key, so just make sure we have it first.
          if (process.env.ENV && (process.env.ENV !== 'dev') && self.apos.baseUrl && fs.existsSync('/opt/cloud/platform-balancer-api-key')) {
            const refreshUrl = self.apos.baseUrl + '/platform-balancer/refresh';
            const response = await fetch(refreshUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                // Since this key is visible to the Apostrophe application code in production,
                // it is only capable of one thing: asking nicely that certificates be
                // generated, if it's time and they are needed, for sites
                // that are already in the system. Thus not a security risk
                key: fs.readFileSync('/opt/cloud/platform-balancer-api-key', 'utf8').trim()
              })
            });
            // Not actually interested but we want to know the request was really completed
            await response.text();
          }
          return callback(null);
        } catch (err) {
          return callback(err);
        }
      });
    }
  }
}
