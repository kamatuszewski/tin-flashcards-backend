import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.dto';
import { Role } from '../entity/role.entity';
import { User } from '../entity/user.entity';
import { EUserRole } from './enum/user-role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  public async findOne(login: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { login },
    });
  }

  public async findOneWithRole(
    login: string,
    ...relations: string[]
  ): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { login },
      relations: ['role'],
    });
  }

  public async findOneRole(role: EUserRole): Promise<Role | undefined> {
    return this.roleRepository.findOne({
      where: { name: role },
    });
  }

  public async create(registerDto: RegisterDto): Promise<boolean> {
    const { login, email, password } = registerDto;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User();
    user.login = login;
    user.password = hashedPassword;
    user.email = email;
    user.role = await this.findOneRole(EUserRole.USER);

    const userInDb = await this.usersRepository.findOne({
      where: { login },
    });
    const emailInDb = await this.usersRepository.findOne({
      where: { email },
    });

    if (userInDb || emailInDb) {
      throw new HttpException('USER_ALREADY_EXISTS', HttpStatus.BAD_REQUEST);
    }

    const newUser: User = await this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    return true;
  }
}
