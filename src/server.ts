import * as net from 'net';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 5000;

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
    }
  });

  socket.on('close', (err) => {
    console.log(`Client disconnected${err ? ' due to an error.' : '.'}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
