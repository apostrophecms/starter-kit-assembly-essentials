import * as client from 'openid-client';
import {
  Strategy
} from 'openid-client/passport'

export default {
  options: {
    create: {
      role: 'guest'
    },
    strategies: [
      {
        async factory(params, fn) {
          const issuer = new URL(process.env.OIDC_ISSUER);
          const config = await client.discovery(
            issuer,
            process.env.OIDC_CLIENT_ID,
            process.env.OIDC_CLIENT_SECRET
          );
          const {
            // injected into params by passport-bridge
            callbackURL
          } = params;
          const s = new Strategy({
            config,
            scope: 'openid email',
            callbackURL
          }, (tokens, callback) => {
            const claims = tokens.claims();

            // oidc provides:

            // sid
            // name: 'Tom Boutell',
            // preferred_username: 'tomtest1',
            // given_name: 'Tom',
            // family_name: 'Boutell',
            // email: 'tom+tomtest1@apostrophecms.com'

            // But oauth providers provide (and passport-bridge expects, by default):

            // id
            // displayname
            // username
            // firstName
            // lastName
            // "emails" or "email"

            const profile = {
              id: claims.sid,
              displayName: claims.name,
              firstName: claims.given_name,
              lastName: claims.family_name,
              email: claims.email,
              username: claims.preferred_username
            };

            return fn(null, tokens.access_token, tokens.refresh_token, profile, callback);
          });
          // The strategy sets it to the hostname, override so we can predict the URLs
          s.name = 'oidc';
          return s;
        },
        // Required when using a factory function
        name: 'oidc',
        // These would show up in "params" above, we chose to use environment
        // variables instead
        options: {},
        // Use the user's email address as their identity
        match: 'email',
        // Strategy-specific options that must be passed to the authenticate middleware.
        // See the documentation of the strategy module you are using
        authenticate: {
          scope: [ 'openid', 'email' ]
        }
      }
    ]
  }
}
