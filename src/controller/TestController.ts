import { controller, httpDelete, httpGet, httpPost, httpPut } from 'inversify-express-utils';
import { inject } from 'inversify';
import { TestService } from '../service/TestService';
import * as express from 'express';
import TYPES from '../constant/types';
import { errorHandle } from "../util/util";
import { checkToken } from "../middleware/token";

@controller('/')
export class TestController {

    constructor(@inject(TYPES.TestService) private testService: TestService) {}

    @httpGet('/')
    public async someGet(request: express.Request, response: express.Response) {
        try {
            const data = await this.testService.getData();
            response.status(200).json({ msg: "success" , data});
        } catch (e) {
            errorHandle(e, response)
        }
    }

    @httpPost('/')
    public async somePost(request: express.Request, response: express.Response) {
        try {
            response.status(201).json({ msg: "success" });
        } catch (e) {
            errorHandle(e, response)
        }
    }

    @httpPut('/', checkToken)
    public async somePut(request: any, response: express.Response) {
        try {
            response.status(200).json({ msg: "success" });
        } catch (e) {
            console.log("error : ", e);
            errorHandle(e, response)
        }
    }

    @httpDelete('/:id', checkToken)
    public async someDelete(request: express.Request, response: express.Response) {
        try {
            response.status(204).json({});
        } catch (e) {
            errorHandle(e, response)
        }
    }
}
