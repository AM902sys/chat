import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesGateway } from './messages.gateway';
import { MessagesService } from './messages.service';
import { Message, MessageSchema } from './message.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])],
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
