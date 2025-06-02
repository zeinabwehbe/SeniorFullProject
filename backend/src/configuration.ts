//import { readYamlEnvSync } from 'yaml-env-defaults';

//const YML_CONFIG_FILENAME = 'application.yml';

//const config = readYamlEnvSync(YML_CONFIG_FILENAME);

import dotenv from 'dotenv';
dotenv.config();

 // config.ts

export default () => ({
  application: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
    name: 'test',
    'application-root': '/api/v1',
  },
  bcrypt: {
    saltRounds: 10,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
