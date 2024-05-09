import { Controller, Post, Body, Res } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Response } from 'express'

import { ON_EVENT_NAMES } from 'constants/on-event-names.constant'

import { AuthService } from './auth.service'
import { CreateUserDTO, LoginDTO } from './dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post('login')
  async login(@Body() createAuthDto: LoginDTO, @Res({ passthrough: true }) response: Response) {
    const { accessToken } = await this.authService.signIn(createAuthDto)
    response.cookie('accessToken', accessToken)
    return {
      message: 'Successfully logged in',
    }
  }

  @Post('register')
  async register(@Body() createAuthDto: CreateUserDTO, @Res({ passthrough: true }) response: Response) {
    const { accessToken } = await this.authService.signUp(createAuthDto)
    response.cookie('accessToken', accessToken)

    this.eventEmitter.emit(ON_EVENT_NAMES.USER_WELCOME, {
      name: createAuthDto.email.split('@')[0],
      email: createAuthDto.email,
    })

    return {
      message: 'Successfully registered',
    }
  }
}
