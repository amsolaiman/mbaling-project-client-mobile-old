import { mbalingApiService } from "./mbaling-api.service";
import { MediaDto } from "./rest-api";
import { DefaultApi } from "./rest-api/api";

class MediaService extends DefaultApi {

  async uploadPicture(payload: any): Promise<MediaDto> {
    const { media, postPhotoId } = payload;
    console.log(payload);
    const response = await mbalingApiService.uploadMedia(postPhotoId, media);
    return response.data;
  }
  async update(id: number, payload: any) {
    const response = await mbalingApiService.updateMedia(id, payload);
    return response.data;
  }

  async getAll(): Promise<MediaDto[]> {
    const response = await mbalingApiService.getAllMedia();
    return response.data as unknown as MediaDto[];
  }
}

const mediaService = new MediaService();
export default mediaService;
