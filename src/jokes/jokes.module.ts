import { Module } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { JokesController } from './jokes.controller';
import { jokeProviders } from './entities/joke.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [JokesController],
  providers: [...jokeProviders, JokesService],
})
export class JokesModule {}
