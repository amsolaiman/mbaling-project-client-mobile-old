// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class PfrmediaService {}
import { mbalingApiService } from './mbaling-api.service';
import { DefaultApi, PrfMediaDto } from './rest-api/api';

class PfrMediaService extends DefaultApi {

  async uploadPicture(file: File[]): Promise<PrfMediaDto> {
    const response = await mbalingApiService.uploadPrfMedia(file);
    return response.data;
  }

  async getAll(): Promise<PrfMediaDto[]> {
    const response = await mbalingApiService.getAllMedia();
    return response.data as unknown as PrfMediaDto[];
  }
}

const prfmediaService = new PfrMediaService();
export default prfmediaService;
