import { plugin } from '@apostrophecms-pro/cypress-tools';

export default (on, config) => {
  plugin(on, config);
  return config;
};
