import * as net from 'net';
import dotenv from 'dotenv';
import { loadConfig } from '../utils/utils';
dotenv.config();
// const PORT = process.env.PORT || 5000;
const config = loadConfig();
const port = config.port;
const store = new Map<string, string>();

const server = net.createServer((socket) => {
  console.log('Client Connected!');

  socket.on('data', (data) => {
    const req = data.toString().trim();
    const [command = '', key = '', value = ''] = req.split(' ');

    const validCommand =
      command === 'GET' || command === 'SET' || command === 'DEL';

    if (!command || !validCommand) {
      console.error('Received an empty or invalid command');
      socket.write(
        'FATAL ERROR: Invalid or empty command. Please send a valid command'
      );
      return;
    }

    if (command === 'SET') {
      if (!key || !value) {
        console.error('Received inappropriate or incomplete SET command.');
        socket.write('ERROR: SET command must include key and value types.');
        return;
      }
      store.set(key, value);
      console.log(`SET key = ${key}, value = ${value}`);

      socket.write(`Success: Key ${key} has been set with the value ${value}.`);
    } else if (command === 'GET') {
      if (!key) {
        console.error('Recieved inappropriate or incomplete GET command.');
        socket.write('ERROR: GET command must include key.');
        return;
      }

      const retrievedValue = store.get(key);

      if (retrievedValue !== undefined) {
        console.log(`GET Key= ${key} , Value = ${retrievedValue}`);
        socket.write(
          `Success: Retrieved the value ${retrievedValue} for the Key ${key}`
        );
      } else {
        console.error(`Key "${key}" not found!`);
        socket.write(`ERROR: ${key} not found!`);
      }
    } else if (command === 'DEL') {
      if (!key) {
        console.error(`Recieved inappropriate or incomplete DEL command`);
        socket.write(`ERROR: DEL command must include key`);
        return;
      }

      const isKeyExistandDeleted = store.delete(key);
      if (!isKeyExistandDeleted) {
        console.error(`Key "${key}" not found!`);
        socket.write(`ERROR: Key ${key} not found!`);
      } else {
        console.log(`DEL Key ${key}`);
        socket.write(`Success: Value DELETED for the key ${key}`);
      }
    }
  });

  socket.on('close', (err) => {
    console.log(`Client disconnected${err ? ' due to an error.' : '.'}`);
  });
});

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
