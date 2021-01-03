import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
  }

  public async findOne(login: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: {login}
    });
  }

  public async create(body: any): Promise<boolean> {
    const { login, email, password } = body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User();
    user.login = login
    user.password = hashedPassword;
    user.email = email;

    const userInDb = await this.usersRepository.findOne({
      where: { login }
    });
    const emailInDb = await this.usersRepository.findOne({
      where: { email }
    });

    if (userInDb || emailInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const userr: User = await this.usersRepository.create(user);
    await this.usersRepository.save(userr);
    return true;
  }

}
