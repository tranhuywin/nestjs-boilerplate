import { Module } from '@nestjs/common';
import { JokesModule } from './jokes/jokes.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [JokesModule, DatabaseModule],
})
export class AppModule {}
