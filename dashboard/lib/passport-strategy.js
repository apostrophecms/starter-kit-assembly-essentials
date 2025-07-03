import {
  Config,
  Strategy
} from 'openid-client/passport'

console.log(Config);

class SimpleStrategy extends Strategy {
  constructor(options, fn) {
    const config = new Config(options);
    super(config, fn);
  }
}
