import * as net from 'net';

const client = new net.Socket();

client.connect(3002, 'localhost', () => {
  console.log('Connected to server C');
  client.write('DEL testKey');
});

client.on('data', (data) => {
  console.log('Recieved: ' + data.toString());

  client.destroy();
});

client.on('close', () => {
  console.log('Connection closed.');
});

client.on('error', (err) => {
  console.error('Error: ' + err.message);
});
