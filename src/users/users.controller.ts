import {
  Body,
  Controller,
  Get,
  Put,
  UseGuards,
  BadRequestException,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes } from '@nestjs/swagger'

import { CreateUserDTO } from '@/auth/dto'
import { AuthGuard } from '@/auth/guards/auth.guard'
import { IJwtPayload } from '@/auth/interfaces/auth.interface'
import { IFile } from '@/core/interfaces/file.interface'
import { JwtPayload } from '@/decorators'
import { S3Service } from '@/providers'

import { UserEntity } from './entities/user.entity'
import { UpdateUserDTO } from './interfaces/user.interface'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly s3Service: S3Service,
  ) {}

  @Get('all')
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.find()
  }

  @Post()
  async createUser(@Body() body: CreateUserDTO): Promise<UserEntity> {
    return this.usersService.create(body)
  }

  @Get()
  @UseGuards(AuthGuard)
  async findMe(@JwtPayload() jwtPayload: IJwtPayload): Promise<UserEntity | null> {
    return this.usersService.findOneBy({ email: jwtPayload.email })
  }

  @Put()
  @UseGuards(AuthGuard)
  async updateUser(
    @JwtPayload() jwtPayload: IJwtPayload,
    @Body() body: UpdateUserDTO,
  ): Promise<UserEntity> {
    if ('password' in body) {
      throw new BadRequestException('Password cannot be updated here')
    }
    return this.usersService.updateUser(jwtPayload.email, body)
  }

  @Post('upload-image/')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadImage(@UploadedFile() file: IFile): Promise<{ location: string | undefined }> {
    return this.s3Service.uploadFileToPublicBucket('s3', { file, fileName: file.originalname })
  }
}
