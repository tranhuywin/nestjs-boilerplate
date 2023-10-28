import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration, { IConfig } from './configs';
import { JokesModule } from './jokes/jokes.module';

@Module({
  imports: [
    JokesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<IConfig>) => configService.get('database'),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
