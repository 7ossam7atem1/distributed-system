import * as net from 'net';
import { delKey, getKey, setKey } from '../services/storingService';

let clientMessage: string;

export function handleRequest(
  socket: net.Socket,
  data: Buffer,
  nodes: string[]
) {
  const request = data.toString().trim();

  const [command = '', key = '', value = '', forwarded = ''] =
    request.split(' ');

  const validCommand: boolean =
    command === 'GET' || command === 'SET' || command === 'DEL';

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
    clientMessage = getKey(key, forwarded, nodes);
    socket.write(clientMessage);
  } else if (command === 'DEL') {
    clientMessage = delKey(key, forwarded, nodes);
    socket.write(clientMessage);
  }
}
