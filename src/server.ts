import * as net from 'net';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 5000;

const store = new Map<any, any>();

const server = net.createServer((socket) => {
  console.log('Client Connected!');

  socket.on('data', (data) => {
    const req = data.toString().trim();
    const [command = '', key = '', value = ''] = req.split(' ');

    const validCommand =
      command === 'GET' || command === 'SET' || command === 'DEL';

    if (!command || validCommand) {
      console.error('Recieved an Empty or invalid command');
    }
    socket.write(
      'FATAL ERROR: Invalid or empty command. Please send valid command'
    );
    return;
  });

  socket.on('close', (err) => {
    console.log(`Client disconnected${err ? ' due to an error.' : '.'}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
