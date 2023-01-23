import 'dotenv/config';
import { WebSocketServer, createWebSocketStream } from 'ws';
import { getMousePos, moveDown, moveLeft, moveRight, moveUp } from './mouse';
import { getScreenshot } from './screenshot';
import { drawRect, drawCircle } from './drawing';
import { Commands } from './constants';

const mapActions = {
  [Commands.LEFT]: moveLeft,
  [Commands.RIGHT]: moveRight,
  [Commands.UP]: moveUp,
  [Commands.DOWN]: moveDown,
  [Commands.MOUSE_POS]: getMousePos,
  [Commands.DRAW_CIRCLE]: drawCircle,
  [Commands.DRAW_SQUARE]: drawRect,
  [Commands.DRAW_RECT]: drawRect,
  [Commands.PRINT_SC]: getScreenshot,
};

const port = +process.env.PORT || 8080;

const wss = new WebSocketServer({ port });
console.log(`Web Socket Server started on port ${wss.options.port}`);

wss.on('connection', (ws, req) => {
  console.log(`Client connected from: ${req.socket.remoteAddress}:${req.socket.remotePort}`);

  const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

  duplex.on('data', async message => {
    console.log(`Received message => ${message}`);
    const [command, ...options] = message.split(' ');
    const args = options.map(Number);

    if (command in mapActions) {
      try {
        const response = await mapActions[command](args);
        duplex.write(response);
        console.log(`Command ${command} was completed successfully`);
      } catch (err: any) {
        console.error(`Command ${command} was failed with error => ${err.message}`);
      }
    }
  });

  ws.on('close', () => {
    console.log(`Client disconnected from: ${req.socket.remoteAddress}:${req.socket.remotePort}`);
  });

  ws.on('error', error => {
    console.log('error :>> ', error);
  });
});

wss.on('close', () => {
  console.log('Web Socket Server is disconnected');
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    console.log(signal);
    for (const client of wss.clients) client.close();
    wss.close();
  });
}
