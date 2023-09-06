# Self-hosting recommendations

A sample `Dockerfile` is provided with this project and can be used for self-hosting.
See also the provided `.dockerignore` file. The rest of this document will assume
you are basing your deployment plan on these.

## Working with the provided `Dockerfile`

The provided `Dockerfile` assumes you have obtained an Amazon S3 storage bucket and set up
MongoDB hosting via MongoDB Atlas. The `Dockerfile` is designed to support running as many
instances as you wish on separate servers and load-balancing them via a mechanism of your
choice.

Typical Docker `build` and `run` commands look like:

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

If you provide a `PLATFORM_BALANCER_API_KEY`, then your dashboard hostname must
also accept a JSON-encoded `POST` request to `/platform-balancer/refresh` with a single `key`
parameter. You can use that request as a trigger to refresh your list of sites when an admin adds
or edits a site in the dashboard. If you don't want to do this, just don't set the variable.

## Understanding our typical deployment process

In setting up your own self-hosted process, you may find it helpful to better understand
our own process. Toward that end, here is an overview:

* All of the content that users create while editing is stored in the external MongoDB,
except media which is stored in the external S3 buckets. The application servers are 100%
stateless. This is essential so that you can load-balance application servers without
worrying about any differences. The only way they ever change is when a new image build
is pushed (see below).
* Accordingly, zero code changes are ever made within the running container.
* Static assets, e.g. the js and css bundles loaded on the page and related files,
are pushed to S3 during the asset build (if using APOS_UPLOADFS_ASSETS=1 and the S3
variables) or served directly by Express from the container image (if you don't set
that variable).
* There is a randomly generated release-id, as you've seen in the `Dockerfile, that
uniquely identifies this particular build so it can always find its static assets
in S3 and including that id in `sites/release-id` and `dashboard/release-id` in the
container itself guarantees the running application sees the id that the build task
generated.
* Our normal practice is to set up github webhooks to trigger a container build and
redeployment whenever the staging or production github branches are updated.
* We then use github deploy keys to allow our build worker to git clone the code.
* We then use `docker save` and `docker load` to pipe the new container image from
our build worker to our application servers, stop the old container and start the
new one. You might prefer to use your own container registry.
* If an admin user creates a site in the dashboard and gives it the "short name"
`mysite`, then Apostrophe automatically expects to receive HTTP requests for
`mysite.yourdomainhere.com`, based on your `DASHBOARD_HOSTNAME`, which should be
`dashboard.yourdomainhere.com` unless this pattern has been adjusted (see the
`@apostrophecms-pro/multisite` documentation).
* If that pattern suffices for your needs, you can set up your reverse proxy server
with a DNS wildcard "A" record and a wildcard HTTPS certificate and pass all
traffic to Apostrophe.
* Many of our customers need separate production domain names per site. For this
use case, the reverse proxy server configuratino must be rebuilt dynamically when
sites are added, updated or removed via the dashboard, paying special attention to the
`prodHostname` property of each site piece in the dashboard database that
is not marked `archived: true`.
* Our reverse proxy update software also generates certificates on the fly
using letsencrypt.

## A sample query to identify live sites

With regard to updating reverse proxy server configuration on the fly, the specifics
are up to you, but it is useful to have a way to query Apostrophe for a list of all
live websites in the dashboard.

First, identify the correct MongoDB database name. If you are setting `APOS_PREFIX` to
`mycompany-`, then the database you need is `mycompany-dashboard`.

Then, make a query as follows:

```javascript
const sites = await docs.find({
  type: 'site',
  archived: {
    $ne: true
  }
).sort({ _id: 1 }).toArray();
```

You can then examine the `shortName` and `prodHostname` properties of each site to
set up appropriate routing to your application servers.

## Routing for large numbers of sites

Because Apostrophe can serve many sites from a single process, a single EC2 t2.medium
instance can typically handle about 25 sites before RAM or CPU becomes an issue, depending
greatly of course on the amount of traffic involved. This is good news for lower costs.

However, if you have 100 sites and use a simple round robin load balancing strategy, you
will have a problem because all 100 sites will soon be consuming RAM on all of your
application servers.

So when operating at this scale, we recommend generating separate `nginx` configurations
for each site, pointing to just two application server backends each (two per site to provide
high availability).

The following code snippet is useful in determining which servers to assign based on the
number of application servers available and the `_id` property of an individual site:

```javascript
function pickBackends(appServerIps, _id) {
  const random = _id.substring(_id.length - 8, _id.length);
  const n = parseInt(random, 36);
  return [ appServerIps[n % appServerIps.length], appServerIps[(n + 1) % appServerIps.length] ];
}
```