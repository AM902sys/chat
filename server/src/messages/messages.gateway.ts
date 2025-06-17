import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessagesService } from './messages.service';

@WebSocketGateway()
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private messagesService: MessagesService) {}

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: { user: string; text: string }) {
    const message = await this.messagesService.create(data.user, data.text);
    this.server.emit('message', message);
  }

  @SubscribeMessage('findAll')
  async handleFindAll() {
    const messages = await this.messagesService.findAll();
    this.server.emit('allMessages', messages);
  }
}
