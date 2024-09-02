import * as net from 'net';

export function sendRequest(
  command: string,
  key: string,
  value: string,
  nodes: string[]
) {
  nodes.forEach((node: any) => {
    const [host, port] = node.split(':');

    const client = new net.Socket();
    client.connect(Number(port), host, () => {
      client.write(`${command} ${key} ${value}`);
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
