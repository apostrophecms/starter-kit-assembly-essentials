# Apostrophe Assembly Project Boilerplate

## Purpose

The purpose of this repo is to serve as a quick start boilerplate for multisite-enabled, cloud-hosted projects based on and hosted via Apostrophe Assembly. Tecnically speaking, it serves as a working example of a project built on the `@apostrophecms/multisite` module.

This boilerplate project includes:

* An example of project-level code for your customer-facing sites.
* An example of project-level code for the dashboard site that manages the rest.
* An example of project-level frontend asset generation via a modern webpack build.
* Best practices for easy hostname configuration in dev, staging and prod environments.
* Support for multiple themes.

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

You might not need more than one theme. If that's the case, just build out the `default` theme to suit your needs.

#### Adding a New Theme

To configure your list of themes, edit `themes.js`. Right now it looks like:

```javascript
module.exports = [
  {
    value: 'default',
    label: 'Default'
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

#### Frontend Assets with webpack

This project comes with a sample `webpack.config.js` file. You have great latitude to use webpack however you like. But, there are a few things to know:

* `webpack.config.js` contains builds for both the dashboard site (see `const dashboard = { ... }`) and the themes (see `const themeConfigs = themes.map(...)`).
* **The entry point for the `default` theme's JavaScript is:** `./modules/theme-default/src/js/index.js`
* **The entry point for the `default` theme's styles is:** `./modules/theme-default/src/css/index.scss`
* The resulting bundle is pushed to the browser by apostrophe as part of a minified bundle in the normal way in staging and production. In development it is pushed by the webpack development server.

#### Developing For IE11

The provided webpack build includes hot reloading, so your frontend changes will be automatically reloaded without the need to manually restart or refresh the page. However, if you are developing for IE11 and wish to test locally, you'll need to start the server a little differently:

```
IE11=1 npm run dev
```

**While running in this mode hot reload is not available.** We are tracking a related issue with webpack and when it is resolved we hope to remove the need for this separate mode.

> In production this is not an issue. Babel is always used and the webpack bundle that is built is always IE11-compatible.

#### Frontend Assets Without webpack

If you prefer, you can place `.css` and `.js` files in the `ui/public` subdirectory of any module. Apostrophe will automatically include these in its bundle when serving assets. However note that the live reload mechanism will only catch webpack assets, so you'll need to restart `npm run dev`. This technique is typically only used for assets of npm modules shared across projects, which often have their own build process to create them.

#### Frontend webpack Assets For Themes

Your `modules/theme-THEMENAME` module must have at least a `src/js/index.js` file and a `src/css/index.scss` file. These are your webpack "entry points" for that particular theme. They may import other files as needed.

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

## Hosting

Hosting for staging and production clouds is typically provided by the Apostrophe Assembly team.

Self-hosted arrangements can also be made. For more information contact the Apostrophe Assembly team.

## Deployment

If we are hosting Apostrophe Assembly for you, then you can deploy updates to your staging cloud by pushing to your `staging` git branch, and deploy updates to your production cloud by pushing to your `production` git branch. You will receive notifications in our shared Slack channel, including links to access the deployment progress logs.

Apostrophe will complete asset builds for each theme, as well as running any necessary new database migrations for each site, before switching to the newly deployed version of the code.
