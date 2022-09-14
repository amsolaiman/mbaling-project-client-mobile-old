import { mbalingApiService } from './mbaling-api.service';
import { DefaultApi, NonAccountDto } from './rest-api/api';
import { Configuration, ApplicationDto } from './rest-api';

class NonAccountService extends DefaultApi {
  async getAll(): Promise<NonAccountDto> {
    const res = await mbalingApiService.getNonAccount();
    return res.data;
  }

  async getOne(id: number): Promise<NonAccountDto> {
    const res = await mbalingApiService.getNonAccountId(id);
    return res.data;
  }

  async create(payload: any): Promise<NonAccountDto> {
    const res = await mbalingApiService.addNonAccount(payload);
    return res.data;
  }

  async update(id: number, payload: any) {
    const res = await mbalingApiService.updateNonAccount(id, payload);
    return res;
  }

  async delete(id: number) {
    const res = await mbalingApiService.deleteNonAccount(id);
    return res;
  }
}

const nonAccountService = new NonAccountService();
export default nonAccountService;
