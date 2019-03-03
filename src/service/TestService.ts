import { injectable } from 'inversify';
import {client} from "../config/redis";

@injectable()
export class TestService {

    public async getData(): Promise<{}> {
        return new Promise((resolve, reject) => {
            return client.get("data", (err, data) => {
                if (err) {
                    console.error("redis err : ", err.message)
                    return reject({})
                }
                console.log("data : ", data);
                return resolve(JSON.parse(data))
            })
        })
    }
}
