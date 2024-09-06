import * as net from 'net';
import dotenv from 'dotenv';
import { handleRequest } from '../controllers/reqHandler';
import Node from '../interfaces/node.types';
dotenv.config();
// const PORT = process.env.PORT || 5000;
export function createServer(port: number, nodes: Node[]) {
  const server = net.createServer((socket) => {
    console.log(`client connected on prot ${port}`);

    socket.on('data', (data) => {
      console.log(`data on port ${port}`);
      handleRequest(socket, data, nodes);
    });

    socket.on('close', (err) => {
      console.log(`Client disconnected${err ? ' due to an error.' : '.'}`);
    });
  });

  server.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
}
