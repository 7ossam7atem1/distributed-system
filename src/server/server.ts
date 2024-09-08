import * as net from 'net';
import dotenv from 'dotenv';
import { handleRequest } from '../controllers/reqHandler';
import Node from '../interfaces/node.types';
import { startSniffing } from '../services/heartbeat';
dotenv.config();
export function createServer(port: number, nodes: Node[]) {
  const server = net.createServer((socket) => {
    socket.on('data', (data) => {
      handleRequest(socket, data, nodes);
    });

    socket.on('close', (hadError) => {
      console.warn(
        `Client disconnected${hadError ? ' due to an error.' : '.'}`
      );
    });

    socket.on('error', (err) => {
      console.error(`Socket error: ${err.message}`);
    });
  });

  server.listen(port, () => {
    startSniffing(nodes);
    console.log(
      `\nDistributed System\n` +
        `-------------------------\n` +
        `Server instance is now running on port ${port}.\n` +
        `This node is part of the distributed key-value store.` +
        `\nWaiting for incoming connections...`
    );
  });

  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.error(
        `Error: Port ${port} is already in use. Please choose a different port.`
      );
    } else {
      console.error(`Error occurred: ${err.message}`);
    }

    process.exit(1);
  });
}
