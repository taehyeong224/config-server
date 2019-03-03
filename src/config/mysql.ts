import {MysqlConnectionOptions} from "typeorm/driver/mysql/MysqlConnectionOptions";
import { ENV } from "../util/enum";
import { Test } from "../entity/Test";

let config: MysqlConnectionOptions;
const entities = [Test];

if (process.env.NODE_ENV === ENV.local) {
    config = {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "1234",
        database: "1234",
        timezone: "+09:00",
        synchronize: true,
        logging: true,
        entities: entities
    };
} else if (process.env.NODE_ENV === ENV.production) {
    config = {
        type: "mysql",
        host: "localhost",
        port: 33307,
        username: "kth",
        password: "1234",
        database: "1234",
        timezone: "+09:00",
        synchronize: true,
        logging: true,
        entities: entities
    };
}

export const typeormConfig = config;