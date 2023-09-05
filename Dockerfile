# Dockerfile for A3 assembly boilerplate. Assumes
# S3 for media storage and an external mongodb server.
# Useful for self-hosted projects

FROM node:18-bullseye
ENV APOS_MINIFY=1
WORKDIR /app

# Not required with latest uploadfs
# RUN apt-get -y install imagemagick

COPY package*.json ./

ARG NPMRC

# So npm install can succeed with private modules
ENV NPMRC=${NPMRC}

RUN echo $NPMRC > /root/.npmrc

# Not npm ci because developers don't always agree that
# build tools are not devDependencies
RUN npm install --include=dev

# Not until after npm install because developers don't
# always agree that build tools are not devDependencies
ENV NODE_ENV=production

# For mongodb and utilities installed via "m"
ENV PATH="/root/.local/bin:$PATH"
RUN mkdir -p /root/.local/bin

# Install the command line tools for mongodb (not
# mongodb itself)
RUN npm install -g m && echo y | m tools stable

# See below for comments on each
ARG APOS_PREFIX
ARG ENV
ARG APOS_S3_REGION
ARG APOS_S3_BUCKET
ARG APOS_S3_KEY
ARG APOS_S3_SECRET
ARG DASHBOARD_HOSTNAME
ARG PLATFORM_BALANCER_API_KEY
ARG CDN
ARG MONGODB_URL

# Can be removed if you remove the relevant code from
# the boilerplate project, which is intended to pass a hint
# to your load balancer that a site has been added or changed
RUN mkdir -p /opt/cloud && echo $PLATFORM_BALANCER_API_KEY > /opt/cloud/platform-balancer-api-key

# Prefix for site database names, e.g. "myproject-"
# Dashboard will be "my-project-dashboard"

ENV APOS_PREFIX=${APOS_PREFIX}

# dev, staging or prod as appropriate
# Must be "prod" for the "production hostname" field
# in the website dashboard to take effect
ENV ENV=${ENV}

# e.g. dashboard.myplatformsdomainname.com
ENV DASHBOARD_HOSTNAME=${DASHBOARD_HOSTNAME}

# If not using S3, configure uploadfs for your preferred
# storage using environment variables, or make sure
# sites/uploads and dashboard/uploads are on a shared
# filesystem across all load-balanced instances
ENV APOS_S3_REGION=${APOS_S3_REGION}
ENV APOS_S3_BUCKET=${APOS_S3_BUCKET}
ENV APOS_S3_KEY=${APOS_S3_KEY}
ENV APOS_S3_SECRET=${APOS_S3_SECRET}

# You can remove this from the boilerplate code if you
# don't plan to implement a similar API in your own
# load balancer for notification that a site was changed
ENV PLATFORM_BALANCER_API_KEY=${PLATFORM_BALANCER_API_KEY}

# Optional, for cloudflare, cloudfront, etc.
ENV CDN=${CDN}

# Bring in most of the code late to benefit from caching
COPY . ./

# Generate a unique identifier for this particular build
RUN APOS_RELEASE_ID=`cat /dev/random | tr -dc '0-9' | head -c 8` && echo ${APOS_RELEASE_ID} > ./sites/release-id && echo ${APOS_RELEASE_ID} > ./dashboard/release-id

# Store shared static assets in uploadfs
ENV APOS_UPLOADFS_ASSETS=1

ENV MONGODB_URL=${MONGODB_URL}

# Build assets for all themes
RUN npm run build

# At runtime everything is already baked in
EXPOSE 3000
CMD npm run production-start
