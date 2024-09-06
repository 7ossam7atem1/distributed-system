import * as net from 'net';
import Node from '../interfaces/node.types';

const HEARTBEAT_INTERVAL = 5000;
const HEARTBEAT_TIMEOUT = 3500;

export function startSniffering(nodes: Node[]) {
  setInterval(() => {
    nodes.forEach((node) => {
      const { host, port } = node;
      if (!host || !port) {
        console.error(`Invalid Node Configuration: ${JSON.stringify(node)}`);
        return;
      }
      const client = new net.Socket();
      client.connect(Number(port), host, () => {
        client.write('HEARTBEAT PROCESS GOING ON');
      });
      client.on('data', (data) => {
        const response = data.toString().trim();
        if (response === 'ALIVE') {
          node.isRunning = true;
          console.log(`Server hosted on port ${node.port} is ALIVE!`);
        }

        client.destroy();
      });
      client.on('error', (err) => {
        console.error(
          `Error sending heartbeat to server hosted on the port ${node.port} , ${err.message}`
        );
        client.destroy();
      });

      client.on('timeout', () => {
        console.error(
          `Heartbeat timeout for server running on the port ${node.port}`
        );
        node.isRunning = false;
        client.destroy();
      });
      client.on('end', () => {
        console.log(`Connection ended with server hosted on port ${node.port}`);
      });
      setTimeout(() => {
        if (!client.destroyed) {
          node.isRunning = false;
          console.log(`Server hosted on port: ${node.port} is DEAD`);
          client.destroy();
        }
      }, HEARTBEAT_TIMEOUT);
    });
  }, HEARTBEAT_INTERVAL);
}
