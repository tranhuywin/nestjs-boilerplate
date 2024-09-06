import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'

import { UsersService } from '@/users/users.service'

import { IJwtPayload } from './interfaces/auth.interface'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOneBy({ email })
    if (!user) throw new NotFoundException('User email is not exist')

    const isPasswordValid = await compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException()
    }

    const payload = { sub: user.id, email: user.email }

    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }

  async signUp({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<{ accessToken: string }> {
    const newUser = await this.usersService.create({ email: email, password: password })
    const payload = { sub: newUser.id, email: newUser.email }
    return {
      accessToken: await this.jwtService.signAsync(payload),
    }
  }

  async validateJwtToken(token: string): Promise<IJwtPayload> {
    return this.jwtService.verifyAsync(token)
  }
}
