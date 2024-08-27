import { config } from 'dotenv'
import { DataSource } from 'typeorm'

import '@/boilerplate.polyfill'

import { dbConfig } from './database'

config()
const AppDataSource = new DataSource(dbConfig())
export default AppDataSource
