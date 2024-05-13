# Apostrophe Assembly Boilerplate

<!-- TOC is auto generated via VSCode extensions https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one.
Having it installed in your VSCode will ensure that adding/changing heading will be auto-populated here. -->
- [Apostrophe Assembly Boilerplate](#apostrophe-assembly-boilerplate)
  - [Purpose](#purpose)
    - [**We recommend installing this project by forking it to your own GitHub account and then cloning it locally. The Apostrophe CLI is not currently intended for multisite projects**](#we-recommend-installing-this-project-by-forking-it-to-your-own-github-account-and-then-cloning-it-locally-the-apostrophe-cli-is-not-currently-intended-for-multisite-projects)
  - [First Steps: required before startup](#first-steps-required-before-startup)
    - [Setting your shortname prefix](#setting-your-shortname-prefix)
    - [Configuring your domains](#configuring-your-domains)
    - [Adding a suffix to your subdomains (optional)](#adding-a-suffix-to-your-subdomains-optional)
    - [Changing the locale separator of your subdomains (optional)](#changing-the-locale-separator-of-your-subdomains-optional)
    - [Setting your Dashboard shortname (optional)](#setting-your-dashboard-shortname-optional)
    - [Disabled File Key](#disabled-file-key)
    - [Session Secret](#session-secret)
  - [Requirements For Development On Your Computer](#requirements-for-development-on-your-computer)
    - [Operating System: Mac, Linux, or Virtual Linux](#operating-system-mac-linux-or-virtual-linux)
    - [Software Installation Requirements](#software-installation-requirements)
    - [`/etc/hosts` File Configuration Requirements](#etchosts-file-configuration-requirements)
  - [Starting Up In Development](#starting-up-in-development)
  - [Scheduling tasks with Apostrophe Assembly hosting](#scheduling-tasks-with-apostrophe-assembly-hosting)
  - [Site Development](#site-development)
    - [Where Does My Apostrophe Project Code Go?](#where-does-my-apostrophe-project-code-go)
    - [Themes](#themes)
      - [Adding a New Theme](#adding-a-new-theme)
      - [Custom Module Configuration for Themes](#custom-module-configuration-for-themes)
      - [Modern Frontend Assets Without A Custom Build Process](#modern-frontend-assets-without-a-custom-build-process)
      - [Frontend Assets With Your Own Build Process](#frontend-assets-with-your-own-build-process)
      - [Developing For IE11](#developing-for-ie11)
      - [Serving Static Files: Fonts and Static Images](#serving-static-files-fonts-and-static-images)
    - [Palette Configuration](#palette-configuration)
  - [Dashboard Development](#dashboard-development)
    - [Allowing dashboard admins to pass configuration to sites](#allowing-dashboard-admins-to-pass-configuration-to-sites)
  - [Accessing the MongoDB utilities for a specific site](#accessing-the-mongodb-utilities-for-a-specific-site)
  - [Hosting](#hosting)
  - [Deployment](#deployment)
  - [Profiling with OpenTelemetry](#profiling-with-opentelemetry)
  - [Self-hosting and the sample Dockerfile](#self-hosting-and-the-sample-dockerfile)
  - [Localized domain names](#localized-domain-names)
  - [Private locales](#private-locales)


## Purpose

The purpose of this repo is to serve as a quick start boilerplate for multisite-enabled, cloud-hosted projects based on and hosted via Apostrophe Assembly. Technically speaking, it serves as a working example of a project built on the `@apostrophecms-pro/multisite` module.

This boilerplate project includes:

* An example of project-level code for your customer-facing sites.
* An example of project-level code for the dashboard site that manages the rest.
* An example of project-level frontend asset generation via a modern webpack build.
* Best practices for easy hostname configuration in dev, staging and prod environments.
* Support for multiple themes.

### **We recommend installing this project by forking it to your own GitHub account and then cloning it locally. The Apostrophe CLI is not currently intended for multisite projects**

## First Steps: required before startup

### Setting your shortname prefix

Before you do anything else, set the fallback value for the `shortnamePrefix` option in `app.js` to a unique string for your project, replacing `a3ab-`. This should match your repo name followed by a `-` character. This should be distinct from any other Assembly projects you have, to ensure their MongoDB databases do not conflict in a dev environment.

> MongoDB Atlas note: if you are self-hosting and you plan to use a low-end MongoDB Atlas cluster (below M10), you must use a unique prefix less than 12 characters (before the `-`), even if your repo name is longer. This is not an issue with hosting provided by the Apostrophe Assembly team.

### Configuring your domains

After cloning this project, be sure to edit the `domains.js` file in the root of the project and change the list to match your real project's dev, staging and production domains.

If you are doing local development on your own computer, leave the `dev` domain set to `localhost:3000`. For staging and production, the Apostrophe Assembly team will typically preconfigure this for you and you won't need to worry about DNS or certificates.

If you are rolling your own hosting, the recommended approach is to create a DNS "wildcard" `A` record for a subdomain of your actual domain name, like `*.staging.example.com`, and configure `staging.example.com` as the `staging` value in `domains.js`. You'll also need a wildcard SSL certificate for each of staging and production.

You will later be able to set a "shortname" for each site and it will automatically work as a subdomain of all three domains. This saves a lot of configuration effort.

> In the case of production, you will of course also be able to add a final production domain name for *each* site via the user interface. But you will need a "pre-production" hostname for early content creation. That is where `baseUrlDomains` comes into play even for production.
>
> You are not restricted to the environment names `dev`, `staging` and `prod`. However, the first environment configured is assumed to be a local debugging environment for programmers (typically `dev`), and the environment named `prod` is the only one that attempts to serve a site under its `prodHostname`. If you are working with the Apostrophe Assembly team for hosting, ask us for an additional cloud instance for each environment.

### Adding a suffix to your subdomains (optional)

The `shortNameSuffix` configuration option, which defaults to an empty string, allows you to add additional suffix string to every site short name. For example, for a site with short name `cars` and the following configuration:
```js
multisite({
  // ...
  shortNameSuffix: '-assembly',
});
```
The resulting base URL for this site will be `http://cars-assembly.localhost:3000`, `https://cars-assembly.staging.your-domain.com`, etc.

These options apply only when the hostname is determined in part by the `shortName` field for the site, so if a production hostname is configured, it will be used exactly as given.

> Note that your dashboard will also be affected, the base URL would become `https://dashboard-assembly.staging.your-domain.com`

> **Note:** This option is not currently supported by Apostrophe Assembly Hosting, as we apply the naming convention for you when hosting for you. It's there for self-hosted customers with different needs.

### Changing the locale separator of your subdomains (optional)

The `localeSeparator` configuration option, which defaults to `.`, allows you to change how the subdomains for localized sites (if chosen so) will be built. By default a dot separator will be used. For example, if "Separate Host" is enabled for a particular locale, `fr.cars.your-domain.com` will be the URL of a site with the short name `cars` and the `fr` locale.
If you apply the following configuration:
```js
multisite({
  // ...
  localeSeparator: '-',
});
```
The hostname above will become `fr-cars.your-domain.com`.

This option applies only when the hostname is determined in part by the `shortName` field for the site, so if a production hostname is configured for the locale it will be used exactly as given.

> **Note:** Your configuration won't be applied immediately on the existing sites. You need to update ("touch") your site records in order to apply the changes. You can do that for all existing sites via the CLI command `node app site:touch --site=dashboard`. If you do not have the `touch` task, update the apostrophe module to the latest 3.x version.

> **Note:** This option is not currently supported by Apostrophe Assembly Hosting, as we apply the naming convention for you when hosting for you. It's there for self-hosted customers with different needs.

### Setting your Dashboard shortname (optional)

By default, your dashboard will be available on a `dashboard` subdomain - `http://dashboard.localhost:3000`, `https://dashboard.staging.your-domain.com`, etc. You can change that with the configuration option `dashboardShortName` in your `app.js`. For example:
```js
multisite({
  // ...
  dashboardShortName: 'admin',
});
```
With the setting above, the Dashboard application will be available at `http://admin.localhost:3000`, `https://admin.staging.your-domain.com`, etc.

Note that if `shortNameSuffix` is also set, the two options are combined to arrive at the complete dashboard subdomain.

> **Note:** This option is not currently supported by Apostrophe Assembly Hosting. Contact us if this is a concern for your project.

### Disabled File Key

In `sites/index.js`, locate `disabledFileKey` and change `CHANGEME` to a random string of your choosing. This is used when disabling access to files in the local backend.

### Session Secret

In `sites/index.js`, locate `secret` and change `CHANGEME` to a random string of your choosing. This is used for login session encryption.

## Requirements For Development On Your Computer

### Operating System: Mac, Linux, or Virtual Linux

**Your local development environment must be either MacOS or Linux.** If your development computer runs Windows, we recommend development on Ubuntu Linux in a full virtual Linux machine, via [VirtualBox](https://www.virtualbox.org/).

Another option is to use the Windows Subsystem for Linux, which is also an Ubuntu Linux-based environment. However this option has not been extensively tested with Assembly.

### Software Installation Requirements

To test-drive the project in development, make sure you have Apostrophe's usual dependencies on your local machine:

* MongoDB (4.4.x or better)
* NodeJS (14.x or better, latest long term support release recommended)
* Imagemagick (for fast, high-quality image rendering)

For more information see the Apostrophe [Getting Started Tutorial](https://docs.apostrophecms.org/getting-started/setting-up-your-environment.html).

### `/etc/hosts` File Configuration Requirements

Because this project serves multiple websites, certain hostnames must point directly to your own computer for local testing.

**If you will only be testing in Chrome at first,** you do not have to edit your hosts file right away. That's because in Chrome, all subdomains of `localhost` resolve to your own computer.

However in other browsers this is not true and you must add the following lines to `/etc/hosts` before proceeding:

```
127.0.0.1 dashboard.localhost company1.localhost
```

**You will need a subdomain for each test site you plan to add to the multisite platform.** See the example below, where a site called `company` is added to the platform via the dashboard. You can always add more of these entries later.

## Starting Up In Development

First, clone the boilerplate project and push it up to your own git repository for ongoing work.

Then type:

```
npm install
```

After installation, add an admin user to the dashboard site, which manages all other sites:

```
node app @apostrophecms/user:add admin admin --site=dashboard
```

Enter a password when prompted.

> When running command line tasks in a multisite environment you must always specify which site you are referring to. For the dashboard, use `--site=dashboard`. For other sites, you can use any of their valid hostnames, or `--all-sites` which runs the task on every site except the dashboard.

Next launch the multisite application:

```
npm run dev
```

When ready, visit:

```
http://dashboard.localhost:3000/login
```

> If you are on a Mac this will work without extra configuration. If you are on Linux you may need to edit `/etc/hosts` and add an entry for `dashboard.localhost`, pointing to 127.0.0.1 just like plain `localhost` does. You'll do this for each site you test locally.

You can now log into the admin account and view the basic dashboard.

To create a site, access "Sites" on the admin bar and add a new site. Notice that sites are Apostrophe "pieces" in the dashboard.

Be sure to give your first site a "shortname" which is distinct from other sites, like `company1`. Also fill out the admin password field for the site.

After you successfully save the site, you can access:

```
http://company1.localhost:3000/login
```

And log in with the admin account you created for the site. Then make some simple edits to the homepage.

Now try creating `company2` and `company3`. Notice that while the code is the same, the databases and content are separate.

> If you access these sites while logged out, you won't see your content edits unless you have used the "Commit" button to make them live.

## Scheduling tasks with Apostrophe Assembly hosting

To schedule tasks much like you would with `cron` in a single-server environment, add a new `tasks` option to `app.js` when configuring `@apostrophecms/multisite`. This option is top-level, it's a peer of the `sites` and `dashboard` options.

```javascript
tasks: {
  // These tasks are run for all sites, i.e. like the `--all-sites` option
  'all-sites': {
    hourly: [
      // Run this task hourly but only on the server that
      // happens to grab the lock first
      'products:sync'
    ],
    daily: [ ... also supported, same syntax ]
  },
  // These tasks are run for the dashboard site, i.e. like `--site=dashboard`
  dashboard: {
    hourly: [
      'some-module-name:some-task-name'
    ],
    daily: [ ... also supported, same syntax ]
  }
}
```

Note that the individual tasks are configured as strings. These strings start with the Apostrophe task name, like `product:sync`, and can optionally also include additional parameters to the task exactly as they would if you invoked it directly at the command line. You should **not** include `node app` in these strings.

Then, to test your hourly tasks in a local environment:

```javascript
node app tasks --frequency=daily
```

> ⚠️ VERY IMPORTANT NOTE: this will intentionally **not** run the job more than once in an hour, even if you try to test it twice in an hour. That's normal. This is a guard so that tasks scheduled on more than one of our workers actually run just once as intended.

If you need to skip that check for testing purposes, you can clear the `aposTaskLog` mongodb collection in your dashboard database. If your `shortName` is `companyname`, then your dashboard database name is `companyname-dashboard`.

## Site Development

Right now we have a bare-bones example. Let's look at where to put our code to customize the experience.

### Where Does My Apostrophe Project Code Go?

> If you are not already familiar with single-site Apostrophe development, we strongly recommend that you [read the A3 ApostropheCMS documentation](https://a3.docs.apostrophecms.org/) as a starting point.

In a typical single-site Apostrophe project, modules are configured in `app.js`. In a multisite project, you'll find that `app.js` is instead reserved for top-level configuration that applies to all sites.

The code you're used to seeing in `app.js` can instead be found in `sites/index.js`. And, the code you're used to seeing in `modules` can be found in `sites/modules`.

In all other respects, development is just like normal ApostropheCMS single-site development. Feel free to add page templates and modules. You can `npm install` modules like `@apostrophecms/blog` and configure them in a normal way; just do it in `sites/index.js` rather than `app.js`.

If you have already started a single-site project, you can move your modules directly from `modules` to `sites/modules`, and move the `modules` section of your `app.js` file to the corresponding section of `sites/index.js`. However take note of the existing settings we provide and merge accordingly.

> **If you are hosting your project with us, or using tools provided by us, you should remove any legacy app.js or module code that configures UploadFS cloud storage or mongodb database hosts.** Such settings are handled automatically and the configuration is set behind the scenes by `@apostrophecms-pro/multisite` and the provided logic in the boilerplate project.

### Themes

Apostrophe Assembly and the multisite module are designed to accommodate hundreds of websites, or more, running on a single codebase. But, you may need some differences in appearance and behavior that go beyond what the palette editor can provide. For that you can create multiple themes. Each site is set via the dashboard UI to use a single theme and will typically stay with that theme throughout its lifetime.

You might not need more than one theme. If that's the case, just build out the `default` theme to suit your needs, and remove the `demo` theme from `themes.js`. You can also remove the `sites/modules/theme-demo` module and `sites/lib/theme-demo.js`.

#### Adding a New Theme

To configure your list of themes, edit `themes.js`. Right now it looks like:

```javascript
module.exports = [
  {
    value: 'default',
    label: 'Default'
  },
  {
    value: 'demo',
    label: 'Demo'
  }
];
```

You can add additional themes as needed. Your `value` should be a shortname like `default` or `arts`. The `value` must not be changed later.

#### Custom Module Configuration for Themes

If your theme is named `default`, then you must have a `sites/lib/theme-default.js` file, like this:

```javascript
module.exports = function(site, config) {
  config.modules = {
    ...config.modules,
    'theme-default': {}
  };
};
```

The `config` object already contains what was configured in `sites/index.js`. Here we can modify the configuration by adding extra modules only for this theme, or changing the configuration of a module specifically for this theme.

In this case we add one custom module, `theme-default`,  when the default theme is active. **It is a best practice to push your theme's frontend assets to Apostrophe in a module like this,** named after the theme. If your themes share any assets, then they should be imported into the appropriate `.js` or `.scss` master file by each theme.

#### Modern Frontend Assets Without A Custom Build Process

Beginning with the 1.1.0 release of `a3-assembly-boilerplate`, there is no need for Webpack for simpler cases. Specifically, you can follow our documentation and place your modern JavaScript code in the `ui/src/index.js` file of any module, or use `import` statements in that file to import it there. As noted in our documentation, it is **important for `ui/src/index.js` to export a function as its default export.** This function will be invoked to initialize your module at a safe time when `apos.http`, `apos.util`, etc. are already available.

You may also place Sass SCSS code in the `ui/src/index.scss` file of any module, and use `import` statements in that file to bring in more Sass SCSS code.

To include theme-specific code, place it in the `ui/src/index.scss` or `ui/src/index.js` file of the appropriate theme module. The provided example theme modules are `theme-default` and `theme-alternate`.

For example:
- The default theme's SASS stylesheet entrypoint is located at `sites/modules/theme-default/ui/src/index.scss`
- The default theme's JavaScript browser-side entry point is located at: `sites/modules/theme-default/ui/src/index.js`

#### Frontend Assets With Your Own Build Process

Beginning with the 1.1.0 release of `a3-assembly-boilerplate`, a sample webpack build is not included as standard equipment, as `ui/src` suffices for most needs. However, if you need to use webpack or another custom build process, the solution is to configure the output of your build process to be a `ui/public/something.js` file in any module in your Apostrophe project. As above you can create a build that is included in only one theme by writing its output to the `ui/src` subdirectory of that theme module.

#### Developing For IE11

With Microsoft ending Internet Explorer 11 support in 2022, we no longer enable IE11 support by default. However you can enable IE11 support by setting the `es5: true` option to the `@apostrophecms/asset` module. This will create a compatibility build of your `ui/src` JavaScript. Please note that editing is never supported in IE11. See the Apostrophe documentation for more information.

#### Serving Static Files: Fonts and Static Images

If you need to serve static files, you can do this much as you would in standalone A3 development.

The folder `sites/public` maps to `/` in the URL space of a site. For instance, `sites/public/fonts/myfile.ttf` maps to `/fonts/myfile.ttf`. For assets like favicons and fonts, you can add `link` tags to the `extraHead` block already present in `sites/modules/@apostrophecms/template/views/outerLayout.html`.

### Palette Configuration

The palette allows styles to be edited visually on the site. It is configured in `sites/modules/@apostrophecms-pro/palette/index.js`. There you can specify the selectors, CSS properties, and field types to be used to manipulate color, font size, font family and other aspects of the site as a whole.

For complete information and a sample configuration, see the [@apostrophecms-pro/palette module documentation](https://npmjs.org/package/@apostrophecms-pro/palette). *You will need to be logged into an npm account that has been granted access, such as the one you used to npm install this project.*

> Note that like all other changes, palette changes do not take place for logged-out users until the user clicks "Publish."

## Dashboard Development

**The dashboard site has one job: managing the other sites.** As such you don't need to worry about making this site a pretty experience for the general public, because they won't have access to it. However you may want to dress up this experience and add extra functionality for your own customer admin team (the people who add and remove sites from the platform).

This starter kit has the `@apostrophecms-pro/multisite-dashboard` extension installed. This converts the dashboard from sites being presented as individual cards to a scrollable list. Each site now has a link for login to the site, as well as navigation to the home-page. This extension also creates a search box that makes finding sites easier. Finally, this extension also adds a template tab to the site creation modal. When creating or editing a site you can select to make it a template by clicking on "Template" control in the "Basics" tab. This will still be an active site, but it will be moved to the template tab. Sites in the template tab can be duplicated by selection that option in the context menu to the far right.

The dashboard site can be extended much like the regular sites. Dashboard development is very similar to regular site development, except that modules live in `dashboard/modules`, what normally resides in `app.js` lives in `dashboard/index.js`, and so on.

The most important module is the `site` module. The `site` module is a piece type, with a piece to represent each site that your dashboard admins choose to create.

Also important is the `asset` module, which serves the same function as the theme modules in `site`. You can find the frontend assets in `dashboard/modules/asset/ui/src`.

### Allowing dashboard admins to pass configuration to sites

You can add custom schema fields to `sites` as seen in `dashboard/modules/site/index.js`. Those fields are available on the `site` object passed to `sites/index.js`, and so they can be passed on as part of the configuration of modules.

However, there is one important restriction: you **must not decide to completely enable or disable a module that pushes assets on any basis other than the theme name.** This is because Apostrophe builds only one asset bundle per theme.

**"Should I add a field to the `site` piece in the dashboard, or just add it to `@apostrophecms/global` for sites?"** Good question! Here's a checklist for you:

* **If single-site admins who cannot edit the dashboard should be able to edit it,** you should put it in `sites/modules/@apostrophecms/global`.
* **If only dashboard admins who create and remove sites should be able to make this decision,** it belongs in `dashboard/modules/site/index.js`. You can then pass it on as module configuration in `sites/lib/index.js`.

## Accessing the MongoDB utilities for a specific site

The database name for a site is the prefix, followed by the `_id` of the site piece. However this is awkward to look up on your own, so we have provided utility tasks to access the MongoDB utilities:

```
# Mongo shell for the dashboard site
node app mongo:mongo --site=dashboard
# Mongo shell for an individual site; use its hostname
# in the appropriate environment
node app mongo:mongo --site=test1.localhost
# mongodump
node app mongo:mongodump --site=test1.localhost
# mongorestore, with the --drop option to prevent
# doubled content
node app mongo:mongorestore --site=test1.localhost -- --drop
```

Note the use of `--` by itself as an end marker for the options to Apostrophe, allowing the `--drop` option to be passed on to `mongodump`.

## Hosting

Hosting for staging and production clouds is typically provided by the Apostrophe Assembly team.

Self-hosted arrangements can also be made. For more information contact the Apostrophe Assembly team.

## Deployment

If we are hosting Apostrophe Assembly for you, then you can deploy updates to your staging cloud by pushing to your `staging` git branch, and deploy updates to your production cloud by pushing to your `production` git branch. You will receive notifications in our shared Slack channel, including links to access the deployment progress logs.

Apostrophe will complete asset builds for each theme, as well as running any necessary new database migrations for each site, before switching to the newly deployed version of the code.

## Profiling with OpenTelemetry

ApostropheCMS supports profiling with OpenTelemetry. There is an [article in the documentation](https://v3.docs.apostrophecms.org/cookbook/opentelemetry.html) covering the use of OpenTelemetry in general. Launching Apostrophe Assembly with OpenTelemetry support is slightly different. However for your convenience, `app.js` and `telemetry.js` are already set up appropriately in this project.

To launch in your local development environment with OpenTelemetry logging to Jaeger, first [launch Jaeger according to the instructions in our documentation](https://v3.docs.apostrophecms.org/cookbook/opentelemetry.html). Then start your Apostrophe Assembly project like this:

```
APOS_OPENTELEMETRY=1 npm run dev
```

This provides a great deal of visibility into where the time is going when Apostrophe responds to a request. Note that separate hosts can be distinguished via the `http.host` tag attached to each request in Jaeger.

Using OpenTelemetry in a staging environment provided by the Apostrophe team is possible. This involves modifying the provided `telemetry.js` file to log to a hosted backend such as [New Relic](https://docs.newrelic.com/docs/more-integrations/open-source-telemetry-integrations/opentelemetry/opentelemetry-introduction/) using an appropriate Open Telemetry exporter module. `process.env.ENV` can be used to distinguish between `dev` or no setting (usually local development), `staging` and `prod` when decidig whether to enable an OpenTelemetry backend.

We do not recommend enabling OpenTelemetry in production, at least not permanently, because of the performance impact of the techniques OpenTelemetry uses to obtain the necessary visibility into async calls.

## Self-hosting and the sample Dockerfile

A sample `Dockerfile` is provided with this project and can be used for self-hosting. See also the provided `.dockerignore` file.

Typical `build` and `run` commands look like:

```bash
# build command
docker build -t a3-assembly-boilerplate . \
  --build-arg="NPMRC=//registry.npmjs.org/:_authToken=YOUR_NPM_TOKEN_GOES_HERE" \
  --build-arg="ENV=prod" --build-arg="APOS_PREFIX=YOUR-PREFIX-GOES-HERE-" \
  --build-arg="DASHBOARD_HOSTNAME=dashboard.YOUR-DOMAIN-NAME-GOES-HERE.com" \
  --build-arg="PLATFORM_BALANCER_API_KEY=YOUR-STRING-GOES-HERE" \
  --build-arg="APOS_S3_REGION=YOURS-GOES-HERE" \
  --build-arg="APOS_S3_BUCKET=YOURS-GOES-HERE" \
  --build-arg="APOS_S3_KEY=YOURS-GOES-HERE" \
  --build-arg="APOS_S3_SECRET=YOURS-GOES-HERE"

# run command
docker run -it --env MONGODB_URL=YOUR-MONGODB-ATLAS-URL-GOES-HERE a3-assembly-boilerplate
```

To avoid passing the real MongoDB URL to the build task, currently the provided Dockerfile uses a
temporary instance of `mongod` to satisfy a requirement that it be present for the build task.

An npm token is required to successfully `npm install` the private packages inside the
image during the build.

S3 credentials are passed to the build so that the static assets can be mirrored to S3, however
at a cost in performance this can be avoided by removing `APOS_UPLOADFS_ASSETS=1` from
the `Dockerfile` and removing the references to these environment variables as well. Note
that you will still need S3 credentials in the `run` command, unless you arrange for
`dashboard/public/uploads` and `sites/public/uploads` to be persistent volumes on a
filesystem shared by all instances. This is slow, so we recommend using S3 or configuring
a different [uploadfs backend](https://github.com/apostrophecms/uploadfs) such as
Azure Blob Storage or Google Cloud Storage.

## Localized domain names

It is possible to allow dashboard administrators to define the locales for each site.
To do that, you must set the flag `localizedSites` to true, in the `site` module options.

```javascript
// in dashboard/modules/site/index.js

module.exports = {
  options: {
    baseUrlDomains: {
      local: 'localhost:3000',
      staging: 'staging.com',
      prod: 'production.com'
    },
    localizedSites: true
  }
}
```
`baseUrlDomains` must be defined to allow localized domains.

Once this has been done, you can access new fields in the `locales` tab when editing your site on the dashboard.
You can add as many locales as you want, and for each of them you can give it a name, label, prefix, choose if you want a separate host, and if so, set a separate production hostname.

If the separate host is set to `true`, the locale will be used as a subdomain of the domain name
in addition to the separate production hostname if that field has been filled out and DNS has been configured for it.
There is now also `stagingSubdomain` to allow a free choice of staging subdomain name,
for those who want to test the effects of `separateProductionHostname` being set the same for any group of sites in advance.

Let's say we have a French locale with these options:

| Fields                       | Values               |
|------------------------------|----------------------|
| Label                        | `French`             |
| Prefix                       |                      |
| Separate Host                | `true`               |
| Separate Production Hostname | `my-french-site.com` |


And our site piece `shortName` is set to `site`.

In this case, if the environment variable `ENV` is set to `staging`, we will have `fr.site.staging.com` as the hostname.
If we are in production, so `ENV` is set to `prod`, we will have `fr.site.production.com` and `my-french-site.com` (only in production) as hostnames.

If we set a prefix, such as `/fr`, then only URLs in which the path part begins with `/fr` will display content from that locale. This way some locales can share the same `separateProductionHostname` being differentiated by the prefix.

If `separateHost` is set to `false` and `prefix` is `/fr`, we simply use the latter to differentiate locales: `site.localhost:3000/fr`, `site.staging.com/fr`, `site.production.com/fr`.

Note that you can have only one locale with no prefix _and_ no separate host, that would be the default one.

## Private locales

You can make a locale `private`, meaning that this locale is only visible for logged in users.

There is a new `boolean` field with the label `Private Locale` for each configured locale in your dashboard.

When adding the option `localizedSites` to the `site` module of your project, instead of `true` you can pass an object and specify the option `privateByDefault`.
If this sub-option is set to `true`, every new locale created will have its `private` property set to `true` by default, otherwise they will be public by default.

```javascript
// in dashboard/modules/site/index.js
{
  options: {
    baseUrlDomains: { ... },
    localizedSites: {
      privateByDefault: true
    }
  }
}
````

The `private` option will be editable from the dashboard when editing your site locales.
