import { createServer } from '../server/server';
import { loadConfig } from '../services/configService';
import { select } from '@inquirer/prompts';

async function main() {
  const configFileName: string = await select({
    message: 'Please choose the server you want to run:',
    choices: [
      {
        name: 'Server A',
        value: 'config1.json',
        description: 'Run Server A on port 3000.',
      },
      {
        name: 'Server B',
        value: 'config2.json',
        description: 'Run Server B on port 3001.',
      },
      {
        name: 'Server C',
        value: 'config3.json',
        description: 'Run Server C on port 3002.',
      },
    ],
  });
  const config = loadConfig(configFileName);
  createServer(config.port, config.nodes);
}

main();
