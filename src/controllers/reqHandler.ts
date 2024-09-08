import * as net from 'net';
import { delKey, getKey, setKey, updKey } from '../services/storingService';
import Node from '../interfaces/node.types';

let clientMessage: string;

export function handleRequest(socket: net.Socket, data: Buffer, nodes: Node[]) {
  const request = data.toString().trim();
  if (request === 'HEARTBEAT') {
    socket.write(`I'M ALIVE!`);
  }

  const [command = '', key = '', value = '', forwarded = ''] =
    request.split(' ');

  const validCommand: boolean =
    command === 'GET' ||
    command === 'SET' ||
    command === 'DEL' ||
    command === 'UPD';

  if (!command || !validCommand) {
    console.error('Received an empty or invalid command.');
    clientMessage = 'ERROR: Invalid or empty command.';
    socket.write(clientMessage);
    return;
  }
  if (command === 'SET') {
    clientMessage = setKey(key, value, forwarded, nodes);
    socket.write(clientMessage);
  } else if (command === 'GET') {
    clientMessage = getKey(key);
    socket.write(clientMessage);
  } else if (command === 'DEL') {
    clientMessage = delKey(key, forwarded, nodes);
    socket.write(clientMessage);
  } else if (command === 'UPD') {
    clientMessage = updKey(key, value, forwarded, nodes);
    socket.write(clientMessage);
  }
}
