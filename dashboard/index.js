module.exports = {
  privateDashboards: true,
  modules: {
    '@apostrophecms/uploadfs': {
      options: {
        uploadfs: process.env.GOOGLE_APPLICATION_CREDENTIALS ? {
          storage: 'gcs',
          // Go to the Google Cloud Console, select your project and select the Storage item on the left side
          // of the screen to find / create your bucket. Put your bucket name here.
          bucket: process.env.GOOGLE_BUCKET,
          // Select your region
          region: process.env.GOOGLE_REGION
        }: {
          disabledFileKey: 'CHANGEME'
        }
      }
    },
    helper: {},
    site: {},
    'site-page': {},
    asset: {}
  }
};
