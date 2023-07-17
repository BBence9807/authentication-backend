import {DataSource} from "typeorm";
import {User} from "../model/User";
import * as dotenv from "dotenv";

dotenv.config();

export class DatabaseServer {

    private static _instance: DatabaseServer;
    private dbSource:DataSource;

    private constructor() {
        this.connectDatabase();
    }


    private connectDatabase(){
        const dataSource = new DataSource({
            type: 'postgres',
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            database: process.env.DB_NAME,
            synchronize: true,
            logging: true,
            entities: [User],
        })

        dataSource.initialize().then(value => {
            this.dbSource = value;
            console.log('Connected to the database');
        })
    }

    public getDataSource():DataSource{
        return this.dbSource;
    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new DatabaseServer();
        }
        return this._instance;
    }
}