import {createServer} from '../server/server';
import { loadConfig } from '../../utils/utils';


const configFileName = process.argv[2];
const config = loadConfig(configFileName);

createServer(config.port , config.nodes);
console.log('Distributed system key-val store server has been started');
