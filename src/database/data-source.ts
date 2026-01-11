import *as dotenv from 'dotenv';
import { Match } from 'src/entities/match.entities';
import { Team } from 'src/entities/team.entities';
import { DataSource } from 'typeorm';

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST,
    port: Number(process.env.DB_PORT),
    username: String(process.env.DB_USER),
    password: String(process.env.DB_PASS),
    database: String(process.env.DB_NAME),
    entities: [Team,Match],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
})