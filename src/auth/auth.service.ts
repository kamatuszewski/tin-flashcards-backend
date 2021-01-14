import { User } from '../entity/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { IJwtAccessToken } from './interfaces/jwt-access-token.interface';

export abstract class AuthService {
  public abstract validateUser(login: string, pass: string): Promise<User>;

  public abstract login(user: LoginDto): Promise<IJwtAccessToken>;

  public abstract register(registerDto: RegisterDto);
}
