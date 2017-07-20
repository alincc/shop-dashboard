import { User } from '../model/interface';

export interface IMessage {
  body: string;
  user: User;
  createdAt?: string;
  updatedAt?: string;
}

export class Message implements IMessage {
  body: string;
  user: User;
  createdAt?: string;
  updatedAt?: string;

  constructor (message: IMessage) {
    this.body = message.body;
    this.user = new User(message.user);
    this.createdAt = message.createdAt;
    this.updatedAt = message.updatedAt;
  }
}
