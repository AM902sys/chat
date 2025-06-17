import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './message.schema';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

  async create(user: string, text: string) {
    const created = new this.messageModel({ user, text });
    return created.save();
  }

  async findAll() {
    return this.messageModel.find().exec();
  }
}
