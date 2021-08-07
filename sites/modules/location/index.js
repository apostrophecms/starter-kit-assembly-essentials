module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    alias: 'location',
    mqKey: '6cnUq9ifi2O36Aq7vJrrfBCUyCfGI4gD'
  },
  fields: {
    add: {
      address: {
        type: 'string',
        label: 'Address',
        help: 'This address will be used to plot the location on a map'
      },
      hoursBrief: {
        type: 'string',
        label: 'Hours (Brief)'
      },
      hoursDay: {
        type: 'array',
        label: 'Hours (By Day)',
        fields: {
          add: {
            day: {
              label: 'Day',
              type: 'string'
            },
            hours: {
              label: 'Hours',
              type: 'string'
            }
          }
        }
      },
      description: {
        type: 'area',
        label: 'Description',
        help: 'A short description',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [ 'bold', 'italic' ]
            }
          }
        }
      },
      content: {
        type: 'area',
        label: 'Content',
        options: {
          widgets: {
            '@apostrophecms-pro/basics-column': {},
            '@apostrophecms-pro/basics-hero': {}
          }
        }
      },
      _banner: {
        label: 'Profile Page Banner',
        type: 'relationship',
        withType: '@apostrophecms/image'
      },
      phone: {
        type: 'string',
        label: 'Phone Number'
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'title',
          'address',
          'phone'
        ]
      },
      details: {
        label: 'Details',
        fields: [
          'hoursDay',
          'hoursBrief',
          '_banner'
        ]
      },
      content: {
        label: 'Content',
        fields: [
          'description',
          'content'
        ]
      }
    }
  },
  components(self) {
    // return {
    //   async recent(req, data) {
    //     return {
    //       articles: await self.find(req).limit(data.limit).sort({ createdAt: -1 }).toArray()
    //     };
    //   }
    // };
  },
  helpers(self, options) {
    return {
      formatMarkers: (pieces) => {
        const markers = [];
        pieces.forEach(location => {
          if (!location.geocoded) {
            return;
          }
          const data = location.geocoded.locations[0];
          const marker = {
            latlng: [ data.latLng.lat, data.latLng.lng ],
            title: location.title
          };
          markers.push(marker);
        });
        return markers;
      }
    };
  },
  handlers (self) {
    return {
      beforeSave: {
        geocodePiece: async function(req, doc, options) {
          const orig = await self.find(req, { _id: doc._id }).toObject();
          if (!orig || orig.address !== doc.address) {
            const response = await self.geocode(doc.address);
            const result = response.results[0];

            // check no results
            if (response.info.statuscode === 400) {
              return self.apos.notify(req, 'Could not geocode location', {
                type: 'danger',
                icon: 'alert-circle-icon',
                dismiss: true
              });
            }

            // satisfied, store it
            doc.geocoded = result;
          }
        }
      }
    };
  },
  init(self) {
    self.geocode = async function(address) {
      try {
        const body = await self.apos.http.get('http://mapquestapi.com/geocoding/v1/address', {
          qs: {
            key: self.options.mqKey,
            location: address,
            maxResults: 1
          }
        });
        return body;
      } catch (error) {
        return self.apos.error(error);
      }
    };
  }
};
