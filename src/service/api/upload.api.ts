import axios, { IAxiosResponse } from '@/service';
import { prefix, POST, DELETE } from '@/service/decorators';

@prefix('/upload')
class UploadApi {
  @POST({
    url: '/article'
  })
  async uploadFile(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @DELETE({
    url: '/article'
  })
  async removeFile(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }

  @POST({
    url: ''
  })
  async uploadAvatar(opt?: any) {
    const res: IAxiosResponse = await axios(opt);
    return Promise.resolve(res.data);
  }
}

export default new UploadApi();
