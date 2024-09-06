import { createServer } from '../server/server';
import { getConfigName, loadConfig } from './../services/configService';

try {
  const configFileName = getConfigName();
  const config = loadConfig(configFileName);

  createServer(config.port, config.nodes);
  console.log('Distributed system key-val store server has been started');
} catch (err: any) {
  console.error('Error loading configuration:', err.message);
}
