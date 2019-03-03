import { injectable } from 'inversify';
import { Test } from '../entity/Test';

@injectable()
export class TestService {


    public async getTestByIdx(idx: number): Promise<Test> {
        return null;
    }
}
