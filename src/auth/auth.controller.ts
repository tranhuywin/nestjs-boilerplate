import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { CreateUserDTO, LoginDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() createAuthDto: LoginDTO, @Res({ passthrough: true }) response: Response) {
    const { accessToken } = await this.authService.signIn(createAuthDto);
    response.cookie('accessToken', accessToken);
    return {
      message: 'Successfully logged in',
    };
  }

  @Post('register')
  async register(@Body() createAuthDto: CreateUserDTO, @Res({ passthrough: true }) response: Response) {
    const { accessToken } = await this.authService.signUp(createAuthDto);
    response.cookie('accessToken', accessToken);
    return {
      message: 'Successfully registered',
    };
  }
}
