import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export type User = {
  userId: number,
  username: string,
  password: string
}

@Injectable()
export class UsersService {
  private users: User[];

  constructor() {
    this.users = []
  }

  public async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  public async create(body: any): Promise<any> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    const userId = Date.now();

    this.users.push({
      userId: userId,
      username: body.username,
      password: hashedPassword
    })

    return true;
  }
}
