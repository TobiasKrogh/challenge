import { IHttpResponse } from './http.response.interface';
import { IReport } from './report.interface';

export interface IReportResponse extends IHttpResponse {
  data: IReport[];
}
