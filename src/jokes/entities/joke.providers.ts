import { DataSource } from 'typeorm';
import { Joke } from './joke.entity';
import { DATA_SOURCE, JOKE_REPOSITORY } from 'src/constants/providers.constant';

export const jokeProviders = [
  {
    provide: JOKE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Joke),
    inject: [DATA_SOURCE],
  },
];
