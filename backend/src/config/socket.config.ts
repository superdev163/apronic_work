import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketConfig {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('updated')
  handleMessage(client: Socket, payload: string) {
    this.server.emit('updated', payload);
  }
}
