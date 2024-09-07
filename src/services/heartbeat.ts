import * as net from 'net';
import Node from '../interfaces/node.types';

const HEARTBEAT_INTERVAL = 5000;
const HEARTBEAT_TIMEOUT = 3500;

export function startSniffing(nodes: Node[]) {
  setInterval(() => {
    nodes.forEach((node) => {
      const { host, port } = node;
      if (!host || !port) {
        console.error(`Invalid Node Configuration: ${JSON.stringify(node)}`);
        return;
      }
      const client = new net.Socket();
      let heartbeatTimeout: NodeJS.Timeout;
      client.connect(Number(port), host, () => {
        client.write('HEARTBEAT PROCESS GOING ON');
        heartbeatTimeout = setTimeout(() => {
          if (!client.destroyed) {
            console.error(`Server hosted on port ${port} is DEAD`);
            node.isRunning = false;
            client.destroy();
          }
        }, HEARTBEAT_TIMEOUT);
      });
      client.on('data', (data) => {
        const response = data.toString().trim();
        clearTimeout(heartbeatTimeout);
        if (response === 'ALIVE') {
          node.isRunning = true;
          console.log(`Server hosted on port ${node.port} is ALIVE!`);
        } else {
          node.isRunning = false;
          console.error(
            `Unexpected response from the server on port ${node.port}`
          );
        }

        client.destroy();
      });
      client.on('error', (err) => {
        clearTimeout(heartbeatTimeout);

        console.error(
          `Server hosted on port: ${node.port} is DEAD${
            err ? `, due to ${err}` : '.'
          }`
        );
        node.isRunning = false;
        client.destroy();
      });
      client.on('end', () => {
        console.log(`Connection ended with server hosted on port ${node.port}`);
        node.isRunning = false;
      });
    });
  }, HEARTBEAT_INTERVAL);
}
