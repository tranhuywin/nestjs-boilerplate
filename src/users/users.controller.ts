import { Body, Controller, Get, Put, UseGuards, BadRequestException } from '@nestjs/common'

import { AuthGuard } from 'src/auth/guards/auth.guard'
import { IJwtPayload } from 'src/auth/interfaces/auth.interface'
import { JwtPayload } from 'src/decorators'

import { UpdateUserDTO } from './interfaces/user.interface'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  async findAll() {
    return this.usersService.findAll()
  }

  @Get()
  @UseGuards(AuthGuard)
  async findMe(@JwtPayload() jwtPayload: IJwtPayload) {
    return this.usersService.findOneByEmail(jwtPayload.email)
  }

  @Put()
  @UseGuards(AuthGuard)
  async updateUser(@JwtPayload() jwtPayload: IJwtPayload, @Body() body: UpdateUserDTO) {
    if ('password' in body) {
      throw new BadRequestException('Password cannot be updated here')
    }
    return this.usersService.updateUser(jwtPayload.email, body)
  }
}
