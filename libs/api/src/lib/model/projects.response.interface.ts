import { IHttpResponse } from './http.response.interface';
import { IProject } from './project.interface';

export interface IProjectsResponse extends IHttpResponse {
  data: IProject[];
}
