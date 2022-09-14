import { mbalingApiService } from './mbaling-api.service';
import { DefaultApi } from './rest-api/api';
import { Configuration, ApplicationDto } from './rest-api';

class ApplicationService extends DefaultApi {
  async getAll(): Promise<ApplicationDto> {
    const res = await mbalingApiService.getApplications();
    return res.data;
  }

  async getOne(id: number): Promise<ApplicationDto> {
    const res = await mbalingApiService.getApplicationById(id);
    return res.data;
  }

  async create(payload: any): Promise<ApplicationDto> {
    const res = await mbalingApiService.addApplication(payload);
    return res.data;
  }

  async update(id: number, payload: any) {
    const res = await mbalingApiService.updateApplication(id, payload);
    return res;
  }

  async delete(id: number) {
    const res = await mbalingApiService.deleteApplication(id);
    return res;
  }
}

const applicationService = new ApplicationService();
export default applicationService;
