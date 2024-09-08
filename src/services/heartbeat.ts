import * as net from 'net';
import Node from '../interfaces/node.types';
import { recoverNode } from './nodeController';
import commands from '../data/commands';

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
            node.status = 'DEAD';
            client.destroy();
          }
        }, HEARTBEAT_TIMEOUT);
      });
      client.on('data', async (data) => {
        const response = data.toString().trim();
        clearTimeout(heartbeatTimeout);
        if (response === 'ALIVE') {
          if (node.status === 'DEAD') {
            node.status = 'RECOVER';
            console.log(`Server on port ${port} is RECOVERING...`);
            try {
              await recoverNode(Number(port), host, commands);
              node.status = 'RECOVERED';
              console.log(`Server on port ${port} is RECOVERED.`);
            } catch (error) {
              console.error(`Error during node recovery: ${error}`);
              node.status = 'RECOVER_FAILED';
            }
          } else if (node.status === 'RECOVERED') {
            node.status = 'ACTIVE';
            console.log(`Server on port ${port} is ACTIVE and responding...`);
          } else if (node.status === 'ACTIVE') {
            console.log(`Server on port ${port} is ACTIVE and responding...`);
          }

          if (node.status === 'ACTIVE') {
            client.destroy();
          }
        }
      });
      client.on('error', (err) => {
        clearTimeout(heartbeatTimeout);

        console.warn(
          `Heartbeat to server on port ${port} timed out. Marking as DEAD.`
        );
        node.status = "DEAD";
        client.destroy();
      });
      client.on('end', () => {
        console.log(`Connection with server on port ${port} ended.`);
        node.status = "DEAD";
      });
    });
  }, HEARTBEAT_INTERVAL);
}
