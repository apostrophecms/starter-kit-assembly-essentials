# Apostrophe Assembly Boilerplate

## Purpose

The purpose of this repo is to serve as a quick start boilerplate for multisite-enabled, cloud-hosted projects based on and hosted via Apostrophe Assembly. Tecnically speaking, it serves as a working example of a project built on the `@apostrophecms/multisite` module.

This boilerplate project includes:

* An example of project-level code for your customer-facing sites.
* An example of project-level code for the dashboard site that manages the rest.
* An example of project-level frontend asset generation via a modern webpack build.
* Best practices for easy hostname configuration in dev, staging and prod environments.
* Support for multiple themes.

## Use during alpha and beta phases

This boilerplate is built on alpha releases of A3 modules. To give you some stability during development, the dependencies are pinned to specific alpha releases. When new pre-stable releases are available, as well as when we do make the first 3.0 stable release, you should review the breaking changes before updating and retesting your project. After the stable release of A3, the boilerplate will no longer have pinned dependencies.

## First Steps: required before startup

### Setting your shortname prefix

Before you do anything else, set the `shortnamePrefix` option in `app.js` to a unique string for your project. This should match your repo name followed by a `-` character. This should be distinct from any other Assembly projects you have, to ensure their MongoDB databases do not conflict in a dev environment.

> MongoDB Atlas note: if you are self-hosting and you plan to use a low-end MongoDB Atlas cluster (below M10), you must use a unique prefix less than 12 characters (before the `-`), even if your repo name is longer. This is not an issue with hosting provided by the Apostrophe Assembly team.

### Configuring your domains

After cloning this project, be sure to edit the `domains.js` file in the root of the project and change the list to match your real project's dev, staging and production domains.

If you are doing local development on your own computer, leave the `dev` domain set to `localhost:3000`. For staging and production, the recommended approach is to register a real domain each for staging and production. Then add a DNS "wildcard" `A` record for each pointing to your cloud's elastic Ip address, as provided by your contact at Apostrophe. You'll then work with the Apostrophe Assembly team to complete the hosting configuration.

You will later be able to set a "shortname" for each site and it will automatically work as a subdomain of all three domains. This saves a lot of configuration effort.

> In the case of production, you will of course also be able to add a final production domain name for *each* site via the user interface. But you will need a "pre-production" hostname for early content creation. That is where `baseUrlDomains` comes into play.
>
> Registering a domain each for staging and production is strongly recommended, as DNS has no support for "third-level" wildcards.
>
> We often use the `.dev` top level domain for staging and the `.com` or `.app` top level domain for pre-production editing, but the choice is yours.

### Disabled File Key

In `sites/index.js`, locate `disabledFileKey` and change `CHANGEME` to a random string of your choosing. This is used when disabling access to files in the local backend.

### Session Secret

In `sites/index.js`, locate `secret` and change `CHANGEME` to a random string of your choosing. This is used for login session encryption.

## Requirements For Development On Your Computer

### Operating System: Mac, Linux, or Virtual Linux

