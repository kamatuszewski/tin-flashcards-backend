import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  readonly login: string;

  @IsString()
  readonly password: string;

  @IsString()
  @IsEmail()
  readonly email: string;
}
