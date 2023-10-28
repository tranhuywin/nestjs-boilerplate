// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { DataSource } from 'typeorm';
import { dbConfig } from './database';

const AppDataSource = new DataSource(dbConfig());
export default AppDataSource;
