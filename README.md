# Apostrophe Starter Kit Assembly Essentials

## Custom CDN Example

Illustrates how to provide a custom CDN URLs for your build assets. 

To run the build, perform an example deployment and start the multisite server in production mode, run the following commands in your terminal:

```bash
npm run build-and-deploy
npm run production-start
```
In a new terminal, run the following command to start the example CDN server:

```bash
npm run cdn-start
```

Open your browser and navigate to `http://localhost:8000`, you should see a simple HTML page outputing "EXAMPLE CDN" on the screen.

Open your browser and navigate to `http://dashboard.localhost:3000/`, you should see the ApostropheCMS dashboard. All assets built by the `build-and-deploy` script are served from the example CDN server, in the Dashboard and all sites. You can ensure that in the browser's developer tools, under the "Network" tab, that the assets are being served from `http://localhost:8000` and not `http://localhost:3000`.

**Details**

- `scripts/build-and-deploy.js` - This script builds the project and deploys it (copy the assets) to the example CDN server provided in the `example-cdn/` folder.
- `example-cdn/` contains a simple express server (`server.js`) that serves the assets from the `./public/` folder. 
- `dashboard/modules/@apostrophecms/asset/index.js` is enhanced with additional configuration and extends to override the base assset URL with the example CDN URL.
- `sites/modules/@apostrophecms/asset/index.js` has similar changes but for the sites.
- `package.json` has new scripts `build-and-deploy` (executes the build and deploy script) and `cdn-start` (starts the example CDN server).
- The `cdn version` part of the URL can be controleld via `CDN_VERSION` environment variable. The default value is `v1`. 

> NOTE: consult the `main` branch of this repository for details about setting up the Apostrophe Assembly Essentials project, adding admin users, etc.

