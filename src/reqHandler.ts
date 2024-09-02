import * as net from 'net';
import { store } from '../utils/utils';
import { sendRequest } from '../utils/nodeController';

export function handleRequest(
  socket: net.Socket,
  data: Buffer,
  nodes: string[]
) {
  const request = data.toString().trim();

  const [command = '', key = '', value = ''] = request.split(' ');

  const validCommand =
    command === 'GET' || command === 'SET' || command === 'DEL';

  if (!command || !validCommand) {
    console.error('Received an empty or invalid command.');
    socket.write(
      'ERROR: Invalid or empty command. Please send a valid command.'
    );
    return;
  }

  if (command === 'SET') {
    if (!key || !value) {
      console.error('Received incomplete SET command.');
      socket.write('ERROR: SET command must include key and value types.');
      return;
    }

    if (store.has(key)) {
      console.error(`Key ${key} is already exists!`);
      socket.write(`ERROR: Key "${key}" is already exists, It must be unique.`);
      return;
    }

    store.set(key, value);

    console.log(`SET Key=${key} value=${value}`);

    socket.write(`Success: Key "${key}" has been set with value "${value}".`);

    sendRequest(command, key, value, nodes);
  } else if (command === 'GET') {
    if (!key) {
      console.error('Received incomplete GET command.');
      socket.write('ERROR: GET command must include key.');
      return;
    }

    const retrievedValue = store.get(key);

    if (retrievedValue !== undefined) {
      console.log(`GET Key=${key} value=${retrievedValue}`);
      socket.write(`Success: Value "${retrievedValue}" for Key "${key}".`);
    } else {
      console.error(`Key "${key}" not found.`);
      socket.write(`ERROR: Key "${key}" not found.`);
    }
  } else if (command === 'DEL') {
    if (!key) {
      console.error('Received incomplete DEL command.');
      socket.write('ERROR: DEL command must include key.');
      return;
    }

    const isKeyExistAndDeleted = store.delete(key);

    if (!isKeyExistAndDeleted) {
      console.error(`Key "${key}" not found.`);
      socket.write(`ERROR: Key "${key}" not found.`);
    } else {
      console.log(`DEL Key=${key}`);
      socket.write(`Success: Value DELETED for Key "${key}".`);

      sendRequest(command, key, '', nodes);
    }
  }
}
