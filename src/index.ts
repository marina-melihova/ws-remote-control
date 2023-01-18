import 'dotenv/config';
import { WebSocketServer } from 'ws';

const port = +process.env.PORT || 8080;

const wss = new WebSocketServer({ port });

wss.on('connection', ws => {
  console.log('Client connected');

  const interval = setInterval(() => {
    ws.send('Hello! Message From Server!');
  }, 1000);

  ws.on('message', message => {
    console.log(`Received message => ${message}`);
  });

  ws.on('close', () => {
    console.log(`Client disconnected`);
  });

  ws.on('error', error => {
    console.log('error :>> ', error);
  });
});
