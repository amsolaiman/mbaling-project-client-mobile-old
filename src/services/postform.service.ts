import { mbalingApiService } from "./mbaling-api.service";
import { DefaultApi, PostDto } from "./rest-api";


class PostService extends DefaultApi {

  async create(payload: PostDto): Promise<PostDto> {
    const response = await mbalingApiService.addPost(payload);
    return response.data;
  }

  async getAll(): Promise<PostDto[]> {
    const response = await mbalingApiService.getPost();
    return response.data as unknown as PostDto[];
  }

  async update(id: number, payload: any) {
    const response = await mbalingApiService.updatePost(id, payload);
    return response.data;
  }

  async delete(id: number) {
    const response = await mbalingApiService.deletePost(id);
    if(response.status === 200){
      return response.data
    }else{
      []
    }
    // return response.data;
  }

  async getOnePostById(id: number) {
    const response = await mbalingApiService.getPostById(id);
    return response.data;
  }

  async getUserProfile() {
    const response = await mbalingApiService.profile();
    return response.data;
  }
}

const postService = new PostService();
export default postService;
