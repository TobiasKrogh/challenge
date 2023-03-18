import { IGateway } from './gateway.interface';
import { IHttpResponse } from './http.response.interface';

export interface IGatewaysResponse extends IHttpResponse {
  code: string;
  data: IGateway[];
}
