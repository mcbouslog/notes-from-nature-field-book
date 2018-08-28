/*
Configuration Settings
----------------------
The config settings change depending on which environment the app is running in.
By default, this is the development environment, but this can be changed either by:
- An ?env query string, e.g. localhost:3000?env=production
- The NODE_ENV environment variable on the system running the app.
 */

const DEFAULT_ENV = 'development';
const envFromBrowser = locationMatch(/\W?env=(\w+)/);
const envFromShell = process.env.NODE_ENV;
const env = envFromBrowser || envFromShell || DEFAULT_ENV;

if (!env.match(/^(production|staging|development)$/)) {
  throw new Error(`Error: Invalid Environment - ${env}`);
}

const baseConfig = {
  development: {
    origin: window.location.origin,
    projectId: '1613',
    panoptesAppId: '16ac801e4ad438d929d30668206df31294e7a7222ce3f449a1c4b45cd80d44cc',
    zooniverse: 'https://master.pfe-preview.zooniverse.org'
  },
  production: {
    origin: '',
    panoptesAppId: '',
    projectId: '',
    zooniverse: 'https://www.zooniverse.org'
  }
};

baseConfig.staging = baseConfig.development;  // staging === development, as far as we're concerned.

const config = baseConfig[env];

export { env, config };

// Try and match the window.location.search property against a regex. Basically mimics
// the CoffeeScript existential operator, in case we're not in a browser.
function locationMatch(regex) {
  var match;
  if (window && typeof window.location !== 'undefined' && window.location !== null) {
    match = window.location.search.match(regex);
  }
  return (match && match[1]) ? match[1] : undefined;
}