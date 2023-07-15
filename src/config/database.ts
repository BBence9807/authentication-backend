import { createConnection, Connection } from 'typeorm';
import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';
import * as dotenv from 'dotenv';

dotenv.config();

export default async function connectDatabase(): Promise<Connection> {
    const connectionOptions: ConnectionOptions = {
        type: 'postgres',
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        database: process.env.DB_NAME,
        synchronize: true,
        logging: true,
        entities: ["../model/User.js"],
    };

    const connection = await createConnection(connectionOptions);
    console.log('Connected to the database');

    return connection;
}
