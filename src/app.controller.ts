import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  public async login(@Request() req: Request) {
    return this.authService.login(req['user'])
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: Request) {
    return req['user'];
  }

  @Post('/auth/register')
  public async register(@Request() req: Request) {
    return this.authService.register(req.body);
  }
}
