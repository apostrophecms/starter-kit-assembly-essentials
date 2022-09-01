const fs = require('fs');
const fetch = require('node-fetch');

const themes = require('../../../themes');

module.exports = {
  options: {
    baseUrlDomains: require('../../../domains.js'),
    localizedSites: true
  },
  fields: {
    add: {
      logo: {
        label: 'Logo',
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/image': {
              aspectRatio: [ 1, 1 ],
              minSize: [ 500, 500 ],
              max: 1
            }
          },
          max: 1
        }
      },
      theme: {
        type: 'select',
        label: 'Theme',
        choices: themes,
        def: themes[0].value,
        required: true
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'title',
          'theme',
          'logo',
          'active',
          'shortName',
          'adminPassword'
        ]
      },
      production: {
        label: 'Production',
        fields: [
          'prodHostname',
          'canonicalize',
          'canonicalizeStatus'
        ]
      }
    }
  },
  tasks(self, options) {
    return {
      'list-themes': {
        usage: 'List the theme shortnames. Used by the cloud asset generation system.',
        async task(argv) {
          console.log(themes.map(theme => theme.value).join('\n'));
        }
      }
    };
  },
  handlers(self, options) {
    return {
      afterSave: {
        async ensureCertificate(req, piece, options) {
          // Use the platform balancer API to immediately get a certificate for
          // the new site, so it can be accessed right away after creation.
          //
          // Sites created on a worker will be temporary and the worker won't
          // have the PB API key, so just make sure we have it first.

          if ((self.apos.options.multisite.activeEnv !== self.apos.options.multisite.debugEnv) && self.apos.baseUrl && fs.existsSync('/opt/cloud/platform-balancer-api-key')) {
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
            if (response.status !== 200) {
              throw await response.text();
            }
          }
        }
      }
    };
  }
};
