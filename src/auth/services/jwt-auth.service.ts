import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import { User } from '../../entity/user.entity';
import * as bcrypt from 'bcrypt';
import { IJwtSign } from '../interfaces/jwt-sign.interface';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { IJwtAccessToken } from '../interfaces/jwt-access-token.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthService implements AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(login: string, pass: string): Promise<User> {
    const user: User = await this.usersService.findOne(login);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  public async login(user: LoginDto): Promise<IJwtAccessToken> {
    const verifyCredentials = await this.validateUser(
      user.login,
      user.password,
    );
    if (!verifyCredentials) {
      throw new UnauthorizedException();
    }
    const userInDb = await this.usersService.findOneWithRole(
      user.login,
      'role',
    );
    const payload: IJwtSign = {
      username: user.login,
      sub: userInDb.id_user,
      role: userInDb.role.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async register(registerDto: RegisterDto) {
    return await this.usersService.create(registerDto);
  }
}
