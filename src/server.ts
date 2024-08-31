import * as net from 'net';
import dotenv from 'dotenv';
import { loadConfig } from '../utils/utils';
import { handleRequest } from './reqHandler';
dotenv.config();
// const PORT = process.env.PORT || 5000;
const config = loadConfig();
const port = config.port;

const server = net.createServer((socket) => {
  console.log('Client Connected!');

  socket.on('data', (data) => {
    handleRequest(socket, data);
  });

  socket.on('close', (err) => {
    console.log(`Client disconnected${err ? ' due to an error.' : '.'}`);
  });
});

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
