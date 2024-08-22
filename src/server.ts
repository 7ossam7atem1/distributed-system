import * as net from 'net';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 5000;

const server = net.createServer((socket) => {
  console.log('Client Connected!');
  socket.on('close', (err) => {
    console.log(`Client disconnected ${err ? 'due to server error.' : '.'}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
