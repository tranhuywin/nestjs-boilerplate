import { Module, forwardRef } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { IConfig } from '@/configs'
import { UsersModule } from '@/users/users.module'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<IConfig>) => ({
        secret: configService.get('jwtSecretKey'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