**Your local development environment must be either MacOS or Linux.** If your development computer runs Windows, we recommend development on Ubuntu Linux in a full virtual Linux machine, via [VirtualBox](https://www.virtualbox.org/).

Another option is to use the Windows Subsystem for Linux, which is also an Ubuntu Linux-based environment. however this option has not been extensively tested with Assembly.

### Software Installation Requirements

To test-drive the project in development, make sure you have Apostrophe's usual dependencies on your local machine:

* MongoDB (3.x or better)
* NodeJS (10.x or better, latest long term support release recommended)
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

## Site Development

Right now we have a bare-bones example. Let's look at where to put our code to customize the experience.

### Where Does My Apostrophe Project Code Go?

> If you are not already familiar with single-site Apostrophe development, we strongly recommend that you [read the A3 ApostropheCMS documentation](https://a3.docs.apostrophecms.org/) as a starting point.

In a typical single-site Apostrophe project, modules are configured in `app.js`. In a multisite project, you'll find that `app.js` is instead reserved for top-level configuration that applies to all sites.

The code you're used to seeing in `app.js` can instead be found in `sites/index.js`. And, the code you're used to seeing in `modules` can be found in `sites/modules`.

In all other respects, development is just like normal ApostropheCMS single-site development. Feel free to add page templates and modules. You can `npm install` modules like `@apostrophecms/blog` and configure them in a normal way; just do it in `sites/index.js` rather than `app.js`.

If you have already started a single-site project, you can move your modules directly from `modules` to `sites/modules`, and move the `modules` section of your `app.js` file to the corresponding section of `sites/index.js`. However take note of the existing settings we provide and merge accordingly.

> **If you are hosting your project with us, or using tools provided by us, you should remove any legacy app.js or module code that configures UploadFS cloud storage or mongodb database hosts.** Such settings are handled automatically and the configuration is set behind the scenes by `@apostrophecms/multisite` and the provided logic in the boilerplate project.

### Themes

Apostrophe Assembly and the multisite module are designed to accommodate hundreds of websites, or more, running on a single codebase. But, you may need some differences in appearance and behavior that go beyond what the palette editor can provide. For that you can create multiple themes. Each site is set via the dashboard UI to use a single theme and will typically stay with that theme throughout its lifetime.

You might not need more than one theme. If that's the case, just build out the `default` theme to suit your needs, and remove the `alternate` theme from `themes.js`. You can also remove the `sites/modules/theme-alternate` module and `sites/lib/theme-alternate.js`.

#### Adding a New Theme

To configure your list of themes, edit `themes.js`. Right now it looks like:

```javascript
module.exports = [
  {
    value: 'default',
    label: 'Default'
  },
  {
    value: 'alternate',
    label: 'Alternate'
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

#### Frontend Assets With Your Own Build Process

Beginning with the 1.1.0 release of `a3-assembly-boilerplate`, a sample webpack build is not included as standard equipment, as `ui/src` suffices for most needs. However, if you need to use webpack or another custom build process, the solution is to configure the output of your build process to be a `ui/public/something.js` file in any module in your Apostrophe project. As above you can create a build that is included in only one theme by writing its output to the `ui/src` subdirectory of that theme module.

#### Developing For IE11

With Microsoft ending Internet Explorer 11 support in 2022, we no longer enable IE11 support by default. However you can enable IE11 support by setting the `es5: true` option to the `@apostrophecms/asset` module. This will create a compatibility build of your `ui/src` JavaScript. Please note that editing is never supported in IE11. See the Apostrophe documentation for more information.

#### Serving Static Files: Fonts and Static Images

If you need to serve static files, you can do this much as you would in standalone A3 development.

The folder `sites/public` maps to `/` in the URL space of a site. For instance, `sites/public/fonts/myfile.ttf` maps to `/fonts/myfile.ttf`. For assets like favicons and fonts, you can add `link` tags to the `extraHead` block already present in `sites/modules/@apostrophecms/templates/views/outerLayout.html`.

### Palette Configuration

The palette allows styles to be edited visually on the site. It is configured in `sites/modules/@apostrophecms-pro/palette/index.js`. There you can specify the selectors, CSS properties, and field types to be used to manipulate color, font size, font family and other aspects of the site as a whole.

For complete information and a sample configuration, see the [@apostrophecms-pro/palette module documentation](https://npmjs.org/package/@apostrophecms-pro/palette). *You will need to be logged into an npm account that has been granted access, such as the one you used to npm install this project.*

> Note that like all other changes, palette changes do not take place for logged-out users until the user clicks "Publish."

## Dashboard Development

**The dashboard site has one job: managing the other sites.** As such you don't need to worry about making this site a pretty experience for the general public, because they won't have access to it. However you may want to dress up this experience and add extra functionality for your own customer admin team (the people who add and remove sites frmo the platform).

The dashboard site can be extended much like the regular sites. Dashboard development is very similar to regular site development, except that modules live in `dashboard/modules`, what normally resides in `app.js` lives in `dashboard/index.js`, and so on.

The most important module is the `sites` module. The `sites` module is a piece type, with a piece to represent each site that your dashboard admins choose to create.

Also important is the `assets` module, which serves the same function as the theme modules in `sites`. You can find the frontend assets in `dashboard/modules/assets/src`.

### Allowing dashboard admins to pass configuration to sites

You can add custom schema fields to `sites` as seen in `dashboard/modules/sites/index.js`. Those fields are available on the `site` object passed to `sites/index.js`, and so they can be passed on as part of the configuration of modules.

However, there is one important restriction: you **must not decide to completely enable or disable a module that pushes assets on any basis other than the theme name.** This is becaue Apostrophe builds only one asset bundle per theme.

**"Should I add a field to the `sites` piece in the dashboard, or just add it to `@apostrophecms/global` for sites?"** Good question! Here's a checklist for you:

* **If single-site admins who cannot edit the dashboard should be able to edit it,** you should put it in `sites/modules/@apostrophecms/global`.
* **If only dashboard admins who create and remove sites should be able to make this decision,** it belongs in `dashboard/modules/sites/index.js`. You can then pass it on as module configuration in `sites/lib/index.js`.

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
