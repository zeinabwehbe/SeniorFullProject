import { readYamlEnvSync } from 'yaml-env-defaults';

const YML_CONFIG_FILENAME = 'application.yml';

//const config = readYamlEnvSync(YML_CONFIG_FILENAME);

require('dotenv').config();

const config = {
  application: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
    name: 'test',
    'application-root': '/api/v1'
  },
  bcrypt: {
    saltRounds: 10
  },
  jwt: {
    secret: process.env.JWT_SECRET
  }
};

module.exports = config;

/**
 * It is responsible for reading the configuration from the application.yml
 */
export default () => {
  return config;
};