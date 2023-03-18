import { IHttpResponse } from './http.response.interface';
import { IUser } from './user.interface';

export interface IUsersResponse extends IHttpResponse {
  data: IUser[];
}
