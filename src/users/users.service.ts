import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/register.dto';
import { Role } from '../entity/role.entity';
import { User } from '../entity/user.entity';
import { EUserRole } from './enum/user-role.enum';

@Injectable()
export abstract class UsersService {
  public abstract findOne(login: string): Promise<User | undefined>;

  public abstract findOneWithRole(
    login: string,
    ...relations: string[]
  ): Promise<User | undefined>;

  public abstract findOneRole(role: EUserRole): Promise<Role | undefined>;

  public abstract create(registerDto: RegisterDto): Promise<boolean>;
}
