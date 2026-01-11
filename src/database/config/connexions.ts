import *as dotenv from 'dotenv';
import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Team } from 'src/entities/team.entities';
import { Match } from 'src/entities/match.entities';


dotenv.config();

const config = {
    type: "mysql",
    host: process.env.HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Team, Match],
    migrations: ['dist/migrations/*.js'],
    synchronize: false,
}
export default registerAs('typeorm', () => config);
export const AppDataSource = new DataSource(config as DataSourceOptions);