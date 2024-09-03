import * as net from 'net';

export function sendRequest(
  command: string,
  key: string,
  value: string,
  nodes: string[],
  forwarded: string
) {
  if (forwarded) return;
  nodes.forEach((node: any) => {
    const [host, port] = node.split(':');

    const client = new net.Socket();
    client.connect(Number(port), host, () => {
      console.log(`Connected to server on port ${port}`);
      client.write(`${command} ${key} ${value} forwarded`);
    });
    client.on('data', (data) => {
      console.log(`Response from ${node}: ${data.toString()}`);
      client.destroy();
    });
    client.on('error', (err) => {
      console.error(`Error with ${node}: ${err.message}`);
    });
  });
}
