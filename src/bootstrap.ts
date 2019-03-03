import 'reflect-metadata';
import * as cors from 'cors';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import * as bodyParser from 'body-parser';
import * as cookieParser from "cookie-parser";
import TYPES from './constant/types';
import './controller/TestController';
import { Request, Response, NextFunction } from "express";
import { TestService } from './service/TestService';
import { client } from './config/redis';
import * as fs from "fs";

let container = new Container();
container.bind<TestService>(TYPES.TestService).to(TestService).inRequestScope();

// start the server
let server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.use(cors({ origin: true, credentials: true }));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
        err.status = 404;
        next(err);
    });
});
let serverInstance = server.build();
serverInstance.listen(3000);
client.on("error", function (err) {
    console.log("Error " + err);
});
const path = __dirname + "/../config.json";
console.log("path : ", path);
const data = JSON.parse(fs.readFileSync(path, "utf8"))
client.set("data", JSON.stringify(data))
console.log("complete")