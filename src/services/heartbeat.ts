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
            console.warn(
              `Heartbeat to server on port ${port} timed out. Marking as DEAD.`
            );
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
          console.log(`Server on port ${port} is ACTIVE and responding.`);
        } else {
          node.isRunning = false;
          console.error(
            `Unexpected response from server on port ${port}: ${response}. Marking as DEAD.`
          );
        }

        client.destroy();
      });
      client.on('error', (err) => {
        clearTimeout(heartbeatTimeout);

        console.warn(
          `Heartbeat to server on port ${port} timed out. Marking as DEAD.`
        );
        node.isRunning = false;
        client.destroy();
      });
      client.on('end', () => {
        console.log(`Connection with server on port ${port} ended.`);
        node.isRunning = false;
      });
    });
  }, HEARTBEAT_INTERVAL);
}
