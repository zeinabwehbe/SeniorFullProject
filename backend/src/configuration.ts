import { readYamlEnvSync } from 'yaml-env-defaults';

const YML_CONFIG_FILENAME = 'application.yml';

const config = readYamlEnvSync(YML_CONFIG_FILENAME);

/**
 * It is responsible for reading the configuration from the application.yml
 */
export default () => {
  return config;
};
