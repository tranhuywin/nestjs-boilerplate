import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '@/auth/auth.module'
import { S3Service } from '@/providers'

import { UserEntity } from './entities/user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService, S3Service],
  exports: [UsersService],
})
export class UsersModule {}
